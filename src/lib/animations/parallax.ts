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
	/**
	 * GSAP scrub value. `true` locks the animation 1:1 to scroll position (instant, can feel
	 * mechanical). A number adds that many seconds of easing lag as scroll catches up, which
	 * reads as smoother/more cinematic. Defaults to a gentle 0.7s smoothing.
	 */
	scrub?: number | boolean;
	/** Total horizontal drift in px across the trigger's scroll range, for a more three-dimensional, diagonal float instead of a flat vertical slide. */
	x?: number;
	/** Total rotation drift in degrees across the scroll range — a faint tilt that reads as depth rather than a rigid straight-line move. */
	rotate?: number;
	/** Scale at the top of the trigger's range (element enters larger/smaller and eases to 1 as it centers) — the "reveal" effect used on photography. */
	scaleFrom?: number;
	/** Scale at the bottom of the range. Defaults to 1 when `scaleFrom` is set. */
	scaleTo?: number;
}

/**
 * Moves `element` through scroll using transform only (translate/scale/rotate — never
 * top/left) so the browser composites on the GPU. Beyond a plain vertical slide, layers in
 * scale, x-drift and rotation are opt-in per call so a call site can dial in anything from a
 * subtle background nudge to a full cinematic depth-of-field reveal on a hero photo.
 */
export function initParallax(element: Element | null | undefined, speedOrOptions: number | ParallaxOptions = 0.3) {
	if (!browser || !element) return () => {};

	const options: ParallaxOptions =
		typeof speedOrOptions === 'number' ? { speed: speedOrOptions } : speedOrOptions;
	const {
		speed = 0.3,
		direction = 'up',
		trigger = element,
		scrub = 0.7,
		x = 0,
		rotate = 0,
		scaleFrom,
		scaleTo = 1
	} = options;

	gsap.set(element, { willChange: 'transform' });

	const distance = 260 * speed * (direction === 'up' ? -1 : 1);

	const fromVars: gsap.TweenVars = { y: -distance / 2 };
	const toVars: gsap.TweenVars = {
		y: distance / 2,
		ease: 'none',
		scrollTrigger: {
			trigger,
			start: 'top bottom',
			end: 'bottom top',
			scrub
		}
	};

	if (x) {
		fromVars.x = -x / 2;
		toVars.x = x / 2;
	}
	if (rotate) {
		fromVars.rotate = -rotate / 2;
		toVars.rotate = rotate / 2;
	}
	if (scaleFrom !== undefined) {
		fromVars.scale = scaleFrom;
		toVars.scale = scaleTo;
	}

	const tween = gsap.fromTo(element, fromVars, toVars);

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
	layers: Array<{
		element: Element | null | undefined;
		speed: number;
		direction?: ParallaxDirection;
		x?: number;
		rotate?: number;
		scaleFrom?: number;
		scaleTo?: number;
	}>,
	trigger?: Element | string
) {
	if (!browser) return () => {};
	const cleanups = layers.map(({ element, speed, direction, x, rotate, scaleFrom, scaleTo }) =>
		initParallax(element, { speed, direction, trigger, x, rotate, scaleFrom, scaleTo })
	);
	return () => cleanups.forEach((fn) => fn());
}

/**
 * The "waterfall" gallery effect (see e.g. the-goonies.webflow.io): each item in a row/grid
 * drifts at a visibly *different* speed as the section scrolls through the viewport, so
 * columns fall out of lockstep and drift back into alignment instead of sliding as one flat
 * plane. Reads as a living gallery instead of a single boring uniform slide. Speeds cycle
 * through `speeds` by DOM order, so neighbouring items are deliberately mismatched.
 */
export function initGridParallax(
	container: Element | null | undefined,
	itemSelector: string,
	opts: {
		/** Cycled by item index so adjacent items never share a speed. Signed values reverse direction for extra desync. */
		speeds?: number[];
		scaleFrom?: number;
		scrub?: number | boolean;
	} = {}
) {
	if (!browser || !container) return () => {};
	const { speeds = [0.22, -0.32, 0.42, -0.18, 0.3, -0.4], scaleFrom, scrub } = opts;

	const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
	if (!items.length) return () => {};

	const cleanups = items.map((el, i) => {
		const raw = speeds[i % speeds.length];
		return initParallax(el, {
			speed: Math.abs(raw),
			direction: raw < 0 ? 'down' : 'up',
			trigger: container,
			scaleFrom,
			scrub
		});
	});

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
