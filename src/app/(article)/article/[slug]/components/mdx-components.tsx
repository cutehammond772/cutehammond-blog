import Link from "next/link";

import { MDXComponents } from "mdx/types";
import { Code } from "bright";
import { Paperclip } from "react-feather";

export const mdxComponents: MDXComponents = {
  a: ({ children, href }) => (
    <Link
      href={href || ""}
      className="bg-beige-500 px-2 py-1 dark:bg-charcoal-500"
    >
      <Paperclip className="inline py-1" /> {children}
    </Link>
  ),
  h1: ({ children, ...props }) => (
    <h1 {...props} className="f1-bold mb-2 mt-8 break-keep md:mb-4 md:mt-12">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="f2-bold mb-2 mt-8 break-keep md:mb-4 md:mt-12">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="f3-bold mb-2 mt-8 break-keep md:mb-4 md:mt-12">
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="fp-regular my-2 break-keep leading-8 md:my-4">
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="fp-regular my-2 list-disc break-keep">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="fp-regular my-2 list-decimal break-keep">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="my-2 ml-6 break-keep md:my-4">
      {children}
    </li>
  ),
  hr: ({ ...props }) => (
    <hr
      {...props}
      className="my-2 h-[2px] border-0 bg-text-900 dark:bg-text-100 md:my-4"
    />
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="!first:m-0 my-2 bg-beige-300 p-4 dark:bg-charcoal-700 md:my-4"
    >
      {children}
    </blockquote>
  ),
  pre: ({ ...props }) => (
    <Code
      {...props}
      theme={{
        dark: "dracula-soft",
        light: "solarized-light",
        lightSelector: '[data-theme="Light"]',
      }}
      lineNumbers
      codeClassName="whitespace-pre-wrap"
    />
  ),
};
