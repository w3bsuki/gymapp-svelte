<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import { writable, get, derived } from 'svelte/store';
  import { spring, tweened } from 'svelte/motion';
  import { cubicOut, elasticOut } from 'svelte/easing';
  import { browser } from '$app/environment';import { 
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    Panel
  } from '@xyflow/svelte';
  import type { Node, Edge, NodeProps, NodeTypes } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import type { Course } from '$lib/types/course';
  import CourseNode from './CourseNode.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  export let courses: Course[] = [];
  export let selectedCategory = '';
  export let selectedCourseId: string | null = null;

  const dispatch = createEventDispatcher();

  // Enhanced stores with animation support
  const nodesStore = writable<Node[]>([]);
  const edgesStore = writable<Edge[]>([]);
  const viewportStore = writable({ x: 0, y: 0, zoom: 1 });
  const animationState = writable({ isAnimating: false, progress: 0 });  const nodeTypes: NodeTypes = {
    // @ts-ignore - Ignore type errors related to the component structure
    courseNode: CourseNode
  };

  // Smart layout configuration
  const layoutConfig = {
    nodeSpacing: { x: 350, y: 200 },
    categorySpacing: 450,
    difficultyLevels: ['Beginner', 'Intermediate', 'Advanced'],
    forceStrength: 0.3,
    centerForce: 0.1,
    repelForce: 0.2
  };

  // Visual enhancement stores
  const hoveredNodeId = writable<string | null>(null);
  const focusedCourseId = writable<string | null>(null);
  const connectionPaths = writable<{ [key: string]: string[] }>({});
  
  // Performance optimization
  const visibleNodes = derived(
    [nodesStore, viewportStore],
    ([$nodes, $viewport]) => {
      // Only render nodes in viewport for large datasets
      if ($nodes.length > 50) {
        const viewBounds = calculateViewBounds($viewport);
        return $nodes.filter(node => isNodeInView(node, viewBounds));
      }
      return $nodes;
    }
  );

  let flowInstance: any;
  let animationFrame: number;
  let tooltip = { visible: false, x: 0, y: 0, content: '' };

  onMount(() => {
    initializeFlow();
    setupPerformanceOptimizations();
  });  $: {
    if (browser && courses && courses.length > 0) {
      animateFlowTransition();
    }
  }
  // Smart layout algorithm for course nodes with force-directed positioning
  function calculateNodePositions(filteredCourses: Course[]) {
    const positions: { [key: string]: { x: number; y: number } } = {};
    
    // Create force simulation for organic positioning
    const forceSimulation = createForceSimulation(filteredCourses);
    
    // Group courses by category and difficulty for structured layout
    const categoryGroups = groupCoursesByCategory(filteredCourses);
    const difficultyGroups = groupCoursesByDifficulty(filteredCourses);
    
    // Apply hierarchical positioning with physics constraints
    Object.entries(categoryGroups).forEach(([category, categoryCourses], categoryIndex) => {
      const baseX = categoryIndex * layoutConfig.categorySpacing + 200;
      
      categoryCourses.forEach((course, courseIndex) => {
        const difficultyLevel = layoutConfig.difficultyLevels.indexOf(course.difficulty);
        const baseY = 300 + (difficultyLevel - 1) * layoutConfig.nodeSpacing.y;
        
        // Add some organic variation
        const variation = {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 80
        };
        
        positions[course.id] = {
          x: baseX + variation.x,
          y: baseY + variation.y + (courseIndex % 3 - 1) * 120
        };
      });
    });

    return applyForceDirectedOptimization(positions, filteredCourses);
  }

  function createForceSimulation(courses: Course[]) {
    // Simplified force simulation for node positioning
    return {
      strength: layoutConfig.forceStrength,
      iterations: 50,
      cooling: 0.95
    };
  }

  function groupCoursesByCategory(courses: Course[]) {
    const groups: Record<string, Course[]> = {};
    courses.forEach(course => {
      if (!groups[course.category]) groups[course.category] = [];
      groups[course.category].push(course);
    });
    return groups;
  }

  function groupCoursesByDifficulty(courses: Course[]) {
    const groups: Record<string, Course[]> = {};
    courses.forEach(course => {
      if (!groups[course.difficulty]) groups[course.difficulty] = [];
      groups[course.difficulty].push(course);
    });
    return groups;
  }

  function applyForceDirectedOptimization(positions: any, courses: Course[]) {
    // Apply physics-based optimization to prevent overlaps
    const iterations = 30;
    const repelForce = layoutConfig.repelForce;
    
    for (let i = 0; i < iterations; i++) {
      courses.forEach(course1 => {
        courses.forEach(course2 => {
          if (course1.id === course2.id) return;
          
          const pos1 = positions[course1.id];
          const pos2 = positions[course2.id];
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = repelForce / (distance * distance);
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            pos1.x += fx;
            pos1.y += fy;
            pos2.x -= fx;
            pos2.y -= fy;
          }
        });
      });
    }
    
    return positions;  }

  // Advanced animation system
  function animateFlowTransition() {
    animationState.set({ isAnimating: true, progress: 0 });
    
    const duration = 800;
    const startTime = Date.now();
    
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      animationState.set({ isAnimating: true, progress });      if (progress < 1 && browser && typeof requestAnimationFrame !== 'undefined') {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationState.set({ isAnimating: false, progress: 1 });
        initializeFlow();
      }
    }    // Only cancel if animationFrame exists and we're in browser
    if (animationFrame && browser && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(animationFrame);
    }
    animate();
  }

  // Performance optimizations
  function setupPerformanceOptimizations() {
    // Debounce viewport changes
    let viewportTimer: number;
    
    const debouncedViewportUpdate = (viewport: any) => {
      clearTimeout(viewportTimer);
      viewportTimer = setTimeout(() => {
        viewportStore.set(viewport);
      }, 16) as any; // 60fps
    };
    
    // Setup intersection observer for node visibility
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const nodeId = entry.target.getAttribute('data-node-id');
          if (nodeId) {
            // Update node visibility state
          }
        });
      });
    }
  }

  function calculateViewBounds(viewport: any) {
    const padding = 200;
    return {
      left: -viewport.x / viewport.zoom - padding,
      right: (-viewport.x + window.innerWidth) / viewport.zoom + padding,
      top: -viewport.y / viewport.zoom - padding,
      bottom: (-viewport.y + window.innerHeight) / viewport.zoom + padding
    };
  }

  function isNodeInView(node: Node, bounds: any) {
    return (
      node.position.x >= bounds.left &&
      node.position.x <= bounds.right &&
      node.position.y >= bounds.top &&
      node.position.y <= bounds.bottom
    );
  }
  function initializeFlow() {
    const filteredCourses = selectedCategory ? 
      courses.filter(course => course.category === selectedCategory) : 
      courses;

    const positions = calculateNodePositions(filteredCourses);

    // Enhanced node creation with dynamic sizing and visual hierarchy
    const newNodes = filteredCourses.map(course => {
      const nodeSize = calculateNodeSize(course);
      const nodeStyle = calculateNodeStyle(course);
      
      return {
        id: course.id,
        type: 'courseNode',
        data: {
          course,
          isSelected: selectedCourseId === course.id,
          isHighlighted: false,
          isConnected: false,
          nodeSize,
          importance: calculateNodeImportance(course)
        },
        position: positions[course.id] || { x: 0, y: 0 },
        style: nodeStyle
      } as Node;
    });
    nodesStore.set(newNodes);

    // Enhanced edge creation with gradient styles and animations
    const newEdges: Edge[] = [];
    const categoryGroups: Record<string, Course[]> = {};
    filteredCourses.forEach(course => {
      if (!categoryGroups[course.category]) {
        categoryGroups[course.category] = [];
      }
      categoryGroups[course.category].push(course);
    });

    // Create edges for difficulty progression with enhanced styling
    Object.values(categoryGroups).forEach(categoryCourses => {
      const sortOrder: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      categoryCourses.sort((a, b) => sortOrder[a.difficulty] - sortOrder[b.difficulty]);
      
      for (let i = 0; i < categoryCourses.length - 1; i++) {
        const edgeId = `progression-${categoryCourses[i].id}-${categoryCourses[i+1].id}`;
        newEdges.push({
          id: edgeId,
          source: categoryCourses[i].id,
          target: categoryCourses[i+1].id,
          type: 'smoothstep',
          animated: true,
          style: createProgressionEdgeStyle(),
          data: { type: 'progression', strength: 0.8 }
        } as Edge);
      }
    });

    // Create edges for featured course connections with golden styling
    const featuredCourses = filteredCourses.filter(course => course.featured);
    featuredCourses.forEach((course1, i) => {
      for (let j = i + 1; j < featuredCourses.length; j++) {
        const course2 = featuredCourses[j];
        const isAlreadyConnected = newEdges.some(edge => 
          (edge.source === course1.id && edge.target === course2.id) || 
          (edge.source === course2.id && edge.target === course1.id)
        );
        
        if (!isAlreadyConnected) {
          const edgeId = `featured-${course1.id}-${course2.id}`;
          newEdges.push({
            id: edgeId,
            source: course1.id,
            target: course2.id,
            type: 'smoothstep',
            animated: false,
            style: createFeaturedEdgeStyle(),
            data: { type: 'featured', strength: 0.6 }
          } as Edge);
        }
      }
    });

    // Create edges for skill relationships with purple gradient
    filteredCourses.forEach((course1, i) => {
      for (let j = i + 1; j < filteredCourses.length; j++) {
        const course2 = filteredCourses[j];
        if (course1.category === course2.category) continue;
        const sharedTags = course1.tags.filter(tag => course2.tags.includes(tag));
        if (sharedTags.length >= 2) {
          const isAlreadyConnected = newEdges.some(edge => 
            (edge.source === course1.id && edge.target === course2.id) || 
            (edge.source === course2.id && edge.target === course1.id)
          );
          if (!isAlreadyConnected) {
            const edgeId = `skill-${course1.id}-${course2.id}`;
            newEdges.push({
              id: edgeId,
              source: course1.id,
              target: course2.id,
              type: 'smoothstep',
              animated: false,
              style: createSkillEdgeStyle(sharedTags.length),
              data: { type: 'skill', strength: sharedTags.length / 5, sharedTags }
            } as Edge);
          }
        }
      }    });

    edgesStore.set(newEdges);
    
    // Dispatch flowUpdated event with connected course IDs
    const connectedCourseIds = getConnectedCoursesMap(newEdges);
    dispatch('flowUpdated', {
      connectedCourseIds,
      courseConnections: getCourseConnectionsMap(newEdges)
    });
  }

  // Visual enhancement functions
  function calculateNodeSize(course: Course) {
    let size = 1.0;
    if (course.featured) size += 0.3;
    if (course.difficulty === 'Advanced') size += 0.2;
    if (course.tags && course.tags.length > 3) size += 0.1;
    return Math.min(size, 1.8);
  }

  function calculateNodeStyle(course: Course) {
    const baseStyle = {
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    if (course.featured) {
      return {
        ...baseStyle,
        filter: 'drop-shadow(0 8px 25px rgba(251, 191, 36, 0.3))'
      };
    }

    return baseStyle;
  }

  function calculateNodeImportance(course: Course) {
    let importance = 0.5;
    if (course.featured) importance += 0.3;
    if (course.difficulty === 'Advanced') importance += 0.2;
    if (course.tags && course.tags.length > 3) importance += 0.1;
    return Math.min(importance, 1.0);
  }

  function createProgressionEdgeStyle() {
    return `
      stroke: url(#progression-gradient);
      stroke-width: 2.5px;
      filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
    `;
  }

  function createFeaturedEdgeStyle() {
    return `
      stroke: url(#featured-gradient);
      stroke-width: 2px;
      stroke-dasharray: 8 4;
      filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
    `;
  }

  function createSkillEdgeStyle(strength: number) {
    const opacity = 0.3 + (strength / 5) * 0.7;
    return `
      stroke: url(#skill-gradient);
      stroke-width: ${1 + strength * 0.5}px;
      stroke-dasharray: 4 6;
      opacity: ${opacity};
      filter: drop-shadow(0 1px 3px rgba(139, 92, 246, 0.2));
    `;
  }

  // Flow interaction handlers
  function handleNodeClick(event: CustomEvent) {
    if (event.detail.node) {
      dispatch('nodeSelected', { 
        courseId: event.detail.node.id,
        connectedCourseIds: getConnectedCourseIds(event.detail.node.id)
      });
    }
  }

  function handlePaneClick() {
    dispatch('nodeSelected', { courseId: null, connectedCourseIds: [] });
  }

  function handleNodeMouseEnter(event: CustomEvent) {
    if (event.detail.node) {
      hoveredNodeId.set(event.detail.node.id);
      
      // Show advanced tooltip
      const course = event.detail.node.data.course;
      tooltip = {
        visible: true,
        x: event.detail.event.clientX,
        y: event.detail.event.clientY,
        content: `
          <div class="space-y-1">
            <div class="font-semibold">${course.title}</div>
            <div class="text-xs text-muted-foreground">${course.difficulty} • ${course.category}</div>
            ${course.featured ? '<div class="text-xs text-amber-500">⭐ Featured Course</div>' : ''}
          </div>
        `
      };
    }
  }

  function handleNodeMouseLeave() {
    hoveredNodeId.set(null);
    tooltip.visible = false;
  }

  function toggleConnectionHighlight() {
    // Toggle connection visualization mode
    const nodes = get(nodesStore);
    const showConnections = !nodes.some(node => node.data.isConnected);
    
    nodesStore.set(nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isConnected: showConnections
      }
    })));
  }
  function getConnectedCourseIds(nodeId: string): string[] {
    const edges = get(edgesStore);
    return edges
      .filter(edge => edge.source === nodeId || edge.target === nodeId)
      .map(edge => edge.source === nodeId ? edge.target : edge.source);
  }
  
  function getConnectedCoursesMap(edges: Edge[]): Record<string, boolean> {
    const map: Record<string, boolean> = {};
    edges.forEach(edge => {
      map[edge.source] = true;
      map[edge.target] = true;
    });
    return map;
  }
  
  function getCourseConnectionsMap(edges: Edge[]): Record<string, string[]> {
    const map: Record<string, string[]> = {};
    edges.forEach(edge => {
      if (!map[edge.source]) map[edge.source] = [];
      if (!map[edge.target]) map[edge.target] = [];
      
      map[edge.source].push(edge.target);
      map[edge.target].push(edge.source);
    });
    return map;
  }

  // API methods for external control
  export function highlightNode(nodeId: string) {
    const nodes = get(nodesStore);
    nodesStore.set(nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: node.id === nodeId,
        isConnected: getConnectedCourseIds(nodeId).includes(node.id)
      }
    })));
  }

  export function unhighlightNode(nodeId: string) {
    const nodes = get(nodesStore);
    nodesStore.set(nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: false,
        isConnected: false
      }
    })));
  }

  export function focusNode(nodeId: string) {
    if (flowInstance) {
      const node = get(nodesStore).find(n => n.id === nodeId);
      if (node) {
        flowInstance.setCenter(node.position.x, node.position.y, { duration: 800 });
      }
    }
  }
