<script lang="ts">
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils/cn.js";
	let className: string | undefined = undefined;
	export { className as class };
</script>

<FormPrimitive.Legend
	{...$$restProps}
	class={cn("data-[fs-error]:text-destructive text-sm font-medium leading-none", className)}
	let:legendAttrs
>
	<slot {legendAttrs} />
</FormPrimitive.Legend>
