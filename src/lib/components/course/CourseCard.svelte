<script lang="ts">  import { cn } from '$lib/utils/cn';
  import { createEventDispatcher } from 'svelte';
  import type { Course } from '$lib/types/course';
  import Button from '$lib/components/ui/button/button.svelte';
  
  export let course: Course;
  export let isInFlow = false;
  export let isHighlighted = false;
  export let connectedCourses: Course[] = [];

  const dispatch = createEventDispatcher<{
    highlight: { courseId: string };
    unhighlight: { courseId: string };
    select: { course: Course };
    focusInFlow: { courseId: string };
    buy: { courseId: string };
  }>();

  // Format helpers
  const formatPrice = (price: number) => (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  );
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;
  };
  
  const calculateDiscount = (original: number, discount: number) => (
    Math.round(((original - discount) / original) * 100)
  );

  const handleInteraction = (type: 'enter' | 'leave' | 'click') => {
    if (type === 'enter') {
      dispatch('highlight', { courseId: course.id });
    } else if (type === 'leave' && !isHighlighted) {
      dispatch('unhighlight', { courseId: course.id });
    } else if (type === 'click') {
      if (isHighlighted) {
        isHighlighted = false;
        dispatch('unhighlight', { courseId: course.id });
      } else {
        dispatch('select', { course });
      }
    }
  };

  const handleBuy = (e: Event) => {
    e.stopPropagation(); // Prevent card click
    dispatch('buy', { courseId: course.id });
  };

  // Dynamic classes using shadcn conventions
  $: cardClasses = cn(
    // Base styles - modern and clean
    "group relative bg-card text-card-foreground rounded-lg overflow-hidden",
    "border-2 shadow-sm",
    
    // Double border effect with better contrast
    "before:absolute before:inset-[-1px] before:rounded-[9px] before:border before:border-black/[0.04] dark:before:border-white/[0.03]",
    "after:absolute after:inset-[-2px] after:rounded-[10px] after:border after:border-black/[0.03] dark:after:border-white/[0.02]",
    
    // States with improved visual hierarchy
    {
      "border-primary/80 bg-primary/[0.04] dark:bg-primary/[0.03]": isHighlighted,
      "border-border dark:border-border": !isHighlighted,
      "opacity-75": !isInFlow && !isHighlighted,
    },
    
    // Hover states - instant, performant
    "hover:border-primary/60 dark:hover:border-primary/50",
    "hover:bg-accent/[0.03] dark:hover:bg-accent/[0.02]",
    "hover:shadow-md transition-shadow duration-150"
  );

  $: tagClasses = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    "bg-secondary/80 text-secondary-foreground/90",
    "dark:bg-secondary/20 dark:text-secondary-foreground/80"
  );

  $: featuredBadgeClasses = cn(
    "absolute top-3 right-3 z-20",
    "px-2.5 py-0.5 rounded-full text-xs font-medium",
    "bg-primary/90 text-primary-foreground",
    "backdrop-blur-[2px] shadow-sm"
  );
</script>

<div 
  class={cardClasses}
  on:mouseenter={() => handleInteraction('enter')}
  on:mouseleave={() => handleInteraction('leave')}
  on:click={() => handleInteraction('click')}
  on:keydown={e => e.key === 'Enter' && handleInteraction('click')}
  tabindex="0"
  role="button"
  aria-pressed={isHighlighted}
>
  <!-- Course Image with Aspect Ratio Lock -->
  <div class="aspect-[16/9] overflow-hidden relative">
    <img
      src={course.imageUrl}
      alt={course.title}
      class="w-full h-full object-cover"
      loading="lazy"
    />
    {#if course.featured}
      <div class={featuredBadgeClasses}>
        <span class="relative">Featured</span>
      </div>
    {/if}
  </div>

  <!-- Content Container -->
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="space-y-2.5">
      <h3 class="text-xl leading-tight font-semibold tracking-tight">
        {course.title}
      </h3>
      <p class="text-sm text-muted-foreground line-clamp-2">
        {course.description}
      </p>
    </div>

    <!-- Meta Info -->
    <div class="flex flex-wrap gap-2 text-sm">
      <span class={tagClasses}>{course.difficulty}</span>
      <span class={tagClasses}>{formatDuration(course.duration)}</span>
      <span class={tagClasses}>{course.category}</span>
    </div>

    <!-- Instructor -->
    <div class="flex items-center gap-3">
      <div class="relative">
        <img
          src={course.instructorAvatar}
          alt={course.instructor}
          class="w-10 h-10 rounded-full border-2 border-background"
          loading="lazy"
        />
        <div class="absolute inset-0 rounded-full shadow-inner"></div>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-medium">{course.instructor}</span>
        <div class="flex items-center gap-1.5 text-muted-foreground">
          <span class="text-yellow-400 text-sm">★</span>
          <span class="text-sm font-medium">{course.rating}</span>
          <span class="text-xs">({course.reviews} reviews)</span>
        </div>
      </div>
    </div>

    <!-- Price and Action -->
    <div class="pt-4 border-t border-border flex items-center justify-between gap-4">
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold">
          {formatPrice(course.discountPrice || course.price)}
        </span>
        {#if course.discountPrice}
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground line-through">
              {formatPrice(course.price)}
            </span>
            <span class="text-xs font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              {calculateDiscount(course.price, course.discountPrice)}% OFF
            </span>
          </div>
        {/if}
      </div>
      <Button
        variant="default"
        size="sm"
        on:click={handleBuy}
        class="whitespace-nowrap"
      >
        Buy Course
      </Button>
    </div>

    <!-- Connected Courses -->
    {#if connectedCourses.length > 0}
      <div class="pt-4 border-t border-border">
        <p class="text-sm text-muted-foreground mb-2.5">Related Courses:</p>
        <div class="flex flex-wrap gap-2">
          {#each connectedCourses.slice(0, 2) as connected}
            <span class={tagClasses}>
              {connected.title}
            </span>
          {/each}
          {#if connectedCourses.length > 2}
            <span class={cn(tagClasses, "bg-muted text-muted-foreground")}>
              +{connectedCourses.length - 2} more
            </span>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
