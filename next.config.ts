import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

// When a public/CNAME file is present the site is served from a custom domain
// (ventolabs.com), so we do not want a repo-name basePath. Otherwise, on
// GitHub Actions we fall back to the repo slug so the site works at
// chlenc.github.io/ventolabs-website/.
const hasCustomDomain = existsSync(join(process.cwd(), "public", "CNAME"));
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPagesProjectSite =
  process.env.GITHUB_ACTIONS === "true" &&
  !!repoName &&
  !repoName.endsWith(".github.io") &&
  !hasCustomDomain;
const basePath = isGitHubPagesProjectSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
