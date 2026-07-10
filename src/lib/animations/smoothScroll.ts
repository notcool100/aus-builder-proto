import { browser } from '$app/environment';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | undefined;

/**
 * Momentum smooth-scroll for the whole app (matches the reference site's own stack).
 * Drives GSAP's ticker so ScrollTrigger-pinned sections (video scrub, phase stepper)
 * stay perfectly in sync with the eased scroll position instead of raw wheel deltas.
 * Singleton — safe to call once from the root layout; a second call is a no-op.
 */
export function initSmoothScroll() {
	if (!browser || lenis) return () => {};

	lenis = new Lenis({
		duration: 1.05,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 1
	});

	lenis.on('scroll', ScrollTrigger.update);

	const tick = (time: number) => {
		lenis?.raf(time * 1000);
	};
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		lenis?.destroy();
		lenis = undefined;
	};
}

export function getLenis() {
	return lenis;
}
