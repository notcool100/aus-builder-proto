<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';

	let dotEl: HTMLDivElement = $state()!;
	let ringEl: HTMLDivElement = $state()!;
	let active = $state(false);

	onMount(() => {
		if (!browser) return;
		const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (!isFinePointer) return;

		active = true;
		document.body.style.cursor = 'none';

		gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

		const setDotX = gsap.quickTo(dotEl, 'x', { duration: 0.1, ease: 'power3.out' });
		const setDotY = gsap.quickTo(dotEl, 'y', { duration: 0.1, ease: 'power3.out' });
		const setRingX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' });
		const setRingY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' });

		function onMove(e: MouseEvent) {
			setDotX(e.clientX);
			setDotY(e.clientY);
			setRingX(e.clientX);
			setRingY(e.clientY);
		}

		function onOver(e: MouseEvent) {
			if ((e.target as HTMLElement)?.closest?.('a, button, [data-cursor-hover]')) {
				gsap.to(dotEl, { scale: 0, duration: 0.25, ease: 'power2.out' });
				gsap.to(ringEl, { scale: 1.9, backgroundColor: 'rgba(244,124,32,0.12)', duration: 0.35, ease: 'power2.out' });
			}
		}
		function onOut(e: MouseEvent) {
			if ((e.target as HTMLElement)?.closest?.('a, button, [data-cursor-hover]')) {
				gsap.to(dotEl, { scale: 1, duration: 0.25, ease: 'power2.out' });
				gsap.to(ringEl, { scale: 1, backgroundColor: 'rgba(244,124,32,0)', duration: 0.35, ease: 'power2.out' });
			}
		}

		window.addEventListener('mousemove', onMove);
		document.addEventListener('mouseover', onOver);
		document.addEventListener('mouseout', onOut);

		return () => {
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseover', onOver);
			document.removeEventListener('mouseout', onOut);
			document.body.style.cursor = '';
		};
	});
</script>

<div
	bind:this={dotEl}
	class={`pointer-events-none fixed top-0 left-0 z-9999 h-2.5 w-2.5 rounded-full bg-orange transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'}`}
></div>
<div
	bind:this={ringEl}
	class={`pointer-events-none fixed top-0 left-0 z-9998 h-9 w-9 rounded-full border border-orange/50 transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'}`}
></div>
