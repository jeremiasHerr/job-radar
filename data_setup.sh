#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

python seed_tech.py
python main.py
python extract.py --rebuild
python export.py

echo "Listo."