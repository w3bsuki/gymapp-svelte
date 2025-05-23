<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cn } from '$lib/utils';
  import CourseCard from '$lib/components/course/CourseCard.svelte';
  import CourseFlow from '$lib/components/course/CourseFlow.svelte';
  import type { Course } from '$lib/types/course';

  // Temporary mock data for courses
  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Body Transformation',
      description: 'A comprehensive 12-week program for total body transformation. Suitable for all fitness levels.',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 99.99,
      discountPrice: 79.99,
      difficulty: 'Intermediate',
      duration: 720,
      category: 'Transformation',
      rating: 4.8,
      reviews: 342,
      instructor: 'Alex Johnson',
      instructorAvatar: 'https://i.pravatar.cc/150?img=11',
      featured: true,
      tags: ['Weight Loss', 'Muscle Gain', 'Nutrition Plan']
    },
    {
      id: '2',
      title: 'Strength Training Fundamentals',
      description: 'Master the basics of strength training with proper form and technique. Build a solid foundation for your fitness journey.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 69.99,
      difficulty: 'Beginner',
      duration: 480,
      category: 'Strength',
      rating: 4.6,
      reviews: 187,
      instructor: 'Mike Davis',
      instructorAvatar: 'https://i.pravatar.cc/150?img=12',
      featured: false,
      tags: ['Barbell Training', 'Form Technique', 'Progressive Overload']
    },
    {
      id: '3',
      title: 'Advanced HIIT Workouts',
      description: 'High-intensity interval training for experienced fitness enthusiasts. Take your conditioning to the next level.',
      imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 89.99,
      difficulty: 'Advanced',
      duration: 600,
      category: 'HIIT',
      rating: 4.9,
      reviews: 276,
      instructor: 'Sarah Williams',
      instructorAvatar: 'https://i.pravatar.cc/150?img=5',
      featured: true,
      tags: ['Fat Burning', 'Conditioning', 'Cardio']
    },
    {
      id: '4',
      title: 'Nutrition Mastery',
      description: 'Learn how to fuel your body for optimal performance and recovery. Includes meal plans and recipes.',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 59.99,
      difficulty: 'Beginner',
      duration: 300,
      category: 'Nutrition',
      rating: 4.7,
      reviews: 195,
      instructor: 'Dr. Emily Chen',
      instructorAvatar: 'https://i.pravatar.cc/150?img=13',
      featured: false,
      tags: ['Meal Planning', 'Macronutrients', 'Recipes']
    },
    {
      id: '5',
      title: 'Flexibility & Mobility',
      description: 'Improve your range of motion, prevent injuries, and enhance performance with targeted mobility work.',
      imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 49.99,
      difficulty: 'Beginner',
      duration: 240,
      category: 'Mobility',
      rating: 4.5,
      reviews: 132,
      instructor: 'David Kim',
      instructorAvatar: 'https://i.pravatar.cc/150?img=15',
      featured: false,
      tags: ['Joint Health', 'Recovery', 'Stretching']
    },
    {
      id: '6',
      title: 'Powerlifting Specialization',
      description: 'Build maximal strength in the squat, bench, and deadlift with this specialized powerlifting program.',
      imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
      price: 89.99,
      difficulty: 'Advanced',
      duration: 720,
      category: 'Strength',
      rating: 4.9,
      reviews: 284,
      instructor: 'John Strong',
      instructorAvatar: 'https://i.pravatar.cc/150?img=50',
      featured: true,
      tags: ['Squat', 'Bench Press', 'Deadlift', 'Competition Prep']
    },
    {
      id: '7',
      title: 'Yoga for Athletes',
      description: 'Complement your training with yoga practices designed specifically for athletes. Improve recovery, balance, and mental focus.',
      imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 59.99,
      difficulty: 'Intermediate',
      duration: 360,
      category: 'Yoga',
      rating: 4.7,
      reviews: 159,
      instructor: 'Leah Roberts',
      instructorAvatar: 'https://i.pravatar.cc/150?img=29',
      featured: false,
      tags: ['Recovery', 'Balance', 'Flexibility', 'Mental Focus']
    },
    {
      id: '8',
      title: 'Bodyweight Mastery',
      description: 'Build strength, muscle, and athleticism using just your bodyweight. Perfect for home workouts or when traveling.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 69.99,
      difficulty: 'Intermediate',
      duration: 480,
      category: 'Bodyweight',
      rating: 4.8,
      reviews: 217,
      instructor: 'Carlos Mendez',
      instructorAvatar: 'https://i.pravatar.cc/150?img=22',
      featured: false,
      tags: ['Calisthenics', 'Home Workouts', 'Progressive Overload']
    },
    {
      id: '9',
      title: 'Marathon Training',
      description: 'A complete 16-week program to prepare for your first marathon or improve your marathon time.',
      imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 79.99,
      difficulty: 'Advanced',
      duration: 960,
      category: 'Running',
      rating: 4.9,
      reviews: 324,
      instructor: 'Maria Lopez',
      instructorAvatar: 'https://i.pravatar.cc/150?img=33',
      featured: true,
      tags: ['Endurance', 'Race Preparation', 'Nutrition', 'Recovery']
    },
    {
      id: '10',
      title: 'Functional Movement Patterns',
      description: 'Master the seven fundamental movement patterns that are essential for daily life and athletic performance.',
      imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      price: 69.99,
      difficulty: 'Intermediate',
      duration: 420,
      category: 'Functional',
      rating: 4.7,
      reviews: 189,
      instructor: 'Thomas Wright',
      instructorAvatar: 'https://i.pravatar.cc/150?img=67',
      featured: false,
      tags: ['Movement Patterns', 'Mobility', 'Strength', 'Performance']
    },
    {
      id: '11',
      title: 'Kettlebell Foundations',
      description: 'Learn how to use kettlebells effectively to build strength, power, and conditioning with this comprehensive course.',
      imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 74.99,
      discountPrice: 59.99,
      difficulty: 'Intermediate',
      duration: 380,
      category: 'Strength',
      rating: 4.8,
      reviews: 211,
      instructor: 'Pavel Anderson',
      instructorAvatar: 'https://i.pravatar.cc/150?img=53',
      featured: false,
      tags: ['Kettlebell Swings', 'Turkish Get-Up', 'Snatch', 'Clean and Press']
    },
    {
      id: '12',
      title: 'Mind-Body Connection',
      description: 'Enhance the connection between your mind and body to improve performance, reduce stress, and accelerate recovery.',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80',
      price: 54.99,
      difficulty: 'Beginner',
      duration: 300,
      category: 'Wellness',
      rating: 4.6,
      reviews: 147,
      instructor: 'Sophia Miller',
      instructorAvatar: 'https://i.pravatar.cc/150?img=48',
      featured: false,
      tags: ['Meditation', 'Stress Reduction', 'Mental Training', 'Recovery']
    }
  ];

  // Get unique categories for filter dropdown
  const categories = [...new Set(courses.map(course => course.category))].sort();

  // Get unique difficulty levels for filter dropdown
  const difficultyLevels = [...new Set(courses.map(course => course.difficulty))].sort();

  // Filter state
  let searchQuery = '';
  let selectedCategory = '';
  let selectedDifficulty = '';
  let showFeaturedOnly = false;

  // Animation state - simplified for better performance
  let visible = false;
  onMount(() => {
    requestAnimationFrame(() => {
      visible = true;
    });
  });

  // Flow interaction state
  let courseFlowRef: any; // Reference to the CourseFlow component
  let connectedCourseIds: string[] = []; // IDs of courses connected in the flow
  let highlightedCourseId: string | null = null; // Currently highlighted course ID
  let courseConnections: Record<string, string[]> = {}; // Map of course connections

  // Reactive statement to compute connected courses for each course
  $: courseCardConnections = filteredCourses.reduce((acc, course) => {
    if (course.id in courseConnections && highlightedCourseId === course.id) {
      acc[course.id] = courseConnections[course.id]
        .map(id => filteredCourses.find(c => c.id === id))
        .filter((c): c is Course => !!c); // Type predicate to ensure Course[]
    } else {
      acc[course.id] = [];
    }
    return acc;
  }, {} as Record<string, Course[]>);

  // Computed: filtered courses
  $: filteredCourses = courses.filter(course => {
    // Apply category filter
    if (selectedCategory && course.category !== selectedCategory) {
      return false;
    }

    // Apply difficulty filter
    if (selectedDifficulty && course.difficulty !== selectedDifficulty) {
      return false;
    }

    // Apply featured filter
    if (showFeaturedOnly && !course.featured) {
      return false;
    }

    // Apply search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Format price with currency
  function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  // Format duration in hours and minutes
  function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }

    return `${mins}m`;
  }
  // Calculate discount percentage
  function calculateDiscount(original: number, discount: number): number {
    return Math.round(((original - discount) / original) * 100);
  }

  // Handle course selection
  function handleCourseSelect(course: Course) {
    // Navigate to the course detail page
    window.location.href = `/courses/${course.id}`;
  }
