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
