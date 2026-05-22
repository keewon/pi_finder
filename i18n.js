'use strict';

// ===== Translations =====
var TRANSLATIONS = {
  ko: {
    app_title: '수학 상수 외우기 & 찾기',
    greeting: '안녕하세요,',
    btn_memorize: '외우기', btn_find: '찾기', btn_records: '기록 보기',
    tab_mine: '내 기록', tab_all: '전체', tab_monthly: '이번 달', tab_weekly: '이번 주',
    settings_title: '설정', settings_username: '사용자 이름', btn_random: '랜덤',
    settings_startpos: '시작 위치', opt_decimal: '소숫점 이하부터',
    intpart_opt: '{n}. 부터',
    settings_mode: '모드', mode_keypad: '키패드 입력 (1자리씩)',
    mode_multiple: '객관식 ({n}자리씩)',
    settings_theme: '테마', theme_system: '시스템 설정', theme_light: '라이트', theme_dark: '다크',
    settings_lang: '언어',
    gameover_retry: '다시하기', gameover_continue: '이어서하기',
    save_record: '기록 저장', view_records: '기록 보기', name_placeholder: '이름',
    btn_delete: '삭제',
    search_placeholder: '숫자 입력 (최대 8자리)', search_btn: '찾기',
    search_desc: '{sym}의 백만 자리 안에서 원하는 숫자가 어디에 있는지 찾아보세요.',
    question: '다음 {n}자리는?', debug_answer: '정답: ',
    wrong_msg: '틀렸습니다. 정답은 {ans}입니다.',
    gameover_score: '<strong>{n}</strong>자리 · {t}',
    stats_of_1000: ' / 1000자리',
    loading: '불러오는 중...', server_error: '서버에 연결할 수 없습니다.',
    records_empty: '기록이 없습니다.',
    digits_unit: '{n}자리', digits_per: '{n}자리씩',
    continues: '이어서 {n}회', me_tag: '나', rank_label: '{n}위',
    search_error: '1~8자리 숫자를 입력해주세요.', searching: '검색 중...',
    search_title: '검색 결과', search_query: '검색어: {q}',
    search_pos: '최초 위치: 소숫점 이하 {n}번째 자리',
    search_count: '발견 횟수: {n}번',
    search_not_found: '{c}의 백만자리 내에서 해당 숫자를 찾을 수 없습니다.',
  },
  en: {
    app_title: 'Math Constants — Memorize & Find',
    greeting: 'Hello,',
    btn_memorize: 'Memorize', btn_find: 'Find', btn_records: 'Records',
    tab_mine: 'Mine', tab_all: 'All', tab_monthly: 'Month', tab_weekly: 'Week',
    settings_title: 'Settings', settings_username: 'Username', btn_random: 'Random',
    settings_startpos: 'Start at', opt_decimal: 'After decimal',
    intpart_opt: 'From {n}.',
    settings_mode: 'Mode', mode_keypad: 'Keypad (1 digit)',
    mode_multiple: 'Multiple choice ({n} digits)',
    settings_theme: 'Theme', theme_system: 'System', theme_light: 'Light', theme_dark: 'Dark',
    settings_lang: 'Language',
    gameover_retry: 'Retry', gameover_continue: 'Continue',
    save_record: 'Save', view_records: 'View Records', name_placeholder: 'Name',
    btn_delete: 'Delete',
    search_placeholder: 'Enter digits (max 8)', search_btn: 'Find',
    search_desc: 'Find where your number appears in the first million digits of {sym}.',
    question: 'Next {n} digits?', debug_answer: 'Answer: ',
    wrong_msg: 'Wrong! The answer is {ans}.',
    gameover_score: '<strong>{n}</strong> digits · {t}',
    stats_of_1000: ' / 1000 digits',
    loading: 'Loading...', server_error: 'Cannot connect to server.',
    records_empty: 'No records yet.',
    digits_unit: '{n} digits', digits_per: '{n} at a time',
    continues: '{n} continue(s)', me_tag: 'me', rank_label: '#{n}',
    search_error: 'Please enter 1–8 digits.', searching: 'Searching...',
    search_title: 'Search Results', search_query: 'Query: {q}',
    search_pos: 'First at decimal place {n}',
    search_count: 'Found {n} time(s)',
    search_not_found: 'Not found in the first million digits of {c}.',
  },
  ja: {
    app_title: '数学定数 — 暗記 & 検索',
    greeting: 'こんにちは、',
    btn_memorize: '暗記', btn_find: '探す', btn_records: '記録',
    tab_mine: '自分', tab_all: '全体', tab_monthly: '今月', tab_weekly: '今週',
    settings_title: '設定', settings_username: 'ユーザー名', btn_random: 'ランダム',
    settings_startpos: '開始位置', opt_decimal: '小数点以下から',
    intpart_opt: '{n}. から',
    settings_mode: 'モード', mode_keypad: 'キーパッド（1桁ずつ）',
    mode_multiple: '択一式（{n}桁ずつ）',
    settings_theme: 'テーマ', theme_system: 'システム', theme_light: 'ライト', theme_dark: 'ダーク',
    settings_lang: '言語',
    gameover_retry: 'もう一度', gameover_continue: '続ける',
    save_record: '記録する', view_records: '記録を見る', name_placeholder: '名前',
    btn_delete: '削除',
    search_placeholder: '数字を入力（最大8桁）', search_btn: '探す',
    search_desc: '{sym}の100万桁の中から数字の位置を探しましょう。',
    question: '次の{n}桁は？', debug_answer: '正解: ',
    wrong_msg: '不正解。正解は{ans}です。',
    gameover_score: '<strong>{n}</strong>桁 · {t}',
    stats_of_1000: ' / 1000桁',
    loading: '読込中...', server_error: 'サーバーに接続できません。',
    records_empty: '記録がありません。',
    digits_unit: '{n}桁', digits_per: '{n}桁ずつ',
    continues: '{n}回続き', me_tag: '私', rank_label: '{n}位',
    search_error: '1〜8桁の数字を入力してください。', searching: '検索中...',
    search_title: '検索結果', search_query: '検索語: {q}',
    search_pos: '最初の位置: 小数点以下第{n}位',
    search_count: '出現回数: {n}回',
    search_not_found: '{c}の100万桁以内では見つかりませんでした。',
  },
  zh: {
    app_title: '数学常数 — 记忆 & 查找',
    greeting: '你好，',
    btn_memorize: '记忆', btn_find: '查找', btn_records: '记录',
    tab_mine: '我的', tab_all: '全部', tab_monthly: '本月', tab_weekly: '本周',
    settings_title: '设置', settings_username: '用户名', btn_random: '随机',
    settings_startpos: '开始位置', opt_decimal: '从小数点后',
    intpart_opt: '从{n}.',
    settings_mode: '模式', mode_keypad: '键盘输入（每次1位）',
    mode_multiple: '选择题（每次{n}位）',
    settings_theme: '主题', theme_system: '系统', theme_light: '浅色', theme_dark: '深色',
    settings_lang: '语言',
    gameover_retry: '再试', gameover_continue: '继续',
    save_record: '保存', view_records: '查看记录', name_placeholder: '姓名',
    btn_delete: '删除',
    search_placeholder: '输入数字（最多8位）', search_btn: '查找',
    search_desc: '在{sym}的前一百万位中查找你的数字。',
    question: '接下来{n}位？', debug_answer: '答案: ',
    wrong_msg: '错误。正确答案是{ans}。',
    gameover_score: '<strong>{n}</strong>位 · {t}',
    stats_of_1000: ' / 1000位',
    loading: '加载中...', server_error: '无法连接到服务器。',
    records_empty: '暂无记录。',
    digits_unit: '{n}位', digits_per: '每次{n}位',
    continues: '续{n}次', me_tag: '我', rank_label: '第{n}名',
    search_error: '请输入1~8位数字。', searching: '搜索中...',
    search_title: '搜索结果', search_query: '搜索词: {q}',
    search_pos: '首次出现: 小数点后第{n}位',
    search_count: '出现次数: {n}次',
    search_not_found: '在{c}的前百万位内未找到。',
  },
  es: {
    app_title: 'Constantes Matemáticas — Memorizar & Buscar',
    greeting: '¡Hola,',
    btn_memorize: 'Memorizar', btn_find: 'Buscar', btn_records: 'Récords',
    tab_mine: 'Míos', tab_all: 'Todos', tab_monthly: 'Mes', tab_weekly: 'Semana',
    settings_title: 'Ajustes', settings_username: 'Nombre', btn_random: 'Aleatorio',
    settings_startpos: 'Inicio', opt_decimal: 'Tras la coma',
    intpart_opt: 'Desde {n}.',
    settings_mode: 'Modo', mode_keypad: 'Teclado (1 dígito)',
    mode_multiple: 'Opción múltiple ({n} dígitos)',
    settings_theme: 'Tema', theme_system: 'Sistema', theme_light: 'Claro', theme_dark: 'Oscuro',
    settings_lang: 'Idioma',
    gameover_retry: 'Reintentar', gameover_continue: 'Continuar',
    save_record: 'Guardar', view_records: 'Ver récords', name_placeholder: 'Nombre',
    btn_delete: 'Borrar',
    search_placeholder: 'Ingresa dígitos (máx. 8)', search_btn: 'Buscar',
    search_desc: 'Encuentra dónde aparece tu número en el primer millón de dígitos de {sym}.',
    question: '¿Próximos {n} dígitos?', debug_answer: 'Respuesta: ',
    wrong_msg: '¡Incorrecto! La respuesta es {ans}.',
    gameover_score: '<strong>{n}</strong> díg. · {t}',
    stats_of_1000: ' / 1000 díg.',
    loading: 'Cargando...', server_error: 'No se puede conectar al servidor.',
    records_empty: 'Sin récords aún.',
    digits_unit: '{n} díg.', digits_per: 'De {n} en {n}',
    continues: '{n} cont.', me_tag: 'yo', rank_label: '#{n}',
    search_error: 'Ingresa entre 1 y 8 dígitos.', searching: 'Buscando...',
    search_title: 'Resultados', search_query: 'Búsqueda: {q}',
    search_pos: 'Primera posición: {n}.º decimal',
    search_count: 'Apariciones: {n}',
    search_not_found: 'No encontrado en el primer millón de dígitos de {c}.',
  },
  fr: {
    app_title: 'Constantes Mathématiques — Mémoriser & Chercher',
    greeting: 'Bonjour,',
    btn_memorize: 'Mémoriser', btn_find: 'Chercher', btn_records: 'Résultats',
    tab_mine: 'Les miens', tab_all: 'Tous', tab_monthly: 'Ce mois', tab_weekly: 'Semaine',
    settings_title: 'Paramètres', settings_username: 'Nom', btn_random: 'Aléatoire',
    settings_startpos: 'Début', opt_decimal: 'Après la virgule',
    intpart_opt: 'Depuis {n}.',
    settings_mode: 'Mode', mode_keypad: 'Pavé numérique (1 chiffre)',
    mode_multiple: 'QCM ({n} chiffres)',
    settings_theme: 'Thème', theme_system: 'Système', theme_light: 'Clair', theme_dark: 'Sombre',
    settings_lang: 'Langue',
    gameover_retry: 'Réessayer', gameover_continue: 'Continuer',
    save_record: 'Enregistrer', view_records: 'Voir résultats', name_placeholder: 'Nom',
    btn_delete: 'Supprimer',
    search_placeholder: 'Entrez des chiffres (max 8)', search_btn: 'Chercher',
    search_desc: 'Trouvez où se trouve votre nombre dans le premier million de décimales de {sym}.',
    question: 'Les {n} prochains chiffres ?', debug_answer: 'Réponse : ',
    wrong_msg: 'Incorrect ! La réponse est {ans}.',
    gameover_score: '<strong>{n}</strong> chiff. · {t}',
    stats_of_1000: ' / 1000 chiff.',
    loading: 'Chargement...', server_error: 'Connexion au serveur impossible.',
    records_empty: 'Aucun résultat.',
    digits_unit: '{n} chiff.', digits_per: '{n} à la fois',
    continues: '{n} cont.', me_tag: 'moi', rank_label: '#{n}',
    search_error: 'Entrez 1 à 8 chiffres.', searching: 'Recherche...',
    search_title: 'Résultats', search_query: 'Recherche : {q}',
    search_pos: 'Première position : {n}e décimale',
    search_count: 'Occurrences : {n}',
    search_not_found: 'Introuvable dans le premier million de décimales de {c}.',
  },
  de: {
    app_title: 'Mathematische Konstanten — Lernen & Suchen',
    greeting: 'Hallo,',
    btn_memorize: 'Lernen', btn_find: 'Suchen', btn_records: 'Bestleistungen',
    tab_mine: 'Meine', tab_all: 'Alle', tab_monthly: 'Monat', tab_weekly: 'Woche',
    settings_title: 'Einstellungen', settings_username: 'Nutzername', btn_random: 'Zufällig',
    settings_startpos: 'Startposition', opt_decimal: 'Nach dem Komma',
    intpart_opt: 'Ab {n}.',
    settings_mode: 'Modus', mode_keypad: 'Tastatur (1 Stelle)',
    mode_multiple: 'Multiple Choice ({n} Stellen)',
    settings_theme: 'Design', theme_system: 'System', theme_light: 'Hell', theme_dark: 'Dunkel',
    settings_lang: 'Sprache',
    gameover_retry: 'Nochmal', gameover_continue: 'Weiter',
    save_record: 'Speichern', view_records: 'Ergebnisse', name_placeholder: 'Name',
    btn_delete: 'Löschen',
    search_placeholder: 'Ziffern eingeben (max. 8)', search_btn: 'Suchen',
    search_desc: 'Finde, wo deine Zahl in der ersten Million Stellen von {sym} vorkommt.',
    question: 'Nächste {n} Ziffern?', debug_answer: 'Antwort: ',
    wrong_msg: 'Falsch! Die Antwort ist {ans}.',
    gameover_score: '<strong>{n}</strong> Stellen · {t}',
    stats_of_1000: ' / 1000 Stellen',
    loading: 'Laden...', server_error: 'Serververbindung fehlgeschlagen.',
    records_empty: 'Keine Einträge.',
    digits_unit: '{n} Stellen', digits_per: '{n} auf einmal',
    continues: '{n}× weitergespielt', me_tag: 'ich', rank_label: '#{n}',
    search_error: 'Bitte 1–8 Ziffern eingeben.', searching: 'Suche...',
    search_title: 'Ergebnisse', search_query: 'Suche: {q}',
    search_pos: 'Erste Position: {n}. Dezimalstelle',
    search_count: 'Vorkommnisse: {n}',
    search_not_found: 'Nicht in den ersten einer Million Stellen von {c} gefunden.',
  },
  pt: {
    app_title: 'Constantes Matemáticas — Memorizar & Buscar',
    greeting: 'Olá,',
    btn_memorize: 'Memorizar', btn_find: 'Buscar', btn_records: 'Registros',
    tab_mine: 'Meus', tab_all: 'Todos', tab_monthly: 'Mês', tab_weekly: 'Semana',
    settings_title: 'Configurações', settings_username: 'Nome', btn_random: 'Aleatório',
    settings_startpos: 'Início', opt_decimal: 'Após vírgula',
    intpart_opt: 'A partir de {n}.',
    settings_mode: 'Modo', mode_keypad: 'Teclado (1 dígito)',
    mode_multiple: 'Múltipla escolha ({n} dígitos)',
    settings_theme: 'Tema', theme_system: 'Sistema', theme_light: 'Claro', theme_dark: 'Escuro',
    settings_lang: 'Idioma',
    gameover_retry: 'Tentar novamente', gameover_continue: 'Continuar',
    save_record: 'Salvar', view_records: 'Ver registros', name_placeholder: 'Nome',
    btn_delete: 'Excluir',
    search_placeholder: 'Digite os algarismos (máx. 8)', search_btn: 'Buscar',
    search_desc: 'Encontre onde seu número aparece no primeiro milhão de dígitos de {sym}.',
    question: 'Próximos {n} dígitos?', debug_answer: 'Resposta: ',
    wrong_msg: 'Errado! A resposta é {ans}.',
    gameover_score: '<strong>{n}</strong> dígitos · {t}',
    stats_of_1000: ' / 1000 dígitos',
    loading: 'Carregando...', server_error: 'Não foi possível conectar ao servidor.',
    records_empty: 'Sem registros.',
    digits_unit: '{n} díg.', digits_per: '{n} por vez',
    continues: '{n} cont.', me_tag: 'eu', rank_label: '#{n}',
    search_error: 'Digite de 1 a 8 dígitos.', searching: 'Buscando...',
    search_title: 'Resultados', search_query: 'Busca: {q}',
    search_pos: 'Primeira posição: {n}.ª casa decimal',
    search_count: 'Ocorrências: {n}',
    search_not_found: 'Não encontrado no primeiro milhão de dígitos de {c}.',
  },
  ru: {
    app_title: 'Математические константы — Запомнить & Найти',
    greeting: 'Привет,',
    btn_memorize: 'Запомнить', btn_find: 'Найти', btn_records: 'Рекорды',
    tab_mine: 'Мои', tab_all: 'Все', tab_monthly: 'Месяц', tab_weekly: 'Неделя',
    settings_title: 'Настройки', settings_username: 'Имя', btn_random: 'Случайное',
    settings_startpos: 'Начало', opt_decimal: 'После запятой',
    intpart_opt: 'С {n}.',
    settings_mode: 'Режим', mode_keypad: 'Клавиатура (1 цифра)',
    mode_multiple: 'Выбор ({n} цифр)',
    settings_theme: 'Тема', theme_system: 'Системная', theme_light: 'Светлая', theme_dark: 'Тёмная',
    settings_lang: 'Язык',
    gameover_retry: 'Ещё раз', gameover_continue: 'Продолжить',
    save_record: 'Сохранить', view_records: 'Рекорды', name_placeholder: 'Имя',
    btn_delete: 'Удалить',
    search_placeholder: 'Введите цифры (макс. 8)', search_btn: 'Найти',
    search_desc: 'Найдите, где ваше число встречается в первом миллионе знаков {sym}.',
    question: 'Следующие {n} цифр?', debug_answer: 'Ответ: ',
    wrong_msg: 'Неверно! Правильный ответ: {ans}.',
    gameover_score: '<strong>{n}</strong> цифр · {t}',
    stats_of_1000: ' / 1000 цифр',
    loading: 'Загрузка...', server_error: 'Нет соединения с сервером.',
    records_empty: 'Нет записей.',
    digits_unit: '{n} цифр', digits_per: 'по {n}',
    continues: '{n} продолж.', me_tag: 'я', rank_label: '#{n}',
    search_error: 'Введите от 1 до 8 цифр.', searching: 'Поиск...',
    search_title: 'Результаты', search_query: 'Запрос: {q}',
    search_pos: 'Первая позиция: {n}-й знак',
    search_count: 'Количество: {n}',
    search_not_found: 'Не найдено в первом миллионе знаков {c}.',
  },
  ar: {
    app_title: 'الثوابت الرياضية — حفظ & بحث',
    greeting: 'مرحباً،',
    btn_memorize: 'حفظ', btn_find: 'بحث', btn_records: 'السجلات',
    tab_mine: 'لي', tab_all: 'الكل', tab_monthly: 'الشهر', tab_weekly: 'الأسبوع',
    settings_title: 'الإعدادات', settings_username: 'الاسم', btn_random: 'عشوائي',
    settings_startpos: 'البداية', opt_decimal: 'بعد الفاصلة',
    intpart_opt: 'من {n}.',
    settings_mode: 'الوضع', mode_keypad: 'لوحة مفاتيح (1 رقم)',
    mode_multiple: 'اختيار متعدد ({n} أرقام)',
    settings_theme: 'السمة', theme_system: 'النظام', theme_light: 'فاتح', theme_dark: 'داكن',
    settings_lang: 'اللغة',
    gameover_retry: 'إعادة', gameover_continue: 'متابعة',
    save_record: 'حفظ', view_records: 'السجلات', name_placeholder: 'الاسم',
    btn_delete: 'حذف',
    search_placeholder: 'أدخل الأرقام (حتى 8)', search_btn: 'بحث',
    search_desc: 'ابحث عن رقمك في أول مليون خانة من {sym}.',
    question: 'الأرقام الـ{n} التالية؟', debug_answer: 'الجواب: ',
    wrong_msg: 'خطأ! الإجابة الصحيحة هي {ans}.',
    gameover_score: '<strong>{n}</strong> أرقام · {t}',
    stats_of_1000: ' / 1000 رقم',
    loading: 'جار التحميل...', server_error: 'تعذّر الاتصال بالخادم.',
    records_empty: 'لا توجد سجلات.',
    digits_unit: '{n} أرقام', digits_per: '{n} في المرة',
    continues: '{n} استمرار', me_tag: 'أنا', rank_label: '#{n}',
    search_error: 'أدخل من 1 إلى 8 أرقام.', searching: 'جاري البحث...',
    search_title: 'نتائج البحث', search_query: 'البحث: {q}',
    search_pos: 'أول ظهور: المنزلة {n}',
    search_count: 'عدد التكرارات: {n}',
    search_not_found: 'لم يُعثر عليه في أول مليون رقم من {c}.',
  }
};

