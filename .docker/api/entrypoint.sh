#!/bin/sh

cd /app

# .envが存在しなければ、.env.localからコピー
if [ ! -e ".env" ]; then
  cp .env.example .env
fi

# PHP-FPM 起動
exec php-fpm