// 쿠키 관리
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// localStorage 관리
// 형용사 + 과학자 이름 생성
function generateRandomName() {
    const adjectives = [
        '우울한', '방금 일어난', '지각한', '졸린', '배고픈', '피곤한',
        '설레는', '당황한', '당황스러운', '혼란스러운', '기쁜', '신난',
        '심심한', '지루한', '재밌는', '즐거운', '행복한', '슬픈',
        '화난', '짜증난', '긴장한', '불안한', '평온한', '차분한',
        '흥분한', '신기한', '놀란', '당황한', '멍한', '집중한',
        '산만한', '조용한', '시끄러운', '활발한', '느린', '빠른',
        '게으른', '부지런한', '열심인', '노력하는', '포기한', '도전하는'
    ];
    
    const scientists = [
        // 외국 과학자
        '아인슈타인', '뉴턴', '갈릴레오', '다윈', '파스퇴르', '마리 퀴리',
        '테슬라', '페르미', '보어', '하이젠베르크', '슈뢰딩거',
        '맥스웰', '파인만', '호킹', '멘델', '파블로프',
        '플랑크', '헤르츠', '볼타', '암페어', '오옴', '패러데이',
        '라부아지에', '멘델레예프', '오펜하이머',
        // 그리스 과학자
        '아르키메데스', '피타고라스', '유클리드', '히포크라테스', '아리스토텔레스',
        // 르네상스 과학자
        '다 빈치',
        // 여성 과학자
        '에이다 러브레이스', '헤디 라마', '그레이스 호퍼',
        '마리아 게퍼트 메이어', '도로시 호지킨', '로절린드 프랭클린',
        // 한국 과학자
        '장영실', '이순지', '최무선', '홍대용',
        '정약용', '김정호',
        '우장춘', '석주명', '이휘소'
    ];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const scientist = scientists[Math.floor(Math.random() * scientists.length)];
    return `${adjective} ${scientist}`;
}

// 사용자 이름 관리
function getUserName() {
    const savedName = getCookie('piUserName');
    if (savedName) {
        return savedName;
    }
    // 쿠키에 없으면 랜덤 생성하고 저장
    const newName = generateRandomName();
    setCookie('piUserName', newName);
    return newName;
}

function setUserName(name) {
    setCookie('piUserName', name);
    updateUserNameDisplay();
}

function updateUserNameDisplay() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) {
        userNameDisplay.textContent = getUserName();
    }
}

function saveRecord(name, digits, time) {
    const records = getRecords();
    const record = {
        id: Date.now(),
        name: name || generateRandomName(),
        digits: digits,
        time: time,
        date: new Date().toISOString()
    };
    records.push(record);
    records.sort((a, b) => b.digits - a.digits || a.time - b.time);
    localStorage.setItem('piRecords', JSON.stringify(records));
    return record;
}

function getRecords() {
    const records = localStorage.getItem('piRecords');
    return records ? JSON.parse(records) : [];
}

function deleteRecord(id) {
    const records = getRecords();
    const filtered = records.filter(r => r.id !== id);
    localStorage.setItem('piRecords', JSON.stringify(filtered));
    displayRecords();
}

