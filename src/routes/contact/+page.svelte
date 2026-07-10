<script lang="ts">
	import HeroParallax from '$lib/components/sections/HeroParallax.svelte';
	import ContactForm from '$lib/components/sections/ContactForm.svelte';
</script>

<HeroParallax
	compact
	eyebrow="Get In Touch"
	lines={[{ text: "We're Ready" }, { text: 'When You Are', accent: true }]}
	sub="Standard enquiries receive a response within 4 business hours. Emergency line available 24/7, anywhere in Western Australia."
/>

<ContactForm />
