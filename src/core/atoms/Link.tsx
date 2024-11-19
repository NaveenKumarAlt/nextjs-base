import { ReactElement, forwardRef } from 'react';
import {
  Link as JssLink,
  LinkFieldValue,
  LinkProps as ReactLinkProps,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { cn } from 'lib/utils';
import NextLink from 'next/link';
import { useEditor } from 'hooks/useEditor';
import { formatPageUrl, reorderQueryParams } from 'utils/url';
import { FALLBACK_LANG } from 'constants/api';

type LinkProps = ReactLinkProps & {
  className?: string;
  disabled?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props: LinkProps, ref): ReactElement => {
  const { field, children, className, editable = true, disabled, ...htmlLinkProps } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = useEditor();
  const value = (
    (field as LinkFieldValue)?.href ? field : (field as LinkField)?.value
  ) as LinkFieldValue;
  const { href, querystring, anchor: hash, target, linktype } = value || {};
  const pageUrl = linktype === 'external' ? href : formatPageUrl(href);
  if (isEditing && editable) {
    return <JssLink field={field} className={className} ref={ref} />;
  }

  const _query = typeof querystring === 'string' ? querystring?.split('#') : undefined;
  const _hash = _query?.[1] || hash;

  if (disabled) {
    return (
      <button
        className={cn(value?.class, className, { 'hover:cursor-default opacity-50': disabled })}
      >
        {children ?? value?.text}
      </button>
    );
  }

  const contextLanguage = sitecoreContext?.language?.split('-')?.[0]?.toLowerCase();
  const url =
    sitecoreContext?.language === FALLBACK_LANG &&
    pageUrl?.startsWith('/') &&
    pageUrl?.split('/')[1] === sitecoreContext?.language
      ? pageUrl.replace(`/${sitecoreContext?.language}`, '')
      : pageUrl;

  let pathname = !!url ? url.replace(process?.env?.NEXT_PUBLIC_URL ?? '', '/') : '';
  const shouldRemoveLocale =
    !!pathname && contextLanguage === FALLBACK_LANG && pathname.startsWith(`/${FALLBACK_LANG}/`);

  if (shouldRemoveLocale) {
    pathname = pathname.replace(`/${FALLBACK_LANG}/`, '/');
  }

  return (
    <NextLink
      {...htmlLinkProps}
      href={
        linktype === 'external'
          ? pathname
          : pathname === ''
            ? '/'
            : { pathname, query: reorderQueryParams(querystring), hash: _hash }
      }
      className={cn(value?.class, className, { 'hover:cursor-default opacity-50': disabled })}
      target={target}
      locale={linktype === 'external' ? false : undefined}
      ref={ref}
    >
      {children ?? value?.text}
    </NextLink>
  );
});

Link.displayName = 'Link';

export default Link;
