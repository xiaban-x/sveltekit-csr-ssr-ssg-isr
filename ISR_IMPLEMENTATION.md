# ISR (Incremental Static Regeneration) 实现指南

## 🚨 重要说明

**ISR 不是 SvelteKit 的内置功能，需要特定的适配器支持！**

## 📋 支持的平台

### 1. Vercel (推荐)
Vercel 原生支持 ISR，配置简单：

```typescript
// +page.server.ts
import { BYPASS_TOKEN } from '$env/static/private';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  isr: {
    expiration: 60, // 60秒后过期
    bypassToken: BYPASS_TOKEN,
    allowQuery: ['search']
  }
};

export const load: PageServerLoad = async () => {
  // 正常的数据加载逻辑
  return {
    // ... 数据
  };
};
```

**环境变量配置：**
```bash
# .env.local
BYPASS_TOKEN=your-32-character-token-here
```

### 2. 其他平台
需要编写自定义适配器，参考：
- [SvelteKit 官方文档 - 编写适配器](https://svelte.dev/docs/kit/writing-adapters)
- [Vercel 适配器文档](https://svelte.dev/docs/kit/adapter-vercel#Incremental-Static-Regeneration)

## 🔧 配置选项

### expiration
- **类型**: `number | false`
- **说明**: 缓存过期时间（秒）
- **示例**: `60` (60秒), `false` (永不过期)

### bypassToken
- **类型**: `string`
- **说明**: 绕过缓存的令牌
- **要求**: 至少32个字符
- **生成**: `crypto.randomUUID()`

### allowQuery
- **类型**: `string[]`
- **说明**: 允许的查询参数（影响缓存键）
- **示例**: `['search', 'category']`

## 📝 使用场景

### ✅ 适合 ISR 的场景
- 博客文章
- 产品目录
- 新闻页面
- 文档页面
- 任何用户无关的静态内容

### ❌ 不适合 ISR 的场景
- 用户个人资料
- 购物车
- 实时聊天
- 任何需要用户会话的内容

## 🚀 部署步骤

1. **安装 Vercel 适配器**
   ```bash
   npm i -D @sveltejs/adapter-vercel
   ```

2. **配置 svelte.config.js**
   ```javascript
   import adapter from '@sveltejs/adapter-vercel';
   
   export default {
     kit: {
       adapter: adapter()
     }
   };
   ```

3. **设置环境变量**
   ```bash
   vercel env add BYPASS_TOKEN
   ```

4. **部署到 Vercel**
   ```bash
   vercel --prod
   ```

## 🔍 测试 ISR

### 1. 正常访问
- 首次访问：生成新内容
- 后续访问：返回缓存内容

### 2. 强制重新生成
```bash
# 使用 bypass token
curl -H "x-prerender-revalidate: YOUR_TOKEN" https://your-site.com/page

# 或使用 cookie
curl -H "Cookie: __prerender_bypass=YOUR_TOKEN" https://your-site.com/page
```

## 📚 参考资料

- [SvelteKit Vercel 适配器文档](https://svelte.dev/docs/kit/adapter-vercel#Incremental-Static-Regeneration)
- [Vercel ISR 官方文档](https://vercel.com/docs/concepts/incremental-static-regeneration)
- [SvelteKit 编写适配器](https://svelte.dev/docs/kit/writing-adapters)

## ⚠️ 注意事项

1. **ISR 与 prerender 冲突**: 如果设置了 `export const prerender = true`，ISR 配置无效
2. **开发环境**: ISR 在开发环境中不工作，只在生产环境生效
3. **缓存键**: 基于 URL 路径和允许的查询参数生成
4. **费用**: Vercel 的 ISR 功能在免费计划中有限制

## 🎯 最佳实践

1. **合理设置过期时间**: 根据内容更新频率设置
2. **使用 bypass token**: 允许手动重新生成内容
3. **监控缓存命中率**: 了解 ISR 效果
4. **错误处理**: 在 `load` 函数中添加适当的错误处理
5. **类型安全**: 使用 TypeScript 确保类型安全
