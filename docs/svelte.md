# Svelte Integration and Best Practices

## SvelteKit Overview
SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing. It provides a streamlined approach to building both single-page applications (SPAs) and server-rendered applications.

## Integration Plan

### 1. Core Dependencies Installation

```bash
# Update existing SvelteKit dependencies
npm install @sveltejs/kit@latest svelte@latest

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn-svelte
npm install -D @shadcn/svelte

# Initialize shadcn-svelte
npx shadcn-svelte init

# Install Svelte Flow
npm install @xyflow/svelte

# Install other UI enhancements
npm install -D @sveltejs/svelte-scroller
npm install -D @floating-ui/dom
npm install -D motion lucide-svelte
npm install -D svelte-multiselect svelte-material-icons

# Authentication & Database
npm install lucia @lucia-auth/adapter-prisma
npm install prisma --save-dev
npm install @prisma/client

# Form handling & validation
npm install zod sveltekit-superforms
npm install -D superforms-svelte

# Add date/time utilities
npm install date-fns
```

### 2. Configuration Steps

#### Tailwind CSS Configuration
Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@shadcn-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to your CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### SvelteKit Configuration
Update `svelte.config.js`:
```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $utils: 'src/lib/utils',
      $server: 'src/lib/server',
      $stores: 'src/lib/stores'
    }
  }
};

export default config;
```

#### Prisma Setup
```bash
npx prisma init
```

Create a basic schema in `prisma/schema.prisma`

### 3. Integration Strategies

#### Combining shadcn/svelte with Svelte Flow
- Use shadcn components for UI elements within Svelte Flow nodes
- Create custom node types that incorporate shadcn components
- Ensure consistent styling by using Tailwind classes across both systems

#### Authentication Flow
- Implement Lucia Auth for authentication
- Create protected routes using SvelteKit's hooks
- Store user session data in cookies and/or localStorage

#### State Management
- Use SvelteKit's built-in stores for global state
- Create custom stores for specific features
- Use derived stores for computed values

## Best Practices

### Component Structure
1. **Single Responsibility Principle**: Each component should do one thing well
2. **Props Documentation**: Document props using JSDoc comments
3. **Logical Grouping**: Group related components in directories

```svelte
<!-- Good Component Structure -->
<script>
  /** @type {string} The title of the course */
  export let title;
  
  /** @type {string} The description of the course */
  export let description;
  
  /** @type {number} The price in USD */
  export let price;
  
  // Local state and logic here
</script>

<article class="course-card">
  <h2>{title}</h2>
  <p>{description}</p>
  <span class="price">${price}</span>
  <slot />
</article>
```

### Reactivity
1. Use reactive declarations (`$:`) for derived values
2. Avoid redundant state
3. Use reactive stores for cross-component state

```svelte
<script>
  import { coursesStore } from '$lib/stores/courses';
  
  export let userId;
  
  // Reactive declaration - recalculates when dependencies change
  $: userCourses = $coursesStore.filter(course => course.userId === userId);
  $: completedCourses = userCourses.filter(course => course.completed);
  $: progress = userCourses.length ? 
    (completedCourses.length / userCourses.length) * 100 : 0;
</script>
```

### Performance
1. Use `{#key ...}` blocks for forcing re-renders
2. Avoid expensive computations in reactive statements
3. Use action functions for DOM manipulation
4. Implement virtualization for long lists

### Routing
1. Use SvelteKit's filesystem-based routing
2. Create layouts for shared UI elements
3. Use nested layouts for complex UIs
4. Implement proper error boundaries

### API Integration
1. Use SvelteKit endpoints for API routes
2. Implement proper error handling
3. Use `load` functions for data fetching
4. Cache responses when appropriate

### Styling
1. Use Tailwind CSS for utility-first styling
2. Create consistent design tokens
3. Use CSS variables for theme values
4. Implement dark mode support

### Accessibility
1. Use semantic HTML
2. Test with keyboard navigation
3. Add proper ARIA attributes
4. Ensure color contrast
5. Test with screen readers

### Testing
1. Write unit tests for components
2. Write integration tests for pages
3. Write end-to-end tests for critical flows
4. Use Vitest for unit testing
5. Use Playwright for e2e testing

## Resources
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Society](https://sveltesociety.dev/)
- [shadcn/svelte Documentation](https://www.shadcn-svelte.com/)
- [Svelte Flow Documentation](https://svelteflow.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucia Auth Documentation](https://lucia-auth.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
