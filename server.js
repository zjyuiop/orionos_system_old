//--------------------------------------------------
//  score-shop 统一后端（放项目根目录）
//--------------------------------------------------
const express = require('express');
const bcrypt  = require('bcryptjs');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ========= 1. 静态资源 ========= */
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_, res) => res.redirect('/index.html'));

/* ========= 2. 解析请求体 ========= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));    // 兼容表单

/* ========= 3. 数据文件/目录 ========= */
const DATA   = path.join(__dirname, 'data');
const DIR    = { tasks:'tasks', store:'store', notes:'notes', todos:'todos' };
Object.values(DIR).forEach(d => fs.mkdirSync(path.join(DATA, d), { recursive: true }));

const USER_FILE = path.join(DATA, 'users.json');
if (!fs.existsSync(USER_FILE)) fs.writeFileSync(USER_FILE, '{}');   // 对象 {}

const j       = (...p)           => path.join(...p);
const read    = (f, def)         => { try{return JSON.parse(fs.readFileSync(f,'utf8'));}catch{ return def;} };
const write   = (f, v)           => fs.writeFileSync(f, JSON.stringify(v, null, 2));
const fp      = (folder, file)   => j(DATA, folder, file);

/* =======================================================
   4. 登录 / 注册
   users.json 结构：{ "username": { "hash": "<bcrypt-hash>" } }
   ======================================================= */
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password)   return res.status(400).json({ msg:'缺少参数' });

    let users = read(USER_FILE, {});
    if (users[username])          return res.status(409).json({ msg:'用户名已存在' });

    users[username] = { hash: await bcrypt.hash(password, 10) };
    write(USER_FILE, users);
    res.json({ msg:'注册成功' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password)   return res.status(400).json({ msg:'缺少参数' });

    const users = read(USER_FILE, {});
    const user  = users[username];
    if (!user)                    return res.status(401).json({ msg:'用户名或密码错误' });

    const ok = await bcrypt.compare(password, user.hash);
    if (!ok)                      return res.status(401).json({ msg:'用户名或密码错误' });

    res.json({ msg:'登录成功' });
});

/* =======================================================
   5. 评分系统 /api/tasks/:user
   ======================================================= */
app.get('/api/tasks/:user', (req,res)=>{
    res.json(read(fp(DIR.tasks, req.params.user + '.json'), { items:[], reviews:{} }));
});
app.post('/api/tasks/:user', (req,res)=>{
    write(fp(DIR.tasks, req.params.user + '.json'), req.body);
    res.json({ msg:'OK' });
});

/* =======================================================
   6. 积分商店 /api/store/:user
   ======================================================= */
app.get('/api/store/:user', (req,res)=>{
    res.json(read(fp(DIR.store, req.params.user + '.json'), { products:[], history:[] }));
});
app.post('/api/store/:user', (req,res)=>{
    write(fp(DIR.store, req.params.user + '.json'), req.body);
    res.json({ msg:'OK' });
});

/* =======================================================
   7. 闪电笔记 /api/notes/:user
   ======================================================= */
app.get('/api/notes/:user', (req,res)=>{
    res.json(read(fp(DIR.notes, req.params.user + '.json'), []));
});
app.post('/api/notes/:user', (req,res)=>{
    write(fp(DIR.notes, req.params.user + '.json'), req.body);
    res.json({ msg:'OK' });
});

/* =======================================================
   8. 代办清单 /api/todos/:user
   ======================================================= */
app.get('/api/todos/:user', (req,res)=>{
    res.json(read(fp(DIR.todos, req.params.user + '.json'), []));
});
app.post('/api/todos/:user', (req,res)=>{
    write(fp(DIR.todos, req.params.user + '.json'), req.body);
    res.json({ msg:'OK' });
});

/* ========= 9. 启动 ========= */
app.listen(PORT, '0.0.0.0', () =>
    console.log(`✅  Server listening at http://localhost:${PORT}`)
);