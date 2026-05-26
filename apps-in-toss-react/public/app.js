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

// ===== API =====
var API_URL = (location.hostname === 'localhost' || location.protocol === 'file:')
    ? 'http://localhost:8787'
    : 'https://pi-finder-api.acidblob.com';

function getDeviceUid() {
    var uid = getSetting('deviceUid');
    if (!uid) {
        uid = crypto.randomUUID();
        setSetting('deviceUid', uid);
    }
    return uid;
}

function saveRecordToServer(name, digits, time, continues, mode) {
    return fetch(API_URL + '/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            uid: getDeviceUid(),
            name: name,
            digits: digits,
            time: time,
            continues: continues,
            constKey: activeConstKey,
            mode: mode
        })
    }).then(function(res) {
        return res.ok ? res.json() : null;
    }).catch(function() { return null; });
}

function deleteRecordFromServer(serverId) {
    return fetch(API_URL + '/records/' + serverId + '?uid=' + encodeURIComponent(getDeviceUid()), {
        method: 'DELETE'
    }).catch(function() {});
}

function fetchLeaderboard(period) {
    var params = new URLSearchParams({
        constKey: activeConstKey,
        period: period,
        uid: getDeviceUid(),
        limit: '50'
    });
    return fetch(API_URL + '/records?' + params)
        .then(function(res) { return res.ok ? res.json() : null; })
        .catch(function() { return null; });
}

// ===== Random Name =====
function generateRandomName() {
    var adjs = getAdjectives();
    var maths = getMathematicians();
    var adj = adjs[Math.floor(Math.random() * adjs.length)];
    var m = maths[Math.floor(Math.random() * maths.length)];
    var capAdj = adj.charAt(0).toUpperCase() + adj.slice(1);
    return capAdj + ' ' + m.name;
}

function getMathematicianDesc(userName) {
    var maths = getMathematicians();
    for (var i = 0; i < maths.length; i++) {
        if (userName.endsWith(maths[i].name)) return maths[i].desc;
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

    if (activeView === 'records') displayRecords();
    if (activeView === 'search') updateSearchDesc();

    var intpartOption = document.getElementById('intpartOption');
    if (intpartOption) intpartOption.textContent = t('intpart_opt', {n: getConst().intPart});
}

function updateDigitsFlow() {
    document.getElementById('digitsTrack').textContent = getDigits().substring(0, 1500);
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

    if (view === 'home' || view === 'records') {
        constToggles.style.display = '';
        viewTitle.style.display = 'none';
        backBtn.style.display = view === 'records' ? '' : 'none';
    } else {
        constToggles.style.display = 'none';
        viewTitle.style.display = '';
        backBtn.style.display = '';
        var titles = {
            memorize: t('btn_memorize') + ' — ' + getConst().symbol,
            search: t('btn_find') + ' — ' + getConst().symbol,
        };
        viewTitle.textContent = titles[view] || '';
    }

    history.replaceState(null, '', view === 'home' ? location.pathname : '#' + view);

    if (view === 'memorize') initMemorize();
    if (view === 'search') {
        document.getElementById('searchCharImage').src = randomImage('search');
        updateSearchDesc();
    }
    if (view === 'records') displayRecords();
}

// ===== Search Description =====
function updateSearchDesc() {
    var el = document.getElementById('searchDescText');
    if (el) el.textContent = t('search_desc', {sym: getConst().symbol});
}

// ===== Records =====
function getRecordsKey() { return activeConstKey + 'Records'; }

function formatMode(mode) {
    if (!mode) return '';
    if (mode === 'keypad') return t('digits_per', {n: 1});
    return t('digits_per', {n: parseInt(mode.replace('multiple', ''))});
}

function saveRecord(name, digits, time, continues) {
    var resolvedName = name || getUserName();
    var localId = Date.now();
    var mode = currentMode || '';
    var records = getRecords();
    records.push({
        id: localId,
        name: resolvedName,
        digits: digits,
        time: time,
        continues: continues || 0,
        mode: mode,
        date: new Date().toISOString(),
        serverId: null
    });
    records.sort(function(a, b) { return b.digits - a.digits || a.time - b.time; });
    localStorage.setItem(getRecordsKey(), JSON.stringify(records));

    saveRecordToServer(resolvedName, digits, time, continues || 0, mode).then(function(result) {
        if (!result || !result.id) return;
        var recs = getRecords();
        var rec = recs.find(function(r) { return r.id === localId; });
        if (rec) {
            rec.serverId = result.id;
            rec.suspicious = result.suspicious;
            localStorage.setItem(getRecordsKey(), JSON.stringify(recs));
        }
    });
}

function getRecords() {
    var raw = localStorage.getItem(getRecordsKey());
    return raw ? JSON.parse(raw) : [];
}

function deleteRecord(id) {
    var records = getRecords();
    var record = records.find(function(r) { return r.id === id; });
    if (record && record.serverId) {
        deleteRecordFromServer(record.serverId);
    }
    localStorage.setItem(getRecordsKey(), JSON.stringify(records.filter(function(r) { return r.id !== id; })));
    displayRecords();
}

var activeTab = 'mine';

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    displayRecords();
}

