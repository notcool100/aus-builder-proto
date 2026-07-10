<script lang="ts">
	import type { Snippet } from 'svelte';
	import { magnetic } from '$lib/animations/magnetic';

	type Variant = 'primary' | 'ghost' | 'white' | 'outline-white';

	interface Props {
		variant?: Variant;
		href?: string;
		type?: 'button' | 'submit';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let { variant = 'primary', href, type = 'button', class: className = '', onclick, children }: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2.5 rounded-lg font-body text-[13.5px] font-bold tracking-[1.2px] uppercase cursor-pointer transition-[background,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] px-9 py-4';

	const variants: Record<Variant, string> = {
		primary:
			'bg-gradient-to-br from-orange to-orange-dark text-white shadow-[0_6px_28px_rgba(244,124,32,0.38)] hover:shadow-[0_14px_50px_rgba(244,124,32,0.55)]',
		ghost: 'bg-transparent text-white border-[1.5px] border-white/28 hover:border-orange hover:bg-orange/10 py-[15px]',
		white: 'bg-white text-orange-dark shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.35)]',
		'outline-white': 'bg-transparent text-white border-2 border-white/50 hover:bg-white/15 hover:border-white py-3.5'
	};

	const classes = $derived(`${base} ${variants[variant]} ${className}`);
</script>

{#if href}
	<a {href} class={classes} use:magnetic>
		{@render children()}
	</a>
{:else}
	<button {type} class={classes} {onclick} use:magnetic>
		{@render children()}
	</button>
{/if}
