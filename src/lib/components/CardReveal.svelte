<script lang="ts">
	export let title: string;
	export let id: string;
	export let description: string;

	// Function: Show and hide the description when the respective button is pressed
	let button: HTMLButtonElement | undefined;

	function toggleCard(button: HTMLButtonElement) {
		// Check current state
		const isRevealed = button.closest('section')?.getAttribute('data-toggled');

		// Toggle state
		if (isRevealed !== null) {
			button.setAttribute('aria-label', 'Reveal description.');
			button.setAttribute('aria-expanded', 'false');
		} else {
			button.setAttribute('aria-label', 'Close description.');
			button.setAttribute('aria-expanded', 'true');
		}

		button.closest('section')?.toggleAttribute('data-toggled'); // controls the styles
	}
</script>

<section class="card-reveal">
	<h3>{title}</h3>
	<p id={`reveal-card-${id}`}>{description}</p>
	<footer>
		<button
			type="button"
			aria-label="Reveal description."
			aria-expanded="false"
			aria-controls={`reveal-card-${id}`}
			on:click={() => {
				if (button) toggleCard(button);
			}}
			bind:this={button}
		>
			<svg width="12" height="12" viewBox="0 0 12 12">
				<path d="M6 0V6V12" stroke-width="1.52361" />
				<path d="M12 6L-5.96046e-07 6" stroke-width="1.52361" />
			</svg>
		</button>
	</footer>
</section>

<style>
	section {
		--bg-color: var(--c-bg-block);
		--text-color: var(--c-text);
		--button-color: var(--c-highlight);
		--button-rotate: 0deg;
		--icon-color: var(--c-text-invert);

		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		aspect-ratio: 1 / 1;
		padding: 1.5rem;
		background-color: var(--bg-color);
		color: var(--text-color);

		h3 {
			font-weight: 400;
			font-size: clamp(1rem, 0.913rem + 0.4348vi, 1.25rem);
			line-height: 1.3;
		}

		p {
			font-size: 0.875rem;
		}

		button {
			display: none;
			margin-inline-start: auto;
			padding: 0.75rem;
			aspect-ratio: 1 / 1;
			border: none;
			border-radius: 50%;
			background-color: var(--button-color);
			rotate: var(--button-rotate);
			stroke: var(--icon-color);
			transition: rotate 0.5s ease;
		}
	}

	@media (scripting: enabled) {
		.card-reveal footer button {
			display: block;
		}

		:global(.card-reveal:not([data-toggled])) {
			p {
				display: none;
			}

			h3 {
				flex-grow: 1;
			}
		}

		:global(.card-reveal[data-toggled]) {
			--bg-color: var(--c-highlight);
			--text-color: var(--c-text-invert);
			--button-color: var(--c-text-invert);
			--button-rotate: 45deg;
			--icon-color: var(--c-text);

			p {
				flex-grow: 1;
			}

			button:hover,
			button:focus-visible {
				outline-color: currentColor;
			}
		}
	}
</style>
