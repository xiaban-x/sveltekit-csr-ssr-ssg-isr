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
		}, 300);
		
		// 实时更新时间
		clientTime = new Date().toLocaleString();
		const timer = setInterval(() => {
			clientTime = new Date().toLocaleString();
		}, 1000);
		
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>SSG - 静态站点生成 | SvelteKit 演示</title>
	<meta name="description" content="SvelteKit 静态站点生成模式演示" />
</svelte:head>

<div class="container">
	<div class="header">
		<h1>📄 SSG (Static Site Generation)</h1>
		<p class="subtitle">静态站点生成 - 构建时预渲染，部署后无需服务端</p>
	</div>

	<div class="info-section">
		<div class="info-card">
			<h3>🔍 特点</h3>
			<ul>
				<li>页面在构建时预渲染</li>
				<li>部署后完全静态</li>
				<li>最快的加载速度</li>
				<li>无需服务端资源</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚡ 优势</h3>
			<ul>
				<li>极致的性能表现</li>
				<li>完美的 SEO 支持</li>
				<li>可以部署到 CDN</li>
				<li>成本极低</li>
			</ul>
		</div>
		
		<div class="info-card">
			<h3>⚠️ 注意事项</h3>
			<ul>
				<li>内容更新需要重新构建</li>
				<li>不适合频繁变化的内容</li>
				<li>缺乏动态交互能力</li>
				<li>构建时间可能较长</li>
			</ul>
		</div>
	</div>

	<div class="demo-section">
		<h2>🎯 构建时数据演示</h2>
		
		<div class="build-info">
			<h3>构建信息</h3>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">构建时间:</span>
					<span class="value">{data.buildTime}</span>
				</div>
				<div class="info-item">
					<span class="label">环境:</span>
					<span class="value">{data.buildInfo.environment}</span>
				</div>
				<div class="info-item">
					<span class="label">版本:</span>
					<span class="value">{data.buildInfo.version}</span>
				</div>
				<div class="info-item">
					<span class="label">构建时间戳:</span>
					<span class="value">{new Date(data.buildInfo.timestamp).toLocaleString()}</span>
				</div>
			</div>
		</div>
		
		<div class="site-config">
			<h3>站点配置 (构建时生成)</h3>
			<div class="config-grid">
				<div class="config-item">
					<span class="label">站点名称:</span>
					<span class="value">{data.siteConfig.name}</span>
				</div>
				<div class="config-item">
					<span class="label">描述:</span>
					<span class="value">{data.siteConfig.description}</span>
				</div>
				<div class="config-item">
					<span class="label">作者:</span>
					<span class="value">{data.siteConfig.author}</span>
				</div>
				<div class="config-item">
					<span class="label">生成时间:</span>
					<span class="value">{new Date(data.siteConfig.generatedAt).toLocaleString()}</span>
				</div>
			</div>
		</div>
		
		<div class="static-posts">
			<h3>静态文章 (构建时生成)</h3>
			<div class="posts-grid">
				{#each data.staticPosts as post}
					<div class="post-card">
						<div class="post-header">
							<h4>{post.title}</h4>
							<small class="publish-date">{post.publishedAt}</small>
						</div>
						<p>{post.content}</p>
						<div class="post-footer">
							<small>ID: {post.id}</small>
							<small>Slug: {post.slug}</small>
						</div>
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
				<li><strong>+page.server.ts</strong> - 构建时数据获取</li>
				<li><strong>+page.svelte</strong> - 静态页面组件</li>
			</ul>
			
			<h3>关键特性</h3>
			<ul>
				<li>在构建时获取所有数据</li>
				<li>预渲染为静态 HTML 文件</li>
				<li>部署后完全静态，无需服务端</li>
				<li>可部署到 CDN，性能最佳</li>
			</ul>
			
			<h3>构建流程</h3>
			<ol>
				<li>设置 <code>export const prerender = true</code></li>
				<li>构建时执行 <code>load</code> 函数</li>
				<li>获取静态数据（文章、配置等）</li>
				<li>预渲染为 HTML 文件</li>
				<li>部署静态文件到服务器</li>
			</ol>
			
			<h3>关键配置</h3>
			<div class="code-block">
				<p>在 <code>+page.server.ts</code> 中添加：</p>
				<code>export const prerender = true;</code>
			</div>
		</div>
	</div>

	<div class="navigation">
		<a href="/ssr" class="btn btn-back">← SSR 演示</a>
		<a href="/isr" class="btn btn-next">ISR 演示 →</a>
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

	.build-info, .site-config {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.build-info h3, .site-config h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		text-align: center;
	}

	.info-grid, .config-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.info-item, .config-item {
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

	.static-posts {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.static-posts h3 {
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

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.5rem;
	}

	.post-header h4 {
		margin: 0;
		color: #374151;
		font-size: 1rem;
		flex: 1;
	}

	.publish-date {
		color: #9ca3af;
		font-size: 0.75rem;
		margin-left: 0.5rem;
	}

	.post-card p {
		margin: 0 0 0.5rem 0;
		color: #6b7280;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.post-footer small {
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

	.ssg-note {
		background: #fef3c7;
		border: 1px solid #f59e0b;
		border-radius: 0.5rem;
		padding: 1rem;
		margin-top: 1rem;
	}

	.ssg-note p {
		margin: 0 0 0.5rem 0;
		color: #92400e;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.ssg-note p:last-child {
		margin-bottom: 0;
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
		
		.info-grid, .config-grid {
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
