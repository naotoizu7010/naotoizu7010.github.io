/* ----------------------------------------------------------------
   src/scripts/data-flow-bg.ts
   トップページ全体に流れる「ドット + フローライン」アニメーション。
   React を使わない vanilla TS 実装。
   - .df-root を見つけて、その中に .df-page-papers / svg / .df-page-bg-dots を生成
   - ResearchとPersonality セクションの位置に paper の白い帯を当てる
   - rAF で点群を浮遊させる + スクロール連動
   - prefers-reduced-motion: reduce のときは静止
   ---------------------------------------------------------------- */

type Flow = {
  y: number;
  amp: number;
  phase: number;
  sw: number;
  baseOp: number;
  sweepOp: number;
  color: 'r' | 'b';
  dur: number;
  delay: number;
};

type Dot = {
  x01: number;
  y01: number;
  r: number;
  vx: number;
  vy: number;
  parallax: number;
  amp: number;
  freq: number;
  phase: number;
};

const SVGNS = 'http://www.w3.org/2000/svg';

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function curveD(y: number, amp: number, phase: number) {
  const y1 = y - amp * 0.55 - phase * 0.4;
  const y2 = y + amp * 0.65 + phase * 0.3;
  const y3 = y + amp * 0.25 - phase * 0.2;
  const y4 = y - amp * 0.85 + phase * 0.25;
  return `M -50 ${y} C 240 ${y1} 540 ${y2} 820 ${y3} S 1500 ${y4} 1500 ${y4}`;
}

function buildFlows(): Flow[] {
  const rnd = lcg(131);
  const arr: Flow[] = [];
  // Hero zone — 5 dense flows
  for (let i = 0; i < 5; i++) {
    arr.push({
      y: 200 + i * 110 + rnd() * 40,
      amp: 90 + rnd() * 90,
      phase: rnd() * 80,
      sw: 1.4 + rnd() * 1.4,
      baseOp: 0.18 + rnd() * 0.12,
      sweepOp: 0.55 + rnd() * 0.35,
      color: rnd() > 0.45 ? 'r' : 'b',
      dur: 6 + rnd() * 12,
      delay: -rnd() * 14,
    });
  }
  // Mid-page band
  for (let i = 0; i < 6; i++) {
    arr.push({
      y: 2700 + i * 130 + rnd() * 80,
      amp: 70 + rnd() * 120,
      phase: rnd() * 100,
      sw: 1.0 + rnd() * 1.2,
      baseOp: 0.14 + rnd() * 0.1,
      sweepOp: 0.4 + rnd() * 0.4,
      color: rnd() > 0.5 ? 'r' : 'b',
      dur: 7 + rnd() * 14,
      delay: -rnd() * 16,
    });
  }
  // Lower-page band
  for (let i = 0; i < 6; i++) {
    arr.push({
      y: 4400 + i * 130 + rnd() * 80,
      amp: 60 + rnd() * 130,
      phase: rnd() * 100,
      sw: 1.0 + rnd() * 1.6,
      baseOp: 0.14 + rnd() * 0.12,
      sweepOp: 0.45 + rnd() * 0.35,
      color: rnd() > 0.5 ? 'r' : 'b',
      dur: 8 + rnd() * 14,
      delay: -rnd() * 16,
    });
  }
  return arr;
}

function buildSvg(flows: Flow[]): SVGSVGElement {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('class', 'df-page-bg-flows');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('viewBox', '0 0 1440 5400');
  svg.setAttribute('aria-hidden', 'true');

  const defs = document.createElementNS(SVGNS, 'defs');

  flows.forEach((f, i) => {
    // sweeping gradient
    const sw = document.createElementNS(SVGNS, 'linearGradient');
    sw.setAttribute('id', `df-sw-${i}`);
    sw.setAttribute('x1', '-1');
    sw.setAttribute('y1', '0');
    sw.setAttribute('x2', '0');
    sw.setAttribute('y2', '0');
    const color = f.color === 'r' ? 'var(--df-red)' : 'var(--df-blue)';
    const stops: [string, string][] = [
      ['0', '0'],
      ['0.45', String(f.sweepOp)],
      ['0.55', String(f.sweepOp)],
      ['1', '0'],
    ];
    stops.forEach(([off, op]) => {
      const stop = document.createElementNS(SVGNS, 'stop');
      stop.setAttribute('offset', off);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', op);
      sw.appendChild(stop);
    });
    const animX1 = document.createElementNS(SVGNS, 'animate');
    animX1.setAttribute('attributeName', 'x1');
    animX1.setAttribute('values', '-1;2');
    animX1.setAttribute('dur', `${f.dur}s`);
    animX1.setAttribute('begin', `${f.delay}s`);
    animX1.setAttribute('repeatCount', 'indefinite');
    sw.appendChild(animX1);
    const animX2 = document.createElementNS(SVGNS, 'animate');
    animX2.setAttribute('attributeName', 'x2');
    animX2.setAttribute('values', '0;3');
    animX2.setAttribute('dur', `${f.dur}s`);
    animX2.setAttribute('begin', `${f.delay}s`);
    animX2.setAttribute('repeatCount', 'indefinite');
    sw.appendChild(animX2);
    defs.appendChild(sw);

    // base (static faint)
    const bs = document.createElementNS(SVGNS, 'linearGradient');
    bs.setAttribute('id', `df-bs-${i}`);
    bs.setAttribute('x1', '0');
    bs.setAttribute('y1', '0');
    bs.setAttribute('x2', '1');
    bs.setAttribute('y2', '0');
    [
      ['0', '0'],
      ['0.5', String(f.baseOp)],
      ['1', '0'],
    ].forEach(([off, op]) => {
      const stop = document.createElementNS(SVGNS, 'stop');
      stop.setAttribute('offset', off);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', op);
      bs.appendChild(stop);
    });
    defs.appendChild(bs);
  });

  svg.appendChild(defs);

  // paths
  flows.forEach((f, i) => {
    const d = curveD(f.y, f.amp, f.phase);
    const base = document.createElementNS(SVGNS, 'path');
    base.setAttribute('d', d);
    base.setAttribute('fill', 'none');
    base.setAttribute('stroke', `url(#df-bs-${i})`);
    base.setAttribute('stroke-width', String(f.sw));
    svg.appendChild(base);

    const sw = document.createElementNS(SVGNS, 'path');
    sw.setAttribute('d', d);
    sw.setAttribute('fill', 'none');
    sw.setAttribute('stroke', `url(#df-sw-${i})`);
    sw.setAttribute('stroke-width', String(f.sw + 0.3));
    svg.appendChild(sw);
  });

  return svg;
}

