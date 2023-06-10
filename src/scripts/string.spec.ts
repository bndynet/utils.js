import { replaceAll, removeDuplicatedSlashesForUrl } from './string';
describe('test for stringUtils', () => {
  it('replaceAll', () => {
    const text = `abcdabcdefg`;
    expect(replaceAll(text, 'abcd', '-')).toBe('--efg');
    expect(replaceAll(text, 'ab', '-')).toBe('-cd-cdefg');
  });

  it('removeDuplicatedSlashesForUrl', () => {
    expect(removeDuplicatedSlashesForUrl('http://bndy.net/my///about//me')).toBe('http://bndy.net/my/about/me');
  });
});
