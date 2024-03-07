import Link from "next/link";

import { MDXComponents } from "mdx/types";
import { Code } from "bright";

export const mdxComponents: MDXComponents = {
  a: ({ children, href }) => (
    <Link href={href || ""} className="text-layer bg-layer p-1">
      {children}
    </Link>
  ),
  h1: ({ children, ...props }) => (
    <h1 {...props} className="my-4 text-2xl font-bold md:my-8 md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="my-4 text-xl font-bold md:my-8 md:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="my-4 text-lg font-bold md:my-8 md:text-xl">
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="my-4 break-keep text-lg leading-8 md:my-8">
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="my-4 list-disc text-lg">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="my-4 list-decimal text-lg">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="my-2 ml-6">
      {children}
    </li>
  ),
  hr: ({ ...props }) => (
    <hr {...props} className="bg-layer my-4 h-[2px] border-0 md:my-8" />
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="bg-layer text-layer !first:m-0 p-4 font-bold"
    >
      {children}
    </blockquote>
  ),
  pre: Code,
};
