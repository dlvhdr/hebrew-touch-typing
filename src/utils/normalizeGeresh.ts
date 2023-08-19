import {MAC_GERESH, WINDOWS_GERESH} from '../constants/hebrewLetters';

/**
 * Function to normalize differences between geresh (Hebrew apostrophe)
 * when typed on Windows "'" vs Mac "׳"
 */
export function normalizeGeresh(input: string): string {
  return input.replace(new RegExp(MAC_GERESH, 'g'), WINDOWS_GERESH);
}
