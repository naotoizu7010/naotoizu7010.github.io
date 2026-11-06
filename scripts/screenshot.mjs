// 変更確認用に、PC・スマホそれぞれでライトモードとダークモードのスクリーンショットを撮る（計4枚）。
// 使い方: node scripts/screenshot.mjs <パス> [CSSセレクタ] [出力先ディレクトリ]
//   例: node scripts/screenshot.mjs /research/ '.pub-award' screenshots
// 事前に `npm run build` と `npm run preview`（http://localhost:4321）を起動しておく。
// セレクタを渡すと、その要素を含む li（なければ要素自体）だけを撮る。
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// playwright はリポジトリの依存に入れず、環境に入っているものを使う
// （ローカルになければ `npm install -g playwright` で入れたグローバルのものを探す）
const loadPlaywright = () => {
  try {
    return createRequire(import.meta.url)('playwright');
  } catch {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    return createRequire(join(globalRoot, 'noop.js'))('playwright');
  }
};
const { chromium } = loadPlaywright();

const [path = '/', selector, outDir = 'screenshots'] = process.argv.slice(2);
const base = process.env.BASE_URL ?? 'http://localhost:4321';
mkdirSync(outDir, { recursive: true });

// PC とスマホの表示幅
const devices = {
  pc: { viewport: { width: 1280, height: 900 } },
  sp: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
};

const browser = await chromium.launch();
for (const [device, deviceOpts] of Object.entries(devices))
for (const scheme of ['light', 'dark']) {
  const page = await browser.newPage({
    ...deviceOpts,
    deviceScaleFactor: 2,
    colorScheme: scheme,
  });
  // 保存済みのテーマより、ここで指定したモードを優先させる
  await page.addInitScript((s) => localStorage.setItem('df-theme', s), scheme);
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const name = (path.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'top') + `-${device}-${scheme}.png`;
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
