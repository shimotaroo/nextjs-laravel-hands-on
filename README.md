# Next.js×Laravelで開発する簡易アプリケーションのハンズオン

## 前提

- M1Macにも対応しています！
- Windowsでの動作確認は行っておらず環境構築のエラー対応はできないので悪しからず...

## 使用技術

- frontend: TypeScript/React/Next.js/Tailwind CSS
- backend(api): PHP/Laravel
- infra: Docker/Docker Compose
## ブランチ指定でclone

```
git clone -b init https://github.com/shimotaroo/nextjs-laravel-hands-on.git
```

## DB用Dockerfileの修正（M1Mac以外）

`.docker/db/Dockerfile`を修正

```diff
- FROM --platform=linux/x86_64 mysql:8.0
+ FROM mysql:8.0

ENV TZ=UTC

COPY my.cnf /etc/my.cnf
```

## 環境構築

```sh
make init
```

以下の状態になればOK

### api(Laravel)

- `api`ディレクトリ内にLaravelがインストールされている
- `localhost:80`にアクセスするとLaravelのウェルカムページが表示される

### frontend(Next.js)

- `front`ディレクトリ内にNext.jsがインストールされる
- `localhost:3000`にアクセスするとログイン画面が表示される

<img width="557" alt="スクリーンショット 2022-01-24 23 55 13" src="https://user-images.githubusercontent.com/58982088/150806401-cef92bc1-633c-4bbc-943b-a08e17e0c800.png">

- `localhost:3000/memos`にアクセスするとメモ一覧画面が表示される

<img width="710" alt="スクリーンショット 2022-01-24 23 55 31" src="https://user-images.githubusercontent.com/58982088/150806412-1b101330-dd62-4bf9-9fa0-2bbc8c1e7d15.png">

- `localhost:3000/memos/post`にアクセスすると登録画面が表示される

<img width="546" alt="スクリーンショット 2022-01-24 23 55 49" src="https://user-images.githubusercontent.com/58982088/150806422-2466d8f6-9acd-4b93-bac6-63f56a1d28ef.png">

## GUIツールでDBに接続

- Sequel Ace
- Table Plus

等のGUIツールでDB(MySQL)に接続。（以下接続情報）

ホスト: 127.0.0.1
ユーザー: sample
パスワード: sample
データベース: next_laravel

## Next.jsの開発用サーバーの起動・停止

- 起動: `make dev`
- 停止: `control + c`