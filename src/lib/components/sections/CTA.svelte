<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from '../layout/Container.svelte';
	import Button from '../ui/Button.svelte';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import Phone from 'lucide-svelte/icons/phone';

	interface Props {
		supertext?: string;
		eyebrow?: string;
		title: Snippet;
		sub: string;
		primaryLabel?: string;
		primaryHref?: string;
		phone?: string;
		phoneHref?: string;
	}

	let {
		supertext = 'SAFE & COMPLIANT',
		eyebrow = 'Ready to Start',
		title,
		sub,
		primaryLabel = 'Request a Quote',
		primaryHref = '/contact',
		phone = '(08) 9000 0000',
		phoneHref = 'tel:+61890000000'
	}: Props = $props();
</script>

<section class="relative overflow-hidden py-[var(--section-pad,clamp(80px,10vw,140px))] text-center" style="background:linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 45%, #7a3205 100%);">
	<div
		class="pointer-events-none absolute inset-0"
		style="background-image:url(&quot;data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v64H8zM0 8v1h64H8z' fill='%23fff' fill-opacity='0.04'/%3E%3C/svg%3E&quot;);"
	></div>
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
		<span class="font-display text-[clamp(120px,20vw,260px)] whitespace-nowrap text-white opacity-5 tracking-[10px]">{supertext}</span>
	</div>

	<Container class="relative z-2">
		<div data-reveal="up">
			<div class="font-condensed mb-4.5 inline-flex items-center justify-center gap-3 text-[13px] font-bold tracking-[4px] text-white/80 uppercase">
				<span class="h-0.5 w-7 bg-white/50"></span>
				{eyebrow}
			</div>
			<h2 class="font-display mb-5.5 text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-[2px] text-white">
				{@render title()}
			</h2>
			<p class="mx-auto mb-12 max-w-[520px] text-[clamp(15px,1.6vw,19px)] text-white/85">{sub}</p>
			<div class="flex flex-wrap justify-center gap-4">
				<Button variant="white" href={primaryHref}><ClipboardList size={17} strokeWidth={2} /> {primaryLabel}</Button>
				<Button variant="outline-white" href={phoneHref}><Phone size={17} strokeWidth={2} /> {phone}</Button>
			</div>
		</div>
	</Container>
</section>
