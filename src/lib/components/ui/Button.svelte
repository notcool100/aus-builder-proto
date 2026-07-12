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
		'inline-flex items-center justify-center gap-2.5 rounded-[3px] font-body text-[13.5px] font-bold tracking-[1.2px] uppercase cursor-pointer transition-[background,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] px-9 py-4';

	const variants: Record<Variant, string> = {
		primary: 'bg-accent text-cream shadow-[0_4px_16px_rgba(29,30,24,0.12)] hover:bg-accent-dark',
		ghost: 'bg-transparent text-ink border-[1.5px] border-ink/25 hover:border-accent hover:text-accent py-[15px]',
		white: 'bg-cream text-accent-dark border border-line shadow-[0_4px_16px_rgba(29,30,24,0.1)] hover:shadow-[0_10px_28px_rgba(29,30,24,0.16)]',
		'outline-white': 'bg-transparent text-cream border-2 border-cream/50 hover:bg-cream/15 hover:border-cream py-3.5'
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
