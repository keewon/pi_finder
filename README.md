# 수학 상수 외우기 & 찾기

π, e, √2, φ 를 외우고 특정 숫자열의 위치를 찾는 웹 서비스다.

🌐 **[pifi.acidblob.com](https://pifi.acidblob.com)**

---

## 디렉토리 구조

```
.
├── original/        # Vanilla HTML/CSS/JS 프론트엔드 (Cloudflare Pages)
├── apps-in-toss/    # 앱인토스 미니앱 (React + Vite)
└── backend/         # Cloudflare Workers API
```

---

## 지원 상수

| 상수 | 설명 |
|------|------|
| π | 원주율 |
| e | 자연로그의 밑 |
| √2 | 2의 제곱근 |
| φ | 황금비 |

각 상수마다 소수점 최대 1000자리까지 지원한다.

URL 해시로 바로 진입할 수 있다: `pifi.acidblob.com/#pi`, `/#e`, `/#sqrt2`, `/#phi`

---

## 기능

### 외우기
- **키패드 모드**: 숫자를 한 자리씩 직접 입력
- **객관식 모드**: 2~10자리씩 4개 보기 중 선택
- 시작 위치 옵션: 소수점 이하부터 / 정수부(3.)부터
- 진행 상황, 경과 시간 표시
- 틀리면 게임오버 — 다시하기 또는 이어서하기 가능

### 찾기
- 최대 8자리 숫자열이 해당 상수의 어느 위치에 등장하는지 검색
- 처음 나오는 위치와 전후 맥락을 표시

### 기록
- 점수(자릿수), 소요 시간, 이름을 서버에 저장
- 전체 / 이번 달 / 이번 주 / 내 기록 탭으로 조회
- 일일 저장 횟수 제한 있음 (20회)

---

## 사용자 이름

최초 접속 시 **형용사 + 수학자 이름** 형태의 별명을 자동 부여한다.  
설정에서 랜덤 재생성하거나 직접 입력할 수 있다.

---

## 다국어 지원

한국어, English, 日本語, 中文, Español, Français, Deutsch, Português, Русский, العربية 총 10개 언어를 지원한다.

URL 파라미터로 언어를 강제 지정할 수 있다: `?lang=ja`

---

## 테마

라이트 / 다크 / 시스템 설정 연동을 지원한다.

---

## 기술 스택

**original (Vanilla)**
- Vanilla HTML/CSS/JS (프레임워크 없음)
- Cloudflare Pages로 배포

**apps-in-toss**
- React + TypeScript + Vite
- 앱인토스 미니앱 (`ait deploy`)

**backend**
- Cloudflare Workers (TypeScript)
- Cloudflare D1 (SQLite) — 리더보드 저장
- `records` 테이블: `const_key`, `digits`, `time`, `uid`, `name`, `mode`, `created_at`

---

## 로컬 개발

```bash
# original 프론트엔드: 정적 파일이므로 아무 HTTP 서버나 사용
cd original
npx serve .

# apps-in-toss 프론트엔드
cd apps-in-toss
npm install
npm run dev

# 백엔드
cd backend
npm install
npx wrangler dev
```

---

## 링크

- [문의하기](https://github.com/keewon/pi_finder)
- [나 요즘 파이 됐대](https://www.youtube.com/watch?v=KcRJgoW10FE)
