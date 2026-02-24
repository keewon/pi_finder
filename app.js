// ===== Character Images =====
var CHAR_IMAGES = {
    home:      ['01_hello.png','05_please.png','22_letsplay.png','24_thanks.png','27_at_home.png'],
    success:   ['02_congrat.png','11_heart.png','15_surprise.png','18_okay.png','21_exciting.png'],
    failure:   ['03_tears.png','04_no_battery.png','08_volcano.png','16_dizzy.png','23_annoying.png','25_depressed.png','28_cheer_up.png'],
    found:     ['13_yes.png','17_funny.png','19_awesome.png','30_idea.png'],
    not_found: ['06_boring.png','12_sleep.png','14_no.png','20_well.png','26_yawn.png','29_hmm.png'],
    search:    ['07_question.png','09_dnd.png','10_busy.png']
};

function randomImage(category) {
    var list = CHAR_IMAGES[category];
    return 'images/' + category + '/' + list[Math.floor(Math.random() * list.length)];
}

// ===== Constants Config =====
const CONSTANTS = {
    pi:    { key: 'pi',    name: 'Pi',  symbol: 'π',  intPart: '3', getDigits: function() { return PI_DIGITS; } },
    e:     { key: 'e',     name: 'e',   symbol: 'e',  intPart: '2', getDigits: function() { return E_DIGITS; } },
    sqrt2: { key: 'sqrt2', name: '√2',  symbol: '√2', intPart: '1', getDigits: function() { return SQRT2_DIGITS; } },
    phi:   { key: 'phi',   name: 'φ',   symbol: 'φ',  intPart: '1', getDigits: function() { return PHI_DIGITS; } }
};

// ===== Constant Diagrams (inline SVG) =====
const CONST_DIAGRAMS = {
    pi: `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="72" r="52" stroke="currentColor" stroke-width="2"/>
  <line x1="48" y1="72" x2="152" y2="72" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <circle cx="100" cy="72" r="3.5" fill="currentColor"/>
  <circle cx="48" cy="72" r="3" fill="currentColor"/>
  <circle cx="152" cy="72" r="3" fill="currentColor"/>
  <text x="100" y="155" text-anchor="middle" fill="currentColor" font-size="16" font-style="italic" font-family="Georgia,serif">C = 2πr</text>
</svg>`,
    e: `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="125" x2="175" y2="125" stroke="currentColor" stroke-width="1.2"/>
  <polygon points="175,125 168,122 168,128" fill="currentColor"/>
  <line x1="55" y1="140" x2="55" y2="8" stroke="currentColor" stroke-width="1.2"/>
  <polygon points="55,8 52,15 58,15" fill="currentColor"/>
  <path d="M 22 124 C 50 122 82 102 135 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="55" cy="115" r="2.5" fill="currentColor"/>
  <line x1="52" y1="115" x2="58" y2="115" stroke="currentColor" stroke-width="1.2"/>
  <text x="45" y="119" text-anchor="end" fill="currentColor" font-size="11" font-family="Georgia,serif">1</text>
  <text x="48" y="138" text-anchor="end" fill="currentColor" font-size="11" font-family="Georgia,serif">O</text>
  <text x="100" y="166" text-anchor="middle" fill="currentColor" font-size="16" font-style="italic" font-family="Georgia,serif">y = eˣ</text>
</svg>`,
    sqrt2: `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="15" width="80" height="80" stroke="currentColor" stroke-width="2" fill="none"/>
  <line x1="60" y1="95" x2="140" y2="15" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
  <path d="M 72 95 L 72 83 L 60 83" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <text x="46" y="62" text-anchor="middle" fill="currentColor" font-size="14" font-family="Georgia,serif">1</text>
  <text x="100" y="112" text-anchor="middle" fill="currentColor" font-size="14" font-family="Georgia,serif">1</text>
  <text x="112" y="48" fill="currentColor" font-size="13" font-family="Georgia,serif">√2</text>
  <text x="100" y="152" text-anchor="middle" fill="currentColor" font-size="15" font-style="italic" font-family="Georgia,serif">a² + b² = c²</text>
</svg>`,
    phi: `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="35" y="25" width="130" height="80" stroke="currentColor" stroke-width="2" fill="none"/>
  <line x1="85" y1="25" x2="85" y2="105" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="35" y1="55" x2="85" y2="55" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="65" y1="25" x2="65" y2="55" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="65" y1="45" x2="85" y2="45" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="75" y1="45" x2="75" y2="55" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
  <path d="M 165 25 A 80 80 0 0 1 85 105 A 50 50 0 0 1 35 55 A 30 30 0 0 1 65 25 A 20 20 0 0 1 85 45 A 10 10 0 0 1 75 55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <text x="100" y="148" text-anchor="middle" fill="currentColor" font-size="15" font-style="italic" font-family="Georgia,serif">φ = (1+√5)/2</text>
</svg>`
};

