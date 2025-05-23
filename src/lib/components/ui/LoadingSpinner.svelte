<script>
  import { fly, fade } from 'svelte/transition';
  export let visible = true;
</script>

{#if visible}
  <div class="flex flex-col items-center justify-center" in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
    <div class="relative">
      <div class="w-12 h-12 rounded-full border-4 border-primary border-opacity-25"></div>
      <div class="w-12 h-12 rounded-full border-4 border-primary border-l-transparent animate-spin absolute top-0 left-0"></div>
    </div>
    <p class="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
      <slot>Loading courses...</slot>
    </p>
  </div>
{/if}

<style>
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>
