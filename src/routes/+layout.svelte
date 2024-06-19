<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/svg/appno-logo.svelte';
	import SearchIcon from '$lib/svg/magnifying-glass.svelte';
	import './reset.css';
	import './theme.css';

	import Image from '$lib/components/Image.svelte';

	// Props
	export let data;

	let global = data.global[0];

	// Function: Controls hamburger menu (main navigation)
	function openMenu() {
		const menuModal: HTMLDialogElement | null = document.querySelector('#globalMenuModal');

		if (menuModal?.getAttribute('open')) {
			menuModal?.close();
		} else {
			menuModal?.showModal();
		}
	}
</script>

<header class="global-header">
	<Logo />
	<a href="/search" aria-label="Search">
		<SearchIcon />
	</a>
	<button id="globalMenuButton" type="button" on:click={openMenu}>Menu</button>

	<dialog id="globalMenuModal">
		<header>
			<Logo />
			<form method="dialog">
				<button>Close</button>
			</form>
		</header>
		<p>For testing purposes only.</p>
		<nav>
			<ul role="list">
				<li>Home</li>
				<li>About</li>
				<li>Contact</li>
			</ul>
		</nav>
	</dialog>
</header>

<slot />

<footer class="global-footer">
	<section>
		<Logo />
		<p>{global.footer_description}</p>
		<ul role="list">
			{#each global.footer_socials as { url, logo }}
				<li>
					<a href={url}>
						<Image image={logo?.[0]} />
					</a>
				</li>
			{/each}
		</ul>
	</section>
	<form method="POST">
		<label for="newsletter">{global.footer_newsletter}</label>
		<input id="newsletter" type="email" name="email" placeholder="Email address" required />
		<button type="submit">Subscribe</button>
	</form>
	<nav>
		{#each global.footer_menus as { title, links }}
			<div>
				<h2 class="u-eyebrow">{title}</h2>
				<ul role="list">
					{#each links as link}
						<li>
							<a href={link.url}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
	<section>
		<p>{global.footer_copyright}</p>
		<ul role="list">
			{#each global.footer_terms?.[0]?.links as link}
				<li>
					<a href={link.url}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</section>
</footer>

<style>
	.global-header {
		display: flex;
		flex-wrap: wrap;
		gap: min(2.5rem, 4vw);
		padding: 1.75rem 2.25rem;
		align-content: center;
		align-items: center;
		color: var(--c-text);

		a {
			margin-inline-start: auto;
		}

		button {
			background-color: var(--c-highlight);
			border: none;
			border-radius: 50%;
			aspect-ratio: 1 / 1;
			width: 4rem;
			text-transform: uppercase;
			font-family: var(--f-sans);
			font-weight: 600;
			font-size: 0.75rem;
			letter-spacing: 0.33px;
			color: var(--c-text-invert);

			&:hover,
			&:focus-visible {
				background-color: color-mix(in srgb, var(--c-highlight), white 50%);
			}
		}

		dialog {
			min-width: 100dvw;
			min-height: 100dvh;
			padding: 1.75rem 2.25rem;
			background-color: var(--c-highlight);
			border: none;
			font-family: var(--f-sans);

			button {
				background-color: var(--c-text-invert);
				color: var(--c-text);

				&:hover,
				&:focus-visible {
					background-color: color-mix(in srgb, var(--c-text-invert), white 20%);
					outline-color: var(--c-text-invert);
				}
			}

			header {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				padding-inline-end: 1rem;
				color: var(--c-text-invert);
			}
		}
	}

	.global-footer {
		--gutter: minmax(min(4vw, 2rem), 1fr);

		display: grid;
		/* Content column is divided into a 40% and 60% column, based on global maximum: 78rem (-2 for gap) */
		grid-template-columns:
			[full-start] var(--gutter)
			[content-start]
			min(
				calc((76rem / 100) * 40),
				max(calc(((100% - 20vw) / 100) * 40), calc(((100% - 10rem) / 100) * 40))
			)
			min(
				calc((76rem / 100) * 60),
				max(calc(((100% - 20vw) / 100) * 60), calc(((100% - 10rem) / 100) * 60))
			)
			[content-end] var(--gutter) [full-end];
		gap: min(4vw, 2rem);

		padding-block-start: 4rem;
		background-color: var(--c-bg-block);
		font-family: var(--f-mono);
		font-size: 0.875rem;
		color: var(--c-text);

		section:first-child {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			p {
				max-width: 35ch;
			}

			ul {
				display: flex;
				flex-wrap: wrap;
				gap: 1rem;
			}
		}

		form {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem 0;

			label {
				display: block;
				min-width: 100%;
			}

			input,
			button {
				display: inline-block;
			}

			input {
				min-width: 60%;
			}

			button {
				height: 3rem;
				padding-inline: 1.25rem;
				border: none;
				border-radius: 0;
				font-size: 0.75rem;
			}

			button:focus-visible {
				outline: none;
				background-color: var(--c-highlight);
			}
		}

		nav {
			display: flex;
			flex-wrap: wrap;
			gap: 2rem 8rem;

			ul {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				margin-block: 1rem;
			}

			a {
				text-decoration: none;
			}
		}

		@media (width > 66rem) {
			section:first-child {
				grid-row: 1 / 3;
			}

			form {
				grid-row: 1;
				grid-column-start: 3;
			}

			nav {
				grid-row: 2;
				grid-column-start: 3;
			}
		}

		section:last-child,
		section:last-child ul {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem 1.5rem;
			color: var(--c-text);
			font-family: var(--f-mono);
			font-size: 0.75rem;
		}

		section:last-child {
			grid-column: full;

			/* Padding ensures content sits within global content grid, whilst container has full-width */
			padding: 1.5rem max(min(4rem, 8vw), calc((100% - 78rem) / 2));
			place-content: space-between;
			border-block-start: 1px solid var(--c-border-faded);
		}
	}

	.global-footer > *,
	.global-footer section:last-child > * {
		grid-column: content;
	}
</style>
