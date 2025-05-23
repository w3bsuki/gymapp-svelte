<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';

  // Mock community data
  const communityChannels = [
    {
      id: '1',
      name: 'General Discussion',
      description: 'A place for general fitness discussion and community support.',
      members: 1452,
      lastActive: '2025-05-20T15:30:00Z',
      icon: '💬'
    },
    {
      id: '2',
      name: 'Nutrition & Recipes',
      description: 'Share your favorite healthy recipes and nutrition tips.',
      members: 987,
      lastActive: '2025-05-21T09:15:00Z',
      icon: '🥗'
    },
    {
      id: '3',
      name: 'Workout Buddies',
      description: 'Find workout partners near you or join virtual workout sessions.',
      members: 765,
      lastActive: '2025-05-21T08:45:00Z',
      icon: '🏋️'
    },
    {
      id: '4',
      name: 'Transformation Stories',
      description: 'Share your fitness journey and inspire others with your transformation.',
      members: 1123,
      lastActive: '2025-05-19T14:20:00Z',
      icon: '✨'
    },
    {
      id: '5',
      name: 'Form Check',
      description: 'Post videos of your exercise form and get feedback from the community.',
      members: 543,
      lastActive: '2025-05-20T11:05:00Z',
      icon: '📹'
    }
  ];

  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Otherwise return full date
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
</script>

<svelte:head>
	<title>Community | FitTrainer</title>
	<meta name="description" content="Join the FitTrainer community to connect with fellow fitness enthusiasts, share tips, and get support." />
</svelte:head>

<section class="pt-16 pb-12 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">FitTrainer Community</h1>
    <p class="text-xl text-blue-100 max-w-3xl">
      Connect with fellow fitness enthusiasts, share your journey, get advice, and support others.
    </p>
  </div>
</section>

<section class="py-12">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <div class="md:w-1/4">
        <Card>
          <CardContent>
            <h2 class="text-lg font-semibold mb-4">Community Channels</h2>
            <nav class="space-y-1">
              {#each communityChannels as channel}
                <a 
                  href={`/community/${channel.id}`} 
                  class="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center"
                >
                  <span class="text-xl mr-2">{channel.icon}</span>
                  <span>{channel.name}</span>
                </a>
              {/each}
            </nav>
            
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" class="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Create New Channel
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card class="mt-4">
          <CardContent>
            <h2 class="text-lg font-semibold mb-4">My Profile</h2>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg mr-3">
                U
              </div>
              <div>
                <div class="font-medium">User123</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Member since May 2025</div>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button href="/profile" variant="link" class="p-0 h-auto font-normal text-sm text-blue-600 dark:text-blue-400">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <!-- Main Content -->
      <div class="md:w-3/4">
        <Card>
          <CardContent>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Popular Channels</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div class="space-y-4">
              {#each communityChannels as channel}
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <div class="flex items-start">
                    <div class="text-3xl mr-4">{channel.icon}</div>
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold">
                        <a href={`/community/${channel.id}`} class="hover:text-primary">
                          {channel.name}
                        </a>
                      </h3>
                      <CardDescription class="mt-1">{channel.description}</CardDescription>
                      
                      <div class="flex items-center text-sm mt-2 text-gray-500 dark:text-gray-400">
                        <span>{channel.members} members</span>
                        <span class="mx-2">•</span>
                        <span>Last active {formatDate(channel.lastActive)}</span>
                      </div>
                    </div>
                    <Button href={`/community/${channel.id}`} variant="default" size="sm">
                      Join
                    </Button>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <Card class="mt-6">
          <CardContent>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Latest Activity</h2>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            
            <div class="space-y-4">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex">
                  <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">
                    J
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center">
                      <span class="font-medium">JaneDoe</span>
                      <span class="mx-2 text-gray-500 dark:text-gray-400">•</span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">Today at 10:45 AM</span>
                    </div>
                    <p class="mt-2">Just completed the "Complete Body Transformation" program! So proud of my progress. Here are my before and after photos.</p>
                    <div class="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        Like
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                        </svg>
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex">
                  <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold mr-3">
                    M
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center">
                      <span class="font-medium">MikeT</span>
                      <span class="mx-2 text-gray-500 dark:text-gray-400">•</span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">Yesterday</span>
                    </div>
                    <p class="mt-2">Looking for a workout buddy in the Chicago area. I usually train in the mornings around 6 AM. Anyone interested?</p>
                    <div class="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        Like
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                        </svg>
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <Button variant="outline">
                Load More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
