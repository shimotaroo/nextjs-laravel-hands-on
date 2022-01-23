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

## 環境構築

```sh
make init
```

以下の状態になればOK

- `api`ディレクトリ内にLaravelがインストールされている
- `localhost:80`にアクセスするとLaravelのウェルカムページが表示される
- `front`ディレクトリ内にNext.jsがインストールされる
- `localhost:3000`にアクセスするとNext.jsのウェルカムページが表示される

## LaravelのDB接続情報更新

`api/.env`を修正

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=next_laravel
DB_USERNAME=sample
DB_PASSWORD=sample

```
## Tailwind CSSのインストールとセットアップ

```sh
make tailwind
```

以下のファイルが作成されていたらOK

- tailwind.config.js
- postcss.config.js

`front/tailwind.config.js`を修正

```diff
module.exports = {
+ mode: 'jit',
- purge: [],
+ purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

`front/pages/_app.tsx`を修正

```diff
- import '../styles/globals.css'
+ import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

## Next.jsの開発用サーバーの起動・停止

- 起動: `make dev`
- 停止: `control + c`