// ===== Language display names =====
var LANG_NAMES = {
  ko: '한국어', en: 'English', ja: '日本語', zh: '中文',
  es: 'Español', fr: 'Français', de: 'Deutsch',
  pt: 'Português', ru: 'Русский', ar: 'العربية'
};

// ===== Adjectives per language =====
var ADJECTIVES_I18N = {
  ko: ['설레는','당황한','혼란스러운','기쁜','신난','심심한','재밌는','즐거운','행복한','슬픈','화난','짜증난','긴장한','불안한','평온한','차분한','흥분한','신기한','놀란','집중한','조용한','활발한','느린','빠른','게으른','부지런한','열심인','도전하는'],
  en: ['excited','curious','focused','calm','happy','anxious','determined','thoughtful','creative','energetic','relaxed','passionate','brilliant','cheerful','serious','eager','quirky','bold','gentle','lazy','diligent','mysterious','playful','restless','inspired','sleepy','brave','gentle'],
  ja: ['わくわくした','好奇心旺盛な','集中した','穏やかな','嬉しい','不安な','決意した','思慮深い','創造的な','元気な','リラックスした','情熱的な','明るい','真剣な','熱心な','個性的な','大胆な','優しい','怠惰な','勤勉な','神秘的な','おちゃめな','静かな','速い','遅い','眠い','勇敢な'],
  zh: ['兴奋的','好奇的','专注的','平静的','快乐的','焦虑的','坚定的','深思的','创意的','充沛的','放松的','热情的','出色的','开朗的','认真的','热忱的','古怪的','大胆的','温柔的','懒惰的','勤奋的','神秘的','调皮的','安静的','迅速的','缓慢的','困倦的','勇敢的'],
  es: ['emocionado','curioso','enfocado','tranquilo','feliz','ansioso','decidido','pensativo','creativo','enérgico','relajado','apasionado','brillante','alegre','serio','entusiasta','peculiar','audaz','amable','perezoso','diligente','misterioso','juguetón','veloz','lento','valiente','soñoliento'],
  fr: ['enthousiaste','curieux','concentré','calme','heureux','anxieux','déterminé','pensif','créatif','énergique','détendu','passionné','brillant','joyeux','sérieux','ardent','excentrique','audacieux','doux','paresseux','diligent','mystérieux','espiègle','rapide','lent','courageux','somnolent'],
  de: ['begeistert','neugierig','konzentriert','ruhig','glücklich','ängstlich','entschlossen','nachdenklich','kreativ','energisch','entspannt','leidenschaftlich','brillant','fröhlich','ernst','eifrig','eigenartig','mutig','sanft','faul','fleißig','mysteriös','verspielt','schnell','langsam','tapfer','schläfrig'],
  pt: ['animado','curioso','focado','calmo','feliz','ansioso','determinado','pensativo','criativo','enérgico','relaxado','apaixonado','brilhante','alegre','sério','entusiasmado','peculiar','ousado','gentil','preguiçoso','diligente','misterioso','brincalhão','rápido','lento','corajoso','sonolento'],
  ru: ['взволнованный','любопытный','сосредоточенный','спокойный','счастливый','тревожный','решительный','вдумчивый','творческий','энергичный','расслабленный','страстный','блестящий','весёлый','серьёзный','усердный','эксцентричный','смелый','добрый','ленивый','прилежный','таинственный','игривый','быстрый','медленный','храбрый','сонный'],
  ar: ['متحمس','فضولي','مركّز','هادئ','سعيد','قلق','عازم','متأمل','مبدع','نشيط','مسترخٍ','شغوف','رائع','مبهج','جاد','متحمس','غريب','جريء','لطيف','كسول','مجتهد','غامض','مرح','سريع','بطيء','شجاع','نعسان']
};

