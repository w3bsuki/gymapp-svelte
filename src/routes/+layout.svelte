<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import '../app.css';

  let sidebarCollapsed = false;
  let activeSection = 'home';

  // Navigation sections for the social fitness app
  const navigationSections = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      href: '/',
      description: 'Dashboard & Overview'
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: '📚',
      href: '/courses',
      description: 'Training Programs'
    },
    {
      id: 'trainers',
      label: 'Trainers',
      icon: '💪',
      href: '/trainers',
      description: 'Expert Coaches'
    },
    {
      id: 'community',
      label: 'Community',
      icon: '👥',
      href: '/community',
      description: 'Social Hub'
    },
    {
      id: 'workouts',
      label: 'My Workouts',
      icon: '🏋️',
      href: '/workouts',
      description: 'Personal Training'
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: '📊',
      href: '/progress',
      description: 'Track Your Journey'
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: '🥗',
      href: '/nutrition',
      description: 'Meal Plans & Diet'
    },
    {
      id: 'challenges',
      label: 'Challenges',
      icon: '🏆',
      href: '/challenges',
      description: 'Fitness Competitions'
    }
  ];

  const communityChannels = [
    { id: 'general', name: 'General Chat', icon: '💬', unread: 3 },
    { id: 'motivation', name: 'Motivation', icon: '🔥', unread: 0 },
    { id: 'nutrition-tips', name: 'Nutrition Tips', icon: '🍎', unread: 1 },
    { id: 'workout-buddies', name: 'Workout Buddies', icon: '🤝', unread: 0 },
    { id: 'progress-pics', name: 'Progress Pics', icon: '📸', unread: 5 },
    { id: 'equipment-reviews', name: 'Equipment Reviews', icon: '⭐', unread: 0 }
  ];

  onMount(() => {
    // Set active section based on current route
    const currentPath = $page.url.pathname;
    const section = navigationSections.find(s => 
      currentPath === s.href || (s.href !== '/' && currentPath.startsWith(s.href))
    );
    if (section) {
      activeSection = section.id;
    }
  });

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }
</script>

<div class="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
  <!-- Discord-style Sidebar -->
  <aside class="{sidebarCollapsed ? 'w-16' : 'w-72'} bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out shadow-xl">
    <!-- App Header -->
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        {#if !sidebarCollapsed}
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">
              FT
            </div>
            <span class="font-bold text-lg">FitTrainer Social</span>
          </div>
        {:else}
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm mx-auto">
            FT
          </div>
        {/if}
        <button 
          on:click={toggleSidebar}
          class="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation Sections -->
    <div class="flex-1 overflow-y-auto py-4">
      <div class="px-3">
        {#if !sidebarCollapsed}
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
        {/if}
        
        <nav class="space-y-1">
          {#each navigationSections as section}
            <a 
              href={section.href}
              class="flex items-center {sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-lg transition-all duration-200 group"
              class:bg-blue-600={activeSection === section.id}
              class:text-white={activeSection === section.id}
              class:hover:bg-gray-700={activeSection !== section.id}
              class:text-gray-300={activeSection !== section.id}
              title={sidebarCollapsed ? section.label : ''}
            >
              <span class="text-xl {sidebarCollapsed ? '' : 'mr-3'}">{section.icon}</span>
              {#if !sidebarCollapsed}
                <div class="flex-1">
                  <div class="font-medium">{section.label}</div>
                  <div class="text-xs text-gray-400 group-hover:text-gray-300">{section.description}</div>
                </div>
              {/if}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Community Channels -->
      {#if !sidebarCollapsed}
        <div class="px-3 mt-8">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Community Channels</h3>
            <button class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-1">
            {#each communityChannels as channel}
              <a 
                href="/community/channels/{channel.id}"
                class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div class="flex items-center">
                  <span class="text-sm mr-2">{channel.icon}</span>
                  <span class="text-sm text-gray-300 group-hover:text-white">{channel.name}</span>
                </div>
                {#if channel.unread > 0}
                  <span class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {channel.unread}
                  </span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-gray-700">
      <div class="flex items-center {sidebarCollapsed ? 'justify-center' : 'space-x-3'}">
        <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
          JD
        </div>
        {#if !sidebarCollapsed}
          <div class="flex-1">
            <div class="font-medium text-sm">John Doe</div>
            <div class="text-xs text-gray-400">🟢 Online</div>
          </div>
          <div class="flex space-x-1">
            <button class="p-1 hover:bg-gray-700 rounded transition-colors" title="Settings">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
            <button class="p-1 hover:bg-gray-700 rounded transition-colors" title="Logout">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        {/if}
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Top Bar -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
            {navigationSections.find(s => s.id === activeSection)?.label || 'FitTrainer Social'}
          </h1>
          <div class="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>🔥</span>
            <span>1,247 members online</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search members, courses, chats..."
              class="w-64 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <svg class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Notifications -->
          <button class="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.93 3.93-3.93 3.93-3.93-3.93 3.93-3.93z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          
          <!-- Messages -->
          <button class="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">7</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <slot />
    </main>
  </div>
</div>

<style>
  /* Custom scrollbar for sidebar */
  aside::-webkit-scrollbar {
    width: 6px;
  }
  
  aside::-webkit-scrollbar-track {
    background: #374151;
  }
  
  aside::-webkit-scrollbar-thumb {
    background: #6B7280;
    border-radius: 3px;
  }
  
  aside::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
</style>
