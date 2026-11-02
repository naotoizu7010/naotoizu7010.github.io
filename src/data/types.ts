export type TextPart = { text: string; href?: string; tone?: 'muted' | 'gap' };
export type FactItem = { k: string; v: string; vParts?: TextPart[] };

export type ResearchItem = {
  no: string;
  en: string;
  ja: string;
  body: string;
  chart: 'crowd' | 'sports' | 'city';
  tag: string;
};

export type ActivityItem = {
  tag: string;
  title: string;
  titleSub?: string;
  body: string;
  meta: { since?: string; cases?: string; role?: string };
  href?: string;
  cta?: string;
};

export type PersonalityBite = {
  emoji: string;
  text: string;
};

export type LinkItem = {
  kind: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  accent?: 'red' | 'blue' | 'fg';
};

export type SnsItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

/* 業績1件分。type ごとに見出しを分けて表示する。refereed / format は表示しない記録用 */
export type Publication = {
  date: string; // 'YYYY-MM'。新しい順に並べるのに使う
  type: 'intl-journal' | 'domestic-journal' | 'intl-conf' | 'domestic-conf' | 'preprint' | 'talk';
  refereed?: boolean;
  format?: 'oral' | 'poster' | 'demo' | 'full' | 'short';
  authors: string[];
  title: string;
  subtitle?: string; // 「―…―」の副題。タイトルの次の行に出す
  venue: string;
  place?: string;
  period: string; // 表示用の会期
  award?: { name: string; href?: string };
  links?: { label: string; href: string }[];
};
