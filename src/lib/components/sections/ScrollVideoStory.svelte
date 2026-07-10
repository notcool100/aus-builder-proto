<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { initVideoScrub } from '$lib/animations/parallax';

	interface Props {
		videoSrc: string;
		paragraphs: string[];
		finalLines: string[];
	}

	let { videoSrc, paragraphs, finalLines }: Props = $props();

	let sectionEl: HTMLElement;
	let videoEl: HTMLVideoElement;
	let paraEls: HTMLElement[] = [];
	let finalEl: HTMLElement;

	const SCROLL_RANGE = '+=350%';

	onMount(() => {
		if (!browser) return;

		const cleanupVideo = initVideoScrub(videoEl, sectionEl, { pin: false, start: 'top top', end: SCROLL_RANGE });

		const ctx = gsap.context(() => {
			gsap.set(paraEls, { opacity: 0, backgroundPosition: '100% 0' });
			gsap.set(finalEl, { opacity: 0, scale: 0.92 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top top',
					end: SCROLL_RANGE,
					scrub: 1,
					pin: true
				}
			});

			const step = 1.15;
			paraEls.forEach((el, i) => {
				const t = i * step;
				tl.to(el, { opacity: 1, duration: 0.15 }, t)
					.to(el, { backgroundPosition: '0% 0', duration: 0.75, ease: 'none' }, t)
					.to(el, { opacity: 0, duration: 0.2 }, t + step - 0.25);
			});

			tl.to(finalEl, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, paraEls.length * step);
		}, sectionEl);

		return () => {
			cleanupVideo();
			ctx.revert();
		};
	});
</script>

<section bind:this={sectionEl} class="relative h-screen w-full overflow-hidden bg-ink">
	<video
		bind:this={videoEl}
		src={videoSrc}
		muted
		playsinline
		preload="auto"
		class="absolute inset-0 h-full w-full object-cover opacity-55"
	></video>
	<div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80"></div>

	<div class="relative z-10 flex h-full items-center justify-center px-6 sm:px-16">
		{#each paragraphs as paragraph, i (i)}
			<p
				bind:this={paraEls[i]}
				class="text-reveal font-cinematic absolute max-w-3xl text-[8vw] leading-[1.15] font-bold sm:text-[46px]"
				style="--reveal-color: var(--color-cream); --reveal-dim: rgba(246,247,243,0.22);"
			>
				{paragraph}
			</p>
		{/each}

		<div bind:this={finalEl} class="absolute px-4 text-center">
			<h2 class="font-cinematic text-[13vw] leading-[0.92] font-extrabold tracking-tight text-cream uppercase sm:text-[88px]">
				{#each finalLines as line, i (i)}
					<span class="block">{line}</span>
				{/each}
			</h2>
		</div>
	</div>
</section>
