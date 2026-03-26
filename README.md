# OrionOS - 个人生活管理系统

> 一个游戏化的个人管理系统，将每日行动转化为可追踪的积分、奖励与数据洞察。

OrionOS（原名"人生OS"）是一个基于 Node.js + Express 的全栈 Web 应用。它通过打分系统追踪每日任务，管理待办事项和快捷笔记，在虚拟积分商店中兑换奖励，并通过数据看板可视化生产力趋势。

---

## 功能特性

### 打分系统
- 记录每日行动：描述、时间段（上午/下午/晚上）、评分（0-20）、时长
- 自动计算统计卡片：记录数、总时长、累计积分
- 按时间段色彩编码，进度条直观展示
- 每日复盘编辑器，支持 Markdown 编写与预览
- 支持上传图片和音频附件

### 数据看板
- 积分趋势折线图（周/月/年视图切换）
- 待办完成率环形图
- 商店消费分布可视化
- 接入 DeepSeek R1 AI 智能复盘建议

### 待办清单
- 添加、完成、删除任务
- 拖拽排序
- 实时完成率统计与进度追踪

### 闪电笔记
- 快速记录想法，自动添加时间戳
- 按时间倒序展示
- 一键删除

### 积分商店
- 使用累计积分兑换自定义奖励
- 添加和管理奖励商品
- 兑换历史记录，带时间戳
- 7 天内兑换次数徽章

### 用户中心
- 头像上传
- 个人资料管理（昵称、性别、生日、所在地、个性签名、微信号）
- bcrypt 加密的账户密码保护

### 导出日度长图
- 将每日表现汇总导出为可分享的 PNG 长图
- 包含个人资料、统计数据、任务明细和复盘内容
- 基于 html2canvas 生成截图

### Obsidian 集成
- 专用页面，支持从 Obsidian 快速添加和查看今日任务

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Node.js + Express |
| 身份认证 | bcryptjs |
| 文件上传 | Multer |
| 数据存储 | JSON 文件（基于文件系统，无需数据库） |
| 前端 | 原生 HTML / CSS / JavaScript |
| 图表 | Chart.js |
| Markdown 渲染 | Marked.js |
| 图片导出 | html2canvas |
| 图标 | Font Awesome 6.4.0 |

---

## 项目结构

```
orionOS/
├── server.js              # Express 后端，包含所有 API 路由
├── package.json
├── index.html             # 落地页
├── 404.html               # 错误页面
├── .htaccess              # Apache URL 重写规则
├── public/
│   ├── index.html         # 打分系统（主页面）
│   ├── login.html         # 登录与注册
│   ├── dashboard.html     # 数据看板
│   ├── todo.html          # 待办清单
│   ├── note.html          # 闪电笔记
│   ├── store.html         # 积分商店
│   ├── user.html          # 用户中心
│   ├── settings.html      # 系统设置（开发中）
│   ├── export.html        # 导出日度长图
│   ├── js/
│   │   └── login.js       # 登录逻辑
│   ├── uploads/           # 用户上传的媒体文件
│   └── Obsidian/          # Obsidian 集成页面
│       ├── task-add-today.html
│       └── task-view-today.html
└── data/
    ├── users.json         # 用户账户与资料
    ├── tasks/             # 各用户的打分数据
    ├── store/             # 各用户的商店数据
    ├── notes/             # 各用户的笔记数据
    └── todos/             # 各用户的待办数据
```

---

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/zjyuiop/orionos_system_old.git
cd orionos_system_old

# 安装依赖
npm install

# 启动服务
npm start
```

启动后访问 `http://localhost:3000` 即可使用。

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/register` | 注册新用户 |
| POST | `/api/login` | 用户登录 |
| GET | `/api/user/:username` | 获取用户资料 |
| POST | `/api/user/:username` | 更新用户资料 |
| GET | `/api/tasks/:user` | 获取用户打分数据 |
| POST | `/api/tasks/:user` | 保存用户打分数据 |
| GET | `/api/store/:user` | 获取用户商店数据 |
| POST | `/api/store/:user` | 保存用户商店数据 |
| GET | `/api/notes/:user` | 获取用户笔记 |
| POST | `/api/notes/:user` | 保存用户笔记 |
| GET | `/api/todos/:user` | 获取用户待办 |
| POST | `/api/todos/:user` | 保存用户待办 |
| POST | `/api/upload` | 上传媒体文件（最多 10 个） |

---

## 版本历史

| 版本 | 代号 | 主要变更 |
|------|------|----------|
| v1.0 | LPT Score System | 初始积分系统，包含登录、任务打分和积分商店 |
| v2.0 | LPT Score System 2 | 新增闪电笔记和待办清单模块 |
| v3.0 | orionsheep.shop 3.0 | 项目更名，新增用户中心、系统设置和数据导出 |
| v4.0 | orionsheep.shop | 系统架构优化，全模块功能增强 |
| v5.0 | orionsheep.shop | 新增 Dashboard 数据可视化看板 |
| v6.0 | OrionOS | 全面重构，新增落地页、Obsidian 集成、404 页面 |

---

## 设计风格

- 现代毛玻璃（glass-morphism）UI，靛蓝-紫色渐变配色
- 全响应式设计，适配桌面端、平板和手机
- 流畅的动画与过渡效果
- 无外部 UI 框架，纯手写 CSS

---

## 许可证

MIT
