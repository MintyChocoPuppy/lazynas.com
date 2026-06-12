# LazyNAS丨小窝有门，日子有光

这是 `www.lazynas.com` 的静态单页版本，用来记录刺猬老师和柚子老师的生活，也保留一个通往 NAS 的入口。

## 文件结构

```txt
index.html
styles.css
scroll-effects.css
script.js
assets/
  hero/cover.svg
  ip/ciwei.svg
  ip/yuzi.svg
  milestones/demo-cover.svg
data/
  milestones.json
```

## 替换照片

- 封面图：替换 `assets/hero/cover.svg`
- 刺猬老师图：替换 `assets/ip/ciwei.svg`
- 柚子老师图：替换 `assets/ip/yuzi.svg`
- 大事记封面：替换 `assets/milestones/demo-cover.svg` 或新增图片后修改 `data/milestones.json`

建议上传生活照片前先移除 EXIF 信息，不放实时位置、住址、学校具体位置等敏感信息。

## 修改大事记

编辑 `data/milestones.json`，每张卡片包含：

```json
{
  "title": "第一次认真整理小窝",
  "date": "2026.06",
  "place": "示例地点",
  "summary": "这里先放一段示例文字，后续替换成真实生活记录。",
  "cover": "./assets/milestones/demo-cover.svg",
  "tags": ["示例", "生活", "记录"],
  "url": "#"
}
```

最后一张可以保留为“未完待续”。

## 修改 NAS 链接

当前页面只显示 `进入 NAS`，不显示端口号、内网 IP、设备型号、用户名或密码。

页面不再做入口可用性检测，NAS 入口固定指向公网地址。

如需修改链接，请在 `index.html` 中搜索：

```txt
https://fnos.net/lazynas
```

不要在前端代码写入密码、token、内网 IP，也不要使用 iframe 嵌入 NAS。

## 部署

当前项目适合部署到 Cloudflare Pages。推送到 GitHub 后，Cloudflare Pages 会自动重新部署。
