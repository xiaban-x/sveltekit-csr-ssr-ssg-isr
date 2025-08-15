<script lang="ts">
	import { onMount } from 'svelte';
	
	let currentTime = new Date().toLocaleString();
	let clientSideTime = '';
	
	onMount(() => {
		clientSideTime = new Date().toLocaleString();
		
		// 更新客户端时间
		const timer = setInterval(() => {
			clientSideTime = new Date().toLocaleString();
		}, 1000);
		
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>SvelteKit 渲染模式演示</title>
	<meta name="description" content="展示 SvelteKit 的 CSR、SSR、SSG、ISR 四种渲染模式" />
</svelte:head>

<div class="container">
	<div class="hero">
		<h1>🚀 SvelteKit 渲染模式演示</h1>
		<p class="subtitle">探索现代 Web 应用的不同渲染策略</p>
	</div>

	<div class="info-grid">
		<div class="info-card">
			<h3>📱 CSR (Client-Side Rendering)</h3>
			<p>纯客户端渲染，适合高度交互的单页应用</p>
			<a href="/csr" class="btn">查看演示</a>
		</div>
		
		<div class="info-card">
			<h3>🖥️ SSR (Server-Side Rendering)</h3>
			<p>服务端渲染，提供更好的 SEO 和首屏加载</p>
			<a href="/ssr" class="btn">查看演示</a>
		</div>
		
		<div class="info-card">
			<h3>📄 SSG (Static Site Generation)</h3>
			<p>静态站点生成，构建时预渲染，部署后无需服务端</p>
			<a href="/ssg" class="btn">查看演示</a>
		</div>
		
		<div class="info-card">
			<h3>🔄 ISR (Incremental Static Regeneration)</h3>
			<p>增量静态再生，结合静态生成和动态更新的优势</p>
			<a href="/isr" class="btn">查看演示</a>
		</div>
	</div>

	<div class="demo-section">
		<h2>渲染时间对比</h2>
		<div class="time-grid">
			<div class="time-card">
				<h4>服务端时间 (SSR)</h4>
				<p class="time">{currentTime}</p>
				<small>页面构建时的时间</small>
			</div>
			<div class="time-card">
				<h4>客户端时间 (CSR)</h4>
				<p class="time">{clientSideTime || '加载中...'}</p>
				<small>实时更新的时间</small>
			</div>
		</div>
	</div>

	<div class="features">
		<h2>✨ SvelteKit 特性</h2>
		<ul>
			<li><strong>零配置</strong> - 开箱即用的最佳实践</li>
			<li><strong>类型安全</strong> - 完整的 TypeScript 支持</li>
			<li><strong>性能优化</strong> - 自动代码分割和预加载</li>
			<li><strong>开发体验</strong> - 热重载和快速构建</li>
			<li><strong>部署灵活</strong> - 支持多种部署平台</li>
		</ul>
	</div>
</div>

<style>
	.container {
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 2.5rem;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #666;
		margin: 0;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.info-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		border: 1px solid #e5e7eb;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.info-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0,0,0,0.15);
	}

	.info-card h3 {
		margin: 0 0 0.5rem 0;
		color: #374151;
	}

	.info-card p {
		margin: 0 0 1rem 0;
		color: #6b7280;
		line-height: 1.5;
	}

	.btn {
		display: inline-block;
		background: #ff3e00;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		text-decoration: none;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background: #e03500;
	}

	.demo-section {
		background: #f9fafb;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 3rem;
	}

	.demo-section h2 {
		text-align: center;
		margin: 0 0 1.5rem 0;
		color: #374151;
	}

	.time-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.time-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.time-card h4 {
		margin: 0 0 0.5rem 0;
		color: #374151;
	}

	.time {
		font-size: 1.2rem;
		font-weight: bold;
		color: #ff3e00;
		margin: 0.5rem 0;
	}

	.time-card small {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.features {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		border: 1px solid #e5e7eb;
	}

	.features h2 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.features ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.features li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #f3f4f6;
		color: #6b7280;
	}

	.features li:last-child {
		border-bottom: none;
	}

	.features strong {
		color: #374151;
	}

	@media (max-width: 640px) {
		.hero h1 {
			font-size: 2rem;
		}
		
		.info-grid {
			grid-template-columns: 1fr;
		}
		
		.time-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
