import { parse as qsParse } from 'query-string';
import { parse as urlParse, resolve } from 'url';

export interface UrlObject {
  protocol: string;
  host?: string;
  port: number;
  search: { [key: string]: any };
  hash: { [key: string]: any };
  pathname?: string;

  hostname?: string;
}

export function object2Url(urlObject: UrlObject): string {
  let url = `${urlObject.protocol}://${urlObject.host}${urlObject.port && urlObject.port > 0 ? ':' + urlObject.port : ''}${urlObject.pathname}`;

  if (urlObject.search && Object.keys(urlObject.search).length > 0) {
    url +=
      '?' +
      Object.keys(urlObject.search)
        .map((key) => {
          if (urlObject.search && urlObject.search[key]) {
            return `${key}=${urlObject.search[key]}`;
          } else {
            return key;
          }
        })
        .join('&');
  }

  if (urlObject.hash && Object.keys(urlObject.hash).length > 0) {
    url +=
      '#' +
      Object.keys(urlObject.hash)
        .map((key) => {
          if (urlObject.hash && urlObject.hash[key]) {
            return `${key}=${urlObject.hash[key]}`;
          } else {
            return key;
          }
        })
        .join('&');
  }

  return url;
}

export function parseUrl(url: string): UrlObject {
  const parsed = urlParse(url);
  const urlEntity: UrlObject = {
    protocol: parsed.protocol!.replace(':', ''),
    host: parsed.host,
    port: parseInt(parsed.port || '-1'),
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    search: qsParse(parsed.search || ''),
    hash: qsParse(parsed.hash || ''),
  };
  return urlEntity;
}

export function resolveUrl(from: string, to: string): string {
  return resolve(from, to);
}

export function setQueryString(url: string, key: string, value: any): string {
  const parsed = parseUrl(url);
  parsed.search[key] = value;
  return object2Url(parsed);
}

export function getCurrentUrl(): UrlObject {
  return parseUrl(location.href);
}
