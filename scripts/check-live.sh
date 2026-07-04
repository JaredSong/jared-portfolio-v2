#!/bin/sh
# Verifies the LIVE site serves the CURRENT local build (out/).
#
# Why not just open the homepage? Hostinger's .htaccess rewrites every
# missing path to index.html with a 200, so routes "working" proves nothing
# (that's exactly how the first v2 deploy looked fine while nothing had
# uploaded). A content-hashed chunk can't lie: it only exists on the server
# if THIS build was uploaded.
set -e
cd "$(dirname "$0")/.."

if [ ! -d out/_next/static/chunks ]; then
  echo "no out/ build found — run: npm run build" >&2
  exit 1
fi

CHUNK=$(ls out/_next/static/chunks/*.js | head -1)
URL="https://jaredsong.com/_next/static/chunks/$(basename "$CHUNK")"
CT=$(curl -s -o /dev/null -w '%{content_type}' "$URL")

case "$CT" in
  *javascript*)
    echo "PASS — live site is serving this build ($URL)"
    ;;
  *)
    echo "FAIL — live site does NOT have this build's files."
    echo "       $URL"
    echo "       returned content-type '$CT' (the .htaccess 404-rewrite),"
    echo "       so the upload didn't land in public_html. Re-run: npm run deploy"
    exit 1
    ;;
esac
