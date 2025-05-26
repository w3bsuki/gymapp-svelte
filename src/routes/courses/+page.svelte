<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import { writable } from 'svelte/store';

  let mounted = false;
  let searchQuery = '';
  let selectedCategory = 'All';
  let selectedDifficulty = 'All';
  let sortBy = 'popular';
  let showFilters = false;

  const categories = ['All', 'Transformation', 'Strength', 'HIIT', 'Nutrition', 'Mobility', 'Yoga', 'Bodyweight', 'Running'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  const courses = [
    {
      id: '1',
      title: 'Complete Body Transformation',
      description: 'A comprehensive 12-week program for total body transformation. Suitable for all fitness levels.',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      tags: ['Weight Loss', 'Muscle Gain', 'Nutrition Plan'],
      students: 2847,
      lessons: 48
    },
    {
      id: '2',
      title: 'Strength Training Fundamentals',
      description: 'Master the basics of strength training with proper form and technique.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 69.99,
      difficulty: 'Beginner',
      duration: 480,
      category: 'Strength',
      rating: 4.6,
      reviews: 187,
      instructor: 'Mike Davis',
      instructorAvatar: 'https://i.pravatar.cc/150?img=12',
      featured: false,
      tags: ['Barbell Training', 'Form Technique'],
      students: 1523,
      lessons: 32
    },
    {
      id: '3',
      title: 'Advanced HIIT Workouts',
      description: 'High-intensity interval training for experienced fitness enthusiasts.',
      imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 89.99,
      difficulty: 'Advanced',
      duration: 600,
      category: 'HIIT',
      rating: 4.9,
      reviews: 276,
      instructor: 'Sarah Williams',
      instructorAvatar: 'https://i.pravatar.cc/150?img=5',
      featured: true,
      tags: ['Fat Burning', 'Conditioning'],
      students: 1876,
      lessons: 40
    },
    {
      id: '4',
      title: 'Nutrition Mastery',
      description: 'Learn how to fuel your body for optimal performance and recovery.',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 59.99,
      difficulty: 'Beginner',
      duration: 300,
      category: 'Nutrition',
      rating: 4.7,
      reviews: 195,
      instructor: 'Dr. Emily Chen',
      instructorAvatar: 'https://i.pravatar.cc/150?img=13',
      featured: false,
      tags: ['Meal Planning', 'Macronutrients'],
      students: 2156,
      lessons: 24
    },
    {
      id: '5',
      title: 'Flexibility & Mobility',
      description: 'Improve your range of motion and prevent injuries.',
      imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 49.99,
      difficulty: 'Beginner',
      duration: 240,
      category: 'Mobility',
      rating: 4.5,
      reviews: 132,
      instructor: 'David Kim',
      instructorAvatar: 'https://i.pravatar.cc/150?img=15',
      featured: false,
      tags: ['Joint Health', 'Recovery'],
      students: 987,
      lessons: 20
    },
    {
      id: '6',
      title: 'Powerlifting Specialization',
      description: 'Build maximal strength in the squat, bench, and deadlift.',
      imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 89.99,
      difficulty: 'Advanced',
      duration: 720,
      category: 'Strength',
      rating: 4.9,
      reviews: 284,
      instructor: 'John Strong',
      instructorAvatar: 'https://i.pravatar.cc/150?img=50',
      featured: true,
      tags: ['Squat', 'Bench Press', 'Deadlift'],
      students: 1432,
      lessons: 56
    }
  ];

  onMount(() => {
    mounted = true;
  });

  // Filter and sort courses
  $: filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'price-high':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'newest':
          return b.id.localeCompare(a.id);
        default: // popular
          return b.students - a.students;
      }
    });

  $: featuredCourses = courses.filter(course => course.featured);

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }

  function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }
</script>

<svelte:head>
  <title>Fitness Courses - Transform Your Body & Mind</title>
  <meta name="description" content="Discover premium fitness courses from expert trainers. Transform your body with our comprehensive workout programs." />
</svelte:head>