// ===== Mathematician names =====
var MATHEMATICIANS_I18N = {
  ko: [
    { name: '유휘',             desc: '3072각형으로 π ≈ 3.14159 계산' },
    { name: '장형',             desc: 'π ≈ √10 으로 근사' },
    { name: '조충지',            desc: 'π ≈ 355/113, 소수점 7자리까지 정확' },
    { name: '뤼돌프 판 쾰런',    desc: 'π 소수점 35자리까지 계산, 뤼돌프 수' },
    { name: '샹크스',            desc: 'π 소수점 707자리 계산 (527자리까지 정확)' },
    { name: '윌리엄 존스',       desc: 'π 기호를 최초로 사용' },
    { name: '람베르트',          desc: 'π가 무리수임을 증명' },
    { name: '린데만',            desc: 'π가 초월수임을 증명' },
    { name: '에우클레이데스',     desc: '원의 넓이와 지름² 비례 증명' },
    { name: '가네다 야스마사',    desc: 'π 1조 자리 계산' },
    { name: '파인만',            desc: '파인만 포인트 (762자리째부터 9 여섯 개)' },
    { name: '오일러',            desc: 'e^(iπ)+1=0, π·e 기호 대중화' },
    { name: '라이프니츠',        desc: 'π 급수 발견, e를 최초로 상수로 표현' },
    { name: '야코프 베르누이',    desc: 'e의 극한 정의 발견' },
    { name: '존 네이피어',       desc: '로그표 발간, e 값의 최초 계산' },
    { name: '샤를 에르미트',     desc: 'e가 초월수임을 증명' },
    { name: '볼츠만',           desc: '엔트로피와 자연로그의 관계' },
    { name: '아르키메데스',      desc: 'π 근삿값 최초 계산' },
    { name: '피타고라스',        desc: '피타고라스 학파, √2의 무리수 발견' },
    { name: '히파소스',          desc: '√2가 무리수임을 최초로 증명' },
    { name: '크리스토프 루돌프',  desc: '현대 근호 √를 최초로 사용' },
    { name: '헤론',             desc: '제곱근 근삿값 계산법' },
    { name: '피보나치',          desc: '피보나치 수열, 극한값이 황금비' },
    { name: '르 코르뷔지에',     desc: '황금비와 인체비례를 결합한 모듈러' },
  ],
  en: [
    { name: 'Liu Hui',           desc: 'Calculated π ≈ 3.14159 using a 3072-gon' },
    { name: 'Zhang Heng',        desc: 'Approximated π ≈ √10' },
    { name: 'Zu Chongzhi',       desc: 'π ≈ 355/113, accurate to 7 decimal places' },
    { name: 'Ludolph van Ceulen', desc: 'Computed π to 35 decimal places' },
    { name: 'Shanks',            desc: 'Computed π to 707 decimal places' },
    { name: 'William Jones',     desc: 'First to use the symbol π' },
    { name: 'Lambert',           desc: 'Proved π is irrational' },
    { name: 'Lindemann',         desc: 'Proved π is transcendental' },
    { name: 'Euclid',            desc: 'Proved area–diameter² ratio; studied golden ratio' },
    { name: 'Kanada',            desc: 'Computed π to 1 trillion digits' },
    { name: 'Feynman',           desc: 'Feynman point: six 9s at the 762nd decimal' },
    { name: 'Euler',             desc: 'e^(iπ)+1=0, popularized π and e symbols' },
    { name: 'Leibniz',           desc: 'Discovered the π series; first to use e as a constant' },
    { name: 'Jacob Bernoulli',   desc: 'Discovered the limit definition of e' },
    { name: 'John Napier',       desc: 'Published log tables; earliest computation of e' },
    { name: 'Hermite',           desc: 'Proved e is transcendental' },
    { name: 'Boltzmann',         desc: 'Relation between entropy and natural log' },
    { name: 'Archimedes',        desc: 'First to calculate an approximation of π' },
    { name: 'Pythagoras',        desc: 'Pythagorean school; discovery of √2 as irrational' },
    { name: 'Hippasus',          desc: 'First to prove √2 is irrational' },
    { name: 'Christoph Rudolff', desc: 'First to use the modern radical sign √' },
    { name: 'Heron',             desc: 'Presented a method to approximate square roots' },
    { name: 'Fibonacci',         desc: 'Fibonacci sequence; limit is the golden ratio' },
    { name: 'Le Corbusier',      desc: 'Combined golden ratio with human proportions' },
  ]
};

