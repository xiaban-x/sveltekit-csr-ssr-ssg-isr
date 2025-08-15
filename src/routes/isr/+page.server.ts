import type { PageServerLoad } from './$types';

// 注意：这是演示用的模拟 ISR 逻辑
// 在生产环境中，应该使用支持 ISR 的适配器（如 Vercel）
// 或者实现自定义适配器

export const load: PageServerLoad = async () => {
	// 模拟 ISR 行为：每次请求都生成新数据
	// 在实际的 ISR 实现中，这个函数会被缓存
	const currentTime = new Date().toLocaleString();
	const currentTimestamp = Date.now();
	
	// 模拟从数据库或 API 获取数据
	const data = {
		generatedAt: currentTime,
		timestamp: currentTimestamp,
		regenerationCount: Math.floor(currentTimestamp / 1000) % 100, // 模拟计数
		dynamicContent: [
			{
				id: 1,
				title: 'ISR 增量静态再生演示',
				content: `这是演示内容，生成时间: ${currentTime}`,
				type: 'dynamic'
			},
			{
				id: 2,
				title: '缓存策略说明',
				content: 'ISR 需要适配器支持，如 Vercel 适配器',
				type: 'static'
			},
			{
				id: 3,
				title: '实现方式',
				content: '通过 export const config 配置缓存策略',
				type: 'dynamic'
			}
		],
		serverInfo: {
			hostname: 'localhost',
			nodeVersion: 'v18+',
			platform: 'development',
			uptime: Math.floor(currentTimestamp / 1000)
		}
	};
	
	// 模拟缓存状态（实际由适配器管理）
	const cacheStatus = {
		isCached: false, // 开发环境中总是 false
		cacheAge: 0,
		nextRegeneration: 0,
		note: '需要配置支持 ISR 的适配器'
	};
	
	return {
		...data,
		currentTime,
		cacheStatus,
		cacheExpiry: 60 // 60秒缓存过期时间
	};
};
