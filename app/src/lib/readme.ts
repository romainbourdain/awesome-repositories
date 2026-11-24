const ABSOLUTE = /^([a-z][a-z0-9+.-]*:|\/\/|#|mailto:)/i;

/** Rend absolus les liens et images relatifs d'un README, pour qu'ils pointent vers GitHub. */
export function resolveReadmeUrl(url: string, repo: string, branch: string, kind: "image" | "link"): string {
  if (ABSOLUTE.test(url)) return url;
  const path = url.replace(/^\.?\//, "");
  return kind === "image"
    ? `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
    : `https://github.com/${repo}/blob/${branch}/${path}`;
}
