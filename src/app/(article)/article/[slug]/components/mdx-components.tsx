import Link from "next/link";

import { MDXComponents } from "mdx/types";
import { Code } from "bright";

export const mdxComponents: MDXComponents = {
  a: ({ children, href }) => (
    <Link href={href || ""} className="accent p-1">
      {children}
    </Link>
  ),
  h1: ({ children, ...props }) => (
    <h1 {...props} className="f1-bold my-4 md:my-8">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="f2-bold my-4 md:my-8">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="f3-bold my-4 md:my-8">
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="fp-regular my-4 break-keep leading-8 md:my-8">
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="fp-regular my-4 list-disc">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="fp-regular my-4 list-decimal">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="my-2 ml-6">
      {children}
    </li>
  ),
  hr: ({ ...props }) => (
    <hr
      {...props}
      className="bg-text-900 dark:bg-text-100 my-4 h-[2px] border-0 md:my-8"
    />
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="bg-beige-300 dark:bg-charcoal-700 !first:m-0 p-4"
    >
      {children}
    </blockquote>
  ),
  pre: Code,
};
