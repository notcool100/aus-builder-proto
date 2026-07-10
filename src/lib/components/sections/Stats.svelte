<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { initCounter } from '$lib/animations/parallax';
	import Container from '../layout/Container.svelte';

	interface Stat {
		target: number;
		suffix: string;
		label: string;
	}

	const stats: Stat[] = [
		{ target: 15, suffix: '+', label: 'Years of Experience' },
		{ target: 500, suffix: '+', label: 'Projects Completed' },
		{ target: 100, suffix: '%', label: 'Safety Record' },
		{ target: 48, suffix: 'hr', label: 'Emergency Response' }
	];

	let counterEls: HTMLElement[] = [];

	onMount(() => {
		if (!browser) return;
		const cleanups = stats.map((stat, i) => initCounter(counterEls[i], stat.target, { suffix: stat.suffix }));
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<div class="relative overflow-hidden" style="background:linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 60%, #8a3a05 100%);">
	<Container class="relative z-1 grid grid-cols-2 lg:grid-cols-4">
		{#each stats as stat, i (stat.label)}
			<div
				class={`border-white/15 px-8 py-12 text-center transition-colors duration-300 hover:bg-white/7 ${i < stats.length - 1 ? 'border-r' : ''}`}
			>
				<div class="font-display flex items-baseline justify-center gap-0.5 text-[clamp(52px,6vw,80px)] leading-none text-white">
					<span bind:this={counterEls[i]}>0</span>
				</div>
				<div class="font-condensed mt-2 text-[11px] font-semibold tracking-[3px] text-white/75 uppercase">{stat.label}</div>
			</div>
		{/each}
	</Container>
</div>