let activeConstKey = localStorage.getItem('activeConst') || 'pi';

function getConst() { return CONSTANTS[activeConstKey]; }
function getDigits() { return getConst().getDigits(); }
function getDigits1000() { return getDigits().substring(0, 1002); }

// ===== Settings (localStorage) =====
function setSetting(key, value) { localStorage.setItem(key, value); }
function getSetting(key) { return localStorage.getItem(key); }


// ===== Random Name =====
var adjectives = [
    '우울한','방금 일어난','지각한','졸린','배고픈','피곤한',
    '설레는','당황한','당황스러운','혼란스러운','기쁜','신난',
    '심심한','지루한','재밌는','즐거운','행복한','슬픈',
    '화난','짜증난','긴장한','불안한','평온한','차분한',
    '흥분한','신기한','놀란','멍한','집중한',
    '산만한','조용한','시끄러운','활발한','느린','빠른',
    '게으른','부지런한','열심인','노력하는','포기한','도전하는'
];

var mathematicians = [
    // π 관련
    { name: '유휘',             desc: '3072각형으로 π ≈ 3.14159 계산' },
    { name: '장형',             desc: 'π ≈ √10 으로 근사' },
    { name: '조충지',            desc: 'π ≈ 355/113, 소수점 7자리까지 정확' },
    { name: '뤼돌프 판 쾰런',    desc: 'π 소수점 35자리까지 계산, 뤼돌프 수' },
    { name: '샹크스',            desc: 'π 소수점 707자리 계산 (527자리까지 정확)' },
    { name: '윌리엄 존스',       desc: 'π 기호를 최초로 사용' },
    { name: '람베르트',          desc: 'π가 무리수임을 증명' },
    { name: '린데만',            desc: 'π가 초월수임을 증명' },
    { name: '레오나르도 다빈치',  desc: '원적문제 연구' },
    { name: '에우클레이데스',     desc: '원의 넓이와 지름² 비례 증명, 원론에서 황금비 연구' },
    { name: '브라우어르',        desc: 'π의 정규성 연구' },
    { name: '가네다 야스마사',    desc: '컴퓨터로 π 1조 자리 계산' },
    { name: '곤도 시게루',       desc: 'π 10조 자리 계산' },
    { name: '페터 트뤼프',       desc: 'π 22.4조 자리 계산 (2016 기록)' },
    { name: '파인만',            desc: '파인만 포인트 (762자리째부터 9 여섯 개)' },
    { name: '아리스토텔레스',     desc: '원적문제 불가능성 언급' },
    // π + e 공통
    { name: '오일러',            desc: 'e^(iπ)+1=0, π·e 기호 대중화' },
    { name: '라이프니츠',        desc: 'π 급수 발견, e를 최초로 상수로 표현' },
    // e 관련
    { name: '야코프 베르누이',    desc: 'e의 극한 정의 발견 (복리 이자 계산)' },
    { name: '존 네이피어',       desc: '로그표 발간, e 값의 최초 계산 기록' },
    { name: '윌리엄 오트레드',    desc: '네이피어 로그표로 계산자 제작' },
    { name: '샤를 에르미트',     desc: 'e가 초월수임을 증명' },
    { name: '로저 코츠',        desc: '자연로그와 삼각함수의 관계 발견' },
    { name: '브룩 테일러',       desc: '테일러 급수 증명 (e 계산에 활용)' },
    { name: '볼츠만',           desc: '엔트로피와 자연로그의 관계 발견' },
    { name: '아다마르',          desc: '자연로그 이용한 소수 정리 증명' },
    { name: '발레푸생',          desc: '소수 정리 독립 증명 (아다마르와 동시)' },
    { name: '아르강',            desc: '복소평면 위의 점으로 복소수 표현' },
    // π + √2 공통
    { name: '아르키메데스',      desc: 'π 근삿값 최초 계산, 제곱근 풀이법 저술' },
    // √2 관련
    { name: '피타고라스',        desc: '피타고라스 학파, √2의 무리수 발견 계기' },
    { name: '히파소스',          desc: '√2가 무리수임을 최초로 증명' },
    { name: '콰리즈미',          desc: '제곱근을 자드르(뿌리)로 명명' },
    { name: '이븐 알야사민',     desc: '제곱근 기호를 사용한 최초의 문헌' },
    { name: '레기오몬타누스',     desc: '대문자 R을 제곱근 기호로 사용' },
    { name: '크리스토프 루돌프',  desc: '현대 근호 √를 최초로 사용' },
    { name: '헤론',             desc: '제곱근 근삿값 계산법 제시' },
    // φ 관련
    { name: '피보나치',          desc: '피보나치 수열, 극한값이 황금비' },
    { name: '르 코르뷔지에',     desc: '황금비와 인체비례를 결합한 모듈러 고안' },
];

