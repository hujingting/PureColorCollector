// 确保 DOM 完全加载后再执行脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取 DOM 元素
    const uploadButton = document.getElementById('uploadButton'); // 上传按钮
    const imageInput = document.getElementById('imageInput'); // 文件输入框 (隐藏)
    const previewContainer = document.getElementById('preview-container'); // 图片预览区域
    const previewImage = document.getElementById('previewImage'); // 预览图片元素
    const colorThief = new ColorThief(); // 颜色提取库实例
    let selectedColor = null; // 当前选中的颜色 (十六进制)
    const gradientButton = document.getElementById('gradientButton'); // 应用渐变背景按钮
    let extractedColors = []; // 存储从图片提取的颜色数组
    const saveGradientBtn = document.getElementById('saveGradientBtn'); // 保存渐变壁纸按钮
    const customColorInput = document.getElementById('customColorInput'); // 自定义颜色输入框
    const customColorPreview = document.getElementById('customColorPreview'); // 自定义颜色预览框
    const saveCustomColorBtn = document.getElementById('saveCustomColorBtn'); // 保存自定义颜色壁纸按钮
    const selectPathBtn = document.getElementById('selectPathBtn'); // 选择保存路径按钮
    const selectedPath = document.getElementById('selectedPath'); // 显示已选路径的元素
    let defaultDirectoryHandle = null; // 存储用户选择的默认保存文件夹句柄

    // --- 事件监听器 ---

    // 点击上传按钮时，触发隐藏的文件输入框
    uploadButton.addEventListener('click', function() {
        imageInput.click();
    });

    // 当用户选择文件后
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';

                // 等待图片加载完成后提取颜色
                previewImage.onload = function() {
                    try {
                        // 提取更多颜色 (8种)，增加质量参数
                        const palette = colorThief.getPalette(previewImage, 8, 10);
                        // 对颜色进行排序和过滤，去除相似颜色
                        const uniqueColors = filterSimilarColors(palette);
                        displayColors(uniqueColors);
                    } catch (error) {
                        console.error("颜色提取失败:", error);
                        showTooltip(uploadButton.getBoundingClientRect().x, uploadButton.getBoundingClientRect().y, '颜色提取失败，请尝试其他图片');
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    });

    // 点击 "应用渐变背景" 按钮
    gradientButton.addEventListener('click', function() {
        applyGradientBackground(extractedColors); // 应用提取的颜色作为渐变背景
    });

    // 点击 "保存渐变壁纸" 按钮
    saveGradientBtn.addEventListener('click', function() {
        saveGradientAs4K(extractedColors); // 保存当前渐变背景为 4K 图片
    });

    // 处理自定义颜色输入框的输入事件
    customColorInput.addEventListener('input', function(e) {
        let color = e.target.value.trim(); // 获取并清理输入值
        
        // 自动添加 # 号
        if (color.length > 0 && color.charAt(0) !== '#') {
            color = '#' + color;
        }
        
        // 验证十六进制颜色格式 (例如 #FF0000)
        const isValid = /^#[0-9A-F]{6}$/i.test(color);
        
        if (isValid) {
            // 颜色有效
            customColorPreview.style.backgroundColor = color; // 更新预览框颜色
            customColorInput.classList.remove('error'); // 移除错误样式
            saveCustomColorBtn.disabled = false; // 启用保存按钮
            
            // 自动将小写字母转为大写
            if (color !== color.toUpperCase()) {
                customColorInput.value = color.toUpperCase();
            }
        } else {
            // 颜色无效
            customColorPreview.style.backgroundColor = '#FFFFFF'; // 重置预览框颜色
            customColorInput.classList.add('error'); // 添加错误样式
            saveCustomColorBtn.disabled = true; // 禁用保存按钮
        }
    });

    // 点击 "保存自定义颜色壁纸" 按钮
    saveCustomColorBtn.addEventListener('click', function() {
        const color = customColorInput.value;
        // 再次验证颜色格式
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            // 将十六进制颜色转换为 RGB 格式
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            
            // 调用保存函数
            saveAs4KImage(`rgb(${r}, ${g}, ${b})`, color);
        }
    });

    // 自定义颜色输入框获得焦点时，如果没 # 号则自动添加
    customColorInput.addEventListener('focus', function(e) {
        if (e.target.value && !e.target.value.startsWith('#')) {
            e.target.value = '#' + e.target.value;
        }
    });

    // 处理自定义颜色输入框的粘贴事件，进行格式化
    customColorInput.addEventListener('paste', function(e) {
        e.preventDefault(); // 阻止默认粘贴行为
        let pastedText = (e.clipboardData || window.clipboardData).getData('text'); // 获取粘贴的文本
        
        pastedText = pastedText.replace('#', ''); // 移除可能存在的 # 号
        pastedText = pastedText.replace(/[^0-9A-Fa-f]/g, ''); // 只保留十六进制字符
        pastedText = pastedText.slice(0, 6); // 限制长度为 6
        
        this.value = '#' + pastedText.toUpperCase(); // 更新输入框值 (添加 # 并转大写)
        
        // 手动触发 input 事件，以更新预览和按钮状态
        this.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // 点击 "选择保存位置" 按钮
    selectPathBtn.addEventListener('click', async function() {
        try {
            // 检查浏览器是否支持 showDirectoryPicker API
            if (!('showDirectoryPicker' in window)) {
                 showTooltip(event.clientX, event.clientY, '您的浏览器不支持此功能');
                 return;
            }
            // 请求用户选择一个文件夹
            const dirHandle = await window.showDirectoryPicker();
            defaultDirectoryHandle = dirHandle; // 保存文件夹句柄
            
            // 显示选择的文件夹名称
            selectedPath.textContent = dirHandle.name;
            
            // 请求读写权限 (为了之后能直接保存)
            const permission = await dirHandle.requestPermission({ mode: 'readwrite' });
            if (permission === 'granted') {
                showTooltip(event.clientX, event.clientY, '默认保存位置已设置！');
            } else {
                showTooltip(event.clientX, event.clientY, '未授予文件夹写入权限');
            }
        } catch (err) {
            // 用户取消选择或其他错误
            if (err.name !== 'AbortError') {
                console.error("选择文件夹失败:", err);
                showTooltip(event.clientX, event.clientY, '选择文件夹失败');
            }
        }
    });

    // --- 核心功能函数 ---

    /**
     * 计算两个颜色之间的欧几里得距离
     * @param {Array<number>} color1 - 第一个颜色 [r, g, b]
     * @param {Array<number>} color2 - 第二个颜色 [r, g, b]
     * @returns {number} 颜色距离
     */
    function getColorDistance(color1, color2) {
        return Math.sqrt(
            Math.pow(color1[0] - color2[0], 2) +
            Math.pow(color1[1] - color2[1], 2) +
            Math.pow(color1[2] - color2[2], 2)
        );
    }

    /**
     * 过滤相似颜色，保留差异明显的颜色
     * @param {Array<Array<number>>} colors - 颜色数组
     * @returns {Array<Array<number>>} 过滤后的颜色数组
     */
    function filterSimilarColors(colors) {
        if (!colors || colors.length === 0) return [];

        const threshold = 30; // 颜色差异阈值
        const filteredColors = [colors[0]]; // 保留第一个颜色

        for (let i = 1; i < colors.length; i++) {
            let isUnique = true;
            
            // 与已保留的颜色比较
            for (let j = 0; j < filteredColors.length; j++) {
                const distance = getColorDistance(colors[i], filteredColors[j]);
                if (distance < threshold) {
                    isUnique = false;
                    break;
                }
            }

            // 如果颜色足够独特，则保留
            if (isUnique) {
                filteredColors.push(colors[i]);
            }
        }

        // 按亮度排序
        return filteredColors.sort((a, b) => {
            const brightnessA = (a[0] * 299 + a[1] * 587 + a[2] * 114) / 1000;
            const brightnessB = (b[0] * 299 + b[1] * 587 + b[2] * 114) / 1000;
            return brightnessB - brightnessA; // 从亮到暗排序
        });
    }

    /**
     * 计算颜色的饱和度
     * @param {Array<number>} color - RGB颜色数组
     * @returns {number} 饱和度值 (0-1)
     */
    function calculateSaturation(color) {
        const [r, g, b] = color;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return max === 0 ? 0 : (max - min) / max;
    }

    /**
     * 显示从图片提取的颜色列表
     * @param {Array<Array<number>>} colors - 颜色数组，每个颜色是 [r, g, b]
     */
    function displayColors(colors) {
        extractedColors = colors;
        const colorsContainer = document.querySelector('.colors-list');
        colorsContainer.innerHTML = '';

        colors.forEach((color, index) => {
            const colorInfo = document.createElement('div');
            colorInfo.className = 'color-info';

            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            
            const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            const hexColor = rgbToHex(color[0], color[1], color[2]);
            
            colorBox.style.backgroundColor = rgbColor;

            // 计算颜色的亮度和饱和度
            const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
            const saturation = calculateSaturation(color);

            const colorText = document.createElement('span');
            colorText.className = 'color-text';
            colorText.textContent = `${hexColor} (RGB: ${color[0]}, ${color[1]}, ${color[2]})
                                   亮度: ${Math.round(brightness/2.55)}%, 饱和度: ${Math.round(saturation*100)}%`;

            // 创建保存单个颜色的按钮
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.title = '保存为4K图片';
            // 使用 SVG 图标
            saveBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>';
            
            // 添加保存按钮的点击事件
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡到 colorInfo 的点击事件
                saveAs4KImage(rgbColor, hexColor); // 调用保存函数
            });

            // 将元素添加到颜色项中
            colorInfo.appendChild(colorBox);
            colorInfo.appendChild(colorText);
            colorInfo.appendChild(saveBtn);
            colorsContainer.appendChild(colorInfo); // 将颜色项添加到列表中

            // 为每个颜色项添加点击事件 (选择颜色、复制、更新背景)
            colorInfo.addEventListener('click', function(e) {
                // 移除所有其他颜色项的选中状态
                document.querySelectorAll('.color-info.selected').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // 为当前点击的项添加选中状态
                this.classList.add('selected');
                selectedColor = hexColor; // 记录当前选中的颜色

                // 更新网页背景色
                updateBackgroundColor(color);

                // 尝试将十六进制颜色复制到剪贴板
                navigator.clipboard.writeText(hexColor).then(() => {
                    // 复制成功显示提示
                    showTooltip(e.clientX, e.clientY, '颜色已复制！');
                }).catch(err => {
                    console.error('复制失败:', err);
                     showTooltip(e.clientX, e.clientY, '复制失败');
                });
            });
        });

        gradientButton.style.display = colors.length >= 2 ? 'inline-block' : 'none';
        saveGradientBtn.style.display = 'none';
    }

    /**
     * 应用提取的颜色作为网页的渐变背景
     * @param {Array<Array<number>>} colors - 颜色数组 [r, g, b]
     */
    function applyGradientBackground(colors) {
        // 至少需要两种颜色才能创建渐变
        if (!colors || colors.length < 2) {
            showTooltip(gradientButton.getBoundingClientRect().x, gradientButton.getBoundingClientRect().y, '颜色不足，无法生成渐变');
            return;
        }

        // 将颜色数组转换为 CSS linear-gradient 字符串
        const gradientColors = colors.map(color => 
            `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ).join(', ');

        // 应用渐变背景到 body
        document.body.style.background = `linear-gradient(45deg, ${gradientColors})`;
        // 设置背景大小和动画以创建动态效果
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientBackgroundAnimation 15s ease infinite'; // 使用新的动画名

        // 显示 "保存渐变壁纸" 按钮
        saveGradientBtn.style.display = 'inline-flex'; // 使用 inline-flex 保持内部元素对齐

        // --- 动态添加 CSS Keyframes 动画 ---
        const styleSheet = document.styleSheets[0]; // 获取第一个样式表
        const animationName = 'gradientBackgroundAnimation'; // 新的动画名
        
        // 检查动画是否已存在
        let animationExists = false;
        if (styleSheet.cssRules) {
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                 const rule = styleSheet.cssRules[i];
                 if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === animationName) {
                     animationExists = true;
                     break;
                 }
            }
        }
        
        // 如果动画不存在，则添加它
        if (!animationExists) {
             const keyframesRule = `
             @keyframes ${animationName} {
                 0% { background-position: 0% 50%; }
                 50% { background-position: 100% 50%; }
                 100% { background-position: 0% 50%; }
             }`;
             try {
                 styleSheet.insertRule(keyframesRule, styleSheet.cssRules ? styleSheet.cssRules.length : 0);
             } catch (error) {
                 console.error("添加动画规则失败:", error);
             }
        }

        // 调整中间容器的样式以在渐变背景下保持可见性
        const container = document.querySelector('.container');
        container.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.15)';
    }

    /**
     * 更新网页背景为单一颜色
     * @param {Array<number>} color - 颜色数组 [r, g, b]
     */
    function updateBackgroundColor(color) {
        const [r, g, b] = color;
        
        // 移除可能存在的渐变背景动画
        document.body.style.animation = 'none';
        // 设置单一颜色背景
        document.body.style.background = `rgb(${r}, ${g}, ${b})`;
        
        // 根据背景颜色亮度调整容器样式，确保内容可读性
        const brightness = (r * 299 + g * 587 + b * 114) / 1000; // 计算亮度
        const container = document.querySelector('.container');
        
        if (brightness < 128) { // 如果背景是深色
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // 容器用浅色背景
            container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
        } else { // 如果背景是浅色
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.85)'; // 容器用稍透明的背景
            container.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.1)';
        }
        
        // 单色背景时隐藏保存渐变按钮
        saveGradientBtn.style.display = 'none';
    }

    /**
     * 在指定位置显示一个短暂的提示信息
     * @param {number} x - 提示框的 x 坐标
     * @param {number} y - 提示框的 y 坐标
     * @param {string} text - 要显示的文本
     */
    function showTooltip(x, y, text) {
        let tooltip = document.querySelector('.copy-tooltip');
        // 如果提示框不存在，则创建它
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        // 定位提示框（如果 x, y 无效，则居中显示）
        if (x && y) {
             tooltip.style.left = `${Math.max(0, x + 10)}px`;
             tooltip.style.top = `${Math.max(0, y - 30)}px`;
             tooltip.style.transform = 'none';
        } else {
             tooltip.style.left = '50%';
             tooltip.style.top = '20px';
             tooltip.style.transform = 'translateX(-50%)';
        }
        
        tooltip.classList.add('show'); // 显示提示框

        // 1.5 秒后自动隐藏
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 1500);
    }

    /**
     * 将 RGB 颜色值转换为十六进制格式
     * @param {number} r - 红色分量 (0-255)
     * @param {number} g - 绿色分量 (0-255)
     * @param {number} b - 蓝色分量 (0-255)
     * @returns {string} 十六进制颜色字符串 (例如 #FF0000)
     */
    function rgbToHex(r, g, b) {
        // 将每个分量转为两位十六进制数，不足两位的补 0
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // --- 文件保存相关函数 ---

    /**
     * 尝试将 Blob 数据保存到用户选择的默认文件夹
     * @param {Blob} blob - 要保存的 Blob 数据
     * @param {string} fileName - 建议的文件名
     * @returns {Promise<boolean>} - 是否成功保存到默认文件夹
     */
    async function saveFileToDirectory(blob, fileName) {
        // 检查是否已设置默认文件夹句柄
        if (defaultDirectoryHandle) {
            try {
                // 检查并请求写入权限
                const permission = await defaultDirectoryHandle.queryPermission({ mode: 'readwrite' });
                if (permission !== 'granted') {
                    const request = await defaultDirectoryHandle.requestPermission({ mode: 'readwrite' });
                    if (request !== 'granted') {
                         showTooltip(null, null, '无法获取文件夹写入权限');
                         return false;
                    }
                }
                // 在选定的文件夹中创建或获取文件句柄
                const fileHandle = await defaultDirectoryHandle.getFileHandle(fileName, { create: true });
                // 创建可写流
                const writable = await fileHandle.createWritable();
                // 写入数据
                await writable.write(blob);
                // 关闭流
                await writable.close();
                return true; // 保存成功
            } catch (err) {
                console.error('保存到指定文件夹失败:', err);
                // 如果是权限问题或找不到文件夹，则重置句柄
                if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
                    defaultDirectoryHandle = null;
                    selectedPath.textContent = '未设置保存位置 (权限失效)';
                }
                return false; // 保存失败
            }
        }
        return false; // 没有设置默认文件夹
    }

    /**
     * 保存纯色 4K 图片
     * @param {string} rgbColor - RGB 颜色字符串 (例如 "rgb(255, 0, 0)")
     * @param {string} hexColor - 十六进制颜色字符串 (例如 "#FF0000")
     */
    async function saveAs4KImage(rgbColor, hexColor) {
        // 1. 创建 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 3840; // 4K 宽度
        canvas.height = 2160; // 4K 高度
        
        // 2. 填充颜色
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = rgbColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 3. 准备文件名和 Blob 数据
        const fileName = `color-${hexColor.substring(1)}.png`;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        // 4. 尝试保存
        try {
            // 优先尝试保存到默认文件夹
            if (defaultDirectoryHandle) {
                const saved = await saveFileToDirectory(blob, fileName);
                if (saved) {
                    showTooltip(event?.clientX, event?.clientY, '图片已保存到选定文件夹！');
                    return; // 保存成功，结束函数
                }
                 // 如果保存到默认文件夹失败，提示用户并继续尝试其他方式
                 showTooltip(event?.clientX, event?.clientY, '保存到默认文件夹失败，尝试其他方式...');
            }

            // 如果没有默认文件夹或保存失败，尝试使用 showSaveFilePicker API
            if ('showSaveFilePicker' in window) {
                const opts = {
                    suggestedName: fileName,
                    types: [{ description: 'PNG图片', accept: {'image/png': ['.png']} }],
                };
                
                const handle = await window.showSaveFilePicker(opts); // 弹出文件保存对话框
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                
                showTooltip(event?.clientX, event?.clientY, '图片已保存！');
            } else {
                // 如果 showSaveFilePicker 也不支持，使用传统下载方式
                fallbackSave(canvas, fileName);
            }
        } catch (err) {
            // 用户取消保存或其他错误
            if (err.name !== 'AbortError') {
                console.error("保存失败:", err);
                // 发生错误时，也尝试使用传统下载方式作为最后手段
                fallbackSave(canvas, fileName);
            }
        }
    }

    /**
     * 保存渐变 4K 图片
     * @param {Array<Array<number>>} colors - 颜色数组 [r, g, b]
     */
    async function saveGradientAs4K(colors) {
        // 1. 创建 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 3840;
        canvas.height = 2160;
        
        const ctx = canvas.getContext('2d');
        
        // 2. 创建线性渐变
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // 45度角渐变
        
        // 添加颜色停止点
        colors.forEach((color, index) => {
            const stop = index / (colors.length - 1); // 计算停止位置 (0 到 1)
            gradient.addColorStop(stop, `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        });
        
        // 3. 填充渐变
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 4. 准备文件名和 Blob 数据
        const fileName = `gradient-wallpaper-${Date.now()}.png`; // 使用时间戳确保文件名唯一
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        // 5. 尝试保存 (逻辑与 saveAs4KImage 类似)
        try {
            if (defaultDirectoryHandle) {
                const saved = await saveFileToDirectory(blob, fileName);
                if (saved) {
                    showTooltip(event?.clientX, event?.clientY, '渐变壁纸已保存到选定文件夹！');
                    return;
                }
                showTooltip(event?.clientX, event?.clientY, '保存到默认文件夹失败，尝试其他方式...');
            }

            if ('showSaveFilePicker' in window) {
                const opts = {
                    suggestedName: fileName,
                    types: [{ description: 'PNG图片', accept: {'image/png': ['.png']} }],
                };
                
                const handle = await window.showSaveFilePicker(opts);
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                
                showTooltip(event?.clientX, event?.clientY, '渐变壁纸已保存！');
            } else {
                fallbackSave(canvas, fileName);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("保存失败:", err);
                fallbackSave(canvas, fileName);
            }
        }
    }


    /**
     * 传统的文件下载方式 (兼容旧浏览器)
     * @param {HTMLCanvasElement} canvas - 包含图像数据的 Canvas 元素
     * @param {string} fileName - 下载的文件名
     */
    function fallbackSave(canvas, fileName) {
        // 将 Canvas 转换为 Blob 数据
        canvas.toBlob((blob) => {
            if (!blob) {
                showTooltip(null, null, '创建图片失败');
                return;
            }
            const url = URL.createObjectURL(blob); // 创建对象 URL
            const a = document.createElement('a'); // 创建隐藏的下载链接
            a.href = url;
            a.download = fileName; // 设置下载文件名
            document.body.appendChild(a); // 添加到页面
            a.click(); // 模拟点击触发下载
            document.body.removeChild(a); // 移除链接
            URL.revokeObjectURL(url); // 释放对象 URL 资源
            
            showTooltip(event?.clientX, event?.clientY, '图片已保存到下载文件夹！');
        }, 'image/png');
    }

}); // DOMContentLoaded 结束 