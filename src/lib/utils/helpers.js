/**
 * Utility functions for the application
 */

/**
 * Formats a price as a currency string
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} The formatted price
 */
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
}

/**
 * Slugifies a string
 * @param {string} text - The text to slugify
 * @returns {string} The slugified text
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Truncates a string to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - The maximum length
 * @returns {string} The truncated text
 */
export function truncate(text, length) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Calculates reading time for text content
 * @param {string} content - The content to calculate reading time for
 * @param {number} wordsPerMinute - Words per minute (default: 200)
 * @returns {number} The reading time in minutes
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Formats a date
 * @param {Date|string} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} The formatted date
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(
    'en-US', 
    { ...defaultOptions, ...options }
  ).format(new Date(date));
}

/**
 * Creates a random ID
 * @param {number} length - The length of the ID
 * @returns {string} The random ID
 */
export function randomId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}
