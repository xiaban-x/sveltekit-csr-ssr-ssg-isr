import type { PageServerLoad } from './$types';

// 关键配置：启用预渲染
export const prerender = true;

export const load: PageServerLoad = async () => {
	// 在构建时获取数据，这些数据会被预渲染到静态 HTML 中
	// 注意：这些值在构建时确定，部署后不会改变
	const buildTime = '2024-01-15 10:00:00'; // 固定构建时间
	const buildInfo = {
		environment: 'production', // 固定环境
		timestamp: '2024-01-15T10:00:00.000Z', // 固定时间戳
		version: '1.0.0'
	};
	
	// 模拟从 CMS 或数据库获取的静态内容
	const staticPosts = [
		{ 
			id: 1, 
			title: 'SvelteKit SSG 的优势', 
			content: '静态站点生成提供最快的加载速度和最佳的性能表现...',
			slug: 'sveltekit-ssg-advantages',
			publishedAt: '2024-01-15'
		},
		{ 
			id: 2, 
			title: '如何部署 SSG 网站', 
			content: 'SSG 网站可以部署到任何静态托管服务，如 Netlify、Vercel 等...',
			slug: 'deploy-ssg-website',
			publishedAt: '2024-01-20'
		},
		{ 
			id: 3, 
			title: 'SSG vs SSR 性能对比', 
			content: '静态生成在性能方面具有明显优势，但缺乏动态内容更新能力...',
			slug: 'ssg-vs-ssr-performance',
			publishedAt: '2024-01-25'
		}
	];
	
	// 模拟获取一些配置数据
	const siteConfig = {
		name: 'SvelteKit SSG Demo',
		description: '静态站点生成演示',
		author: 'SvelteKit Team',
		generatedAt: '2024-01-15T10:00:00.000Z' // 固定生成时间
	};
	
	return {
		buildTime,
		buildInfo,
		staticPosts,
		siteConfig
	};
};
