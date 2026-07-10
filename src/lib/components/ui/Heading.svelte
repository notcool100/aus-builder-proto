<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow?: string;
		sub?: string;
		align?: 'left' | 'center';
		level?: 1 | 2;
		class?: string;
		title: Snippet;
	}

	let { eyebrow, sub, align = 'left', level = 2, class: className = '', title }: Props = $props();

	const isCenter = $derived(align === 'center');
</script>

<div class={`${isCenter ? 'text-center' : ''} ${className}`}>
	{#if eyebrow}
		<div
			class={`font-condensed inline-flex items-center gap-3 text-[13px] font-bold tracking-[4px] text-orange uppercase mb-4.5 ${isCenter ? 'justify-center' : ''}`}
		>
			{#if !isCenter}
				<span class="h-0.5 w-7 shrink-0 bg-orange"></span>
			{/if}
			{eyebrow}
		</div>
	{/if}

	{#if level === 1}
		<h1 class="font-display text-balance-tight mb-5 text-[clamp(58px,9vw,110px)]">
			{@render title()}
		</h1>
	{:else}
		<h2 class="font-display text-balance-tight mb-5 text-[clamp(40px,5.5vw,76px)]">
			{@render title()}
		</h2>
	{/if}

	{#if sub}
		<p class={`text-[clamp(15px,1.5vw,17px)] leading-[1.75] text-grey-1 max-w-[520px] ${isCenter ? 'mx-auto' : ''}`}>
			{sub}
		</p>
	{/if}
</div>
