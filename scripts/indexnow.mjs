#!/usr/bin/env node
/**
 * Ping IndexNow with every URL in the freshly exported sitemap.
 *
 * IndexNow is how Yandex and Bing learn about changed pages in hours instead
 * of weeks. Google ignores it — Search Console's sitemap covers that side.
 *
 * Runs after the Pages deploy, against the built `out/sitemap.xml`, so the
 * URL list is always exactly what was just published. A failure here must
 * never fail the deploy: the sitemap still gets crawled on the normal
 * schedule, so a refused ping is a missed optimisation, not a broken site.
 */

import { readFileSync } from "node:fs";

const KEY = process.env.INDEXNOW_KEY;
const HOST = "ventolabs.com";
const SITEMAP = "out/sitemap.xml";
const ENDPOINTS = ["https://yandex.com/indexnow", "https://api.indexnow.org/indexnow"];

if (!KEY) {
  console.log("INDEXNOW_KEY is not set — skipping the ping.");
  process.exit(0);
}

const xml = readFileSync(SITEMAP, "utf8");
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.log("No <loc> entries in " + SITEMAP + " — nothing to submit.");
  process.exit(0);
}

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
});

for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    // 200 = accepted, 202 = accepted but the key is still being verified.
    console.log(`${endpoint} -> ${res.status} ${res.statusText} (${urlList.length} URLs)`);
  } catch (err) {
    console.log(`${endpoint} -> failed: ${err.message}`);
  }
}

