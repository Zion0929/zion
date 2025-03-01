const button = document.getElementById('rageButton');
let clickCount = 0;
let deathCount = localStorage.getItem('deathCount') || 0;
const insults = [
    "第404次尝试依然失败",
    "这可能在测试环境能工作",
    "你老板说要加个新需求",
    "请先更新到最新版本",
    "请检查网络连接",
    "重启试试？",
    "这不是bug是feature"
];

// 音频初始化（需要替换为真实的base64音频）
const screamAudio = new Audio('data:audio/wav;base64,[你的音频数据]');
const windowsSound = new Audio('data:audio/wav;base64,[你的音频数据]');

document.getElementById('deathCounter').textContent = `程序员死亡次数：${deathCount}`;

button.addEventListener('click', () => {
    clickCount++;
    
    // 基础效果
    button.classList.add('shake');
    button.style.transform = `scale(${1 + clickCount*0.1})`;
    button.style.background = `hsl(${Math.random()*360}, 70%, 50%)`;
    
    // 特殊效果
    if(clickCount % 3 === 0) {
        document.body.style.background = `linear-gradient(${Math.random()*360}deg, 
            hsl(${Math.random()*360}, 70%, 50%), 
            hsl(${Math.random()*360}, 70%, 50%))`;
        button.classList.add('glitch');
        setTimeout(() => button.classList.remove('glitch'), 1000);
    }

    // 音效系统
    Math.random() > 0.5 ? screamAudio.play() : windowsSound.play();
    
    // 老板键随机出现
    if(Math.random() < 0.1) document.getElementById('bossKey').style.display = 'block';
    
    // 死亡系统
    if(clickCount === 10) triggerDeath();

    // 更新界面
    button.innerHTML = `${insults[Math.random()*insults.length|0]}<br>已发泄次数：${clickCount}`;
});

// 死亡特效
function triggerDeath() {
    document.body.style.filter = 'grayscale(1)';
    deathCount++;
    localStorage.setItem('deathCount', deathCount);
    document.getElementById('deathCounter').textContent = `程序员死亡次数：${deathCount}`;

    // 屏幕裂纹
    const crack = document.createElement('div');
    crack.className = 'screen-crack';
    document.body.appendChild(crack);
    setTimeout(() => {
        crack.style.opacity = '0.3';
        crack.style.transform = `rotate(${Math.random()*360}deg)`;
        setTimeout(() => crack.remove(), 1000);
    }, 10);

    // 表情雨
    for(let i=0; i<20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-rain';
        emoji.textContent = ['💀','😭','🤬','👾','💥','🔥','🐛'][Math.random()*7|0];
        emoji.style.left = `${Math.random()*100}vw`;
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 3000);
    }

    setTimeout(() => {
        document.body.innerHTML = `<h1 style="color:red">GAME OVER</h1>
            <p>你成功气死了 ${deathCount} 个程序员</p>
            <button onclick="location.reload()">再死一次</button>`;
    }, 1000);
}

// 老板键功能
document.getElementById('bossKey').addEventListener('click', () => {
    document.body.innerHTML = '<h1 style="color:white">Excel表格 - 季度报表</h1>';
    setTimeout(() => location.reload(), 5000);
});

// 错误窗口关闭
function closeError() {
    document.getElementById('errorWindow').style.display = 'none';
    button.innerHTML = "说好的修复呢？？";
    setTimeout(() => {
        button.innerHTML = "点击发泄！";
        clickCount = 0;
        button.style.transform = 'scale(1)';
        document.body.style.background = '#1a1a1a';
    }, 2000);
    
    if(Math.random() < 0.3) {
        document.body.contentEditable = true;
        alert('你现在可以自由编辑网页了（CTRL+A试试看）');
    }
}

// 动画结束处理
button.addEventListener('animationend', () => button.classList.remove('shake'));

// 空格键支持
document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        button.click();
        document.body.style.transform = `translate(${Math.random()*20-10}px, ${Math.random()*20-10}px)`;
    }
});