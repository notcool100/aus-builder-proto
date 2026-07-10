<script lang="ts">
	import CinematicHero from '$lib/components/sections/CinematicHero.svelte';
	import ScrollVideoStory from '$lib/components/sections/ScrollVideoStory.svelte';
	import PhaseStepper from '$lib/components/sections/PhaseStepper.svelte';
	import Stats from '$lib/components/sections/Stats.svelte';
	import Features from '$lib/components/sections/Features.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import CTA from '$lib/components/sections/CTA.svelte';
	import { services } from '$lib/data/services';
	import { buildPhases, heroStoryVideo } from '$lib/data/phases';
</script>

<CinematicHero
	lines={['Safety Drives', 'Our Work.']}
	sub="We're protecting the tradespeople and communities that keep Western Australia building safely."
/>

<ScrollVideoStory
	videoSrc={heroStoryVideo}
	paragraphs={[
		'Class A licensed removal for every site with Summit — built to deliver safety, compliance, and total peace of mind.',
		'From first inspection to final clearance certificate, Summit protects every step of the way.'
	]}
	finalLines={['Start Your', 'Project With Us']}
/>

<PhaseStepper phases={buildPhases} />

<Stats />

<Features items={services.slice(0, 3)} viewAllHref="/services" viewAllLabel="View All Services" />

<Testimonials />

<CTA
	sub="Get your free, no-obligation assessment and quote within 24 hours. Our licensed team is ready to visit your site, anywhere in WA."
>
	{#snippet title()}
		Let's Make Your Site<br />Safe & Compliant
	{/snippet}
</CTA>
