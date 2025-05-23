import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

/**
 * Combines multiple class names into a single string
 * Filters out falsy values (null, undefined, false)
 * 
 * @param {...(string|boolean|null|undefined)} classes - The class names to combine
 * @returns {string} The combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
