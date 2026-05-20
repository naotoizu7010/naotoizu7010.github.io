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
