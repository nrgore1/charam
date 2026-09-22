# Build the static export, then serve it with nginx — same pattern as the
# other sha-tagged web images on the VPS (e.g. liqmint/vireoka).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx-container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
