# OrionOS - Personal Life Management System

> A gamified personal management system that turns daily actions into trackable scores, rewards, and insights.

OrionOS (originally "人生OS") is a self-hosted, full-stack web application built with Node.js and Express. It helps users track daily tasks with a scoring system, manage todos and quick notes, redeem points in a virtual store, and visualize productivity trends through an analytics dashboard.

---

## Features

### Scoring System (打分系统)
- Record daily actions with description, time segment (morning/afternoon/evening), score (0-20), and duration
- Auto-calculated summary cards: total records, total time, accumulated points
- Color-coded time segments and progress bars for visual feedback
- Daily review editor with Markdown support and preview mode
- Media upload support (images and audio attachments)

### Dashboard (数据看板)
- Points trend line chart (weekly / monthly / yearly views)
- Todo completion rate doughnut chart
- Store spending breakdown visualization
- AI-powered review suggestions via DeepSeek R1

### Todo List (待办清单)
- Add, complete, and delete tasks
- Drag-and-drop reordering
- Real-time completion statistics and progress tracking

### Lightning Notes (闪电笔记)
- Quick note capture with timestamps
- Reverse chronological display
- One-click delete

### Points Store (积分商店)
- Redeem accumulated points for custom rewards
- Add and manage reward products
- Purchase history with timestamps
- 7-day purchase count badges

### User Profile (用户中心)
- Avatar upload
- Profile management (nickname, gender, birthday, location, signature, WeChat)
- Password-protected accounts with bcrypt hashing

### Daily Export (导出日度长图)
- Export daily performance summary as a shareable PNG image
- Includes profile, stats dashboard, task details, and review content
- Powered by html2canvas

### Obsidian Integration
- Dedicated pages for adding and viewing today's tasks from Obsidian

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Authentication | bcryptjs |
| File Upload | Multer |
| Data Storage | JSON files (file-based, no database) |
| Frontend | Vanilla HTML/CSS/JS |
| Charts | Chart.js |
| Markdown | Marked.js |
| Image Export | html2canvas |
| Icons | Font Awesome 6.4.0 |

---

## Project Structure

```
orionOS/
├── server.js              # Express backend with all API routes
├── package.json
├── index.html             # Landing page
├── 404.html               # Error page
├── .htaccess              # Apache URL rewrite rules
├── public/
│   ├── index.html         # Scoring system (main page)
│   ├── login.html         # Login & registration
│   ├── dashboard.html     # Analytics dashboard
│   ├── todo.html          # Todo list
│   ├── note.html          # Lightning notes
│   ├── store.html         # Points store
│   ├── user.html          # User profile
│   ├── settings.html      # Settings (WIP)
│   ├── export.html        # Daily export as image
│   ├── js/
│   │   └── login.js       # Auth logic
│   ├── uploads/           # User-uploaded media
│   └── Obsidian/          # Obsidian integration pages
│       ├── task-add-today.html
│       └── task-view-today.html
└── data/
    ├── users.json         # User accounts & profiles
    ├── tasks/             # Per-user scoring data
    ├── store/             # Per-user store data
    ├── notes/             # Per-user notes
    └── todos/             # Per-user todos
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/zjyuiop/orionos_system_old.git
cd orionos_system_old

# Install dependencies
npm install

# Start the server
npm start
```

The app will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | User login |
| GET | `/api/user/:username` | Get user profile |
| POST | `/api/user/:username` | Update user profile |
| GET | `/api/tasks/:user` | Get user's scoring data |
| POST | `/api/tasks/:user` | Save user's scoring data |
| GET | `/api/store/:user` | Get user's store data |
| POST | `/api/store/:user` | Save user's store data |
| GET | `/api/notes/:user` | Get user's notes |
| POST | `/api/notes/:user` | Save user's notes |
| GET | `/api/todos/:user` | Get user's todos |
| POST | `/api/todos/:user` | Save user's todos |
| POST | `/api/upload` | Upload media files (max 10) |

---

## Version History

| Version | Codename | Key Changes |
|---------|----------|-------------|
| v1.0 | LPT Score System | Initial scoring system with login, tasks, and points store |
| v2.0 | LPT Score System 2 | Added notes and todo modules |
| v3.0 | orionsheep.shop 3.0 | Renamed project, added user center, settings, and data export |
| v4.0 | orionsheep.shop | Architecture optimization, enhanced all modules |
| v5.0 | orionsheep.shop | Added Dashboard with data visualization |
| v6.0 | OrionOS | Full restructure, added landing page, Obsidian integration, 404 page |

---

## Design

- Modern glass-morphism UI with indigo-purple gradient palette
- Fully responsive design (desktop, tablet, mobile)
- Smooth animations and transitions
- No external UI framework - pure custom CSS

---

## License

MIT
