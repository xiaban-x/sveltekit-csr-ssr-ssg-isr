<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	
	let { data } = $props<{ data: PageData }>();
	
	let clientTime = $state('');
	let isHydrated = $state(false);
	let hydrationTime = $state('');
	let refreshCount = $state(0);
	
	onMount(() => {
		// 模拟客户端水合过程
		setTimeout(() => {
			isHydrated = true;
			hydrationTime = new Date().toLocaleString();
		}, 200);
		
		// 实时更新时间
		clientTime = new Date().toLocaleString();
		const timer = setInterval(() => {
			clientTime = new Date().toLocaleString();
		}, 1000);
		
		return () => clearInterval(timer);
	});
	
	function refreshPage() {
		refreshCount++;
		window.location.reload();
	}
</script>

<svelte:head>
	<title>ISR - 增量静态再生 | SvelteKit 演示</title>
	<meta name="description" content="SvelteKit 增量静态再生模式演示" />
</svelte:head>

<div class="container">
	<div class="header">
		<h1>🔄 ISR (Incremental Static Regeneration)</h1>
		<p class="subtitle">增量静态再生 - 结合静态生成和动态更新的优势</p>
	</div>

	<div class="info-section">
		<div class="info-card">
			<h3>🔍 特点</h3>
			<ul>
				<li>页面在构建时预渲染</li>
				<li>支持后台重新生成</li>
				<li>保持缓存的有效性</li>
				<li>平衡性能和新鲜度</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚡ 优势</h3>
			<ul>
				<li>静态生成的性能</li>
				<li>动态内容的更新</li>
				<li>智能缓存策略</li>
				<li>用户体验最佳</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚠️ 注意事项</h3>
			<ul>
				<li>需要缓存系统支持</li>
				<li>重新生成有延迟</li>
				<li>缓存策略复杂</li>
				<li>需要监控机制</li>
			</ul>
		</div>
	</div>

	<div class="demo-section">
		<h2>🎯 ISR 缓存演示</h2>
		
		<div class="cache-info">
			<h3>缓存状态</h3>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">缓存状态:</span>
					<span class="value {data.cacheStatus.isCached ? 'cached' : 'fresh'}">
						{data.cacheStatus.isCached ? '🔄 缓存中' : '✨ 新生成'}
					</span>
				</div>
				<div class="info-item">
					<span class="label">缓存年龄:</span>
					<span class="value">{data.cacheStatus.cacheAge} 秒</span>
				</div>
				<div class="info-item">
					<span class="label">下次重新生成:</span>
					<span class="value">{data.cacheStatus.nextRegeneration} 秒后</span>
				</div>
				<div class="info-item">
					<span class="label">缓存过期时间:</span>
					<span class="value">{data.cacheExpiry} 秒</span>
				</div>
			</div>
		</div>
		
		<div class="regeneration-info">
			<h3>重新生成信息</h3>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">生成时间:</span>
					<span class="value">{data.generatedAt}</span>
				</div>
				<div class="info-item">
					<span class="label">重新生成次数:</span>
					<span class="value">{data.regenerationCount}</span>
				</div>
				<div class="info-item">
					<span class="label">当前时间:</span>
					<span class="value">{data.currentTime}</span>
				</div>
				<div class="info-item">
					<span class="label">刷新次数:</span>
					<span class="value">{refreshCount}</span>
				</div>
			</div>
		</div>
		
		<div class="server-info">
			<h3>服务端信息</h3>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">主机名:</span>
					<span class="value">{data.serverInfo.hostname}</span>
				</div>
				<div class="info-item">
					<span class="label">Node.js 版本:</span>
					<span class="value">{data.serverInfo.nodeVersion}</span>
				</div>
				<div class="info-item">
					<span class="label">运行平台:</span>
					<span class="value">{data.serverInfo.platform}</span>
				</div>
				<div class="info-item">
					<span class="label">运行时间:</span>
					<span class="value">{data.serverInfo.uptime} 秒</span>
				</div>
			</div>
		</div>
		
		<div class="dynamic-content">
			<h3>动态内容 (ISR 生成)</h3>
			<div class="content-grid">
				{#each data.dynamicContent as item}
					<div class="content-card {item.type}">
						<div class="content-header">
							<h4>{item.title}</h4>
							<span class="type-badge {item.type}">{item.type}</span>
						</div>
						<p>{item.content}</p>
						<small>ID: {item.id}</small>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="refresh-section">
			<h3>手动刷新演示</h3>
			<div class="refresh-info">
				<p>点击下面的按钮来手动刷新页面，观察 ISR 的缓存行为：</p>
												<button onclick={refreshPage} class="btn btn-refresh">
					🔄 刷新页面 (重新生成)
				</button>
				<p class="refresh-note">
					<small>
						注意：刷新后观察缓存状态的变化。ISR 会在后台重新生成内容，
						同时保持页面的快速响应。
					</small>
				</p>
			</div>
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
		<div class="implementation-info">
			<h3>⚠️ 重要说明</h3>
			<p>ISR 需要特定的适配器支持，当前演示使用的是模拟逻辑。</p>
			
			<h3>正确的实现方式</h3>
			<h4>1. 使用 Vercel 适配器（推荐）</h4>
			<div class="code-block">
				<p>在 <code>+page.server.ts</code> 中添加配置：</p>
				<ul>
					<li><code>expiration: 60</code> - 60秒后过期</li>
					<li><code>bypassToken</code> - 绕过缓存的令牌</li>
					<li><code>allowQuery</code> - 允许的查询参数</li>
				</ul>
			</div>
			
			<h4>2. 自定义适配器</h4>
			<p>如需支持其他平台，需要按照 <a href="https://svelte.dev/docs/kit/writing-adapters" target="_blank">官方文档</a> 编写自定义适配器。</p>
			
			<h3>核心概念</h3>
			<ul>
				<li>页面在构建时预渲染</li>
				<li>设置缓存过期时间</li>
				<li>过期后后台重新生成</li>
				<li>用户始终看到缓存版本</li>
			</ul>
		</div>
	</div>

	<div class="navigation">
		<a href="/ssg" class="btn btn-back">← SSG 演示</a>
		<a href="/" class="btn btn-next">返回首页 →</a>
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

	.cache-info, .regeneration-info, .server-info {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.cache-info h3, .regeneration-info h3, .server-info h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.info-item {
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
		font-size: 0.875rem;
	}

	.value.cached {
		color: #059669;
	}

	.value.fresh {
		color: #d97706;
	}

	.dynamic-content {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.dynamic-content h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.content-card {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid #e5e7eb;
	}

	.content-card.dynamic {
		border-left: 4px solid #ff3e00;
	}

	.content-card.static {
		border-left: 4px solid #6b7280;
	}

	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.content-header h4 {
		margin: 0;
		color: #374151;
		font-size: 1rem;
		flex: 1;
	}

	.type-badge {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	.type-badge.dynamic {
		background: #fef3c7;
		color: #d97706;
	}

	.type-badge.static {
		background: #e5e7eb;
		color: #6b7280;
	}

	.content-card p {
		margin: 0 0 0.5rem 0;
		color: #6b7280;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.content-card small {
		color: #9ca3af;
		font-size: 0.75rem;
	}

	.refresh-section {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		text-align: center;
	}

	.refresh-section h3 {
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.refresh-info p {
		margin: 0 0 1rem 0;
		color: #6b7280;
	}

	.btn-refresh {
		background: #ff3e00;
		color: white;
		padding: 0.75rem 1.5rem;
		font-size: 1.1rem;
		margin: 1rem 0;
	}

	.btn-refresh:hover {
		background: #e03500;
	}

	.refresh-note {
		color: #9ca3af;
		font-style: italic;
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

	.implementation-info {
		background: #f8fafc;
		border-radius: 0.5rem;
		padding: 1.5rem;
		border: 1px solid #e2e8f0;
	}

	.implementation-info h3 {
		margin: 1.5rem 0 1rem 0;
		color: #1e293b;
		font-size: 1.1rem;
	}

	.implementation-info h3:first-child {
		margin-top: 0;
	}

	.implementation-info ul,
	.implementation-info ol {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
		color: #475569;
	}

	.implementation-info li {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	.implementation-info code {
		background: #e2e8f0;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		color: #1e293b;
	}

	.code-block {
		background: #f1f5f9;
		border: 1px solid #cbd5e1;
		border-radius: 0.5rem;
		padding: 1rem;
		margin: 1rem 0;
	}

	.code-block p {
		margin: 0 0 0.5rem 0;
		color: #475569;
	}

	.code-block ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.navigation {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
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
		
		.info-grid {
			grid-template-columns: 1fr;
		}
		
		.content-grid {
			grid-template-columns: 1fr;
		}
		
		.navigation {
			flex-direction: column;
		}
	}
</style>