{#if mounted}
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" in:fade={{ duration: 600 }}>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white" in:fly={{ y: -30, duration: 800 }}>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
        <div class="absolute top-1/2 -left-8 w-48 h-48 bg-white/5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-4 right-1/3 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Transform Your Fitness Journey
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover world-class fitness courses from expert trainers. Build strength, lose weight, and achieve your goals.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
              🚀 Start Your Journey
            </Button>
            <Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              📱 Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10" in:fly={{ y: 30, delay: 200, duration: 600 }}>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each [
          { label: 'Active Students', value: '12,000+', icon: '👥' },
          { label: 'Expert Trainers', value: '50+', icon: '🏆' },
          { label: 'Course Hours', value: '500+', icon: '⏱️' },
          { label: 'Success Rate', value: '94%', icon: '📈' }
        ] as stat, i}
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center" in:scale={{ delay: i * 100, duration: 500 }}>
            <div class="text-3xl mb-2">{stat.icon}</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Featured Courses Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" in:fly={{ y: 30, delay: 400, duration: 600 }}>
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🌟 Featured Courses
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hand-picked courses from our top-rated trainers to help you achieve extraordinary results.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each featuredCourses as course, i}
          <div class="group" in:fly={{ y: 50, delay: i * 150, duration: 600 }}>
            <Card class="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800">
              <div class="relative">
                <img src={course.imageUrl} alt={course.title} class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute top-4 left-4">
                  <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Featured
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <span class="{getDifficultyColor(course.difficulty)} px-3 py-1 rounded-full text-sm font-semibold">
                    {course.difficulty}
                  </span>
                </div>
                {#if course.discountPrice}
                  <div class="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ${(course.price - course.discountPrice).toFixed(0)}
                  </div>
                {/if}
              </div>
              
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <img src={course.instructorAvatar} alt={course.instructor} class="w-8 h-8 rounded-full mr-3" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span class="flex items-center">
                      ⏱️ {formatDuration(course.duration)}
                    </span>
                    <span class="flex items-center">
                      📚 {course.lessons} lessons
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400 mr-2">
                      {#each Array(5) as _, i}
                        <span class="{i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}">
                          ⭐
                        </span>
                      {/each}
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-4">
                  {#each course.tags.slice(0, 2) as tag}
                    <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  {/each}
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    {#if course.discountPrice}
                      <span class="text-2xl font-bold text-green-600">${course.discountPrice}</span>
                      <span class="text-lg text-gray-500 line-through">${course.price}</span>
                    {:else}
                      <span class="text-2xl font-bold text-gray-900 dark:text-white">${course.price}</span>
                    {/if}
                  </div>
                  <Button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 600, duration: 600 }}>
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row gap-4 items-center">
          <!-- Search -->
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search courses, instructors, or topics..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <!-- Filters Toggle -->
          <Button
            variant="outline"
            on:click={() => showFilters = !showFilters}
            class="px-6 py-3 border-gray-300 dark:border-gray-600"
          >
            🎛️ Filters {showFilters ? '▲' : '▼'}
          </Button>
        </div>
        
        {#if showFilters}
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" in:fly={{ y: -20, duration: 300 }}>
            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select bind:value={selectedCategory} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>
            
            <!-- Difficulty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
              <select bind:value={selectedDifficulty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each difficulties as difficulty}
                  <option value={difficulty}>{difficulty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Sort Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select bind:value={sortBy} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each sortOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- All Courses Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 800, duration: 600 }}>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          📚 All Courses ({filteredCourses.length})
        </h2>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </div>
      
      {#if filteredCourses.length === 0}
        <div class="text-center py-16" in:fade={{ duration: 400 }}>
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button on:click={() => { searchQuery = ''; selectedCategory = 'All'; selectedDifficulty = 'All'; }}>
            Clear Filters
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredCourses as course, i}
            <div class="group" in:fly={{ y: 30, delay: i * 50, duration: 400 }}>
              <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800 h-full">
                <div class="relative">
                  <img src={course.imageUrl} alt={course.title} class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-3 right-3">
                    <span class="{getDifficultyColor(course.difficulty)} px-2 py-1 rounded-full text-xs font-semibold">
                      {course.difficulty}
                    </span>
                  </div>
                  {#if course.discountPrice}
                    <div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
                    </div>
                  {/if}
                </div>
                
                <div class="p-4 flex flex-col h-full">
                  <div class="flex items-center mb-2">
                    <img src={course.instructorAvatar} alt={course.instructor} class="w-6 h-6 rounded-full mr-2" />
                    <span class="text-xs text-gray-600 dark:text-gray-400">{course.instructor}</span>
                  </div>
                  
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div class="flex items-center mb-3">
                    <div class="flex text-yellow-400 mr-2">
                      {#each Array(5) as _, i}
                        <span class="text-xs {i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}">
                          ⭐
                        </span>
                      {/each}
                    </div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">
                      {course.rating} ({course.reviews})
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.students.toLocaleString()}</span>
                    <span>🕒 {formatDuration(course.duration)}</span>
                  </div>
                  
                  <div class="flex flex-wrap gap-1 mb-4">
                    {#each course.tags.slice(0, 2) as tag}
                      <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    {/each}
                  </div>
                  
                  <div class="mt-auto">
                    <div class="flex items-center justify-between mb-3">
                      {#if course.discountPrice}
                        <div class="flex items-center space-x-2">
                          <span class="text-lg font-bold text-green-600">${course.discountPrice}</span>
                          <span class="text-sm text-gray-500 line-through">${course.price}</span>
                        </div>
                      {:else}
                        <span class="text-lg font-bold text-gray-900 dark:text-white">${course.price}</span>
                      {/if}
                    </div>
                    <Button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- CTA Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" in:fly={{ y: 30, delay: 1000, duration: 600 }}>
      <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16" in:fly={{ y: 30, delay: 1000, duration: 600 }}>
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            🚀 Ready to Transform Your Life?
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            Join thousands of students who have already transformed their bodies and minds with our expert-led courses.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4">
              🎯 Find My Perfect Course
            </Button>
            <Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10 px-8 py-4">
              💬 Talk to an Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>