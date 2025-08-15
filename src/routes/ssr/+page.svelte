<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	
	let { data } = $props<{ data: PageData }>();
	
	let clientTime = $state('');
	let isHydrated = $state(false);
	let hydrationTime = $state('');
	
	onMount(() => {
		// 模拟客户端水合过程
		setTimeout(() => {
			isHydrated = true;
			hydrationTime = new Date().toLocaleString();
		}, 500);
		
		// 实时更新时间
		clientTime = new Date().toLocaleString();
		const timer = setInterval(() => {
			clientTime = new Date().toLocaleString();
		}, 1000);
		
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>SSR - 服务端渲染 | SvelteKit 演示</title>
	<meta name="description" content="SvelteKit 服务端渲染模式演示" />
</svelte:head>

<div class="container">
	<div class="header">
		<h1>🖥️ SSR (Server-Side Rendering)</h1>
		<p class="subtitle">服务端渲染 - 在服务端预渲染页面内容</p>
	</div>

	<div class="info-section">
		<div class="info-card">
			<h3>🔍 特点</h3>
			<ul>
				<li>页面在服务端预渲染</li>
				<li>HTML 内容立即可见</li>
				<li>对 SEO 友好</li>
				<li>首屏加载快速</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚡ 优势</h3>
			<ul>
				<li>更好的 SEO 表现</li>
				<li>更快的首屏加载</li>
				<li>对搜索引擎爬虫友好</li>
				<li>支持 JavaScript 禁用场景</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚠️ 注意事项</h3>
			<ul>
				<li>需要服务端资源</li>
				<li>每次请求都需要渲染</li>
				<li>交互功能需要水合</li>
				<li>服务端负载较高</li>
			</ul>
		</div>
	</div>

	<div class="demo-section">
		<h2>🎯 服务端数据演示</h2>
		
		<div class="server-info">
			<h3>服务端信息</h3>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">服务端时间:</span>
					<span class="value">{data.serverTime}</span>
				</div>
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
				<div class="info-item">
					<span class="label">生成时间:</span>
					<span class="value">{new Date(data.generatedAt).toLocaleString()}</span>
				</div>
			</div>
		</div>
		
		<div class="posts-section">
			<h3>动态内容 (服务端生成)</h3>
			<div class="posts-grid">
				{#each data.posts as post}
					<div class="post-card">
						<h4>{post.title}</h4>
						<p>{post.content}</p>
						<small>ID: {post.id}</small>
					</div>
				{/each}
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
			<h3>核心文件结构</h3>
			<ul>
				<li><strong>+page.server.ts</strong> - 服务端数据加载逻辑</li>
				<li><strong>+page.svelte</strong> - 页面组件，接收服务端数据</li>
			</ul>
			
			<h3>关键特性</h3>
			<ul>
				<li>使用 <code>export const load</code> 在服务端获取数据</li>
				<li>数据通过 <code>$props</code> 传递给组件</li>
				<li>页面在服务端预渲染，HTML 立即可见</li>
				<li>客户端水合后启用交互功能</li>
			</ul>
			
			<h3>数据流程</h3>
			<ol>
				<li>服务端执行 <code>load</code> 函数获取数据</li>
				<li>数据传递给页面组件</li>
				<li>服务端渲染 HTML 并发送给客户端</li>
				<li>客户端水合，启用 JavaScript 功能</li>
			</ol>
		</div>
	</div>

	<div class="navigation">
		<a href="/csr" class="btn btn-back">← CSR 演示</a>
		<a href="/ssg" class="btn btn-next">SSG 演示 →</a>
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

	.server-info {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.server-info h3 {
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

	.posts-section {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.posts-section h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.post-card {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid #e5e7eb;
	}

	.post-card h4 {
		margin: 0 0 0.5rem 0;
		color: #374151;
		font-size: 1rem;
	}

	.post-card p {
		margin: 0 0 0.5rem 0;
		color: #6b7280;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.post-card small {
		color: #9ca3af;
		font-size: 0.75rem;
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
		
		.posts-grid {
			grid-template-columns: 1fr;
		}
		
		.navigation {
			flex-direction: column;
		}
	}
</style>
