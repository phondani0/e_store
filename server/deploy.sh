set -e

# Run certbot to issue cert
sudo certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

# Download SSL config files (if missing)
[ -f /etc/letsencrypt/options-ssl-nginx.conf ] || \
  sudo wget https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/options-ssl-nginx.conf -O /etc/letsencrypt/options-ssl-nginx.conf

[ -f /etc/letsencrypt/ssl-dhparams.pem ] || \
  sudo wget https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem -O /etc/letsencrypt/ssl-dhparams.pem

sudo chmod 644 /etc/letsencrypt/options-ssl-nginx.conf /etc/letsencrypt/ssl-dhparams.pem

# Render nginx config
envsubst < nginx/nginx.conf.template > nginx/nginx.conf

# Start Docker Compose
docker-compose up -d --remove-orphans
