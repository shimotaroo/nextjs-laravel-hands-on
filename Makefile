# Docker
init:
	docker-compose up -d --build
	docker-compose exec api composer install
	docker-compose exec api php artisan key:generate
	docker-compose exec api php artisan migrate --seed
	docker-compose exec front yarn
	docker-compose exec front yarn dev

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

# next.js
dev:
	docker-compose exec front yarn dev

axios:
	docker-compose exec front yarn add axios

# laravel
sanctum:
	docker-compose exec api composer require laravel/sanctum
	docker-compose exec api php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

route:
	docker-compose exec api php artisan route:list