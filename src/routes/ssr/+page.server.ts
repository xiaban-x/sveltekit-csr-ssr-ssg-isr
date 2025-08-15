import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// 模拟从数据库或 API 获取数据
	const serverTime = new Date().toLocaleString();
	const serverInfo = {
		hostname: process.env.HOSTNAME || 'localhost',
		nodeVersion: process.version,
		platform: process.platform,
		uptime: Math.floor(process.uptime())
	};
	
	// 模拟获取一些动态内容
	const posts = [
		{ id: 1, title: 'SvelteKit SSR 的优势', content: '服务端渲染提供更好的 SEO 和首屏加载性能...' },
		{ id: 2, title: '如何优化 SSR 性能', content: '通过合理的缓存策略和代码分割来提升性能...' },
		{ id: 3, title: 'SSR vs CSR 对比', content: '两种渲染模式各有优劣，需要根据具体场景选择...' }
	];
	
	// 模拟 API 调用延迟
	await new Promise(resolve => setTimeout(resolve, 100));
	
	return {
		serverTime,
		serverInfo,
		posts,
		generatedAt: new Date().toISOString()
	};
};
