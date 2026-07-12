<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { fly } from 'svelte/transition';
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

	/** How far (px) each video travels as it falls through the frame from above to below. */
	const FALL_DISTANCE = 140;
	/** The giant background numeral falls at a slightly different rate — a separate depth plane. */
	const NUM_FALL = 100;
	const DUST_COUNT = 22;

	let containerEl: HTMLElement;
	let videoEls: HTMLVideoElement[] = [];
	let numEls: HTMLElement[] = [];
	let trail1Els: HTMLElement[] = [];
	let trail2Els: HTMLElement[] = [];
	let activeIndex = $state(0);

	function applyFall(progress: number) {
		// Continuous position within the whole sequence (e.g. 2.35 = 35% through phase 2).
		const raw = progress * phases.length;
		videoEls.forEach((video, i) => {
			if (!video) return;
			// Signed distance from this video's "on screen, centred" moment: negative
			// while it's still above/incoming, 0 when active, positive once it has
			// fallen past and is exiting below.
			const offset = raw - i;
			const settle = Math.max(0, 1 - Math.abs(offset));
			gsap.set(video, {
				y: offset * FALL_DISTANCE,
				opacity: settle * 0.5,
				scale: 1 + (1 - settle) * 0.06
			});
			// Numeral + two blurred ghost copies trailing slightly further behind it —
			// a cheap comet-trail illusion without animating real duplicated DOM per frame cost.
			if (numEls[i]) gsap.set(numEls[i], { y: offset * NUM_FALL, opacity: settle * 0.09 });
			if (trail1Els[i]) gsap.set(trail1Els[i], { y: offset * NUM_FALL * 1.18, opacity: settle * 0.045 });
			if (trail2Els[i]) gsap.set(trail2Els[i], { y: offset * NUM_FALL * 1.36, opacity: settle * 0.025 });
		});
	}

	onMount(() => {
		if (!browser) return;

		gsap.set([...videoEls, ...numEls, ...trail1Els, ...trail2Els], { willChange: 'transform, opacity' });
		applyFall(0);

		const cleanup = initPinnedSteps(containerEl, {
			steps: phases.length,
			scrollPerStep: 1.1,
			onChange: (idx, progress) => {
				activeIndex = idx;
				applyFall(progress);
			}
		});
		return cleanup;
	});

	$effect(() => {
		videoEls[activeIndex]?.play().catch(() => {});
	});

	/** Splits a phase's title into per-letter spans with a cascading delay, for the 3D flip-up entrance. */
	function letterSpans(line: string, startIndex: number) {
		return [...line].map((ch, i) => ({ ch, delay: (startIndex + i) * 22 }));
	}
	const titleLines = $derived.by(() => {
		let n = 0;
		return phases[activeIndex].title.map((line) => {
			const spans = letterSpans(line, n);
			n += line.length;
			return spans;
		});
	});

	const dust = Array.from({ length: DUST_COUNT }, (_, n) => ({
		left: (n * 41.3) % 100,
		size: 1.5 + (n % 4) * 0.7,
		opacity: 0.14 + (n % 5) * 0.05,
		duration: 7 + (n % 9),
		delay: -(n % 14)
	}));
</script>

