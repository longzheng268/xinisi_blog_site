# Xinisi Blog

基于 [Hexo](https://hexo.io/) + [Butterfly](https://butterfly.js.org/) 主题的个人博客。

## 本地开发

安装依赖：

```bash
npm install
```

启动本地服务器：

```bash
npm run dev
```

访问 `http://localhost:4000` 预览。

## 写文章

```bash
npx hexo new post "文章标题"
```

文章会生成在 `source/_posts/` 目录下，使用 Markdown 编写。

## 构建部署

生成静态文件：

```bash
npm run build
```

输出目录为 `public/`，可部署到 GitHub Pages、Netlify、Vercel 等平台。

## 项目结构

```
source/
├── _posts/     # 博客文章
├── about/      # 关于页
├── icon/       # 图标资源
└── ...         # 静态资源 (favicon, logo 等)
```
