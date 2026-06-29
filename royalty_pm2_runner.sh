#!/data/data/com.termux/files/usr/bin/bash
while true; do
  date
  cd "$HOME/publishing-empire"
  node royalty_payout_engine.js --autonomous
  sleep 3600
done
