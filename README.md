# 辛巳学习日志网

基于 [Hexo](https://hexo.io/) + [Butterfly](https://butterfly.js.org/) 主题的个人博客。

## 站点信息

- **地址**：https://doc.lz-0315.com
- **评论系统**：[Twikoo](https://twikoo.js.org/)（Cloudflare Workers + D1）
- **部署平台**：腾讯云 EdgeOne

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:4000` 预览。

## 写文章

```bash
npx hexo new post "文章标题"
```

文章生成在 `source/_posts/` 下，支持 `.md` 和 `.html` 两种格式。需要自定义样式的用 `.html`，普通文章用 `.md`。

图片素材放在 `source/images/` 下按文章分目录：

```
source/images/
├── router/      # 路由器刷机
├── smartcar/    # 智能车
├── flashpoint/  # Flashpoint
└── webdav/      # WebDav
```

引用方式：

- `.md`：`![描述](/images/router/xxx.jpg)`
- `.html`：`<img src="/images/router/xxx.jpg" alt="描述" />`

## 构建部署

```bash
npm run build
```

输出目录为 `public/`，通过 EdgeOne 部署。

## 项目结构

```
source/
├── _posts/       # 博客文章（.md / .html）
├── about/        # 关于页
├── images/       # 文章图片（按文章分目录）
├── icon/         # 图标资源
├── favicon.ico   # 网站图标
└── logo.png      # 网站 Logo
```
