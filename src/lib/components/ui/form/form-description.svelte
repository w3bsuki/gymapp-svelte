<script lang="ts">
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils/cn.js";
	let className: string | undefined = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn("text-muted-foreground text-sm", className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
