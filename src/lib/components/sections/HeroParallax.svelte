<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { initParallaxLayers } from '$lib/animations/parallax';
	import Button from '../ui/Button.svelte';

	interface Line {
		text: string;
		accent?: boolean;
	}

	interface Cta {
		label: string;
		href: string;
	}

	interface TrustItem {
		icon: string;
		label: string;
		value: string;
	}

	interface Props {
		eyebrow: string;
		lines: Line[];
		sub: string;
		primaryCta?: Cta;
		secondaryCta?: Cta;
		trustItems?: TrustItem[];
		compact?: boolean;
		bgImage?: string;
	}

	let {
		eyebrow,
		lines,
		sub,
		primaryCta,
		secondaryCta,
		trustItems = [],
		compact = false,
		bgImage = 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg'
	}: Props = $props();

	let heroEl: HTMLElement;
	let bgLayer: HTMLElement;
	let photoLayer: HTMLElement;
	let orbLayer: HTMLElement;

	onMount(() => {
		if (!browser) return;
		const cleanup = initParallaxLayers(
			[
				{ element: bgLayer, speed: 0.15 },
				{ element: photoLayer, speed: 0.28 },
				{ element: orbLayer, speed: 0.45 }
			],
			heroEl
		);
		return cleanup;
	});
</script>

<section
	bind:this={heroEl}
	class={`relative flex w-full flex-col overflow-hidden ${compact ? 'min-h-[52svh] pt-[clamp(110px,13vw,150px)] pb-16' : 'h-[100svh] min-h-[700px] pt-[clamp(110px,13vw,170px)]'}`}
>
	<!-- Background layer (slowest) -->
	<div
		bind:this={bgLayer}
		class="will-change-transform absolute inset-0"
		style="background:
			radial-gradient(ellipse 90% 80% at 75% 40%, rgba(244,124,32,.10) 0%, transparent 55%),
			radial-gradient(ellipse 70% 90% at 15% 85%, rgba(12,30,70,.7) 0%, transparent 55%),
			linear-gradient(155deg, #03060e 0%, #080f1e 40%, #0b1628 70%, #0e1e38 100%);"
	></div>

	<!-- Photo layer (midground) -->
	<div
		bind:this={photoLayer}
		class="will-change-transform absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen"
		style={`background-image:url(${bgImage});`}
		aria-hidden="true"
	></div>

	<div class="bg-noise pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden="true"></div>
	<div class="bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true"></div>

	<!-- Orbs (foreground-ish, fastest) -->
	<div bind:this={orbLayer} class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div
			class="animate-orb-drift absolute -top-[10%] -right-[5%] h-[650px] w-[650px] rounded-full opacity-80 blur-[100px]"
			style="background: radial-gradient(circle, rgba(244,124,32,.32), transparent 70%);"
		></div>
		<div
			class="animate-orb-drift absolute bottom-[5%] left-[10%] h-[400px] w-[400px] rounded-full opacity-70 blur-[100px] [animation-direction:reverse] [animation-delay:-5s]"
			style="background: radial-gradient(circle, rgba(15,55,120,.6), transparent 70%);"
		></div>
		<div
			class="animate-orb-drift absolute top-[20%] right-[30%] h-[250px] w-[250px] rounded-full opacity-60 blur-[100px] [animation-delay:-3s]"
			style="background: radial-gradient(circle, rgba(232,165,32,.3), transparent 70%);"
		></div>
	</div>

	<!-- Content -->
	<div class="relative z-5 max-w-[860px] px-[clamp(20px,5vw,60px)] pt-[clamp(24px,4vw,56px)]">
		<div class="font-condensed mb-7 inline-flex items-center gap-3 text-[13px] font-bold tracking-[5px] text-orange uppercase">
			<span class="h-0.5 w-8 bg-orange"></span>
			{eyebrow}
		</div>

		<h1 class="font-display mb-7.5 text-[clamp(58px,9vw,110px)] leading-[0.92] tracking-[2px]">
			{#each lines as line, i (i)}
				<span class={`block ${line.accent ? 'text-orange' : ''}`}>{line.text}</span>
			{/each}
		</h1>

		<p class="mb-11 max-w-[580px] text-[clamp(15px,1.6vw,18px)] leading-[1.75] text-grey-1">
			{sub}
		</p>

		{#if primaryCta || secondaryCta}
			<div class="flex flex-wrap items-center gap-4">
				{#if primaryCta}
					<Button variant="primary" href={primaryCta.href}>
						{primaryCta.label}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
							><path
								d="M3 8h10M9 4l4 4-4 4"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</Button>
				{/if}
				{#if secondaryCta}
					<Button variant="ghost" href={secondaryCta.href}>{secondaryCta.label}</Button>
				{/if}
			</div>
		{/if}
	</div>

	{#if trustItems.length}
		<div class="relative z-6 mt-auto">
			<div class="mx-auto flex max-w-[1320px] flex-wrap px-[clamp(20px,5vw,60px)]">
				{#each trustItems as item, i (item.value)}
					<div
						class={`flex flex-1 min-w-[50%] items-center gap-3.5 border-t border-r border-white/7 bg-white/3 px-6.5 py-5 backdrop-blur-md transition-colors hover:border-orange/25 hover:bg-orange/7 sm:min-w-0 ${i === 0 ? 'border-l' : ''}`}
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[18px]"
							style="background:linear-gradient(135deg, var(--color-orange), var(--color-gold));"
						>
							{item.icon}
						</div>
						<div>
							<p class="font-condensed mb-0.5 text-[10px] tracking-[2px] text-grey-2 uppercase">{item.label}</p>
							<strong class="text-[13.5px] font-bold">{item.value}</strong>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if !compact}
		<div class="absolute top-1/2 right-12 z-6 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex">
			<div class="animate-scroll-flow relative h-[90px] w-px overflow-hidden bg-gradient-to-b from-orange to-transparent"></div>
			<span class="font-condensed text-[10px] tracking-[3px] text-grey-2 uppercase [writing-mode:vertical-rl]">Scroll</span>
		</div>
	{/if}
</section>
