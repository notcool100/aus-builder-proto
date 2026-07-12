<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal, initParallax } from '$lib/animations/parallax';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import Zap from 'lucide-svelte/icons/zap';
	import FileText from 'lucide-svelte/icons/file-text';
	import Handshake from 'lucide-svelte/icons/handshake';

	const features = [
		{
			icon: ShieldCheck,
			title: 'Proven Zero-Incident Safety Record',
			desc: 'Our safety management system exceeds all industry benchmarks. SWMS, JSAs, and toolbox talks on every job. Zero LTIs across 500+ projects.'
		},
		{
			icon: Zap,
			title: 'Rapid Mobilisation — 48 Hour Response',
			desc: 'From quote approval to boots on the ground in as little as 48 hours. Full emergency response capability 24/7, 365 days — anywhere in WA.'
		},
		{
			icon: FileText,
			title: 'Complete Compliance Documentation Package',
			desc: 'Every project delivers clearance certificates, air monitoring reports, waste manifests, and a full compliance file — protecting you legally and operationally.'
		},
		{
			icon: Handshake,
			title: 'Indigenous Business Procurement Advantage',
			desc: 'Supply Nation certified — helping government and corporate clients satisfy Indigenous procurement targets while receiving premium quality service.'
		}
	];

	const miniStats = [
		{ num: '500+', label: 'Projects Complete' },
		{ num: '0', label: 'Lost Time Injuries' },
		{ num: '15+', label: 'Years Experience' },
		{ num: '48hr', label: 'Emergency Response' }
	];

	let featuresEl: HTMLElement;
	let statsEl: HTMLElement;
	let imageEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		const cleanups = [
			initStaggerReveal(featuresEl, '.why-feature'),
			initStaggerReveal(statsEl, '.mini-stat', { stagger: 0.07 }),
			initParallax(imageEl, { speed: 0.3, scaleFrom: 1.18 })
		];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<section class="bg-bg py-[var(--section-pad,clamp(80px,10vw,140px))]" id="why">
	<Container>
		<div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
			<div data-reveal="left">
				<Heading
					eyebrow="Why Summit"
					sub="We don't just remove hazards. We engineer outcomes that protect people, satisfy regulators, and give you complete peace of mind — from first call to final certificate."
				>
					{#snippet title()}
						Built on Trust.<br />Backed by<br /><span class="text-orange">Expertise.</span>
					{/snippet}
				</Heading>

				<div bind:this={featuresEl} class="mt-11 flex flex-col gap-5.5">
					{#each features as feature (feature.title)}
						<div
							class="why-feature flex items-start gap-5 rounded-[14px] border border-line bg-surface px-6 py-6.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 hover:border-orange/35 hover:bg-orange/5"
						>
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange/22 bg-orange/12 text-orange transition-all duration-350"
							>
								<feature.icon size={22} strokeWidth={1.75} />
							</div>
							<div>
								<div class="font-condensed mb-1.5 text-lg font-bold tracking-[0.3px]">{feature.title}</div>
								<div class="text-[13.5px] leading-[1.7] text-grey-1">{feature.desc}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div data-reveal="right" class="relative">
				<div class="relative h-[420px] overflow-hidden rounded-[18px] shadow-[0_24px_64px_rgba(29,30,24,0.18)] lg:h-[520px]">
					<div
						bind:this={imageEl}
						role="img"
						aria-label="Licensed specialist in protective equipment"
						class="will-change-transform absolute inset-x-0 -inset-y-[14%] bg-cover bg-center"
						style="background-image:url(https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg); background-color: var(--color-navy-3);"
					></div>
					<div
						class="pointer-events-none absolute inset-0 rounded-[18px]"
						style="background: radial-gradient(ellipse at 50% 80%, rgba(193,58,34,.14), transparent 65%);"
					></div>
				</div>

				<div
					class="animate-badge-spin absolute -right-6 -bottom-6 hidden h-[150px] w-[150px] items-center justify-center rounded-full shadow-[0_14px_36px_rgba(193,58,34,0.32)] sm:flex"
					style="background: linear-gradient(135deg, var(--color-orange), var(--color-gold), var(--color-orange-dark));"
				>
					<div class="animate-badge-spin-reverse flex flex-col items-center">
						<div class="font-display text-[46px] leading-none text-white">A</div>
						<div class="font-condensed text-center text-[10px] leading-tight text-white/85">CLASS A<br />LICENSED</div>
					</div>
				</div>

				<div bind:this={statsEl} class="mt-10 grid grid-cols-2 gap-3">
					{#each miniStats as stat (stat.label)}
						<div
							class="mini-stat rounded-xl border border-line bg-surface px-4.5 py-5 text-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/30 hover:bg-orange/5"
						>
							<div class="font-display text-4xl leading-none text-orange">{stat.num}</div>
							<div class="mt-1 text-xs tracking-[0.5px] text-grey-2">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Container>
</section>
