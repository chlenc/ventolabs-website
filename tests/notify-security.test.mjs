import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const targets = [
  ["Cloudflare", "../cloudflare/notify-worker/_worker.js"],
  ["Supabase fallback", "../supabase/functions/notify/index.ts"],
];

async function loadHandler(path, env, upstream) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const context = vm.createContext({
    Request, Response, AbortController, URL, setTimeout, clearTimeout,
    fetch: upstream,
    console: { log() {} },
    Deno: {
      env: { get: (name) => env[name] },
      serve: (handler) => { context.handler = handler; },
    },
  });
  const executable = path.endsWith(".ts")
    ? ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText
    : source.replace("export default {", "globalThis.worker = {");
  vm.runInContext(executable, context);
  return context.handler || ((request) => context.worker.fetch(request, env));
}

const request = (method = "POST") => new Request("https://notify.example.invalid/", {
  method,
  ...(method === "POST" ? { body: JSON.stringify({ type: "booking", page: "/", ts: "2026-10-25T00:00:00Z" }) } : {}),
});

for (const [name, path] of targets) {
  test(`${name}: missing secret fails closed without an upstream request`, async () => {
    let calls = 0;
    const handler = await loadHandler(path, {}, async () => { calls++; });
    assert.equal((await handler(request())).status, 503);
    assert.equal(calls, 0);
    assert.equal((await handler(request("OPTIONS"))).status, 204);
    assert.equal((await handler(request("GET"))).status, 405);
  });

  test(`${name}: uses only the configured token and destination`, async () => {
    const calls = [];
    const handler = await loadHandler(path, { TG_BOT_TOKEN: "test-only-secret", TG_CHAT_ID: "test-chat" }, async (url, init) => {
      calls.push({ url, body: JSON.parse(init.body) });
      return Response.json({ ok: true });
    });
    const response = await handler(request());
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.telegram.org/bottest-only-secret/sendMessage");
    assert.equal(calls[0].body.chat_id, "test-chat");
  });

  test(`${name}: a rejected Telegram credential is a delivery failure`, async () => {
    const handler = await loadHandler(path, { TG_BOT_TOKEN: "revoked-test-secret" }, async () => Response.json({ ok: false, description: "Unauthorized" }, { status: 401 }));
    const response = await handler(request());
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false });
  });

  test(`${name}: upstream exceptions never expose the token`, async () => {
    const handler = await loadHandler(path, { TG_BOT_TOKEN: "private-test-secret" }, async () => {
      throw new Error("Failed to fetch https://api.telegram.org/botprivate-test-secret/sendMessage");
    });
    const response = await handler(request());
    assert.equal(response.status, 500);
    const body = await response.text();
    assert.doesNotMatch(body, /private-test-secret|api\.telegram\.org/);
    assert.equal(JSON.parse(body).ok, false);
  });
}

test("notification sources contain no embedded Telegram credentials", async () => {
  for (const [, path] of targets) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.doesNotMatch(source, /\b\d{5,15}:[A-Za-z0-9_-]{25,}\b/);
  }
});