function generateRandomName() {
    var adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var m = mathematicians[Math.floor(Math.random() * mathematicians.length)];
    return adj + ' ' + m.name;
}

function getMathematicianDesc(userName) {
    for (var i = 0; i < mathematicians.length; i++) {
        if (userName.endsWith(mathematicians[i].name)) return mathematicians[i].desc;
    }
    return null;
}

function getUserName() {
    var saved = getSetting('piUserName');
    if (saved) return saved;
    var name = generateRandomName();
    setSetting('piUserName', name);
    return name;
}

function setUserName(name) {
    setSetting('piUserName', name);
    refreshUserName();
}

function refreshUserName() {
    var name = getUserName();
    var desc = getMathematicianDesc(name);
    var el = document.getElementById('settingsUserName');
    if (el) el.textContent = name;
    var settingsStar = document.getElementById('settingsUserStar');
    if (settingsStar) settingsStar.style.display = desc ? '' : 'none';
    var settingsDesc = document.getElementById('settingsUserDesc');
    if (settingsDesc) settingsDesc.textContent = desc ? '* ' + desc : '';
    var homeEl = document.getElementById('userName');
    if (homeEl) homeEl.textContent = name;
    var homeStar = document.getElementById('userStar');
    if (homeStar) homeStar.style.display = desc ? '' : 'none';
    var homeDesc = document.getElementById('userDesc');
    if (homeDesc) homeDesc.textContent = desc ? '* ' + desc : '';
}

// ===== Constant Switching =====
function switchConstant(key) {
    activeConstKey = key;
    setSetting('activeConst', key);

    document.getElementById('app').dataset.const = key;

    document.querySelectorAll('.const-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.const === key);
    });

    document.getElementById('homeTitle').textContent = getConst().symbol;
    document.getElementById('constDiagram').innerHTML = CONST_DIAGRAMS[key];
    updateDigitsFlow();

    var intpartOption = document.getElementById('intpartOption');
    if (intpartOption) intpartOption.textContent = getConst().intPart + '. 부터';
}

function updateDigitsFlow() {
    var raw = getDigits().substring(0, 82);
    var spaced = raw.replace(/(\d{10})/g, '$1 ').trim();
    var track = document.getElementById('digitsTrack');
    track.textContent = spaced + '          ' + spaced + '          ';
}

// ===== View Management =====
var activeView = 'home';

function switchView(view) {
    activeView = view;

    ['homeView', 'memorizeView', 'searchView', 'recordsView'].forEach(function(id) {
        document.getElementById(id).classList.toggle('active', id === view + 'View');
    });

    var constToggles = document.getElementById('constToggles');
    var viewTitle = document.getElementById('viewTitle');
    var backBtn = document.getElementById('backBtn');

    if (view === 'home') {
        constToggles.style.display = '';
        viewTitle.style.display = 'none';
        backBtn.style.display = 'none';
    } else {
        constToggles.style.display = 'none';
        viewTitle.style.display = '';
        backBtn.style.display = '';
        var titles = {
            memorize: '외우기 — ' + getConst().symbol,
            search: '찾기 — ' + getConst().symbol,
            records: '기록 — ' + getConst().symbol
        };
        viewTitle.textContent = titles[view];
    }

    history.replaceState(null, '', view === 'home' ? location.pathname : '#' + view);

    if (view === 'memorize') initMemorize();
    if (view === 'search') {
        var el = document.getElementById('searchConstSymbol');
        if (el) el.textContent = getConst().symbol;
        document.getElementById('searchCharImage').src = randomImage('search');
    }
    if (view === 'records') displayRecords();
}

