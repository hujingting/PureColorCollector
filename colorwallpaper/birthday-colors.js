document.addEventListener('DOMContentLoaded', function() {
    // 按月份分类的生日色
    const birthdayColors = {
        // 一月
        '一月': [
            { name: "雪白", pinyin: "", hex: "#FFFFFF", rgb: [255, 255, 255] },
            { name: "银鼠", pinyin: "", hex: "#AFAFAF", rgb: [175, 175, 175] },
            { name: "冰蓝", pinyin: "", hex: "#ADD8E6", rgb: [173, 216, 230] }
        ],
        // 二月
        '二月': [
            { name: "淡紫", pinyin: "dàn zǐ", hex: "#E6E6FA", rgb: [230, 230, 250] },
            { name: "玫瑰红", pinyin: "méi guī hóng", hex: "#FF007F", rgb: [255, 0, 127] },
            { name: "青玉", pinyin: "qīng yù", hex: "#41B349", rgb: [65, 179, 73] }
        ],
        // 三月
        '三月': [
            { name: "嫩芽绿", pinyin: "nèn yá lǜ", hex: "#BCE672", rgb: [188, 230, 114] },
            { name: "鹅黄", pinyin: "é huáng", hex: "#FFFACD", rgb: [255, 250, 205] }
        ]
        // ... 可以继续添加其他月份
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
            const card = document.createElement('div');
            card.className = 'bday-color-card';
            card.innerHTML = `
                <div class="bday-color-preview" style="background-color: ${color.hex}" title="点击复制 ${color.hex}"></div>
                <div class="bday-color-info">
                    <span class="bday-color-name">${color.name}</span>
                    <span class="bday-color-pinyin">${color.pinyin}</span>
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
            preview.addEventListener('click', () => {
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
        ctx.fillStyle = isLightColor(color.rgb) ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
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
    function isLightColor(rgb) {
        const [r, g, b] = rgb;
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