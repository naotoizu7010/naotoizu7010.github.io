/* ----------------------------------------------------------------
   src/scripts/menu.ts
   モバイルのバーガーメニュー開閉。
   ---------------------------------------------------------------- */

function open() {
  const menu = document.querySelector<HTMLElement>('.df-menu');
  if (!menu) return;
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  document.querySelectorAll<HTMLElement>('.df-burger').forEach((button) => {
    button.setAttribute('aria-expanded', 'true');
  });
  document.body.style.overflow = 'hidden';
}

function close() {
  const menu = document.querySelector<HTMLElement>('.df-menu');
  if (!menu) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  document.querySelectorAll<HTMLElement>('.df-burger').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
  document.body.style.overflow = '';
}

export function mountMenu() {
  document.querySelectorAll<HTMLElement>('.df-burger').forEach((b) => {
    if (b.dataset.menuReady === '1') return;
    b.dataset.menuReady = '1';
    b.addEventListener('click', open);
  });
  document.querySelectorAll<HTMLElement>('.df-menu-close').forEach((b) => {
    if (b.dataset.menuReady === '1') return;
    b.dataset.menuReady = '1';
    b.addEventListener('click', close);
  });
  // Close on link click
  document.querySelectorAll<HTMLElement>('.df-menu a').forEach((a) => {
    if (a.dataset.menuReady === '1') return;
    a.dataset.menuReady = '1';
    a.addEventListener('click', close);
  });
  // Close on Escape
  if (document.body.dataset.dfMenuKeyboardReady !== '1') {
    document.body.dataset.dfMenuKeyboardReady = '1';
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountMenu);
} else {
  mountMenu();
}
