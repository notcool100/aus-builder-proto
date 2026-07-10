<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Cursor from '$lib/components/ui/Cursor.svelte';
	import { initScrollReveal } from '$lib/animations/parallax';
	import { initSmoothScroll } from '$lib/animations/smoothScroll';

	let { children } = $props();

	let loading = $state(true);
	let mainEl: HTMLElement;

	onMount(() => {
		if (!browser) return;
		const timer = setTimeout(() => (loading = false), 1400);
		const cleanupScroll = initSmoothScroll();
		return () => {
			clearTimeout(timer);
			cleanupScroll();
		};
	});

	function runReveal() {
		if (!browser || !mainEl) return;
		const cleanup = initScrollReveal(mainEl);
		return cleanup;
	}

	onMount(() => runReveal());
	afterNavigate(() => {
		requestAnimationFrame(() => runReveal());
	});

	const seo = $derived(page.data.seo);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		{#if seo.keywords}
			<meta name="keywords" content={seo.keywords} />
		{/if}
		<link rel="canonical" href={seo.url} />
		<meta property="og:type" content={seo.type} />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:url" content={seo.url} />
		<meta property="og:image" content={seo.image} />
		<meta property="og:site_name" content="Summit Industrial Services" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={seo.title} />
		<meta name="twitter:description" content={seo.description} />
		<meta name="twitter:image" content={seo.image} />
	{/if}
</svelte:head>

{#if loading}
	<div
		class="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-6 bg-navy transition-opacity duration-600"
	>
		<div class="flex h-35 items-center justify-center">
			<img
				src="/logo.svg"
				alt="Summit Industrial Services logo"
				class="h-30 w-auto animate-pulse object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.5)]"
			/>
		</div>
		<div class="h-0.5 w-50 overflow-hidden rounded-full bg-white/8">
			<div class="h-full w-full origin-left animate-[fillbar_1.4s_ease-out_forwards] rounded-full bg-gradient-to-r from-orange to-gold"></div>
		</div>
		<div class="font-condensed text-[11px] tracking-[4px] text-grey-2 uppercase">Initialising Site Safety Systems...</div>
	</div>
{/if}

<Cursor />

<Navbar />

<main bind:this={mainEl}>
	{@render children()}
</main>

<Footer />

<a
	href="/contact"
	class="animate-pill-pulse fixed right-7 bottom-8 z-[700] flex items-center gap-2.5 rounded-full px-6.5 py-3.5 font-body text-[12.5px] font-bold tracking-[1px] text-white uppercase no-underline transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-106"
	style="background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));"
>
	<span class="animate-dot-blink h-2 w-2 rounded-full bg-white"></span>
	Get Free Quote
</a>

<style>
	@keyframes fillbar {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
</style>
