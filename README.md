# naotoizu7010.github.io

大泉直人の個人ポートフォリオサイト

Astro で構築し、GitHub Pages で公開

- Site: https://naotoizu7010.github.io/
- Framework: Astro
- Hosting: GitHub Pages

## 開発環境

Node.js は 22 系を想定

```bash
npm install
```

ローカル開発サーバーの起動

```bash
npm run dev
```

本番用ビルド

```bash
npm run build
```

ビルド結果のローカル確認

```bash
npm run preview
```

## ページ

現在の主なページ

- `/`: 暫定トップページ
- `/en`: 英語プロフィールページ
- `/cv`: CVページ
- `/personality`: Personalityページ
- `/researcher`: 研究者向けページ
- `/contact`: Contactページ
- `/oldHP`: 旧日本語ページ
- `/oldHPen`: 旧英語ページ

## ディレクトリ構成

```text
src/pages/       ページ
src/components/  UIコンポーネント
src/data/        表示コンテンツ
src/styles/      CSS
public/          静的アセット
docs/roadmap.md  今後の改善メモ
```

## デプロイ

`main` ブランチへの push で、GitHub Actions によるビルドとデプロイを実行

- Workflow: `.github/workflows/deploy.yml`
- Build command: `npm run build`
- Output directory: `dist/`
- Deploy target: GitHub Pages

`astro.config.mjs` では以下の `site` を設定

```js
site: 'https://naotoizu7010.github.io'
```

このリポジトリは `username.github.io` 形式のため、Astro の `base` は未設定

## 今後の改善

今後の改善タスクや方針は `docs/roadmap.md` に集約

大きな変更は、暫定公開版を壊さないように小さめのPRへ分割