// ===== Records =====
function getRecordsKey() { return activeConstKey + 'Records'; }

function saveRecord(name, digits, time) {
    var records = getRecords();
    records.push({
        id: Date.now(),
        name: name || getUserName(),
        digits: digits,
        time: time,
        date: new Date().toISOString()
    });
    records.sort(function(a, b) { return b.digits - a.digits || a.time - b.time; });
    localStorage.setItem(getRecordsKey(), JSON.stringify(records));
}

function getRecords() {
    var raw = localStorage.getItem(getRecordsKey());
    return raw ? JSON.parse(raw) : [];
}

function deleteRecord(id) {
    var records = getRecords().filter(function(r) { return r.id !== id; });
    localStorage.setItem(getRecordsKey(), JSON.stringify(records));
    displayRecords();
}

function displayRecords() {
    var records = getRecords();
    var list = document.getElementById('recordsList');

    if (records.length === 0) {
        list.innerHTML = '<div class="empty-msg">기록이 없습니다.</div>';
        return;
    }

    list.innerHTML = records.map(function(record) {
        var m = Math.floor(record.time / 60);
        var s = record.time % 60;
        var ts = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        var date = new Date(record.date).toLocaleDateString('ko-KR');

        return '<div class="record-item">' +
            '<div class="record-item-info">' +
                '<div class="record-item-name">' + escapeHtml(record.name) + '</div>' +
                '<div class="record-item-details">' + record.digits + '자리 | ' + ts + ' | ' + date + '</div>' +
            '</div>' +
            '<button class="btn-delete" onclick="deleteRecord(' + record.id + ')">삭제</button>' +
        '</div>';
    }).join('');
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== Settings Modal =====
function openSettings() {
    refreshUserName();
    var intpartOption = document.getElementById('intpartOption');
    if (intpartOption) intpartOption.textContent = getConst().intPart + '. 부터';
    document.getElementById('settingsModal').classList.add('show');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('show');
    document.getElementById('nameEditPanel').classList.remove('show');
}

// ===== Options =====
var startOption = document.getElementById('startOption');
var modeOption = document.getElementById('modeOption');

// Load saved options
var savedStart = getSetting('piStartOption');
if (savedStart === 'three') {
    savedStart = 'intpart';
    setSetting('piStartOption', 'intpart');
}
var savedMode = getSetting('piModeOption');
if (savedStart) startOption.value = savedStart;
if (savedMode) modeOption.value = savedMode;

startOption.addEventListener('change', function() {
    setSetting('piStartOption', startOption.value);
    if (activeView === 'memorize' && currentMode) initMemorize();
});

modeOption.addEventListener('change', function() {
    setSetting('piModeOption', modeOption.value);
    if (activeView === 'memorize') initMemorize();
});

// ===== Memorize Logic =====
var currentMode = null;
var currentPosition = 0;
var startTime = null;
var timerInterval = null;
var userInput = '';

function initMemorize() {
    var mode = modeOption.value;
    var start = startOption.value;

    document.getElementById('multipleChoiceMode').classList.toggle('hidden', mode === 'keypad');
    document.getElementById('keypadMode').classList.toggle('hidden', mode !== 'keypad');
    document.getElementById('gameoverPanel').classList.remove('show');
    document.getElementById('resultMessage').classList.remove('show');
    document.getElementById('keypadResultMessage').classList.remove('show');

    currentMode = mode;
    currentPosition = 0;
    userInput = '';
    startTime = Date.now();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100);

    if (mode === 'keypad') {
        initKeypadMode(start);
    } else {
        var digitsPerQuestion = parseInt(mode.replace('multiple', ''));
        showNextQuestion(digitsPerQuestion, start);
    }

    updateProgress();
}

