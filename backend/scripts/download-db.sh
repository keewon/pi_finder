#!/usr/bin/env bash
# D1 데이터베이스를 SQL dump로 다운로드
# 사용법: ./scripts/download-db.sh

set -euo pipefail

DB_NAME="pi-finder-db"
OUTPUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/db-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="$OUTPUT_DIR/${DB_NAME}_${TIMESTAMP}.sql"

mkdir -p "$OUTPUT_DIR"

echo "▶ $DB_NAME SQL dump 내보내기..."
cd "$(dirname "$0")/.."
npx wrangler d1 export "$DB_NAME" --remote --output="$OUTPUT_FILE"
echo "✓ 완료: $OUTPUT_FILE"
