<script lang="ts">
	import { onMount } from 'svelte';
	
	let count = 0;
	let clientTime = '';
	let isHydrated = false;
	let hydrationTime = '';
	
	onMount(() => {
		// 模拟客户端水合过程
		setTimeout(() => {
			isHydrated = true;
			hydrationTime = new Date().toLocaleString();
		}, 1000);
		
		// 实时更新时间
		clientTime = new Date().toLocaleString();
		const timer = setInterval(() => {
			clientTime = new Date().toLocaleString();
		}, 1000);
		
		return () => clearInterval(timer);
	});
	
	function increment() {
		count++;
	}
	
	function decrement() {
		count--;
	}
	
	function reset() {
		count = 0;
	}
</script>

<svelte:head>
	<title>CSR - 客户端渲染 | SvelteKit 演示</title>
	<meta name="description" content="SvelteKit 客户端渲染模式演示" />
</svelte:head>

<div class="container">
	<div class="header">
		<h1>📱 CSR (Client-Side Rendering)</h1>
		<p class="subtitle">纯客户端渲染 - 所有内容在浏览器中动态生成</p>
	</div>

	<div class="info-section">
		<div class="info-card">
			<h3>🔍 特点</h3>
			<ul>
				<li>页面在客户端完全渲染</li>
				<li>需要 JavaScript 才能显示内容</li>
				<li>适合高度交互的应用</li>
				<li>首屏加载可能较慢</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚡ 优势</h3>
			<ul>
				<li>丰富的交互体验</li>
				<li>无需服务端处理</li>
				<li>可以实现复杂的客户端逻辑</li>
				<li>适合 SPA 应用</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚠️ 注意事项</h3>
			<ul>
				<li>SEO 不友好</li>
				<li>首屏加载时间较长</li>
				<li>需要等待 JavaScript 执行</li>
				<li>对搜索引擎爬虫不友好</li>
			</ul>
		</div>
	</div>

	<div class="demo-section">
		<h2>🎯 交互演示</h2>
		
		<div class="counter-demo">
			<h3>计数器组件</h3>
			<div class="counter">
				<button on:click={decrement} class="btn btn-secondary">-</button>
				<span class="count">{count}</span>
				<button on:click={increment} class="btn btn-secondary">+</button>
			</div>
			<button on:click={reset} class="btn btn-reset">重置</button>
		</div>
		
		<div class="hydration-status">
			<h3>水合状态</h3>
			<div class="status-grid">
				<div class="status-item">
					<span class="label">水合状态:</span>
					<span class="value {isHydrated ? 'success' : 'loading'}">
						{isHydrated ? '✅ 已完成' : '⏳ 进行中...'}
					</span>
				</div>
				<div class="status-item">
					<span class="label">水合时间:</span>
					<span class="value">{hydrationTime || '等待中...'}</span>
				</div>
				<div class="status-item">
					<span class="label">客户端时间:</span>
					<span class="value">{clientTime || '加载中...'}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="technical-details">
		<h2>🔧 技术实现</h2>
		<div class="code-example">
			<pre></pre>
		</div>
	</div>

	<div class="navigation">
		<a href="/" class="btn btn-back">← 返回首页</a>
		<a href="/ssr" class="btn btn-next">SSR 演示 →</a>
	</div>
</div>

<style>
	.container {
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.header h1 {
		font-size: 2.5rem;
		color: #ff3e00;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #666;
		margin: 0;
	}

	.info-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.info-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		border: 1px solid #e5e7eb;
	}

	.info-card h3 {
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.info-card ul {
		margin: 0;
		padding-left: 1.5rem;
		color: #6b7280;
	}

	.info-card li {
		margin-bottom: 0.5rem;
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

	.counter-demo {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		text-align: center;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.counter-demo h3 {
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.counter {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.count {
		font-size: 2rem;
		font-weight: bold;
		color: #ff3e00;
		min-width: 3rem;
		text-align: center;
	}

	.btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s;
		text-decoration: none;
		display: inline-block;
	}

	.btn-secondary {
		background: #6b7280;
		color: white;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-secondary:hover {
		background: #4b5563;
	}

	.btn-reset {
		background: #ef4444;
		color: white;
	}

	.btn-reset:hover {
		background: #dc2626;
	}

	.hydration-status {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.hydration-status h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.status-grid {
		display: grid;
		gap: 1rem;
	}

	.status-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: #f9fafb;
		border-radius: 0.25rem;
	}

	.label {
		font-weight: 500;
		color: #374151;
	}

	.value {
		color: #6b7280;
		font-family: monospace;
	}

	.value.success {
		color: #059669;
	}

	.value.loading {
		color: #d97706;
	}

	.technical-details {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		border: 1px solid #e5e7eb;
		margin-bottom: 3rem;
	}

	.technical-details h2 {
		text-align: center;
		margin: 0 0 1.5rem 0;
		color: #374151;
	}

	.code-example {
		background: #1f2937;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.code-example pre {
		margin: 0;
		padding: 1.5rem;
		color: #f9fafb;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		overflow-x: auto;
	}

	.navigation {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.btn-back {
		background: #6b7280;
		color: white;
	}

	.btn-back:hover {
		background: #4b5563;
	}

	.btn-next {
		background: #ff3e00;
		color: white;
	}

	.btn-next:hover {
		background: #e03500;
	}

	@media (max-width: 640px) {
		.header h1 {
			font-size: 2rem;
		}
		
		.info-section {
			grid-template-columns: 1fr;
		}
		
		.navigation {
			flex-direction: column;
		}
	}
</style>
