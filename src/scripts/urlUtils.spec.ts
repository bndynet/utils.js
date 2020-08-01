import { parseUrl, resolveUrl, urlEntityToString } from './urlUtils';

describe('Test for urlUtils', () => {
  it ('', () => {
    // expect(parseUrl('http://bndy.net/about/me?qs#hash1=1&hash2')).toBe('1');
  });

  it('parseUrl', () => {
    expect(parseUrl('http://bndy.net/about/me').pathname).toBe('/about/me');
    expect(parseUrl('http://bndy.net/about/me?qs=1#hash1=1&hash2=2').search['qs']).toBe('1');
  });

  it('resolveUrl', () => {
    expect(resolveUrl('http://bndy.net/about', '/home')).toBe('http://bndy.net/home');
    expect(resolveUrl('http://bndy.net/about/', 'me')).toBe('http://bndy.net/about/me');
    expect(resolveUrl('http://bndy.net/about', 'me')).toBe('http://bndy.net/me');
    expect(resolveUrl('http://bndy.net/about', 'me?a=1')).toBe('http://bndy.net/me?a=1');
  });

  it('urlEntityToString', () => {
    const u = 'http://bndy.net/about/me?qs=1#hash1=1&hash2=2';
    const uo = parseUrl(u);
    // expect(uo).toBe('');
    expect(urlEntityToString(uo)).toBe(u);
  });
});