function showNextQuestion(digitsPerQuestion, start) {
    var piDisplay = document.getElementById('piDisplay');
    var questionText = document.getElementById('questionText');
    var choicesDiv = document.getElementById('choices');
    var resultMessage = document.getElementById('resultMessage');

    resultMessage.classList.remove('show');

    if (currentPosition >= 1000) { endMemorize(); return; }

    var CONST_1000 = getDigits1000();
    var displayText = CONST_1000.substring(0, 2 + currentPosition);
    piDisplay.textContent = displayText;
    piDisplay.scrollTop = piDisplay.scrollHeight;

    var nextDigits = CONST_1000.substring(2 + currentPosition, 2 + currentPosition + digitsPerQuestion);
    questionText.textContent = '다음 ' + digitsPerQuestion + '자리는?';
    document.getElementById('debugAnswer').textContent = '정답: ' + nextDigits;

    var correctAnswer = nextDigits;
    var choices = [correctAnswer];
    while (choices.length < 4) {
        var wrong = '';
        for (var i = 0; i < digitsPerQuestion; i++) {
            wrong += Math.floor(Math.random() * 10).toString();
        }
        if (choices.indexOf(wrong) === -1) choices.push(wrong);
    }
    choices.sort(function() { return Math.random() - 0.5; });

    choicesDiv.innerHTML = '';
    choices.forEach(function(choice) {
        var btn = document.createElement('button');
        btn.className = 'choice';
        btn.textContent = choice;
        btn.addEventListener('click', function() {
            checkAnswer(choice, correctAnswer, digitsPerQuestion, start);
        });
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct, digitsPerQuestion, start) {
    document.querySelectorAll('.choice').forEach(function(btn) {
        btn.classList.add('disabled');
        if (btn.textContent === correct) btn.classList.add('correct');
        else if (btn.textContent === selected && selected !== correct) btn.classList.add('wrong');
    });

    if (selected === correct) {
        currentPosition += digitsPerQuestion;
        updateProgress();
        setTimeout(function() {
            if (currentPosition < 1000) showNextQuestion(digitsPerQuestion, start);
            else endMemorize();
        }, 200);
    } else {
        var resultMessage = document.getElementById('resultMessage');
        resultMessage.innerHTML =
            '<img src="' + randomImage('failure') + '" alt="틀렸습니다">' +
            '<div>틀렸습니다. 정답은 ' + correct + '입니다.</div>';
        resultMessage.className = 'result-msg show wrong';
        endMemorize();
    }
}

// ===== Keypad Mode =====
function initKeypadMode(start) {
    var display = document.getElementById('keypadPiDisplay');
    var resultMessage = document.getElementById('keypadResultMessage');
    resultMessage.classList.remove('show');

    display.textContent = getConst().intPart + '.';
    updateKeypadDebug();
}

function updateKeypadDebug() {
    var CONST_1000 = getDigits1000();
    var next10 = CONST_1000.substring(2 + currentPosition, 2 + currentPosition + 10);
    document.getElementById('keypadDebugAnswer').textContent = '정답: ' + next10;
}

document.getElementById('keypad').addEventListener('click', function(e) {
    var btn = e.target.closest('.keypad-key');
    if (!btn) return;
    var key = btn.dataset.key;
    if (key === 'delete') handleDelete();
    else handleKeypadInput(key);
});

function handleKeypadInput(digit) {
    if (currentPosition >= 1000) { endMemorize(); return; }

    var CONST_1000 = getDigits1000();
    var expectedDigit = CONST_1000[2 + currentPosition];
    var display = document.getElementById('keypadPiDisplay');
    var resultMessage = document.getElementById('keypadResultMessage');

    if (digit === expectedDigit) {
        userInput += digit;
        currentPosition++;
        display.textContent = CONST_1000.substring(0, 2 + currentPosition);
        display.scrollTop = display.scrollHeight;
        updateKeypadProgress();
        updateKeypadDebug();
        if (currentPosition >= 1000) endMemorize();
    } else {
        resultMessage.innerHTML =
            '<img src="' + randomImage('failure') + '" alt="틀렸습니다">' +
            '<div>틀렸습니다. 정답은 ' + expectedDigit + '입니다.</div>';
        resultMessage.className = 'result-msg show wrong';
        endMemorize();
    }
}

function handleDelete() {
    if (userInput.length > 0 && currentPosition > 0) {
        userInput = userInput.slice(0, -1);
        currentPosition--;
        var CONST_1000 = getDigits1000();
        document.getElementById('keypadPiDisplay').textContent = CONST_1000.substring(0, 2 + currentPosition);
        updateKeypadProgress();
    }
}

// ===== Progress & Timer =====
function updateProgress() {
    var pct = (currentPosition / 1000) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('currentPosition').textContent = currentPosition;
}

function updateKeypadProgress() {
    var pct = (currentPosition / 1000) * 100;
    document.getElementById('keypadProgressFill').style.width = pct + '%';
    document.getElementById('keypadCurrentPosition').textContent = currentPosition;
}

function updateTimer() {
    if (!startTime) return;
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var m = Math.floor(elapsed / 60);
    var s = elapsed % 60;
    var ts = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    document.getElementById('elapsedTime').textContent = ts;
    document.getElementById('keypadElapsedTime').textContent = ts;
}

// ===== End Memorize =====
var lastElapsed = 0;

function endMemorize() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }

    lastElapsed = Math.floor((Date.now() - startTime) / 1000);
    var m = Math.floor(lastElapsed / 60);
    var s = lastElapsed % 60;
    var ts = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');

    var panel = document.getElementById('gameoverPanel');
    panel.classList.add('show');

    var scoreHtml = '';
    if (currentPosition >= 1000) {
        scoreHtml = '<img src="' + randomImage('success') + '" alt="">';
    }
    scoreHtml += '<div><strong>' + currentPosition + '</strong>자리 · ' + ts + '</div>';
    document.getElementById('gameoverScore').innerHTML = scoreHtml;

    var recordNameInput = document.getElementById('recordName');
    recordNameInput.value = getUserName();

    document.getElementById('saveRecordBtn').onclick = function() {
        saveRecord(recordNameInput.value, currentPosition, lastElapsed);
        displayRecords();
        document.getElementById('saveRecordBtn').textContent = '저장됨';
        document.getElementById('saveRecordBtn').disabled = true;
    };
    document.getElementById('saveRecordBtn').textContent = '기록 저장';
    document.getElementById('saveRecordBtn').disabled = false;
}

