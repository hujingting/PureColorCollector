document.addEventListener('DOMContentLoaded', function() {
    // 按24节气分类的传统色
    const traditionalColors = {
        // 立春：新生、萌发
        '立春': [
            // { name: "春梅红", pinyin: "chūn méi hóng", hex: "#F1939C", rgb: [241, 147, 156] },
            // { name: "柳绿", pinyin: "liǔ lǜ", hex: "#9ED048", rgb: [158, 208, 72] },
            // { name: "豆绿", pinyin: "dòu lǜ", hex: "#9EC141", rgb: [158, 193, 65] },
            // { name: "油绿", pinyin: "yóu lǜ", hex: "#00BC12", rgb: [0, 188, 18] }
            { name: "黄白游", pinyin: "", hex: "#FFF799", rgb: [] },
            { name: "松花", pinyin: "", hex: "#FFEE6F", rgb: [] },
            { name: "缃叶", pinyin: "", hex: "#ECD452", rgb: [] },
            { name: "苍黄", pinyin: "", hex: "#B6A014", rgb: [] },
            { name: "天縹", pinyin: "", hex: "#D5EBE1", rgb: [] },
            { name: "沧浪", pinyin: "", hex: "#B1D5C8", rgb: [] },
            { name: "苍筤", pinyin: "", hex: "#99BCAC", rgb: [] },
            { name: "缥碧", pinyin: "", hex: "#80A492", rgb: [] },
            { name: "流黄", pinyin: "", hex: "#8B7042", rgb: [] },
            { name: "栗壳", pinyin: "", hex: "#775039", rgb: [] },
            { name: "龙战", pinyin: "", hex: "#5F4321", rgb: [] },
            { name: "青骊", pinyin: "", hex: "#422517", rgb: [] },
            { name: "海天霞", pinyin: "", hex: "#F3A694", rgb: [] },
            { name: "缙云", pinyin: "", hex: "#EE7959", rgb: [] },
            { name: "纁黄", pinyin: "", hex: "#BA5140", rgb: [] },
            { name: "珊瑚赫", pinyin: "", hex: "#C12C1F", rgb: [] }
        ],
        // 雨水：滋润、生长
        '雨水': [
            // { name: "雨后蓝", pinyin: "yǔ hòu lán", hex: "#7CB3C1", rgb: [124, 179, 193] },
            // { name: "水蓝", pinyin: "shuǐ lán", hex: "#2B73AF", rgb: [43, 115, 175] },
            // { name: "湖蓝", pinyin: "hú lán", hex: "#30DFF3", rgb: [48, 223, 243] }
            
        ],
        // 惊蛰：唤醒、复苏
        '惊蛰': [
            { name: "春芽绿", pinyin: "chūn yá lǜ", hex: "#96C24E", rgb: [150, 194, 78] },
            { name: "嫩芽绿", pinyin: "nèn yá lǜ", hex: "#BCE672", rgb: [188, 230, 114] },
            { name: "芽绿", pinyin: "yá lǜ", hex: "#9FC343", rgb: [159, 195, 67] }
        ],
        // 春分：平衡、和谐
        '春分': [
            { name: "春绿", pinyin: "chūn lǜ", hex: "#0AA344", rgb: [10, 163, 68] },
            { name: "玉色", pinyin: "yù sè", hex: "#BCE0D1", rgb: [188, 224, 209] },
            { name: "青玉", pinyin: "qīng yù", hex: "#41B349", rgb: [65, 179, 73] }
        ],
        // 清明：明净、清澈
        '清明': [
            { name: "青碧", pinyin: "qīng bì", hex: "#48C0A3", rgb: [72, 192, 163] },
            { name: "碧绿", pinyin: "bì lǜ", hex: "#1BD1A5", rgb: [27, 209, 165] },
            { name: "青水", pinyin: "qīng shuǐ", hex: "#93D5DC", rgb: [147, 213, 220] }
        ],
        // 谷雨：生机、繁茂
        '谷雨': [
            { name: "葱青", pinyin: "cōng qīng", hex: "#789262", rgb: [120, 146, 98] },
            { name: "葱绿", pinyin: "cōng lǜ", hex: "#9DC62E", rgb: [157, 198, 46] },
            { name: "松花绿", pinyin: "sōng huā lǜ", hex: "#BCE672", rgb: [188, 230, 114] }
        ],
        // 立夏：炽热、明亮
        '立夏': [
            { name: "火红", pinyin: "huǒ hóng", hex: "#FF2D51", rgb: [255, 45, 81] },
            { name: "朱红", pinyin: "zhū hóng", hex: "#FF4C00", rgb: [255, 76, 0] },
            { name: "丹", pinyin: "dān", hex: "#FF4E20", rgb: [255, 78, 32] }
        ],
        // 小满：饱满、充实
        '小满': [
            { name: "金黄", pinyin: "jīn huáng", hex: "#FFB61E", rgb: [255, 182, 30] },
            { name: "赤金", pinyin: "chì jīn", hex: "#F2BE45", rgb: [242, 190, 69] },
            { name: "雄黄", pinyin: "xióng huáng", hex: "#FF9900", rgb: [255, 153, 0] }
        ],
        // 芒种：成熟、丰收
        '芒种': [
            { name: "麦秆黄", pinyin: "mài gǎn huáng", hex: "#F8DF70", rgb: [248, 223, 112] },
            { name: "油黄", pinyin: "yóu huáng", hex: "#FFB61E", rgb: [255, 182, 30] },
            { name: "杏黄", pinyin: "xìng huáng", hex: "#FFA631", rgb: [255, 166, 49] }
        ],
        // 夏至：极盛、炽烈
        '夏至': [
            { name: "正红", pinyin: "zhèng hóng", hex: "#FF0000", rgb: [255, 0, 0] },
            { name: "赤红", pinyin: "chì hóng", hex: "#FF3300", rgb: [255, 51, 0] },
            { name: "绛红", pinyin: "jiàng hóng", hex: "#8C4356", rgb: [140, 67, 86] }
        ],
        // 小暑：炎热、明艳
        '小暑': [
            { name: "海棠红", pinyin: "hǎi táng hóng", hex: "#DB5A6B", rgb: [219, 90, 107] },
            { name: "茜色", pinyin: "qiàn sè", hex: "#CB3A56", rgb: [203, 58, 86] },
            { name: "火红", pinyin: "huǒ hóng", hex: "#FF2D51", rgb: [255, 45, 81] }
        ],
        // 大暑：酷暑、炙烤
        '大暑': [
            { name: "赫赤", pinyin: "hè chì", hex: "#C91F37", rgb: [201, 31, 55] },
            { name: "银朱", pinyin: "yín zhū", hex: "#FF461F", rgb: [255, 70, 31] },
            { name: "朱砂", pinyin: "zhū shā", hex: "#FF4C00", rgb: [255, 76, 0] }
        ],
        // 立秋：萧瑟、肃清
        '立秋': [
            { name: "栗色", pinyin: "lì sè", hex: "#60281E", rgb: [96, 40, 30] },
            { name: "玄色", pinyin: "xuán sè", hex: "#622A1D", rgb: [98, 42, 29] },
            { name: "紫檀", pinyin: "zǐ tán", hex: "#4C221B", rgb: [76, 34, 27] }
        ],
        // 处暑：凉爽、清和
        '处暑': [
            { name: "秋蓝", pinyin: "qiū lán", hex: "#8FB2C9", rgb: [143, 178, 201] },
            { name: "靛青", pinyin: "diàn qīng", hex: "#177CB0", rgb: [23, 124, 176] },
            { name: "群青", pinyin: "qún qīng", hex: "#4C8DAE", rgb: [76, 141, 174] }
        ],
        // 白露：清澈、透明
        '白露': [
            { name: "月白", pinyin: "yuè bái", hex: "#EEF7F2", rgb: [238, 247, 242] },
            { name: "霜色", pinyin: "shuāng sè", hex: "#E9F1F6", rgb: [233, 241, 246] },
            { name: "云峰白", pinyin: "yún fēng bái", hex: "#D8E3E7", rgb: [216, 227, 231] }
        ],
        // 秋分：均衡、沉静
        '秋分': [
            { name: "琉璃蓝", pinyin: "liú lí lán", hex: "#1781B5", rgb: [23, 129, 181] },
            { name: "青金", pinyin: "qīng jīn", hex: "#1A94BC", rgb: [26, 148, 188] },
            { name: "鸢尾蓝", pinyin: "yuān wěi lán", hex: "#158BB8", rgb: [21, 139, 184] }
        ],
        // 寒露：清寒、肃杀
        '寒露': [
            { name: "苍色", pinyin: "cāng sè", hex: "#75878A", rgb: [117, 135, 138] },
            { name: "黛色", pinyin: "dài sè", hex: "#6B6882", rgb: [107, 104, 130] },
            { name: "青黛", pinyin: "qīng dài", hex: "#426666", rgb: [66, 102, 102] }
        ],
        // 霜降：凋零、萧瑟
        '霜降': [
            { name: "紫灰", pinyin: "zǐ huī", hex: "#665757", rgb: [102, 87, 87] },
            { name: "黝", pinyin: "yǒu", hex: "#6B6882", rgb: [107, 104, 130] },
            { name: "黯", pinyin: "àn", hex: "#41555D", rgb: [65, 85, 93] }
        ],
        // 立冬：肃穆、沉静
        '立冬': [
            { name: "玄青", pinyin: "xuán qīng", hex: "#3D3B4F", rgb: [61, 59, 79] },
            { name: "乌色", pinyin: "wū sè", hex: "#392F41", rgb: [57, 47, 65] },
            { name: "黝黑", pinyin: "yǒu hēi", hex: "#665757", rgb: [102, 87, 87] }
        ],
        // 小雪：素洁、晶莹
        '小雪': [
            { name: "霜白", pinyin: "shuāng bái", hex: "#F0F0F4", rgb: [240, 240, 244] },
            { name: "雪白", pinyin: "xuě bái", hex: "#F0FCFF", rgb: [240, 252, 255] },
            { name: "素白", pinyin: "sù bái", hex: "#F2FDFF", rgb: [242, 253, 255] }
        ],
        // 大雪：皓白、晶洁
        '大雪': [
            { name: "莹白", pinyin: "yíng bái", hex: "#E3F9FD", rgb: [227, 249, 253] },
            { name: "冰白", pinyin: "bīng bái", hex: "#E0F0F5", rgb: [224, 240, 245] },
            { name: "银白", pinyin: "yín bái", hex: "#E9E7EF", rgb: [233, 231, 239] }
        ],
        // 冬至：幽深、静谧
        '冬至': [
            { name: "藏蓝", pinyin: "zàng lán", hex: "#2E4E7E", rgb: [46, 78, 126] },
            { name: "靛蓝", pinyin: "diàn lán", hex: "#065279", rgb: [6, 82, 121] },
            { name: "绀青", pinyin: "gàn qīng", hex: "#2F2F35", rgb: [47, 47, 53] }
        ],
        // 小寒：冷冽、清寒
        '小寒': [
            { name: "墨色", pinyin: "mò sè", hex: "#50616D", rgb: [80, 97, 109] },
            { name: "黛蓝", pinyin: "dài lán", hex: "#425066", rgb: [66, 80, 102] },
            { name: "青黑", pinyin: "qīng hēi", hex: "#395260", rgb: [57, 82, 96] }
        ],
        // 大寒：深邃、寒凝
        '大寒': [
            { name: "漆黑", pinyin: "qī hēi", hex: "#161823", rgb: [22, 24, 35] },
            { name: "瑾黑", pinyin: "jǐn hēi", hex: "#1C1C22", rgb: [28, 28, 34] },
            { name: "玄青", pinyin: "xuán qīng", hex: "#2B333E", rgb: [43, 51, 62] }
        ]
    };

    const colorsList = document.getElementById('traditionalColorsList');
    const navScroll = document.querySelector('.nav-scroll');
    
    // 创建导航项
    Object.keys(traditionalColors).forEach((season, index) => {
        // 创建导航项
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.textContent = season;
        navItem.addEventListener('click', () => {
            // 滚动到对应的节气区域
            const target = document.getElementById(`season-${index}`);
            target.scrollIntoView({ behavior: 'smooth' });
            
            // 更新激活状态
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');
        });
        navScroll.appendChild(navItem);
    });

    // 创建24节气分类展示
    Object.entries(traditionalColors).forEach(([season, colors], index) => {
        // 创建节气标题并添加 id
        const seasonTitle = document.createElement('div');
        seasonTitle.className = 'season-title';
        seasonTitle.id = `season-${index}`; // 添加 id 用于导航
        seasonTitle.textContent = season;
        colorsList.appendChild(seasonTitle);

        // 创建颜色卡片容器
        const seasonColors = document.createElement('div');
        seasonColors.className = 'season-colors';

        // 添加该节气下的所有颜色卡片
        colors.forEach(color => {
            const card = document.createElement('div');
            card.className = 'color-card';
            card.innerHTML = `
                <div class="color-preview" style="background-color: ${color.hex}"></div>
                <div class="color-info">
                    <span class="color-name">${color.name}</span>
                    <span class="color-pinyin">${color.pinyin}</span>
                    <div class="color-actions">
                        <span class="color-hex">${color.hex}</span>
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
            const preview = card.querySelector('.color-preview');
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
                e.stopPropagation(); // 防止触发卡片的点击事件
                saveAs4KImage(color);
            });

            seasonColors.appendChild(card);
        });

        colorsList.appendChild(seasonColors);
    });

    // 添加滚动监听，更新导航激活状态
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // 调整可见区域的范围
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

                // 在移动端时，确保激活的导航项可见
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

    // 观察所有节气标题
    document.querySelectorAll('.season-title').forEach(title => {
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
        canvas.width = 3840;  // 4K 宽度
        canvas.height = 2160; // 4K 高度
        
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

            // 使用 showSaveFilePicker API (如果支持)
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