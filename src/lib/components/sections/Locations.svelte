<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal } from '$lib/animations/parallax';

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
		return initStaggerReveal(gridEl, '.loc-card', { stagger: 0.15 });
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
						class="absolute inset-0 bg-cover bg-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
						style={`background-image:url(${loc.image});`}
					></div>
					<div
						class="absolute inset-0"
						style="background: linear-gradient(to top, rgba(5,8,16,.9) 0%, rgba(5,8,16,.4) 55%, transparent 100%);"
					></div>
					<div class="relative z-2 flex h-full flex-col justify-end p-8">
						<span class="font-condensed mb-2.5 w-fit rounded bg-orange px-3 py-1 text-[10px] font-bold tracking-[2.5px] uppercase">
							{loc.tag}
						</span>
						<div class="font-display mb-1.5 text-[42px] leading-none tracking-[1px]">{loc.city}</div>
						<div class="mb-4.5 text-[13px] text-grey-1">{loc.state}</div>
						<div class="flex flex-wrap gap-1.5">
							{#each loc.services as svc (svc)}
								<span class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] tracking-[0.5px]">{svc}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
