# Cloudflare 설정 정리

## 1. Cloudflare Pages — 프론트엔드

| 항목 | 값 |
|------|-----|
| 프로젝트 이름 | `pi-finder` |
| 기본 URL | `https://pi-finder.pages.dev` |
| 커스텀 도메인 | `https://pifi.acidblob.com` |
| 배포 방식 | `wrangler pages deploy` (수동) |

### 배포 명령어

```bash
cd backend
npx wrangler pages deploy .. --project-name pi-finder --commit-dirty=true
```

### DNS 설정 (acidblob.com)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `pifi` | `pi-finder.pages.dev` | ON |

---

## 2. Cloudflare Workers — 백엔드 API

| 항목 | 값 |
|------|-----|
| Worker 이름 | `pi-finder-api` |
| 커스텀 도메인 | `https://pi-finder-api.acidblob.com` |
| 설정 파일 | `backend/wrangler.toml` |

### 배포 명령어

```bash
cd backend
npx wrangler deploy
```

### API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/records?constKey=pi&period=all&uid=xxx` | 리더보드 조회 |
| `POST` | `/records` | 기록 저장 |
| `DELETE` | `/records/:id?uid=xxx` | 기록 삭제 |

`period` 값: `all` / `monthly` / `weekly`

---

## 3. D1 데이터베이스

| 항목 | 값 |
|------|-----|
| 데이터베이스 이름 | `pi-finder-db` |
| 데이터베이스 ID | `9e131ce1-3be2-449b-8093-55dc794ea215` |
| 스키마 파일 | `backend/schema.sql` |

### 스키마 초기화

```bash
cd backend

# 로컬 (개발용)
npx wrangler d1 execute pi-finder-db --file=schema.sql

# 리모트 (운영)
npx wrangler d1 execute pi-finder-db --remote --file=schema.sql
```

---

## 4. 로컬 개발

```bash
cd backend
npx wrangler dev   # API 서버: http://localhost:8787
```

프론트엔드는 `index.html`을 브라우저에서 직접 열거나 정적 서버로 서빙합니다.  
`localhost` 또는 `file://` 환경에서는 `app.js`가 자동으로 로컬 API를 바라봅니다.
