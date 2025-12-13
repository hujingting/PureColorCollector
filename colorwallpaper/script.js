// 确保 DOM 完全加载后再执行脚本
document.addEventListener('DOMContentLoaded', function () {
    console.info('[App] 应用初始化开始');

    // --- DOM Elements ---
    const uploadButton = document.getElementById('uploadButton');
    const imageInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('previewImage');
    const colorsList = document.querySelector('.colors-list');

    // Gradient Controls
    const gradientButton = document.getElementById('gradientButton');
    const saveGradientBtn = document.getElementById('saveGradientBtn');

    // Custom Color Controls
    const customColorInput = document.getElementById('customColorInput');
    const customColorPreview = document.getElementById('customColorPreview');
    const saveCustomColorBtn = document.getElementById('saveCustomColorBtn');

    // Navigation & Menu Controls
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const traditionalColorsBtn = document.getElementById('traditionalColorsBtn');
    const birthdayColorsBtn = document.getElementById('birthdayColorsBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // State
    const colorThief = new ColorThief();
    let extractedColors = [];

    // --- Menu Toggle Logic ---
    menuToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // --- Theme Logic ---
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let theme = savedTheme || (systemDark ? 'dark' : 'light');
        setTheme(theme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    }

    // Initialize Theme
    initTheme();

    // Event Listener
    themeToggleBtn.addEventListener('click', toggleTheme);

    // --- Dynamic Theming ---
    function updateTheme(color) {
        if (!color) return;
        const [r, g, b] = color;
        // Update CSS variables
        document.documentElement.style.setProperty('--primary', `rgb(${r}, ${g}, ${b})`);
        document.documentElement.style.setProperty('--primary-hover', `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`);

        // Calculate complementary or accent color (simple shift)
        document.documentElement.style.setProperty('--accent', `rgb(${255 - r}, ${255 - g}, ${255 - b})`);
    }

    // --- Event Listeners ---

    // Upload Flow
    uploadButton.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        console.info('[Upload] Processing:', file.name);

        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;

            // Show container with animation
            previewContainer.style.display = 'grid';
            // Start fade-in after a slight delay to allow display change to render
            setTimeout(() => {
                previewContainer.classList.add('active');
            }, 10);

            previewImage.onload = function () {
                try {
                    // Extract colors
                    const palette = colorThief.getPalette(previewImage, 12, 5);
                    const uniqueColors = filterSimilarColors(palette);

                    // Update Theme based on dominant color
                    updateTheme(uniqueColors[0]);

                    // Build UI
                    displayColors(uniqueColors);
                } catch (error) {
                    console.error("[ColorExtract] Failed:", error);
                    showToast('颜色提取失败，请尝试其他图片');
                }
            };
        };
        reader.readAsDataURL(file);
    });

    // Gradient Actions
    gradientButton.addEventListener('click', () => {
        applyGradientBackground(extractedColors);
    });

    saveGradientBtn.addEventListener('click', () => {
        saveGradientAs4K(extractedColors);
    });

    // Custom Color Logic
    customColorInput.addEventListener('input', function (e) {
        let color = e.target.value.trim();
        if (color.length > 0 && color.charAt(0) !== '#') color = '#' + color;

        const isValid = /^#[0-9A-F]{6}$/i.test(color);
        if (isValid) {
            customColorPreview.style.background = color;
            saveCustomColorBtn.disabled = false;
        } else {
            customColorPreview.style.background = '#FFFFFF';
            saveCustomColorBtn.disabled = true;
        }
    });

    saveCustomColorBtn.addEventListener('click', function () {
        const color = customColorInput.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            saveAs4KImage(`rgb(${r}, ${g}, ${b})`, color);
        }
    });

    // Navigation
    if (traditionalColorsBtn) {
        traditionalColorsBtn.addEventListener('click', () => window.location.href = 'traditional-colors.html');
    }
    if (birthdayColorsBtn) {
        birthdayColorsBtn.addEventListener('click', () => window.location.href = 'birthday-colors.html');
    }

    // --- Helper Functions ---

    function displayColors(colors) {
        extractedColors = colors;
        colorsList.innerHTML = '';

        colors.forEach((color, index) => {
            const rgbString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            const hexString = rgbToHex(color[0], color[1], color[2]);

            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';

            colorItem.innerHTML = `
                <div class="color-swatch" style="background-color: ${rgbString}"></div>
                <div class="color-details">
                    <span class="color-hex">${hexString}</span>
                    <span class="color-meta">RGB: ${color.join(', ')}</span>
                </div>
                <button class="save-color-btn" title="Save Wallpaper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                </button>
            `;

            // Interactions
            colorItem.addEventListener('click', (e) => {
                // Ignore if clicked save button
                if (e.target.closest('.save-color-btn')) return;

                document.querySelectorAll('.color-item').forEach(i => i.classList.remove('selected'));
                colorItem.classList.add('selected');

                // Copy to clipboard
                navigator.clipboard.writeText(hexString);
                showToast(`已复制: ${hexString}`);

                // Update theme
                updateTheme(color);
                updateBackgroundColor(color);
            });

            // Save specific color
            const saveBtn = colorItem.querySelector('.save-color-btn');
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                saveAs4KImage(rgbString, hexString);
            });

            colorsList.appendChild(colorItem);
        });

        // Show/Hide gradient button based on count
        if (colors.length < 2) {
            gradientButton.parentElement.style.display = 'none';
        } else {
            gradientButton.parentElement.style.display = 'flex';
        }
    }

    function applyGradientBackground(colors) {
        if (!colors || colors.length < 2) {
            showToast('颜色不足，无法生成渐变');
            return;
        }
        const gradientStr = colors.map(c => `rgb(${c[0]}, ${c[1]}, ${c[2]})`).join(', ');
        document.body.style.background = `linear-gradient(45deg, ${gradientStr})`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientBackgroundAnimation 15s ease infinite';

        saveGradientBtn.style.display = 'flex';
        injectAnimation();
    }

    function updateBackgroundColor(color) {
        document.body.style.animation = 'none';
        document.body.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        saveGradientBtn.style.display = 'none';
    }

    function injectAnimation() {
        const styleSheet = document.styleSheets[0];
        const animationName = 'gradientBackgroundAnimation';
        let exists = false;
        try {
            for (let rule of styleSheet.cssRules) {
                if (rule.name === animationName) exists = true;
            }
        } catch (e) { }

        if (!exists) {
            styleSheet.insertRule(`
                @keyframes ${animationName} {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `, styleSheet.cssRules.length);
        }
    }

    // --- Utilities ---

    function showToast(text) {
        let toast = document.querySelector('.toast-tooltip');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-tooltip';
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }

    function filterSimilarColors(colors) {
        if (!colors || colors.length === 0) return [];

        // 1. Attach original index to preserve dominance info
        const indexedColors = colors.map((c, i) => ({ color: c, index: i }));

        // 2. Filter duplicates
        const threshold = 35; // Slightly relaxed to allow more nuance
        const filtered = [];

        for (const item of indexedColors) {
            let unique = true;
            for (const existing of filtered) {
                if (getPerceptualColorDistance(item.color, existing.color) < threshold) {
                    unique = false;
                    break;
                }
            }
            if (unique) {
                filtered.push(item);
            }
        }

        // 3. Smart Sort
        // We want to favor Dominance (low index) but give a boost to High Saturation
        return filtered.sort((a, b) => {
            const scoreA = calculateColorScore(a.color, a.index, colors.length);
            const scoreB = calculateColorScore(b.color, b.index, colors.length);
            return scoreB - scoreA; // Descending score
        }).map(item => item.color); // Extract colors back
    }

    function calculateColorScore(color, index, total) {
        const saturation = getColorSaturation(color);

        // Dominance score: 1.0 for first item, decays to 0
        const dominance = 1 - (index / total);

        // Weight: Dominance is king (0.7), Saturation is queen (0.3)
        // This ensures we don't put a tiny red pixel above a massive blue sky
        return (dominance * 0.7) + (saturation * 0.3);
    }

    // Perceptual color distance (weighted RGB approximation of LAB distance)
    function getPerceptualColorDistance(c1, c2) {
        const rMean = (c1[0] + c2[0]) / 2;
        const r = c1[0] - c2[0];
        const g = c1[1] - c2[1];
        const b = c1[2] - c2[2];

        // Weighted Euclidean distance that approximates human perception
        return Math.sqrt(
            (2 + rMean / 256) * r * r +
            4 * g * g +
            (2 + (255 - rMean) / 256) * b * b
        );
    }

    // Calculate color saturation (HSL)
    function getColorSaturation(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;

        if (max === min) return 0; // Grayscale

        const d = max - min;
        return l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }

    function getColorDistance(c1, c2) {
        return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2));
    }

    // --- Saving Logic (Simplified) ---
    async function saveAs4KImage(rgbStr, hexStr) {
        const canvas = document.createElement('canvas');
        canvas.width = 3840; canvas.height = 2160;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = rgbStr;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fileName = `PureColor - ${hexStr.slice(1)}.png`;
        const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));

        if ('showSaveFilePicker' in window) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                showToast('保存成功');
            } catch (e) { /* Cancelled */ }
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
        }
    }

    async function saveGradientAs4K(colors) {
        const canvas = document.createElement('canvas');
        canvas.width = 3840; canvas.height = 2160;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), `rgb(${c[0]}, ${c[1]}, ${c[2]})`));
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fileName = `Gradient - ${Date.now()}.png`;
        const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));

        // Fallback same as above...
        if ('showSaveFilePicker' in window) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                showToast('保存成功');
            } catch (e) { /* Cancelled */ }
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
            showToast('已下载渐变壁纸');
        }
    }

});