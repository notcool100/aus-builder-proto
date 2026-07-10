<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={`mx-auto w-full max-w-[1320px] px-[clamp(20px,5vw,60px)] ${className}`}>
	{@render children()}
</div>
