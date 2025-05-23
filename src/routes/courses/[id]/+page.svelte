<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  // Temporary mock data for courses (would come from a database in a real app)
  const courses = {
    '1': {
      id: '1',
      title: 'Complete Body Transformation',
      description: 'A comprehensive 12-week program for total body transformation. Suitable for all fitness levels.',
      longDescription: `This 12-week program is designed to completely transform your body and fitness level. 
      
      You'll start with a comprehensive assessment to determine your current fitness level, mobility, and goals. Then, we'll create a personalized plan that gradually increases in intensity as your fitness improves.
      
      Each week includes 4-5 workouts combining strength training, cardiovascular conditioning, and recovery sessions. You'll also receive a nutrition guide with meal plans and recipes to support your transformation.
      
      By the end of the 12 weeks, you can expect significant improvements in strength, endurance, body composition, and overall fitness.`,
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 99.99,
      discountPrice: 79.99,
      difficulty: 'Intermediate',
      duration: 720,
      category: 'Transformation',
      chapters: [
        {
          title: 'Getting Started',
          lessons: [
            { title: 'Introduction to the Program', duration: 15 },
            { title: 'Initial Assessment', duration: 30 },
            { title: 'Setting Up Your Training Space', duration: 20 },
            { title: 'Essential Equipment', duration: 15 }
          ]
        },
        {
          title: 'Weeks 1-4: Foundation',
          lessons: [
            { title: 'Proper Movement Patterns', duration: 45 },
            { title: 'Building Base Strength', duration: 60 },
            { title: 'Cardiovascular Base', duration: 30 },
            { title: 'Recovery Techniques', duration: 25 }
          ]
        },
        {
          title: 'Weeks 5-8: Progression',
          lessons: [
            { title: 'Progressive Overload', duration: 40 },
            { title: 'Interval Training', duration: 35 },
            { title: 'Nutrition for Performance', duration: 50 },
            { title: 'Mid-Program Assessment', duration: 30 }
          ]
        },
        {
          title: 'Weeks 9-12: Intensification',
          lessons: [
            { title: 'Advanced Strength Techniques', duration: 55 },
            { title: 'High-Intensity Conditioning', duration: 40 },
            { title: 'Peaking Strategy', duration: 30 },
            { title: 'Final Assessment', duration: 45 }
          ]
        }
      ],
      features: [
        'Personalized training program',
        'Detailed video demonstrations for all exercises',
        'Customizable nutrition plan',
        'Weekly check-ins and adjustments',
        'Private community access',
        'Email support from the trainer'
      ],
      reviews: [
        { 
          id: '1', 
          name: 'Sarah Johnson', 
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg', 
          rating: 5, 
          date: '2025-02-15',
          comment: 'This program completely transformed my body and my mindset. I lost 25 pounds and gained so much strength and confidence!'
        },
        { 
          id: '2', 
          name: 'Michael Chen', 
          avatar: 'https://randomuser.me/api/portraits/men/46.jpg', 
          rating: 4, 
          date: '2025-03-22',
          comment: 'Great program with excellent progressions. I would have liked a bit more variety in the cardio options, but overall very satisfied with my results.'
        },
        { 
          id: '3', 
          name: 'Emily Rodriguez', 
          avatar: 'https://randomuser.me/api/portraits/women/22.jpg', 
          rating: 5, 
          date: '2025-04-10',
          comment: "The nutrition guidance alone was worth the price. Combined with the workout program, I've achieved results I never thought possible."
        }
      ],
      instructor: {
        name: 'Alex Morgan',
        bio: 'NASM Certified Personal Trainer with 10+ years of experience in body transformations and nutrition coaching.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      rating: 4.8,
      reviewCount: 124
    },
    '2': {
      id: '2',
      title: 'Strength Training Fundamentals',
      description: 'Master the essential principles of strength training with proper form and progressive programming.',
      longDescription: `This course teaches you everything you need to know about building strength effectively and safely. From basic movement patterns to advanced lifting techniques, you'll develop the skills needed for long-term progress.`,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 79.99,
      discountPrice: null,
      difficulty: 'Beginner',
      duration: 540,
      category: 'Strength',
      chapters: [
        {
          title: 'Strength Fundamentals',
          lessons: [
            { title: 'Understanding Strength', duration: 25 },
            { title: 'Movement Patterns', duration: 40 },
            { title: 'Equipment Overview', duration: 30 }
          ]
        },
        {
          title: 'The Big Lifts',
          lessons: [
            { title: 'Squat Technique', duration: 45 },
            { title: 'Deadlift Mechanics', duration: 50 },
            { title: 'Bench Press Mastery', duration: 40 }
          ]
        }
      ],
      instructor: {
        name: 'Marcus Taylor',
        bio: 'Strength coach with 15+ years experience working with athletes and everyday fitness enthusiasts.',
        avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
      },
      rating: 4.9,
      reviewCount: 87
    },
    '3': {
      id: '3',
      title: 'Nutrition for Performance',
      description: 'Learn how to fuel your body optimally for athletic performance, muscle gain, and recovery.',
      longDescription: `This comprehensive nutrition course will teach you how to eat for your specific fitness goals. Whether you want to build muscle, lose fat, or improve athletic performance, you'll learn practical strategies you can implement immediately.`,
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 69.99,
      discountPrice: 49.99,
      difficulty: 'All Levels',
      duration: 480,
      category: 'Nutrition',
      chapters: [
        {
          title: 'Nutrition Basics',
          lessons: [
            { title: 'Macronutrients Explained', duration: 35 },
            { title: 'Calorie Calculation', duration: 25 },
            { title: 'Meal Timing', duration: 30 }
          ]
        },
        {
          title: 'Performance Nutrition',
          lessons: [
            { title: 'Pre-Workout Nutrition', duration: 40 },
            { title: 'Post-Workout Recovery', duration: 35 },
            { title: 'Supplementation Guide', duration: 50 }
          ]
        }
      ],
      instructor: {
        name: 'Lisa Williams',
        bio: 'Registered Dietitian specializing in sports nutrition with experience working with Olympic athletes.',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      rating: 4.7,
      reviewCount: 152
    },
    '4': {
      id: '4',
      title: 'Total Body HIIT',
      description: 'Burn fat and build endurance with these high-intensity interval training workouts you can do anywhere.',
      longDescription: `This HIIT program is designed to maximize calorie burn and improve cardiovascular fitness in minimal time. With workouts ranging from 15-30 minutes, you'll be able to fit them into even the busiest schedule.`,
      imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 59.99,
      discountPrice: 39.99,
      difficulty: 'Intermediate',
      duration: 360,
      category: 'Cardio',
      chapters: [
        {
          title: 'HIIT Foundations',
          lessons: [
            { title: 'HIIT Principles', duration: 20 },
            { title: 'Intensity Monitoring', duration: 15 },
            { title: 'Recovery Strategies', duration: 25 }
          ]
        },
        {
          title: 'Workout Series',
          lessons: [
            { title: 'Bodyweight HIIT', duration: 30 },
            { title: 'Dumbbell HIIT Circuits', duration: 35 },
            { title: 'Tabata Protocols', duration: 25 }
          ]
        }
      ],
      instructor: {
        name: 'James Rodriguez',
        bio: 'Former professional athlete turned fitness coach specializing in metabolic conditioning and HIIT training.',
        avatar: 'https://randomuser.me/api/portraits/men/23.jpg'
      },
      rating: 4.6,
      reviewCount: 98
    },
    '5': {
      id: '5',
      title: 'Yoga for Athletes',
      description: 'Enhance recovery, prevent injuries, and improve performance with yoga practices designed specifically for athletes.',
      longDescription: `This program combines traditional yoga practices with modern sports science to create a yoga program specifically for athletes and active individuals. You'll improve mobility, enhance recovery, and develop mind-body awareness that transfers to your sport or training.`,
      imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 69.99,
      discountPrice: null,
      difficulty: 'All Levels',
      duration: 420,
      category: 'Recovery',
      chapters: [
        {
          title: 'Yoga Fundamentals',
          lessons: [
            { title: 'Breathing Techniques', duration: 20 },
            { title: 'Basic Poses', duration: 35 },
            { title: 'Movement Flows', duration: 30 }
          ]
        },
        {
          title: 'Sport-Specific Applications',
          lessons: [
            { title: 'Yoga for Strength Athletes', duration: 40 },
            { title: 'Yoga for Endurance Athletes', duration: 40 },
            { title: 'Recovery Protocols', duration: 35 }
          ]
        }
      ],
      instructor: {
        name: 'Sophia Chen',
        bio: 'Certified yoga instructor and physical therapist with 12 years of experience working with professional athletes.',
        avatar: 'https://randomuser.me/api/portraits/women/39.jpg'
      },
      rating: 4.9,
      reviewCount: 76
    },
    '6': {
      id: '6',
      title: 'Advanced Body Transformation',
      description: 'Take your fitness to the next level with this advanced program designed for experienced fitness enthusiasts.',
      longDescription: `This advanced transformation program is designed for those who already have a solid fitness foundation and want to push to the next level. Featuring periodized training blocks, advanced nutrition strategies, and recovery protocols.`,
      imageUrl: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 129.99,
      discountPrice: 99.99,
      difficulty: 'Advanced',
      duration: 840,
      category: 'Transformation',
      chapters: [
        {
          title: 'Advanced Program Design',
          lessons: [
            { title: 'Periodization Principles', duration: 45 },
            { title: 'Volume Manipulation', duration: 40 },
            { title: 'Intensity Techniques', duration: 35 }
          ]
        },
        {
          title: 'Elite Performance',
          lessons: [
            { title: 'Advanced Lifting Mechanics', duration: 50 },
            { title: 'Metabolic Conditioning', duration: 45 },
            { title: 'Recovery Optimization', duration: 40 }
          ]
        }
      ],
      instructor: {
        name: 'David Johnson',
        bio: 'Elite strength coach who has worked with professional athletes and bodybuilders for over 15 years.',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      rating: 4.8,
      reviewCount: 63
    }
  };

  // Animation state
  let visible = false;
  let activeTab = 'overview';
  let activeChapter = 0;
  let showBackToTop = false;

  // Handle scroll event to show/hide back to top button
  function handleScroll() {
    showBackToTop = window.scrollY > 500;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    visible = true;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Get course ID from the URL
  const courseId = $page.params.id;

  // Get the course data based on the ID
  const course = courses[courseId as keyof typeof courses];

  // Format price with currency
  function formatPrice(price: number): string {
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

  // Calculate total lessons
  function calculateTotalLessons(chapters: any[]): number {
    return chapters.reduce((total: number, chapter: any) => total + chapter.lessons.length, 0);
  }

  // Calculate discount percentage
  function calculateDiscount(original: number, discount: number): number {
    return Math.round(((original - discount) / original) * 100);
  }
</script>

<svelte:head>
  <title>{course ? course.title : 'Course Not Found'} | FitTrainer</title>
  <meta name="description" content={course ? course.description : 'Course details'} />
</svelte:head>

{#if !course}
  <section class="py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Course Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        The course you're looking for doesn't exist or has been removed.
      </p>
      <Button href="/courses" variant="default">
        Browse All Courses
      </Button>
    </div>
  </section>
{:else}
  {#if visible}
    <div class="py-12">
      <div class="container mx-auto px-4">
        <!-- Breadcrumbs -->
        <div class="mb-6" in:fade={{ duration: 300 }}>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <a href="/" class="hover:text-primary">Home</a>
            <span class="mx-2">/</span>
            <a href="/courses" class="hover:text-primary">Courses</a>
            <span class="mx-2">/</span>
            <span class="text-gray-700 dark:text-gray-300">{course.title}</span>
          </div>
        </div>

        <!-- Course Header -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <!-- Course Image and Features -->
          <div class="space-y-6" in:fly={{ x: -50, duration: 600, delay: 200 }}>
            <div class="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg aspect-video">
              <img 
                src={course.imageUrl} 
                alt={course.title}
                class="w-full h-full object-cover"
              />
              {#if course.discountPrice}
                <div class="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {calculateDiscount(course.price, course.discountPrice)}% OFF
                </div>
              {/if}
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div class="text-primary mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                <div class="font-semibold">{formatDuration(course.duration)}</div>
              </div>

              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div class="text-primary mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Lessons</span>
                <div class="font-semibold">{calculateTotalLessons(course.chapters)}</div>
              </div>

              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div class="text-primary mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Difficulty</span>
                <div class="font-semibold">{course.difficulty}</div>
              </div>

              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div class="text-primary mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Category</span>
                <div class="font-semibold">{course.category}</div>
              </div>
            </div>
          </div>

          <!-- Course Info and Enrollment -->
          <div class="space-y-8" in:fly={{ x: 50, duration: 600, delay: 200 }}>
            <div>
              <h1 class="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p class="text-gray-600 dark:text-gray-400 text-lg">{course.description}</p>
            </div>            <div class="flex items-center mb-6">
              <img src={course.instructor.avatar} alt={course.instructor.name} class="w-12 h-12 rounded-full border-2 border-white shadow mr-4" />
              <div>
                <div class="font-medium">{course.instructor.name}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Lead Fitness Trainer</div>
              </div>
            </div>

            <!-- Instructor Profile with Bio (visible on Overview tab) -->
            {#if activeTab === 'overview'}
              <div class="mb-8 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-start">
                  <img src={course.instructor.avatar} alt={course.instructor.name} class="w-20 h-20 rounded-full border-2 border-white shadow-md mr-5" />
                  <div>
                    <h3 class="text-xl font-bold mb-2">About Your Instructor</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">{course.instructor.bio}</p>
                    <Button variant="outline" size="sm" class="text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            {/if}

            <Card class="overflow-hidden">
              <CardContent class="p-0">
                <div class="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-2">
                    <div class="text-lg font-bold">Course Price</div>
                    {#if course.discountPrice}
                      <div class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        Limited Time Offer
                      </div>
                    {/if}
                  </div>

                  <div class="flex items-center">
                    {#if course.discountPrice}
                      <div class="text-3xl font-bold">{formatPrice(course.discountPrice)}</div>
                      <div class="ml-3 text-xl text-gray-500 line-through">{formatPrice(course.price)}</div>
                    {:else}
                      <div class="text-3xl font-bold">{formatPrice(course.price)}</div>
                    {/if}
                  </div>
                </div>                <div class="p-6 space-y-4">
                  <Button variant="default" class="w-full py-6 text-lg group relative overflow-hidden">
                    <span class="relative z-10">Enroll in Course</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Button>

                  <div class="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    30-Day Money-Back Guarantee
                  </div>

                  <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="text-lg font-medium mb-3">This course includes:</div>
                    <ul class="space-y-2">
                      <li class="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Full lifetime access</span>
                      </li>
                      <li class="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Access on mobile and desktop</span>
                      </li>
                      <li class="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Certificate of completion</span>
                      </li>
                      <li class="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Personalized feedback</span>
                      </li>
                    </ul>
                  </div>

                  <Button variant="outline" class="w-full group hover:border-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Gift This Course
                  </Button>

                  <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm text-gray-500 dark:text-gray-400">Share this course:</div>
                      <div class="flex space-x-2">
                        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        </button>
                        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </button>
                        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Course Tabs -->
        <div class="mb-10" in:fade={{ duration: 600, delay: 600 }}>
          <div class="border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap -mb-px">
              <button 
                class={`inline-flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'}`}
                on:click={() => activeTab = 'overview'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overview
              </button>

              <button 
                class={`inline-flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'curriculum' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'}`}
                on:click={() => activeTab = 'curriculum'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Curriculum
              </button>

              <button 
                class={`inline-flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'}`}
                on:click={() => activeTab = 'reviews'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Reviews
              </button>

              <button 
                class={`inline-flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'faq' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'}`}
                on:click={() => activeTab = 'faq'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQ
              </button>
            </div>
          </div>

          <div class="mt-8">
            {#if activeTab === 'overview'}
              <div class="prose max-w-none dark:prose-invert">
                <h2>Course Overview</h2>
                <p>{course.longDescription}</p>

                <h3>What You'll Learn</h3>
                <ul>
                  <li>Develop a comprehensive fitness program tailored to your goals</li>
                  <li>Master proper form and technique for all major exercises</li>
                  <li>Understand the principles of progressive overload</li>
                  <li>Create effective nutrition plans to support your training</li>
                  <li>Implement recovery strategies to maximize results</li>
                </ul>

                <h3>Requirements</h3>
                <ul>
                  <li>Basic fitness equipment (or gym membership)</li>
                  <li>Commitment to follow the program for the full duration</li>
                  <li>Willingness to challenge yourself and push your limits</li>
                </ul>
              </div>
            {:else if activeTab === 'curriculum'}
              <div>
                <h2 class="text-2xl font-bold mb-6">Course Curriculum</h2>

                <div class="space-y-4">
                  {#each course.chapters as chapter, index}
                    <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button 
                        class="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        on:click={() => activeChapter = activeChapter === index ? -1 : index}
                      >
                        <div class="flex items-center">
                          <div class="text-lg font-medium">{chapter.title}</div>
                          <div class="ml-3 text-sm text-gray-500 dark:text-gray-400">
                            {chapter.lessons.length} {chapter.lessons.length === 1 ? 'lesson' : 'lessons'}
                          </div>
                        </div>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class={`h-5 w-5 transition-transform ${activeChapter === index ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {#if activeChapter === index}
                        <div class="p-4 bg-white dark:bg-gray-800" transition:slide={{ duration: 300 }}>
                          <ul class="space-y-2">
                            {#each chapter.lessons as lesson, lessonIndex}
                              <li>
                                <div class="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <div class="flex items-center">
                                    <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 mr-3">
                                      {lessonIndex + 1}
                                    </div>
                                    <div>{lesson.title}</div>
                                  </div>
                                  <div class="text-sm text-gray-500 dark:text-gray-400">{lesson.duration} min</div>
                                </div>
                              </li>
                            {/each}
                          </ul>
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            {:else if activeTab === 'reviews'}
              <div>
                <h2 class="text-2xl font-bold mb-6">Student Reviews</h2>                <div class="flex items-center mb-8">
                  <div class="mr-6">
                    <div class="text-5xl font-bold">{course.rating}</div>
                    <div class="flex items-center mt-2">
                      <div class="flex">
                        {#each Array(5) as _, i}
                          <svg class={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        {/each}
                      </div>
                      <div class="ml-2 text-sm text-gray-500 dark:text-gray-400">Based on {course.reviewCount} reviews</div>
                    </div>
                  </div>

                  <div class="flex-1 max-w-md">
                    <div class="space-y-2">
                      {#each [5, 4, 3, 2, 1] as rating}
                        <div class="flex items-center">
                          <div class="w-12 text-sm text-gray-600 dark:text-gray-400">{rating} stars</div>
                          <div class="flex-1 h-2 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div class="h-2 bg-yellow-400 rounded-full" style="width: {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}"></div>
                          </div>
                          <div class="w-8 text-sm text-gray-600 dark:text-gray-400">{rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}</div>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  {#each [
                    { name: 'John D.', avatar: 'https://i.pravatar.cc/150?img=68', rating: 5, date: '3 weeks ago', review: 'This course completely transformed my approach to fitness. The instructor explains everything clearly and the progression is perfect for building strength safely. Highly recommend!' },
                    { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=47', rating: 5, date: '1 month ago', review: 'As someone who struggled with consistency, this program gave me the structure I needed. I\'ve seen more progress in 12 weeks than I did in years of random workouts. The nutrition guidance is incredibly helpful too.' },
                    { name: 'Michael T.', avatar: 'https://i.pravatar.cc/150?img=59', rating: 4, date: '2 months ago', review: 'Great content and excellent instruction. I would have given 5 stars, but some of the advanced modules could use a bit more explanation. That said, I\'ve made tremendous progress and feel stronger than ever.' }
                  ] as review}
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div class="flex items-start">
                        <img src={review.avatar} alt={review.name} class="w-10 h-10 rounded-full mr-4" />
                        <div class="flex-1">
                          <div class="flex items-center justify-between mb-1">
                            <div class="font-medium">{review.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                          </div>
                          <div class="flex items-center mb-3">
                            {#each Array(5) as _, i}
                              <svg class={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            {/each}
                          </div>
                          <p class="text-gray-600 dark:text-gray-300">{review.review}</p>
                        </div>
                      </div>
                    </div>
                  {/each}

                  <div class="text-center">
                    <Button variant="outline">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </div>
            {:else if activeTab === 'faq'}
              <div>
                <h2 class="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

                <div class="space-y-4">
                  {#each [
                    { question: 'How much time do I need to commit each day?', answer: 'Workouts range from 30-60 minutes, 4-5 days per week. For best results, we recommend setting aside 1 hour each training day to account for warm-up and cool-down.' },
                    { question: 'Do I need a gym membership for this course?', answer: 'While having access to a gym with a variety of equipment is ideal, we provide modifications for those training at home with minimal equipment. Many of the workouts can be completed with just a set of dumbbells and resistance bands.' },
                    { question: 'Is this course suitable for beginners?', answer: 'Yes! This program is designed with progressive scaling, making it appropriate for all fitness levels. Beginners will follow the foundational progressions, while more advanced athletes can utilize the performance variations.' },
                    { question: 'How long do I have access to the course materials?', answer: 'You receive lifetime access to all course materials, including any future updates. Once you enroll, the content is yours to keep.' },
                    { question: 'Is there a meal plan included?', answer: 'Yes, the program includes nutritional guidelines and sample meal plans. However, we focus on teaching you how to create a sustainable nutrition approach rather than rigid meal plans.' }
                  ] as faq, i}
                    <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button 
                        class="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        on:click={() => activeChapter = activeChapter === i + 100 ? -1 : i + 100}
                      >
                        <div class="font-medium">{faq.question}</div>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class={`h-5 w-5 text-gray-500 transition-transform ${activeChapter === i + 100 ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {#if activeChapter === i + 100}
                        <div class="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700" transition:slide={{ duration: 300 }}>
                          <p class="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>        <!-- Related Courses -->
        <div class="mt-16" in:fade={{ duration: 600, delay: 800 }}>
          <h2 class="text-2xl font-bold mb-6">More Courses in {course.category}</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each Object.values(courses).filter(c => c.id !== courseId && c.category === course.category).slice(0, 3) as relatedCourse}
              <Card class="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div class="relative pb-[56.25%] overflow-hidden">
                  <img 
                    src={relatedCourse.imageUrl} 
                    alt={relatedCourse.title}
                    class="absolute inset-0 w-full h-full object-cover rounded-t-lg transition-transform duration-700 group-hover:scale-105"
                  />
                  {#if relatedCourse.discountPrice}
                    <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  {/if}
                </div>

                <CardContent class="flex-1 flex flex-col">
                  <h3 class="text-lg font-bold mb-2">{relatedCourse.title}</h3>
                  <CardDescription class="mb-4 flex-1 line-clamp-2">{relatedCourse.description}</CardDescription>

                  <div class="mt-auto">
                    {#if relatedCourse.discountPrice}
                      <div class="flex items-center mb-2">
                        <span class="text-lg font-bold">{formatPrice(relatedCourse.discountPrice)}</span>
                        <span class="ml-2 text-sm text-gray-500 line-through">{formatPrice(relatedCourse.price)}</span>
                      </div>
                    {:else}
                      <div class="text-lg font-bold mb-2">{formatPrice(relatedCourse.price)}</div>
                    {/if}

                    <Button href={`/courses/${relatedCourse.id}`} variant="outline" class="w-full">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            {:else}
              <div class="col-span-3 text-center py-8">
                <p class="text-gray-500 dark:text-gray-400">No related courses found in this category.</p>
              </div>
            {/each}
          </div>
        </div>        <!-- Other Courses by Instructor -->
        <div class="mt-16 mb-10" in:fade={{ duration: 600, delay: 900 }}>
          <h2 class="text-2xl font-bold mb-6">More From {course.instructor.name}</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each Object.values(courses).filter(c => c.id !== courseId && c.instructor.name === course.instructor.name).slice(0, 3) as instructorCourse}
              <Card class="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div class="relative pb-[56.25%] overflow-hidden">
                  <img 
                    src={instructorCourse.imageUrl} 
                    alt={instructorCourse.title}
                    class="absolute inset-0 w-full h-full object-cover rounded-t-lg transition-transform duration-700 group-hover:scale-105"
                  />
                  {#if instructorCourse.discountPrice}
                    <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  {/if}
                </div>

                <CardContent class="flex-1 flex flex-col">
                  <h3 class="text-lg font-bold mb-2">{instructorCourse.title}</h3>
                  <CardDescription class="mb-4 flex-1 line-clamp-2">{instructorCourse.description}</CardDescription>

                  <div class="mt-auto">
                    {#if instructorCourse.discountPrice}
                      <div class="flex items-center mb-2">
                        <span class="text-lg font-bold">{formatPrice(instructorCourse.discountPrice)}</span>
                        <span class="ml-2 text-sm text-gray-500 line-through">{formatPrice(instructorCourse.price)}</span>
                      </div>
                    {:else}
                      <div class="text-lg font-bold mb-2">{formatPrice(instructorCourse.price)}</div>
                    {/if}

                    <Button href={`/courses/${instructorCourse.id}`} variant="outline" class="w-full">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            {:else}
              <div class="col-span-3 text-center py-8">
                <p class="text-gray-500 dark:text-gray-400">No other courses from this instructor yet.</p>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- CTA Section -->
        <div class="mt-16 mb-12 relative rounded-2xl overflow-hidden" in:fade={{ duration: 600, delay: 1000 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
          <div class="absolute inset-0 bg-black opacity-60 z-0"></div>
          <div 
            class="absolute inset-0 bg-cover bg-center z-0 opacity-40" 
            style="background-image: url('https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80');"
          ></div>
          
          <div class="relative z-20 py-16 px-8 text-white text-center max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
            <p class="text-lg md:text-xl mb-8 opacity-90">
              Join over {Math.floor(course.reviewCount * 3.5).toLocaleString()} students who have already taken this course and started their fitness journey.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button class="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-bold">
                Enroll Now {course.discountPrice ? `for ${formatPrice(course.discountPrice)}` : ''}
              </Button>
              
              <Button variant="outline" class="border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Button>
            </div>
            
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Lifetime Access</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate of Completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      {#if showBackToTop}
        <button 
          on:click={scrollToTop}
          class="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-600 transition-all duration-300 z-50"
          transition:fade={{ duration: 200 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
        </button>
      {/if}
    </div>
  {/if}
{/if}
