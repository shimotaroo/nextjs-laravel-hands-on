# Next.js×Laravelで開発する簡易アプリケーションのハンズオン

## 前提

- M1Mac対応しています！
- Intel製チップMacの場合は`.docker/db/Dockerfile`を以下の通り修正
- Windowsでの動作確認は行っておらず環境構築のエラー対応はできないので悪しからず...

```diff
- FROM --platform=linux/x86_64 mysql:8.0
+ FROM mysql:8.0

ENV TZ=UTC

COPY my.cnf /etc/my.cnf
```

## コンテナ起動

```sh
make init
```

## Laravelインストール

```sh
docker-compose exec api composer create-project laravel/laravel .
```

`api`ディレクトリ内にLaravelがインストールされる

`localhost:80`にアクセスするとLaravelのウェルカムページが表示される

## Next.jsインストール

```sh
docker-compose exec front yarn create next-app  --typescript .

# 開発用サーバー起動
docker-compose exec front yarn dev
```

`front`ディレクトリ内にNext.jsがインストールされる

`localhost:3000`にアクセスするとNext.jsのウェルカムページが表示される

開発用サーバーの停止は`control + c`

