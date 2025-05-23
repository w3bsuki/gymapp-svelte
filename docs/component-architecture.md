# Component Architecture

This document outlines the component structure for our fitness trainer web application, detailing the key components we'll need to build, their responsibilities, and how they interact.

## Component Structure Overview

```
src/
  lib/
    components/
      ui/                # UI components (shadcn)
      layout/            # Layout components
      auth/              # Authentication components
      course/            # Course-related components
      profile/           # User profile components
      community/         # Community and chat components
      dashboard/         # Dashboard components
      admin/             # Admin interface components
      shared/            # Shared utility components
```

## Core UI Components (shadcn/svelte)

These components will be generated using shadcn/svelte CLI and customized to match our design system:

```bash
npx shadcn-svelte add button
npx shadcn-svelte add card
npx shadcn-svelte add input
# etc.
```

### Essential UI Components
- Button
- Input
- Card
- Avatar
- Badge
- Dialog
- Dropdown Menu
- Select
- Tabs
- Toast
- Toggle
- Tooltip

## Layout Components

### Header.svelte
```svelte
<script>
  import { page } from '$app/stores';
  import Logo from '$lib/components/shared/Logo.svelte';
  import { Button } from '$lib/components/ui/button';
  import { DropdownMenu } from '$lib/components/ui/dropdown-menu';
  import { auth } from '$lib/stores/auth';
  
  export let transparent = false;
</script>

<header class={`fixed w-full z-50 transition-colors ${transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-900 shadow-sm'}`}>
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <div class="flex items-center">
      <Logo />
      <nav class="hidden md:flex ml-8 space-x-4">
        <a href="/" class="text-gray-700 dark:text-gray-200 hover:text-primary">Home</a>
        <a href="/courses" class="text-gray-700 dark:text-gray-200 hover:text-primary">Courses</a>
        <a href="/community" class="text-gray-700 dark:text-gray-200 hover:text-primary">Community</a>
        <a href="/about" class="text-gray-700 dark:text-gray-200 hover:text-primary">About</a>
      </nav>
    </div>
    
    <div class="flex items-center space-x-4">
      {#if $auth.user}
        <DropdownMenu>
          <!-- User menu options -->
        </DropdownMenu>
      {:else}
        <Button variant="ghost" href="/login">Login</Button>
        <Button href="/register">Sign Up</Button>
      {/if}
    </div>
  </div>
</header>
```

### Footer.svelte
```svelte
<script>
  import Logo from '$lib/components/shared/Logo.svelte';
  import { socialLinks } from '$lib/data/socialLinks';
</script>

<footer class="bg-gray-100 dark:bg-gray-900 py-12 mt-auto">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <Logo />
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Professional fitness training and community for all levels.
        </p>
        <div class="flex mt-4 space-x-4">
          {#each socialLinks as link}
            <a href={link.url} class="text-gray-500 hover:text-primary">
              <svelte:component this={link.icon} />
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Navigation columns -->
    </div>
    
    <div class="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} FitTrainer. All rights reserved.
      </p>
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a href="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy Policy</a>
        <a href="/terms" class="text-gray-600 dark:text-gray-400 hover:text-primary">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

### MainLayout.svelte
```svelte
<script>
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import { Toast } from '$lib/components/ui/toast';
  
  export let transparentHeader = false;
</script>

<div class="flex flex-col min-h-screen">
  <Header transparent={transparentHeader} />
  
  <main class="flex-1">
    <slot />
  </main>
  
  <Footer />
  <Toast />
</div>
```

### DashboardLayout.svelte
```svelte
<script>
  import Sidebar from './Sidebar.svelte';
  import Header from './DashboardHeader.svelte';
  import { Toast } from '$lib/components/ui/toast';
</script>

<div class="flex h-screen overflow-hidden">
  <Sidebar />
  
  <div class="flex flex-col flex-1 overflow-hidden">
    <Header />
    
    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </div>
  
  <Toast />
</div>
```

## Authentication Components

### LoginForm.svelte
```svelte
<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Alert } from '$lib/components/ui/alert';
  
  export let form;
</script>

<form method="POST" use:enhance class="space-y-4">
  <!-- Form fields -->
</form>
```

### RegisterForm.svelte
```svelte
<script>
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Alert } from '$lib/components/ui/alert';
  
  export let form;
</script>

<form method="POST" use:enhance class="space-y-4">
  <!-- Form fields -->
</form>
```

## Course Components

### CourseCard.svelte
```svelte
<script>
  import { Card } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  
  export let course;
  export let enrolled = false;
</script>

<Card class="overflow-hidden flex flex-col h-full">
  <div class="relative pb-[56.25%]">
    <img 
      src={course.imageUrl || '/placeholder-course.jpg'} 
      alt={course.title}
      class="absolute inset-0 w-full h-full object-cover"
    />
    {#if course.discountPrice}
      <Badge class="absolute top-2 right-2">Sale</Badge>
    {/if}
  </div>
  
  <div class="p-4 flex-1 flex flex-col">
    <div class="flex items-center text-sm text-gray-500 mb-2">
      <span>{course.difficulty}</span>
      <span class="mx-2">•</span>
      <span>{course.duration} mins</span>
    </div>
    
    <h3 class="text-lg font-semibold mb-2">{course.title}</h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4 flex-1">{course.description}</p>
    
    <div class="mt-auto">
      {#if course.discountPrice}
        <div class="flex items-center mb-2">
          <span class="text-lg font-bold">${course.discountPrice}</span>
          <span class="ml-2 text-gray-500 line-through">${course.price}</span>
        </div>
      {:else}
        <div class="text-lg font-bold mb-2">${course.price}</div>
      {/if}
      
      {#if enrolled}
        <Button variant="outline" href={`/dashboard/courses/${course.slug}`} class="w-full">
          Continue Learning
        </Button>
      {:else}
        <Button href={`/courses/${course.slug}`} class="w-full">
          View Course
        </Button>
      {/if}
    </div>
  </div>
</Card>
```

### CourseGrid.svelte
```svelte
<script>
  import CourseCard from './CourseCard.svelte';
  
  export let courses = [];
  export let enrolledCourses = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each courses as course (course.id)}
    <CourseCard 
      {course} 
      enrolled={enrolledCourses.some(ec => ec.courseId === course.id)} 
    />
  {/each}
</div>
```

### LessonPlayer.svelte
```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Progress } from '$lib/components/ui/progress';
  
  export let videoUrl;
  export let lessonId;
  
  let player;
  let progress = 0;
  let interval;
  
  onMount(() => {
    // Initialize video player
    
    interval = setInterval(() => {
      if (player && !player.paused) {
        progress = (player.currentTime / player.duration) * 100;
        // Save progress to server periodically
      }
    }, 5000);
  });
  
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="relative">
  <video
    bind:this={player}
    src={videoUrl}
    controls
    class="w-full rounded-lg"
    on:timeupdate={() => {
      progress = (player.currentTime / player.duration) * 100;
    }}
    on:ended={() => {
      // Mark lesson as completed
    }}
  ></video>
  
  <Progress value={progress} class="mt-2" />
</div>
```

## Profile Components

### ProfileHeader.svelte
```svelte
<script>
  import { Avatar } from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  
  export let user;
  export let isOwnProfile = false;
</script>

<div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row items-center gap-6">
      <Avatar 
        src={user.avatarUrl || '/default-avatar.png'} 
        alt={user.name}
        size="xl"
      />
      
      <div>
        <h1 class="text-3xl font-bold">{user.name}</h1>
        <p class="text-blue-100 mt-1">{user.bio || 'No bio available'}</p>
        
        <div class="flex gap-4 mt-4">
          {#if isOwnProfile}
            <Button variant="outline" href="/profile/edit">
              Edit Profile
            </Button>
          {:else}
            <Button variant="outline">
              Message
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
```

### ProfileTabs.svelte
```svelte
<script>
  import { Tabs } from '$lib/components/ui/tabs';
  
  export let activeTab = 'courses';
</script>

<Tabs value={activeTab}>
  <!-- Tab content -->
</Tabs>
```

## Community Components

### ChatMessage.svelte
```svelte
<script>
  import { Avatar } from '$lib/components/ui/avatar';
  import { formatDistance } from 'date-fns';
  
  export let message;
  export let isOwnMessage = false;
</script>

<div class={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
  {#if !isOwnMessage}
    <Avatar 
      src={message.sender.avatarUrl || '/default-avatar.png'} 
      alt={message.sender.name}
      size="sm"
      class="mr-2 mt-1"
    />
  {/if}
  
  <div class={`max-w-[70%] ${isOwnMessage ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'} rounded-lg p-3`}>
    <div class="text-sm">{message.content}</div>
    <div class="text-xs opacity-70 mt-1 text-right">
      {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
    </div>
  </div>
</div>
```

### ChatInput.svelte
```svelte
<script>
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { PaperAirplaneIcon } from 'lucide-svelte';
  
  let message = '';
  
  function sendMessage() {
    if (!message.trim()) return;
    
    // Emit message to parent component or directly to server
    dispatch('send', message);
    message = '';
  }
</script>

<form 
  class="flex items-center p-3 border-t dark:border-gray-700"
  on:submit|preventDefault={sendMessage}
>
  <Input
    bind:value={message}
    placeholder="Type a message..."
    class="flex-1"
  />
  
  <Button type="submit" class="ml-2" variant="ghost" size="icon">
    <PaperAirplaneIcon />
  </Button>
</form>
```

## Dashboard Components

### ProgressSummary.svelte
```svelte
<script>
  import { Card } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  
  export let enrollments = [];
</script>

<Card class="p-4">
  <h3 class="text-lg font-semibold mb-4">Your Progress</h3>
  
  {#if enrollments.length === 0}
    <p class="text-gray-500">You haven't enrolled in any courses yet.</p>
  {:else}
    <div class="space-y-4">
      {#each enrollments as enrollment}
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">{enrollment.course.title}</span>
            <span class="text-sm text-gray-500">{Math.round(enrollment.progress)}%</span>
          </div>
          <Progress value={enrollment.progress} />
        </div>
      {/each}
    </div>
  {/if}
</Card>
```

### EnrolledCourses.svelte
```svelte
<script>
  import { Card } from '$lib/components/ui/card';
  import CourseCard from '$lib/components/course/CourseCard.svelte';
  
  export let enrollments = [];
</script>

<Card class="p-4">
  <h3 class="text-lg font-semibold mb-4">Your Courses</h3>
  
  {#if enrollments.length === 0}
    <p class="text-gray-500">You haven't enrolled in any courses yet.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each enrollments as enrollment}
        <CourseCard course={enrollment.course} enrolled={true} />
      {/each}
    </div>
  {/if}
</Card>
```

## Admin Components

### CourseForm.svelte
```svelte
<script>
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Select } from '$lib/components/ui/select';
  
  export let course = {};
  export let categories = [];
</script>

<form method="POST" use:enhance class="space-y-6">
  <!-- Form fields -->
</form>
```

### UserList.svelte
```svelte
<script>
  import { Table } from '$lib/components/ui/table';
  import { Avatar } from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import { DropdownMenu } from '$lib/components/ui/dropdown-menu';
  
  export let users = [];
</script>

<Table>
  <!-- Table content -->
</Table>
```

## Svelte Flow Components

### WorkoutFlow.svelte
```svelte
<script>
  import { SvelteFlow, Background, Controls, Panel } from '@xyflow/svelte';
  import WorkoutNode from './WorkoutNode.svelte';
  
  export let workout;
  
  // Initialize nodes and edges for the workout flow
  
  // Register custom node types
  const nodeTypes = {
    workout: WorkoutNode
  };
</script>

<div class="h-[500px] w-full">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    fitView
  >
    <Background />
    <Controls />
    <Panel position="top-right">
      <!-- Controls -->
    </Panel>
  </SvelteFlow>
</div>
```

## Implementation Strategy

1. **Start with Core UI Components**:
   - Install and configure shadcn/svelte
   - Set up Tailwind CSS theming
   - Create base UI components

2. **Build Layout Components**:
   - Implement Header and Footer
   - Create responsive layouts
   - Set up navigation structure

3. **Authentication System**:
   - Build login and registration forms
   - Implement auth providers with Lucia
   - Create protected routes

4. **Course Platform Core**:
   - Develop course card and grid components
   - Build course detail page components
   - Create lesson player and progress tracking

5. **User Profiles and Dashboard**:
   - Implement profile components
   - Build dashboard widgets
   - Create progress visualization components

6. **Community Features**:
   - Develop chat interface components
   - Build forum and discussion components
   - Create real-time notification system

7. **Admin Interfaces**:
   - Build admin dashboard components
   - Create content management tools
   - Implement user management interfaces

8. **Svelte Flow Integration**:
   - Create custom nodes for workout visualization
   - Build interactive workout flow diagrams
   - Implement drag-and-drop workout builder

## Component Testing Strategy

- Use Vitest for unit testing components
- Create component stories for visual testing
- Implement accessibility testing with axe
- Use end-to-end testing for critical user flows

## Documentation

- Document component props with JSDoc comments
- Create a component library documentation page
- Maintain usage examples for complex components
- Include accessibility notes for each component
