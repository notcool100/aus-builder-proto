import { browser } from '$app/environment';
import { gsap } from 'gsap';

/**
 * Svelte action: pulls `node` gently toward the pointer while it's inside the element's
 * bounds (the "magnetic button" effect), then eases back to rest on leave.
 * Usage: <button use:magnetic>
 */
export function magnetic(node: HTMLElement, strength = 0.35) {
	if (!browser) return {};
	if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return {};

	const setX = gsap.quickTo(node, 'x', { duration: 0.45, ease: 'power3.out' });
	const setY = gsap.quickTo(node, 'y', { duration: 0.45, ease: 'power3.out' });

	function onMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const relX = e.clientX - (rect.left + rect.width / 2);
		const relY = e.clientY - (rect.top + rect.height / 2);
		setX(relX * strength);
		setY(relY * strength);
	}

	function onLeave() {
		setX(0);
		setY(0);
	}

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
		}
	};
}
