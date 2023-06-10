import { nanoid } from 'nanoid';

export function randomString(length: number, characters?: string): string {
  characters = characters || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let result = '';
  const maxLen = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * maxLen));
  }
  return result;
}

export function getRandomId(prefix?: string): string {
  return prefix || 'bn' + nanoid();
}

export function replaceAll(text: string, value: string, replacement: string): string {
  return text.replace(new RegExp(value, 'ig'), replacement);
}

export function removeDuplicatedSlashesForUrl(url: string): string {
  return url.replace(/(?<!:)\/{2,}/g, '/');
}