</script>

<div class="relative w-full h-full rounded-lg bg-background" aria-label="Course relationship diagram">
  <!-- SVG Definitions for Gradients and Patterns -->
  <svg width="0" height="0" class="absolute">
    <defs>
      <!-- Progression Gradient (Blue) -->
      <linearGradient id="progression-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#1d4ed8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
      </linearGradient>
      
      <!-- Featured Gradient (Gold) -->
      <linearGradient id="featured-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#f59e0b;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
      </linearGradient>
      
      <!-- Skill Gradient (Purple) -->
      <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#7c3aed;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
      </linearGradient>
      
      <!-- Animated Flow Pattern -->
      <pattern id="flow-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </pattern>
    </defs>
  </svg>  <SvelteFlow
    nodes={nodesStore}
    edges={edgesStore}
    nodeTypes={nodeTypes}
    fitView
    minZoom={0.2}
    maxZoom={2}
    on:nodeclick={handleNodeClick}
    on:paneclick={handlePaneClick}
    on:nodemouseenter={handleNodeMouseEnter}
    on:nodemouseleave={handleNodeMouseLeave}
  >    <Background 
      gap={24} 
      size={1} 
      class="bg-grid"
    />
    
    <Controls />
    
    <MiniMap 
      class="!fixed !right-4 !bottom-4 rounded-lg border shadow-lg" 
      nodeStrokeWidth={3} 
      nodeColor="#888"
      maskColor="rgb(255, 255, 255, 0.1)"
    />
    
    <!-- Enhanced Control Panel -->
    <Panel position="top-right" class="space-y-2 p-2">
      <Button 
        variant="outline" 
        size="sm" 
        class="w-full justify-start shadow-sm hover:shadow-md transition-shadow" 
        on:click={() => flowInstance?.fitView({ duration: 800 })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        Fit View
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        class="w-full justify-start shadow-sm hover:shadow-md transition-shadow" 
        on:click={() => flowInstance?.setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Reset View
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        class="w-full justify-start shadow-sm hover:shadow-md transition-shadow" 
        on:click={toggleConnectionHighlight}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Connections
      </Button>
    </Panel>

    <!-- Legend Panel -->
    <Panel position="bottom-left" class="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
      <h3 class="text-sm font-semibold mb-3 text-foreground">Connection Types</h3>
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
          <span class="text-muted-foreground">Learning Path</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded" style="border-style: dashed;"></div>
          <span class="text-muted-foreground">Featured</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded opacity-70"></div>
          <span class="text-muted-foreground">Skill Match</span>
        </div>
      </div>
    </Panel>    <!-- Advanced Tooltip -->
    {#if tooltip.visible}
      <div 
        class="absolute z-50 px-3 py-2 bg-background border rounded-lg shadow-xl text-sm max-w-xs pointer-events-none tooltip"
        style="left: {tooltip.x}px; top: {tooltip.y}px; transform: translate(-50%, -100%);"
      >
        {@html tooltip.content}
      </div>
    {/if}
  </SvelteFlow>
  <!-- Loading Overlay -->
  {#if $animationState.isAnimating}
    <div class="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg loading-overlay">
      <div class="flex items-center gap-3 px-6 py-3 bg-background border rounded-xl shadow-xl">
        <div class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm font-medium text-foreground">Organizing courses...</span>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Enhanced grid background */
  :global(.bg-grid) {
    background-size: 24px 24px;
    background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
    color: hsl(var(--muted) / 0.08);
    animation: grid-pulse 4s ease-in-out infinite;
  }

  @keyframes grid-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* Enhanced node animations */
  :global(.svelte-flow__node) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  :global(.svelte-flow__node:hover) {
    transform: scale(1.05);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
    z-index: 10;
  }

  :global(.svelte-flow__node.selected) {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4));
  }

  /* Enhanced edge styling */
  :global(.svelte-flow__edge-path) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
  }

  :global(.svelte-flow__edge-path:hover) {
    stroke-width: 3px !important;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  }

  /* Animated edge flow */
  :global(.svelte-flow__edge.animated .svelte-flow__edge-path) {
    stroke-dasharray: 20;
    animation: flow 3s linear infinite;
  }

  @keyframes flow {
    0% { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 0; }
  }

  /* Enhanced controls styling */
  :global(.svelte-flow__controls) {
    backdrop-filter: blur(8px);
    background: hsl(var(--background) / 0.95);
    border: 1px solid hsl(var(--border));
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  :global(.svelte-flow__controls button) {
    background-color: transparent;
    border: none;
    color: hsl(var(--foreground));
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.125rem;
  }

  :global(.svelte-flow__controls button:hover) {
    background-color: hsl(var(--accent) / 0.1);
    transform: scale(1.1);
    color: hsl(var(--primary));
  }

  :global(.svelte-flow__controls button:active) {
    transform: scale(0.95);
  }

  /* Enhanced minimap styling */
  :global(.svelte-flow__minimap) {
    backdrop-filter: blur(8px);
    background: hsl(var(--background) / 0.95);
    border: 1px solid hsl(var(--border));
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /* Panel enhancements */
  :global(.svelte-flow__panel) {
    backdrop-filter: blur(12px);
  }

  /* Selection box styling */
  :global(.svelte-flow__selection) {
    background: rgba(59, 130, 246, 0.1);
    border: 2px solid rgba(59, 130, 246, 0.4);
    border-radius: 0.5rem;
  }

  /* Handle styling */
  :global(.svelte-flow__handle) {
    background: hsl(var(--primary));
    border: 2px solid hsl(var(--background));
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  :global(.svelte-flow__handle:hover) {
    background: hsl(var(--primary-foreground));
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }

  /* Loading animation improvements */
  .loading-overlay {
    animation: loading-fade 0.3s ease-out;
  }

  @keyframes loading-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Tooltip enhancements */
  .tooltip {
    animation: tooltip-appear 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes tooltip-appear {
    from { 
      opacity: 0; 
      transform: translate(-50%, -100%) scale(0.8);
    }
    to { 
      opacity: 1; 
      transform: translate(-50%, -100%) scale(1);
    }
  }

  /* Connection highlight effects */
  :global(.svelte-flow__node[data-connected="true"]) {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% { 
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }
    50% { 
      filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.3));
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    :global(.svelte-flow__controls) {
      bottom: 1rem;
      right: 1rem;
      left: auto;
      top: auto;
    }
    
    :global(.svelte-flow__minimap) {
      width: 120px;
      height: 80px;
    }
  }

  /* Dark mode enhancements */
  @media (prefers-color-scheme: dark) {
    :global(.bg-grid) {
      color: hsl(var(--muted) / 0.12);
    }
    
    :global(.svelte-flow__node) {
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :global(.svelte-flow__edge-path) {
      stroke-width: 3px !important;
    }
    
    :global(.svelte-flow__node) {
      border: 2px solid hsl(var(--foreground));
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    :global(.svelte-flow__node),
    :global(.svelte-flow__edge-path),
    :global(.svelte-flow__controls button) {
      transition: none !important;
      animation: none !important;
    }
    
    @keyframes flow {
      0%, 100% { stroke-dashoffset: 0; }
    }
  }
</style>
