/* =============================================
   СЕМЕЙНОЕ ДРЕВО — МУЛЬТИЯЗЫЧНОСТЬ (RU / UZ)
   1. Экран приветствия («Зайти в семью»)
   2. Перевод интерфейса на русский и узбекский языки
   3. Компактное и понятное отображение дерева
   4. Двоюродные сёстры слева («Дочь кого»)
   5. Двоюродные братья справа («Сын кого»)
   6. Я в центре, братья слева, сёстры справа
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. ЭЛЕМЕНТЫ ИНТЕРФЕЙСА ───
    const pageTitle = document.getElementById('pageTitle');
    const headerTitle = document.getElementById('headerTitle');
    const headerSubtitle = document.getElementById('headerSubtitle');
    const container = document.getElementById('treeContainer');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const btnAdd = document.getElementById('btnAddMember');
    const btnAddLabel = document.getElementById('btnAddLabel');
    const btnThemeToggle = document.getElementById('btnThemeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const btnWelcomeGate = document.getElementById('btnWelcomeGate');
    const homeLabel = document.getElementById('homeLabel');
    const footerText = document.getElementById('footerText');

    // Экран приветствия («Зайти в семью»)
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const btnEnterFamily = document.getElementById('btnEnterFamily');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    const welcomeLangLabel = document.getElementById('welcomeLangLabel');
    const enterFamilyText = document.getElementById('enterFamilyText');
    const welcomeLangTabs = document.getElementById('welcomeLangTabs');
    const headerLangSwitch = document.getElementById('headerLangSwitch');

    // Модалка просмотра
    const viewOverlay = document.getElementById('viewOverlay');
    const viewClose = document.getElementById('viewClose');
    const btnEdit = document.getElementById('btnEditPerson');
    const btnDelete = document.getElementById('btnDeletePerson');
    const btnModalAddRel = document.getElementById('btnModalAddRel');
    const viewProfessionRow = document.getElementById('viewProfessionRow');
    const viewProfession = document.getElementById('viewProfession');
    const viewMusicRow = document.getElementById('viewMusicRow');
    const viewMusic = document.getElementById('viewMusic');
    const viewBirthLabel = document.getElementById('viewBirthLabel');
    const viewDeathLabel = document.getElementById('viewDeathLabel');
    const viewMusicLabel = document.getElementById('viewMusicLabel');
    const viewWhoseRow = document.getElementById('viewWhoseRow');
    const viewWhoseLabel = document.getElementById('viewWhoseLabel');
    const viewWhoseValue = document.getElementById('viewWhoseValue');

    // Модалка формы
    const formOverlay = document.getElementById('formOverlay');
    const formClose = document.getElementById('formClose');
    const btnCancel = document.getElementById('btnCancelForm');
    const btnSaveForm = document.getElementById('btnSaveForm');
    const personForm = document.getElementById('personForm');
    const formTitle = document.getElementById('formTitle');
    const photoInput = document.getElementById('photoInput');
    const photoPreviewImg = document.getElementById('photoPreviewImg');
    const photoPlaceholder = document.querySelector('.form-photo-placeholder');
    const btnRemovePhoto = document.getElementById('btnRemovePhoto');
    const labelPhoto = document.getElementById('labelPhoto');
    const labelName = document.getElementById('labelName');
    const inputName = document.getElementById('inputName');
    const labelRelation = document.getElementById('labelRelation');
    const inputRelation = document.getElementById('inputRelation');
    const groupParentWhose = document.getElementById('groupParentWhose');
    const labelParentWhose = document.getElementById('labelParentWhose');
    const inputParentWhose = document.getElementById('inputParentWhose');
    const selectParentPreset = document.getElementById('selectParentPreset');
    const hintParentWhose = document.getElementById('hintParentWhose');
    const labelSide = document.getElementById('labelSide');
    const inputSide = document.getElementById('inputSide');
    const optSideAuto = document.getElementById('optSideAuto');
    const optSidePat = document.getElementById('optSidePat');
    const optSideMat = document.getElementById('optSideMat');
    const optSideCenter = document.getElementById('optSideCenter');
    const labelProfession = document.getElementById('labelProfession');
    const inputProfession = document.getElementById('inputProfession');
    const labelBirth = document.getElementById('labelBirth');
    const inputBirth = document.getElementById('inputBirth');
    const labelDeath = document.getElementById('labelDeath');
    const inputDeath = document.getElementById('inputDeath');
    const hintDeath = document.getElementById('hintDeath');
    const labelMusic = document.getElementById('labelMusic');
    const inputMusic = document.getElementById('inputMusic');
    const labelBio = document.getElementById('labelBio');
    const inputBio = document.getElementById('inputBio');
    const editingIdInput = document.getElementById('editingId');
    const relatedToIdInput = document.getElementById('relatedToId');
    const relatedRoleInput = document.getElementById('relatedRole');
    const relativeBanner = document.getElementById('relativeBanner');
    const relativeBannerText = document.getElementById('relativeBannerText');
    const btnClearRelative = document.getElementById('btnClearRelative');

    // Модалка быстрого выбора (+ Родственник)
    const relSelectOverlay = document.getElementById('relSelectOverlay');
    const relSelectClose = document.getElementById('relSelectClose');
    const quickRelTitle = document.getElementById('quickRelTitle');
    const quickRelSubtitle = document.getElementById('quickRelSubtitle');
    const quickRelAvatar = document.getElementById('quickRelAvatar');
    const quickRelGrid = document.getElementById('quickRelGrid');

    let currentViewId = null;
    let currentPhotoData = null;
    let quickRelTargetPerson = null;

    // ─── 2. СЛОВАРЬ ПЕРЕВОДОВ (RU / UZ) ───
    const I18N = {
        ru: {
            pageTitle: '🌌 Моё Семейное Древо',
            headerTitle: '🌌 Моё Семейное Древо',
            headerSubtitle: 'История нашей семьи сквозь космические поколения',
            searchPlaceholder: 'Поиск по имени, профессии, музыке...',
            themeLabel: 'Стиль',
            addBtn: 'Добавить',
            homeLabel: 'Семья',
            welcomeTitle: '🌌 Семейное Древо',
            welcomeSubtitle: 'История нашей семьи сквозь поколения. Сохраняйте память, изучайте свои корни и передавайте историю детям.',
            welcomeLangLabel: 'Выберите язык / Tilni tanlang:',
            enterFamilyText: 'Войти в семью',
            footerText: 'Семейное Древо • Сделано с ❤️',
            
            // Легенда
            legendYouth: '🌟 Молодое поколение: Дв. сёстры (слева) • Родные (Камран) • Дв. братья (справа)',
            legendParents: '👑 Родители: Линия Папы (слева) ── Папа ❤️ Мама ── Линия Мамы (справа)',
            legendGrand: '🏛️ Бабушки и Дедушки: Родители Папы (слева) • Родители Мамы (справа)',

            // Секции
            secYouth: '🌟 Молодое поколение',
            secParents: '👑 Родители',
            secGrand: '🏛️ Бабушки и Дедушки',
            secGreatGrand: '📜 Прабабушки и Прадедушки',
            secChildren: '👶 Дети',
            secOthers: '👥 Другие родственники',

            // Блоки уровня 1
            cousinsSistersTitle: '👧 Двоюродные сёстры (слева)',
            cousinsBrothersTitle: '👦 Двоюродные братья (справа)',
            brothersLeft: '👦 Братья (слева)',
            meCenter: '😎 Камран (по центру)',
            sistersRight: '👧 Сёстры (справа)',

            // Кнопки добавления
            addCousinSister: '＋ Добавить дв. сестру',
            addCousinBrother: '＋ Добавить дв. брата',
            addBrother: '＋ Добавить Брата',
            addSister: '＋ Добавить Сестру',
            addMe: '＋ Добавить себя (Это я)',
            addDad: '＋ Добавить Папу',
            addMom: '＋ Добавить Маму',
            addPaternalRel: '＋ Родственник Папы',
            addMaternalRel: '＋ Родственник Мамы',
            addPatGrand: '＋ Родители Папы',
            addMatGrand: '＋ Родители Мамы',

            // Чей сын / Чья дочь
            sonOf: 'Сын:',
            daughterOf: 'Дочь:',
            whoseLabel: 'Чей сын / Чья дочь:',
            whoseSonDaughter: 'Чей сын / Чья дочь?',
            whoseHint: 'Укажите имя родителя (например: «Дяди Алишера» или «Тёти Лолы»)',
            selectPresetDefault: '⚡ Выбрать из родственников',
            notSpecified: 'Не указано',

            // Родители блоки
            paternalWingTitle: '👨‍👦 Линия Папы (слева родственники, справа Папа)',
            maternalWingTitle: '👩‍👦 Линия Мамы (слева Мама, справа родственники)',
            patGrandTitle: '👴👵 Родители Папы (снизу от Папы)',
            matGrandTitle: '👵👴 Родители Мамы (снизу от Мамы)',
            patGreatTitle: 'Прабабушки/дедушки Папы',
            matGreatTitle: 'Прабабушки/дедушки Мамы',

            // Карточка
            alive: '💚 Жив(а)',
            deceased: '🕊️ Покоится',
            cardAddRel: 'Родственник',

            // Модалка просмотра
            viewBirth: '📅 Дата рождения',
            viewDeath: '🕊️ Дата смерти',
            viewMusic: 'Любимая музыка:',
            btnRel: '＋ Родственник',
            btnEdit: '✏️ Редактировать',
            btnDelete: '🗑️ Удалить',

            // Форма
            formAddTitle: 'Добавить члена семьи',
            formEditTitle: 'Редактировать данные',
            labelPhoto: '📸 Загрузить фото',
            btnRemovePhoto: 'Убрать фото',
            labelName: 'Имя *',
            inputNamePlaceholder: 'Введите имя',
            labelRelation: 'Кем приходится *',
            labelSide: '🌿 Сторона семьи (Ветвь)',
            optSideAuto: '⚡ Автоопределение по родству',
            optSidePat: '👨 Линия Папы (Отцовская)',
            optSideMat: '👩 Линия Мамы (Материнская)',
            optSideCenter: '🌟 Общая / Центральная (Я, дети, супруги, двоюродные)',
            labelProfession: '💼 Профессия / Род деятельности',
            inputProfessionPlaceholder: 'Например: Программист, Врач, Учитель',
            labelBirth: 'Дата рождения',
            inputBirthPlaceholder: 'Например: 15 марта 1990',
            labelDeath: 'Дата смерти',
            hintDeath: '(оставьте пустым если жив/а)',
            inputDeathPlaceholder: 'Например: 20 декабря 2020',
            labelMusic: '🎵 Любимая музыка / трек',
            inputMusicPlaceholder: 'Например: Queen — Bohemian Rhapsody, Джаз',
            labelBio: 'Описание',
            inputBioPlaceholder: 'Расскажите немного о человеке...',
            btnCancel: 'Отмена',
            btnSave: '💾 Сохранить',

            // Быстрый выбор (+ Родственник)
            quickRelTitle: 'Добавить родственника',
            quickRelSubtitle: 'Для: «{name}» ({relation}). Кого вы хотите добавить?',
            confirmDelete: 'Удалить «{name}» ({relation})?',
            emptyTree: 'Дерево пока пустое',
            emptyTreeDesc: 'Нажмите «＋ Добавить», чтобы создать первую карточку',
            notFound: 'Никого не найдено по запросу «{query}»',
            downParents: 'Родители (снизу)',
            downGrand: 'Бабушки и Дедушки (снизу)',
            downGreat: 'Прабабушки и Прадедушки'
        },
        uz: {
            pageTitle: '🌌 Mening Shajara Daraxtim',
            headerTitle: '🌌 Mening Shajara Daraxtim',
            headerSubtitle: 'Avlodlar osha oilamizning koinotiy tarixi',
            searchPlaceholder: "Ism, kasb, musiqa bo'yicha qidiruv...",
            themeLabel: 'Uslub',
            addBtn: "Qo'shish",
            homeLabel: 'Oila',
            welcomeTitle: '🌌 Shajara Daraxti',
            welcomeSubtitle: "Avlodlar osha oilamiz tarixi. Ota-bobolaringiz va yaqinlaringiz xotirasini asrab-avaylang, kelgusi avlodlarga yetkazing.",
            welcomeLangLabel: 'Tilni tanlang / Выберите язык:',
            enterFamilyText: 'Oilaga kirish',
            footerText: "Shajara Daraxti • Mehr bilan yaratildi ❤️",
            
            // Легенда
            legendYouth: "🌟 Yosh avlod: Dvyurodnaya opa/singillar (chapda) • O'zimiz (Kamran) • Dvyurodniy aka/ukalar (o'ngda)",
            legendParents: "👑 Ota-onalar: Ota tomoni (chapda) ── Ota ❤️ Ona ── Ona tomoni (o'ngda)",
            legendGrand: "🏛️ Bobolar va Buvilar: Otaning ota-onasi (chapda) • Onaning ota-onasi (o'ngda)",

            // Секции
            secYouth: '🌟 Yosh avlod',
            secParents: '👑 Ota-onalar',
            secGrand: '🏛️ Bobolar va Buvilar',
            secGreatGrand: '📜 Katta bobolar va Katta buvilar',
            secChildren: '👶 Farzandlar',
            secOthers: '👥 Boshqa qarindoshlar',

            // Блоки уровня 1
            cousinsSistersTitle: "👧 Dvyurodnaya opa/singillar (chapda)",
            cousinsBrothersTitle: "👦 Dvyurodniy aka/ukalar (o'ngda)",
            brothersLeft: "👦 Aka-ukalar (chapda)",
            meCenter: "😎 Kamran (markazda)",
            sistersRight: "👧 Opa-singillar (o'ngda)",

            // Кнопки добавления
            addCousinSister: "＋ Dvyurodnaya singil/opa qo'shish",
            addCousinBrother: "＋ Dvyurodniy aka/uka qo'shish",
            addBrother: "＋ Aka/Uka qo'shish",
            addSister: "＋ Opa/Singil qo'shish",
            addMe: "＋ O'zimni qo'shish (Bu men)",
            addDad: "＋ Ota qo'shish",
            addMom: "＋ Ona qo'shish",
            addPaternalRel: "＋ Ota tomon qarindosh",
            addMaternalRel: "＋ Ona tomon qarindosh",
            addPatGrand: "＋ Otaning ota-onasi",
            addMatGrand: "＋ Onaning ota-onasi",

            // Чей сын / Чья дочь
            sonOf: "O'g'li:",
            daughterOf: 'Qizi:',
            whoseLabel: "Kimning o'g'li / qizi:",
            whoseSonDaughter: "Kimning o'g'li / Kimning qizi?",
            whoseHint: "Ota-onasining (amaki, tog'a, amma, xola) ismini yozing (masalan: «Alisher amakining»)",
            selectPresetDefault: '⚡ Qarindoshlardan tanlash',
            notSpecified: "Ko'rsatilmagan",

            // Родители блоки
            paternalWingTitle: "👨‍👦 Ota tomoni (chapda qarindoshlar, o'ngda Ota)",
            maternalWingTitle: "👩‍👦 Ona tomoni (chapda Ona, o'ngda qarindoshlar)",
            patGrandTitle: "👴👵 Otaning ota-onasi (Otadan pastda)",
            matGrandTitle: "👵👴 Onaning ota-onasi (Onadan pastda)",
            patGreatTitle: "Ota tomon katta bobo/buvilar",
            matGreatTitle: "Ona tomon katta bobo/buvilar",

            // Карточка
            alive: '💚 Hayot',
            deceased: '🕊️ Vafot etgan',
            cardAddRel: 'Qarindosh',

            // Модалка просмотра
            viewBirth: '📅 Tugilgan sana',
            viewDeath: '🕊️ Vafot etgan sana',
            viewMusic: 'Sevimli musiqasi:',
            btnRel: "＋ Qarindosh",
            btnEdit: '✏️ Tahrirlash',
            btnDelete: "🗑️ O'chirish",

            // Форма
            formAddTitle: "Oila a'zosini qo'shish",
            formEditTitle: "Ma'lumotlarni tahrirlash",
            labelPhoto: '📸 Rasm yuklash',
            btnRemovePhoto: "Rasmni o'chirish",
            labelName: 'Ismi *',
            inputNamePlaceholder: 'Ismni kiriting',
            labelRelation: 'Kim bo\'ladi *',
            labelSide: '🌿 Oila tomoni (Shoxobcha)',
            optSideAuto: "⚡ Qarindoshlik bo'yicha avto",
            optSidePat: '👨 Ota tomoni (Otashoh)',
            optSideMat: '👩 Ona tomoni (Onashoh)',
            optSideCenter: '🌟 Markaziy (Men, farzandlar, dvyurodniylar)',
            labelProfession: '💼 Kasbi / Faoliyat turi',
            inputProfessionPlaceholder: "Masalan: Shifokor, Dasturchi, O'qituvchi",
            labelBirth: 'Tugilgan sanasi',
            inputBirthPlaceholder: 'Masalan: 1990-yil 15-mart',
            labelDeath: 'Vafot etgan sanasi',
            hintDeath: '(agar hayot bo\'lsa bo\'sh qoldiring)',
            inputDeathPlaceholder: 'Masalan: 2020-yil 20-dekabr',
            labelMusic: '🎵 Sevimli musiqa / qo\'shiq',
            inputMusicPlaceholder: 'Masalan: Shahzoda, Jazz, Queen',
            labelBio: 'Tavsif',
            inputBioPlaceholder: "Inson haqida qisqacha ma'lumot yozing...",
            btnCancel: 'Bekor qilish',
            btnSave: '💾 Saqlash',

            // Быстрый выбор (+ Родственник)
            quickRelTitle: 'Qarindosh qo\'shish',
            quickRelSubtitle: '«{name}» ({relation}) uchun. Kimni qo\'shmoqchisiz?',
            confirmDelete: "«{name}» ({relation}) o'chirilsinmi?",
            emptyTree: "Daraxt hozircha bo'sh",
            emptyTreeDesc: "Birinchi kartochkani yaratish uchun «＋ Qo'shish» tugmasini bosing",
            notFound: "«{query}» so'rovi bo'yicha hech kim topilmadi",
            downParents: 'Ota-onalar (pastda)',
            downGrand: 'Bobolar va Buvilar (pastda)',
            downGreat: 'Katta bobo va buvilar'
        }
    };

    let currentLang = localStorage.getItem('familyTreeLang') || 'ru';

    function t(key, params = {}) {
        const dict = I18N[currentLang] || I18N.ru;
        let str = dict[key] || I18N.ru[key] || key;
        Object.keys(params).forEach(k => {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
        });
        return str;
    }

    // Локализация названий степеней родства
    const RELATION_UZ_MAP = {
        'Это я': 'Bu men',
        'Брат': 'Aka / Uka',
        'Сестра': 'Opa / Singil',
        'Сводный брат': "O'gay aka / uka",
        'Сводная сестра': "O'gay opa / singil",
        'Папа': 'Ota',
        'Мама': 'Ona',
        'Отчим': "O'gay ota",
        'Мачеха': "O'gay ona",
        'Дедушка (папин папа)': 'Bobo (otaning otasi)',
        'Бабушка (папина мама)': 'Buvi (otaning onasi)',
        'Дедушка (мамин папа)': 'Bobo (onaning otasi)',
        'Бабушка (мамина мама)': 'Buvi (onaning onasi)',
        'Дедушка': 'Bobo',
        'Бабушка': 'Buvi',
        'Прадедушка (папина линия)': 'Katta bobo (ota tomon)',
        'Прабабушка (папина линия)': 'Katta buvi (ota tomon)',
        'Прадедушка (мамина линия)': 'Katta bobo (ona tomon)',
        'Прабабушка (мамина линия)': 'Katta buvi (ona tomon)',
        'Дядя (по папе)': 'Amaki (ota tomon)',
        'Тётя (по папе)': 'Amma (ota tomon)',
        'Дядя (по маме)': "Tog'a (ona tomon)",
        'Тётя (по маме)': 'Xola (ona tomon)',
        'Дядя': "Amaki / Tog'a",
        'Тётя': 'Amma / Xola',
        'Двоюродный брат': "Dvyurodniy aka/uka (amakivachcha)",
        'Двоюродная сестра': "Dvyurodnaya opa/singil (amakivachcha)",
        'Сын': "O'g'il",
        'Дочь': 'Qiz',
        'Муж': "Turmush o'rtog'i (Er)",
        'Жена': "Turmush o'rtog'i (Xotin)",
        'Племянник': "Jiyan (o'g'il)",
        'Племянница': 'Jiyan (qiz)',
        'Другое': 'Boshqa qarindosh'
    };

    function getLocalizedRelation(rel) {
        if (!rel) return '';
        if (currentLang === 'uz') {
            return RELATION_UZ_MAP[rel] || rel;
        }
        return rel;
    }

    // ─── 3. ТЕМЫ ОФОРМЛЕНИЯ ───
    const THEMES = [
        { id: 'theme-space',    name: 'Космос',   nameUz: 'Koinot',  icon: '🌌', colors: ['#38bdf8', '#a855f7', '#f43f5e', '#60a5fa', '#fde047'] },
        { id: 'theme-amethyst', name: 'Аметист',  nameUz: 'Ametist', icon: '🔮', colors: ['#c084fc', '#ec4899', '#fbbf24'] },
        { id: 'theme-emerald',  name: 'Изумруд',  nameUz: 'Zumrad',  icon: '🌲', colors: ['#34d399', '#fbbf24', '#06b6d4'] },
        { id: 'theme-amber',    name: 'Янтарь',   nameUz: 'Qahrabo', icon: '🌅', colors: ['#fbbf24', '#f87171', '#fb923c'] },
        { id: 'theme-classic',  name: 'Океан',    nameUz: 'Ummon',   icon: '🌊', colors: ['#38bdf8', '#4ecdc4', '#f5c842'] }
    ];

    let currentThemeIdx = 0;
    const savedTheme = localStorage.getItem('familyTreeTheme');
    if (savedTheme && savedTheme !== 'theme-amethyst') {
        const foundThemeIdx = THEMES.findIndex(t => t.id === savedTheme);
        if (foundThemeIdx !== -1) currentThemeIdx = foundThemeIdx;
    } else {
        currentThemeIdx = 0; // Космос (Space) по умолчанию
    }

    function applyTheme(idx) {
        currentThemeIdx = idx;
        const theme = THEMES[idx];
        document.documentElement.setAttribute('data-theme', theme.id);
        localStorage.setItem('familyTreeTheme', theme.id);
        if (themeLabel) {
            const themeName = currentLang === 'uz' ? theme.nameUz : theme.name;
            themeLabel.textContent = `${theme.icon} ${themeName}`;
        }
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            const nextIdx = (currentThemeIdx + 1) % THEMES.length;
            applyTheme(nextIdx);
        });
    }

    // ─── 4. МАППИНГ РОЛЕЙ ───
    const RELATION_MAP = {
        'Это я':                             { gen: 0, emoji: '😎', side: 'center', role: 'me' },
        'Брат':                              { gen: 0, emoji: '👦', side: 'center', role: 'brother' },
        'Сестра':                            { gen: 0, emoji: '👧', side: 'center', role: 'sister' },
        'Сводный брат':                      { gen: 0, emoji: '👦', side: 'center', role: 'brother' },
        'Сводная сестра':                    { gen: 0, emoji: '👧', side: 'center', role: 'sister' },
        'Двоюродный брат':                   { gen: 0, emoji: '👦', side: 'center', role: 'cousin_m' },
        'Двоюродная сестра':                 { gen: 0, emoji: '👧', side: 'center', role: 'cousin_w' },
        'Муж':                               { gen: 0, emoji: '💑', side: 'center', role: 'spouse' },
        'Жена':                              { gen: 0, emoji: '💑', side: 'center', role: 'spouse' },

        'Папа':                              { gen: 1, emoji: '👨', side: 'paternal', role: 'dad' },
        'Дядя (по папе)':                    { gen: 1, emoji: '👨', side: 'paternal', role: 'paternal_rel' },
        'Тётя (по папе)':                    { gen: 1, emoji: '👩', side: 'paternal', role: 'paternal_rel' },

        'Мама':                              { gen: 1, emoji: '👩', side: 'maternal', role: 'mom' },
        'Дядя (по маме)':                    { gen: 1, emoji: '👨', side: 'maternal', role: 'maternal_rel' },
        'Тётя (по маме)':                    { gen: 1, emoji: '👩', side: 'maternal', role: 'maternal_rel' },

        'Дядя':                              { gen: 1, emoji: '👨', side: 'paternal', role: 'paternal_rel' },
        'Тётя':                              { gen: 1, emoji: '👩', side: 'maternal', role: 'maternal_rel' },
        'Отчим':                             { gen: 1, emoji: '👨', side: 'maternal', role: 'dad' },
        'Мачеха':                            { gen: 1, emoji: '👩', side: 'paternal', role: 'mom' },

        'Дедушка (папин папа)':              { gen: 2, emoji: '👴', side: 'paternal', role: 'paternal_grand' },
        'Бабушка (папина мама)':             { gen: 2, emoji: '👵', side: 'paternal', role: 'paternal_grand' },
        'Дедушка (мамин папа)':              { gen: 2, emoji: '👴', side: 'maternal', role: 'maternal_grand' },
        'Бабушка (мамина мама)':             { gen: 2, emoji: '👵', side: 'maternal', role: 'maternal_grand' },
        'Дедушка':                           { gen: 2, emoji: '👴', side: 'paternal', role: 'paternal_grand' },
        'Бабушка':                           { gen: 2, emoji: '👵', side: 'maternal', role: 'maternal_grand' },

        'Прадедушка (папина линия)':         { gen: 3, emoji: '👴', side: 'paternal', role: 'paternal_great' },
        'Прабабушка (папина линия)':         { gen: 3, emoji: '👵', side: 'paternal', role: 'paternal_great' },
        'Прадедушка (мамина линия)':         { gen: 3, emoji: '👴', side: 'maternal', role: 'maternal_great' },
        'Прабабушка (мамина линия)':         { gen: 3, emoji: '👵', side: 'maternal', role: 'maternal_great' },

        'Сын':                               { gen: -1, emoji: '👶', side: 'center', role: 'child' },
        'Дочь':                              { gen: -1, emoji: '👶', side: 'center', role: 'child' },
        'Племянник':                         { gen: -0.5, emoji: '👦', side: 'center', role: 'other' },
        'Племянница':                        { gen: -0.5, emoji: '👧', side: 'center', role: 'other' },
        'Другое':                            { gen: 4, emoji: '👤', side: 'center', role: 'other' }
    };

    function detectSide(relation, explicitSide) {
        if (explicitSide && explicitSide !== 'auto') return explicitSide;
        const rel = relation || '';
        if (rel.includes('пап') || rel.includes('Пап') || rel.includes('папе') || rel.includes('папина') || rel.includes('папин')) return 'paternal';
        if (rel.includes('мам') || rel.includes('Мам') || rel.includes('маме') || rel.includes('мамина') || rel.includes('мамин')) return 'maternal';
        const info = RELATION_MAP[rel];
        return info ? info.side : 'center';
    }

    // ─── 5. ЗАГРУЗКА И СОХРАНЕНИЕ ДАННЫХ ───
    function getCleanInitialData() {
        return [
            {
                id: 'me',
                name: 'Камран',
                relation: 'Это я',
                side: 'center',
                profession: '',
                music: '',
                birthDate: '',
                deathDate: null,
                photo: null,
                bio: '',
                parentWhose: ''
            }
        ];
    }

    function loadFamily() {
        const saved = localStorage.getItem('familyTreeData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    let changed = false;
                    const res = parsed.map(p => {
                        let name = p.name;
                        if ((p.relation === 'Это я' || p.id === 'me') && (name === 'Марсель' || name === 'Marsel')) {
                            name = 'Камран';
                            changed = true;
                        }
                        return {
                            ...p,
                            name,
                            side: detectSide(p.relation, p.side),
                            profession: p.profession || '',
                            music: p.music || '',
                            parentWhose: p.parentWhose || ''
                        };
                    });
                    if (changed) {
                        localStorage.setItem('familyTreeData', JSON.stringify(res));
                    }
                    return res;
                }
            } catch (e) { /* ignore */ }
        }
        return getCleanInitialData();
    }

    function saveFamily() {
        localStorage.setItem('familyTreeData', JSON.stringify(familyMembers));
    }

    function genId() {
        return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
    }

    let familyMembers = loadFamily();

    // ─── 6. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА И ОБНОВЛЕНИЕ ТЕКСТОВ ───
    function setLanguage(lang) {
        currentLang = lang === 'uz' ? 'uz' : 'ru';
        localStorage.setItem('familyTreeLang', currentLang);
        document.documentElement.lang = currentLang;

        // Обновить активные табы
        document.querySelectorAll('.lang-tab-btn, .lang-tool-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });

        // Обновить статические тексты
        if (pageTitle) pageTitle.textContent = t('pageTitle');
        if (headerTitle) headerTitle.textContent = t('headerTitle');
        if (headerSubtitle) headerSubtitle.textContent = t('headerSubtitle');
        if (searchInput) searchInput.placeholder = t('searchPlaceholder');
        if (btnAddLabel) btnAddLabel.textContent = t('addBtn');
        if (homeLabel) homeLabel.textContent = t('homeLabel');
        if (welcomeTitle) welcomeTitle.textContent = t('welcomeTitle');
        if (welcomeSubtitle) welcomeSubtitle.textContent = t('welcomeSubtitle');
        if (welcomeLangLabel) welcomeLangLabel.textContent = t('welcomeLangLabel');
        if (enterFamilyText) enterFamilyText.textContent = t('enterFamilyText');
        if (footerText) footerText.innerHTML = t('footerText');

        // Модалка просмотра
        if (viewBirthLabel) viewBirthLabel.textContent = t('viewBirth');
        if (viewDeathLabel) viewDeathLabel.textContent = t('viewDeath');
        if (viewMusicLabel) viewMusicLabel.textContent = t('viewMusic');
        if (viewWhoseLabel) viewWhoseLabel.textContent = t('whoseLabel');
        if (btnModalAddRel) btnModalAddRel.textContent = t('btnRel');
        if (btnEdit) btnEdit.textContent = t('btnEdit');
        if (btnDelete) btnDelete.textContent = t('btnDelete');

        // Форма
        if (labelPhoto) labelPhoto.textContent = t('labelPhoto');
        if (btnRemovePhoto) btnRemovePhoto.textContent = t('btnRemovePhoto');
        if (labelName) labelName.textContent = t('labelName');
        if (inputName) inputName.placeholder = t('inputNamePlaceholder');
        if (labelRelation) labelRelation.textContent = t('labelRelation');
        if (labelParentWhose) labelParentWhose.textContent = t('whoseSonDaughter');
        if (hintParentWhose) hintParentWhose.textContent = t('whoseHint');
        if (labelSide) labelSide.textContent = t('labelSide');
        if (optSideAuto) optSideAuto.textContent = t('optSideAuto');
        if (optSidePat) optSidePat.textContent = t('optSidePat');
        if (optSideMat) optSideMat.textContent = t('optSideMat');
        if (optSideCenter) optSideCenter.textContent = t('optSideCenter');
        if (labelProfession) labelProfession.textContent = t('labelProfession');
        if (inputProfession) inputProfession.placeholder = t('inputProfessionPlaceholder');
        if (labelBirth) labelBirth.textContent = t('labelBirth');
        if (inputBirth) inputBirth.placeholder = t('inputBirthPlaceholder');
        if (labelDeath) labelDeath.innerHTML = `${t('labelDeath')} <span class="form-hint">${t('hintDeath')}</span>`;
        if (inputDeath) inputDeath.placeholder = t('inputDeathPlaceholder');
        if (labelMusic) labelMusic.textContent = t('labelMusic');
        if (inputMusic) inputMusic.placeholder = t('inputMusicPlaceholder');
        if (labelBio) labelBio.textContent = t('labelBio');
        if (inputBio) inputBio.placeholder = t('inputBioPlaceholder');
        if (btnCancel) btnCancel.textContent = t('btnCancel');
        if (btnSaveForm) btnSaveForm.textContent = t('btnSave');

        // Перезаполнить select родственников с учетом выбранного языка
        populateRelationSelect();
        // Обновить название темы
        applyTheme(currentThemeIdx);
        // Перестроить дерево
        buildTree(searchInput ? searchInput.value : '');
    }

    // Заполнение списка кем приходится в форме
    function populateRelationSelect() {
        const savedVal = inputRelation.value;
        const isUz = currentLang === 'uz';

        const groups = [
            {
                label: isUz ? 'Men' : 'Я',
                options: [
                    { val: 'Это я', text: isUz ? 'Bu men' : 'Это я' }
                ]
            },
            {
                label: isUz ? 'Aka-ukalar va Opa-singillar' : 'Братья и Сёстры',
                options: [
                    { val: 'Брат', text: isUz ? 'Aka / Uka' : 'Брат' },
                    { val: 'Сестра', text: isUz ? 'Opa / Singil' : 'Сестра' },
                    { val: 'Сводный брат', text: isUz ? "O'gay aka / uka" : 'Сводный брат' },
                    { val: 'Сводная сестра', text: isUz ? "O'gay opa / singil" : 'Сводная сестра' }
                ]
            },
            {
                label: isUz ? 'Dvyurodniylar (Amakivachchalar)' : 'Двоюродные братья и сёстры',
                options: [
                    { val: 'Двоюродный брат', text: isUz ? "Dvyurodniy aka/uka (o'ngda)" : 'Двоюродный брат (справа)' },
                    { val: 'Двоюродная сестра', text: isUz ? 'Dvyurodnaya opa/singil (chapda)' : 'Двоюродная сестра (слева)' }
                ]
            },
            {
                label: isUz ? 'Ota-onalar' : 'Родители',
                options: [
                    { val: 'Папа', text: isUz ? 'Ota' : 'Папа' },
                    { val: 'Мама', text: isUz ? 'Ona' : 'Мама' },
                    { val: 'Отчим', text: isUz ? "O'gay ota" : 'Отчим' },
                    { val: 'Мачеха', text: isUz ? "O'gay ona" : 'Мачеха' }
                ]
            },
            {
                label: isUz ? 'Bobolar va Buvilar' : 'Бабушки и Дедушки',
                options: [
                    { val: 'Дедушка (папин папа)', text: isUz ? 'Bobo (otaning otasi)' : 'Дедушка (папин папа)' },
                    { val: 'Бабушка (папина мама)', text: isUz ? 'Buvi (otaning onasi)' : 'Бабушка (папина мама)' },
                    { val: 'Дедушка (мамин папа)', text: isUz ? 'Bobo (onaning otasi)' : 'Дедушка (мамин папа)' },
                    { val: 'Бабушка (мамина мама)', text: isUz ? 'Buvi (onaning onasi)' : 'Бабушка (мамина мама)' }
                ]
            },
            {
                label: isUz ? 'Amakilar va Xolalar' : 'Дяди и Тёти',
                options: [
                    { val: 'Дядя (по папе)', text: isUz ? 'Amaki (ota tomon)' : 'Дядя (по папе)' },
                    { val: 'Тётя (по папе)', text: isUz ? 'Amma (ota tomon)' : 'Тётя (по папе)' },
                    { val: 'Дядя (по маме)', text: isUz ? "Tog'a (ona tomon)" : 'Дядя (по маме)' },
                    { val: 'Тётя (по маме)', text: isUz ? 'Xola (ona tomon)' : 'Тётя (по маме)' }
                ]
            },
            {
                label: isUz ? 'Katta bobo va buvilar' : 'Прабабушки и Прадедушки',
                options: [
                    { val: 'Прадедушка (папина линия)', text: isUz ? 'Katta bobo (ota tomon)' : 'Прадедушка (папина линия)' },
                    { val: 'Прабабушка (папина линия)', text: isUz ? 'Katta buvi (ota tomon)' : 'Прабабушка (папина линия)' },
                    { val: 'Прадедушка (мамина линия)', text: isUz ? 'Katta bobo (ona tomon)' : 'Прадедушка (мамина линия)' },
                    { val: 'Прабабушка (мамина линия)', text: isUz ? 'Katta buvi (ona tomon)' : 'Прабабушка (мамина линия)' }
                ]
            },
            {
                label: isUz ? 'Farzandlar va Turmush o\'rtoqlari' : 'Дети и Супруги',
                options: [
                    { val: 'Сын', text: isUz ? "O'g'il" : 'Сын' },
                    { val: 'Дочь', text: isUz ? 'Qiz' : 'Дочь' },
                    { val: 'Муж', text: isUz ? "Turmush o'rtog'i (Er)" : 'Муж' },
                    { val: 'Жена', text: isUz ? "Turmush o'rtog'i (Xotin)" : 'Жена' }
                ]
            },
            {
                label: isUz ? 'Boshqalar' : 'Другое',
                options: [
                    { val: 'Племянник', text: isUz ? "Jiyan (o'g'il)" : 'Племянник' },
                    { val: 'Племянница', text: isUz ? 'Jiyan (qiz)' : 'Племянница' },
                    { val: 'Другое', text: isUz ? 'Boshqa qarindosh' : 'Другое' }
                ]
            }
        ];

        inputRelation.innerHTML = `<option value="">— ${isUz ? 'Tanlang' : 'Выберите'} —</option>`;
        groups.forEach(g => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = g.label;
            g.options.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o.val;
                opt.textContent = o.text;
                optgroup.appendChild(opt);
            });
            inputRelation.appendChild(optgroup);
        });

        if (savedVal) inputRelation.value = savedVal;
    }

    // Слушатели кнопок переключения языка
    document.querySelectorAll('.lang-tab-btn, .lang-tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // ─── 7. ЭКРАН ПРИВЕТСТВИЯ («ЗАЙТИ В СЕМЬЮ») ───
    if (btnEnterFamily) {
        btnEnterFamily.addEventListener('click', () => {
            welcomeOverlay.classList.add('hidden');
        });
    }

    if (btnWelcomeGate) {
        btnWelcomeGate.addEventListener('click', () => {
            welcomeOverlay.classList.remove('hidden');
        });
    }

    // ─── 8. ПОИСК ───
    function matchQuery(person, query) {
        if (!query) return true;
        const name = (person.name || '').toLowerCase();
        const rel = (person.relation || '').toLowerCase();
        const prof = (person.profession || '').toLowerCase();
        const music = (person.music || '').toLowerCase();
        const bio = (person.bio || '').toLowerCase();
        const whose = (person.parentWhose || '').toLowerCase();
        return name.includes(query) || rel.includes(query) || prof.includes(query) || music.includes(query) || bio.includes(query) || whose.includes(query);
    }

    // ─── 9. ПОСТРОЕНИЕ ДРЕВА ───
    /*
       УРОВЕНЬ 1: МОЛОДОЕ ПОКОЛЕНИЕ
       - Слева: Двоюродные сёстры (с указанием «Дочь кого»)
       - В центре: Камран (Я), слева родные братья, справа родные сёстры
       - Справа: Двоюродные братья (с указанием «Сын кого»)

       УРОВЕНЬ 2: РОДИТЕЛИ (СНИЗУ)
       - Линия Папы (слева родственники, справа Папа) ── Папа ❤️ Мама ── Линия Мамы (слева Мама, справа родственники)

       УРОВЕНЬ 3: БАБУШКИ И ДЕДУШКИ (СНИЗУ)
       - Родители Папы (слева) • Родители Мамы (справа)
    */
    function buildTree(searchQuery) {
        container.innerHTML = '';
        const query = (searchQuery || '').toLowerCase().trim();

        if (familyMembers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🌱</span>
                    <h3>${escapeHtml(t('emptyTree'))}</h3>
                    <p>${escapeHtml(t('emptyTreeDesc'))}</p>
                </div>`;
            return;
        }

        if (query) {
            const anyMatch = familyMembers.some(p => matchQuery(p, query));
            if (!anyMatch) {
                container.innerHTML = `
                    <div class="no-results">
                        <span class="no-icon">🔍</span>
                        <p>${escapeHtml(t('notFound', { query: searchQuery }))}</p>
                    </div>`;
                return;
            }
        }

        // ── Группировка ──
        let mePerson = familyMembers.find(p => p.relation === 'Это я') || null;
        const brothers = [];       // Родные братья
        const sisters = [];        // Родные сёстры
        const cousinSisters = [];  // Двоюродные сёстры (слева)
        const cousinBrothers = []; // Двоюродные братья (справа)

        let dadPerson = familyMembers.find(p => p.relation === 'Папа') || null;
        let momPerson = familyMembers.find(p => p.relation === 'Мама') || null;

        const paternalRelatives = []; // Родственники Папы (слева от Папы)
        const maternalRelatives = []; // Родственники Мамы (справа от Мамы)

        const paternalGrandparents = []; // Родители Папы
        const maternalGrandparents = []; // Родители Мамы

        const paternalGreatGrand = [];   // Пра- по папе
        const maternalGreatGrand = [];   // Пра- по маме

        const children = [];             // Дети
        const others = [];               // Остальные

        familyMembers.forEach(p => {
            const rel = p.relation;
            const side = detectSide(rel, p.side);

            if (rel === 'Это я') {
                mePerson = p;
            } else if (rel === 'Двоюродная сестра') {
                cousinSisters.push(p);
            } else if (rel === 'Двоюродный брат') {
                cousinBrothers.push(p);
            } else if (rel === 'Брат' || rel === 'Сводный брат') {
                brothers.push(p);
            } else if (rel === 'Сестра' || rel === 'Сводная сестра') {
                sisters.push(p);
            } else if (rel === 'Папа') {
                dadPerson = p;
            } else if (rel === 'Мама') {
                momPerson = p;
            } else if (rel.includes('Прадедушка') || rel.includes('Прабабушка')) {
                if (side === 'paternal') paternalGreatGrand.push(p);
                else maternalGreatGrand.push(p);
            } else if (rel.includes('Дедушка') || rel.includes('Бабушка')) {
                if (side === 'paternal') paternalGrandparents.push(p);
                else maternalGrandparents.push(p);
            } else if (rel.includes('Дядя') || rel.includes('Тётя')) {
                if (side === 'paternal') paternalRelatives.push(p);
                else maternalRelatives.push(p);
            } else if (rel === 'Сын' || rel === 'Дочь') {
                children.push(p);
            } else {
                others.push(p);
            }
        });

        // ── Поясняющая легенда ──
        const legend = document.createElement('div');
        legend.className = 'tree-legend';
        legend.innerHTML = `
            <div class="legend-chip"><span class="chip-dot dot-purple"></span> <span>${escapeHtml(t('legendYouth'))}</span></div>
            <div class="legend-chip"><span class="chip-dot dot-gold"></span> <span>${escapeHtml(t('legendParents'))}</span></div>
            <div class="legend-chip"><span class="chip-dot dot-cyan"></span> <span>${escapeHtml(t('legendGrand'))}</span></div>
        `;
        container.appendChild(legend);

        // ========================================================
        // УРОВЕНЬ 1: МОЛОДОЕ ПОКОЛЕНИЕ
        // Слева: Двоюродные сёстры | В центре: Братья - Камран - Сёстры | Справа: Двоюродные братья
        // ========================================================
        const level1Sec = document.createElement('div');
        level1Sec.className = 'generation';
        level1Sec.innerHTML = `<div class="generation-label"><span>${escapeHtml(t('secYouth'))}</span></div>`;

        const youthContainer = document.createElement('div');
        youthContainer.className = 'youth-level-container';

        // 1.1 СЛЕВА: Двоюродные сёстры
        const sistersWing = document.createElement('div');
        sistersWing.className = 'cousins-wing sisters-wing';
        sistersWing.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-maternal">${escapeHtml(t('cousinsSistersTitle'))}</span></div>`;

        const sistersCardsRow = document.createElement('div');
        sistersCardsRow.className = 'cousins-cards-row';
        if (cousinSisters.length > 0) {
            cousinSisters.forEach((s) => {
                sistersCardsRow.appendChild(createCard(s, query));
            });
            // Дополнительная компактная кнопка добавления ещё сестры
            const addMoreBtn = document.createElement('button');
            addMoreBtn.type = 'button';
            addMoreBtn.className = 'btn-wing-add';
            addMoreBtn.textContent = t('addCousinSister');
            addMoreBtn.addEventListener('click', () => openAddFormForRelation('Двоюродная сестра', 'center'));
            sistersWing.appendChild(sistersCardsRow);
            sistersWing.appendChild(addMoreBtn);
        } else {
            const addCousinSisterSlot = createDashedPlaceholder('👧', t('addCousinSister'), () => {
                openAddFormForRelation('Двоюродная сестра', 'center');
            });
            sistersCardsRow.appendChild(addCousinSisterSlot);
            sistersWing.appendChild(sistersCardsRow);
        }
        youthContainer.appendChild(sistersWing);

        // 1.2 В ЦЕНТРЕ: Камран и родные братья/сёстры
        const meGenContainer = document.createElement('div');
        meGenContainer.className = 'me-generation-container';

        // Братья
        const brothersGroup = document.createElement('div');
        brothersGroup.className = 'me-brothers-group';
        brothersGroup.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-paternal">${escapeHtml(t('brothersLeft'))}</span></div>`;

        const brothersCards = document.createElement('div');
        brothersCards.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;';
        if (brothers.length > 0) {
            brothers.forEach((b, idx) => {
                brothersCards.appendChild(createCard(b, query));
                if (idx < brothers.length - 1) brothersCards.appendChild(createBridge());
            });
            brothersCards.appendChild(createBridge());
        } else {
            const addBrotherSlot = createDashedPlaceholder('👦', t('addBrother'), () => {
                openAddFormForRelation('Брат', 'center');
            });
            brothersCards.appendChild(addBrotherSlot);
        }
        brothersGroup.appendChild(brothersCards);
        meGenContainer.appendChild(brothersGroup);

        // Камран
        const meWrap = document.createElement('div');
        meWrap.className = 'me-center-wrap';
        meWrap.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-me">${escapeHtml(t('meCenter'))}</span></div>`;
        if (mePerson) {
            meWrap.appendChild(createCard(mePerson, query));
        } else {
            const addMeSlot = createDashedPlaceholder('😎', t('addMe'), () => {
                openAddFormForRelation('Это я', 'center');
            });
            meWrap.appendChild(addMeSlot);
        }
        meGenContainer.appendChild(meWrap);

        // Сёстры
        const sistersGroup = document.createElement('div');
        sistersGroup.className = 'me-sisters-group';
        sistersGroup.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-maternal">${escapeHtml(t('sistersRight'))}</span></div>`;

        const sistersCards = document.createElement('div');
        sistersCards.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;';
        if (sisters.length > 0) {
            sistersCards.appendChild(createBridge());
            sisters.forEach((s, idx) => {
                sistersCards.appendChild(createCard(s, query));
                if (idx < sisters.length - 1) sistersCards.appendChild(createBridge());
            });
        } else {
            const addSisterSlot = createDashedPlaceholder('👧', t('addSister'), () => {
                openAddFormForRelation('Сестра', 'center');
            });
            sistersCards.appendChild(addSisterSlot);
        }
        sistersGroup.appendChild(sistersCards);
        meGenContainer.appendChild(sistersGroup);

        youthContainer.appendChild(meGenContainer);

        // 1.3 СПРАВА: Двоюродные братья
        const brothersWing = document.createElement('div');
        brothersWing.className = 'cousins-wing brothers-wing';
        brothersWing.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-paternal">${escapeHtml(t('cousinsBrothersTitle'))}</span></div>`;

        const brothersCardsRow = document.createElement('div');
        brothersCardsRow.className = 'cousins-cards-row';
        if (cousinBrothers.length > 0) {
            cousinBrothers.forEach((b) => {
                brothersCardsRow.appendChild(createCard(b, query));
            });
            // Дополнительная компактная кнопка добавления ещё брата
            const addMoreBroBtn = document.createElement('button');
            addMoreBroBtn.type = 'button';
            addMoreBroBtn.className = 'btn-wing-add';
            addMoreBroBtn.textContent = t('addCousinBrother');
            addMoreBroBtn.addEventListener('click', () => openAddFormForRelation('Двоюродный брат', 'center'));
            brothersWing.appendChild(brothersCardsRow);
            brothersWing.appendChild(addMoreBroBtn);
        } else {
            const addCousinBroSlot = createDashedPlaceholder('👦', t('addCousinBrother'), () => {
                openAddFormForRelation('Двоюродный брат', 'center');
            });
            brothersCardsRow.appendChild(addCousinBroSlot);
            brothersWing.appendChild(brothersCardsRow);
        }
        youthContainer.appendChild(brothersWing);

        level1Sec.appendChild(youthContainer);
        container.appendChild(level1Sec);

        // Стрела вниз к родителям
        renderDownConnector(t('downParents'));

        // ========================================================
        // УРОВЕНЬ 2: СНИЗУ — ПАПА И МАМА
        // Слева от Папы его родственники, Справа от Мамы её родственники
        // ========================================================
        const level2Sec = document.createElement('div');
        level2Sec.className = 'generation';
        level2Sec.innerHTML = `<div class="generation-label"><span>${escapeHtml(t('secParents'))}</span></div>`;

        const parentsRow = document.createElement('div');
        parentsRow.className = 'parents-generation-row';

        // 2.1 КРЫЛО ПАПЫ (Слева)
        const paternalWing = document.createElement('div');
        paternalWing.className = 'parents-wing paternal-wing';
        paternalWing.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-paternal">${escapeHtml(t('paternalWingTitle'))}</span></div>`;

        const patCardsArea = document.createElement('div');
        patCardsArea.className = 'parents-cards-area';

        if (paternalRelatives.length > 0) {
            paternalRelatives.forEach(rel => {
                patCardsArea.appendChild(createCard(rel, query));
                patCardsArea.appendChild(createBridge());
            });
        } else {
            const addPatRelSlot = createDashedPlaceholder('👨', t('addPaternalRel'), () => {
                openAddFormForRelation('Дядя (по папе)', 'paternal');
            });
            patCardsArea.appendChild(addPatRelSlot);
            patCardsArea.appendChild(createBridge());
        }

        if (dadPerson) {
            patCardsArea.appendChild(createCard(dadPerson, query));
        } else {
            const addDadSlot = createDashedPlaceholder('👨', t('addDad'), () => {
                openAddFormForRelation('Папа', 'paternal');
            });
            patCardsArea.appendChild(addDadSlot);
        }
        paternalWing.appendChild(patCardsArea);
        parentsRow.appendChild(paternalWing);

        // Соединительный мостик к союзу
        parentsRow.appendChild(createBridge());

        // 2.2 СОЮЗ В ЦЕНТРЕ (Папа + Мама)
        const unionNode = document.createElement('div');
        unionNode.className = 'union-node';
        const unionText = currentLang === 'uz' ? 'Ota ❤️ Ona' : 'Папа ❤️ Мама';
        unionNode.innerHTML = `
            <div class="union-heart" title="${escapeHtml(unionText)}">
                <span>💍</span>
            </div>
            <div class="union-label">${escapeHtml(unionText)}</div>
        `;
        parentsRow.appendChild(unionNode);

        // Соединительный мостик от союза к маме
        parentsRow.appendChild(createBridge());

        // 2.3 КРЫЛО МАМЫ (Справа)
        const maternalWing = document.createElement('div');
        maternalWing.className = 'parents-wing maternal-wing';
        maternalWing.innerHTML = `<div class="zone-badge-wrap"><span class="zone-badge badge-maternal">${escapeHtml(t('maternalWingTitle'))}</span></div>`;

        const matCardsArea = document.createElement('div');
        matCardsArea.className = 'parents-cards-area';

        if (momPerson) {
            matCardsArea.appendChild(createCard(momPerson, query));
        } else {
            const addMomSlot = createDashedPlaceholder('👩', t('addMom'), () => {
                openAddFormForRelation('Мама', 'maternal');
            });
            matCardsArea.appendChild(addMomSlot);
        }

        if (maternalRelatives.length > 0) {
            maternalRelatives.forEach(rel => {
                matCardsArea.appendChild(createBridge());
                matCardsArea.appendChild(createCard(rel, query));
            });
        } else {
            matCardsArea.appendChild(createBridge());
            const addMatRelSlot = createDashedPlaceholder('👩', t('addMaternalRel'), () => {
                openAddFormForRelation('Дядя (по маме)', 'maternal');
            });
            matCardsArea.appendChild(addMatRelSlot);
        }
        maternalWing.appendChild(matCardsArea);
        parentsRow.appendChild(maternalWing);

        level2Sec.appendChild(parentsRow);
        container.appendChild(level2Sec);

        // Стрела вниз к дедушкам и бабушкам
        renderDownConnector(t('downGrand'));

        // ========================================================
        // УРОВЕНЬ 3: БАБУШКИ И ДЕДУШКИ (ЕЩЁ СНИЗУ)
        // ========================================================
        const level3Sec = document.createElement('div');
        level3Sec.className = 'generation';
        level3Sec.innerHTML = `<div class="generation-label"><span>${escapeHtml(t('secGrand'))}</span></div>`;

        const grandRow = document.createElement('div');
        grandRow.className = 'grandparents-level-row';

        // 3.1 Родители Папы
        const patGrandBox = document.createElement('div');
        patGrandBox.className = 'grandparents-wing-box';
        patGrandBox.innerHTML = `
            <div class="branch-col-header paternal-header">
                <span class="branch-col-badge">${escapeHtml(t('patGrandTitle'))}</span>
            </div>
        `;
        const patCardsWrap = document.createElement('div');
        patCardsWrap.className = 'grandparents-cards-wrap';
        if (paternalGrandparents.length > 0) {
            paternalGrandparents.forEach((gp, idx) => {
                patCardsWrap.appendChild(createCard(gp, query));
                if (idx < paternalGrandparents.length - 1) patCardsWrap.appendChild(createBridge());
            });
        } else {
            const addPatGrand = createDashedPlaceholder('👴', t('addPatGrand'), () => {
                openAddFormForRelation('Дедушка (папин папа)', 'paternal');
            });
            patCardsWrap.appendChild(addPatGrand);
        }
        patGrandBox.appendChild(patCardsWrap);
        grandRow.appendChild(patGrandBox);

        // 3.2 Родители Мамы
        const matGrandBox = document.createElement('div');
        matGrandBox.className = 'grandparents-wing-box';
        matGrandBox.innerHTML = `
            <div class="branch-col-header maternal-header">
                <span class="branch-col-badge">${escapeHtml(t('matGrandTitle'))}</span>
            </div>
        `;
        const matCardsWrap = document.createElement('div');
        matCardsWrap.className = 'grandparents-cards-wrap';
        if (maternalGrandparents.length > 0) {
            maternalGrandparents.forEach((gp, idx) => {
                matCardsWrap.appendChild(createCard(gp, query));
                if (idx < maternalGrandparents.length - 1) matCardsWrap.appendChild(createBridge());
            });
        } else {
            const addMatGrand = createDashedPlaceholder('👵', t('addMatGrand'), () => {
                openAddFormForRelation('Бабушка (мамина мама)', 'maternal');
            });
            matCardsWrap.appendChild(addMatGrand);
        }
        matGrandBox.appendChild(matCardsWrap);
        grandRow.appendChild(matGrandBox);

        level3Sec.appendChild(grandRow);
        container.appendChild(level3Sec);

        // ========================================================
        // УРОВЕНЬ 4: ПРАБАБУШКИ И ПРАДЕДУШКИ (если есть)
        // ========================================================
        if (paternalGreatGrand.length > 0 || maternalGreatGrand.length > 0) {
            renderDownConnector(t('downGreat'));

            const level4Sec = document.createElement('div');
            level4Sec.className = 'generation';
            level4Sec.innerHTML = `<div class="generation-label"><span>${escapeHtml(t('secGreatGrand'))}</span></div>`;

            const greatRow = document.createElement('div');
            greatRow.className = 'grandparents-level-row';

            if (paternalGreatGrand.length > 0) {
                const box = document.createElement('div');
                box.className = 'grandparents-wing-box';
                box.innerHTML = `<div class="branch-col-header paternal-header"><span class="branch-col-badge">${escapeHtml(t('patGreatTitle'))}</span></div>`;
                const wrap = document.createElement('div');
                wrap.className = 'grandparents-cards-wrap';
                paternalGreatGrand.forEach(p => wrap.appendChild(createCard(p, query)));
                box.appendChild(wrap);
                greatRow.appendChild(box);
            }

            if (maternalGreatGrand.length > 0) {
                const box = document.createElement('div');
                box.className = 'grandparents-wing-box';
                box.innerHTML = `<div class="branch-col-header maternal-header"><span class="branch-col-badge">${escapeHtml(t('matGreatTitle'))}</span></div>`;
                const wrap = document.createElement('div');
                wrap.className = 'grandparents-cards-wrap';
                maternalGreatGrand.forEach(p => wrap.appendChild(createCard(p, query)));
                box.appendChild(wrap);
                greatRow.appendChild(box);
            }

            level4Sec.appendChild(greatRow);
            container.appendChild(level4Sec);
        }

        // ========================================================
        // ДЕТИ И ДРУГИЕ
        // ========================================================
        if (children.length > 0) {
            renderDownConnector(t('secChildren'));
            renderSimpleSection(t('secChildren'), children, query);
        }

        if (others.length > 0) {
            renderDownConnector(t('secOthers'));
            renderSimpleSection(t('secOthers'), others, query);
        }
    }

    // Вспомогательная секция
    function renderSimpleSection(title, members, query) {
        const sec = document.createElement('div');
        sec.className = 'generation';
        sec.innerHTML = `<div class="generation-label"><span>${escapeHtml(title)}</span></div>`;
        const wrap = document.createElement('div');
        wrap.className = 'generation-members';
        members.forEach(p => wrap.appendChild(createCard(p, query)));
        sec.appendChild(wrap);
        container.appendChild(sec);
    }

    function renderDownConnector(text) {
        const c = document.createElement('div');
        c.className = 'tree-connector-down';
        c.innerHTML = `
            <div class="conn-line"></div>
            <div class="conn-badge">${escapeHtml(text || 'Вниз')}</div>
        `;
        container.appendChild(c);
    }

    function createBridge() {
        const b = document.createElement('div');
        b.className = 'sibling-bridge';
        b.innerHTML = `<div class="sibling-bridge-line"></div>`;
        return b;
    }

    function createDashedPlaceholder(icon, text, onClick) {
        const ph = document.createElement('div');
        ph.className = 'dashed-add-placeholder';
        ph.innerHTML = `
            <span class="ph-icon">${icon}</span>
            <span class="ph-text">${escapeHtml(text)}</span>
        `;
        ph.addEventListener('click', onClick);
        return ph;
    }

    // ─── 10. СОЗДАНИЕ КАРТОЧКИ (КОМПАКТНЫЙ СТИЛЬ С УКАЗАНИЕМ РОДСТВА) ───
    function createCard(person, query) {
        const info = RELATION_MAP[person.relation] || RELATION_MAP['Другое'];
        const isMe = person.relation === 'Это я';
        const isDeceased = !!person.deathDate;
        const years = isDeceased ? `${person.birthDate || '?'} — ${person.deathDate}` : (person.birthDate || '');
        const side = detectSide(person.relation, person.side);
        const localizedRelation = getLocalizedRelation(person.relation);

        const card = document.createElement('div');
        card.className = `person-card ${isMe ? 'is-me' : ''} side-${side}`;
        card.setAttribute('data-id', person.id);

        if (query) {
            const match = matchQuery(person, query);
            card.classList.toggle('search-match', match);
            card.classList.toggle('search-dim', !match);
        }

        let photoHTML;
        if (person.photo) {
            photoHTML = `<img class="person-photo" src="${person.photo}" alt="${escapeHtml(person.name)}">`;
        } else {
            photoHTML = `<div class="photo-placeholder">${info.emoji}</div>`;
        }

        // Блок "Чей сын / Чья дочь" (особенно для двоюродных)
        let whoseHTML = '';
        if (person.relation === 'Двоюродный брат') {
            const whoseTxt = person.parentWhose ? escapeHtml(person.parentWhose) : t('notSpecified');
            whoseHTML = `
                <div class="person-whose-badge whose-son" title="${t('sonOf')} ${whoseTxt}">
                    <span class="whose-icon">👦</span>
                    <span class="whose-label">${t('sonOf')}</span>
                    <span class="whose-val">${whoseTxt}</span>
                </div>`;
        } else if (person.relation === 'Двоюродная сестра') {
            const whoseTxt = person.parentWhose ? escapeHtml(person.parentWhose) : t('notSpecified');
            whoseHTML = `
                <div class="person-whose-badge whose-daughter" title="${t('daughterOf')} ${whoseTxt}">
                    <span class="whose-icon">👧</span>
                    <span class="whose-label">${t('daughterOf')}</span>
                    <span class="whose-val">${whoseTxt}</span>
                </div>`;
        } else if (person.parentWhose) {
            whoseHTML = `
                <div class="person-whose-badge whose-son" title="${escapeHtml(person.parentWhose)}">
                    <span class="whose-icon">🔗</span>
                    <span class="whose-val">${escapeHtml(person.parentWhose)}</span>
                </div>`;
        }

        const professionHTML = person.profession ? `
            <div class="person-profession" title="${escapeHtml(person.profession)}">
                <span class="prof-icon">💼</span>
                <span class="prof-text">${escapeHtml(person.profession)}</span>
            </div>
        ` : '';

        const musicHTML = person.music ? `
            <div class="person-music" title="${escapeHtml(person.music)}">
                <span class="music-icon">🎵</span>
                <span class="music-text">${escapeHtml(person.music)}</span>
            </div>
        ` : '';

        card.innerHTML = `
            <button type="button" class="card-add-btn" title="${t('btnRel')}: ${escapeHtml(person.name)}">
                <span class="add-plus">＋</span>
                <span class="add-txt">${t('cardAddRel')}</span>
            </button>
            <div class="person-photo-wrapper">
                <div class="person-photo-ring">${photoHTML}</div>
            </div>
            <div class="person-name">${escapeHtml(person.name)}</div>
            <div class="person-relation">${escapeHtml(localizedRelation)}</div>
            ${whoseHTML}
            ${professionHTML}
            ${musicHTML}
            ${years ? `<div class="person-years">${escapeHtml(years)}</div>` : ''}
            <span class="status-badge ${isDeceased ? 'status-deceased' : 'status-alive'}">
                ${isDeceased ? t('deceased') : t('alive')}
            </span>
        `;

        // Клик по кнопке "+ Родственник"
        const addBtn = card.querySelector('.card-add-btn');
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openQuickRelModal(person);
        });

        // Клик по карточке открывает просмотр
        card.addEventListener('click', () => openViewModal(person));
        return card;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ─── 11. МОДАЛКА БЫСТРОГО ДОБАВЛЕНИЯ РОДСТВЕННИКА ───
    function openQuickRelModal(targetPerson) {
        quickRelTargetPerson = targetPerson;
        const info = RELATION_MAP[targetPerson.relation] || RELATION_MAP['Другое'];
        quickRelAvatar.textContent = info.emoji || '👤';
        quickRelTitle.textContent = t('quickRelTitle');
        quickRelSubtitle.textContent = t('quickRelSubtitle', {
            name: targetPerson.name,
            relation: getLocalizedRelation(targetPerson.relation)
        });

        quickRelGrid.innerHTML = '';
        const allCategories = getAllQuickCategories(targetPerson);

        allCategories.forEach(cat => {
            const header = document.createElement('div');
            header.className = 'quick-rel-cat-header';
            header.innerHTML = `<span>${cat.icon}</span> <span>${escapeHtml(cat.title)}</span>`;
            quickRelGrid.appendChild(header);

            cat.items.forEach(opt => {
                const card = document.createElement('div');
                card.className = `quick-rel-card ${opt.fullWidth ? 'full-width' : ''}`;
                card.innerHTML = `
                    <span class="quick-rel-btn-icon">${opt.icon}</span>
                    <div class="quick-rel-btn-info">
                        <span class="quick-rel-btn-title">${escapeHtml(opt.title)}</span>
                        <span class="quick-rel-btn-desc">${escapeHtml(opt.desc)}</span>
                    </div>
                `;
                card.addEventListener('click', () => {
                    closeQuickRelModal();
                    openAddFormForRelative(targetPerson, opt);
                });
                quickRelGrid.appendChild(card);
            });
        });

        relSelectOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeQuickRelModal() {
        relSelectOverlay.classList.remove('active');
        document.body.style.overflow = '';
        quickRelTargetPerson = null;
    }

    if (relSelectClose) relSelectClose.addEventListener('click', closeQuickRelModal);
    if (relSelectOverlay) {
        relSelectOverlay.addEventListener('click', (e) => {
            if (e.target === relSelectOverlay) closeQuickRelModal();
        });
    }

    function getAllQuickCategories(targetPerson) {
        const isUz = currentLang === 'uz';
        const tName = targetPerson.name;
        const tRel = targetPerson.relation;

        return [
            {
                title: isUz ? "Dvyurodniylar (Amakivachchalar)" : 'Двоюродные братья и сёстры',
                icon: '👥',
                items: [
                    {
                        type: 'cousin_w',
                        title: isUz ? 'Dvyurodnaya singil/opa (chapda)' : 'Двоюродная сестра (слева)',
                        relation: 'Двоюродная сестра',
                        side: 'center',
                        icon: '👧',
                        desc: isUz ? `${tName}ning qizi — chap tomonga qo'shiladi` : `Встанет слева в блок двоюродных сестёр`,
                        presetWhose: (tRel.includes('Дядя') || tRel.includes('Тётя') || tRel.includes('Папа') || tRel.includes('Мама')) ? tName : ''
                    },
                    {
                        type: 'cousin_m',
                        title: isUz ? "Dvyurodniy aka/uka (o'ngda)" : 'Двоюродный брат (справа)',
                        relation: 'Двоюродный брат',
                        side: 'center',
                        icon: '👦',
                        desc: isUz ? `${tName}ning o'g'li — o'ng tomonga qo'shiladi` : `Встанет справа в блок двоюродных братьев`,
                        presetWhose: (tRel.includes('Дядя') || tRel.includes('Тётя') || tRel.includes('Папа') || tRel.includes('Мама')) ? tName : ''
                    }
                ]
            },
            {
                title: isUz ? 'Aka-uka va Opa-singillar' : 'Родные братья и сёстры',
                icon: '🌟',
                items: [
                    { type: 'brother', title: isUz ? 'Aka / Uka' : 'Брат', relation: 'Брат', side: 'center', icon: '👦', desc: isUz ? 'Kamrandan chapga joylashadi' : 'Встанет слева от Камрана' },
                    { type: 'sister',  title: isUz ? 'Opa / Singil' : 'Сестра', relation: 'Сестра', side: 'center', icon: '👧', desc: isUz ? "Kamrandan o'ngga joylashadi" : 'Встанет справа от Камрана' }
                ]
            },
            {
                title: isUz ? 'Ota-onalar' : 'Родители',
                icon: '👑',
                items: [
                    { type: 'dad', title: isUz ? 'Ota' : 'Папа', relation: 'Папа', side: 'paternal', icon: '👨', desc: isUz ? 'Pastga, ota tomoniga joylashadi' : 'Встанет снизу (в блок папы)' },
                    { type: 'mom', title: isUz ? 'Ona' : 'Мама', relation: 'Мама', side: 'maternal', icon: '👩', desc: isUz ? 'Pastga, ona tomoniga joylashadi' : 'Встанет снизу (в блок мамы)' }
                ]
            },
            {
                title: isUz ? 'Ota tomon qarindoshlar' : 'Родственники Папы (слева от Папы)',
                icon: '👨‍👦',
                items: [
                    { type: 'uncle_dad', title: isUz ? 'Amaki (ota tomon)' : 'Дядя (по папе)', relation: 'Дядя (по папе)', side: 'paternal', icon: '👨', desc: isUz ? 'Otaning akasi yoki ukasi' : 'Брат папы — встанет слева от Папы' },
                    { type: 'aunt_dad',  title: isUz ? 'Amma (ota tomon)' : 'Тётя (по папе)', relation: 'Тётя (по папе)', side: 'paternal', icon: '👩', desc: isUz ? 'Otaning opasi yoki singlisi' : 'Сестра папы — встанет слева от Папы' }
                ]
            },
            {
                title: isUz ? 'Ona tomon qarindoshlar' : 'Родственники Мамы (справа от Мамы)',
                icon: '👩‍👦',
                items: [
                    { type: 'uncle_mom', title: isUz ? "Tog'a (ona tomon)" : 'Дядя (по маме)', relation: 'Дядя (по маме)', side: 'maternal', icon: '👨', desc: isUz ? 'Onaning akasi yoki ukasi' : 'Брат мамы — встанет справа от Мамы' },
                    { type: 'aunt_mom',  title: isUz ? 'Xola (ona tomon)' : 'Тётя (по маме)', relation: 'Тётя (по маме)', side: 'maternal', icon: '👩', desc: isUz ? 'Onaning opasi yoki singlisi' : 'Сестра мамы — встанет справа от Мамы' }
                ]
            },
            {
                title: isUz ? 'Bobolar va Buvilar' : 'Бабушки и Дедушки',
                icon: '👴',
                items: [
                    { type: 'gdad_dad', title: isUz ? 'Bobo (otaning otasi)' : 'Дедушка (папин папа)', relation: 'Дедушка (папин папа)', side: 'paternal', icon: '👴', desc: isUz ? 'Otaning otasi' : 'Папин папа' },
                    { type: 'gmom_dad', title: isUz ? 'Buvi (otaning onasi)' : 'Бабушка (папина мама)', relation: 'Бабушка (папина мама)', side: 'paternal', icon: '👵', desc: isUz ? 'Otaning onasi' : 'Папина мама' },
                    { type: 'gdad_mom', title: isUz ? 'Bobo (onaning otasi)' : 'Дедушка (мамин папа)', relation: 'Дедушка (мамин папа)', side: 'maternal', icon: '👴', desc: isUz ? 'Onaning otasi' : 'Мамин папа' },
                    { type: 'gmom_mom', title: isUz ? 'Buvi (onaning onasi)' : 'Бабушка (мамина мама)', relation: 'Бабушка (мамина мама)', side: 'maternal', icon: '👵', desc: isUz ? 'Onaning onasi' : 'Мамина мама' }
                ]
            },
            {
                title: isUz ? 'Farzandlar va boshqalar' : 'Дети и другие',
                icon: '👶',
                items: [
                    { type: 'son',      title: isUz ? "O'g'il" : 'Сын', relation: 'Сын', side: 'center', icon: '👶', desc: isUz ? "Farzand (o'g'il)" : 'Сын' },
                    { type: 'daughter', title: isUz ? 'Qiz' : 'Дочь', relation: 'Дочь', side: 'center', icon: '👶', desc: isUz ? 'Farzand (qiz)' : 'Дочь' },
                    { type: 'custom',   title: isUz ? 'Boshqa qarindosh...' : 'Другой родственник...', relation: '', side: 'center', icon: '➕', desc: isUz ? "Ro'yxatdan tanlash" : 'Выбрать вручную', fullWidth: true }
                ]
            }
        ];
    }

    function openAddFormForRelative(targetPerson, opt) {
        openAddForm();
        relatedToIdInput.value = targetPerson.id;
        relatedRoleInput.value = opt.type;

        if (opt.relation) {
            inputRelation.value = opt.relation;
        }
        if (opt.side) {
            inputSide.value = opt.side;
        }

        if (opt.presetWhose) {
            inputParentWhose.value = opt.presetWhose;
        } else if (opt.relation === 'Двоюродный брат' || opt.relation === 'Двоюродная сестра') {
            inputParentWhose.value = targetPerson.name;
        }

        relativeBannerText.textContent = `${t('quickRelTitle')}: «${opt.title}» (${targetPerson.name})`;
        relativeBanner.style.display = 'flex';
        inputName.focus();
    }

    function openAddFormForRelation(relName, side) {
        openAddForm();
        inputRelation.value = relName;
        inputSide.value = side;
        inputName.focus();
    }

    if (btnClearRelative) {
        btnClearRelative.addEventListener('click', () => {
            relatedToIdInput.value = '';
            relatedRoleInput.value = '';
            relativeBanner.style.display = 'none';
        });
    }

    // ─── 12. МОДАЛКА ПРОСМОТРА ───
    function openViewModal(person) {
        currentViewId = person.id;
        const info = RELATION_MAP[person.relation] || RELATION_MAP['Другое'];
        const isDeceased = !!person.deathDate;

        const photoEl = document.getElementById('viewPhoto');
        const wrapper = document.querySelector('#viewModal .modal-photo-wrapper');

        const old = wrapper.querySelector('.modal-placeholder');
        if (old) old.remove();

        if (person.photo) {
            photoEl.src = person.photo;
            photoEl.style.display = 'block';
        } else {
            photoEl.style.display = 'none';
            const ph = document.createElement('div');
            ph.className = 'modal-placeholder';
            ph.style.cssText = 'width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--bg-secondary),var(--bg-card-hover));display:flex;align-items:center;justify-content:center;font-size:3rem;border:3px solid var(--accent);box-shadow:0 0 25px var(--accent-glow);';
            ph.textContent = info.emoji;
            wrapper.appendChild(ph);
        }

        document.getElementById('viewName').textContent = person.name;
        document.getElementById('viewRelation').textContent = getLocalizedRelation(person.relation);

        // Чей сын / Чья дочь в модалке просмотра
        if (person.parentWhose && person.parentWhose.trim()) {
            viewWhoseRow.style.display = 'inline-flex';
            if (person.relation === 'Двоюродная сестра') {
                viewWhoseLabel.textContent = `${t('daughterOf')}:`;
            } else if (person.relation === 'Двоюродный брат') {
                viewWhoseLabel.textContent = `${t('sonOf')}:`;
            } else {
                viewWhoseLabel.textContent = `${t('whoseLabel')}:`;
            }
            viewWhoseValue.textContent = person.parentWhose.trim();
        } else {
            viewWhoseRow.style.display = 'none';
        }

        if (person.profession && person.profession.trim()) {
            viewProfession.textContent = person.profession.trim();
            viewProfessionRow.style.display = 'inline-flex';
        } else {
            viewProfessionRow.style.display = 'none';
        }

        if (person.music && person.music.trim()) {
            viewMusic.textContent = person.music.trim();
            viewMusicRow.style.display = 'flex';
        } else {
            viewMusicRow.style.display = 'none';
        }

        document.getElementById('viewBirth').textContent = person.birthDate || t('notSpecified');

        const deathRow = document.getElementById('viewDeathRow');
        if (isDeceased) {
            deathRow.style.display = 'flex';
            document.getElementById('viewDeath').textContent = person.deathDate;
        } else {
            deathRow.style.display = 'none';
        }

        document.getElementById('viewBio').textContent = person.bio || '';

        viewOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeViewModal() {
        viewOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentViewId = null;
    }

    viewClose.addEventListener('click', closeViewModal);
    viewOverlay.addEventListener('click', e => { if (e.target === viewOverlay) closeViewModal(); });

    if (btnModalAddRel) {
        btnModalAddRel.addEventListener('click', () => {
            const person = familyMembers.find(p => p.id === currentViewId);
            if (person) {
                closeViewModal();
                setTimeout(() => openQuickRelModal(person), 150);
            }
        });
    }

    // ─── 13. ПРЕСЕТЫ РОДИТЕЛЕЙ ДЛЯ ПОЛЯ «ЧЕЙ СЫН / ЧЬЯ ДОЧЬ» ───
    function populateParentPresets() {
        if (!selectParentPreset) return;
        selectParentPreset.innerHTML = `<option value="">${escapeHtml(t('selectPresetDefault'))}</option>`;

        // Добавим потенциальных родителей: дяди, тёти, папа, мама, дедушки, бабушки
        const candidates = familyMembers.filter(p => p.relation !== 'Это я');
        candidates.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.name;
            opt.textContent = `${p.name} (${getLocalizedRelation(p.relation)})`;
            selectParentPreset.appendChild(opt);
        });
    }

    if (selectParentPreset) {
        selectParentPreset.addEventListener('change', () => {
            if (selectParentPreset.value) {
                inputParentWhose.value = selectParentPreset.value;
            }
        });
    }

    // ─── 14. ФОРМА: ДОБАВЛЕНИЕ / РЕДАКТИРОВАНИЕ ───
    function openAddForm() {
        formTitle.textContent = t('formAddTitle');
        editingIdInput.value = '';
        relatedToIdInput.value = '';
        relatedRoleInput.value = '';
        relativeBanner.style.display = 'none';
        inputName.value = '';
        inputRelation.value = '';
        inputParentWhose.value = '';
        inputSide.value = 'auto';
        inputProfession.value = '';
        inputBirth.value = '';
        inputDeath.value = '';
        inputMusic.value = '';
        inputBio.value = '';
        currentPhotoData = null;
        photoPreviewImg.style.display = 'none';
        photoPlaceholder.style.display = 'flex';
        btnRemovePhoto.style.display = 'none';

        populateParentPresets();
        formOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openEditForm(person) {
        formTitle.textContent = t('formEditTitle');
        editingIdInput.value = person.id;
        relatedToIdInput.value = person.relatedToId || '';
        relatedRoleInput.value = '';
        relativeBanner.style.display = 'none';
        inputName.value = person.name || '';
        inputRelation.value = person.relation || '';
        inputParentWhose.value = person.parentWhose || '';
        inputSide.value = person.side || 'auto';
        inputProfession.value = person.profession || '';
        inputBirth.value = person.birthDate || '';
        inputDeath.value = person.deathDate || '';
        inputMusic.value = person.music || '';
        inputBio.value = person.bio || '';
        currentPhotoData = person.photo || null;

        if (person.photo) {
            photoPreviewImg.src = person.photo;
            photoPreviewImg.style.display = 'block';
            photoPlaceholder.style.display = 'none';
            btnRemovePhoto.style.display = 'block';
        } else {
            photoPreviewImg.style.display = 'none';
            photoPlaceholder.style.display = 'flex';
            btnRemovePhoto.style.display = 'none';
        }

        populateParentPresets();
        formOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFormModal() {
        formOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    formClose.addEventListener('click', closeFormModal);
    btnCancel.addEventListener('click', closeFormModal);
    formOverlay.addEventListener('click', e => { if (e.target === formOverlay) closeFormModal(); });

    // Загрузка фото
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            currentPhotoData = ev.target.result;
            photoPreviewImg.src = currentPhotoData;
            photoPreviewImg.style.display = 'block';
            photoPlaceholder.style.display = 'none';
            btnRemovePhoto.style.display = 'block';
        };
        reader.readAsDataURL(file);
        photoInput.value = '';
    });

    btnRemovePhoto.addEventListener('click', () => {
        currentPhotoData = null;
        photoPreviewImg.style.display = 'none';
        photoPlaceholder.style.display = 'flex';
        btnRemovePhoto.style.display = 'none';
    });

    // Сохранение формы
    personForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const editingId = editingIdInput.value;
        const name = inputName.value.trim();
        const relation = inputRelation.value;
        const rawSide = inputSide.value;
        const side = detectSide(relation, rawSide);
        const parentWhose = inputParentWhose.value.trim();
        const profession = inputProfession.value.trim();
        const music = inputMusic.value.trim();
        const birthDate = inputBirth.value.trim();
        const deathDate = inputDeath.value.trim() || null;
        const bio = inputBio.value.trim();
        const relatedToId = relatedToIdInput.value || null;

        if (!name || !relation) return;

        if (editingId) {
            const idx = familyMembers.findIndex(p => p.id === editingId);
            if (idx !== -1) {
                familyMembers[idx] = {
                    ...familyMembers[idx],
                    name,
                    relation,
                    side,
                    parentWhose,
                    profession,
                    music,
                    birthDate,
                    deathDate,
                    bio,
                    photo: currentPhotoData,
                    relatedToId: relatedToId || familyMembers[idx].relatedToId
                };
            }
        } else {
            familyMembers.push({
                id: genId(),
                name,
                relation,
                side,
                parentWhose,
                profession,
                music,
                birthDate,
                deathDate,
                bio,
                photo: currentPhotoData,
                relatedToId
            });
        }

        saveFamily();
        closeFormModal();
        buildTree(searchInput.value);
    });

    // ─── 15. ДЕЙСТВИЯ: ДОБАВИТЬ / РЕДАКТИРОВАТЬ / УДАЛИТЬ ───
    btnAdd.addEventListener('click', openAddForm);

    btnEdit.addEventListener('click', () => {
        const person = familyMembers.find(p => p.id === currentViewId);
        if (person) {
            closeViewModal();
            setTimeout(() => openEditForm(person), 150);
        }
    });

    btnDelete.addEventListener('click', () => {
        if (!currentViewId) return;
        const person = familyMembers.find(p => p.id === currentViewId);
        if (person && confirm(t('confirmDelete', { name: person.name, relation: getLocalizedRelation(person.relation) }))) {
            familyMembers = familyMembers.filter(p => p.id !== currentViewId);
            saveFamily();
            closeViewModal();
            buildTree(searchInput.value);
        }
    });

    // Поиск
    searchInput.addEventListener('input', () => {
        const q = searchInput.value;
        searchClear.classList.toggle('visible', q.length > 0);
        buildTree(q);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        buildTree();
    });

    // Клавиша Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (relSelectOverlay && relSelectOverlay.classList.contains('active')) closeQuickRelModal();
            else if (formOverlay.classList.contains('active')) closeFormModal();
            else if (viewOverlay.classList.contains('active')) closeViewModal();
        }
    });

    // ─── 16. ГЕНЕРАЦИЯ ЗВЁЗДНОГО НЕБА (SPACE DESIGN) ───
    function generateStarfield() {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;
        starfield.innerHTML = '';
        const starCount = 95;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() < 0.65 ? 1.5 : (Math.random() < 0.88 ? 2.5 : 3.5);
            const x = (Math.random() * 100).toFixed(2);
            const y = (Math.random() * 100).toFixed(2);
            const dur = (Math.random() * 3.5 + 2).toFixed(1);
            const delay = (Math.random() * 6).toFixed(1);
            const opacity = (Math.random() * 0.6 + 0.35).toFixed(2);
            
            star.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: #ffffff;
                border-radius: 50%;
                opacity: ${opacity};
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.9), 0 0 ${size * 4}px rgba(56, 189, 248, 0.6);
                animation: starTwinkle ${dur}s ease-in-out ${delay}s infinite alternate;
            `;
            starfield.appendChild(star);
        }
    }
    generateStarfield();
    window.addEventListener('resize', generateStarfield);

    // ─── 17. ЧАСТИЦЫ НА ФОНЕ ───
    function createParticles() {
        setInterval(() => {
            const theme = THEMES[currentThemeIdx] || THEMES[0];
            const colors = theme.colors;
            const p = document.createElement('div');
            p.className = 'particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 2;
            const dur = Math.random() * 8 + 6;
            p.style.cssText = `left:${Math.random()*100}vw;bottom:-10px;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 ${size*2}px ${color};animation-duration:${dur}s;`;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), dur * 1000);
        }, 900);
    }
    createParticles();

    // ─── 18. СВЕЧЕНИЕ КУРСОРА ───
    const cg = document.createElement('div');
    cg.style.cssText = 'position:fixed;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,var(--accent-glow) 0%,transparent 70%);pointer-events:none;z-index:0;transition:transform 0.15s ease;transform:translate(-50%,-50%);opacity:0.32;';
    document.body.appendChild(cg);
    document.addEventListener('mousemove', e => {
        cg.style.left = e.clientX + 'px';
        cg.style.top = e.clientY + 'px';
    });

    // ─── 19. ИНИЦИАЛИЗАЦИЯ ───
    setLanguage(currentLang);
});