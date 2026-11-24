import { useEffect, useState } from "react";
import { fetchReadme, fetchRepos } from "../api/repos";
import type { Repo } from "../types";

type Loaded<T> = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; value: T };

function useLoaded<T>(load: () => Promise<T>, key: string): Loaded<T> {
  const [state, setState] = useState<{ key: string; result: Loaded<T> }>({ key, result: { status: "loading" } });
  useEffect(() => {
    let cancelled = false;
    load().then(
      (value) => !cancelled && setState({ key, result: { status: "ready", value } }),
      (error: unknown) =>
        !cancelled &&
        setState({ key, result: { status: "error", message: error instanceof Error ? error.message : String(error) } }),
    );
    return () => {
      cancelled = true;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return state.key === key ? state.result : { status: "loading" };
}

export function useRepos(): Loaded<Repo[]> {
  return useLoaded(fetchRepos, "repos");
}

export function useReadme(slug: string | null, enabled: boolean): Loaded<string> | null {
  const state = useLoaded(
    () => (slug && enabled ? fetchReadme(slug) : Promise.resolve("")),
    `readme:${slug}:${enabled}`,
  );
  return slug && enabled ? state : null;
}