// ===== Core functions =====
var activeLang = 'ko';

function detectLang() {
  var saved = localStorage.getItem('piLang');
  if (saved && TRANSLATIONS[saved]) return saved;
  var nav = (navigator.language || 'en').substring(0, 2).toLowerCase();
  return TRANSLATIONS[nav] ? nav : 'en';
}

function getLang() { return activeLang; }

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  activeLang = lang;
  localStorage.setItem('piLang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyI18n();
}

function t(key, vars) {
  var tr = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  var str = (tr[key] !== undefined) ? tr[key] : (TRANSLATIONS.en[key] || key);
  if (vars) {
    Object.keys(vars).forEach(function(k) {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), String(vars[k]));
    });
  }
  return str;
}

function getAdjectives() {
  return ADJECTIVES_I18N[activeLang] || ADJECTIVES_I18N.en;
}

function getMathematicians() {
  return MATHEMATICIANS_I18N[activeLang] || MATHEMATICIANS_I18N.en;
}

function applyI18n() {
  // Static text elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    el.textContent = t(el.dataset.i18n);
  });
  // Placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    el.placeholder = t(el.dataset.i18nPh);
  });
  // Page title
  document.title = t('app_title');
  // Mode select options (regenerate with current language)
  var modeEl = document.getElementById('modeOption');
  if (modeEl) {
    var savedMode = modeEl.value || 'multiple4';
    modeEl.innerHTML = '<option value="keypad">' + t('mode_keypad') + '</option>';
    for (var n = 2; n <= 10; n++) {
      var opt = document.createElement('option');
      opt.value = 'multiple' + n;
      opt.textContent = t('mode_multiple', { n: n });
      modeEl.appendChild(opt);
    }
    modeEl.value = savedMode;
  }
  // Language selector value
  var langEl = document.getElementById('langOption');
  if (langEl) langEl.value = activeLang;
  // RTL body class
  document.body ? (activeLang === 'ar'
    ? document.body.classList.add('rtl')
    : document.body.classList.remove('rtl')) : null;
}

// Initialize language as early as possible
activeLang = detectLang();
document.documentElement.lang = activeLang;
document.documentElement.dir = activeLang === 'ar' ? 'rtl' : 'ltr';
