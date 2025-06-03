document.addEventListener('DOMContentLoaded', function() {
    // 按月份分类的生日色
    const birthdayColors = {
        // 一月
        '一月': [
            { name: "純白", desc: "纯净、优雅、简洁", hex: "#FFFFE5", month: 1, day: 1 },
            { name: "霜白", desc: "感性・论理・清净", hex: "#E6EAE6", month: 1, day: 2 },
            { name: "银灰色", desc: "勇气、平衡、管理技能", hex: "#AFAFB0", month: 1, day: 3 },
            { name: "铝灰色", desc: "无所畏惧、开朗的挑战者", hex: "#8D9192", month: 1, day: 4 },
            { name: "钢灰色", desc: "机智、可靠", hex: "#736D71", month: 1, day: 5 },
            { name: "", desc: "", hex: "", month: 1, day: 6 },
            { name: "", desc: "", hex: "", month: 1, day: 7 },
            { name: "", desc: "", hex: "", month: 1, day: 8 },
            { name: "", desc: "", hex: "", month: 1, day: 9 },
            { name: "", desc: "", hex: "", month: 1, day: 10 },
            { name: "", desc: "", hex: "", month: 1, day: 11 },
            { name: "", desc: "", hex: "", month: 1, day: 12 },
            { name: "", desc: "", hex: "", month: 1, day: 13 },
            { name: "", desc: "", hex: "", month: 1, day: 14 },
            { name: "", desc: "", hex: "", month: 1, day: 15 },
            { name: "", desc: "", hex: "", month: 1, day: 16 },
            { name: "", desc: "", hex: "", month: 1, day: 17 },
            { name: "", desc: "", hex: "", month: 1, day: 18 },
            { name: "", desc: "", hex: "", month: 1, day: 19 },
            { name: "", desc: "", hex: "", month: 1, day: 20 },
            { name: "", desc: "", hex: "", month: 1, day: 21 },
            { name: "", desc: "", hex: "", month: 1, day: 22 },
            { name: "", desc: "", hex: "", month: 1, day: 23 },
            { name: "", desc: "", hex: "", month: 1, day: 24 },
            { name: "", desc: "", hex: "", month: 1, day: 25 },
            { name: "", desc: "", hex: "", month: 1, day: 26 },
            { name: "", desc: "", hex: "", month: 1, day: 27 },
            { name: "", desc: "", hex: "", month: 1, day: 28 },
            { name: "", desc: "", hex: "", month: 1, day: 29 },
            { name: "", desc: "", hex: "", month: 1, day: 30 },
            { name: "", desc: "", hex: "", month: 1, day: 31 },
        ],
        // 二月
        '二月': [
            { name: "淡紫", desc: "柔和的紫色，如初春的紫罗兰", hex: "#E6E6FA", month: 2, day: 1 },
            { name: "玫瑰红", desc: "浪漫的玫瑰红色，象征爱情", hex: "#FF007F", month: 2, day: 2 },
            { name: "青玉", desc: "清新的绿色，如初春的新芽", hex: "#41B349", month: 2, day: 3 }
        ],
        // 三月
        '三月': [
            { name: "嫩芽绿", desc: "充满生机的嫩绿色，如春日新芽", hex: "#BCE672" },
            { name: "鹅黄", desc: "温暖的黄色，如春日阳光", hex: "#FFFACD" }
        ],
        // 四月
        '四月': [
            { name: "春绿", desc: "生机盎然的绿色，如春日森林", hex: "#0AA344" },
            { name: "玉色", desc: "温润的玉色，如春日溪水", hex: "#BCE0D1" },
            { name: "青玉", desc: "清新的青绿色，如春日新叶", hex: "#41B349" }
        ],
        // 五月
        '五月': [
            { name: "火红", desc: "热烈的红色，如夏日骄阳", hex: "#FF2D51" },
            { name: "朱红", desc: "鲜艳的红色，如夏日花朵", hex: "#FF4C00" },
            { name: "丹", desc: "明亮的红色，如夏日晚霞", hex: "#FF4E20" }
        ],
        // 六月
        '六月': [
            { name: "金黄", desc: "灿烂的金黄色，如夏日麦田", hex: "#FFB61E" },
            { name: "赤金", desc: "明亮的金色，如夏日阳光", hex: "#F2BE45" },
            { name: "雄黄", desc: "温暖的黄色，如夏日果实", hex: "#FF9900" }
        ],
        // 七月
        '七月': [
            { name: "麦秆黄", desc: "自然的黄色，如麦田丰收", hex: "#F8DF70" },
            { name: "油黄", desc: "明亮的黄色，如夏日阳光", hex: "#FFB61E" },
            { name: "杏黄", desc: "温暖的黄色，如杏子成熟", hex: "#FFA631" }
        ],
        // 八月
        '八月': [
            { name: "正红", desc: "纯正的红色，如夏日骄阳", hex: "#FF0000" },
            { name: "赤红", desc: "鲜艳的红色，如夏日花朵", hex: "#FF3300" },
            { name: "绛红", desc: "深沉的红色，如夏日晚霞", hex: "#8C4356" }
        ],
        // 九月
        '九月': [
            { name: "海棠红", desc: "优雅的红色，如秋日海棠", hex: "#DB5A6B" },
            { name: "茜色", desc: "深沉的红色，如秋日枫叶", hex: "#CB3A56" },
            { name: "火红", desc: "热烈的红色，如秋日红叶", hex: "#FF2D51" }
        ],
        // 十月
        '十月': [
            { name: "赫赤", desc: "深沉的红色，如秋日落叶", hex: "#C91F37" },
            { name: "银朱", desc: "明亮的红色，如秋日果实", hex: "#FF461F" },
            { name: "朱砂", desc: "鲜艳的红色，如秋日枫叶", hex: "#FF4C00" }
        ],
        // 十一月
        '十一月': [
            { name: "栗色", desc: "温暖的棕色，如秋日栗子", hex: "#60281E" },
            { name: "玄色", desc: "深沉的黑色，如冬日夜空", hex: "#622A1D" },
            { name: "紫檀", desc: "优雅的深紫色，如冬日暮色", hex: "#4C221B" }
        ],
        // 十二月
        '十二月': [
            { name: "霜白", desc: "清冷的白色，如冬日霜雪", hex: "#F0F0F4" },
            { name: "雪白", desc: "纯净的白色，如冬日初雪", hex: "#F0FCFF" },
            { name: "素白", desc: "淡雅的白色，如冬日晨雾", hex: "#F2FDFF" }
        ]
    };

    const colorsList = document.getElementById('birthdayColorsContainer');
    const navScroll = document.querySelector('.nav-scroll');
    
    // 创建导航项
    Object.keys(birthdayColors).forEach((month, index) => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.textContent = month;
        navItem.addEventListener('click', () => {
            const target = document.getElementById(`month-${index}`);
            target.scrollIntoView({ behavior: 'smooth' });
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');
        });
        navScroll.appendChild(navItem);
    });

    // 创建月份分类展示
    Object.entries(birthdayColors).forEach(([month, colors], index) => {
        // 创建月份标题并添加 id
        const monthTitle = document.createElement('div');
        monthTitle.className = 'month-title';
        monthTitle.id = `month-${index}`;
        monthTitle.textContent = month;
        colorsList.appendChild(monthTitle);

        // 创建颜色卡片容器
        const monthColors = document.createElement('div');
        monthColors.className = 'birthday-colors-grid';

        // 添加该月份下的所有颜色卡片
        colors.forEach(color => {
            if (!color.hex || !color.name) return; // 跳过无效数据

            const card = document.createElement('div');
            card.className = 'bday-color-card';
            card.innerHTML = `
                <div class="bday-color-preview" style="background-color: ${color.hex}" title="点击复制 ${color.hex}"></div>
                <div class="bday-color-info">
                    <div class="bday-color-header">
                        <span class="bday-color-date">${color.month}月${color.day}日</span>
                        <span class="bday-color-name">${color.name}</span>
                    </div>
                    <span class="bday-color-desc">${color.desc}</span>
                    <div class="color-actions">
                        <span class="bday-color-hex">${color.hex}</span>
                        <button class="download-btn" title="下载4K壁纸">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                            </svg>
                            4K
                        </button>
                    </div>
                </div>
            `;

            // 点击颜色预览区域复制颜色值
            const preview = card.querySelector('.bday-color-preview');
            preview.addEventListener('click', (event) => {
                navigator.clipboard.writeText(color.hex)
                    .then(() => {
                        showTooltip(event.clientX, event.clientY, '颜色已复制！');
                    })
                    .catch(() => {
                        showTooltip(event.clientX, event.clientY, '复制失败');
                    });
            });

            // 添加下载按钮点击事件
            const downloadBtn = card.querySelector('.download-btn');
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                saveAs4KImage(color);
            });

            monthColors.appendChild(card);
        });

        colorsList.appendChild(monthColors);
    });

    // 添加滚动监听
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const index = id.split('-')[1];
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');

                if (window.innerWidth <= 768) {
                    const navScroll = document.querySelector('.nav-scroll');
                    const activeItem = navItems[index];
                    navScroll.scrollTo({
                        left: activeItem.offsetLeft - navScroll.clientWidth / 2 + activeItem.clientWidth / 2,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.month-title').forEach(title => {
        observer.observe(title);
    });

    // 显示提示框的函数
    function showTooltip(x, y, text) {
        let tooltip = document.querySelector('.copy-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - 30}px`;
        tooltip.classList.add('show');

        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 1500);
    }

    // 添加保存4K图片的函数
    async function saveAs4KImage(color) {
        console.info('[Save] 开始生成4K纯色图片:', color.name, color.hex);
        
        const canvas = document.createElement('canvas');
        canvas.width = 3840;
        canvas.height = 2160;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color.hex;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加颜色信息水印
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = isLightColor(color.hex) ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${color.name} ${color.hex}`, canvas.width - 40, canvas.height - 40);

        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const fileName = `${color.name}-${color.hex.substring(1)}-4k.png`;

            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{
                            description: 'PNG图片',
                            accept: {'image/png': ['.png']},
                        }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    showTooltip(event.clientX, event.clientY, '壁纸已保存！');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('[Save] 保存失败:', err);
                        fallbackSave(canvas, fileName);
                    }
                }
            } else {
                fallbackSave(canvas, fileName);
            }
        } catch (error) {
            console.error('[Save] 生成图片失败:', error);
            showTooltip(event.clientX, event.clientY, '生成图片失败');
        }
    }

    // 判断颜色是否为浅色
    function isLightColor(hex) {
        // 移除 # 号
        hex = hex.replace('#', '');
        
        // 转换为 RGB
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // 计算亮度
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    }

    // 回退保存方法
    function fallbackSave(canvas, fileName) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showTooltip(event.clientX, event.clientY, '壁纸已开始下载');
    }
}); 