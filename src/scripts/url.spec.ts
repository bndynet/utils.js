import { parseUrl, resolveUrl, object2Url } from './url';

describe('Test for urlUtils', () => {
  it('parseUrl', () => {
    expect(parseUrl('http://bndy.net/about/me').pathname).toBe('/about/me');
    const p = parseUrl('http://bndy.net/about/me?qs=1#hash1=1&hash2=2');
    expect(p.search['qs']).toBe('1');
  });

  it('resolveUrl', () => {
    expect(resolveUrl('http://bndy.net/about', '/home')).toBe('http://bndy.net/home');
    expect(resolveUrl('http://bndy.net/about/', 'me')).toBe('http://bndy.net/about/me');
    expect(resolveUrl('http://bndy.net/about', 'me')).toBe('http://bndy.net/me');
    expect(resolveUrl('http://bndy.net/about', 'me?a=1')).toBe('http://bndy.net/me?a=1');
  });

  it('object2Url', () => {
    const u = 'http://bndy.net/about/me?qs=1#hash1=1&hash2=2';
    const uo = parseUrl(u);
    expect(object2Url(uo)).toBe(u);
  });
});
