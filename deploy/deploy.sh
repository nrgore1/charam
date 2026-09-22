#!/usr/bin/env bash
set -euo pipefail
SRC=/opt/charam/src
cd "$SRC"
git pull
TAG=$(git rev-parse --short HEAD)
docker build -t "charam/web:${TAG}" "$SRC"
echo "TAG=${TAG}" > /opt/charam/.env
docker compose -f /opt/charam/compose.yml --env-file /opt/charam/.env up -d
echo "Deployed charam/web:${TAG}"
