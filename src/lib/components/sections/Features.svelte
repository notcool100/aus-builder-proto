<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import Button from '../ui/Button.svelte';
	import { initStaggerReveal } from '$lib/animations/parallax';

	interface ServiceItem {
		num: string;
		icon: string;
		title: string;
		desc: string;
		href?: string;
	}

	interface Props {
		eyebrow?: string;
		sub?: string;
		items: ServiceItem[];
		linkLabel?: string;
		viewAllHref?: string;
		viewAllLabel?: string;
	}

	let {
		eyebrow = 'What We Do',
		sub = 'Comprehensive hazardous material removal and demolition solutions delivered with precision, full regulatory compliance, and zero safety compromise.',
		items,
		linkLabel = 'Learn More',
		viewAllHref,
		viewAllLabel = 'View All Services'
	}: Props = $props();

	let gridEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		return initStaggerReveal(gridEl, '.svc-card');
	});
</script>

<section class="bg-navy py-[var(--section-pad,clamp(80px,10vw,140px))]">
	<Container>
		<div data-reveal="up" class="mb-16">
			<Heading {eyebrow} {sub}>
				{#snippet title()}
					Industry-Leading<br /><span class="text-orange">Environmental Services</span>
				{/snippet}
			</Heading>
		</div>

		<div bind:this={gridEl} class="grid grid-cols-1 gap-px bg-white/4 sm:grid-cols-2 lg:grid-cols-3">
			{#each items as item, i (item.title)}
				<div class="svc-card group relative overflow-hidden bg-navy-2 p-11 pr-9 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-navy-3">
					<div
						class="pointer-events-none absolute top-3.5 right-5.5 font-display text-[90px] leading-none text-white/3.5 transition-colors duration-400 select-none group-hover:text-orange/7"
					>
						{item.num}
					</div>
					<div
						class="mb-6.5 flex h-13.5 w-13.5 items-center justify-center rounded-xl border border-orange/22 bg-orange/10 text-[26px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:-rotate-4 group-hover:border-orange/55 group-hover:bg-orange/22"
					>
						{item.icon}
					</div>
					<h3 class="font-condensed mb-3.5 text-[22px] leading-tight font-bold tracking-[0.5px]">{item.title}</h3>
					<p class="mb-8 text-sm leading-[1.75] text-grey-1">{item.desc}</p>
					<a
						href={item.href ?? '/contact'}
						class="font-condensed inline-flex items-center gap-2 text-[12px] font-bold tracking-[2.5px] text-orange uppercase no-underline transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:gap-4"
					>
						{linkLabel}
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
							><path
								d="M3 8h10M9 4l4 4-4 4"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</a>
					<div
						class="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-orange to-gold transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
					></div>
				</div>
			{/each}
		</div>

		{#if viewAllHref}
			<div class="mt-13 text-center">
				<Button variant="ghost" href={viewAllHref}>{viewAllLabel} →</Button>
			</div>
		{/if}
	</Container>
</section>
