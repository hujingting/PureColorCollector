document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const imageInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('previewImage');
    const colorThief = new ColorThief();
    let selectedColor = null;
    const gradientButton = document.getElementById('gradientButton');
    let extractedColors = []; // 存储提取的颜色
    const saveGradientBtn = document.getElementById('saveGradientBtn');
    const customColorInput = document.getElementById('customColorInput');
    const customColorPreview = document.getElementById('customColorPreview');
    const saveCustomColorBtn = document.getElementById('saveCustomColorBtn');
    const selectPathBtn = document.getElementById('selectPathBtn');
    const selectedPath = document.getElementById('selectedPath');
    let defaultDirectoryHandle = null;

    uploadButton.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';

                // 等待图片加载完成后提取颜色
                previewImage.onload = function() {
                    // 获取5种主要颜色
                    const palette = colorThief.getPalette(previewImage, 5);
                    displayColors(palette);
                };
            };

            reader.readAsDataURL(file);
        }
    });

    // 显示颜色列表
    function displayColors(colors) {
        extractedColors = colors; // 保存提取的颜色
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

            const colorText = document.createElement('span');
            colorText.className = 'color-text';
            colorText.textContent = `${hexColor} (RGB: ${color[0]}, ${color[1]}, ${color[2]})`;

            // 添加保存按钮
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.title = '保存为4K图片';
            saveBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>';
            
            // 添加保存按钮点击事件
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡，防止触发颜色选择
                saveAs4KImage(rgbColor, hexColor);
            });

            colorInfo.appendChild(colorBox);
            colorInfo.appendChild(colorText);
            colorInfo.appendChild(saveBtn);
            colorsContainer.appendChild(colorInfo);

            // 修改点击事件
            colorInfo.addEventListener('click', function(e) {
                // 移除其他选中状态
                document.querySelectorAll('.color-info').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // 添加选中状态
                this.classList.add('selected');
                selectedColor = hexColor;

                // 更改背景颜色
                updateBackgroundColor(color);

                // 复制颜色值到剪贴板
                navigator.clipboard.writeText(hexColor).then(() => {
                    showTooltip(e.clientX, e.clientY, '颜色已复制！');
                });
            });
        });

        // 显示渐变按钮
        gradientButton.style.display = 'block';
    }

    // 添加渐变按钮点击事件
    gradientButton.addEventListener('click', function() {
        applyGradientBackground(extractedColors);
    });

    // 修改应用渐变背景的函数
    function applyGradientBackground(colors) {
        // 确保至少有两种颜色
        if (colors.length < 2) return;

        // 创建渐变色字符串
        const gradientColors = colors.map(color => 
            `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ).join(', ');

        // 应用渐变背景
        document.body.style.background = `linear-gradient(45deg, ${gradientColors})`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientAnimation 15s ease infinite';

        // 显示保存渐变按钮
        saveGradientBtn.style.display = 'block';

        // 添加渐变动画样式
        const styleSheet = document.styleSheets[0];
        const keyframesRule = `
        @keyframes gradientAnimation {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }`;

        // 检查是否已存在动画规则
        let animationExists = false;
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            if (styleSheet.cssRules[i].type === CSSRule.KEYFRAMES_RULE 
                && styleSheet.cssRules[i].name === 'gradientAnimation') {
                animationExists = true;
                break;
            }
        }

        if (!animationExists) {
            styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);
        }

        // 调整容器样式以适应渐变背景
        const container = document.querySelector('.container');
        container.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.15)';
    }

    // 修改更新背景色的函数
    function updateBackgroundColor(color) {
        const [r, g, b] = color;
        
        // 移除可能存在的背景动画
        document.body.style.animation = 'none';
        document.body.style.background = `rgb(${r}, ${g}, ${b})`;
        
        // 计算颜色的亮度并调整容器样式
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const container = document.querySelector('.container');
        
        if (brightness < 128) {
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
        } else {
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            container.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.1)';
        }
    }

    // 显示提示框
    function showTooltip(x, y, text) {
        let tooltip = document.querySelector('.copy-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 30}px`;
        tooltip.classList.add('show');

        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 1500);
    }

    // RGB转换为HEX的辅助函数
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // 添加选择保存路径功能
    selectPathBtn.addEventListener('click', async function() {
        try {
            // 请求用户选择文件夹
            const dirHandle = await window.showDirectoryPicker();
            defaultDirectoryHandle = dirHandle;
            
            // 显示选择的路径
            selectedPath.textContent = dirHandle.name;
            // 保存文件夹权限
            const permission = await dirHandle.requestPermission({ mode: 'readwrite' });
            if (permission === 'granted') {
                showTooltip(event.clientX, event.clientY, '保存位置已设置！');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                showTooltip(event.clientX, event.clientY, '选择文件夹失败');
            }
        }
    });

    // 修改保存文件的函数
    async function saveFileToDirectory(blob, fileName) {
        if (defaultDirectoryHandle) {
            try {
                // 在选定的文件夹中创建文件
                const fileHandle = await defaultDirectoryHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
                return true;
            } catch (err) {
                console.error('保存到指定文件夹失败:', err);
                return false;
            }
        }
        return false;
    }

    // 修改 saveAs4KImage 函数
    async function saveAs4KImage(rgbColor, hexColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 3840;
        canvas.height = 2160;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = rgbColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const fileName = `color-${hexColor.substring(1)}.png`;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        try {
            if (defaultDirectoryHandle) {
                // 尝试保存到选定的文件夹
                const saved = await saveFileToDirectory(blob, fileName);
                if (saved) {
                    showTooltip(event.clientX, event.clientY, '图片已保存到选定文件夹！');
                    return;
                }
            }

            // 如果没有选定文件夹或保存失败，使用文件选择器
            if ('showSaveFilePicker' in window) {
                const opts = {
                    suggestedName: fileName,
                    types: [{
                        description: 'PNG图片',
                        accept: {'image/png': ['.png']},
                    }],
                };
                
                const handle = await window.showSaveFilePicker(opts);
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                
                showTooltip(event.clientX, event.clientY, '图片已保存！');
            } else {
                // 降级为默认下载方式
                fallbackSave(canvas, fileName);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                fallbackSave(canvas, fileName);
            }
        }
    }

    // 添加默认下载方式的函数
    function fallbackSave(canvas, fileName) {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showTooltip(event.clientX, event.clientY, '图片已保存到下载文件夹！');
        }, 'image/png');
    }

    // 添加保存渐变背景的功能
    saveGradientBtn.addEventListener('click', function() {
        saveGradientAs4K(extractedColors);
    });

    // 修改 saveGradientAs4K 函数
    async function saveGradientAs4K(colors) {
        const canvas = document.createElement('canvas');
        canvas.width = 3840;
        canvas.height = 2160;
        
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        colors.forEach((color, index) => {
            const stop = index / (colors.length - 1);
            gradient.addColorStop(stop, `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        });
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const fileName = `gradient-wallpaper-${Date.now()}.png`;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        try {
            if (defaultDirectoryHandle) {
                // 尝试保存到选定的文件夹
                const saved = await saveFileToDirectory(blob, fileName);
                if (saved) {
                    showTooltip(event.clientX, event.clientY, '渐变壁纸已保存到选定文件夹！');
                    return;
                }
            }

            // 后续保存逻辑与之前相同
            if ('showSaveFilePicker' in window) {
                const opts = {
                    suggestedName: fileName,
                    types: [{
                        description: 'PNG图片',
                        accept: {'image/png': ['.png']},
                    }],
                };
                
                const handle = await window.showSaveFilePicker(opts);
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                
                showTooltip(event.clientX, event.clientY, '渐变壁纸已保存！');
            } else {
                fallbackSave(canvas, fileName);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                fallbackSave(canvas, fileName);
            }
        }
    }

    // 添加自定义颜色输入处理
    customColorInput.addEventListener('input', function(e) {
        let color = e.target.value;
        
        // 自动添加#号
        if (color.charAt(0) !== '#') {
            color = '#' + color;
        }
        
        // 验证颜色格式
        const isValid = /^#[0-9A-F]{6}$/i.test(color);
        
        if (isValid) {
            customColorPreview.style.backgroundColor = color;
            customColorInput.classList.remove('error');
            saveCustomColorBtn.disabled = false;
            
            // 如果输入的是小写，转换为大写
            if (color !== color.toUpperCase()) {
                customColorInput.value = color.toUpperCase();
            }
        } else {
            customColorPreview.style.backgroundColor = '#FFFFFF';
            customColorInput.classList.add('error');
            saveCustomColorBtn.disabled = true;
        }
    });

    // 添加保存自定义颜色事件
    saveCustomColorBtn.addEventListener('click', function() {
        const color = customColorInput.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            // 转换十六进制到RGB
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            
            saveAs4KImage(`rgb(${r}, ${g}, ${b})`, color);
        }
    });

    // 添加输入框聚焦时自动添加#号
    customColorInput.addEventListener('focus', function(e) {
        if (!e.target.value.includes('#')) {
            e.target.value = '#' + e.target.value;
        }
    });

    // 添加粘贴事件处理
    customColorInput.addEventListener('paste', function(e) {
        e.preventDefault();
        let pastedText = (e.clipboardData || window.clipboardData).getData('text');
        
        // 移除可能的#号
        pastedText = pastedText.replace('#', '');
        
        // 只保留有效的十六进制字符
        pastedText = pastedText.replace(/[^0-9A-Fa-f]/g, '');
        
        // 限制长度为6个字符
        pastedText = pastedText.slice(0, 6);
        
        // 添加#号并更新输入框
        this.value = '#' + pastedText.toUpperCase();
        
        // 触发input事件以更新预览
        this.dispatchEvent(new Event('input'));
    });
}); 