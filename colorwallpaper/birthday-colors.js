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
            { name: "葡萄鼠", desc: "戏剧化生活的实践者", hex: "#705B67", month: 1, day: 6 },
            { name: "漆黑", desc: "朝着目标挑战的富有想象力的热情家", hex: "#0D0015", month: 1, day: 7 },
            { name: "柠檬黄", desc: "热爱自然的抒情家", hex: "#b8c43a", month: 1, day: 8 },
            { name: "苔色", desc: "能感受到人温暖的人", hex: "#69821b", month: 1, day: 9 },
            { name: "草色", desc: "拥有广阔的情感世界", hex: "#7b8d42", month: 1, day: 10 },
            { name: "雾绿", desc: "创造新时代的理想人选", hex: "#bdd99f", month: 1, day: 11 },
            { name: "白緑", desc: "果敢的挑战者", hex: "#d6e9ca", month: 1, day: 12 },
            { name: "鹦鹉绿", desc: "拥有自己生活方式的独立者", hex: "#37a34a", month: 1, day: 13 },
            { name: "草绿色", desc: "等待情感成熟的艺术家", hex: "#7b8d44", month: 1, day: 14 },
            { name: "深緑", desc: "拥有如星星般闪耀的眼睛", hex: "#00552e", month: 1, day: 15 },
            { name: "白百合", desc: "热爱自然的实践者", hex: "#f0f6da", month: 1, day: 16 },
            { name: "萌黄色", desc: "勇气和好奇心的美食家", hex: "#006e54", month: 1, day: 17 },
            { name: "叶子", desc: "保持纯真之心的幼者", hex: "#47744b", month: 1, day: 18 },
            { name: "叶绿色", desc: "勤奋的人，尽全力做好每一件事", hex: "#9fc24d", month: 1, day: 19 },
            { name: "森林绿", desc: "有明确理想形象的人", hex: "#288c66", month: 1, day: 20 },
            { name: "天蓝色", desc: "感知美的能力", hex: "#a0d8ef", month: 1, day: 21 },
            { name: "浅葱色", desc: "有爱心的人", hex: "#00a3af", month: 1, day: 22 },
            { name: "露草", desc: "平和、冷静", hex: "#38a1db", month: 1, day: 23 },
            { name: "鸭毛颜色", desc: "乐观主义者，有快乐的梦想", hex: "#00688b", month: 1, day: 24 },
            { name: "浓蓝", desc: "能过上顺利生活的人", hex: "#0f2350", month: 1, day: 25 },
            { name: "奶油", desc: "阳光开朗的人", hex: "#e3d7a3", month: 1, day: 26 },
            { name: "淡柠檬", desc: "成熟的人", hex: "#fef400", month: 1, day: 27 },
            { name: "蒲公英色", desc: "天生乐观", hex: "#ffd900", month: 1, day: 28 },
            { name: "若草色", desc: "极具说服力", hex: "#c3d825", month: 1, day: 29 },
            { name: "草地绿", desc: "与植物和动物良好相处", hex: "#529c47", month: 1, day: 30 },
            { name: "若芽色", desc: "敏感浪漫", hex: "#e0ebaf", month: 1, day: 31 }
        ],
        // 二月
        '二月': [
            { name: "矢车菊蓝", desc: "受到社会高度认可的艺术家", hex: "#3f4e93", month: 2, day: 1 },
            { name: "若紫", desc: "在人群中脱颖而出的独特个体", hex: "#bc64a4", month: 2, day: 2 },
            { name: "深皇家蓝", desc: "天生的公主，知道自己的价值", hex: "#21297e", month: 2, day: 3 },
            { name: "红藤色", desc: "想要与众不同的人", hex: "#cca6bf", month: 2, day: 4 },
            { name: "紫三色堇", desc: "知道该走的路的灵感", hex: "#50347e", month: 2, day: 5 },
            { name: "淡紫色", desc: "具有激励他人力量的人", hex: "#debdd8", month: 2, day: 6 },
            { name: "莫贝特", desc: "具有强烈使命感的后起之秀", hex: "#b269a1", month: 2, day: 7 },
            { name: "勃艮第", desc: "擅长模仿的可爱恶作剧者", hex: "#6c2735", month: 2, day: 8 },
            { name: "紫红色", desc: "热情、活跃的人", hex: "#ea4a6e", month: 2, day: 9 },
            { name: "玫瑰红色", desc: "善良、乐于帮助和鼓励他人", hex: "#ea618e", month: 2, day: 10 },
            { name: "赤红", desc: "诚实的人，能够真正享受任何事物", hex: "#d3336f", month: 2, day: 11 },
            { name: "胭脂红", desc: "安静但积极主动", hex: "#d5345e", month: 2, day: 12 },
            { name: "莺色", desc: "重视并培养自身价值观的艺术家", hex: "#585b54", month: 2, day: 13 },
            { name: "海松色", desc: "具有城市情感的人", hex: "#726d40", month: 2, day: 14 },
            { name: "勿忘草色", desc: "谨慎的人，三思而后行", hex: "#89c3eb", month: 2, day: 15 },
            { name: "烟蓝色", desc: "勤奋努力，不断追求自我提升", hex: "#a4c1d7", month: 2, day: 16 },
            { name: "搪瓷", desc: "沉浸于事物的类型", hex: "#4c5e74", month: 2, day: 17 },
            { name: "巧克力", desc: "能够坚持自己想法的正确性", hex: "#6c3524", month: 2, day: 18 },
            { name: "绀色", desc: "聪明的人，知道自己要走的路", hex: "#223a70", month: 2, day: 19 },
            { name: "鸟之色", desc: "独特的个体，具有独特的感觉", hex: "#fff1cf", month: 2, day: 20 },
            { name: "聚光灯", desc: "个性鲜明、有主见的人", hex: "#fff799", month: 2, day: 21 },
            { name: "姜黄", desc: "有趣、追求新奇、乐观", hex: "#fabf14", month: 2, day: 22 },
            { name: "油菜花色", desc: "一个让人欢欣鼓舞的行动派男人", hex: "#ffec47", month: 2, day: 23 },
            { name: "铅绿", desc: "永远怀抱希望并努力前进的人", hex: "#d8e2ae", month: 2, day: 24 },
            { name: "雾白色", desc: "勤奋努力，坚持不懈地实现目标", hex: "#e5e8e1", month: 2, day: 25 },
            { name: "里叶色", desc: "即使面对最困难的问题，也会全力以赴的挑战者", hex: "#becebc", month: 2, day: 26 },
            { name: "柳茶", desc: "不受传统束缚的受欢迎男人", hex: "#a1a46d", month: 2, day: 27 },
            { name: "橄榄绿", desc: "重视与他人互动的人", hex: "#5f6527", month: 2, day: 28 },
            { name: "常春藤绿", desc: "关心朋友的人", hex: "#578a3d", month: 2, day: 29 },
        ],
        // 三月
        '三月': [
            { name: "一斤染", desc: "精力充沛，能激励他人", hex: "#f5b199", month: 3, day: 1 },
            { name: "淡粉色", desc: "让你想起幸福家庭的人", hex: "#fdede4", month: 3, day: 2 },
            { name: "鸨色", desc: "当一个人知道自己被爱时，他会闪耀美丽的光芒", hex: "#f4b3c2", month: 3, day: 3 },
            { name: "罂粟红", desc: "不满足于平庸的人", hex: "#ea5550", month: 3, day: 4 },
            { name: "樱桃红", desc: "脚踏实地，心态坚强", hex: "#cf0125", month: 3, day: 5 },
            { name: "樱色", desc: "具有激励他人力量的人", hex: "#fef4f4", month: 3, day: 6 },
            { name: "鲑鱼粉色", desc: "真心祝福别人幸福的人", hex: "#f3a68c", month: 3, day: 7 },
            { name: "红梅色", desc: "充满爱心的女性", hex: "#f2a0a1", month: 3, day: 8 },
            { name: "珊瑚色", desc: "行动派，努力实现梦想", hex: "#f5b1aa", month: 3, day: 9 },
            { name: "信号红", desc: "精力充沛、活跃于多个领域的人", hex: "#e8383d", month: 3, day: 10 },
            { name: "砥粉色", desc: "热情大方", hex: "#f4dda5", month: 3, day: 11 },
            { name: "橙朱红色", desc: "引导人们走向正确方向的天使", hex: "#e65454", month: 3, day: 12 },
            { name: "柿色", desc: "精力充沛、健康的人", hex: "#ed6d3d", month: 3, day: 13 },
            { name: "猩红", desc: "充满活力、精力充沛、积极", hex: "#e23620", month: 3, day: 14 },
            { name: "胭脂", desc: "热情、随性", hex: "#d11c1e", month: 3, day: 15 },
            { name: "淡红色的紫藤", desc: "直率，身心女性化的人", hex: "#d2a4c8", month: 3, day: 16 },
            { name: "淡紫色", desc: "不断创造新事物的创造者", hex: "#915da3", month: 3, day: 17 },
            { name: "紫风铃草", desc: "对一切都敏感的神秘人", hex: "#985b9e", month: 3, day: 18 },
            { name: "碧柔", desc: "内心平静、美丽的人，如湖水般", hex: "#581074", month: 3, day: 19 },
            { name: "古代紫", desc: "总能冷静做出决定的人", hex: "#895b8a", month: 3, day: 20 },
            { name: "淡兰花", desc: "使周围环境更加美丽的人", hex: "#aaa7d0", month: 3, day: 21 },
            { name: "深层移动", desc: "受人喜爱、受人欢迎的人", hex: "#ba64a0", month: 3, day: 22 },
            { name: "江戸紫", desc: "有尊严、永不忘乎所以的人", hex: "#745399", month: 3, day: 23 },
            { name: "锦葵", desc: "浪漫主义者寻求真正的朋友", hex: "#934491", month: 3, day: 24 },
            { name: "酒红色", desc: "以直觉和权威著称的艺术家", hex: "#b33e5c", month: 3, day: 25 },
            { name: "银绿色", desc: "努力工作，勇于挑战", hex: "#cae2c6", month: 3, day: 26 },
            { name: "蛋白石绿", desc: "如花的生命般美丽的人", hex: "#bee0ce", month: 3, day: 27 },
            { name: "淡绿色", desc: "叶子散发出神秘的香味", hex: "#a7d3cf", month: 3, day: 28 },
            { name: "喷绿", desc: "能够轻松解决复杂问题的人", hex: "#a3d3dd", month: 3, day: 29 },
            { name: "淡蓝色", desc: "培养创造力的浪漫主义者", hex: "#49bdf0", month: 3, day: 30 },
            { name: "稻草", desc: "行动自如的运动员", hex: "#ece093", month: 3, day: 31 }
        ],
        // 四月
        '四月': [
            { name: "淡樱花", desc: "营造幸福氛围的浪漫主义者", hex: "#fdeff2", month: 4, day: 1 },
            { name: "贝壳粉红", desc: "勤奋工作，善于表达情感", hex: "#fbdac8", month: 4, day: 2 },
            { name: "紫红色", desc: "对趋势有敏锐感知的人", hex: "#f5a0bd", month: 4, day: 3 },
            { name: "深兰花粉色", desc: "热情好客", hex: "#e383a4", month: 4, day: 4 },
            { name: "青藤色", desc: "注重细节的最佳着装者", hex: "#84a2d4", month: 4, day: 5 },
            { name: "粉笔蓝", desc: "追求美感，脱离现实的人", hex: "#68a9cf", month: 4, day: 6 },
            { name: "白百合", desc: "勤奋，对很多事情感兴趣，善于提出新想法", hex: "#f1f5dc", month: 4, day: 7 },
            { name: "浅绿色", desc: "散发出温暖和热情气息的人", hex: "#69b076", month: 4, day: 8 },
            { name: "栀子花", desc: "能够根据具体情况采取行动的人", hex: "#fbca4d", month: 4, day: 9 },
            { name: "南瓜", desc: "充分掌握年轻一代情感的先驱者", hex: "#e5a323", month: 4, day: 10 },
            { name: "蒸栗色", desc: "可靠且知识渊博的工匠", hex: "#ecdecf", month: 4, day: 11 },
            { name: "利休白茶", desc: "自信且尊重传统的工匠", hex: "#a29779", month: 4, day: 12 },
            { name: "霜灰色", desc: "敏感、幽默、生活经历丰富", hex: "#e8ece9", month: 4, day: 13 },
            { name: "鼠色", desc: "俘获人心的天女", hex: "#949495", month: 4, day: 14 },
            { name: "淡雾白", desc: "正义感强、责任感强的人", hex: "#d5dad4", month: 4, day: 15 },
            { name: "天空灰", desc: "温和且能出色地完成工作", hex: "#cbd0d3", month: 4, day: 16 },
            { name: "战舰灰色", desc: "性格：沉稳，不被任何障碍所吓倒", hex: "#898989", month: 4, day: 17 },
            { name: "板岩灰色", desc: "行动派，为了获得快乐而勇往直前", hex: "#626063", month: 4, day: 18 },
            { name: "消炭色", desc: "有洞察力和技巧的人", hex: "#524e4d", month: 4, day: 19 },
            { name: "若苗色", desc: "拥有纯粹而闪耀感性的人", hex: "#c7dc68", month: 4, day: 20 },
            { name: "若菜色", desc: "诚实的人，总是采取坦率的态度", hex: "#d8e698", month: 4, day: 21 },
            { name: "鹦绿", desc: "喜欢工作的人", hex: "#2aa74b", month: 4, day: 22 },
            { name: "苇叶色", desc: "值得信赖、赢得社会信任的人", hex: "#88cb9d", month: 4, day: 23 },
            { name: "豆芽", desc: "善良，热爱文学", hex: "#a3d49c", month: 4, day: 24 },
            { name: "埃尔布", desc: "在工作中感受到成就感的挑战者", hex: "#79c288", month: 4, day: 25 },
            { name: "深豌豆绿", desc: "勤奋工作，永不忘记磨练自己的才能", hex: "#79c266", month: 4, day: 26 },
            { name: "翡翠绿", desc: "追求梦想、勇于挑战的人", hex: "#00a968", month: 4, day: 27 },
            { name: "绿松石绿", desc: "有创意的人，能制定出各种各样的计划", hex: "#00947a", month: 4, day: 28 },
            { name: "浅蓝色", desc: "敏感的人", hex: "#00a6af", month: 4, day: 29 },
            { name: "天蓝色", desc: "不断成长的人（永不满足，永不妥协）", hex: "#00b2bc", month: 4, day: 30 },
        ],
        // 五月
        '五月': [
            { name: "绿松石", desc: "深受大家喜爱的人气角色", hex: "#009b9f", month: 5, day: 1 },
            { name: "孔雀石绿", desc: "天生善于社交但不喜欢噪音的人", hex: "#009854", month: 5, day: 2 },
            { name: "青绿色", desc: "向往清澈溪水和耕地的田园牧歌", hex: "#01686d", month: 5, day: 3 },
            { name: "小鸭色", desc: "掌握公平、诚实胜利关键的人", hex: "#014127", month: 5, day: 4 },
            { name: "浅蓝色", desc: "能将想法变成现实的艺术家", hex: "#bce2e8", month: 5, day: 5 },
            { name: "勿忘我坚果蓝", desc: "展现才华的同时又保留女性气质的人", hex: "#70c6f5", month: 5, day: 6 },
            { name: "群青色", desc: "麦当娜知道自己的长处，并因此受到称赞", hex: "#4c6cb3", month: 5, day: 7 },
            { name: "绿千岁", desc: "麦当娜知道自己的长处，并因此受到称赞", hex: "#316745", month: 5, day: 8 },
            { name: "长尾小鹦鹉绿", desc: "和谐平衡、活跃", hex: "#2cb232", month: 5, day: 9 },
            { name: "蛋壳", desc: "值得信赖的人，不会轻易陷入爱情", hex: "#f5f6ca", month: 5, day: 10 },
            { name: "生菜绿", desc: "敢于接受新挑战、做好失败准备的挑战者", hex: "#d1de4c", month: 5, day: 11 },
            { name: "黄绿色", desc: "真诚又善于社交的人", hex: "#e3e548", month: 5, day: 12 },
            { name: "枯草色", desc: "有才华，能准确表达自己的想法", hex: "#e4dc8a", month: 5, day: 13 },
            { name: "橄榄绿", desc: "热爱花草并懂得种植花草乐趣的自然主义者", hex: "#72640c", month: 5, day: 14 },
            { name: "殖民地黄", desc: "雄心勃勃、不断努力获取知识的人", hex: "#d0c67c", month: 5, day: 15 },
            { name: "淡芥末", desc: "坚强、固执、技术娴熟的人", hex: "#a49627", month: 5, day: 16 },
            { name: "金赭石", desc: "固执，不愿在自己的观点上妥协", hex: "#8d6f2f", month: 5, day: 17 },
            { name: "橄榄茶", desc: "知识渊博、温和", hex: "#464646", month: 5, day: 18 },
            { name: "千歳茶", desc: "善于处理任何问题的人", hex: "#494a41", month: 5, day: 19 },
            { name: "深海蓝", desc: "多情的幸福女神", hex: "#8ccab0", month: 5, day: 20 },
            { name: "绿赏色", desc: "积极向上、总是寻求刺激和兴奋的人", hex: "#47885e", month: 5, day: 21 },
            { name: "云杉绿", desc: "热心肠，无条件地爱人", hex: "#036122", month: 5, day: 22 },
            { name: "深绿色", desc: "性格开朗，心胸宽广，不批评别人", hex: "#034415", month: 5, day: 23 },
            { name: "豆芽", desc: "善良，热爱文学", hex: "#a3d49c", month: 5, day: 24 },
            { name: "埃尔布", desc: "在工作中感受到成就感的挑战者", hex: "#79c288", month: 5, day: 25 },
            { name: "深豌豆绿", desc: "勤奋工作，永不忘记磨练自己的才能", hex: "#79c266", month: 5, day: 26 },
            { name: "翡翠绿", desc: "追求梦想、勇于挑战的人", hex: "#00a968", month: 5, day: 27 },
            { name: "绿松石绿", desc: "有创意的人，能制定出各种各样的计划", hex: "#00947a", month: 5, day: 28 },
            { name: "浅蓝色", desc: "敏感的人", hex: "#00a6af", month: 5, day: 29 },
            { name: "天蓝色", desc: "不断成长的人（永不满足，永不妥协）", hex: "#00b2bc", month: 5, day: 30 },
        ],
        // 六月
        '六月': [
            { name: "淡番红花", desc: "女人中的贵妇", hex: "#bea2ca", month: 6, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 七月
        '七月': [
            { name: "鸭蓝色", desc: "将地球视为单一生命体的生态学家", hex: "#007199", month: 7, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 八月
        '八月': [
            { name: "蓝壳", desc: "善于交际，能真诚地与任何人交往", hex: "#438cb5", month: 8, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 九月
        '九月': [
            { name: "新鲜绿", desc: "言情小说女主角，声音甜美温柔", hex: "#7dbb7c", month: 9, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 十月
        '十月': [
            { name: "黄丹", desc: "活跃，擅长艺术和体育", hex: "#ee7948", month: 10, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 十一月
        '十一月': [
            { name: "駱駝色", desc: "自信、精力充沛、有才华的人。", hex: "#bf794e", month: 11, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
        ],
        // 十二月
        '十二月': [
            { name: "亜麻色", desc: "对美着迷的艺术家", hex: "#d6c6af", month: 12, day: 1 },
            { name: "", desc: "", hex: "#", month: 2, day: 2 },
            { name: "", desc: "", hex: "#", month: 2, day: 3 },
            { name: "", desc: "", hex: "#", month: 2, day: 4 },
            { name: "", desc: "", hex: "#", month: 2, day: 5 },
            { name: "", desc: "", hex: "#", month: 2, day: 6 },
            { name: "", desc: "", hex: "#", month: 2, day: 7 },
            { name: "", desc: "", hex: "#", month: 2, day: 8 },
            { name: "", desc: "", hex: "#", month: 2, day: 9 },
            { name: "", desc: "", hex: "#", month: 2, day: 10 },
            { name: "", desc: "", hex: "#", month: 2, day: 11 },
            { name: "", desc: "", hex: "#", month: 2, day: 12 },
            { name: "", desc: "", hex: "#", month: 2, day: 13 },
            { name: "", desc: "", hex: "#", month: 2, day: 14 },
            { name: "", desc: "", hex: "#", month: 2, day: 15 },
            { name: "", desc: "", hex: "#", month: 2, day: 16 },
            { name: "", desc: "", hex: "#", month: 2, day: 17 },
            { name: "", desc: "", hex: "#", month: 2, day: 18 },
            { name: "", desc: "", hex: "#", month: 2, day: 19 },
            { name: "", desc: "", hex: "#", month: 2, day: 20 },
            { name: "", desc: "", hex: "#", month: 2, day: 21 },
            { name: "", desc: "", hex: "#", month: 2, day: 22 },
            { name: "", desc: "", hex: "#", month: 2, day: 23 },
            { name: "", desc: "", hex: "#", month: 2, day: 24 },
            { name: "", desc: "", hex: "#", month: 2, day: 25 },
            { name: "", desc: "", hex: "#", month: 2, day: 26 },
            { name: "", desc: "", hex: "#", month: 2, day: 27 },
            { name: "", desc: "", hex: "#", month: 2, day: 28 },
            { name: "", desc: "", hex: "#", month: 2, day: 29 },
            { name: "", desc: "", hex: "#", month: 2, day: 30 },
            { name: "", desc: "", hex: "#", month: 2, day: 31 }
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