<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initStaggerReveal, initParallax } from '$lib/animations/parallax';
	import Landmark from 'lucide-svelte/icons/landmark';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import RefreshCw from 'lucide-svelte/icons/refresh-cw';
	import Leaf from 'lucide-svelte/icons/leaf';
	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';

	const creds = [
		{ icon: Landmark, title: 'Class A Asbestos Licence', sub: 'Licensed for friable & non-friable asbestos removal in WA' },
		{ icon: TriangleAlert, title: 'WorkSafe WA Certified', sub: 'Full compliance with all WA occupational health & safety regulations' },
		{ icon: RefreshCw, title: 'ISO 9001:2015', sub: 'Internationally certified quality management system' },
		{ icon: Leaf, title: 'Supply Nation Certified', sub: 'Verified Indigenous business — supporting Closing the Gap' },
		{ icon: FlaskConical, title: 'EPA Compliant', sub: 'Full Environmental Protection Authority waste disposal compliance' },
		{ icon: ShieldCheck, title: 'Fully Insured', sub: '$20M public liability & professional indemnity coverage' }
	];

	let gridEl: HTMLElement;
	let badgeEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		const cleanups = [initStaggerReveal(gridEl, '.cred-card'), initParallax(badgeEl, { speed: 0.18 })];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<section class="bg-navy-2 py-[var(--section-pad,clamp(80px,10vw,140px))]">
	<Container>
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<div data-reveal="left">
				<Heading
					eyebrow="Credentials"
					sub="Our certifications aren't just badges — they're the proof of our unwavering commitment to safety, quality, and environmental responsibility on every job."
				>
					{#snippet title()}
						Fully Licensed.<br />Independently<br /><span class="text-orange">Certified.</span>
					{/snippet}
				</Heading>

				<div bind:this={gridEl} class="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#each creds as cred (cred.title)}
						<div
							class="cred-card rounded-xl border border-white/7 bg-white/3 px-5 py-6 text-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/35 hover:bg-orange/5"
						>
							<div class="mb-3 flex justify-center text-orange">
								<cred.icon size={30} strokeWidth={1.6} />
							</div>
							<div class="font-condensed mb-1.5 text-sm font-bold tracking-[0.5px]">{cred.title}</div>
							<div class="text-xs leading-[1.5] text-grey-2">{cred.sub}</div>
						</div>
					{/each}
				</div>
			</div>

			<div data-reveal="right">
				<div
					bind:this={badgeEl}
					class="will-change-transform relative overflow-hidden rounded-[20px] border border-white/8 px-8 py-14 shadow-[0_40px_90px_rgba(0,0,0,0.4)]"
					style="background: var(--color-navy-3);"
				>
					<div
						class="pointer-events-none absolute inset-0"
						style="background: radial-gradient(ellipse at 70% 30%, rgba(244,124,32,.1), transparent 60%);"
					></div>
					<div
						class="animate-badge-spin relative z-2 mx-auto mb-9 flex h-40 w-40 flex-col items-center justify-center rounded-full shadow-[0_20px_60px_rgba(244,124,32,0.45)]"
						style="background: linear-gradient(145deg, var(--color-orange), var(--color-gold), var(--color-orange-dark));"
					>
						<div class="animate-badge-spin-reverse flex flex-col items-center">
							<div class="font-display text-[60px] leading-none text-white">A</div>
							<div class="font-condensed text-[11px] tracking-[2px] text-white/85">CLASS A</div>
							<div class="font-condensed text-[11px] tracking-[2px] text-white/85">LICENSED</div>
						</div>
					</div>
					<div class="font-display relative z-2 text-center text-[28px] tracking-[2px]">
						ZERO TOLERANCE<br /><span class="text-orange">FOR RISK</span>
					</div>
					<div class="relative z-2 mt-2.5 text-center text-[13px] text-grey-2">Every worker. Every site. Every time.</div>
				</div>
			</div>
		</div>
	</Container>
</section>
