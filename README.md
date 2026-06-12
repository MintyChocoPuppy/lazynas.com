# LazyNAS 网站上线说明

这是 `lazynas.com` 的静态网站初版，可以直接上传到 Cloudflare Pages、GitHub Pages、Vercel 或任意静态网站托管平台。

## 当前文件

- `index.html`：网站首页
- `styles.css`：页面样式
- `script.js`：年份显示脚本
- `assets/hero-nas.png`：首页视觉图

## 推荐上线方式

优先推荐 Cloudflare Pages。它适合静态网站，能绑定自定义域名并自动处理 HTTPS。

你需要做：

1. 注册或登录 Cloudflare。
2. 新建 Pages 项目。
3. 上传本目录里的所有文件，或连接一个 GitHub 仓库。
4. 在 Pages 项目里添加自定义域名：`lazynas.com`。
5. 按 Cloudflare 给出的提示，到阿里云云解析 DNS 添加记录。

Cloudflare 官方文档：
https://developers.cloudflare.com/pages/configuration/custom-domains/

## 如果用 GitHub Pages

你需要做：

1. 注册或登录 GitHub。
2. 新建一个仓库，例如 `lazynas.com`。
3. 上传本目录所有文件。
4. 在仓库 Settings -> Pages 中启用 Pages。
5. 添加自定义域名：`lazynas.com`。
6. 回到阿里云云解析 DNS，添加 GitHub 要求的 A/CNAME/TXT 记录。

GitHub 官方文档：
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## 阿里云域名解析

在阿里云控制台中进入：

云解析 DNS -> 公网权威解析 -> `lazynas.com` -> 解析设置 -> 添加记录

常见字段：

- 主机记录为 `@`：表示 `lazynas.com`
- 主机记录为 `www`：表示 `www.lazynas.com`
- 记录类型通常由托管平台决定，可能是 `CNAME`、`A` 或 `TXT`
- 记录值复制托管平台给出的内容

阿里云官方文档：
https://help.aliyun.com/zh/dns/pubz-add-parsing-record

## 备案判断

如果网站托管在中国内地服务器，通常需要 ICP 备案。

如果托管在中国香港、海外节点，或使用 Cloudflare Pages / GitHub Pages 这类非中国内地静态托管，通常不需要按中国内地服务器流程备案。

阿里云备案说明：
https://help.aliyun.com/zh/icp-filing/basic-icp-service/user-guide/icp-filing-server-access-information-check

## 我建议你下一步给我的内容

- 网站名称是否就叫 `LazyNAS`
- 你的昵称或署名
- 一段 50 到 150 字的个人介绍
- 想公开的邮箱、微信二维码、GitHub、B站或其他链接
- 你希望网站偏“个人主页”“NAS教程站”“博客”“项目官网”哪一种
- 是否要中英文双语

拿到这些后，可以把当前初版改成正式版。
