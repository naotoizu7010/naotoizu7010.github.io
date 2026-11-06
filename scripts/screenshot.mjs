// 変更確認用に、ライトモードとダークモードのスクリーンショットを撮る。
// 使い方: node scripts/screenshot.mjs <パス> [CSSセレクタ] [出力先ディレクトリ]
//   例: node scripts/screenshot.mjs /research/ '.pub-award' screenshots
// 事前に `npm run build` と `npm run preview`（http://localhost:4321）を起動しておく。
// セレクタを渡すと、その要素を含む li（なければ要素自体）だけを撮る。
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// playwright はリポジトリの依存に入れず、環境に入っているものを使う（require なら全体インストールも解決できる）
const { chromium } = createRequire(import.meta.url)('playwright');

const [path = '/', selector, outDir = 'screenshots'] = process.argv.slice(2);
const base = process.env.BASE_URL ?? 'http://localhost:4321';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: scheme,
  });
  // 保存済みのテーマより、ここで指定したモードを優先させる
  await page.addInitScript((s) => localStorage.setItem('df-theme', s), scheme);
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const name = (path.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'top') + `-${scheme}.png`;
  const file = join(outDir, name);
  if (selector) {
    const el = page.locator(selector).first();
    const target = (await el.locator('xpath=ancestor::li[1]').count()) ? el.locator('xpath=ancestor::li[1]') : el;
    await target.scrollIntoViewIfNeeded();
    await target.screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: true });
  }
  console.log(file);
  await page.close();
}
await browser.close();