function displayRecords() {
    if (activeTab === 'mine') {
        displayLocalRecords();
    } else {
        displayLeaderboard(activeTab);
    }
}

function displayLocalRecords() {
    var records = getRecords();
    var list = document.getElementById('recordsList');

    if (records.length === 0) {
        list.innerHTML = '<div class="empty-msg">' + t('records_empty') + '</div>';
        return;
    }

    list.innerHTML = records.map(function(record) {
        var m = Math.floor(record.time / 60);
        var s = record.time % 60;
        var ts = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        var date = new Date(record.date).toLocaleDateString(getLang());

        return '<div class="record-item">' +
            '<div class="record-item-info">' +
                '<div class="record-item-name">' + escapeHtml(record.name) + '</div>' +
                '<div class="record-item-details">' + t('digits_unit', {n: record.digits}) + (record.mode ? ' · ' + formatMode(record.mode) : '') + ' | ' + ts + (record.continues ? ' | ' + t('continues', {n: record.continues}) : '') + ' | ' + date + '</div>' +
            '</div>' +
            '<button class="btn-delete" onclick="deleteRecord(' + record.id + ')">' + t('btn_delete') + '</button>' +
        '</div>';
    }).join('');
}

function displayLeaderboard(period) {
    var list = document.getElementById('recordsList');
    list.innerHTML = '<div class="empty-msg">' + t('loading') + '</div>';

    fetchLeaderboard(period).then(function(records) {
        if (!records) {
            list.innerHTML = '<div class="empty-msg">' + t('server_error') + '</div>';
            return;
        }
        if (records.length === 0) {
            list.innerHTML = '<div class="empty-msg">' + t('records_empty') + '</div>';
            return;
        }

        var myUid = getDeviceUid();
        list.innerHTML = records.map(function(record, index) {
            var m = Math.floor(record.time / 60);
            var s = record.time % 60;
            var ts = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
            var date = new Date(record.created_at).toLocaleDateString(getLang());
            var isMe = record.uid === myUid;
            var meTag = isMe ? ' <span style="color:var(--accent);font-size:0.75rem">(' + t('me_tag') + ')</span>' : '';
            var rank = index + 1;
            var rankLabel = t('rank_label', {n: rank});

            return '<div class="record-item' + (isMe ? ' record-item-me' : '') + '">' +
                '<div class="record-item-rank">' + rankLabel + '</div>' +
                '<div class="record-item-info">' +
                    '<div class="record-item-name">' + escapeHtml(record.name) + meTag + '</div>' +
                    '<div class="record-item-details">' + t('digits_unit', {n: record.digits}) + (record.mode ? ' · ' + formatMode(record.mode) : '') + ' | ' + ts + (record.continues ? ' | ' + t('continues', {n: record.continues}) : '') + ' | ' + date + '</div>' +
                '</div>' +
            '</div>';
        }).join('');
    });
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
    if (intpartOption) intpartOption.textContent = t('intpart_opt', {n: getConst().intPart});
    document.getElementById('settingsModal').classList.add('show');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('show');
}

// ===== Theme =====
var themeOption = document.getElementById('themeOption');
var darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(pref) {
    if (pref === 'dark') {
        document.documentElement.dataset.theme = 'dark';
    } else if (pref === 'light') {
        document.documentElement.dataset.theme = 'light';
    } else {
        document.documentElement.dataset.theme = darkMediaQuery.matches ? 'dark' : 'light';
    }
}

darkMediaQuery.addEventListener('change', function() {
    if ((getSetting('piThemeOption') || 'system') === 'system') {
        applyTheme('system');
    }
});

var savedTheme = getSetting('piThemeOption') || 'system';
themeOption.value = savedTheme;
applyTheme(savedTheme);

themeOption.addEventListener('change', function() {
    setSetting('piThemeOption', themeOption.value);
    applyTheme(themeOption.value);
});

// ===== Options =====
var startOption = document.getElementById('startOption');
var modeOption = document.getElementById('modeOption');

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

// ===== Lang Option =====
var langOptionEl = document.getElementById('langOption');
if (langOptionEl) {
    langOptionEl.addEventListener('change', function() {
        setLang(langOptionEl.value);
        // setLang calls applyI18n() which handles data-i18n elements
        var intpartEl = document.getElementById('intpartOption');
        if (intpartEl) intpartEl.textContent = t('intpart_opt', {n: getConst().intPart});
        if (activeView !== 'home' && activeView !== 'records') {
            var viewTitleEl = document.getElementById('viewTitle');
            var viewTitles = {
                memorize: t('btn_memorize') + ' — ' + getConst().symbol,
                search: t('btn_find') + ' — ' + getConst().symbol,
            };
            if (viewTitleEl) viewTitleEl.textContent = viewTitles[activeView] || '';
        }
        if (activeView === 'search') updateSearchDesc();
        if (activeView === 'records') displayRecords();
        refreshUserName();
    });
}

