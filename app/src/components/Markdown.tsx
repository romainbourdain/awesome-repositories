import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { resolveReadmeUrl } from "../lib/readme";

interface Props {
  source: string;
  /** `owner/repo` et branche : permettent de résoudre les liens relatifs d'un README. */
  repo?: string;
  branch?: string;
}

export function Markdown({ source, repo, branch = "main" }: Props) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-img:inline prose-img:my-1">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        urlTransform={(url, key) =>
          repo ? resolveReadmeUrl(url, repo, branch, key === "src" ? "image" : "link") : url
        }
        components={{
          a: ({ node: _node, href, ...props }) => (
            <a
              href={href}
              {...(href?.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              {...props}
            />
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
