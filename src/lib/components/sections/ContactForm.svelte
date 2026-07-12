<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import Button from '../ui/Button.svelte';
	import { initStaggerReveal } from '$lib/animations/parallax';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Phone from 'lucide-svelte/icons/phone';
	import Mail from 'lucide-svelte/icons/mail';
	import Clock from 'lucide-svelte/icons/clock';
	import Siren from 'lucide-svelte/icons/siren';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import Lock from 'lucide-svelte/icons/lock';

	const contactCards = [
		{ icon: MapPin, label: 'Perth Office', value: '123 Industrial Avenue, Welshpool WA 6106' },
		{ icon: MapPin, label: 'Karratha Office', value: '45 Balmoral Road, Karratha WA 6714' },
		{ icon: Phone, label: 'Phone', value: '(08) 9000 0000' },
		{ icon: Mail, label: 'Email', value: 'info@aarcoenvironmental.com.au' },
		{ icon: Clock, label: 'Office Hours', value: 'Mon–Fri 7:00am – 5:30pm AWST' }
	];

	const services = [
		'Asbestos Removal — Residential',
		'Asbestos Removal — Commercial',
		'Asbestos Removal — Industrial',
		'Demolition / Deconstruction',
		'Hazardous Material Management',
		'Compliance Consulting / AMP',
		'Environmental Remediation',
		'Emergency Response',
		'Other / Not Sure'
	];

	let submitted = $state(false);
	let submitting = $state(false);
	let cardsEl: HTMLElement = $state()!;
	let successEl: HTMLElement = $state()!;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitting = true;
		setTimeout(() => {
			submitting = false;
			submitted = true;
			setTimeout(() => (submitted = false), 4000);
		}, 600);
	}

	onMount(() => {
		if (!browser) return;
		return initStaggerReveal(cardsEl, '.contact-card', { stagger: 0.08 });
	});

	$effect(() => {
		if (submitted && successEl && browser) {
			gsap.fromTo(
				successEl,
				{ scale: 0.85, opacity: 0, y: 12 },
				{ scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)' }
			);
		}
	});
</script>

<section class="bg-[#050810] py-[var(--section-pad,clamp(80px,10vw,140px))]" id="contact">
	<Container>
		<div class="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
			<div data-reveal="left">
				<Heading
					eyebrow="Get In Touch"
					sub="Standard enquiries receive a response within 4 business hours. Emergency line available 24/7."
				>
					{#snippet title()}
						We're Ready<br />When <span class="text-orange">You Are</span>
					{/snippet}
				</Heading>

				<div bind:this={cardsEl} class="mt-9.5 flex flex-col gap-3.5">
					{#each contactCards as card (card.label)}
						<div
							class="contact-card flex items-start gap-4.5 rounded-xl border border-white/7 bg-white/2.5 px-6 py-5.5 transition-all duration-300 hover:border-orange/30 hover:bg-orange/4"
						>
							<div class="mt-0.5 shrink-0 text-orange">
								<card.icon size={20} strokeWidth={1.75} />
							</div>
							<div>
								<div class="font-condensed mb-1 text-[10px] font-bold tracking-[2.5px] text-orange uppercase">{card.label}</div>
								<div class="text-[15px] font-medium leading-normal">{card.value}</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-7 flex items-center gap-4 rounded-xl border border-orange/30 bg-orange/10 px-5.5 py-5">
					<div class="animate-alert-pulse shrink-0 text-orange">
						<Siren size={26} strokeWidth={1.75} />
					</div>
					<div>
						<div class="font-condensed mb-0.5 text-[15px] font-bold text-orange">24/7 Emergency Asbestos Response</div>
						<div class="text-[13px] text-grey-1">
							Call our emergency line anytime: <strong>(08) 9000 9999</strong> — we mobilise within hours.
						</div>
					</div>
				</div>
			</div>

			<div data-reveal="right">
				<div class="font-condensed mb-7 text-[26px] font-bold tracking-[0.5px]">Request a Free Quote</div>

				{#if submitted}
					<div bind:this={successEl} class="rounded-xl border border-success/40 bg-success/10 px-6 py-8 text-center">
						<div class="mb-2 flex justify-center text-success">
							<CircleCheckBig size={30} strokeWidth={1.75} />
						</div>
						<p class="font-semibold text-white">Enquiry sent! We'll respond within 4 business hours.</p>
					</div>
				{:else}
					<form class="flex flex-col gap-3.5" onsubmit={handleSubmit}>
						<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">First Name *</span>
								<input
									required
									type="text"
									placeholder="John"
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								/>
							</label>
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Last Name *</span>
								<input
									required
									type="text"
									placeholder="Smith"
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								/>
							</label>
						</div>

						<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Email Address *</span>
								<input
									required
									type="email"
									placeholder="john@company.com.au"
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								/>
							</label>
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Phone Number *</span>
								<input
									required
									type="tel"
									placeholder="0400 000 000"
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								/>
							</label>
						</div>

						<label class="block">
							<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Company / Organisation</span>
							<input
								type="text"
								placeholder="ABC Construction Pty Ltd"
								class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
							/>
						</label>

						<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Service Required *</span>
								<select
									required
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								>
									<option value="">Select a service...</option>
									{#each services as service (service)}
										<option>{service}</option>
									{/each}
								</select>
							</label>
							<label class="block">
								<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Location / Site Address</span>
								<input
									type="text"
									placeholder="Perth, Karratha or suburb..."
									class="w-full rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
								/>
							</label>
						</div>

						<label class="block">
							<span class="font-condensed mb-2 block text-[10.5px] font-bold tracking-[2.5px] text-grey-2 uppercase">Project Details *</span>
							<textarea
								required
								placeholder="Tell us about your project — site type, approximate area, timeline, any known materials, urgency level..."
								class="min-h-[130px] w-full resize-y rounded-[9px] border border-white/10 bg-white/4 px-4.5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-grey-3 focus:border-orange focus:bg-orange/5 focus:shadow-[0_0_0_3px_rgba(244,124,32,0.12)]"
							></textarea>
						</label>

						<Button type="submit" variant="primary" class="mt-1 w-full justify-center">
							{#if submitting}
								Sending...
							{:else}
								Send Enquiry
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
									><path
										d="M3 8h10M9 4l4 4-4 4"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
							{/if}
						</Button>
						<div class="flex items-center justify-center gap-1.5 text-center text-xs text-grey-2">
							<Lock size={13} strokeWidth={2} class="shrink-0" />
							Your information is kept strictly confidential and never shared. Responses within 4 business hours.
						</div>
					</form>
				{/if}
			</div>
		</div>
	</Container>
</section>
