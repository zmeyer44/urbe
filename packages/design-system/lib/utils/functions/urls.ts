import { ReadonlyURLSearchParams } from "next/navigation";

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_) {}
  return str;
};

export const getSearchParams = (url: string) => {
  // Create a params object
  let params = {} as Record<string, string>;

  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });

  return params;
};

export const getSearchParamsWithArray = (url: string) => {
  let params = {} as Record<string, string | string[]>;

  new URL(url).searchParams.forEach(function (val, key) {
    if (key in params) {
      const param = params[key]!;
      Array.isArray(param) ? param.push(val) : (params[key] = [param, val]);
    } else {
      params[key] = val;
    }
  });

  return params;
};

export const getParamsFromURL = (url: string) => {
  if (!url) return {};
  try {
    const params = new URL(url).searchParams;
    const paramsObj: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      if (value && value !== "") {
        paramsObj[key] = value;
      }
    }
    return paramsObj;
  } catch (e) {
    return {};
  }
};

export const UTMTags = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const constructURLFromUTMParams = (
  url: string,
  utmParams: Record<string, string>,
) => {
  if (!url) return "";
  try {
    const newURL = new URL(url);
    for (const [key, value] of Object.entries(utmParams)) {
      if (value === "") {
        newURL.searchParams.delete(key);
      } else {
        newURL.searchParams.set(key, value);
      }
    }
    return newURL.toString();
  } catch (e) {
    return "";
  }
};

export const paramsMetadata = [
  { display: "Referral (ref)", key: "ref", examples: "twitter, facebook" },
  { display: "UTM Source", key: "utm_source", examples: "twitter, facebook" },
  { display: "UTM Medium", key: "utm_medium", examples: "social, email" },
  { display: "UTM Campaign", key: "utm_campaign", examples: "summer_sale" },
  { display: "UTM Term", key: "utm_term", examples: "blue_shoes" },
  { display: "UTM Content", key: "utm_content", examples: "logolink" },
];

export const getUrlWithoutUTMParams = (url: string) => {
  try {
    const newURL = new URL(url);
    paramsMetadata.forEach((param) => newURL.searchParams.delete(param.key));
    return newURL.toString();
  } catch (e) {
    return url;
  }
};

export const getPrettyUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
};

export const getSubdomain = (url: string) => {
  const parts = url.replace("https://", "").split(".");
  if (parts.length > 2) {
    return parts[0];
  }
  return;
};

export const createHref = (
  href: string,
  domain: string,
  // any params, doesn't have to be all of them
  utmParams?: Partial<Record<(typeof UTMTags)[number], string>>,
) => {
  if (domain === "blastoff.org") return href;
  const url = new URL(
    href.startsWith("/") ? `https://blastoff.org${href}` : href,
  );
  if (utmParams) {
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
};

export function addSearchParam(
  key: string,
  value: string | null,
  {
    searchParams,
    pathname,
    router,
  }: {
    searchParams: ReadonlyURLSearchParams;
    pathname: string;
    router: { push(href: string, options?: { scroll?: boolean }): void };
  },
) {
  const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

  if (!value) {
    current.delete(key);
  } else {
    current.set(key, value);
  }
  // cast to string
  const search = current.toString();
  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
  const query = search ? `?${search}` : "";

  router.push(`${pathname}${query}`);
}

export function addSearchParams(
  values: Record<string, string | null>,
  {
    searchParams,
    pathname,
    router,
  }: {
    searchParams: ReadonlyURLSearchParams;
    pathname: string;
    router: { push(href: string, options?: { scroll?: boolean }): void };
  },
) {
  const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
  const allValues = Object.entries(values);
  for (const [key, value] of allValues) {
    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }
  }
  // cast to string
  const search = current.toString();
  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
  const query = search ? `?${search}` : "";

  router.push(`${pathname}${query}`);
}

export function removeSearchParams(
  key: string | string[],
  {
    searchParams,
    pathname,
    router,
  }: {
    searchParams: ReadonlyURLSearchParams;
    pathname: string;
    router: { push(href: string, options?: { scroll?: boolean }): void };
  },
) {
  const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
  if (typeof key === "string") {
    current.delete(key);
  } else {
    for (const k of key) {
      current.delete(k);
    }
  }

  // cast to string
  const search = current.toString();
  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
  const query = search ? `?${search}` : "";

  router.push(`${pathname}${query}`);
}
export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
export function cleanUrl(url?: string) {
  if (!url) return "";
  if (url.slice(-1) === ".") {
    return url.slice(0, -1);
  }
  return url;
}
