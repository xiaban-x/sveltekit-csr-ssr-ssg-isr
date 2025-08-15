# 🚀 SvelteKit 渲染模式演示

这是一个展示 SvelteKit 不同渲染模式的演示项目，包含四种主要的渲染策略：

## 📱 渲染模式

### 1. CSR (Client-Side Rendering) - 客户端渲染
- **路径**: `/csr`
- **特点**: 纯客户端渲染，所有内容在浏览器中动态生成
- **优势**: 丰富的交互体验，无需服务端处理
- **适用场景**: 高度交互的单页应用

### 2. SSR (Server-Side Rendering) - 服务端渲染
- **路径**: `/ssr`
- **特点**: 在服务端预渲染页面内容
- **优势**: 更好的 SEO，更快的首屏加载
- **适用场景**: 需要 SEO 的内容页面

### 3. SSG (Static Site Generation) - 静态站点生成
- **路径**: `/ssg`
- **特点**: 构建时预渲染，部署后完全静态
- **优势**: 极致的性能表现，完美的 SEO 支持
- **适用场景**: 博客、文档等静态内容

### 4. ISR (Incremental Static Regeneration) - 增量静态再生
- **路径**: `/isr`
- **特点**: 结合静态生成和动态更新的优势
- **优势**: 静态生成的性能 + 动态内容的更新
- **适用场景**: 内容相对稳定但需要定期更新的网站

## 🛠️ 技术特性

- **SvelteKit 5**: 使用最新的 SvelteKit 框架
- **TypeScript**: 完整的类型支持
- **响应式设计**: 支持移动端和桌面端
- **实时演示**: 展示水合状态和时间对比
- **代码示例**: 每种模式的技术实现说明

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
src/
├── routes/
│   ├── +layout.svelte          # 主布局
│   ├── +page.svelte           # 首页
│   ├── Header.svelte          # 导航头部
│   ├── csr/                   # CSR 演示页面
│   │   └── +page.svelte
│   ├── ssr/                   # SSR 演示页面
│   │   ├── +page.server.ts    # 服务端逻辑
│   │   └── +page.svelte
│   ├── ssg/                   # SSG 演示页面
│   │   ├── +page.server.ts    # 构建时逻辑
│   │   └── +page.svelte
│   └── isr/                   # ISR 演示页面
│       ├── +page.server.ts    # ISR 逻辑
│       └── +page.svelte
└── app.css                    # 全局样式
```

## 🎯 演示功能

每个页面都包含：

- **理论介绍**: 特点、优势、注意事项
- **实际演示**: 具体的功能展示
- **技术实现**: 代码示例和说明
- **水合状态**: 客户端水合过程监控
- **时间对比**: 服务端 vs 客户端时间
- **导航链接**: 页面间的跳转

## 🔧 技术实现

### CSR 页面
- 无 `+page.server.ts` 文件
- 完全在客户端渲染
- 使用 `onMount` 处理客户端逻辑

### SSR 页面
- 包含 `+page.server.ts` 文件
- 在服务端获取数据
- 预渲染到 HTML

### SSG 页面
- 构建时执行 `+page.server.ts`
- 预渲染到静态 HTML
- 部署后无需服务端

### ISR 页面
- 模拟缓存机制
- 支持后台重新生成
- 平衡性能和内容新鲜度

## 🌟 学习价值

这个项目可以帮助开发者：

1. **理解不同渲染模式**的适用场景
2. **掌握 SvelteKit 的核心特性**
3. **学习最佳实践**和实现方式
4. **对比各种方案**的优缺点
5. **做出正确的技术选型**

## 📚 相关资源

- [SvelteKit 官方文档](https://kit.svelte.dev/)
- [Svelte 官方文档](https://svelte.dev/)
- [渲染模式对比指南](https://web.dev/rendering-patterns/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## �� 许可证

MIT License
