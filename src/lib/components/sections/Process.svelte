<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal } from '$lib/animations/parallax';

	const steps = [
		{
			num: '01',
			title: 'Initial Consultation',
			desc: 'We discuss your project, timeline, and specific requirements. Free site visits available within 48 hours across Perth and Karratha.'
		},
		{
			num: '02',
			title: 'Site Assessment',
			desc: 'Our licensed assessors conduct a thorough site inspection — identifying all hazardous materials, quantities, condition ratings, and risk classifications.'
		},
		{
			num: '03',
			title: 'Compliance Planning',
			desc: 'We develop a full asbestos removal control plan, SWMS, WorkSafe notifications, and all required regulatory documentation before a single tool is lifted.'
		},
		{
			num: '04',
			title: 'Safe Removal',
			desc: 'Our licensed team executes removal to the highest safety standards — with continuous air monitoring, full PPE protocols, and real-time project management throughout.'
		},
		{
			num: '05',
			title: 'Clearance & Certification',
			desc: 'Independent licensed assessor clearance inspection, final air monitoring, and your complete compliance documentation package — delivered digitally and in hard copy.'
		}
	];

	let stepsEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		return initStaggerReveal(stepsEl, '.proc-step', { stagger: 0.12 });
	});
</script>

<section class="bg-navy py-[var(--section-pad,clamp(80px,10vw,140px))]" id="process">
	<Container>
		<div data-reveal="up" class="mb-18 text-center">
			<Heading
				eyebrow="How We Work"
				align="center"
				sub="From initial enquiry to final clearance, our structured process guarantees a safe, compliant, and stress-free outcome every time."
			>
				{#snippet title()}
					Our <span class="text-orange">5-Step Process</span>
				{/snippet}
			</Heading>
		</div>

		<div bind:this={stepsEl} class="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
			<div
				class="pointer-events-none absolute top-11 right-[calc(10%+22px)] left-[calc(10%+22px)] hidden h-0.5 lg:block"
				style="background: linear-gradient(90deg, var(--color-orange), var(--color-gold), var(--color-orange));"
			></div>
			{#each steps as step (step.num)}
				<div class="proc-step group relative z-1 flex flex-col items-center px-4 text-center">
					<div
						class="mb-6 flex h-22 w-22 items-center justify-center rounded-full border-2 border-orange/40 bg-cream transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-orange group-hover:bg-orange group-hover:text-cream group-hover:shadow-[0_10px_28px_rgba(193,58,34,0.3)]"
					>
						<span class="font-display text-[32px] text-orange group-hover:text-cream">{step.num}</span>
					</div>
					<div class="font-condensed mb-2.5 text-base font-bold">{step.title}</div>
					<div class="text-[13px] leading-[1.65] text-grey-2">{step.desc}</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
