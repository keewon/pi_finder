// ===== Constants Config =====
const CONSTANTS = {
    pi:    { key: 'pi',    name: 'Pi',  symbol: 'π',  intPart: '3', getDigits: function() { return PI_DIGITS; } },
    e:     { key: 'e',     name: 'e',   symbol: 'e',  intPart: '2', getDigits: function() { return E_DIGITS; } },
    sqrt2: { key: 'sqrt2', name: '√2',  symbol: '√2', intPart: '1', getDigits: function() { return SQRT2_DIGITS; } }
};

let activeConstKey = localStorage.getItem('activeConst') || 'pi';

function getConst() { return CONSTANTS[activeConstKey]; }
function getDigits() { return getConst().getDigits(); }
function getDigits1000() { return getDigits().substring(0, 1002); }

// ===== Settings (localStorage) =====
function setSetting(key, value) { localStorage.setItem(key, value); }
function getSetting(key) { return localStorage.getItem(key); }

// Legacy cookie migration
function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trimStart();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function migrateCookie(key) {
    if (!localStorage.getItem(key)) {
        var val = getCookie(key);
        if (val) localStorage.setItem(key, val);
    }
}
migrateCookie('piUserName');
migrateCookie('piStartOption');
migrateCookie('piModeOption');

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
    '피타고라스','유클리드','아르키메데스','아폴로니우스','히파티아',
    '피보나치','데카르트','페르마','파스칼',
    '뉴턴','라이프니츠','오일러','가우스','리만','푸리에',
    '갈루아','아벨','라그랑주','라플라스','푸앵카레',
    '힐베르트','괴델','튜링','폰 노이만','칸토어',
    '소피 제르맹','에미 뇌터','마리아 아녜시','에이다 러브레이스',
    '최석정','홍대용'
];

function generateRandomName() {
    var adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var math = mathematicians[Math.floor(Math.random() * mathematicians.length)];
    return adj + ' ' + math;
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
    var el = document.getElementById('settingsUserName');
    if (el) el.textContent = getUserName();
    var homeEl = document.getElementById('userName');
    if (homeEl) homeEl.textContent = getUserName();
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
            '<img src="images/04_no_battery.png" alt="틀렸습니다">' +
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
            '<img src="images/04_no_battery.png" alt="틀렸습니다">' +
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

    document.getElementById('gameoverScore').innerHTML =
        '<strong>' + currentPosition + '</strong>자리 · ' + ts;

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
