<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';
  
  // Add these for enhanced interactivity
  import { writable } from 'svelte/store';
  
  let mounted = false;
  let dashboardVisible = false;
  
  // Enhanced state management
  const selectedTimeframe = writable('week');
  const showNotifications = writable(false);

  onMount(() => {
    mounted = true;
    setTimeout(() => dashboardVisible = true, 100);
  });

  // Dashboard data for social fitness app
  const quickStats = [
    { label: 'Workouts This Week', value: '12', icon: '🏋️', change: '+3', trend: 'up' },
    { label: 'Calories Burned', value: '2,847', icon: '🔥', change: '+247', trend: 'up' },
    { label: 'Active Streak', value: '15 days', icon: '⚡', change: '+1', trend: 'up' },
    { label: 'Community Rank', value: '#47', icon: '🏆', change: '+12', trend: 'up' }
  ];

  const recentActivity = [
    {
      type: 'workout',
      title: 'Completed Upper Body Strength',
      time: '2 hours ago',
      icon: '💪',
      user: 'You'
    },
    {
      type: 'social',
      title: 'Sarah liked your progress photo',
      time: '4 hours ago',
      icon: '❤️',
      user: 'Sarah M.'
    },
    {
      type: 'achievement',
      title: 'Earned "Consistency King" badge',
      time: '1 day ago',
      icon: '🏅',
      user: 'You'
    },
    {
      type: 'community',
      title: 'New message in Motivation channel',
      time: '2 days ago',
      icon: '💬',
      user: 'Mike T.'
    }
  ];

  const upcomingWorkouts = [
    {
      title: 'HIIT Cardio Blast',
      time: 'Today, 6:00 PM',
      trainer: 'Alex Rodriguez',
      participants: 23,
      difficulty: 'High'
    },
    {
      title: 'Yoga Flow & Flexibility',
      time: 'Tomorrow, 7:00 AM',
      trainer: 'Emma Chen',
      participants: 15,
      difficulty: 'Medium'
    },
    {
      title: 'Strength Training Basics',
      time: 'Tomorrow, 8:00 PM',
      trainer: 'Marcus Johnson',
      participants: 31,
      difficulty: 'Beginner'
    }
  ];

  const trendingChallenges = [
    {
      title: '30-Day Plank Challenge',
      participants: 1247,
      daysLeft: 12,
      reward: '🏆 Champion Badge',
      progress: 67
    },
    {
      title: 'Summer Shred 2024',
      participants: 892,
      daysLeft: 45,
      reward: '🎁 Premium Gear',
      progress: 23
    }
  ];

  // Add interactive chart data
  const weeklyProgress = [
    { day: 'Mon', workouts: 2, calories: 450 },
    { day: 'Tue', workouts: 1, calories: 320 },
    { day: 'Wed', workouts: 3, calories: 680 },
    { day: 'Thu', workouts: 2, calories: 520 },
    { day: 'Fri', workouts: 1, calories: 380 },
    { day: 'Sat', workouts: 2, calories: 590 },
    { day: 'Sun', workouts: 1, calories: 290 }
  ];
</script>

<svelte:head>
	<title>Dashboard - FitTrainer Social</title>
	<meta name="description" content="Your personal fitness dashboard with social features, workout tracking, and community engagement." />
</svelte:head>

