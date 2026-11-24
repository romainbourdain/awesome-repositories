import { Button } from "@base-ui/react/button";
import { ALL_CATEGORIES } from "../lib/search";

interface Props {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div role="group" aria-label="Categories" className="flex flex-wrap gap-1.5">
      {[ALL_CATEGORIES, ...categories].map((category) => (
        <Button
          key={category}
          aria-pressed={category === value}
          onClick={() => onChange(category)}
          className="rounded-full border border-slate-300 px-2.5 py-0.5 text-xs aria-pressed:border-indigo-600 aria-pressed:bg-indigo-600 aria-pressed:text-white dark:border-slate-700"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
