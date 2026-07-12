<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal, initParallax } from '$lib/animations/parallax';
	import Star from 'lucide-svelte/icons/star';

	const testimonials = [
		{
			text: "Summit made what felt like an overwhelming, high-risk process completely straightforward and stress-free. Incredibly professional team, lightning-fast mobilisation, and the compliance paperwork was immaculate. We'd trust nobody else with our portfolio.",
			initials: 'MR',
			name: 'Michael Robertson',
			role: 'Senior Property Developer, Perth WA'
		},
		{
			text: 'The Summit crew in Karratha were absolutely exceptional. They understood our LNG environment, adapted to our operational schedule, and completed a 18,000m² decontamination without a single safety incident. Remarkable work.',
			initials: 'SK',
			name: 'Sarah Kowalski',
			role: 'Site Manager, Resources Sector, Karratha'
		},
		{
			text: 'As an Indigenous-owned business themselves, Summit genuinely understands what it means to work on Country with respect and care. Their Supply Nation certification helped us meet our procurement targets without compromising an ounce of quality.',
			initials: 'TW',
			name: 'Thomas Williams',
			role: 'Procurement Manager, Local Government Authority'
		},
		{
			text: 'When cyclone damage exposed asbestos across our school buildings, Summit had crews on-site within 6 hours. They secured the buildings, protected our community, and delivered clearance documentation within 72 hours. Absolutely extraordinary emergency response.',
			initials: 'AL',
			name: 'Amanda Lee',
			role: 'Principal, Regional School, Pilbara WA'
		},
		{
			text: "We've used Summit across 14 commercial demolition projects over 4 years. Consistent quality, zero safety issues, always on budget and on time. Their documentation is the best I've seen in the industry — never had a compliance issue once.",
			initials: 'JP',
			name: 'James Patterson',
			role: 'Construction Director, Major Commercial Builder'
		},
		{
			text: "Summit's asbestos management plan gave our heritage property the detailed, council-approved documentation we needed to progress our development. Their consultants were knowledgeable, thorough, and delivered above and beyond expectations.",
			initials: 'CB',
			name: 'Chloe Barnett',
			role: 'Heritage Property Developer, Fremantle WA'
		}
	];

	let gridEl: HTMLElement;
	let blobEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		gsap.set(blobEl, { xPercent: -50 });
		const cleanups = [
			initStaggerReveal(gridEl, '.testi-card'),
			initParallax(blobEl, { speed: 0.32, x: 120, scaleFrom: 0.85, scaleTo: 1.15 })
		];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<section class="relative overflow-hidden bg-navy-2 py-[var(--section-pad,clamp(80px,10vw,140px))]">
	<div
		bind:this={blobEl}
		class="will-change-transform pointer-events-none absolute top-[-300px] left-1/2 h-[900px] w-[900px] rounded-full"
		style="background: radial-gradient(circle, rgba(193,58,34,.05), transparent 70%);"
	></div>

	<Container class="relative">
		<div data-reveal="up" class="mb-17.5 text-center">
			<Heading eyebrow="Testimonials" align="center" sub="Real results from real clients across Western Australia. Our reputation is built project by project, relationship by relationship.">
				{#snippet title()}
					What Our Clients Say
				{/snippet}
			</Heading>
		</div>

		<div bind:this={gridEl} class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as t (t.name)}
				<div
					class="testi-card relative overflow-hidden rounded-[18px] border border-line bg-cream p-9.5 transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:border-orange/25 hover:shadow-[0_20px_48px_rgba(29,30,24,0.12)]"
				>
					<span
						class="pointer-events-none absolute top-5 right-6 font-serif text-[120px] leading-[0.7] text-orange/12 select-none"
						aria-hidden="true">&ldquo;</span
					>
					<div class="mb-5.5 flex gap-0.5 text-gold">
						{#each Array(5) as _, i (i)}
							<Star size={15} fill="currentColor" strokeWidth={0} />
						{/each}
					</div>
					<p class="mb-7.5 text-[15px] leading-[1.8] text-grey-1 italic">&ldquo;{t.text}&rdquo;</p>
					<div class="flex items-center gap-3.5">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-cream"
							style="background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));"
						>
							{t.initials}
						</div>
						<div>
							<div class="mb-0.5 text-[15px] font-bold">{t.name}</div>
							<div class="text-xs text-grey-2">{t.role}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
