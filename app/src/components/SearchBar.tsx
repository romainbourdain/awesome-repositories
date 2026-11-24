import { Input } from "@base-ui/react/input";
import { useEffect, useRef } from "react";
import { SearchIcon } from "./Icons";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key === "/" && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        event.preventDefault();
        ref.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted" />
      <Input
        ref={ref}
        type="search"
        aria-label="Search repositories"
        placeholder="Search repositories  ( / )"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full rounded-md border border-line bg-inset pr-3 pl-8 text-sm text-fg outline-none placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
