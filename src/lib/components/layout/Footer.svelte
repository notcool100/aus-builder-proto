<script lang="ts">
	import Container from './Container.svelte';

	const serviceLinks = [
		'Asbestos Removal Perth',
		'Asbestos Removal Karratha',
		'Demolition Services',
		'Hazmat Management',
		'Compliance Consulting',
		'Soil Remediation',
		'Emergency Response'
	];

	const locationLinks = [
		'Perth Metropolitan',
		'Karratha & Pilbara',
		'Port Hedland',
		'Kimberley Region',
		'Goldfields',
		'Mid-West Region',
		'Great Southern'
	];

	const companyLinks = [
		{ label: 'About Summit', href: '/about' },
		{ label: 'Our Leadership Team', href: '/about' },
		{ label: 'Certifications & Licences', href: '/about' },
		{ label: 'Case Studies', href: '/services' },
		{ label: 'Careers', href: '/contact' },
		{ label: 'Indigenous Procurement', href: '/about' },
		{ label: 'Contact Us', href: '/contact' }
	];

	const certBadges = ['Class A', 'ISO 9001', 'WorkSafe', 'Supply Nation'];
	const socials = [
		{ label: 'LinkedIn', short: 'in' },
		{ label: 'Facebook', short: 'f' },
		{ label: 'Instagram', short: 'ig' }
	];

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/6 bg-[#020408] pt-22">
	<Container>
		<div class="grid grid-cols-1 gap-10 pb-15 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1.2fr] lg:gap-15">
			<div>
				<a href="/" class="mb-5.5 flex items-center gap-4 no-underline">
					<img src="/logo.svg" alt="Summit Industrial Services logo" class="h-13 w-auto object-contain" />
					<div class="flex flex-col leading-tight">
						<span class="font-display text-[22px] tracking-[3px]">Summit</span>
						<span class="font-condensed text-[9.5px] font-semibold tracking-[3px] text-orange uppercase">
							Industrial Services
						</span>
					</div>
				</a>
				<p class="mb-7 max-w-[290px] text-sm leading-[1.75] text-grey-2">
					Western Australia's trusted Class A licensed asbestos removal, demolition, and environmental services
					company. Protecting community and country since 2009. Proudly Indigenous-owned.
				</p>
				<div class="flex gap-2.5">
					{#each socials as social (social.label)}
						<button
							title={social.label}
							class="flex h-10 w-10 items-center justify-center rounded-[9px] border border-white/10 text-[15px] text-white transition-all duration-300 hover:-translate-y-1 hover:border-orange hover:bg-orange/10"
						>
							{social.short}
						</button>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="font-condensed mb-5.5 text-[11px] font-bold tracking-[3px] text-grey-2 uppercase">Services</h4>
				<ul class="list-none">
					{#each serviceLinks as link (link)}
						<li class="mb-3.5">
							<a
								href="/services"
								class="block text-sm text-white/55 no-underline transition-all duration-300 hover:pl-1.5 hover:text-orange"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-condensed mb-5.5 text-[11px] font-bold tracking-[3px] text-grey-2 uppercase">Locations</h4>
				<ul class="list-none">
					{#each locationLinks as link (link)}
						<li class="mb-3.5">
							<a
								href="/about"
								class="block text-sm text-white/55 no-underline transition-all duration-300 hover:pl-1.5 hover:text-orange"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-condensed mb-5.5 text-[11px] font-bold tracking-[3px] text-grey-2 uppercase">Company</h4>
				<ul class="list-none">
					{#each companyLinks as link (link.label)}
						<li class="mb-3.5">
							<a
								href={link.href}
								class="block text-sm text-white/55 no-underline transition-all duration-300 hover:pl-1.5 hover:text-orange"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<h4 class="font-condensed mb-3 text-[11px] font-bold tracking-[3px] text-grey-2 uppercase">
						Certifications
					</h4>
					<div class="flex flex-wrap gap-2">
						{#each certBadges as badge (badge)}
							<div
								class="font-condensed rounded-[4px] border border-orange/25 bg-orange/10 px-3 py-1 text-[10px] font-bold tracking-[2px] text-orange uppercase"
							>
								{badge}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center gap-4 border-t border-white/6 py-6.5 sm:flex-row sm:justify-between">
			<div class="text-[12.5px] text-grey-3">
				© {year} Summit Industrial Services Pty Ltd. ABN 00 000 000 000. All rights reserved.
			</div>
			<div class="flex gap-6.5">
				<a href="/" class="text-[12.5px] text-grey-3 no-underline transition-colors hover:text-orange">Privacy Policy</a>
				<a href="/" class="text-[12.5px] text-grey-3 no-underline transition-colors hover:text-orange">Terms of Service</a>
				<a href="/" class="text-[12.5px] text-grey-3 no-underline transition-colors hover:text-orange">Safety Policy</a>
				<a href="/" class="text-[12.5px] text-grey-3 no-underline transition-colors hover:text-orange"
					>Environmental Policy</a
				>
			</div>
		</div>
	</Container>
</footer>
