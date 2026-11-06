# Repository Notes

## Project Notes

- 今後の改善タスクや方針は `docs/roadmap.md` を参照する。

## Screenshots

- 何かを変更したら、変更箇所を「PC・スマホ」×「ライト・ダーク」の4通りでスクリーンショットに撮り、ユーザーに見せる。
- `npm run build` と `npm run preview` のあと、`node scripts/screenshot.mjs <パス> [CSSセレクタ] [出力先]` で4枚まとめて撮れる（PC幅1280px・スマホ幅390px、出力先の既定は `screenshots/`、Git管理外）。
- playwright が入っていない環境では、アプリ内ブラウザの `resize_window`（`preset: mobile` / `desktop`、`colorScheme: light` / `dark`）で4通りを撮って代用する。
- 変更箇所がわかる範囲を撮る。ページ全体が必要ならセレクタを省く。

## Commit Messages

- 日本語で書く。
- 件名は短く、体言止めを基本にする。
- 本文は箇条書きで、変更内容を読みやすくまとめる。
- 「した」「しました」よりも、「削除」「調整」「追加」「改善」などの名詞形を優先する。

例:

```text
ヘッダーとテーマ切り替えの調整

- ヘッダーからresearcherリンクを削除
- スマホ表示でナビゲーションを固定
- ライト/ダーク切り替えの現在状態を見やすく調整
```
