<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';
	import { initParallax, initStaggerReveal } from '$lib/animations/parallax';

	interface TeamMember {
		initials: string;
		title: string;
	}

	interface Props {
		paragraphs: string[];
		team?: TeamMember[];
		background?: 'navy' | 'navy-2';
	}

	let { paragraphs, team = [], background = 'navy-2' }: Props = $props();

	const photos = [
		{
			label: 'Construction worker portrait',
			img: 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg',
			span: true
		},
		{
			label: 'Handshake between partners',
			img: 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1200'
		},
		{
			label: 'Outback landscape',
			img: 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1200'
		}
	];

	let photoEls: HTMLElement[] = [];
	let teamEl: HTMLElement = $state()!;

	onMount(() => {
		if (!browser) return;
		const cleanups = [
			...photoEls.map((el) => initParallax(el, { speed: 0.09 })),
			initStaggerReveal(teamEl, '.team-avatar', { stagger: 0.06 })
		];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

<section class={`py-[var(--section-pad,clamp(80px,10vw,140px))] ${background === 'navy' ? 'bg-navy' : 'bg-navy-2'}`} id="about">
	<Container>
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<div data-reveal="left" class="grid grid-cols-[1.1fr_1fr] grid-rows-2 gap-3">
				{#each photos as photo, i (photo.label)}
					<div
						class={`relative min-h-[200px] overflow-hidden rounded-xl bg-navy-3 ${photo.span ? 'row-span-2 min-h-[300px] lg:min-h-[412px]' : ''}`}
					>
						<div
							bind:this={photoEls[i]}
							role="img"
							aria-label={photo.label}
							class="will-change-transform absolute inset-x-0 -inset-y-[10%] bg-cover bg-center transition-[transform,filter] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:brightness-108"
							style={`background-image:url(${photo.img});`}
						></div>
					</div>
				{/each}
			</div>

			<div data-reveal="right">
				<Heading eyebrow="Our Story">
					{#snippet title()}
						Family-Run.<br />Indigenous-Owned.<br /><span class="text-orange">Community First.</span>
					{/snippet}
				</Heading>

				{#each paragraphs as paragraph, i (i)}
					<p class="mb-5 text-base leading-[1.8] text-grey-1 last:mb-7.5">{paragraph}</p>
				{/each}

				<div
					class="mt-8 inline-flex items-center gap-4 rounded-xl border border-orange/22 bg-orange/8 px-5.5 py-4 transition-colors duration-300 hover:border-orange/40 hover:bg-orange/14"
				>
					<div class="flex h-5.5 w-8.5 shrink-0 flex-col overflow-hidden rounded">
						<div class="flex-1 bg-[#111]"></div>
						<div class="relative z-1 -my-1.5 mx-auto h-2.5 w-2.5 rounded-full bg-[#f5c518]"></div>
						<div class="flex-1 bg-[#cc1200]"></div>
					</div>
					<div>
						<strong class="block text-sm font-bold text-orange">Proudly Indigenous-Owned</strong>
						<span class="text-xs text-grey-1">Supply Nation Certified | Supporting Closing the Gap</span>
					</div>
				</div>

				{#if team.length}
					<div class="font-condensed mt-10 mb-4 text-xs tracking-[3px] text-grey-2 uppercase">Leadership Team</div>
					<div bind:this={teamEl} class="flex flex-wrap gap-3.5">
						{#each team as member (member.initials)}
							<div
								title={member.title}
								class="team-avatar flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-2 border-white/10 text-[15px] font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-108 hover:border-orange"
								style="background:linear-gradient(135deg, var(--color-navy-4), var(--color-orange));"
							>
								{member.initials}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</Container>
</section>
