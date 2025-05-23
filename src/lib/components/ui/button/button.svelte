<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { buttonVariants } from "./index.js";
	import { cn } from "$lib/utils/cn.js";
	let className: string | undefined = undefined;
	export let variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" = "default";
	export let size: "default" | "sm" | "lg" | "icon" = "default";
	export let builders = [];
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
