<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';
  import CourseNode from './CourseNode.svelte';
  import type { Course } from '$lib/types/course';
  
  // Properly extend NodeProps
  export let id: string;
  export let type: string;
  export let data: any;
  export let selected: boolean = false;
  export let dragHandle: string | undefined = undefined;
  export let dragging: boolean = false;
  export let zIndex: number | undefined = undefined;
  export let isConnectable: boolean = true;
  export let position: { x: number; y: number };
  export let positionAbsolute: { x: number; y: number } | undefined = undefined;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
</script>

<!-- Pass only the necessary properties to CourseNode -->
<CourseNode {data} />
