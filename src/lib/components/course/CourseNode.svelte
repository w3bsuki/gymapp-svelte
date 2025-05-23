<script lang="ts">
  import type { Course } from '$lib/types/course';
  import { cn } from '$lib/utils/cn';

  // Only use data prop for our component
  export let data: {
    course: Course;
    isSelected: boolean;
    isHighlighted: boolean;
    isConnected: boolean;
  };

  $: containerClasses = cn(
    // Base styles - following shadcn conventions
    "relative p-4 bg-card text-card-foreground",
    "rounded-lg border-2 min-w-[240px] max-w-[280px]",
    
    // Double border effect using pseudo-elements for depth
    "before:absolute before:inset-[-1px] before:rounded-[9px] before:border before:border-black/[0.04] dark:before:border-white/[0.03]",
    "after:absolute after:inset-[-2px] after:rounded-[10px] after:border after:border-black/[0.03] dark:after:border-white/[0.02]",
    
    // States with improved visual hierarchy
    {
      "border-primary shadow-sm bg-primary/[0.04] dark:bg-primary/[0.03]": data.isSelected,
      "border-accent/70 bg-accent/[0.03] dark:bg-accent/[0.02]": data.isHighlighted && !data.isSelected,
      "border-border dark:border-border": !data.isSelected && !data.isHighlighted,
      "opacity-40": !data.isConnected && !data.isHighlighted && !data.isSelected
    },
    
    // Instant hover states for performance
    "hover:border-primary/60 dark:hover:border-primary/50",
    "hover:bg-accent/[0.03] dark:hover:bg-accent/[0.02]",
    "hover:shadow-sm"
  );

  $: titleClasses = cn(
    "text-lg font-semibold tracking-tight",
    "line-clamp-1"
  );

  $: descriptionClasses = cn(
    "text-sm text-muted-foreground mb-3",
    "line-clamp-2 min-h-[2.5rem]"
  );

  $: tagClasses = cn(
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
    "bg-secondary/80 text-secondary-foreground/90",
    "dark:bg-secondary/20 dark:text-secondary-foreground/80"
  );

  // Truncate long description
  $: shortDescription = data.course.description?.length > 80 
    ? `${data.course.description.slice(0, 80)}...` 
    : data.course.description;
</script>

<div 
  class={containerClasses}
  role="option" 
  tabindex="0"
  aria-label={`Course: ${data.course.title}`}
  aria-selected={data.isSelected}  on:click  
  on:keydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.target) {
        // Use TypeScript-compatible syntax for Svelte
        e.target.dispatchEvent(new MouseEvent('click'));
      }
    }
  }}
>
  <!-- Course Title -->  
  <h3 class={titleClasses}>{data.course.title}</h3>
  
  <!-- Course Description -->
  <p class={descriptionClasses}>{shortDescription}</p>
  
  <!-- Course Meta Information -->
  <div class="flex flex-wrap gap-2">
    <span class={tagClasses}>
      {data.course.category}
    </span>
    <span class={tagClasses}>
      {data.course.difficulty}
    </span>
    {#if data.course.featured}
      <span class={cn(tagClasses, "bg-primary/20 text-primary dark:bg-primary/10")}>
        Featured
      </span>
    {/if}
  </div>
  <!-- Selection Indicator -->
  {#if data.isSelected}
    <div class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full shadow-sm flex items-center justify-center">
      <svg class="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  {/if}

  <!-- Connection Indicator when highlighted -->
  {#if data.isHighlighted}
    <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
  {/if}
</div>

<style>
  /* Optimize transitions by only animating opacity */
  div {
    transition: opacity 0.2s ease-out;
  }
</style>
