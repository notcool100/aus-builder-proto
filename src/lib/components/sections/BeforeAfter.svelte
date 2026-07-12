<script lang="ts">
	import Container from '../layout/Container.svelte';
	import Heading from '../ui/Heading.svelte';

	const points = [
		{
			title: 'Comprehensive Air Quality Testing',
			desc: 'Post-removal air monitoring to AS/NZS 3000 standards with independent laboratory analysis and full clearance report.'
		},
		{
			title: 'Independent Clearance Certification',
			desc: "Third-party licensed assessor clearance inspection — satisfying all WorkSafe WA requirements for site reinstatement."
		},
		{
			title: 'Complete Waste Manifest Documentation',
			desc: 'Full chain-of-custody waste tracking from removal to licensed landfill disposal — EPA traceable and legally compliant.'
		}
	];

	const beforeImg = 'https://images.pexels.com/photos/10202856/pexels-photo-10202856.jpeg?cs=srgb&fm=jpg';
	const afterImg = 'https://images.unsplash.com/photo-1765005530997-3c4096d4f90a?auto=format&fit=crop&fm=jpg&q=60&w=1200';

	let sliderEl: HTMLDivElement;
	let pct = $state(50);
	let dragging = false;

	function setFromClientX(clientX: number) {
		const rect = sliderEl.getBoundingClientRect();
		const raw = ((clientX - rect.left) / rect.width) * 100;
		pct = Math.max(3, Math.min(97, raw));
	}

	function startDrag(e: PointerEvent) {
		dragging = true;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		setFromClientX(e.clientX);
	}
	function moveDrag(e: PointerEvent) {
		if (!dragging) return;
		setFromClientX(e.clientX);
	}
	function endDrag() {
		dragging = false;
	}
</script>

<section class="bg-navy py-[var(--section-pad,clamp(80px,10vw,140px))]">
	<Container>
		<div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
			<div data-reveal="left">
				<Heading
					eyebrow="Results Speak"
					sub="Our meticulous process delivers sites that aren't just clean — they're certified, documented, and ready for the next chapter. Drag the slider to reveal the difference."
				>
					{#snippet title()}
						See the<br /><span class="text-orange">Transformation</span>
					{/snippet}
				</Heading>

				<div class="mt-9.5 flex flex-col gap-4">
					{#each points as point (point.title)}
						<div
							class="flex items-start gap-3.5 rounded-[10px] border border-line bg-surface px-5 py-4.5 transition-all duration-300 hover:translate-x-1.5 hover:border-orange/30 hover:bg-orange/4"
						>
							<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange"></div>
							<div class="text-sm leading-[1.65] text-grey-1">
								<strong class="mb-1 block text-[15px] text-ink">{point.title}</strong>
								{point.desc}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div data-reveal="right">
				<div
					bind:this={sliderEl}
					class="relative h-[460px] touch-none overflow-hidden rounded-[18px] border border-line shadow-[0_24px_64px_rgba(29,30,24,0.18)] select-none"
					style="cursor: ew-resize;"
					onpointerdown={startDrag}
					onpointermove={moveDrag}
					onpointerup={endDrag}
					role="slider"
					aria-label="Before and after comparison slider"
					aria-valuenow={Math.round(pct)}
					aria-valuemin={0}
					aria-valuemax={100}
					tabindex="0"
				>
					<div class="absolute inset-0 bg-cover bg-center" style={`background-image:url(${beforeImg});`}>
						<div
							class="font-condensed absolute bottom-4.5 left-4.5 z-12 rounded-[5px] bg-black/70 px-4 py-1.5 text-[11px] font-bold tracking-[2.5px] text-white uppercase backdrop-blur-md"
						>
							BEFORE
						</div>
					</div>
					<div
						class="absolute inset-0 bg-cover bg-center"
						style={`background-image:url(${afterImg}); clip-path: inset(0 ${100 - pct}% 0 0);`}
					>
						<div
							class="font-condensed absolute right-4.5 bottom-4.5 z-12 rounded-[5px] bg-black/70 px-4 py-1.5 text-[11px] font-bold tracking-[2.5px] text-white uppercase backdrop-blur-md"
						>
							AFTER
						</div>
					</div>
					<div
						class="pointer-events-none absolute top-0 bottom-0 z-10 w-[2.5px] -translate-x-1/2 bg-white"
						style={`left:${pct}%;`}
					></div>
					<div
						class="absolute top-1/2 z-11 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_24px_rgba(0,0,0,0.35),0_0_0_4px_rgba(255,255,255,0.25)] transition-transform hover:scale-110"
						style={`left:${pct}%;`}
					>
						⟺
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
