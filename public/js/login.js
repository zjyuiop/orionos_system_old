/* /public/js/login.js
   --------------------------------------------------------
   登录 / 注册 通用脚本
   1. 自动取 window.location.origin 作为 API 域
   2. 详细错误提示（HTTP 状态 / CORS / 网络）
   -------------------------------------------------------- */
(() => {
    const API = window.location.origin;                 // http://localhost:3000 or 80/443

    // ---------- DOM ----------
    const $ = sel => document.querySelector(sel);
    const tabLogin = $('#t-login');
    const tabReg   = $('#t-reg');
    const panelLogin = $('#p-login');
    const panelReg   = $('#p-reg');
    const msgLogin = $('#l-msg');
    const msgReg   = $('#r-msg');

    // ---------- Tab ----------
    function switchTab(toLogin) {
        tabLogin.toggleAttribute('data-act', toLogin);
        panelLogin.toggleAttribute('data-act', toLogin);
        tabReg  .toggleAttribute('data-act', !toLogin);
        panelReg.toggleAttribute('data-act', !toLogin);
    }
    tabLogin.onclick = () => switchTab(true);
    tabReg.onclick   = () => switchTab(false);

    // --------------------------------------------------
    //  登录
    // --------------------------------------------------
    $('#form-login').addEventListener('submit', async e => {
        e.preventDefault();
        msgLogin.style.display = 'none';

        const username = $('#l-user').value.trim();
        const password = $('#l-pwd').value.trim();

        if (!username || !password) {
            return showErr(msgLogin, '请输入用户名和密码');
        }

        try {
            const res = await fetch(`${API}/api/login`, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify({ username, password })
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                localStorage.currentUser = username;
                return location.href = 'index.html';
            }

            showErr(msgLogin, data.msg || `登录失败 (${res.status})`);
        } catch (err) {
            showErr(msgLogin, '网络错误 / CORS 被阻止');
            console.error(err);
        }
    });

    // --------------------------------------------------
    //  注册
    // --------------------------------------------------
    $('#form-reg').addEventListener('submit', async e => {
        e.preventDefault();
        msgReg.style.display = 'none';

        const username = $('#r-user').value.trim();
        const password = $('#r-pwd').value.trim();
        if (!username || !password) {
            return showErr(msgReg, '请输入用户名和密码');
        }

        try {
            const res = await fetch(`${API}/api/register`, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify({ username, password })
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                alert('注册成功，请登录');
                return switchTab(true);
            }

            showErr(msgReg, data.msg || `注册失败 (${res.status})`);
        } catch (err) {
            showErr(msgReg, '网络错误 / CORS 被阻止');
            console.error(err);
        }
    });

    // ---------- 错误输出 ----------
    function showErr(el, txt) {
        el.textContent = txt;
        el.style.display = 'block';
    }
})();