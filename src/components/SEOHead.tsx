import Head from "next/head";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  owner?: string;
  email?: string;
  viewport?: string;
}

const ConditionalHead = ({ children }: { children: ReactNode | ReactNode[] }) =>
  process.env.VITE_TITLE ? (
    <Helmet>{children}</Helmet>
  ) : (
    <Head>{children}</Head>
  );

const SEOHead = (props: SEOHeadProps) => (
  <ConditionalHead>
    <title>
      {props.title ?? (process.env.VITE_TITLE || process.env.NEXT_PUBLIC_TITLE)}
    </title>
    <link
      href={props.url ?? (process.env.VITE_URL || process.env.NEXT_PUBLIC_URL)}
      rel="canonical"
    />
    <link href="/favicon.ico" rel="icon" />
    <link
      href={
        props.image ?? (process.env.VITE_IMAGE || process.env.NEXT_PUBLIC_IMAGE)
      }
      rel="apple-touch-icon"
    />
    <meta
      content={
        props.description ??
        (process.env.VITE_DESCRIPTION || process.env.NEXT_PUBLIC_DESCRIPTION)
      }
      name="description"
    />
    <meta
      content={
        props.title ?? (process.env.VITE_TITLE || process.env.NEXT_PUBLIC_TITLE)
      }
      property="og:title"
    />
    <meta
      content={
        props.description ??
        (process.env.VITE_DESCRIPTION || process.env.NEXT_PUBLIC_DESCRIPTION)
      }
      property="og:description"
    />
    <meta
      content={
        props.url ?? (process.env.VITE_URL || process.env.NEXT_PUBLIC_URL)
      }
      property="og:url"
    />
    <meta
      content={
        props.image ?? (process.env.VITE_IMAGE || process.env.NEXT_PUBLIC_IMAGE)
      }
      property="og:image"
    />
    <meta
      content={
        props.keywords ??
        (process.env.VITE_KEYWORDS || process.env.NEXT_PUBLIC_KEYWORDS)
      }
      name="keywords"
    />
    <meta
      content={
        props.owner ?? (process.env.VITE_OWNER || process.env.NEXT_PUBLIC_OWNER)
      }
      name="owner"
    />
    <meta
      content={
        props.email ?? (process.env.VITE_EMAIL || process.env.NEXT_PUBLIC_EMAIL)
      }
      name="email"
    />
    <meta
      content={props.viewport ?? "width=device-width, initial-scale=1"}
      name="viewport"
    />
    <meta content="website" property="og:type" />
    <meta content="summary_large_image" name="twitter:card" />
    <meta
      content={
        props.title ?? (process.env.VITE_TITLE || process.env.NEXT_PUBLIC_TITLE)
      }
      name="twitter:title"
    />
    <meta
      content={
        props.description ??
        (process.env.VITE_DESCRIPTION || process.env.NEXT_PUBLIC_DESCRIPTION)
      }
      name="twitter:description"
    />
    <meta
      content={
        props.image ?? (process.env.VITE_IMAGE || process.env.NEXT_PUBLIC_IMAGE)
      }
      name="twitter:image"
    />
    <meta
      content={
        props.url ?? (process.env.VITE_URL || process.env.NEXT_PUBLIC_URL)
      }
      name="twitter:url"
    />
  </ConditionalHead>
);
export default SEOHead;
