#!/bin/bash
set -e

# Export all .env variables for this script and subprocesses (like envsubst)
set -a
source .env
set +a

# Issue/renew certificate for your domain
sudo certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

# Download SSL best-practice files if missing (Certbot doesn't always create these!)
if [ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]; then
  sudo curl -L https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    -o /etc/letsencrypt/options-ssl-nginx.conf
fi

if [ ! -f /etc/letsencrypt/ssl-dhparams.pem ]; then
  sudo curl -L https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
    -o /etc/letsencrypt/ssl-dhparams.pem
fi

sudo chmod 644 /etc/letsencrypt/options-ssl-nginx.conf /etc/letsencrypt/ssl-dhparams.pem

# Render nginx config from template, but ONLY replace ${DOMAIN}
export DOMAIN
envsubst '${DOMAIN}' < nginx/nginx.conf.template > nginx/nginx.conf

# Start (or restart) Docker Compose stack
docker compose up -d --remove-orphans --build