function retryMemorize() {
    initMemorize();
}

function continueMemorize() {
    var savedPosition = currentPosition;
    var mode = modeOption.value;
    var start = startOption.value;

    document.getElementById('gameoverPanel').classList.remove('show');
    document.getElementById('resultMessage').classList.remove('show');
    document.getElementById('keypadResultMessage').classList.remove('show');

    startTime = Date.now() - (lastElapsed * 1000);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100);

    if (mode === 'keypad') {
        // Keypad: just resume, display is already correct
        userInput = getDigits1000().substring(2, 2 + savedPosition);
    } else {
        var digitsPerQuestion = parseInt(mode.replace('multiple', ''));
        showNextQuestion(digitsPerQuestion, start);
    }
}

// ===== Search =====
var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var searchResult = document.getElementById('searchResult');

searchInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); searchBtn.click(); }
});

searchBtn.addEventListener('click', function() {
    var searchString = searchInput.value;
    if (!searchString || searchString.length === 0 || searchString.length > 8) {
        searchResult.innerHTML = '<div class="empty-msg" style="color:var(--wrong)">1~8자리 숫자를 입력해주세요.</div>';
        return;
    }
    searchResult.innerHTML = '<div class="empty-msg">검색 중...</div>';
    setTimeout(function() {
        var results = findInConstant(searchString);
        displaySearchResults(searchString, results);
    }, 10);
});

function findInConstant(searchString) {
    var DIGITS = getDigits();
    var maxDigits = 1000000;
    var availableDigits = Math.min(maxDigits, DIGITS.length - 2);
    var digitSubstring = DIGITS.substring(2, 2 + availableDigits);

    var firstPosition = -1;
    var count = 0;
    var position = 0;

    while (true) {
        position = digitSubstring.indexOf(searchString, position);
        if (position === -1) break;
        if (firstPosition === -1) firstPosition = position;
        count++;
        position++;
    }

    return { firstPosition: firstPosition, count: count };
}

