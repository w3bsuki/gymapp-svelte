<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/utils/cn.js";
	let className: string | undefined = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className
	)}
	{...$$restProps}
	on:mousedown
>
	<slot />
</LabelPrimitive.Root>