{#if dashboardVisible}
  <div class="p-6 space-y-6" in:fade={{ duration: 600 }}>
    <!-- Enhanced Welcome Section with Live Stats -->
    <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden" in:fly={{ y: 30, duration: 800 }}>
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-4 right-4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div class="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full animate-bounce"></div>
      </div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p class="text-blue-100 text-lg">Ready to crush your fitness goals today?</p>
          <!-- Add live motivation quote -->
          <p class="text-blue-200 text-sm mt-2 italic">"Every workout is progress, no matter how small"</p>
        </div>
        <div class="hidden md:flex space-x-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div class="text-2xl font-bold">15</div>
            <div class="text-sm text-blue-100">Day Streak</div>
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div class="text-2xl font-bold">🔥</div>
            <div class="text-sm text-blue-100">On Fire!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each quickStats as stat, i}
        <div class="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" in:fly={{ y: 50, delay: i * 100, duration: 600 }}>
          <!-- Move the card content directly here without the Card component -->
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
            <div class="text-3xl">{stat.icon}</div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Main Dashboard Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Weekly Progress Chart -->
      <div class="lg:col-span-2">
        <Card class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold flex items-center">
              <span class="mr-2">📈</span>
              Weekly Progress
            </h2>
            <div class="flex space-x-2">
              <Button variant="outline" size="sm" class="text-xs">Week</Button>
              <Button variant="ghost" size="sm" class="text-xs">Month</Button>
            </div>
          </div>
          
          <!-- Simple bar chart using CSS -->
          <div class="space-y-3">
            {#each weeklyProgress as day, i}
              <div class="flex items-center space-x-3" in:fly={{ x: -20, delay: i * 50, duration: 400 }}>
                <div class="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                <div class="flex-1 flex items-center space-x-2">
                  <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style="width: {(day.workouts / 3) * 100}%"
                    ></div>
                  </div>
                  <div class="text-sm font-medium w-16">{day.workouts} workouts</div>
                </div>
              </div>
            {/each}
          </div>
        </Card>
      </div>

      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <Card class="p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <span class="mr-2">📱</span>
            Recent Activity
          </h2>
          <div class="space-y-4">
            {#each recentActivity as activity, i}
              <div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" in:fly={{ x: -30, delay: i * 100, duration: 500 }}>
                <div class="text-2xl">{activity.icon}</div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{activity.user} • {activity.time}</p>
                </div>
              </div>
            {/each}
          </div>
        </Card>
      </div>

      <!-- Upcoming Workouts -->
      <div>
        <Card class="p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <span class="mr-2">⏰</span>
            Upcoming Workouts
          </h2>
          <div class="space-y-4">
            {#each upcomingWorkouts as workout, i}
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow" in:scale={{ delay: i * 150, duration: 500 }}>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{workout.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{workout.time}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">with {workout.trainer}</span>
                  <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {workout.participants} joined
                  </span>
                </div>
              </div>
            {/each}
          </div>
          <Button href="/workouts" variant="outline" class="w-full mt-4">
            View All Workouts
          </Button>
        </Card>
      </div>
    </div>

    <!-- Trending Challenges -->
    <Card class="p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center">
        <span class="mr-2">🔥</span>
        Trending Challenges
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each trendingChallenges as challenge, i}
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300" in:fly={{ y: 30, delay: i * 200, duration: 600 }}>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
              <span class="text-2xl">{challenge.reward.split(' ')[0]}</span>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{challenge.participants.toLocaleString()} participants</span>
                <span class="text-gray-600 dark:text-gray-400">{challenge.daysLeft} days left</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500" style="width: {challenge.progress}%"></div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">{challenge.progress}% complete</span>
                <Button href="/challenges/{challenge.title.toLowerCase().replace(/\s+/g, '-')}" size="sm">
                  Join Challenge
                </Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Card>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button href="/workouts/start" class="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
        <span class="text-2xl">🏃</span>
        <span class="text-sm font-medium">Start Workout</span>
      </Button>
      <Button href="/community" variant="outline" class="h-20 flex flex-col items-center justify-center space-y-2">
        <span class="text-2xl">💬</span>
        <span class="text-sm font-medium">Join Chat</span>
      </Button>
      <Button href="/progress" variant="outline" class="h-20 flex flex-col items-center justify-center space-y-2">
        <span class="text-2xl">📊</span>
        <span class="text-sm font-medium">Track Progress</span>
      </Button>
      <Button href="/trainers" variant="outline" class="h-20 flex flex-col items-center justify-center space-y-2">
        <span class="text-2xl">👨‍🏫</span>
        <span class="text-sm font-medium">Find Trainer</span>
      </Button>
    </div>
  </div>
{/if}