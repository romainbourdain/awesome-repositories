import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/** Le repo sélectionné vit dans le hash : `#/owner/repo` (lien partageable, bouton retour du navigateur). */
export function slugFromHash(hash: string): string | null {
  const match = hash.match(/^#\/([^/]+)\/([^/]+)$/);
  return match ? `${match[1]}__${match[2]}` : null;
}

export function hashFromSlug(slug: string): string {
  return `#/${slug.replace("__", "/")}`;
}

export function useSelectedSlug(): string | null {
  return useSyncExternalStore(subscribe, () => slugFromHash(window.location.hash));
}
