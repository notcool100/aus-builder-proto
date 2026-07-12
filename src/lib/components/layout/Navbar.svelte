<script lang="ts">
	import { page } from '$app/state';
	import Button from '../ui/Button.svelte';
	import { magnetic } from '$lib/animations/magnetic';

	let menuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	function closeMenu() {
		menuOpen = false;
	}

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<header class="fixed inset-x-0 top-0 z-[800] flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
	<a
		href="/"
		onclick={closeMenu}
		class="flex items-center gap-3 rounded-full border border-ink/8 bg-cream/90 py-2 pr-5 pl-2.5 no-underline shadow-[0_8px_30px_rgba(30,23,32,0.12)] backdrop-blur-md"
	>
		<img src="/logo.svg" alt="Summit Industrial Services logo" class="h-8 w-auto object-contain" />
		<span class="font-cinematic hidden text-[13px] font-bold tracking-[0.2px] text-ink sm:inline">
			Summit Industrial
		</span>
	</a>

	<button
		onclick={() => (menuOpen = !menuOpen)}
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		use:magnetic
		class="font-cinematic flex items-center gap-3 rounded-full bg-cream py-2 pr-2.5 pl-5 text-[13px] font-bold text-ink shadow-[0_8px_30px_rgba(30,23,32,0.16)] transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
	>
		{menuOpen ? 'Close' : 'Menu'}
		<span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream">
			{#if menuOpen}
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none"
					><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg
				>
			{:else}
				<svg width="14" height="10" viewBox="0 0 14 10" fill="none"
					><path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg
				>
			{/if}
		</span>
	</button>
</header>

<div
	class={`fixed inset-0 z-[790] flex flex-col items-center justify-center gap-6 bg-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
		menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
	}`}
>
	{#each navLinks as link, i (link.href)}
		<a
			href={link.href}
			onclick={closeMenu}
			style={`transition-delay:${menuOpen ? i * 60 : 0}ms`}
			class={`font-cinematic text-[15vw] leading-none font-extrabold tracking-tight text-cream no-underline transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[64px] ${
				menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
			} ${isActive(link.href) ? 'text-orange' : 'hover:text-orange'}`}
		>
			{link.label}
		</a>
	{/each}
	<div class="mt-4">
		<Button href="/contact" variant="primary" onclick={closeMenu}>
			Get a Quote
			<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
				><path
					d="M3 8h10M9 4l4 4-4 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
		</Button>
	</div>
</div>
