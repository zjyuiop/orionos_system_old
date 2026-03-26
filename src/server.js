/* src/server.js — 完整后端：账号 / 任务 / 商店 */
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const bcrypt  = require('bcryptjs');
const cors    = require('cors');
const list    = require('express-list-endpoints');

const app  = express();
const PORT = 3000;
const ROOT = path.resolve('.');
const DATA = path.join(ROOT, 'data');

/* ===== 工具函数 ===== */
const ensure = d => fs.mkdirSync(d, { recursive: true });
const fp     = (...p) => path.join(DATA, ...p);
const read   = (f, d) => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : d;
const write  = (f, o) => { ensure(path.dirname(f)); fs.writeFileSync(f, JSON.stringify(o, null, 2)); };

/* ===== 中间件 ===== */
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(ROOT, 'public')));   // 提供前端文件

/* ===== 账号 ===== */
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ msg: '缺少用户名或密码' });

    const users = read(fp('users.json'), {});
    if (users[username]) return res.status(409).json({ msg: '用户名已存在' });

    users[username] = { hash: await bcrypt.hash(password, 10) };
    write(fp('users.json'), users);
    res.json({ msg: '注册成功' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body || {};
    const users = read(fp('users.json'), {});
    if (!users[username])                         return res.status(404).json({ msg: '用户不存在' });
    if (!(await bcrypt.compare(password, users[username].hash)))
        return res.status(401).json({ msg: '密码错误' });
    res.json({ msg: '登录成功' });
});

/* ===== 任务 ===== */
app.get('/api/tasks/:user',  (req, res) => res.json(read (fp('tasks', req.params.user + '.json'), [])));
app.post('/api/tasks/:user', (req, res) => { write(fp('tasks', req.params.user + '.json'), req.body); res.json({ msg: 'OK' }); });

/* ===== 商店 ===== */
app.get('/api/store/:user',  (req, res) => res.json(read (fp('store', req.params.user + '.json'), { products: [], history: [] })));
app.post('/api/store/:user', (req, res) => { write(fp('store', req.params.user + '.json'), req.body); res.json({ msg: 'OK' }); });

/* ===== 启动 & 路由表 ===== */
app.listen(PORT, () => {
    console.log(`✅  Server running at http://localhost:${PORT}`);
    console.table(list(app).map(r => ({ METHOD: r.methods.join(','), PATH: r.path })));
});