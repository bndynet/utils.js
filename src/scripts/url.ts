import { parse as qsParse } from 'query-string';
import * as URLParser from 'url-parse';

export interface UrlObject {
  protocol: string;
  host?: string;
  port?: string;
  search: { [key: string]: any };
  hash: { [key: string]: any };
  pathname?: string;

  hostname?: string;
}

export function object2Url(urlObject: UrlObject): string {
  let url = `${urlObject.protocol}://${urlObject.host}${urlObject.port ? ':' + urlObject.port : ''}${urlObject.pathname}`;

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
  const parsed = new URLParser(url);
  const urlEntity: UrlObject = {
    protocol: parsed.protocol.replace(':', ''),
    host: parsed.host,
    port: parsed.port,
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    search: qsParse(parsed.query || ''),
    hash: qsParse(parsed.hash || ''),
  };
  return urlEntity;
}

export function resolveUrl(from: string, to: string): string {
  const root = from.indexOf('//') > 0 ? from.split('//')[0] + '//' + from.split('//')[1].split('/')[0] : '';

  let paths = from.indexOf('//') > 0 ? from.split('//')[1].split('/').slice(1) : from.split('//')[0].split('/').slice(1);
  if (paths.length > 0) {
    paths = paths.slice(0, paths.length - 1);
  }

  let result = root;
  if (to.startsWith('/')) {
    result += to;
  } else if (to.startsWith('../')) {
    do {
      to = to.replace('../', '');
      paths = paths.slice(0, paths.length - 1);
    } while (to.startsWith('../'));
    result += (paths.length === 0 ? '' : '/' + paths.join('/')) + '/' + to;
  } else {
    result += (paths.length === 0 ? '' : '/' + paths.join('/')) + '/' + to;
  }

  return result;
}

export function setQueryString(url: string, key: string, value: any): string {
  const parsed = parseUrl(url);
  parsed.search[key] = value;
  return object2Url(parsed);
}

export function getCurrentUrl(): UrlObject {
  return parseUrl(location.href);
}
