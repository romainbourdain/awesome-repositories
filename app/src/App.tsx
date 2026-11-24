import { useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { RepoList } from "./components/RepoList";
import { RepoViewer } from "./components/RepoViewer";
import { SearchBar } from "./components/SearchBar";
import { useRepos } from "./hooks/useRepos";
import { useSelectedSlug } from "./hooks/useSelectedSlug";
import { ALL_CATEGORIES, categoriesOf, searchRepos } from "./lib/search";

export function App() {
  const repos = useRepos();
  const selected = useSelectedSlug();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  if (repos.status === "loading") return <p className="p-6 text-sm text-slate-500">Loading…</p>;
  if (repos.status === "error") return <p className="p-6 text-sm text-red-600">{repos.message}</p>;

  const results = searchRepos(repos.value, query, category);
  const current = repos.value.find((r) => r.slug === selected) ?? null;

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="grid min-h-0 flex-1 md:grid-cols-[22rem_1fr]">
        <aside
          className={`min-h-0 flex-col border-slate-200 md:flex md:border-r dark:border-slate-800 ${current ? "hidden" : "flex"}`}
        >
          <div className="space-y-3 border-b border-slate-200 p-3 dark:border-slate-800">
            <h1 className="text-base font-semibold">Awesome repositories</h1>
            <SearchBar value={query} onChange={setQuery} />
            <CategoryFilter categories={categoriesOf(repos.value)} value={category} onChange={setCategory} />
            <p className="text-xs text-slate-500" aria-live="polite">
              {results.length} / {repos.value.length} repositories
            </p>
          </div>
          <nav aria-label="Repositories" className="min-h-0 flex-1 overflow-y-auto">
            <RepoList repos={results} selected={selected} />
          </nav>
        </aside>
        <main className={`min-h-0 overflow-y-auto ${current ? "" : "hidden md:block"}`}>
          {current ? (
            <RepoViewer key={current.slug} repo={current} />
          ) : (
            <p className="p-8 text-sm text-slate-500">Select a repository to read its README.</p>
          )}
        </main>
      </div>
    </div>
  );
}