// ===== Memorize Logic =====
var currentMode = null;
var currentPosition = 0;
var startTime = null;
var timerInterval = null;
var userInput = '';
var continueCount = 0;

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
    continueCount = 0;
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
    questionText.textContent = t('question', {n: digitsPerQuestion});
    document.getElementById('debugAnswer').textContent = t('debug_answer') + nextDigits;

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
            '<img src="' + randomImage('failure') + '" alt="">' +
            '<div>' + t('wrong_msg', {ans: correct}) + '</div>';
        resultMessage.className = 'result-msg show wrong';
        endMemorize();
    }
}

// ===== Keypad Mode =====
function initKeypadMode(start) {
    var display = document.getElementById('keypadPiDisplay');
    var resultMessage = document.getElementById('keypadResultMessage');
    resultMessage.classList.remove('show');

    document.getElementById('keypad').classList.remove('hidden');
    display.textContent = getConst().intPart + '.';
    updateKeypadDebug();
}

function updateKeypadDebug() {
    var CONST_1000 = getDigits1000();
    var next10 = CONST_1000.substring(2 + currentPosition, 2 + currentPosition + 10);
    document.getElementById('keypadDebugAnswer').textContent = t('debug_answer') + next10;
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
            '<img src="' + randomImage('failure') + '" alt="">' +
            '<div>' + t('wrong_msg', {ans: expectedDigit}) + '</div>';
        resultMessage.className = 'result-msg show wrong';
        document.getElementById('keypad').classList.add('hidden');
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
    scoreHtml += '<div>' + t('gameover_score', {n: currentPosition, t: ts}) + '</div>';
    document.getElementById('gameoverScore').innerHTML = scoreHtml;

    var recordNameInput = document.getElementById('recordName');
    recordNameInput.value = getUserName();

    document.getElementById('saveRecordBtn').onclick = function() {
        saveRecord(recordNameInput.value, currentPosition, lastElapsed, continueCount);
        var btn = document.getElementById('saveRecordBtn');
        btn.textContent = t('view_records');
        btn.disabled = false;
        btn.onclick = function() { switchView('records'); };
    };
    document.getElementById('saveRecordBtn').textContent = t('save_record');
    document.getElementById('saveRecordBtn').disabled = false;
}

function retryMemorize() {
    initMemorize();
}

function continueMemorize() {
    continueCount++;
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
        document.getElementById('keypad').classList.remove('hidden');
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
        searchResult.innerHTML = '<div class="empty-msg" style="color:var(--wrong)">' + t('search_error') + '</div>';
        return;
    }
    searchResult.innerHTML = '<div class="empty-msg">' + t('searching') + '</div>';
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
                '<img src="' + randomImage('not_found') + '" alt="">' +
                '<h4>' + t('search_title') + '</h4>' +
                '<p>' + t('search_query', {q: '<strong>' + escapeHtml(searchString) + '</strong>'}) + '</p>' +
                '<p>' + t('search_not_found', {c: constName}) + '</p>' +
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
            '<img src="' + randomImage('found') + '" alt="">' +
            '<h4>' + t('search_title') + '</h4>' +
            '<p>' + t('search_query', {q: '<strong>' + escapeHtml(searchString) + '</strong>'}) + '</p>' +
            '<p>' + t('search_pos', {n: '<strong>' + displayPosition.toLocaleString() + '</strong>'}) + '</p>' +
            '<p>' + t('search_count', {n: '<strong>' + results.count.toLocaleString() + '</strong>'}) + '</p>' +
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

document.getElementById('randomNameBtn').addEventListener('click', function() {
    setUserName(generateRandomName());
});

// Records tabs
document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { switchTab(btn.dataset.tab); });
});

// ===== Init =====
var IS_DEV = location.hostname === 'localhost' || location.protocol === 'file:';

document.addEventListener('DOMContentLoaded', function() {
    if (!IS_DEV) {
        document.querySelectorAll('.debug-answer').forEach(function(el) {
            el.style.display = 'none';
        });
    }
    // Apply translations to all data-i18n elements
    applyI18n();
    // URL hash: constant override (#pi, #e, #sqrt2, #phi)
    var hash = window.location.hash.replace('#', '').toLowerCase();
    if (CONSTANTS[hash]) activeConstKey = hash;
    // Restore constant
    switchConstant(activeConstKey);
    refreshUserName();

    // URL hash: view navigation
    if (hash === 'memorize' || hash === 'search' || hash === 'records') {
        switchView(hash);
    } else {
        switchView('home');
    }
});
