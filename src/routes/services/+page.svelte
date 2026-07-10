<script lang="ts">
	import HeroParallax from '$lib/components/sections/HeroParallax.svelte';
	import PhaseStepper from '$lib/components/sections/PhaseStepper.svelte';
	import Features from '$lib/components/sections/Features.svelte';
	import Process from '$lib/components/sections/Process.svelte';
	import BeforeAfter from '$lib/components/sections/BeforeAfter.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import CTA from '$lib/components/sections/CTA.svelte';
	import { services } from '$lib/data/services';
	import { servicePhases } from '$lib/data/phases';
</script>

<HeroParallax
	compact
	eyebrow="What We Do"
	lines={[{ text: 'Industry-Leading' }, { text: 'Environmental Services', accent: true }]}
	sub="Comprehensive hazardous material removal and demolition solutions delivered with precision, full regulatory compliance, and zero safety compromise."
/>

<PhaseStepper phases={servicePhases} badgeLabel="Service" />

<Features items={services} />

<Process />

<BeforeAfter />

<Projects />

<CTA
	sub="Get your free, no-obligation assessment and quote within 24 hours. Our licensed team is ready to visit your site, anywhere in WA."
>
	{#snippet title()}
		Have a Project<br />In Mind?
	{/snippet}
</CTA>