function displaySearchResults(searchString, results) {
    var constName = getConst().name;
    var DIGITS = getDigits();

    if (results.firstPosition === -1) {
        searchResult.innerHTML =
            '<div class="search-result-card">' +
                '<img src="' + randomImage('not_found') + '" alt="못 찾음">' +
                '<h4>검색 결과</h4>' +
                '<p>검색어: <strong>' + searchString + '</strong></p>' +
                '<p>' + constName + '의 백만자리 내에서 해당 숫자를 찾을 수 없습니다.</p>' +
            '</div>';
        return;
    }

    var displayPosition = results.firstPosition + 1;
    var searchLength = searchString.length;
    var lineLength = 40;
    var halfLine = Math.floor(lineLength / 2);
    var matchStart = results.firstPosition + 2;

    var centerBeforeStart = Math.max(2, matchStart - halfLine);
    var centerAfterEnd = Math.min(DIGITS.length, matchStart + searchLength + (lineLength - halfLine));
    var centerLine = DIGITS.substring(centerBeforeStart, centerAfterEnd);

    var upperLineStart = Math.max(2, centerBeforeStart - lineLength);
    var upperLine = DIGITS.substring(upperLineStart, centerBeforeStart) || '...';

    var lowerLineStart = centerAfterEnd;
    var lowerLineEnd = Math.min(DIGITS.length, lowerLineStart + lineLength);
    var lowerLine = DIGITS.substring(lowerLineStart, lowerLineEnd) || '...';

    var matchInCenter = centerLine.indexOf(searchString);
    var highlightCenter = centerLine.substring(0, matchInCenter) +
        '<mark>' + searchString + '</mark>' +
        centerLine.substring(matchInCenter + searchLength);

    searchResult.innerHTML =
        '<div class="search-result-card">' +
            '<img src="' + randomImage('found') + '" alt="찾음">' +
            '<h4>검색 결과</h4>' +
            '<p>검색어: <strong>' + searchString + '</strong></p>' +
            '<p>최초 위치: 소숫점 이하 <strong>' + displayPosition.toLocaleString() + '</strong>번째 자리</p>' +
            '<p>발견 횟수: <strong>' + results.count.toLocaleString() + '</strong>번</p>' +
            '<div class="search-context">' +
                '<div class="ctx-dim">' + upperLine + '</div>' +
                '<div class="ctx-main">' + highlightCenter + '</div>' +
                '<div class="ctx-dim">' + lowerLine + '</div>' +
            '</div>' +
        '</div>';
}

// ===== Event Bindings =====
// Constant toggles
document.querySelectorAll('.const-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { switchConstant(btn.dataset.const); });
});

// Home buttons
document.getElementById('goMemorize').addEventListener('click', function() { switchView('memorize'); });
document.getElementById('goSearch').addEventListener('click', function() { switchView('search'); });
document.getElementById('goRecords').addEventListener('click', function() { switchView('records'); });

// Back button
document.getElementById('backBtn').addEventListener('click', function() { switchView('home'); });

// Retry / Continue
document.getElementById('retryBtn').addEventListener('click', retryMemorize);
document.getElementById('continueBtn').addEventListener('click', continueMemorize);

// Settings
document.getElementById('settingsBtn').addEventListener('click', openSettings);
document.getElementById('settingsClose').addEventListener('click', closeSettings);
document.getElementById('settingsModal').addEventListener('click', function(e) {
    if (e.target === e.currentTarget) closeSettings();
});

// Name editing
document.getElementById('editNameBtn').addEventListener('click', function() {
    var panel = document.getElementById('nameEditPanel');
    panel.classList.toggle('show');
    if (panel.classList.contains('show')) document.getElementById('nameInput').focus();
});

document.getElementById('saveNameBtn').addEventListener('click', function() {
    var name = document.getElementById('nameInput').value.trim();
    if (name) {
        setUserName(name);
        document.getElementById('nameInput').value = '';
        document.getElementById('nameEditPanel').classList.remove('show');
    }
});

document.getElementById('nameInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
});

document.getElementById('randomNameBtn').addEventListener('click', function() {
    setUserName(generateRandomName());
    document.getElementById('nameEditPanel').classList.remove('show');
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', function() {
    // Restore constant
    switchConstant(activeConstKey);
    refreshUserName();

    // URL hash navigation
    var hash = window.location.hash.replace('#', '');
    if (hash === 'memorize' || hash === 'search' || hash === 'records') {
        switchView(hash);
    } else {
        switchView('home');
    }
});