<section bind:this={containerEl} class="relative h-screen w-full overflow-hidden bg-ink">
	<!-- Ambient falling dust — always drifting, independent of phase; ties the motif of
	     "everything moves down" into the frame even while scroll is idle mid-phase. -->
	<div class="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
		{#each dust as d, n (n)}
			<span
				class="dust-mote absolute -top-[6%] rounded-full"
				style={`left:${d.left}%; width:${d.size}px; height:${d.size}px; opacity:${d.opacity}; animation-duration:${d.duration}s; animation-delay:${d.delay}s;`}
			></span>
		{/each}
	</div>

	{#each phases as phase, i (phase.label)}
		<video
			bind:this={videoEls[i]}
			src={phase.video}
			muted
			loop
			playsinline
			preload={i === 0 ? 'auto' : 'none'}
			class="absolute inset-0 h-full w-full object-cover opacity-0"
		></video>
		<!-- Light sweep: a one-shot gloss that plays across the frame only at the instant this
		     phase becomes active (CSS keyframe restarts each time the class is (re)applied). -->
		<div class={`pointer-events-none absolute inset-0 z-6 overflow-hidden ${i === activeIndex ? 'sweep-armed' : ''}`}>
			<div class="sweep-el absolute -inset-y-1/4 -inset-x-3/5"></div>
		</div>
		<div
			bind:this={trail2Els[i]}
			class="pointer-events-none absolute right-2.5 -bottom-9 z-4 text-[210px] leading-none font-extrabold text-orange blur-[14px] select-none"
		>
			0{i + 1}
		</div>
		<div
			bind:this={trail1Els[i]}
			class="pointer-events-none absolute right-2.5 -bottom-9 z-4 text-[210px] leading-none font-extrabold text-orange blur-[8px] select-none"
		>
			0{i + 1}
		</div>
		<div
			bind:this={numEls[i]}
			class="pointer-events-none absolute right-2.5 -bottom-9 z-5 text-[210px] leading-none font-extrabold text-cream select-none"
		>
			0{i + 1}
		</div>
	{/each}
	<div class="absolute inset-0 z-7 bg-gradient-to-t from-ink via-ink/25 to-ink/70"></div>

	<div class="relative z-10 flex h-full flex-col justify-between px-6 py-20 sm:px-16 sm:py-24">
		<span
			class="font-cinematic w-fit rounded-full border border-cream/30 px-4 py-1.5 text-[11px] font-bold tracking-[2px] text-cream uppercase"
		>
			{badgeLabel} {activeIndex + 1} / {phases.length}
		</span>

		{#key activeIndex}
			<div
				class="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
				out:fly={{ y: 56, duration: 280, easing: (t) => t * t }}
			>
				<h2
					class="font-cinematic title-3d max-w-2xl text-[11vw] leading-[0.94] font-extrabold tracking-tight text-cream uppercase sm:text-[5.5vw]"
				>
					{#each titleLines as line, i (i)}
						<span class="block">
							{#each line as { ch, delay } (delay)}
								<span class="letter inline-block" style={`animation-delay:${delay}ms`}
									>{ch === ' ' ? ' ' : ch}</span
								>
							{/each}
						</span>
					{/each}
				</h2>
				<p
					class="font-cinematic max-w-[380px] text-[16px] leading-[1.6] font-medium text-cream/85 sm:text-right sm:text-[18px]"
					in:fly={{ y: -16, duration: 500, delay: 380, easing: (t) => 1 - Math.pow(1 - t, 3) }}
				>
					{phases[activeIndex].description}
				</p>
			</div>
		{/key}

		<div class="flex gap-2">
			{#each phases as phase, i (phase.label)}
				<div class={`relative h-1 flex-1 overflow-hidden rounded-full transition-colors duration-500 ${i <= activeIndex ? 'bg-orange' : 'bg-cream/20'}`}>
					{#if i === activeIndex}
						<div class="absolute inset-0 rounded-full shadow-[0_0_10px_1px_rgba(193,58,34,0.7)]"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.dust-mote {
		background: radial-gradient(circle, rgba(243, 235, 221, 0.9), rgba(243, 235, 221, 0) 70%);
		animation-name: dustfall;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes dustfall {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(105vh);
		}
	}

	.sweep-el {
		background: linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.14) 50%, transparent 58%);
		opacity: 0;
	}
	.sweep-armed .sweep-el {
		animation: sweep 0.95s cubic-bezier(0.16, 1, 0.3, 1);
	}
	@keyframes sweep {
		0% {
			transform: translateX(-60%);
			opacity: 0;
		}
		12% {
			opacity: 1;
		}
		60% {
			opacity: 0.5;
		}
		100% {
			transform: translateX(35%);
			opacity: 0;
		}
	}

	.title-3d {
		perspective: 900px;
	}
	.letter {
		transform-origin: 50% 100%;
		transform: translateY(85%) rotateX(-100deg);
		opacity: 0;
		animation: letterRise 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
	@keyframes letterRise {
		0% {
			transform: translateY(85%) rotateX(-100deg);
			opacity: 0;
		}
		55% {
			opacity: 1;
		}
		100% {
			transform: translateY(0) rotateX(0deg);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dust-mote,
		.sweep-armed .sweep-el,
		.letter {
			animation: none !important;
			opacity: 1;
			transform: none;
		}
	}
</style>
