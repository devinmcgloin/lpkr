import Head from 'next/head';

const StandardMetadata = ({ title, description }) => (
  <Head>
    <meta charSet="utf-8" />
    <link rel="canonical" href="https://www.lpkr.net" />
    <title key="title">{title}</title>
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
    <link rel="manifest" href="/manifest.json" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" href="/icons/logo.svg" />
    <link rel="shortcut icon" href="/icons/logo.svg" />
    <link rel="canonical" href="https://www.lpkr.net" />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="57x57"
      href="/icons/apple-touch-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="114x114"
      href="/icons/apple-touch-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="72x72"
      href="/icons/apple-touch-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="144x144"
      href="/icons/apple-touch-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="60x60"
      href="/icons/apple-touch-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="120x120"
      href="/icons/apple-touch-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="76x76"
      href="/icons/apple-touch-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="152x152"
      href="/icons/apple-touch-icon-152x152.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="/icons/favicon-196x196.png"
      sizes="196x196"
    />
    <link
      rel="icon"
      type="image/png"
      href="/icons/favicon-96x96.png"
      sizes="96x96"
    />
    <link
      rel="icon"
      type="image/png"
      href="/icons/favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="/icons/favicon-16x16.png"
      sizes="16x16"
    />
    <link
      rel="icon"
      type="image/png"
      href="/icons/favicon-128.png"
      sizes="128x128"
    />
    <meta name="application-name" content="&nbsp;" />
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
    <meta
      name="msapplication-square70x70logo"
      content="/icons/mstile-70x70.png"
    />
    <meta
      name="msapplication-square150x150logo"
      content="/icons/mstile-150x150.png"
    />
    <meta
      name="msapplication-wide310x150logo"
      content="/icons/mstile-310x150.png"
    />
    <meta
      name="msapplication-square310x310logo"
      content="/icons/mstile-310x310.png"
    />
    <meta name="twitter:image" content="https://www.lpkr.net/social.png" />
    <meta property="og:image" content="https://www.lpkr.net/social.png" />
    <meta property="og:image:height" content="650" />
    <meta property="og:image:width" content="1200" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:title" content={title} key="og-title" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.lpkr.net" />
    <meta
      property="og:description"
      content={description}
      key="og-description"
    />

    <meta
      name="description"
      property="description"
      content={description}
      key="description"
    />
    <meta property="og:site_name" content={title} key="og-site_name" />
    <meta property="og:locale" content="en" />
    <meta name="twitter:title" content={title} key="twitter-title" />
    <meta
      name="twitter:description"
      content={description}
      key="twitter-description"
    />
  </Head>
);

const CommonMetadata = ({ title, description }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} key="title" />}
      {title && (
        <meta property="og:site_name" content={title} key="og-site_name" />
      )}
      {title && (
        <meta name="twitter:title" content={title} key="twitter-title" />
      )}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      )}
      {description && (
        <meta property="description" content={description} key="description" />
      )}
      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="twitter-description"
        />
      )}
    </Head>
  );
};

export { StandardMetadata, CommonMetadata };
