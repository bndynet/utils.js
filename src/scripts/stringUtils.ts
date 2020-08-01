import { v4 as uuid } from 'uuid';

export function randomString(length: number, characters?: string): string {
  characters = characters || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let result = '';
  const maxLen = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * maxLen));
  }
  return result;
}

export function getUUID(): string {
  return uuid();
}
