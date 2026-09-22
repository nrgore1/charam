#!/usr/bin/env bash
# Run ON the VPS. Pulls latest source, builds sha-tagged web+api images, rolls out.
set -euo pipefail
SRC=/opt/charam/src
cd "$SRC"
git pull
TAG=$(git rev-parse --short HEAD)
docker build -t "charam/web:${TAG}" -f "$SRC/Dockerfile" "$SRC"
docker build -t "charam/api:${TAG}" -f "$SRC/Dockerfile.api" "$SRC"
touch /opt/charam/.env
grep -v '^TAG=' /opt/charam/.env > /opt/charam/.env.tmp || true
echo "TAG=${TAG}" >> /opt/charam/.env.tmp
mv /opt/charam/.env.tmp /opt/charam/.env
docker compose -f /opt/charam/compose.yml --env-file /opt/charam/.env up -d
echo "Deployed charam web+api :${TAG}"
