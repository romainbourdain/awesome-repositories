import type { SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M8 1.5l2 4.2 4.5.6-3.3 3.1.8 4.5L8 11.7l-4 2.2.8-4.5L1.5 6.3 6 5.7z" />
  </Icon>
);

export const BookIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M2 2.5h4.5A1.5 1.5 0 0 1 8 4v9.5A1.5 1.5 0 0 0 6.5 12H2zM14 2.5H9.5A1.5 1.5 0 0 0 8 4v9.5a1.5 1.5 0 0 1 1.5-1.5H14z" />
  </Icon>
);

export const RepoIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M3.5 12.5V3A1.5 1.5 0 0 1 5 1.5h8v10H5a1.5 1.5 0 0 0-1.5 1.5v0A1.5 1.5 0 0 0 5 14.5h8" />
  </Icon>
);

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </Icon>
);

export const LinkExternalIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M9 2.5h4.5V7M13.5 2.5L7.5 8.5M12 9.5v3a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3" />
  </Icon>
);
