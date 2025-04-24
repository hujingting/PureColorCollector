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
    let currentMonth = -1;
    let monthSection;
    let gridContainer;

    birthdayColorsData.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    });

    birthdayColorsData.forEach(color => {
        if (color.month !== currentMonth) {
            currentMonth = color.month;
            // Create new month section
            monthSection = document.createElement('div');
            monthSection.className = 'month-section';

            const title = document.createElement('h2');
            title.className = 'month-title';
            title.textContent = months[currentMonth - 1]; // Array is 0-indexed
            monthSection.appendChild(title);

            gridContainer = document.createElement('div');
            gridContainer.className = 'birthday-colors-grid';
            monthSection.appendChild(gridContainer);

            container.appendChild(monthSection);
        }

        // Create color card
        const card = document.createElement('div');
        card.className = 'bday-color-card';
        card.innerHTML = `
            <div class="bday-color-preview" style="background-color: ${color.hex}" title="点击复制 ${color.hex}"></div>
            <div class="bday-color-info">
                <span class="bday-date">${color.month}月${color.day}日</span>
                <span class="bday-color-name">${color.name}</span>
                <span class="bday-color-hex">${color.hex}</span>
            </div>
        `;

        // Add copy functionality
        const preview = card.querySelector('.bday-color-preview');
        preview.addEventListener('click', () => {
            copyToClipboard(color.hex);
        });

        if (gridContainer) {
            gridContainer.appendChild(card);
        }
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
}); 