function init(root: HTMLElement) {
  // Avoid double-init
  if (root.dataset.bgInited === '1') return;
  root.dataset.bgInited = '1';

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Paper layer (for Research / Personality sections)
  const papersHost = document.createElement('div');
  papersHost.className = 'df-page-papers';
  papersHost.setAttribute('aria-hidden', 'true');
  root.prepend(papersHost);

  // 2) Flow SVG
  const flows = buildFlows();
  const svg = buildSvg(flows);
  papersHost.after(svg);

  // 3) Dots host
  const dotsHost = document.createElement('div');
  dotsHost.className = 'df-page-bg-dots';
  dotsHost.setAttribute('aria-hidden', 'true');
  svg.after(dotsHost);

  // dot data
  const COUNT = 340;
  const rnd = lcg(9);
  const dots: Dot[] = [];
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < COUNT; i++) {
    const r = 0.6 + rnd() * 2.4;
    const c = rnd();
    dots.push({
      x01: rnd(),
      y01: rnd(),
      r,
      vx: (rnd() - 0.5) * 0.012,
      vy: -0.006 - rnd() * 0.014,
      parallax: 0.1 + rnd() * 0.8,
      amp: 3 + rnd() * 10,
      freq: 0.0003 + rnd() * 0.0009,
      phase: rnd() * Math.PI * 2,
    });
    const el = document.createElement('div');
    el.className = 'df-page-dot';
    el.style.width = `${r * 2}px`;
    el.style.height = `${r * 2}px`;
    el.style.background = c < 0.25 ? 'var(--df-red)' : c < 0.5 ? 'var(--df-blue)' : 'var(--df-fg-mute)';
    el.style.opacity = String(0.35 + c * 0.45);
    dotsHost.appendChild(el);
    els.push(el);
  }

  let w = root.offsetWidth || 1440;
  let h = root.offsetHeight || 5400;

  const updateSize = () => {
    w = root.offsetWidth || w;
    h = root.offsetHeight || h;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    // recompute paper rects
    while (papersHost.firstChild) papersHost.removeChild(papersHost.firstChild);
    const rootRect = root.getBoundingClientRect();
    const sections = root.querySelectorAll<HTMLElement>(
      '.df-section--research, .df-section--personality',
    );
    const scale = rootRect.width ? rootRect.width / (root.offsetWidth || 1) : 1;
    sections.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      const top = (r.top - rootRect.top) / scale;
      const height = r.height / scale;
      const div = document.createElement('div');
      div.className = 'df-page-paper';
      div.style.top = `${top}px`;
      div.style.height = `${height}px`;
      papersHost.appendChild(div);
    });
  };
  updateSize();

  const ro = new ResizeObserver(updateSize);
  ro.observe(root);
  setTimeout(updateSize, 200);
  window.addEventListener('load', updateSize);

  if (reducedMotion) {
    // place each dot at its initial position once, then stop
    dots.forEach((d, i) => {
      const x = d.x01 * w + Math.sin(d.phase) * d.amp;
      const y = d.y01 * h;
      els[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    return;
  }

  let scrollOff = 0;
  const onScroll = () => {
    scrollOff = window.scrollY || 0;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    const t = now - t0;
    for (let i = 0; i < COUNT; i++) {
      const d = dots[i];
      let x = d.x01 * w + d.vx * t + Math.sin(d.phase + t * d.freq) * d.amp;
      let y = d.y01 * h + d.vy * t - scrollOff * d.parallax * 0.35;
      x = ((x % (w + 40)) + (w + 40)) % (w + 40) - 20;
      y = ((y % (h + 40)) + (h + 40)) % (h + 40) - 20;
      els[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

export function mountDataFlowBg() {
  const root = document.querySelector<HTMLElement>('.df-root');
  if (root) init(root);
}

// auto-init when imported as a script tag
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountDataFlowBg);
} else {
  mountDataFlowBg();
}
