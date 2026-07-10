import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (browser) {
	gsap.registerPlugin(ScrollTrigger);
}

export type ParallaxDirection = 'up' | 'down';

export interface ParallaxOptions {
	/** Relative movement strength. 0.1 = subtle, 0.6 = dramatic. */
	speed?: number;
	direction?: ParallaxDirection;
	/** Element (or selector) whose scroll progress drives the animation. Defaults to the target itself. */
	trigger?: Element | string;
	scrub?: number | boolean;
}

/**
 * Moves `element` along the Y axis as the page scrolls, using GSAP ScrollTrigger.
 * Uses transform: translateY exclusively (never top/left) so the browser can
 * composite the animation on the GPU without triggering layout.
 */
export function initParallax(element: Element | null | undefined, speedOrOptions: number | ParallaxOptions = 0.3) {
	if (!browser || !element) return () => {};

	const options: ParallaxOptions =
		typeof speedOrOptions === 'number' ? { speed: speedOrOptions } : speedOrOptions;
	const { speed = 0.3, direction = 'up', trigger = element, scrub = true } = options;

	gsap.set(element, { willChange: 'transform' });

	const distance = 220 * speed * (direction === 'up' ? -1 : 1);

	const tween = gsap.fromTo(
		element,
		{ y: -distance / 2 },
		{
			y: distance / 2,
			ease: 'none',
			scrollTrigger: {
				trigger,
				start: 'top bottom',
				end: 'bottom top',
				scrub
			}
		}
	);

	return () => {
		tween.scrollTrigger?.kill();
		tween.kill();
	};
}

/**
 * Applies staggered parallax speeds to a group of layers (e.g. a multi-depth
 * hero: background / midground / foreground) in one call.
 */
export function initParallaxLayers(
	layers: Array<{ element: Element | null | undefined; speed: number; direction?: ParallaxDirection }>,
	trigger?: Element | string
) {
	if (!browser) return () => {};
	const cleanups = layers.map(({ element, speed, direction }) =>
		initParallax(element, { speed, direction, trigger })
	);
	return () => cleanups.forEach((fn) => fn());
}

/**
 * Fades + rises a batch of elements into view as they cross the viewport.
 * Equivalent to the original site's IntersectionObserver `.reveal` classes,
 * reimplemented with GSAP for consistent easing with the rest of the animation system.
 */
export function initScrollReveal(container: Element | null | undefined) {
	if (!browser || !container) return () => {};

	const targets = container.querySelectorAll<HTMLElement>('[data-reveal]');
	const triggers: ScrollTrigger[] = [];

	targets.forEach((el) => {
		const type = el.dataset.reveal ?? 'up';
		const delay = Number(el.dataset.revealDelay ?? 0);
		const from: gsap.TweenVars =
			type === 'left'
				? { x: -44, opacity: 0 }
				: type === 'right'
					? { x: 44, opacity: 0 }
					: type === 'scale'
						? { scale: 0.93, opacity: 0 }
						: type === 'blur'
							? { scale: 1.06, opacity: 0, filter: 'blur(16px)' }
							: { y: 44, opacity: 0 };

		gsap.set(el, { willChange: 'transform, opacity, filter' });

		const tween = gsap.fromTo(el, from, {
			x: 0,
			y: 0,
			scale: 1,
			opacity: 1,
			filter: 'blur(0px)',
			duration: type === 'blur' ? 1.1 : 0.9,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: el,
				start: 'top 92%',
				once: true
			},
			// Release the inline transform once settled so any CSS `hover:` transform
			// utilities on this element (translate/scale) can take over again — GSAP's
			// inline style otherwise wins over the class and silently kills the hover effect.
			onComplete: () => gsap.set(el, { clearProps: 'transform,filter,opacity,willChange' })
		});

		if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
	});

	return () => triggers.forEach((t) => t.kill());
}

/**
 * Staggers a batch of child elements in as `container` enters the viewport — a richer,
 * cascading alternative to revealing a whole grid as one block. Use on card grids
 * (services, credentials, testimonials) for a more premium entrance.
 */
