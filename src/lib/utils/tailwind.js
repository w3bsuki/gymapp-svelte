/**
 * Tailwind CSS utility functions for class names
 */

/**
 * Combines multiple class names into a single string
 * Filters out falsy values (null, undefined, false)
 * 
 * @param {...(string|boolean|null|undefined)} classes - The class names to combine
 * @returns {string} The combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Creates variant class utility that allows easy combination of base classes with variants
 * 
 * @param {Object} variants - An object mapping variant names to class strings
 * @param {string} defaultVariant - The default variant to use
 * @returns {Function} A function that combines variants with base classes
 */
export function cva(baseClasses, variants, defaultVariants = {}) {
  return ({ variant, ...props } = {}) => {
    const classes = [baseClasses];
    
    // For each variant type (e.g., size, color)
    Object.entries(variants).forEach(([variantType, variantOptions]) => {
      const variantValue = props[variantType] || defaultVariants[variantType];
      
      if (variantValue && variantOptions[variantValue]) {
        classes.push(variantOptions[variantValue]);
      }
    });
    
    // Add variant classes if specified
    if (variant && variants.variant && variants.variant[variant]) {
      classes.push(variants.variant[variant]);
    }
    
    return classes.filter(Boolean).join(' ');
  };
}
