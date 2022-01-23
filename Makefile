init:
	docker-compose up -d --build
	docker-compose exec api composer create-project laravel/laravel .
	docker-compose exec front yarn create next-app  --typescript .
	docker-compose exec front yarn dev

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

dev:
	docker-compose exec front yarn dev

tailwind:
	docker-compose exec front yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
	docker-compose exec front yarn tailwindcss init -p