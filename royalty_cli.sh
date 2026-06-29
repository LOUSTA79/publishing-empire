#!/data/data/com.termux/files/usr/bin/bash
cd "$(dirname "$0")"
case "$1" in
  summary) curl -s http://localhost:3000/api/royalties/summary | jq . ;;
  pending) curl -s http://localhost:3000/api/royalties/pending | jq . ;;
  dry-run) node royalty_payout_engine.js --dry-run ;;
  *) echo "Usage: ./royalty_cli.sh [summary|pending|dry-run]" ;;
esac
