<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { initPinnedSteps } from '$lib/animations/parallax';

	export interface Phase {
		label: string;
		title: string[];
		description: string;
		video: string;
	}

	interface Props {
		phases: Phase[];
		badgeLabel?: string;
	}

	let { phases, badgeLabel = 'Phase' }: Props = $props();

	let containerEl: HTMLElement;
	let videoEls: HTMLVideoElement[] = [];
	let activeIndex = $state(0);

	onMount(() => {
		if (!browser) return;
		const cleanup = initPinnedSteps(containerEl, {
			steps: phases.length,
			scrollPerStep: 1.1,
			onChange: (idx) => {
				activeIndex = idx;
			}
		});
		return cleanup;
	});

	$effect(() => {
		videoEls[activeIndex]?.play().catch(() => {});
	});
</script>

<section bind:this={containerEl} class="relative h-screen w-full overflow-hidden bg-ink">
	{#each phases as phase, i (phase.label)}
		<video
			bind:this={videoEls[i]}
			src={phase.video}
			muted
			loop
			playsinline
			preload={i === 0 ? 'auto' : 'none'}
			class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
			style={`opacity:${i === activeIndex ? 0.5 : 0}`}
		></video>
	{/each}
	<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/70"></div>

	<div class="relative z-10 flex h-full flex-col justify-between px-6 py-20 sm:px-16 sm:py-24">
		<span
			class="font-cinematic w-fit rounded-full border border-cream/30 px-4 py-1.5 text-[11px] font-bold tracking-[2px] text-cream uppercase"
		>
			{badgeLabel} {activeIndex + 1} / {phases.length}
		</span>

		<div class="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
			<h2 class="font-cinematic max-w-2xl text-[11vw] leading-[0.94] font-extrabold tracking-tight text-cream uppercase sm:text-[5.5vw]">
				{#each phases[activeIndex].title as line, i (i)}
					<span class="block">{line}</span>
				{/each}
			</h2>
			<p class="font-cinematic max-w-[380px] text-[16px] leading-[1.6] font-medium text-cream/85 sm:text-right sm:text-[18px]">
				{phases[activeIndex].description}
			</p>
		</div>

		<div class="flex gap-2">
			{#each phases as phase, i (phase.label)}
				<div class={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= activeIndex ? 'bg-orange' : 'bg-cream/20'}`}></div>
			{/each}
		</div>
	</div>
</section>
