<script lang="ts">
	import { getFormControl } from "formsnap";
	import { cn } from "$lib/utils/cn.js";
	import { Label } from "$lib/components/ui/label/index.js";
	let className: string | undefined = undefined;
	export { className as class };
	const { labelAttrs } = getFormControl();
</script>

<Label {...$labelAttrs} class={cn("data-[fs-error]:text-destructive", className)} {...$$restProps}>
	<slot {labelAttrs} />
</Label>
