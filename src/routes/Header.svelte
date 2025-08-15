<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<div class="header-content">
		<div class="logo">
			<a href="/">
				<img src="/svelte-logo.svg" alt="SvelteKit" width="32" height="32" />
				<span>SvelteKit 渲染模式演示</span>
			</a>
		</div>
		
		<nav>
			<ul>
				<li class:active={$page.url.pathname === '/csr'}>
					<a href="/csr">CSR</a>
				</li>
				<li class:active={$page.url.pathname === '/ssr'}>
					<a href="/ssr">SSR</a>
				</li>
				<li class:active={$page.url.pathname === '/ssg'}>
					<a href="/ssg">SSG</a>
				</li>
				<li class:active={$page.url.pathname === '/isr'}>
					<a href="/isr">ISR</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		background: #ff3e00;
		color: white;
		padding: 1rem 0;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 64rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.logo a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: white;
		text-decoration: none;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.logo img {
		filter: brightness(0) invert(1);
	}

	nav ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 1rem;
	}

	nav a {
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	nav a:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	nav li.active a {
		background-color: rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 640px) {
		.header-content {
			flex-direction: column;
			gap: 1rem;
		}
		
		nav ul {
			gap: 0.5rem;
		}
		
		nav a {
			padding: 0.25rem 0.5rem;
			font-size: 0.9rem;
		}
	}
</style>
