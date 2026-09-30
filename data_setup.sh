#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

if [ -f .venv/Scripts/python ]; then
  PY=.venv/Scripts/python
else
  PY=.venv/bin/python
fi

$PY seed_tech.py
$PY main.py
$PY extract.py --rebuild
$PY export.py

echo "Listo."