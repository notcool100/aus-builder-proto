<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal, initGridParallax } from '$lib/animations/parallax';

	const locations = [
		{
			tag: 'Primary Office',
			city: 'Perth',
			state: 'Western Australia — Metro & Surrounds',
			services: ['Asbestos Removal', 'Demolition', 'Hazmat', 'Emergency Response'],
			image: 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1400',
			alt: 'Perth skyline at dusk'
		},
		{
			tag: 'Regional Office',
			city: 'Karratha',
			state: 'Pilbara Region — Mining & Resources',
			services: ['Industrial Removal', 'Site Decontamination', 'FIFO Projects', 'Emergency'],
			image: 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1400',
			alt: 'Pilbara landscape'
		}
	];

	let gridEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		const cleanups = [
			initStaggerReveal(gridEl, '.loc-card', { stagger: 0.15 }),
			initGridParallax(gridEl, '.loc-img', { speeds: [0.3, -0.4], scaleFrom: 1.2 })
		];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<section class="bg-navy py-[var(--section-pad,clamp(80px,10vw,140px))]">
	<Container>
		<div data-reveal="up">
			<Heading
				eyebrow="Service Areas"
				sub="Servicing Perth metro, Karratha, and all of regional Western Australia — including the Pilbara, Kimberley, Goldfields, and Mid-West regions."
			>
				{#snippet title()}
					We Come to <span class="text-orange">You</span>
				{/snippet}
			</Heading>
		</div>

		<div bind:this={gridEl} class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each locations as loc (loc.city)}
				<div class="loc-card group relative min-h-[280px] cursor-pointer overflow-hidden rounded-2xl lg:min-h-[320px]">
					<div
						role="img"
						aria-label={loc.alt}
						class="loc-img will-change-transform absolute inset-x-0 -inset-y-[20%] bg-cover bg-center"
						style={`background-image:url(${loc.image});`}
					></div>
					<div
						class="absolute inset-0"
						style="background: linear-gradient(to top, rgba(15,15,12,.92) 0%, rgba(15,15,12,.4) 55%, transparent 100%);"
					></div>
					<div class="relative z-2 flex h-full flex-col justify-end p-8">
						<span class="font-condensed mb-2.5 w-fit rounded bg-orange px-3 py-1 text-[10px] font-bold tracking-[2.5px] text-cream uppercase">
							{loc.tag}
						</span>
						<div class="font-display mb-1.5 text-[42px] leading-none tracking-[1px] text-cream">{loc.city}</div>
						<div class="mb-4.5 text-[13px] text-cream/70">{loc.state}</div>
						<div class="flex flex-wrap gap-1.5">
							{#each loc.services as svc (svc)}
								<span class="rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-[11px] tracking-[0.5px] text-cream">{svc}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
