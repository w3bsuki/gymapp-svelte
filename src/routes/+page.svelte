<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';

  // Temporary mock data for featured courses
  const featuredCourses = [
    {
      id: '1',
      title: 'Complete Body Transformation',
      description: 'A comprehensive 12-week program for total body transformation. Suitable for all fitness levels.',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 99.99,
      discountPrice: 79.99,
      difficulty: 'Intermediate',
      duration: 720
    },
    {
      id: '2',
      title: 'Strength Training Fundamentals',
      description: 'Master the basics of strength training with proper form and technique. Build a solid foundation for your fitness journey.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 69.99,
      difficulty: 'Beginner',
      duration: 480
    },
    {
      id: '3',
      title: 'Advanced HIIT Workouts',
      description: 'High-intensity interval training for experienced fitness enthusiasts. Take your conditioning to the next level.',
      imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 89.99,
      difficulty: 'Advanced',
      duration: 600
    }
  ];
  // Format price with currency
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
</script>

<svelte:head>
	<title>FitTrainer - Professional Fitness Training & Community</title>
	<meta name="description" content="Professional fitness training, online courses, and community for all fitness levels. Transform your body and life with expert guidance." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white">
  <div class="absolute inset-0 overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
      alt="Fitness Background" 
      class="w-full h-full object-cover opacity-20"
    />
  </div>
  
  <div class="container mx-auto px-4 py-24 relative z-10">
    <div class="max-w-3xl">
      <h1 class="text-5xl md:text-6xl font-bold mb-4">
        Transform Your Body, Transform Your Life
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-blue-100">
        Professional training programs, expert guidance, and a supportive community to help you achieve your fitness goals.
      </p>
      <div class="flex flex-wrap gap-4">
        <Button href="/courses" variant="default" size="lg">
          Explore Courses
        </Button>
        <Button href="/community" variant="outline" size="lg">
          Join Community
        </Button>
      </div>
    </div>
  </div>
</section>

<!-- Featured Courses Section -->
<section class="py-20 bg-gray-50 dark:bg-gray-900/50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
        Transform your fitness journey with our expert-led courses. From beginners to advanced athletes, we have programs for every level.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each featuredCourses as course}
        <Card class="h-full flex flex-col">
          <div class="relative pb-[56.25%]">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            />
            {#if course.discountPrice}
              <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </div>
            {/if}
          </div>
          
          <CardContent class="flex-1 flex flex-col">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                {course.difficulty}
              </span>
              <span class="mx-2">•</span>
              <span>{course.duration} mins</span>
            </div>
            
            <h3 class="text-xl font-bold mb-2">{course.title}</h3>
            <CardDescription class="mb-4 flex-1">{course.description}</CardDescription>
            
            <div class="mt-auto">
              {#if course.discountPrice}
                <div class="flex items-center mb-2">
                  <span class="text-xl font-bold">{formatPrice(course.discountPrice)}</span>
                  <span class="ml-2 text-gray-500 line-through">{formatPrice(course.price)}</span>
                </div>
              {:else}
                <div class="text-xl font-bold mb-2">{formatPrice(course.price)}</div>
              {/if}
              
              <Button href={`/courses/${course.id}`} variant="default" class="w-full">View Course</Button>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
    
    <div class="text-center mt-12">
      <Button href="/courses" variant="outline" size="lg">
        View All Courses
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </Button>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
    <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
      Join our community today and get access to expert-led courses, personalized workout plans, and a supportive community to help you reach your goals.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <Button href="/courses" variant="default" size="lg" class="bg-white text-primary hover:bg-gray-100">
        Explore Courses
      </Button>
      <Button href="/auth/register" variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
        Join Now
      </Button>
    </div>
  </div>
</section>