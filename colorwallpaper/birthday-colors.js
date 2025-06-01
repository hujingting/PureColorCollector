document.addEventListener('DOMContentLoaded', function() {
    // Sample Birthday Color Data (Ideally load from JSON)
    // Format: { month: M, day: D, name: "Color Name", hex: "#HEXHEX", description: "Optional description" }
    const birthdayColorsData = [
        // January
        { month: 1, day: 1, name: "雪白", hex: "#FFFFFF", description: "纯洁与新的开始" },
        { month: 1, day: 2, name: "银鼠", hex: "#AFAFAF", description: "智慧与冷静" },
        { month: 1, day: 15, name: "冰蓝", hex: "#ADD8E6", description: "宁静与清晰" },
        // February
        { month: 2, day: 1, name: "淡紫", hex: "#E6E6FA", description: "神秘与浪漫" },
        { month: 2, day: 14, name: "玫瑰红", hex: "#FF007F", description: "热情与爱" },
        { month: 2, day: 28, name: "青玉", hex: "#41B349", description: "生机与希望" },
         // March
         { month: 3, day: 1, name: "嫩芽绿", hex: "#BCE672", description: "新生与活力" },
         { month: 3, day: 20, name: "鹅黄", hex: "#FFFACD", description: "温暖与快乐" },
         // ... Add all 366 colors here or load from JSON
    ];

    const container = document.getElementById('birthdayColorsContainer');
    const months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    const navScroll = document.querySelector('.nav-scroll');
    
    // 创建导航项
    months.forEach((month, index) => {
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

    // 按月份排序
    birthdayColorsData.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    });

    let currentMonth = -1;
    let monthSection;
    let gridContainer;

    birthdayColorsData.forEach(color => {
        if (color.month !== currentMonth) {
            currentMonth = color.month;
            monthSection = document.createElement('div');
            monthSection.className = 'month-section';

            const title = document.createElement('h2');
            title.className = 'month-title';
            title.id = `month-${currentMonth - 1}`;
            title.textContent = months[currentMonth - 1];
            monthSection.appendChild(title);

            gridContainer = document.createElement('div');
            gridContainer.className = 'birthday-colors-grid';
            monthSection.appendChild(gridContainer);

            container.appendChild(monthSection);
        }

        // 创建颜色卡片
        const card = document.createElement('div');
        card.className = 'bday-color-card';
        card.innerHTML = `
            <div class="bday-color-preview" style="background-color: ${color.hex}" title="点击复制 ${color.hex}"></div>
            <div class="bday-color-info">
                <span class="bday-date">${color.month}月${color.day}日</span>
                <span class="bday-color-name">${color.name}</span>
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

        // 添加复制功能
        const preview = card.querySelector('.bday-color-preview');
        preview.addEventListener('click', () => {
            copyToClipboard(color.hex);
        });

        // 添加下载按钮点击事件
        const downloadBtn = card.querySelector('.download-btn');
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveAs4KImage(color);
        });

        gridContainer.appendChild(card);
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

    // --- Helper Functions ---

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showTooltip(event.clientX, event.clientY, '颜色已复制！');
            })
            .catch(() => {
                showTooltip(event.clientX, event.clientY, '复制失败');
            });
    }

    // Show tooltip function (you might want to reuse this from other JS files)
    function showTooltip(x, y, text) {
        let tooltip = document.querySelector('.copy-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            // Add basic tooltip styles if not already in style.css
            tooltip.style.position = 'fixed';
            tooltip.style.background = 'rgba(0,0,0,0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1001';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.2s';
            tooltip.style.pointerEvents = 'none';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        // Adjust position calculation if needed
        const tooltipRect = tooltip.getBoundingClientRect();
        let left = x - tooltipRect.width / 2;
        let top = y - tooltipRect.height - 10; // Position above cursor

        // Prevent tooltip from going off-screen
         if (left < 5) left = 5;
         if (top < 5) top = y + 15;
         if (left + tooltipRect.width > window.innerWidth - 5) left = window.innerWidth - tooltipRect.width - 5;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.opacity = '1';

        setTimeout(() => {
            tooltip.style.opacity = '0';
        }, 1500);
    }

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

    function isLightColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    }

    function fallbackSave(canvas, fileName) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showTooltip(event.clientX, event.clientY, '壁纸已开始下载');
    }
}); 