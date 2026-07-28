/* ----------------------------------------------------------------
   src/scripts/home-ui.ts
   トップページの軽い動き。
   - スクロールで各ブロックをフェードアップ (.hp-reveal → .is-in)
   - ヘッダーに影をつける (.hp-header → .is-stuck)
   prefers-reduced-motion: reduce のときはフェードを行わず即表示。
   ---------------------------------------------------------------- */

function mountReveal() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.hp-reveal'));
  if (targets.length === 0) return;

  const reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || typeof IntersectionObserver === 'undefined') {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.transitionDelay = `${Math.min(i, 4) * 80}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );

  targets.forEach((el) => io.observe(el));
}

function mountHeader() {
  const header = document.querySelector<HTMLElement>('.hp-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function mountHomeUI() {
  mountReveal();
  mountHeader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountHomeUI, { once: true });
} else {
  mountHomeUI();
}
