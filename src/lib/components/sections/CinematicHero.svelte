<script lang="ts">
	interface Props {
		lines: string[];
		sub: string;
	}

	let { lines, sub }: Props = $props();
</script>

<section class="relative flex h-[100svh] min-h-[640px] flex-col justify-between overflow-hidden bg-cream px-5 pt-[120px] pb-28 text-ink sm:px-8 sm:pt-[140px] sm:pb-16">
	<h1 class="font-cinematic text-[11vw] leading-[0.94] font-extrabold tracking-tight uppercase sm:text-[7vw]">
		{#each lines as line, i (i)}
			<span class="block">{line}</span>
		{/each}
	</h1>

	<div class="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
		<div class="flex items-center gap-3 text-ink/60">
			<span class="flex h-8 w-8 items-center justify-center rounded-full border border-ink/25">
				<svg width="10" height="14" viewBox="0 0 10 14" fill="none"
					><path
						d="M5 1v12M1 9l4 4 4-4"
						stroke="currentColor"
						stroke-width="1.3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</span>
			<span class="font-cinematic text-[13px] font-medium">Scroll to explore</span>
		</div>

		<p class="font-cinematic max-w-[380px] pb-2 text-[19px] leading-[1.5] font-medium sm:mr-30 sm:max-w-[400px] sm:text-right sm:text-[22px]">
			{sub}
		</p>
	</div>
</section>
