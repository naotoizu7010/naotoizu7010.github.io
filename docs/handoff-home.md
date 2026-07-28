# トップページ Handoff

新トップページ (`/`) の実装メモ。作業を引き継ぐとき、または中断した作業を再開するときに読む。

作業ブランチ: `claude/homepage-design-update-bdb8fd`

## いまの状態

`https://www.japanwave.co.jp/` のレイアウトを参考に、トップページだけを組み直したもの。
**配色とフォントは旧デザイン (`src/styles/data-flow/`) の値をそのまま使っていて、変更していない。**

セクションの並び:

| # | セクション | 背景 | ファイル |
| --- | --- | --- | --- |
| 1 | ヒーロー | 地の色 (グリッド + ドット) | `src/components/home/Hero.astro` |
| — | ~~Mission (My Theme)~~ | 白 | `src/components/home/Mission.astro` **← 非表示中** |
| 2 | About + 基本情報 | 薄グレー | `src/components/home/About.astro` |
| 3 | Activities | 白 | `src/components/home/Activities.astro` |
| 4 | Personality | 濃紺 | `src/components/home/Personality.astro` |
| 5 | Links | 白 | `src/components/home/Links.astro` |
| 6 | フッター | 濃紺 | `src/components/home/Footer.astro` |

ヒーローとフッターは旧トップページ (data-flow 版) の markup をそのまま使っている。
背景のグリッド・流れる曲線・ドットのアニメーションも旧版のまま (`src/scripts/data-flow-bg.ts`)。

## 【要対応】Mission (My Theme) セクションを作り直す

**いまは非表示にしてある。あとで作り直す予定。**

### 戻し方

1. `src/components/home/HomePage.astro`
   - `// import Mission from './Mission.astro';` のコメントを外す
   - `{/* <Mission /> */}` のコメントを外す
2. `src/components/home/About.astro`
   - 先頭のコメントアウトしてある `<div class="hp-cut hp-cut--top hp-cut--paper">` を戻す
     （上が白いセクションになるので、斜めカットが必要になる）

コンポーネントと CSS (`.hp-mission-inner` / `.hp-mission-body`) は消していないので、
上の2ファイルを戻すだけで元通り表示される。

### 作り直すときのメモ

- いまの中身は「スタジアムの人の流れを、データで読み解く。」の見出し + 段落ひとつだけ。
  本文は `src/data/content.ts` の `about` と `research.items[0].body` から持ってきた文章で、
  **専用のコンテンツをまだ用意していない**。
- 参考にした JAPANWAVE では、ここは "Our Mission" にあたる1カラムの宣言ブロック。
  見出し + 本文だけのシンプルな構成で、右上に薄い赤の斜めの面 (`.hp-corner`) を置いている。
  `.hp-corner` は About でも使っている共通パーツ (`tokens.css`)。青にしたいときは `.hp-corner--blue`。
- 白背景のセクションなので、上下の並び (ヒーロー → ここ → About のグレー) の
  明暗の交互が崩れないようにする。
- 文章を `content.ts` に持たせるなら、`mission: { heading, body }` のような形を足すのがよさそう。
  いまは `Mission.astro` に直書きしている。

## 作りの前提

### スタイル

- `src/styles/home.css` が入口。中身は `src/styles/home/` の4ファイル:
  - `tokens.css` — 色・フォント・レイアウト変数、共通パーツ (eyebrow / 見出し / ボタン / 透かし文字 / 斜めカット)
  - `legacy.css` — 旧デザインのヒーローとフッター、背景アニメーション
  - `header.css` — 固定ヘッダーとモバイルメニュー
  - `sections.css` — 各セクションのレイアウト
  - `responsive.css` — タブレット / スマホの組み替え
- 色とフォントの変数は `.hp-root` に定義。値は `src/styles/data-flow/core.css` からのコピー。
  **新しい色は足していない。** 色を触るときは両方を揃えること。
- クラスの接頭辞は `hp-`。ただし旧デザイン由来のものと、
  JS が参照するもの (`.df-burger` / `.df-menu` / `.df-theme-toggle` / `.df-root`) は `df-` のまま。

### フォントの使い分け (旧デザインと同じ)

| 用途 | フォント |
| --- | --- |
| 日本語の見出し | Noto Sans JP 800〜900 |
| 英字の見出し・固有名詞・基本情報の値 | Space Grotesk |
| ラベル・ナビ・ボタン・番号・メタ情報 | JetBrains Mono |
| 本文 | Inter + Noto Sans JP |

### 配色のルール (旧デザインと同じ)

- eyebrow のバーとラベル、主要ボタン、ナビの奇数番目のドットは **赤** (`--df-red`)
- ナビの偶数番目、リンクの強調は **青** (`--df-blue`)
- カード (Activities / Links) は **奇数=赤 / 偶数=青** で交互。
  `--hp-accent` を `.hp-cards > .hp-card:nth-child()` で切り替えていて、
  番号・サブタイトル・角の三角・矢印の丸が全部それに追従する。

### スクロール演出

- `.hp-reveal` を付けた要素が下からフェードイン (`src/scripts/home-ui.ts`)。
- `html.hp-js` が付いているときだけ隠す作りにしてあるので、**JS が無効でも中身は消えない**。
- 見た目を確認するときにフェードが邪魔なら、DevTools で
  `document.documentElement.classList.remove('hp-js')` を実行すると全部表示される。

## 触っていないもの

- `/en` `/cv` `/personality` `/researcher` `/contact` などのサブページは旧デザインのまま。
  ヘッダーの見た目がトップと揃っていない。
- `src/components/DataFlowPage.astro` と `src/components/data-flow/` は残してある。
  トップページからは参照していないが、`/personality` が `data-flow.css` を使っている。
