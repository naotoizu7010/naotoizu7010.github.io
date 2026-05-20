/* ----------------------------------------------------------------
   src/scripts/theme.ts
   ライト/ダーク切替 + localStorage 永続化 + システム設定追従。
   - 初期表示は (1) localStorage (2) prefers-color-scheme の順で決定
   - クリックで反転 + 保存
   - 全 .df-theme-toggle ボタン (ナビ・モバイルメニュー両方) を同期
   ---------------------------------------------------------------- */

const KEY = 'df-theme';

function getInitial(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark') return 'dark';
    if (saved === 'light') return 'light';
  } catch (_) {
    /* localStorage が使えない環境 */
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  document.querySelectorAll<HTMLElement>('.df-root').forEach((root) => {
    root.setAttribute('data-theme', theme);
  });
  // update all toggle labels
  document.querySelectorAll<HTMLElement>('.df-theme-toggle').forEach((btn) => {
    btn.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
      option.dataset.active = option.dataset.themeOption === theme ? 'true' : 'false';
    });
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え',
    );
    btn.setAttribute('title', theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
  });
}

function toggle() {
  const root = document.querySelector<HTMLElement>('.df-root');
  const current = root?.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem(KEY, next);
  } catch (_) {
    /* noop */
  }
}

export function mountTheme() {
  applyTheme(getInitial());
  document.querySelectorAll<HTMLElement>('.df-theme-toggle').forEach((btn) => {
    if (btn.dataset.themeReady === '1') return;
    btn.dataset.themeReady = '1';
    btn.addEventListener('click', toggle);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountTheme);
} else {
  mountTheme();
}
