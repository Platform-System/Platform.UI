import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { redirect as nextRedirect } from 'next/navigation';
import * as React from 'react';
import type { UrlObject } from 'url';
import type { Locale } from './config';

type Href = string | UrlObject;
type LocalizedHref = Href | { href: Href; locale?: Locale };

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> &
  NextLinkProps & {
    href: Href;
    locale?: Locale;
  };

export function Link(props: LinkProps) {
  const { href, locale: _locale, ...rest } = props;
  // Cast through unknown to safely drop the `locale` prop before passing to NextLink
  return React.createElement(NextLink, { href, ...rest } as unknown as React.ComponentProps<typeof NextLink>);
}

// type is inferred from next/navigation's redirect signature
export function redirect(input: LocalizedHref, ...args: Parameters<typeof nextRedirect> extends [string, ...infer R] ? R : never) {
  const href = typeof input === 'object' && 'href' in input ? input.href : input;
  nextRedirect(href as string, ...args);
}