export function initStaggerReveal(
	container: Element | null | undefined,
	itemSelector: string,
	opts: { stagger?: number; start?: string } = {}
) {
	if (!browser || !container) return () => {};
	const { stagger = 0.09, start = 'top 88%' } = opts;

	const items = container.querySelectorAll<HTMLElement>(itemSelector);
	if (!items.length) return () => {};

	gsap.set(items, { willChange: 'transform, opacity, filter' });
	const tween = gsap.fromTo(
		items,
		{ y: 36, opacity: 0, filter: 'blur(6px)' },
		{
			y: 0,
			opacity: 1,
			filter: 'blur(0px)',
			duration: 0.8,
			stagger,
			ease: 'power3.out',
			scrollTrigger: { trigger: container, start, once: true },
			onComplete: () => gsap.set(items, { clearProps: 'transform,filter,opacity,willChange' })
		}
	);

	return () => tween.scrollTrigger?.kill();
}

/**
 * Animates a numeric counter from 0 to `target` once it enters the viewport.
 */
export function initCounter(element: Element | null | undefined, target: number, opts: { duration?: number; suffix?: string } = {}) {
	if (!browser || !element) return () => {};
	const { duration = 2, suffix = '' } = opts;

	const counter = { value: 0 };
	const tween = gsap.to(counter, {
		value: target,
		duration,
		ease: 'power4.out',
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			once: true
		},
		onUpdate: () => {
			element.textContent = `${Math.floor(counter.value)}${suffix}`;
		},
		onComplete: () => {
			element.textContent = `${target}${suffix}`;
		}
	});

	return () => tween.scrollTrigger?.kill();
}

/**
 * Binds a <video>'s playhead to scroll progress across `trigger` (scroll-scrubbed
 * video, the "flythrough" effect). Pins the trigger element for the duration so the
 * video appears to play frame-by-frame as the user scrolls, then releases.
 */
export function initVideoScrub(
	video: HTMLVideoElement | null | undefined,
	trigger: Element | string,
	opts: { pin?: boolean; start?: string; end?: string } = {}
) {
	if (!browser || !video) return () => {};
	const { pin = true, start = 'top top', end = '+=150%' } = opts;

	let st: ScrollTrigger | undefined;

	const create = () => {
		st = ScrollTrigger.create({
			trigger,
			start,
			end,
			pin,
			scrub: true,
			onUpdate: (self) => {
				if (video.duration && Number.isFinite(video.duration)) {
					video.currentTime = self.progress * video.duration;
				}
			}
		});
	};

	if (video.readyState >= 1) {
		create();
	} else {
		video.addEventListener('loadedmetadata', create, { once: true });
	}

	return () => st?.kill();
}

/**
 * Scroll-scrubbed "gradient wipe" text reveal: pairs with a `.text-reveal` element
 * (gradient-clipped text, see app.css) and sweeps the hard color boundary across the
 * text as it crosses the trigger's scroll range. Cheap (one CSS property) compared to
 * animating individual word spans.
 */
export function initTextReveal(
	element: Element | null | undefined,
	opts: { start?: string; end?: string; trigger?: Element | string } = {}
) {
	if (!browser || !element) return () => {};
	const { start = 'top 80%', end = 'bottom 45%', trigger = element } = opts;

	gsap.set(element, { backgroundPosition: '100% 0' });
	const tween = gsap.to(element, {
		backgroundPosition: '0% 0',
		ease: 'none',
		scrollTrigger: { trigger, start, end, scrub: true }
	});

	return () => tween.scrollTrigger?.kill();
}

/**
 * Pins `container` and reports which "step" (0-indexed) is active as the user scrolls
 * through it, driving multi-phase scrollytelling (e.g. a 5-phase build process) without
 * GSAP touching component DOM directly — it just reports progress, Svelte owns render state.
 */
export function initPinnedSteps(
	container: Element | null | undefined,
	opts: { steps: number; onChange: (index: number, progress: number) => void; scrollPerStep?: number }
) {
	if (!browser || !container) return () => {};
	const { steps, onChange, scrollPerStep = 1 } = opts;

	const st = ScrollTrigger.create({
		trigger: container,
		start: 'top top',
		end: () => `+=${window.innerHeight * (steps - 1) * scrollPerStep}`,
		pin: true,
		scrub: true,
		onUpdate: (self) => {
			const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
			onChange(idx, self.progress);
		}
	});

	return () => st.kill();
}
