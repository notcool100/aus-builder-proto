<script lang="ts">
	import HeroParallax from '$lib/components/sections/HeroParallax.svelte';
	import ScrollVideoStory from '$lib/components/sections/ScrollVideoStory.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Credentials from '$lib/components/sections/Credentials.svelte';
	import WhyUs from '$lib/components/sections/WhyUs.svelte';
	import Locations from '$lib/components/sections/Locations.svelte';
	import CTA from '$lib/components/sections/CTA.svelte';
	import { videos } from '$lib/data/phases';

	const team = [
		{ initials: 'DD', title: 'Director' },
		{ initials: 'SM', title: 'Operations Manager' },
		{ initials: 'TW', title: 'Senior HSE Officer' },
		{ initials: 'JK', title: 'Project Manager' },
		{ initials: 'RB', title: 'Site Supervisor' },
		{ initials: '+12', title: 'Environmental Consultants' }
	];

	const paragraphs = [
		'Summit Industrial Services was founded on a simple belief: that every worker, family, and community deserves to live and work in environments free from hazardous risk. Born in Western Australia, we bring together deep technical expertise with an authentic commitment to the land and its people.',
		"As an Indigenous-owned business, we carry a proud connection to Country and a responsibility to protect it — today, and for generations to come. That's not marketing language. It's who we are."
	];
</script>

<HeroParallax
	compact
	eyebrow="About Summit"
	lines={[{ text: 'Family-Run.' }, { text: 'Indigenous-Owned.' }, { text: 'Community First.', accent: true }]}
	sub="Fifteen years of protecting Western Australian communities, backed by an unwavering commitment to safety, compliance, and Country."
/>

<ScrollVideoStory
	videoSrc={videos.teamOnSite}
	paragraphs={[
		'Founded in Western Australia, on the belief that every worker deserves a site free from hazardous risk.',
		'Proudly Indigenous-owned, we carry a responsibility to protect Country — today, and for generations to come.'
	]}
	finalLines={['Family-Run.', 'Community First.']}
/>

<About {paragraphs} {team} background="navy" />

<Credentials />

<WhyUs />

<Locations />

<CTA
	sub="Get your free, no-obligation assessment and quote within 24 hours. Our licensed team is ready to visit your site, anywhere in WA."
>
	{#snippet title()}
		Ready to Work<br />With Summit?
	{/snippet}
</CTA>
