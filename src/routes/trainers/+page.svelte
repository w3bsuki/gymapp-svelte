<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';

  let mounted = false;
  let searchQuery = '';
  let selectedSpecialty = 'All';
  let selectedExperience = 'All';
  let sortBy = 'rating';
  let showFilters = false;

  const specialties = ['All', 'Strength Training', 'Weight Loss', 'HIIT', 'Yoga', 'Nutrition', 'Bodybuilding', 'Cardio', 'Flexibility'];
  const experienceLevels = ['All', '1-2 years', '3-5 years', '5-10 years', '10+ years'];
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'students', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const trainers = [
    {
      id: '1',
      name: 'Alex Johnson',
      title: 'Certified Personal Trainer & Nutritionist',
      avatar: 'https://i.pravatar.cc/300?img=11',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      reviews: 342,
      students: 2847,
      experience: '8 years',
      specialties: ['Strength Training', 'Weight Loss', 'Nutrition'],
      hourlyRate: 75,
      location: 'New York, NY',
      bio: 'Passionate about helping people transform their lives through fitness. Specialized in strength training and sustainable weight loss.',
      achievements: ['NASM Certified', 'Nutrition Specialist', '500+ Transformations'],
      socialMedia: {
        instagram: '@alexfitness',
        youtube: 'AlexJohnsonFit',
        followers: '125K'
      },
      isOnline: true,
      responseTime: '< 1 hour',
      languages: ['English', 'Spanish'],
      featured: true
    },
    {
      id: '2',
      name: 'Sarah Williams',
      title: 'HIIT Specialist & Fitness Model',
      avatar: 'https://i.pravatar.cc/300?img=5',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      reviews: 276,
      students: 1876,
      experience: '6 years',
      specialties: ['HIIT', 'Cardio', 'Weight Loss'],
      hourlyRate: 65,
      location: 'Los Angeles, CA',
      bio: 'Former fitness model turned trainer. I specialize in high-intensity workouts that deliver real results.',
      achievements: ['ACSM Certified', 'Fitness Model', 'Marathon Runner'],
      socialMedia: {
        instagram: '@sarahfitlife',
        tiktok: '@sarahwilliamsfit',
        followers: '89K'
      },
      isOnline: false,
      responseTime: '< 2 hours',
      languages: ['English'],
      featured: true
    },
    {
      id: '3',
      name: 'Mike Davis',
      title: 'Strength & Conditioning Coach',
      avatar: 'https://i.pravatar.cc/300?img=12',
      coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.7,
      reviews: 187,
      students: 1523,
      experience: '10 years',
      specialties: ['Strength Training', 'Bodybuilding', 'Powerlifting'],
      hourlyRate: 85,
      location: 'Chicago, IL',
      bio: 'Former college athlete with a passion for building strength. I help clients reach their maximum potential.',
      achievements: ['CSCS Certified', 'Former D1 Athlete', 'Powerlifting Coach'],
      socialMedia: {
        instagram: '@mikestrength',
        youtube: 'MikeDavisStrength',
        followers: '67K'
      },
      isOnline: true,
      responseTime: '< 30 min',
      languages: ['English'],
      featured: false
    },
    {
      id: '4',
      name: 'Dr. Emily Chen',
      title: 'Sports Nutritionist & Wellness Coach',
      avatar: 'https://i.pravatar.cc/300?img=13',
      coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      reviews: 195,
      students: 2156,
      experience: '12 years',
      specialties: ['Nutrition', 'Weight Loss', 'Wellness'],
      hourlyRate: 95,
      location: 'San Francisco, CA',
      bio: 'PhD in Nutrition Science. I help clients develop sustainable eating habits for long-term health and fitness.',
      achievements: ['PhD Nutrition', 'RD Certified', 'Published Researcher'],
      socialMedia: {
        instagram: '@dremilynutrition',
        linkedin: 'Dr. Emily Chen',
        followers: '156K'
      },
      isOnline: true,
      responseTime: '< 1 hour',
      languages: ['English', 'Mandarin'],
      featured: true
    },
    {
      id: '5',
      name: 'David Kim',
      title: 'Yoga Instructor & Mobility Expert',
      avatar: 'https://i.pravatar.cc/300?img=15',
      coverImage: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.6,
      reviews: 132,
      students: 987,
      experience: '7 years',
      specialties: ['Yoga', 'Flexibility', 'Mindfulness'],
      hourlyRate: 55,
      location: 'Austin, TX',
      bio: 'Certified yoga instructor focused on improving flexibility, balance, and mental wellness through movement.',
      achievements: ['RYT-500 Certified', 'Meditation Teacher', 'Wellness Retreat Leader'],
      socialMedia: {
        instagram: '@davidyogaflow',
        youtube: 'DavidKimYoga',
        followers: '43K'
      },
      isOnline: false,
      responseTime: '< 3 hours',
      languages: ['English', 'Korean'],
      featured: false
    },
    {
      id: '6',
      name: 'Jessica Martinez',
      title: 'Dance Fitness & Cardio Specialist',
      avatar: 'https://i.pravatar.cc/300?img=9',
      coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      reviews: 298,
      students: 1654,
      experience: '5 years',
      specialties: ['Dance Fitness', 'Cardio', 'Group Classes'],
      hourlyRate: 60,
      location: 'Miami, FL',
      bio: 'Professional dancer turned fitness instructor. Making workouts fun and energetic through dance-based fitness.',
      achievements: ['Dance Instructor Certified', 'Zumba Licensed', 'Choreographer'],
      socialMedia: {
        instagram: '@jessicadancefit',
        tiktok: '@jessicamartinezfit',
        followers: '201K'
      },
      isOnline: true,
      responseTime: '< 45 min',
      languages: ['English', 'Spanish'],
      featured: true
    }
  ];

  onMount(() => {
    mounted = true;
  });

  // Filter and sort trainers
  $: filteredTrainers = trainers
    .filter(trainer => {
      const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trainer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trainer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'All' || trainer.specialties.includes(selectedSpecialty);
      const matchesExperience = selectedExperience === 'All' || trainer.experience.includes(selectedExperience.split('-')[0]);
      return matchesSearch && matchesSpecialty && matchesExperience;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'students':
          return b.students - a.students;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return b.rating - a.rating;
      }
    });

  $: featuredTrainers = trainers.filter(trainer => trainer.featured);

  function getExperienceColor(experience: string) {
    const years = parseInt(experience);
    if (years >= 10) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    if (years >= 5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
</script>

<svelte:head>
  <title>Expert Fitness Trainers - Find Your Perfect Coach</title>
  <meta name="description" content="Connect with certified fitness trainers and coaches. Find the perfect trainer for your fitness goals." />
</svelte:head>

{#if mounted}
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900" in:fade={{ duration: 600 }}>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white" in:fly={{ y: -30, duration: 800 }}>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
      
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
        <div class="absolute top-1/2 -left-8 w-48 h-48 bg-white/5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-4 right-1/3 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
            Meet Your Dream Trainer
          </h1>
          <p class="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Connect with certified fitness experts who will guide you to achieve your goals. Find your perfect training match!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" class="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-8 py-4 text-lg">
              🔍 Find My Trainer
            </Button>
            <Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              💬 Become a Trainer
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10" in:fly={{ y: 30, delay: 200, duration: 600 }}>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each [
          { label: 'Expert Trainers', value: '500+', icon: '🏆' },
          { label: 'Success Stories', value: '15,000+', icon: '⭐' },
          { label: 'Specialties', value: '25+', icon: '💪' },
          { label: 'Countries', value: '50+', icon: '🌍' }
        ] as stat, i}
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center" in:scale={{ delay: i * 100, duration: 500 }}>
            <div class="text-3xl mb-2">{stat.icon}</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Featured Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" in:fly={{ y: 30, delay: 400, duration: 600 }}>
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ⭐ Featured Trainers
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Meet our top-rated trainers who have helped thousands achieve their fitness dreams.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each featuredTrainers as trainer, i}
          <div class="group" in:fly={{ y: 50, delay: i * 150, duration: 600 }}>
            <Card class="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800">
              <!-- Cover Image -->
              <div class="relative h-32 bg-gradient-to-r from-purple-400 to-pink-400">
                <img src={trainer.coverImage} alt="{trainer.name} cover" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute top-4 left-4">
                  <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Featured
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <span class="{trainer.isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <div class="w-2 h-2 bg-white rounded-full mr-2 {trainer.isOnline ? 'animate-pulse' : ''}"></div>
                    {trainer.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              
              <!-- Profile Section -->
              <div class="relative px-6 pb-6">
                <!-- Avatar -->
                <div class="flex justify-center -mt-12 mb-4">
                  <img src={trainer.avatar} alt={trainer.name} class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                </div>
                
                <div class="text-center mb-4">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{trainer.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{trainer.title}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center">
                    📍 {trainer.location}
                  </p>
                </div>
                
                <!-- Rating & Stats -->
                <div class="flex items-center justify-center space-x-4 mb-4 text-sm">
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-1">⭐</span>
                    <span class="font-semibold">{trainer.rating}</span>
                    <span class="text-gray-500 ml-1">({trainer.reviews})</span>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="flex items-center">
                    <span class="mr-1">👥</span>
                    <span>{trainer.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <!-- Bio -->
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">{trainer.bio}</p>
                
                <!-- Specialties -->
                <div class="flex flex-wrap gap-2 justify-center mb-4">
                  {#each trainer.specialties.slice(0, 3) as specialty}
                    <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  {/each}
                </div>
                
                <!-- Experience & Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="{getExperienceColor(trainer.experience)} px-3 py-1 rounded-full text-xs font-semibold">
                    {trainer.experience} exp
                  </span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
                
                <!-- Social Media -->
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <span class="text-xs text-gray-500">{trainer.socialMedia.followers} followers</span>
                  <div class="flex space-x-2">
                    {#if trainer.socialMedia.instagram}
                      <span class="text-pink-500">📷</span>
                    {/if}
                    {#if trainer.socialMedia.youtube}
                      <span class="text-red-500">📺</span>
                    {/if}
                    {#if trainer.socialMedia.tiktok}
                      <span class="text-black dark:text-white">🎵</span>
                    {/if}
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <Button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2">
                    💬 Message
                  </Button>
                  <Button variant="outline" class="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 py-2">
                    👁️ View Profile
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
              placeholder="Search trainers, specialties, or locations..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            <!-- Specialty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select bind:value={selectedSpecialty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each specialties as specialty}
                  <option value={specialty}>{specialty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Experience Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
              <select bind:value={selectedExperience} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each experienceLevels as level}
                  <option value={level}>{level}</option>
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

    <!-- All Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 800, duration: 600 }}>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          👥 All Trainers ({filteredTrainers.length})
        </h2>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTrainers.length} of {trainers.length} trainers
        </div>
      </div>
      
      {#if filteredTrainers.length === 0}
        <div class="text-center py-16" in:fade={{ duration: 400 }}>
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trainers found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button on:click={() => { searchQuery = ''; selectedSpecialty = 'All'; selectedExperience = 'All'; }}>
            Clear Filters
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredTrainers as trainer, i}
            <div class="group" in:fly={{ y: 30, delay: i * 50, duration: 400 }}>
              <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800 h-full">
                <!-- Mini Cover -->
                <div class="relative h-20 bg-gradient-to-r from-purple-400 to-pink-400">
                  <img src={trainer.coverImage} alt="{trainer.name} cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-2 right-2">
                    <span class="{trainer.isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <div class="w-1.5 h-1.5 bg-white rounded-full mr-1 {trainer.isOnline ? 'animate-pulse' : ''}"></div>
                      {trainer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                
                <div class="p-4 flex flex-col h-full">
                  <!-- Avatar & Basic Info -->
                  <div class="flex items-center mb-3 -mt-8">
                    <img src={trainer.avatar} alt={trainer.name} class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg mr-3" />
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {trainer.name}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{trainer.title}</p>
                    </div>
                  </div>
                  
                  <!-- Rating & Students -->
                  <div class="flex items-center justify-between mb-3 text-sm">
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">⭐</span>
                      <span class="font-semibold">{trainer.rating}</span>
                      <span class="text-gray-500 ml-1">({trainer.reviews} reviews)</span>
                    </div>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="flex items-center">
                    <span class="mr-1">👥</span><span class="text-gray-500 ml-1">({trainer.reviews} reviews)</span>
                    <span>{trainer.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <!-- Bio -->
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">{trainer.bio}</p>
                
                <!-- Specialties -->
                <div class="flex flex-wrap gap-2 justify-center mb-4">
                  {#each trainer.specialties.slice(0, 3) as specialty}
                    <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  {/each}
                </div>
                
                <!-- Experience & Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="{getExperienceColor(trainer.experience)} px-3 py-1 rounded-full text-xs font-semibold">
                    {trainer.experience} exp
                  </span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
                
                <!-- Social Media -->
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <span class="text-xs text-gray-500">{trainer.socialMedia.followers} followers</span>
                  <div class="flex space-x-2">
                    {#if trainer.socialMedia.instagram}
                      <span class="text-pink-500">📷</span>
                    {/if}
                    {#if trainer.socialMedia.youtube}
                      <span class="text-red-500">📺</span>
                    {/if}
                    {#if trainer.socialMedia.tiktok}
                      <span class="text-black dark:text-white">🎵</span>
                    {/if}
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <Button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2">
                    💬 Message
                  </Button>
                  <Button variant="outline" class="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 py-2">
                    👁️ View Profile
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
              placeholder="Search trainers, specialties, or locations..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            <!-- Specialty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select bind:value={selectedSpecialty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each specialties as specialty}
                  <option value={specialty}>{specialty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Experience Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
              <select bind:value={selectedExperience} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each experienceLevels as level}
                  <option value={level}>{level}</option>
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

    <!-- All Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 800, duration: 600 }}>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          👥 All Trainers ({filteredTrainers.length})
        </h2>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTrainers.length} of {trainers.length} trainers
        </div>
      </div>
      
      {#if filteredTrainers.length === 0}
        <div class="text-center py-16" in:fade={{ duration: 400 }}>
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trainers found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button on:click={() => { searchQuery = ''; selectedSpecialty = 'All'; selectedExperience = 'All'; }}>
            Clear Filters
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredTrainers as trainer, i}
            <div class="group" in:fly={{ y: 30, delay: i * 50, duration: 400 }}>
              <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800 h-full">
                <!-- Mini Cover -->
                <div class="relative h-20 bg-gradient-to-r from-purple-400 to-pink-400">
                  <img src={trainer.coverImage} alt="{trainer.name} cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-2 right-2">
                    <span class="{trainer.isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <div class="w-1.5 h-1.5 bg-white rounded-full mr-1 {trainer.isOnline ? 'animate-pulse' : ''}"></div>
                      {trainer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                
                <div class="p-4 flex flex-col h-full">
                  <!-- Avatar & Basic Info -->
                  <div class="flex items-center mb-3 -mt-8">
                    <img src={trainer.avatar} alt={trainer.name} class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg mr-3" />
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {trainer.name}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{trainer.title}</p>
                    </div>
                  </div>
                  
                  <!-- Rating & Students -->
                  <div class="flex items-center justify-between mb-3 text-sm">
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">⭐</span>
                      <span class="font-semibold">{trainer.rating}</span>
                      <span class="text-gray-500 ml-1">({trainer.reviews})</span>
                    </div>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="flex items-center">
                    <span class="mr-1">👥</span>
                    <span>{trainer.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <!-- Bio -->
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">{trainer.bio}</p>
                
                <!-- Specialties -->
                <div class="flex flex-wrap gap-2 justify-center mb-4">
                  {#each trainer.specialties.slice(0, 3) as specialty}
                    <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  {/each}
                </div>
                
                <!-- Experience & Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="{getExperienceColor(trainer.experience)} px-3 py-1 rounded-full text-xs font-semibold">
                    {trainer.experience} exp
                  </span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
                
                <!-- Social Media -->
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <span class="text-xs text-gray-500">{trainer.socialMedia.followers} followers</span>
                  <div class="flex space-x-2">
                    {#if trainer.socialMedia.instagram}
                      <span class="text-pink-500">📷</span>
                    {/if}
                    {#if trainer.socialMedia.youtube}
                      <span class="text-red-500">📺</span>
                    {/if}
                    {#if trainer.socialMedia.tiktok}
                      <span class="text-black dark:text-white">🎵</span>
                    {/if}
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <Button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2">
                    💬 Message
                  </Button>
                  <Button variant="outline" class="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 py-2">
                    👁️ View Profile
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
              placeholder="Search trainers, specialties, or locations..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            <!-- Specialty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select bind:value={selectedSpecialty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each specialties as specialty}
                  <option value={specialty}>{specialty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Experience Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
              <select bind:value={selectedExperience} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each experienceLevels as level}
                  <option value={level}>{level}</option>
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

    <!-- All Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 800, duration: 600 }}>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          👥 All Trainers ({filteredTrainers.length})
        </h2>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTrainers.length} of {trainers.length} trainers
        </div>
      </div>
      
      {#if filteredTrainers.length === 0}
        <div class="text-center py-16" in:fade={{ duration: 400 }}>
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trainers found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button on:click={() => { searchQuery = ''; selectedSpecialty = 'All'; selectedExperience = 'All'; }}>
            Clear Filters
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredTrainers as trainer, i}
            <div class="group" in:fly={{ y: 30, delay: i * 50, duration: 400 }}>
              <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800 h-full">
                <!-- Mini Cover -->
                <div class="relative h-20 bg-gradient-to-r from-purple-400 to-pink-400">
                  <img src={trainer.coverImage} alt="{trainer.name} cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-2 right-2">
                    <span class="{trainer.isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <div class="w-1.5 h-1.5 bg-white rounded-full mr-1 {trainer.isOnline ? 'animate-pulse' : ''}"></div>
                      {trainer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                
                <div class="p-4 flex flex-col h-full">
                  <!-- Avatar & Basic Info -->
                  <div class="flex items-center mb-3 -mt-8">
                    <img src={trainer.avatar} alt={trainer.name} class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg mr-3" />
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {trainer.name}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{trainer.title}</p>
                    </div>
                  </div>
                  
                  <!-- Rating & Students -->
                  <div class="flex items-center justify-between mb-3 text-sm">
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">⭐</span>
                      <span class="font-semibold">{trainer.rating}</span>
                      <span class="text-gray-500 ml-1">({trainer.reviews})</span>
                    </div>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="flex items-center">
                    <span class="mr-1">👥</span>
                    <span>{trainer.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <!-- Bio -->
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">{trainer.bio}</p>
                
                <!-- Specialties -->
                <div class="flex flex-wrap gap-2 justify-center mb-4">
                  {#each trainer.specialties.slice(0, 3) as specialty}
                    <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  {/each}
                </div>
                
                <!-- Experience & Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="{getExperienceColor(trainer.experience)} px-3 py-1 rounded-full text-xs font-semibold">
                    {trainer.experience} exp
                  </span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
                
                <!-- Social Media -->
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <span class="text-xs text-gray-500">{trainer.socialMedia.followers} followers</span>
                  <div class="flex space-x-2">
                    {#if trainer.socialMedia.instagram}
                      <span class="text-pink-500">📷</span>
                    {/if}
                    {#if trainer.socialMedia.youtube}
                      <span class="text-red-500">📺</span>
                    {/if}
                    {#if trainer.socialMedia.tiktok}
                      <span class="text-black dark:text-white">🎵</span>
                    {/if}
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <Button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2">
                    💬 Message
                  </Button>
                  <Button variant="outline" class="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 py-2">
                    👁️ View Profile
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
              placeholder="Search trainers, specialties, or locations..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            <!-- Specialty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select bind:value={selectedSpecialty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each specialties as specialty}
                  <option value={specialty}>{specialty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Experience Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
              <select bind:value={selectedExperience} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each experienceLevels as level}
                  <option value={level}>{level}</option>
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

    <!-- All Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fly={{ y: 30, delay: 800, duration: 600 }}>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          👥 All Trainers ({filteredTrainers.length})
        </h2>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTrainers.length} of {trainers.length} trainers
        </div>
      </div>
      
      {#if filteredTrainers.length === 0}
        <div class="text-center py-16" in:fade={{ duration: 400 }}>
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trainers found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button on:click={() => { searchQuery = ''; selectedSpecialty = 'All'; selectedExperience = 'All'; }}>
            Clear Filters
          </Button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredTrainers as trainer, i}
            <div class="group" in:fly={{ y: 30, delay: i * 50, duration: 400 }}>
              <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800 h-full">
                <!-- Mini Cover -->
                <div class="relative h-20 bg-gradient-to-r from-purple-400 to-pink-400">
                  <img src={trainer.coverImage} alt="{trainer.name} cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-2 right-2">
                    <span class="{trainer.isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <div class="w-1.5 h-1.5 bg-white rounded-full mr-1 {trainer.isOnline ? 'animate-pulse' : ''}"></div>
                      {trainer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                
                <div class="p-4 flex flex-col h-full">
                  <!-- Avatar & Basic Info -->
                  <div class="flex items-center mb-3 -mt-8">
                    <img src={trainer.avatar} alt={trainer.name} class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg mr-3" />
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {trainer.name}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{trainer.title}</p>
                    </div>
                  </div>
                  
                  <!-- Rating & Students -->
                  <div class="flex items-center justify-between mb-3 text-sm">
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">⭐</span>
                      <span class="font-semibold">{trainer.rating}</span>
                      <span class="text-gray-500 ml-1">({trainer.reviews})</span>
                    </div>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="flex items-center">
                    <span class="mr-1">👥</span>
                    <span>{trainer.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <!-- Bio -->
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">{trainer.bio}</p>
                
                <!-- Specialties -->
                <div class="flex flex-wrap gap-2 justify-center mb-4">
                  {#each trainer.specialties.slice(0, 3) as specialty}
                    <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  {/each}
                </div>
                
                <!-- Experience & Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="{getExperienceColor(trainer.experience)} px-3 py-1 rounded-full text-xs font-semibold">
                    {trainer.experience} exp
                  </span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
                
                <!-- Social Media -->
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <span class="text-xs text-gray-500">{trainer.socialMedia.followers} followers</span>
                  <div class="flex space-x-2">
                    {#if trainer.socialMedia.instagram}
                      <span class="text-pink-500">📷</span>
                    {/if}
                    {#if trainer.socialMedia.youtube}
                      <span class="text-red-500">📺</span>
                    {/if}
                    {#if trainer.socialMedia.tiktok}
                      <span class="text-black dark:text-white">🎵</span>
                    {/if}
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <Button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2">
                    💬 Message
                  </Button>
                  <Button variant="outline" class="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 py-2">
                    👁️ View Profile
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
              placeholder="Search trainers, specialties, or locations..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            <!-- Specialty Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select bind:value={selectedSpecialty} class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {#each specialties as specialty}
                  <option value={specialty}>{specialty}</option>
                {/each}
              </select>
            </div>
            
            <!-- Experience Filter -->
            <div