// 탭 전환
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Tab`).classList.add('active');
    // 쿠키에 저장
    setCookie('piActiveTab', tab);
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchTab(tab);
    });
});

// 사이드 메뉴
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// 옵션 로드 및 저장
const startOption = document.getElementById('startOption');
const modeOption = document.getElementById('modeOption');

// 저장된 옵션 로드
const savedStart = getCookie('piStartOption');
const savedMode = getCookie('piModeOption');
if (savedStart) startOption.value = savedStart;
if (savedMode) modeOption.value = savedMode;

// 옵션 변경 시 저장
startOption.addEventListener('change', () => {
    setCookie('piStartOption', startOption.value);
    if (currentMode) initMemorize();
});

modeOption.addEventListener('change', () => {
    setCookie('piModeOption', modeOption.value);
    initMemorize();
});

// 파이 외우기 기능
let currentMode = null;
let currentPosition = 0;
let startTime = null;
let timerInterval = null;
let userInput = '';

// Pi 데이터 (1000자리) - "3.14159..." 형식
const PI_1000 = PI_DIGITS.substring(0, 1002); // "3." + 1000자리

function initMemorize() {
    const mode = modeOption.value;
    const start = startOption.value;
    
    // 모드 전환
    document.getElementById('multipleChoiceMode').classList.toggle('hidden', mode === 'keypad');
    document.getElementById('keypadMode').classList.toggle('hidden', mode !== 'keypad');
    
    currentMode = mode;
    currentPosition = 0;
    userInput = '';
    startTime = Date.now();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100);
    
    if (mode === 'keypad') {
        initKeypadMode(start);
    } else {
        initMultipleChoiceMode(mode, start);
    }
    
    updateProgress();
}

function initMultipleChoiceMode(mode, start) {
    const digitsPerQuestion = mode === 'multiple3' ? 3 : 4;
    showNextQuestion(digitsPerQuestion, start);
}

function initKeypadMode(start) {
    const display = document.getElementById('keypadPiDisplay');
    const inputDisplay = document.getElementById('inputDisplay');
    const resultMessage = document.getElementById('keypadResultMessage');
    
    resultMessage.classList.remove('show');
    inputDisplay.textContent = '';
    
    if (start === 'three') {
        display.textContent = '3.';
    } else {
        display.textContent = '.';
    }
}

function showNextQuestion(digitsPerQuestion, start) {
    const piDisplay = document.getElementById('piDisplay');
    const questionText = document.getElementById('questionText');
    const choicesDiv = document.getElementById('choices');
    const resultMessage = document.getElementById('resultMessage');
    
    resultMessage.classList.remove('show');
    
    if (currentPosition >= 1000) {
        endMemorize();
        return;
    }
    
    // 현재 위치의 Pi 표시
    let displayText = '';
    if (start === 'three') {
        // "3.부터" - "3." 포함하여 표시
        displayText = PI_1000.substring(0, 2 + currentPosition);
    } else {
        // "소숫점 이하부터" - "3." 제외하고 소숫점 이하만 표시
        displayText = '.' + PI_1000.substring(2, 2 + currentPosition);
    }
    piDisplay.textContent = displayText;
    
    // 다음 숫자들 (소숫점 이하 위치 기준)
    const nextDigits = PI_1000.substring(2 + currentPosition, 2 + currentPosition + digitsPerQuestion);
    questionText.textContent = `다음 ${digitsPerQuestion}자리는?`;
    
    // 선택지 생성
    const correctAnswer = nextDigits;
    const choices = [correctAnswer];
    
    // 오답 생성
    while (choices.length < 4) {
        let wrongAnswer = '';
        for (let i = 0; i < digitsPerQuestion; i++) {
            wrongAnswer += Math.floor(Math.random() * 10).toString();
        }
        if (!choices.includes(wrongAnswer)) {
            choices.push(wrongAnswer);
        }
    }
    
    // 선택지 섞기
    choices.sort(() => Math.random() - 0.5);
    
    choicesDiv.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.addEventListener('click', () => checkAnswer(choice, correctAnswer, digitsPerQuestion, start));
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct, digitsPerQuestion, start) {
    const choices = document.querySelectorAll('.choice-btn');
    choices.forEach(btn => {
        btn.classList.add('disabled');
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.classList.add('show');
    
    if (selected === correct) {
        resultMessage.textContent = '정답입니다!';
        resultMessage.className = 'result-message show correct';
        currentPosition += digitsPerQuestion;
        updateProgress();
        
        setTimeout(() => {
            if (currentPosition < 1000) {
                showNextQuestion(digitsPerQuestion, start);
            } else {
                endMemorize();
            }
        }, 1000);
    } else {
        resultMessage.textContent = `틀렸습니다. 정답은 ${correct}입니다.`;
        resultMessage.className = 'result-message show wrong';
        endMemorize();
    }
}

// 키패드 모드
const keypad = document.getElementById('keypad');
keypad.addEventListener('click', (e) => {
    if (e.target.classList.contains('key-btn')) {
        const key = e.target.dataset.key;
        if (key !== undefined) {
            if (e.target.id === 'deleteBtn') {
                handleDelete();
            } else {
                handleKeypadInput(key);
            }
        }
    }
});

function handleKeypadInput(digit) {
    if (currentPosition >= 1000) {
        endMemorize();
        return;
    }
    
    // 소숫점 이하 위치 기준으로 숫자 확인 (PI_1000[2]부터가 소숫점 이하)
    const expectedDigit = PI_1000[2 + currentPosition];
    const inputDisplay = document.getElementById('keypadPiDisplay');
    const resultMessage = document.getElementById('keypadResultMessage');
    
    if (digit === expectedDigit) {
        userInput += digit;
        currentPosition++;
        
        const start = startOption.value;
        let displayText = '';
        if (start === 'three') {
            // "3.부터" - "3." 포함하여 표시
            displayText = PI_1000.substring(0, 2 + currentPosition);
        } else {
            // "소숫점 이하부터" - "3." 제외하고 소숫점 이하만 표시
            displayText = '.' + PI_1000.substring(2, 2 + currentPosition);
        }
        inputDisplay.textContent = displayText;
        
        updateKeypadProgress();
        
        if (currentPosition >= 1000) {
            endMemorize();
        }
    } else {
        resultMessage.textContent = `틀렸습니다. 정답은 ${expectedDigit}입니다.`;
        resultMessage.className = 'result-message show wrong';
        endMemorize();
    }
}

function handleDelete() {
    if (userInput.length > 0 && currentPosition > 0) {
        userInput = userInput.slice(0, -1);
        currentPosition--;
        
        const start = startOption.value;
        let displayText = '';
        if (start === 'three') {
            // "3.부터" - "3." 포함하여 표시
            displayText = PI_1000.substring(0, 2 + currentPosition);
        } else {
            // "소숫점 이하부터" - "3." 제외하고 소숫점 이하만 표시
            displayText = '.' + PI_1000.substring(2, 2 + currentPosition);
        }
        document.getElementById('keypadPiDisplay').textContent = displayText;
        
        updateKeypadProgress();
    }
}

function updateProgress() {
    const progress = (currentPosition / 1000) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentPosition').textContent = currentPosition;
}

function updateKeypadProgress() {
    const progress = (currentPosition / 1000) * 100;
    document.getElementById('keypadProgressFill').style.width = progress + '%';
    document.getElementById('keypadCurrentPosition').textContent = currentPosition;
}

function updateTimer() {
    if (!startTime) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('elapsedTime').textContent = timeString;
    document.getElementById('keypadElapsedTime').textContent = timeString;
}

function endMemorize() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const recordPanel = document.getElementById('recordPanel');
    recordPanel.style.display = 'block';
    
    // 기록 저장 버튼
    const saveBtn = document.getElementById('saveRecordBtn');
    saveBtn.onclick = () => {
        const name = document.getElementById('recordName').value;
        saveRecord(name, currentPosition, elapsed);
        displayRecords();
        document.getElementById('recordName').value = '';
    };
}

// 기록 표시
function displayRecords() {
    const records = getRecords();
    const recordsList = document.getElementById('recordsList');
    
    if (records.length === 0) {
        recordsList.innerHTML = '<p style="color: #666; text-align: center; padding: 1rem;">기록이 없습니다.</p>';
        return;
    }
    
    recordsList.innerHTML = records.map(record => {
        const minutes = Math.floor(record.time / 60);
        const seconds = record.time % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const date = new Date(record.date).toLocaleDateString('ko-KR');
        
        return `
            <div class="record-item">
                <div class="record-item-info">
                    <div class="record-item-name">${record.name}</div>
                    <div class="record-item-details">${record.digits}자리 | ${timeString} | ${date}</div>
                </div>
                <button class="delete-record-btn" onclick="deleteRecord(${record.id})">삭제</button>
            </div>
        `;
    }).join('');
}

// 파이 찾기 기능
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.getElementById('searchResult');

// 숫자만 입력 허용
searchInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// 엔터 키로 검색
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});

searchBtn.addEventListener('click', () => {
    const searchString = searchInput.value;
    if (!searchString || searchString.length === 0 || searchString.length > 8) {
        searchResult.innerHTML = '<p style="color: #f44336; text-align: center;">1~8자리 숫자를 입력해주세요.</p>';
        return;
    }
    
    searchResult.innerHTML = '<p style="text-align: center; color: #666;">검색 중...</p>';
    
    // 비동기로 검색 (UI 블로킹 방지)
    setTimeout(() => {
        const results = findInPi(searchString);
        displaySearchResults(searchString, results);
    }, 10);
});

function findInPi(searchString) {
    const maxDigits = 1000000; // 백만자리 (소숫점 이하 기준)
    // PI_DIGITS는 "3.14159..." 형식이므로, 소숫점 이하부터 검색 (인덱스 2부터)
    // 실제 사용 가능한 길이 계산 (PI_DIGITS.length - 2가 소숫점 이하 자릿수)
    const availableDigits = Math.min(maxDigits, PI_DIGITS.length - 2);
    const piSubstring = PI_DIGITS.substring(2, 2 + availableDigits);
    
    let firstPosition = -1;
    let count = 0;
    let position = 0;
    
    while (true) {
        position = piSubstring.indexOf(searchString, position);
        if (position === -1) break;
        
        if (firstPosition === -1) {
            firstPosition = position; // 소숫점 이하 기준 위치
        }
        count++;
        position++;
    }
    
    return { firstPosition, count };
}

function displaySearchResults(searchString, results) {
    if (results.firstPosition === -1) {
        searchResult.innerHTML = `
            <div class="search-result-item">
                <h4>검색 결과</h4>
                <p>검색어: <strong>${searchString}</strong></p>
                <p>Pi의 백만자리 내에서 해당 숫자를 찾을 수 없습니다.</p>
            </div>
        `;
    } else {
        // results.firstPosition은 소숫점 이하 기준 위치 (0부터 시작)
        // 표시할 때는 1번째 자리부터이므로 +1
        const displayPosition = results.firstPosition + 1;
        const searchLength = searchString.length;
        
        // 각 줄의 길이 설정
        const lineLength = 40; // 각 줄의 숫자 개수
        const halfLine = Math.floor(lineLength / 2);
        
        // 검색어 시작 위치 (PI_DIGITS에서의 실제 위치, "3." 포함)
        // PI_DIGITS는 "3.14159..." 형식이므로, 소숫점 이하 위치 + 2
        const matchStart = results.firstPosition + 2;
        
        // 가운데 줄: 검색어가 가운데에 오도록 앞뒤로 숫자 추출
        // 검색어 앞에 halfLine만큼, 뒤에 (lineLength - halfLine)만큼
        const centerBeforeStart = Math.max(2, matchStart - halfLine); // 최소 "3." 이후
        const centerAfterEnd = Math.min(PI_DIGITS.length, matchStart + searchLength + (lineLength - halfLine));
        const centerLine = PI_DIGITS.substring(centerBeforeStart, centerAfterEnd);
        
        // 위 줄: 가운데 줄 바로 앞
        const upperLineStart = Math.max(2, centerBeforeStart - lineLength); // 최소 "3." 이후
        const upperLine = PI_DIGITS.substring(upperLineStart, centerBeforeStart) || '...';
        
        // 아래 줄: 가운데 줄 바로 뒤
        const lowerLineStart = centerAfterEnd;
        const lowerLineEnd = Math.min(PI_DIGITS.length, lowerLineStart + lineLength);
        const lowerLine = PI_DIGITS.substring(lowerLineStart, lowerLineEnd) || '...';
        
        // 가운데 줄에서 검색어 하이라이트 (항상 centerLine의 중간 부분에 위치)
        const matchInCenter = centerLine.indexOf(searchString);
        const highlightCenter = centerLine.substring(0, matchInCenter) +
            '<mark style="background: #ffeb3b; padding: 2px 4px; border-radius: 3px; font-weight: bold;">' + searchString + '</mark>' +
            centerLine.substring(matchInCenter + searchLength);
        
        searchResult.innerHTML = `
            <div class="search-result-item">
                <h4>검색 결과</h4>
                <p>검색어: <strong>${searchString}</strong></p>
                <p>최초 위치: 소숫점 이하 <strong>${displayPosition.toLocaleString()}</strong>번째 자리</p>
                <p>발견 횟수: <strong>${results.count.toLocaleString()}</strong>번</p>
                <div class="pi-context" style="margin-top: 1.5rem; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; font-family: 'Courier New', monospace;">
                    <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.75rem; text-align: center; word-break: break-all; letter-spacing: 1px;">${upperLine}</div>
                    <div style="color: #333; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.75rem; text-align: center; word-break: break-all; letter-spacing: 1px;">${highlightCenter}</div>
                    <div style="color: #666; font-size: 0.9rem; text-align: center; word-break: break-all; letter-spacing: 1px;">${lowerLine}</div>
                </div>
            </div>
        `;
    }
}

// 사용자 이름 변경 UI
function initUserNameEditor() {
    const editNameBtn = document.getElementById('editNameBtn');
    const editNamePanel = document.getElementById('editNamePanel');
    const userNameInput = document.getElementById('userNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const randomNameBtn = document.getElementById('randomNameBtn');
    
    // 연필 아이콘 클릭 시 편집 패널 토글
    editNameBtn.addEventListener('click', () => {
        editNamePanel.classList.toggle('hidden');
        if (!editNamePanel.classList.contains('hidden')) {
            userNameInput.focus();
        }
    });
    
    // 저장 버튼
    saveNameBtn.addEventListener('click', () => {
        const newName = userNameInput.value.trim();
        if (newName) {
            setUserName(newName);
            editNamePanel.classList.add('hidden');
            userNameInput.value = '';
        }
    });
    
    // 랜덤 생성 버튼
    randomNameBtn.addEventListener('click', () => {
        const randomName = generateRandomName();
        setUserName(randomName);
        editNamePanel.classList.add('hidden');
        userNameInput.value = '';
    });
    
    // 엔터 키로 저장
    userNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveNameBtn.click();
        }
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 저장된 탭 복원
    const savedTab = getCookie('piActiveTab');
    if (savedTab && (savedTab === 'memorize' || savedTab === 'search')) {
        switchTab(savedTab);
    }
    
    // 사용자 이름 표시 및 편집 기능 초기화
    updateUserNameDisplay();
    initUserNameEditor();
    
    initMemorize();
    displayRecords();
});