</script>

<svelte:head>
  <title>Courses | FitTrainer</title>
  <meta name="description" content="Browse our selection of professional fitness courses. From beginner to advanced, find the perfect program for your fitness goals." />
</svelte:head>

<div class="flex-1">
  <section class="relative pt-12 pb-8 -mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-muted dark:from-gray-900 dark:to-gray-800/50">
    <div class="container px-4 pt-24">
      <div class="text-center" in:fade={{ duration: 400, delay: 100 }}>
        <h1 class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 text-5xl font-extrabold tracking-tight lg:text-6xl">
          Find Your Perfect Course
        </h1>
        <p class="mx-auto max-w-2xl text-muted-foreground text-lg sm:text-xl mb-8">
          Browse our expert-designed courses and take your fitness journey to the next level. Each course is crafted to help you achieve your goals.
        </p>
      </div>
    </div>
  </section>

  <section class="py-8">
    <div class="container px-4">      
      <!-- Modern Filter UI with Enhanced Card Layout -->
      <div class="bg-card rounded-xl border shadow-sm p-6 mb-8">
        <div class="space-y-6">
          <!-- Filter Header with Clear Button -->
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-lg leading-none tracking-tight mb-0">Course Filters</h2>
            {#if searchQuery || selectedCategory || selectedDifficulty || showFeaturedOnly}
              <Button 
                variant="ghost" 
                size="sm"
                on:click={() => { 
                  selectedCategory = ''; 
                  selectedDifficulty = ''; 
                  searchQuery = ''; 
                  showFeaturedOnly = false; 
                }}
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <span>Clear All</span>
              </Button>
            {/if}
          </div>

          <!-- Enhanced Filter Controls with Grid Layout -->
          <div class="grid gap-6 grid-cols-1 md:grid-cols-3">
            <!-- Search Input with Icon and Label -->
            <div class="space-y-2">
              <label for="search" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Search Courses
              </label>
              <div class="relative" role="search">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                <input
                  type="search"
                  id="search"
                  placeholder="Search by title or description..."
                  bind:value={searchQuery}
                  class={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-all duration-200"
                  )}
                  aria-label="Search courses"
                />
              </div>
            </div>

            <!-- Category Select with Icon -->
            <div class="space-y-2">
              <label for="category" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Category
              </label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <select
                  id="category"
                  bind:value={selectedCategory}
                  class={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                    "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-200"
                  )}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {#each categories as category}
                    <option value={category}>{category}</option>
                  {/each}
                </select>
                <div class="absolute right-3 top-2.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Difficulty Select with Icon -->
            <div class="space-y-2">
              <label for="difficulty" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Difficulty Level
              </label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <select
                  id="difficulty"
                  bind:value={selectedDifficulty}
                  class={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                    "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-200"
                  )}
                  aria-label="Filter by difficulty level"
                >
                  <option value="">All Levels</option>
                  {#each difficultyLevels as level}
                    <option value={level}>{level}</option>
                  {/each}
                </select>
                <div class="absolute right-3 top-2.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Filter Pills -->
          <div class="flex flex-wrap gap-2 pt-4" role="list" aria-label="Active filters">
            <button 
              class={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "hover:shadow-md",
                showFeaturedOnly 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"              )}
              on:click={() => showFeaturedOnly = !showFeaturedOnly}
              aria-pressed={showFeaturedOnly}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class={cn("w-4 h-4 mr-1.5 transition-transform duration-200", showFeaturedOnly && "scale-110")} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {showFeaturedOnly ? 'Featured Only' : 'All Courses'}
            </button>
            
            {#each categories as category}
              <button 
                class={cn(
                  "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "hover:shadow-md",
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"                )}
                on:click={() => selectedCategory = selectedCategory === category ? '' : category}
                aria-pressed={selectedCategory === category}
              >
                {category}
                {#if selectedCategory === category}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 transition-transform duration-200 scale-110" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Results Section with Enhanced Grid Layout -->
      <div class="container px-4 mb-16">
        <!-- Header with Filter Results -->
        <div class="mb-6 flex flex-wrap justify-between items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-semibold tracking-tight">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available
              </h2>
              {#if searchQuery || selectedCategory || selectedDifficulty || showFeaturedOnly}
                <span class="px-2 py-1 text-sm rounded-md bg-muted text-muted-foreground">
                  Filtered
                </span>
              {/if}
            </div>
            {#if filteredCourses.length > 0}
              <p class="text-sm text-muted-foreground mt-1.5">
                {#if selectedCategory}in <span class="font-medium text-foreground">{selectedCategory}</span>{/if}
                {#if selectedDifficulty}of <span class="font-medium text-foreground">{selectedDifficulty}</span> difficulty{/if}
                {#if showFeaturedOnly}that are featured{/if}
              </p>
            {/if}
          </div>

          <div class="flex items-center gap-4">
            <select
              class={cn(
                "flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "transition-colors duration-200"
              )}
              disabled
              aria-label="Sort courses"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Course Results -->
        {#if filteredCourses.length === 0}
          <div 
            class="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center"
            in:fade={{ duration: 200 }}
            role="alert"
          >
            <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold">No courses found</h3>
            <p class="mb-4 mt-2 text-sm text-muted-foreground">
              {searchQuery ? "No courses match your search terms." : "Try adjusting your filters to find what you're looking for."}
            </p>
            <Button 
              variant="outline"
              on:click={() => { selectedCategory = ''; selectedDifficulty = ''; searchQuery = ''; showFeaturedOnly = false; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v4a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Reset Filters
            </Button>
          </div>
        {:else}
          <div 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="grid"
            aria-label="Course listings"
          >
            {#each filteredCourses as course, i (course.id)}
              <div 
                role="gridcell"
                animate:flip={{ duration: 300 }}
                in:fade|local={{ duration: 300, delay: Math.min(i * 50, 400) }}
              >                <CourseCard 
                  {course}
                  isInFlow={connectedCourseIds?.includes(course.id)}
                  isHighlighted={highlightedCourseId === course.id}
                  connectedCourses={courseCardConnections[course.id] || []}
                  on:highlight={e => courseFlowRef?.highlightNode(e.detail.courseId)}
                  on:unhighlight={e => courseFlowRef?.unhighlightNode(e.detail.courseId)}
                  on:select={e => handleCourseSelect(e.detail.course)}
                  on:focusInFlow={e => courseFlowRef?.focusNode(e.detail.courseId)}
                />
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Course Flow Section -->
      {#if filteredCourses.length > 1}
        <div class="mt-16 space-y-6" in:fade={{ duration: 400, delay: 200 }}>
          <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div class="space-y-1">
              <h2 class="text-2xl font-semibold tracking-tight">Course Learning Paths</h2>
              <p class="text-sm text-muted-foreground max-w-lg">
                Explore course relationships and recommended learning paths. The arrows show progression from beginner to advanced levels.
              </p>
            </div>
            <div class="flex items-center gap-4">
              <Button variant="outline" size="sm" class="hover:bg-accent/5 focus-visible:ring-ring">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                View as List
              </Button>
              <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <span>How It Works</span>
              </Button>
            </div>
          </div>

          <!-- Course Flow Legend -->
          <div class="flex flex-wrap gap-4 text-sm text-muted-foreground p-4 rounded-lg bg-card border">
            <div class="flex items-center gap-2">
              <span class="h-1 w-8 bg-blue-500 rounded-full"></span>
              <span>Same Category Progression</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-1 w-8 bg-purple-500 rounded-full opacity-60"></span>
              <span>Related Skills</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-1 w-8 bg-orange-400 rounded-full opacity-60 [border-style:dashed]"></span>
              <span>Featured Course Connection</span>
            </div>
          </div>

          <div class="relative">
            <!-- Flow Visualization -->
            <div class="rounded-lg border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-shadow duration-200 overflow-hidden">
              <div class="h-[600px] bg-gradient-to-br from-background via-accent/5 to-background" aria-label="Course relationship diagram">
                <CourseFlow 
                  courses={filteredCourses} 
                  selectedCategory={selectedCategory}
                  bind:this={courseFlowRef}
                  on:flowUpdated={e => {
                    connectedCourseIds = e.detail.connectedCourseIds;
                    courseConnections = e.detail.courseConnections;
                  }}          
                  on:nodeSelected={e => {
                    highlightedCourseId = e.detail.courseId;
                    if (e.detail.courseId) {
                      const connectedIds = e.detail.connectedCourseIds;
                      if (connectedIds.length) {
                        courseConnections[e.detail.courseId] = connectedIds;
                        requestAnimationFrame(() => {
                          const selectedCard = document.querySelector(`[data-course-id="${e.detail.courseId}"]`);
                          selectedCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        });
                      }
                    }
                  }}
                />
              </div>
            </div>

            <!-- Interactive Instructions -->            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div class="px-4 py-2 rounded-full bg-black/80 text-white backdrop-blur-sm text-sm flex items-center gap-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span>Click nodes to explore connections • Drag to move • Scroll to zoom</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Call to Action Section -->
    <section class="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-muted dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div class="container px-4">
        <div class="max-w-2xl mx-auto text-center space-y-4">
          <h2 class="text-3xl font-bold tracking-tight">Ready to Start Your Fitness Journey?</h2>
          <p class="text-muted-foreground text-lg">
            Join our community today and get access to expert-led courses, personalized workout plans, and a supportive community.
          </p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <Button href="/auth/register" size="lg">Get Started</Button>
            <Button href="/contact" variant="outline" size="lg">Talk to an Expert</Button>
          </div>
        </div>
      </div>
    </section>
  </section>
</div>