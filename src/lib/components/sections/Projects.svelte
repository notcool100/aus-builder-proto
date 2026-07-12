<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import Button from '../ui/Button.svelte';
	import { initStaggerReveal } from '$lib/animations/parallax';
	import MapPin from 'lucide-svelte/icons/map-pin';

	interface Project {
		category: 'industrial' | 'commercial' | 'residential' | 'government';
		tag: string;
		name: string;
		location: string;
		image: string;
		alt: string;
		featured?: boolean;
	}

	const projects: Project[] = [
		{
			category: 'industrial',
			tag: 'Industrial',
			name: 'Karratha LNG Facility Decontamination',
			location: 'Karratha, WA — 18,000m² Full Site Remediation',
			image: 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg',
			alt: 'Industrial processing plant',
			featured: true
		},
		{
			category: 'commercial',
			tag: 'Commercial',
			name: 'Perth CBD Office Tower Removal',
			location: 'Perth CBD, WA — 28-Floor Asbestos Strip',
			image: 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1200',
			alt: 'Commercial office tower in a city'
		},
		{
			category: 'residential',
			tag: 'Residential',
			name: 'Fremantle Heritage Home Restoration',
			location: 'Fremantle, WA — Full Internal Remediation',
			image: 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg',
			alt: 'Residential heritage home exterior'
		},
		{
			category: 'government',
			tag: 'Government',
			name: 'Midland Hospital Demolition',
			location: 'Midland, WA — Controlled Structural Demolition',
			image: 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg',
			alt: 'Demolition site with heavy machinery'
		},
		{
			category: 'industrial',
			tag: 'Industrial',
			name: 'Port Hedland Processing Plant',
			location: 'Port Hedland, WA — Hazmat Decommissioning',
			image: 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg',
			alt: 'Industrial plant and pipework'
		}
	];

	const filters = ['all', 'commercial', 'industrial', 'residential', 'government'] as const;
	let activeFilter = $state<(typeof filters)[number]>('all');

	const visibleProjects = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	let gridEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		return initStaggerReveal(gridEl, '.proj-card', { stagger: 0.08 });
	});
</script>

<section class="bg-[#050810] py-[var(--section-pad,clamp(80px,10vw,140px))]" id="projects">
	<Container>
		<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
			<div data-reveal="left">
				<Heading eyebrow="Our Work">
					{#snippet title()}
						Featured<br /><span class="text-orange">Projects</span>
					{/snippet}
				</Heading>
			</div>
			<div data-reveal="right" class="flex flex-wrap gap-1.5">
				{#each filters as filter (filter)}
					<button
						onclick={() => (activeFilter = filter)}
						class={`font-condensed rounded-full border px-5.5 py-2.5 text-xs font-bold tracking-[2px] uppercase transition-all duration-300 ${
							activeFilter === filter
								? 'border-orange bg-orange text-white'
								: 'border-white/14 text-grey-2 hover:border-orange hover:bg-orange hover:text-white'
						}`}
					>
						{filter}
					</button>
				{/each}
			</div>
		</div>

		<div bind:this={gridEl} class="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px]">
			{#each visibleProjects as project (project.name)}
				<div
					class={`proj-card group relative min-h-[260px] cursor-pointer overflow-hidden bg-navy-3 transition-all duration-400 ${project.featured ? 'lg:row-span-2' : ''}`}
				>
					<div
						role="img"
						aria-label={project.alt}
						class="absolute inset-0 bg-cover bg-center transition-transform duration-650 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
						style={`background-image:url(${project.image});`}
					></div>
					<div
						class="absolute inset-0 flex flex-col justify-end p-7.5 opacity-70 transition-opacity duration-400 group-hover:opacity-100"
						style="background: linear-gradient(to top, rgba(5,8,16,.95) 0%, rgba(5,8,16,.5) 50%, transparent 100%);"
					>
						<span class="font-condensed mb-2.5 w-fit rounded bg-orange px-3 py-1 text-[10px] font-bold tracking-[2.5px] uppercase">
							{project.tag}
						</span>
						<div class="font-condensed mb-1 text-xl font-bold">{project.name}</div>
						<div class="flex items-center gap-1.5 text-[12.5px] text-grey-1">
							<MapPin size={13} strokeWidth={2} class="shrink-0" />
							{project.location}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-13 text-center">
			<Button variant="ghost" href="/services">
				View All Projects
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
					><path
						d="M3 8h10M9 4l4 4-4 4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</Button>
		</div>
	</Container>
</section>
