import { Button } from "@base-ui/react/button";
import { ALL_CATEGORIES } from "../lib/search";

interface Props {
  /** Catégories avec leur nombre de repos, « All » en tête. */
  counts: [string, number][];
  value: string;
  onChange: (category: string) => void;
}

/** Onglets soulignés, façon UnderlineNav de GitHub. */
export function CategoryFilter({ counts, value, onChange }: Props) {
  return (
    <div role="group" aria-label="Categories" className="flex gap-1 overflow-x-auto px-3">
      {counts.map(([category, count]) => (
        <Button
          key={category}
          aria-pressed={category === value}
          onClick={() => onChange(category)}
          className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-2 py-3 text-sm whitespace-nowrap text-fg hover:bg-hover aria-pressed:border-tab aria-pressed:font-semibold"
        >
          {category === ALL_CATEGORIES ? "All" : category}
          <span className="min-w-5 rounded-full bg-hover px-1.5 text-center text-xs font-medium">{count}</span>
        </Button>
      ))}
    </div>
  );
}
