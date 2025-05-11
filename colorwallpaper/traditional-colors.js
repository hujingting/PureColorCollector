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
            { name: "盈盈", pinyin: "", hex: "#F9D3E3", rgb: [] },
            { name: "水红", pinyin: "", hex: "#ECB0C1", rgb: [] },
            { name: "苏梅", pinyin: "", hex: "#DD7694", rgb: [] },
            { name: "紫茎屏风", pinyin: "", hex: "#A76283", rgb: [] },
            { name: "葭灰", pinyin: "", hex: "#BEB1AA", rgb: [] },
            { name: "黄埃", pinyin: "", hex: "#B49273", rgb: [] },
            { name: "老僧衣", pinyin: "", hex: "#A46244", rgb: [] },
            { name: "玄天", pinyin: "", hex: "#6B5458", rgb: [] },
            { name: "黄河琉璃", pinyin: "", hex: "#E5A84B", rgb: [] },
            { name: "库金", pinyin: "", hex: "#E18A3B", rgb: [] },
            { name: "缊韨", pinyin: "", hex: "#984F31", rgb: [] },
            { name: "紫瓯", pinyin: "", hex: "#7C461E", rgb: [] },
            { name: "欧碧", pinyin: "", hex: "#C0D695", rgb: [] },
            { name: "春辰", pinyin: "", hex: "#A9BE7B", rgb: [] },
            { name: "碧山", pinyin: "", hex: "#779649", rgb: [] },
            { name: "青青", pinyin: "", hex: "#4F6F46", rgb: [] }
        ],
        // 惊蛰：唤醒、复苏
        '惊蛰': [
            // { name: "春芽绿", pinyin: "chūn yá lǜ", hex: "#96C24E", rgb: [150, 194, 78] },
            // { name: "嫩芽绿", pinyin: "nèn yá lǜ", hex: "#BCE672", rgb: [188, 230, 114] },
            // { name: "芽绿", pinyin: "yá lǜ", hex: "#9FC343", rgb: [159, 195, 67] }
            { name: "赤缇", pinyin: "", hex: "#BA5B49", rgb: [] },
            { name: "朱草", pinyin: "", hex: "#A64036", rgb: [] },
            { name: "綪茷", pinyin: "", hex: "#9E2A22", rgb: [] },
            { name: "顺圣", pinyin: "", hex: "#7C191E", rgb: [] },
            { name: "桃夭", pinyin: "", hex: "#F6BEC8", rgb: [] },
            { name: "杨妃", pinyin: "", hex: "#F091A0", rgb: [] },
            { name: "长春", pinyin: "", hex: "#DC6B82", rgb: [] },
            { name: "牙绯", pinyin: "", hex: "#C35C5D", rgb: [] },
            { name: "黄栗留", pinyin: "", hex: "#FEDC5E", rgb: [] },
            { name: "栀子", pinyin: "", hex: "#FAC03D", rgb: [] },
            { name: "黄不老", pinyin: "", hex: "#DB9B34", rgb: [] },
            { name: "柘黄", pinyin: "", hex: "#C67915", rgb: [] },
            { name: "青鸾", pinyin: "", hex: "#9AA7B1", rgb: [] },
            { name: "菘蓝", pinyin: "", hex: "#6B798E", rgb: [] },
            { name: "青黛", pinyin: "", hex: "#45465E", rgb: [] },
            { name: "绀蝶", pinyin: "", hex: "#2C2F3B", rgb: [] }
        ],
        // 春分：平衡、和谐
        '春分': [
            // { name: "春绿", pinyin: "chūn lǜ", hex: "#0AA344", rgb: [10, 163, 68] },
            // { name: "玉色", pinyin: "yù sè", hex: "#BCE0D1", rgb: [188, 224, 209] },
            // { name: "青玉", pinyin: "qīng yù", hex: "#41B349", rgb: [65, 179, 73] }

            { name: "皦玉", pinyin: "", hex: "#EBEEE8", rgb: [] },
            { name: "吉量", pinyin: "", hex: "#EBEDDF", rgb: [] },
            { name: "韶粉", pinyin: "", hex: "#E0E0D0", rgb: [] },
            { name: "霜地", pinyin: "", hex: "#C7C6B6", rgb: [] },
            { name: "夏籥", pinyin: "", hex: "#D2AF9D", rgb: [] },
            { name: "紫磨金", pinyin: "", hex: "#BC836B", rgb: [] },
            { name: "檀色", pinyin: "", hex: "#B26D5D", rgb: [] },
            { name: "赭罗", pinyin: "", hex: "#9A6655", rgb: [] },
            { name: "黄丹", pinyin: "", hex: "#EA5514", rgb: [] },
            { name: "洛神珠", pinyin: "", hex: "#D23918", rgb: [] },
            { name: "丹雘", pinyin: "", hex: "#C8161D", rgb: [] },
            { name: "水华朱", pinyin: "", hex: "#A72126", rgb: [] },
            { name: "青冥", pinyin: "", hex: "#3271AE", rgb: [] },
            { name: "青雘", pinyin: "", hex: "#007175", rgb: [] },
            { name: "青緺", pinyin: "", hex: "#284852", rgb: [] },
            { name: "骐驎", pinyin: "", hex: "#12264F", rgb: [] }
        ],
        // 清明：明净、清澈
        '清明': [
            // { name: "青碧", pinyin: "qīng bì", hex: "#48C0A3", rgb: [72, 192, 163] },
            // { name: "碧绿", pinyin: "bì lǜ", hex: "#1BD1A5", rgb: [27, 209, 165] },
            // { name: "青水", pinyin: "qīng shuǐ", hex: "#93D5DC", rgb: [147, 213, 220] }

            { name: "紫蒲", pinyin: "", hex: "#A6559D", rgb: [] },
            { name: "赪紫", pinyin: "", hex: "#8A1874", rgb: [] },
            { name: "齐紫", pinyin: "", hex: "#6C216D", rgb: [] },
            { name: "凝夜紫", pinyin: "", hex: "#422256", rgb: [] },
            { name: "冻缥", pinyin: "", hex: "#9D9D82", rgb: [] },
            { name: "春碧", pinyin: "", hex: "#9D9D82", rgb: [] },
            { name: "执大象", pinyin: "", hex: "#919177", rgb: [] },
            { name: "苔古", pinyin: "", hex: "#79836C", rgb: [] },
            { name: "香炉紫烟", pinyin: "", hex: "#D3CCD6", rgb: [] },
            { name: "紫菂", pinyin: "", hex: "#9B8EA9", rgb: [] },
            { name: "拂紫绵", pinyin: "", hex: "#7E527F", rgb: [] },
            { name: "三公子", pinyin: "", hex: "#663D74", rgb: [] },
            { name: "琅玕紫", pinyin: "", hex: "#CB5C83", rgb: [] },
            { name: "红踯躅", pinyin: "", hex: "#B83570", rgb: [] },
            { name: "魏红", pinyin: "", hex: "#A73766", rgb: [] },
            { name: "魏紫", pinyin: "", hex: "#903754", rgb: [] }
        ],
        // 谷雨：生机、繁茂
        '谷雨': [
            // { name: "葱青", pinyin: "cōng qīng", hex: "#789262", rgb: [120, 146, 98] },
            // { name: "葱绿", pinyin: "cōng lǜ", hex: "#9DC62E", rgb: [157, 198, 46] },
            // { name: "松花绿", pinyin: "sōng huā lǜ", hex: "#BCE672", rgb: [188, 230, 114] }

            { name: "昌荣", pinyin: "", hex: "#DCC7E1", rgb: [] },
            { name: "紫薄汗", pinyin: "", hex: "#BBA1CB", rgb: [] },
            { name: "茈藐", pinyin: "", hex: "#A67EB7", rgb: [] },
            { name: "紫紶", pinyin: "", hex: "#7D5284", rgb: [] },
            { name: "苍葭", pinyin: "", hex: "#A8BF8F", rgb: [] },
            { name: "庭芜绿", pinyin: "", hex: "#68945C", rgb: [] },
            { name: "翠微", pinyin: "", hex: "#4C8045", rgb: [] },
            { name: "翠虬", pinyin: "", hex: "#446A37", rgb: [] },
            { name: "碧落", pinyin: "", hex: "#AED0EE", rgb: [] },
            { name: "挼蓝", pinyin: "", hex: "#6E9BC5", rgb: [] },
            { name: "青雀头黛", pinyin: "", hex: "#354E6B", rgb: [] },
            { name: "螺子黛", pinyin: "", hex: "#13393E", rgb: [] },
            { name: "露褐", pinyin: "", hex: "#BD8253", rgb: [] },
            { name: "檀褐", pinyin: "", hex: "#945635", rgb: [] },
            { name: "緅絺", pinyin: "", hex: "#804C2E", rgb: [] },
            { name: "目童子", pinyin: "", hex: "#5B3222", rgb: [] }

        ],
        // 立夏：炽热、明亮
        '立夏': [
            // { name: "火红", pinyin: "huǒ hóng", hex: "#FF2D51", rgb: [255, 45, 81] },
            // { name: "朱红", pinyin: "zhū hóng", hex: "#FF4C00", rgb: [255, 76, 0] },
            // { name: "丹", pinyin: "dān", hex: "#FF4E20", rgb: [255, 78, 32] }

            { name: "青粲", pinyin: "", hex: "#C3D94E", rgb: [] },
            { name: "翠缥", pinyin: "", hex: "#B7D332", rgb: [] },
            { name: "人籁", pinyin: "", hex: "#9EBC19", rgb: [] },
            { name: "水龙吟", pinyin: "", hex: "#84A729", rgb: [] },
            { name: "地籁", pinyin: "", hex: "#DFCEB4", rgb: [] },
            { name: "大块", pinyin: "", hex: "#BFA782", rgb: [] },
            { name: "养生主", pinyin: "", hex: "#B49B7F", rgb: [] },
            { name: "大云", pinyin: "", hex: "#94784F", rgb: [] },
            { name: "溶溶月", pinyin: "", hex: "#BEC2BC", rgb: [] },
            { name: "绍衣", pinyin: "", hex: "#A8A19C", rgb: [] },
            { name: "石莲褐", pinyin: "", hex: "#92897B", rgb: [] },
            { name: "黑朱", pinyin: "", hex: "#70695D", rgb: [] },
            { name: "朱颜酡", pinyin: "", hex: "#F29A76", rgb: [] },
            { name: "苕荣", pinyin: "", hex: "#ED6D3D", rgb: [] },
            { name: "檎丹", pinyin: "", hex: "#E94829", rgb: [] },
            { name: "丹罽", pinyin: "", hex: "#E60012", rgb: [] }
        ],
        // 小满：饱满、充实
        '小满': [
            // { name: "金黄", pinyin: "jīn huáng", hex: "#FFB61E", rgb: [255, 182, 30] },
            // { name: "赤金", pinyin: "chì jīn", hex: "#F2BE45", rgb: [242, 190, 69] },
            // { name: "雄黄", pinyin: "xióng huáng", hex: "#FF9900", rgb: [255, 153, 0] }

            { name: "彤管", pinyin: "", hex: "#E2A2AC", rgb: [] },
            { name: "渥赭", pinyin: "", hex: "#DD6B7B", rgb: [] },
            { name: "唇脂", pinyin: "", hex: "#C25160", rgb: [] },
            { name: "朱孔阳", pinyin: "", hex: "#B81A35", rgb: [] },
            { name: "石发", pinyin: "", hex: "#6A8D52", rgb: [] },
            { name: "漆姑", pinyin: "", hex: "#5D8351", rgb: [] },
            { name: "芰荷", pinyin: "", hex: "#4F794A", rgb: [] },
            { name: "官绿", pinyin: "", hex: "#2A6E3F", rgb: [] },
            { name: "仙米", pinyin: "", hex: "#D4C9AA", rgb: [] },
            { name: "黄螺", pinyin: "", hex: "#B4A379", rgb: [] },
            { name: "降真香", pinyin: "", hex: "#9E8358", rgb: [] },
            { name: "远志", pinyin: "", hex: "#81663B", rgb: [] },
            { name: "嫩鹅黄", pinyin: "", hex: "#F2C867", rgb: [] },
            { name: "鞠衣", pinyin: "", hex: "#D3A237", rgb: [] },
            { name: "郁金裙", pinyin: "", hex: "#D08635", rgb: [] },
            { name: "黄流", pinyin: "", hex: "#9F6027", rgb: [] }
        ],
        // 芒种：成熟、丰收
        '芒种': [
            // { name: "麦秆黄", pinyin: "mài gǎn huáng", hex: "#F8DF70", rgb: [248, 223, 112] },
            // { name: "油黄", pinyin: "yóu huáng", hex: "#FFB61E", rgb: [255, 182, 30] },
            // { name: "杏黄", pinyin: "xìng huáng", hex: "#FFA631", rgb: [255, 166, 49] }

            { name: "筠雾", pinyin: "", hex: "#D5D1AE", rgb: [] },
            { name: "瓷秘", pinyin: "", hex: "#BFC096", rgb: [] },
            { name: "琬琰", pinyin: "", hex: "#A9A886", rgb: [] },
            { name: "青圭", pinyin: "", hex: "#92905D", rgb: [] },
            { name: "鸣珂", pinyin: "", hex: "#B3B59C", rgb: [] },
            { name: "青玉案", pinyin: "", hex: "#A8B092", rgb: [] },
            { name: "出岫", pinyin: "", hex: "#A9A773", rgb: [] },
            { name: "风入松", pinyin: "", hex: "#868C4E", rgb: [] },
            { name: "如梦令", pinyin: "", hex: "#DDBB99", rgb: [] },
            { name: "芸黄", pinyin: "", hex: "#D2A36C", rgb: [] },
            { name: "金埒", pinyin: "", hex: "#BE9457", rgb: [] },
            { name: "雌黄", pinyin: "", hex: "#B4884D", rgb: [] },
            { name: "曾青", pinyin: "", hex: "#535164", rgb: [] },
            { name: "䒌靘", pinyin: "", hex: "#454659", rgb: [] },
            { name: "璆琳", pinyin: "", hex: "#343041", rgb: [] },
            { name: "瑾瑜", pinyin: "", hex: "#1E2732", rgb: [] }

        ],
        // 夏至：极盛、炽烈
        '夏至': [
            // { name: "正红", pinyin: "zhèng hóng", hex: "#FF0000", rgb: [255, 0, 0] },
            // { name: "赤红", pinyin: "chì hóng", hex: "#FF3300", rgb: [255, 51, 0] },
            // { name: "绛红", pinyin: "jiàng hóng", hex: "#8C4356", rgb: [140, 67, 86] }

            { name: "赩炽", pinyin: "", hex: "#CB523E", rgb: [] },
            { name: "石榴裙", pinyin: "", hex: "#B13B2E", rgb: [] },
            { name: "朱湛", pinyin: "", hex: "#95302E", rgb: [] },
            { name: "大繎", pinyin: "", hex: "#822327", rgb: [] },
            { name: "月魄", pinyin: "", hex: "#B2B6B6", rgb: [] },
            { name: "不皂", pinyin: "", hex: "#A7AAA1", rgb: [] },
            { name: "雷雨垂", pinyin: "", hex: "#7A7B78", rgb: [] },
            { name: "石涅", pinyin: "", hex: "#686A67", rgb: [] },
            { name: "扶光", pinyin: "", hex: "#F0C2A2", rgb: [] },
            { name: "椒房", pinyin: "", hex: "#DB9C5E", rgb: [] },
            { name: "红友", pinyin: "", hex: "#D9883D", rgb: [] },
            { name: "光明砂", pinyin: "", hex: "#CC5D20", rgb: [] },
            { name: "山矾", pinyin: "", hex: "#F5F3F2", rgb: [] },
            { name: "玉頩", pinyin: "", hex: "#EAE5E3", rgb: [] },
            { name: "二目鱼", pinyin: "", hex: "#DFE0D9", rgb: [] },
            { name: "明月珰", pinyin: "", hex: "#D4D3CA", rgb: [] }
        ],
        // 小暑：炎热、明艳
        '小暑': [
            // { name: "海棠红", pinyin: "hǎi táng hóng", hex: "#DB5A6B", rgb: [219, 90, 107] },
            // { name: "茜色", pinyin: "qiàn sè", hex: "#CB3A56", rgb: [203, 58, 86] },
            // { name: "火红", pinyin: "huǒ hóng", hex: "#FF2D51", rgb: [255, 45, 81] }

            { name: "骍刚", pinyin: "", hex: "#F5B087", rgb: [] },
            { name: "赪霞", pinyin: "", hex: "#F18F60", rgb: [] },
            { name: "赪尾", pinyin: "", hex: "#EF845D", rgb: [] },
            { name: "朱柿", pinyin: "", hex: "#ED6D46", rgb: [] },
            { name: "天球", pinyin: "", hex: "#E0DFC6", rgb: [] },
            { name: "行香子", pinyin: "", hex: "#BFB99C", rgb: [] },
            { name: "王刍", pinyin: "", hex: "#A99F70", rgb: [] },
            { name: "荩箧", pinyin: "", hex: "#877D52", rgb: [] },
            { name: "赤灵", pinyin: "", hex: "#954024", rgb: [] },
            { name: "丹秫", pinyin: "", hex: "#873424", rgb: [] },
            { name: "木兰", pinyin: "", hex: "#662B1F", rgb: [] },
            { name: "麒麟竭", pinyin: "", hex: "#4C1E1A", rgb: [] },
            { name: "柔蓝", pinyin: "", hex: "#106898", rgb: [] },
            { name: "碧城", pinyin: "", hex: "#12507B", rgb: [] },
            { name: "蓝采和", pinyin: "", hex: "#06436F", rgb: [] },
            { name: "帝释青", pinyin: "", hex: "#003460", rgb: [] }
        ],
        // 大暑：酷暑、炙烤
        '大暑': [
            // { name: "赫赤", pinyin: "hè chì", hex: "#C91F37", rgb: [201, 31, 55] },
            // { name: "银朱", pinyin: "yín zhū", hex: "#FF461F", rgb: [255, 70, 31] },
            // { name: "朱砂", pinyin: "zhū shā", hex: "#FF4C00", rgb: [255, 76, 0] }

            { name: "夕岚", pinyin: "", hex: "#E3ADB9", rgb: [] },
            { name: "雌霓", pinyin: "", hex: "#CF929E", rgb: [] },
            { name: "绛纱", pinyin: "", hex: "#B27777", rgb: [] },
            { name: "茹藘", pinyin: "", hex: "#A35F65", rgb: [] },
            { name: "葱青", pinyin: "", hex: "#EDF1BB", rgb: [] },
            { name: "少艾", pinyin: "", hex: "#E3EB98", rgb: [] },
            { name: "绮钱", pinyin: "", hex: "#D8DE8A", rgb: [] },
            { name: "翠樽", pinyin: "", hex: "#CDD171", rgb: [] },
            { name: "石蜜", pinyin: "", hex: "#D4BF89", rgb: [] },
            { name: "沙饧", pinyin: "", hex: "#BFA670", rgb: [] },
            { name: "巨吕", pinyin: "", hex: "#AA8E59", rgb: [] },
            { name: "吉金", pinyin: "", hex: "#896D47", rgb: [] },
            { name: "山岚", pinyin: "", hex: "#BED2BB", rgb: [] },
            { name: "渌波", pinyin: "", hex: "#9BB496", rgb: [] },
            { name: "青楸", pinyin: "", hex: "#81A380", rgb: [] },
            { name: "菉竹", pinyin: "", hex: "#698E6A", rgb: [] }
        ],
        // 立秋：萧瑟、肃清
        '立秋': [
            // { name: "栗色", pinyin: "lì sè", hex: "#60281E", rgb: [96, 40, 30] },
            // { name: "玄色", pinyin: "xuán sè", hex: "#622A1D", rgb: [98, 42, 29] },
            // { name: "紫檀", pinyin: "zǐ tán", hex: "#4C221B", rgb: [76, 34, 27] }

            { name: "窃蓝", pinyin: "", hex: "#88ABDA", rgb: [] },
            { name: "监德", pinyin: "", hex: "#6F94CD", rgb: [] },
            { name: "苍苍", pinyin: "", hex: "#5976BA", rgb: [] },
            { name: "群青", pinyin: "", hex: "#2E59A7", rgb: [] },
            { name: "白青", pinyin: "", hex: "#98B6C2", rgb: [] },
            { name: "竹月", pinyin: "", hex: "#7F9FAF", rgb: [] },
            { name: "空青", pinyin: "", hex: "#66889E", rgb: [] },
            { name: "太师青", pinyin: "", hex: "#547689", rgb: [] },
            { name: "缟羽", pinyin: "", hex: "#EFEFEF", rgb: [] },
            { name: "香皮", pinyin: "", hex: "#D8D1C5", rgb: [] },
            { name: "云母", pinyin: "", hex: "#C6BEB1", rgb: [] },
            { name: "佩玖", pinyin: "", hex: "#AC9F8A", rgb: [] },
            { name: "麹尘", pinyin: "", hex: "#C0D09D", rgb: [] },
            { name: "绿沈", pinyin: "", hex: "#938F4C", rgb: [] },
            { name: "绞衣", pinyin: "", hex: "#7F754C", rgb: [] },
            { name: "素綦", pinyin: "", hex: "#595333", rgb: [] }
        ],
        // 处暑：凉爽、清和
        '处暑': [
            // { name: "秋蓝", pinyin: "qiū lán", hex: "#8FB2C9", rgb: [143, 178, 201] },
            // { name: "靛青", pinyin: "diàn qīng", hex: "#177CB0", rgb: [23, 124, 176] },
            // { name: "群青", pinyin: "qún qīng", hex: "#4C8DAE", rgb: [76, 141, 174] }

            { name: "退红", pinyin: "", hex: "#F0CFE3", rgb: [] },
            { name: "樱花", pinyin: "", hex: "#E4B8D5", rgb: [] },
            { name: "丁香", pinyin: "", hex: "#CE93BF", rgb: [] },
            { name: "木槿", pinyin: "", hex: "#BA79B1", rgb: [] },
            { name: "余白", pinyin: "", hex: "#C9CFC1", rgb: [] },
            { name: "兰苕", pinyin: "", hex: "#A8B78C", rgb: [] },
            { name: "碧滋", pinyin: "", hex: "#90A07D", rgb: [] },
            { name: "葱倩", pinyin: "", hex: "#6C8650", rgb: [] },
            { name: "云门", pinyin: "", hex: "#A2D2E2", rgb: [] },
            { name: "西子", pinyin: "", hex: "#87C0CA", rgb: [] },
            { name: "天水碧", pinyin: "", hex: "#5AA4AE", rgb: [] },
            { name: "法翠", pinyin: "", hex: "#108B96", rgb: [] },
            { name: "桑蕾", pinyin: "", hex: "#EAD89A", rgb: [] },
            { name: "太一余粮", pinyin: "", hex: "#D5B45C", rgb: [] },
            { name: "秋香", pinyin: "", hex: "#BF9C46", rgb: [] },
            { name: "老茯神", pinyin: "", hex: "#AA8534", rgb: [] }
        ],
        // 白露：清澈、透明
        '白露': [
            // { name: "月白", pinyin: "yuè bái", hex: "#EEF7F2", rgb: [238, 247, 242] },
            // { name: "霜色", pinyin: "shuāng sè", hex: "#E9F1F6", rgb: [233, 241, 246] },
            // { name: "云峰白", pinyin: "yún fēng bái", hex: "#D8E3E7", rgb: [216, 227, 231] }

            { name: "凝脂", pinyin: "", hex: "#F5F2E9", rgb: [] },
            { name: "玉色", pinyin: "", hex: "#EAE4D1", rgb: [] },
            { name: "黄润", pinyin: "", hex: "#DFD6B8", rgb: [] },
            { name: "缣缃", pinyin: "", hex: "#D5C8A0", rgb: [] },
            { name: "蕉月", pinyin: "", hex: "#86908A", rgb: [] },
            { name: "千山翠", pinyin: "", hex: "#6B7D73", rgb: [] },
            { name: "结绿", pinyin: "", hex: "#555F4D", rgb: [] },
            { name: "绿云", pinyin: "", hex: "#45493D", rgb: [] },
            { name: "藕丝秋半", pinyin: "", hex: "#D3CBC5", rgb: [] },
            { name: "苍烟落照", pinyin: "", hex: "#C8B5B3", rgb: [] },
            { name: "红藤杖", pinyin: "", hex: "#928187", rgb: [] },
            { name: "紫鼠", pinyin: "", hex: "#594C57", rgb: [] },
            { name: "黄粱", pinyin: "", hex: "#C4B798", rgb: [] },
            { name: "蒸栗", pinyin: "", hex: "#A58A5F", rgb: [] },
            { name: "射干", pinyin: "", hex: "#7C623F", rgb: [] },
            { name: "油葫芦", pinyin: "", hex: "#644D31", rgb: [] }
        ],

        // 秋分：均衡、沉静
        '秋分': [
            // { name: "琉璃蓝", pinyin: "liú lí lán", hex: "#1781B5", rgb: [23, 129, 181] },
            // { name: "青金", pinyin: "qīng jīn", hex: "#1A94BC", rgb: [26, 148, 188] },
            // { name: "鸢尾蓝", pinyin: "yuān wěi lán", hex: "#158BB8", rgb: [21, 139, 184] }

            { name: "卵色", pinyin: "", hex: "#D5E3D4", rgb: [] },
            { name: "葭菼", pinyin: "", hex: "#CAD7C5", rgb: [] },
            { name: "冰台", pinyin: "", hex: "#BECAB7", rgb: [] },
            { name: "青古", pinyin: "", hex: "#B3BDA9", rgb: [] },
            { name: "栾华", pinyin: "", hex: "#C0AD5E", rgb: [] },
            { name: "大赤", pinyin: "", hex: "#AA9649", rgb: [] },
            { name: "佛赤", pinyin: "", hex: "#8F3D2C", rgb: [] },
            { name: "蜜褐", pinyin: "", hex: "#683632", rgb: [] },
            { name: "孔雀蓝", pinyin: "", hex: "#4994C4", rgb: [] },
            { name: "吐绶蓝", pinyin: "", hex: "#4182A4", rgb: [] },
            { name: "鱼师青", pinyin: "", hex: "#32788A", rgb: [] },
            { name: "软翠", pinyin: "", hex: "#006D87", rgb: [] },
            { name: "浅云", pinyin: "", hex: "#EAEEF1", rgb: [] },
            { name: "素采", pinyin: "", hex: "#D4DDE1", rgb: [] },
            { name: "影青", pinyin: "", hex: "#BDCBD2", rgb: [] },
            { name: "逍遥游", pinyin: "", hex: "#B2BFC3", rgb: [] }
        ],
        // 寒露：清寒、肃杀
        '寒露': [
            // { name: "苍色", pinyin: "cāng sè", hex: "#75878A", rgb: [117, 135, 138] },
            // { name: "黛色", pinyin: "dài sè", hex: "#6B6882", rgb: [107, 104, 130] },
            // { name: "青黛", pinyin: "qīng dài", hex: "#426666", rgb: [66, 102, 102] }

            { name: "醽醁", pinyin: "", hex: "#A6BAB1", rgb: [] },
            { name: "翠涛", pinyin: "", hex: "#819D8E", rgb: [] },
            { name: "青梅", pinyin: "", hex: "#778A77", rgb: [] },
            { name: "翕赩", pinyin: "", hex: "#5F766A", rgb: [] },
            { name: "九斤黄", pinyin: "", hex: "#DDB078", rgb: [] },
            { name: "杏子", pinyin: "", hex: "#DA9233", rgb: [] },
            { name: "媚蝶", pinyin: "", hex: "#BC6E37", rgb: [] },
            { name: "韎韐", pinyin: "", hex: "#9F5221", rgb: [] },
            { name: "东方既白", pinyin: "", hex: "#8BA3C7", rgb: [] },
            { name: "绀宇", pinyin: "", hex: "#003D74", rgb: [] },
            { name: "佛头青", pinyin: "", hex: "#19325F", rgb: [] },
            { name: "花青", pinyin: "", hex: "#1A2847", rgb: [] },
            { name: "弗肯红", pinyin: "", hex: "#ECD9C7", rgb: [] },
            { name: "赤璋", pinyin: "", hex: "#E1C199", rgb: [] },
            { name: "茧色", pinyin: "", hex: "#C6A268", rgb: [] },
            { name: "密陀僧", pinyin: "", hex: "#B3934B", rgb: [] }
        ],
        // 霜降：凋零、萧瑟
        '霜降': [
            // { name: "紫灰", pinyin: "zǐ huī", hex: "#665757", rgb: [102, 87, 87] },
            // { name: "黝", pinyin: "yǒu", hex: "#6B6882", rgb: [107, 104, 130] },
            // { name: "黯", pinyin: "àn", hex: "#41555D", rgb: [65, 85, 93] }

            { name: "银朱", pinyin: "", hex: "#D12920", rgb: [] },
            { name: "胭脂虫", pinyin: "", hex: "#AB1D22", rgb: [] },
            { name: "朱樱", pinyin: "", hex: "#8F1D22", rgb: [] },
            { name: "爵头", pinyin: "", hex: "#631216", rgb: [] },
            { name: "甘石", pinyin: "", hex: "#BDB2B2", rgb: [] },
            { name: "迷楼灰", pinyin: "", hex: "#91828F", rgb: [] },
            { name: "鸦雏", pinyin: "", hex: "#6A5B6D", rgb: [] },
            { name: "烟墨", pinyin: "", hex: "#5C4F55", rgb: [] },
            { name: "十样锦", pinyin: "", hex: "#F8C6B5", rgb: [] },
            { name: "檀唇", pinyin: "", hex: "#DA9E8C", rgb: [] },
            { name: "琼琚", pinyin: "", hex: "#D77F66", rgb: [] },
            { name: "棠梨", pinyin: "", hex: "#B15A43", rgb: [] },
            { name: "蜜合", pinyin: "", hex: "#DFD7C2", rgb: [] },
            { name: "假山南", pinyin: "", hex: "#D4C1A6", rgb: [] },
            { name: "紫花布", pinyin: "", hex: "#BEA78B", rgb: [] },
            { name: "沉香", pinyin: "", hex: "#99806C", rgb: [] }
        ],
        // 立冬：肃穆、沉静
        '立冬': [
            // { name: "玄青", pinyin: "xuán qīng", hex: "#3D3B4F", rgb: [61, 59, 79] },
            // { name: "乌色", pinyin: "wū sè", hex: "#392F41", rgb: [57, 47, 65] },
            // { name: "黝黑", pinyin: "yǒu hēi", hex: "#665757", rgb: [102, 87, 87] }

            { name: "半见", pinyin: "", hex: "#FFFBC7", rgb: [] },
            { name: "女贞黄", pinyin: "", hex: "#F7EEAD", rgb: [] },
            { name: "绢纨", pinyin: "", hex: "#ECE093", rgb: [] },
            { name: "姜黄", pinyin: "", hex: "#D6C560", rgb: [] },
            { name: "繱犗", pinyin: "", hex: "#88BFB8", rgb: [] },
            { name: "二绿", pinyin: "", hex: "#5DA39D", rgb: [] },
            { name: "铜青", pinyin: "", hex: "#3D8E86", rgb: [] },
            { name: "石绿", pinyin: "", hex: "#206864", rgb: [] },
            { name: "黄琮", pinyin: "", hex: "#9E8C6B", rgb: [] },
            { name: "茶色", pinyin: "", hex: "#887657", rgb: [] },
            { name: "伽罗", pinyin: "", hex: "#6D5C3D", rgb: [] },
            { name: "苍艾", pinyin: "", hex: "#5A4B3B", rgb: [] },
            { name: "藕丝褐", pinyin: "", hex: "#A88787", rgb: [] },
            { name: "葡萄褐", pinyin: "", hex: "#9E696D", rgb: [] },
            { name: "苏方", pinyin: "", hex: "#81474C", rgb: [] },
            { name: "福色", pinyin: "", hex: "#662B2F", rgb: [] }
        ],
        // 小雪：素洁、晶莹
        '小雪': [
            // { name: "霜白", pinyin: "shuāng bái", hex: "#F0F0F4", rgb: [240, 240, 244] },
            // { name: "雪白", pinyin: "xuě bái", hex: "#F0FCFF", rgb: [240, 252, 255] },
            // { name: "素白", pinyin: "sù bái", hex: "#F2FDFF", rgb: [242, 253, 255] }

            { name: "龙膏烛", pinyin: "", hex: "#DE82A7", rgb: [] },
            { name: "黪紫", pinyin: "", hex: "#CC73A0", rgb: [] },
            { name: "胭脂水", pinyin: "", hex: "#B95A89", rgb: [] },
            { name: "胭脂紫", pinyin: "", hex: "#B0436F", rgb: [] },
            { name: "小红", pinyin: "", hex: "#E67762", rgb: [] },
            { name: "岱赭", pinyin: "", hex: "#DD6B4F", rgb: [] },
            { name: "鹤顶红", pinyin: "", hex: "#D24735", rgb: [] },
            { name: "朱殷", pinyin: "", hex: "#B93A26", rgb: [] },
            { name: "月白", pinyin: "", hex: "#D4E5EF", rgb: [] },
            { name: "星郎", pinyin: "", hex: "#BCD4E7", rgb: [] },
            { name: "晴山", pinyin: "", hex: "#A3BBDB", rgb: [] },
            { name: "品月", pinyin: "", hex: "#8AABCC", rgb: [] },
            { name: "明茶褐", pinyin: "", hex: "#9E8368", rgb: [] },
            { name: "荆褐", pinyin: "", hex: "#906C4A", rgb: [] },
            { name: "驼褐", pinyin: "", hex: "#7C5B3E", rgb: [] },
            { name: "椒褐", pinyin: "", hex: "#72453A", rgb: [] }
        ],
        // 大雪：皓白、晶洁
        '大雪': [
            // { name: "莹白", pinyin: "yíng bái", hex: "#E3F9FD", rgb: [227, 249, 253] },
            // { name: "冰白", pinyin: "bīng bái", hex: "#E0F0F5", rgb: [224, 240, 245] },
            // { name: "银白", pinyin: "yín bái", hex: "#E9E7EF", rgb: [233, 231, 239] }

            { name: "粉米", pinyin: "", hex: "#EFC4CE", rgb: [] },
            { name: "縓缘", pinyin: "", hex: "#CE8892", rgb: [] },
            { name: "美人祭", pinyin: "", hex: "#C35C6A", rgb: [] },
            { name: "鞓红", pinyin: "", hex: "#B04552", rgb: [] },
            { name: "米汤娇", pinyin: "", hex: "#EEEAD9", rgb: [] },
            { name: "草白", pinyin: "", hex: "#BFC1A9", rgb: [] },
            { name: "玄校", pinyin: "", hex: "#A9A082", rgb: [] },
            { name: "綟绶", pinyin: "", hex: "#756C4B", rgb: [] },
            { name: "雀梅", pinyin: "", hex: "#788A6F", rgb: [] },
            { name: "油绿", pinyin: "", hex: "#5D7259", rgb: [] },
            { name: "莓莓", pinyin: "", hex: "#4E6548", rgb: [] },
            { name: "螺青", pinyin: "", hex: "#3F503B", rgb: [] },
            { name: "暮山紫", pinyin: "", hex: "#A4ABD6", rgb: [] },
            { name: "紫苑", pinyin: "", hex: "#757CBB", rgb: [] },
            { name: "优昙瑞", pinyin: "", hex: "#615EA8", rgb: [] },
            { name: "延维", pinyin: "", hex: "#4A4B9D", rgb: [] }
        ],
        // 冬至：幽深、静谧
        '冬至': [
            // { name: "藏蓝", pinyin: "zàng lán", hex: "#2E4E7E", rgb: [46, 78, 126] },
            // { name: "靛蓝", pinyin: "diàn lán", hex: "#065279", rgb: [6, 82, 121] },
            // { name: "绀青", pinyin: "gàn qīng", hex: "#2F2F35", rgb: [47, 47, 53] }

            { name: "银红", pinyin: "", hex: "#E7CAD3", rgb: [] },
            { name: "莲红", pinyin: "", hex: "#D9A0B3", rgb: [] },
            { name: "紫梅", pinyin: "", hex: "#BB7A8C", rgb: [] },
            { name: "紫矿", pinyin: "", hex: "#9E4E56", rgb: [] },
            { name: "咸池", pinyin: "", hex: "#DAA9A9", rgb: [] },
            { name: "红䵂", pinyin: "", hex: "#CD7372", rgb: [] },
            { name: "蚩尤旗", pinyin: "", hex: "#A85858", rgb: [] },
            { name: "霁红", pinyin: "", hex: "#7C4449", rgb: [] },
            { name: "莺儿", pinyin: "", hex: "#EBE1A9", rgb: [] },
            { name: "禹余粮", pinyin: "", hex: "#E1D279", rgb: [] },
            { name: "姚黄", pinyin: "", hex: "#D6BC46", rgb: [] },
            { name: "蛾黄", pinyin: "", hex: "#BE8A2F", rgb: [] },
            { name: "濯绛", pinyin: "", hex: "#796860", rgb: [] },
            { name: "墨黪", pinyin: "", hex: "#585248", rgb: [] },
            { name: "驖骊", pinyin: "", hex: "#46433B", rgb: [] },
            { name: "京元", pinyin: "", hex: "#31322C", rgb: [] }
        ],
        // 小寒：冷冽、清寒
        '小寒': [
            // { name: "墨色", pinyin: "mò sè", hex: "#50616D", rgb: [80, 97, 109] },
            // { name: "黛蓝", pinyin: "dài lán", hex: "#425066", rgb: [66, 80, 102] },
            // { name: "青黑", pinyin: "qīng hēi", hex: "#395260", rgb: [57, 82, 96] }

            { name: "酂白", pinyin: "", hex: "#F6F9E4", rgb: [] },
            { name: "断肠", pinyin: "", hex: "#ECEBC2", rgb: [] },
            { name: "田赤", pinyin: "", hex: "#E1D384", rgb: [] },
            { name: "黄封", pinyin: "", hex: "#CAB272", rgb: [] },
            { name: "丁香褐", pinyin: "", hex: "#BD9683", rgb: [] },
            { name: "棠梨褐", pinyin: "", hex: "#955A42", rgb: [] },
            { name: "朱石栗", pinyin: "", hex: "#81492C", rgb: [] },
            { name: "枣褐", pinyin: "", hex: "#68361A", rgb: [] },
            { name: "秋蓝", pinyin: "", hex: "#7D929F", rgb: [] },
            { name: "育阳染", pinyin: "", hex: "#576470", rgb: [] },
            { name: "霁蓝", pinyin: "", hex: "#3C4654", rgb: [] },
            { name: "獭见", pinyin: "", hex: "#151D29", rgb: [] },
            { name: "井天", pinyin: "", hex: "#A4C9CC", rgb: [] },
            { name: "正青", pinyin: "", hex: "#6CA8AF", rgb: [] },
            { name: "扁青", pinyin: "", hex: "#509296", rgb: [] },
            { name: "䌦色", pinyin: "", hex: "#226B68", rgb: [] }
        ],
        // 大寒：深邃、寒凝
        '大寒': [
            // { name: "漆黑", pinyin: "qī hēi", hex: "#161823", rgb: [22, 24, 35] },
            // { name: "瑾黑", pinyin: "jǐn hēi", hex: "#1C1C22", rgb: [28, 28, 34] },
            // { name: "玄青", pinyin: "xuán qīng", hex: "#2B333E", rgb: [43, 51, 62] }

            { name: "紫府", pinyin: "", hex: "#995D7F", rgb: [] },
            { name: "地血", pinyin: "", hex: "#814662", rgb: [] },
            { name: "芥拾紫", pinyin: "", hex: "#602641", rgb: [] },
            { name: "油紫", pinyin: "", hex: "#420B2F", rgb: [] },
            { name: "骨缥", pinyin: "", hex: "#EBE3C7", rgb: [] },
            { name: "青白玉", pinyin: "", hex: "#CAC5A0", rgb: [] },
            { name: "绿豆褐", pinyin: "", hex: "#92896B", rgb: [] },
            { name: "冥色", pinyin: "", hex: "#665F4D", rgb: [] },
            { name: "肉红", pinyin: "", hex: "#DDC5B8", rgb: [] },
            { name: "珠子褐", pinyin: "", hex: "#BEA89D", rgb: [] },
            { name: "鹰背褐", pinyin: "", hex: "#8F6D5F", rgb: [] },
            { name: "麝香褐", pinyin: "", hex: "#694B3C", rgb: [] },
            { name: "石英", pinyin: "", hex: "#C8B6BB", rgb: [] },
            { name: "银褐", pinyin: "", hex: "#9C8D9B", rgb: [] },
            { name: "烟红", pinyin: "", hex: "#9D858F", rgb: [] },
            { name: "紫诰", pinyin: "", hex: "#76555D", rgb: [] },
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