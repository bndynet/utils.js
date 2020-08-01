import { format } from 'path';
import { parse as qsParse, ParseOptions } from 'query-string';
import { parse as urlParse, resolve } from 'url';

expect interface UrlEntity {
  protocol?: string;
  host?: string;
  port?: number;
  search?: {[key: string]: any};
  hash?: {[key: string]: any};
  pathname?: string;

  hostname?: string;
}

export function getCurrentUrl(): UrlEntity {
  return parseUrl(location.href);
}

export function parseUrl(url: string): UrlEntity {
  const urlEntity: UrlEntity = {};
  const parsed = urlParse(url);
  urlEntity.protocol = parsed.protocol!.replace(':', '');
  urlEntity.host = parsed.host;
  urlEntity.port = parseInt(parsed.port||'-1');
  urlEntity.hostname = parsed.hostname;
  urlEntity.pathname = parsed.pathname;
  urlEntity.search = qsParse(parsed.search||'');
  urlEntity.hash = qsParse(parsed.hash || '');
  return urlEntity;
}

export function resolveUrl(from: string, to: string): string {
  return resolve(from, to);
}

export function appendQueryString(url: string, key: string, value: any): string {

}

export function urlEntityToString(urlObject: UrlEntity): string {
  let url = `${urlObject.protocol}://${urlObject.host}${urlObject.port &&urlObject.port > 0 ? ':' + urlObject.port: ''}${urlObject.pathname}`;

  if (urlObject.search && Object.keys(urlObject.search).length > 0) {
    url += '?' + Object.keys(urlObject.search).map(key => {
      if(urlObject.search && urlObject.search[key]) {
        return `${key}=${urlObject.search[key]}`;
      } else {
        return key;
      }
    }).join('&');
  }

  if (urlObject.hash && Object.keys(urlObject.hash).length > 0) {
    url += '#' + Object.keys(urlObject.hash).map(key => {
      if(urlObject.hash && urlObject.hash[key]) {
        return `${key}=${urlObject.hash[key]}`;
      } else {
        return key;
      }
    }).join('&');
  }


  return url;
}