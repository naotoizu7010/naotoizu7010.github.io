/* ----------------------------------------------------------------
   src/data/content.ts — 本人情報 + コピー
   既存 docs/README.md と docs/favorites.md からの情報をベースに、
   トップページ用に整形しています。
   ---------------------------------------------------------------- */

export type FactItem = { k: string; v: string };

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
  body: string;
  meta: { since?: string; cases?: string; role?: string };
  href?: string;
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

export const content = {
  name_ja: '大泉直人',
  name_en: 'Naoto Oizumi',
  name_kana: 'おおいずみ なおと',
  role: 'Researcher · Sports × Society × Data',
  base: 'つくば / 茨城',

  /* TOPページ Hero */
  hero: {
    eyebrow: 'PORTFOLIO / 2026',
    title_a: '人の流れを、',
    title_b: '読む。',
    en_caption: 'READ THE FLOW · BUILD WITH SPORTS · WALK THE CITY',
    sub: 'スタジアムの人流とAIの社会実装をテーマに、つくばで研究しています。スポーツが好きで、ラーメンが好きで、街を歩くのが好きな研究者です。',
    /* 数字は仮置きではなく、書かないことを推奨。
       入れる場合は本人にカウントしてもらう */
    stats: null as null | { k: string; v: string; tone?: 'red' | 'blue' | 'fg' }[],
  },

  /* ナビゲーション */
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Activities', href: '#activities' },
    { label: 'Off the field', href: '#personality' },
    { label: 'Links', href: '#links' },
  ] satisfies NavItem[],

  /* About */
  about: {
    heading: 'About',
    heading_ja: ['つくばで', '研究する大学生です。'],
    lead: 'こんにちは、大泉直人です。',
    body: '茨城県日立市出身、つくばで研究する大学生です。筑波大学 社会工学類で経営工学を勉強しながら、大西研究室（連携大学院制度で産業技術総合研究所所属）で、スタジアムの人流解析をテーマに研究しています。',
    body2: '2026年からは、産総研の人工知能研究センターでテクニカルスタッフとしても働き始めました。鹿島アントラーズとの包括協定に関わるAIの社会実装プロジェクトに、研究補助として関わっています。',
    factoids: [
      { k: '氏名', v: '大泉直人 (Naoto Oizumi)' },
      { k: '居住', v: '茨城県 つくば市' },
      { k: '出身', v: '茨城県 日立市' },
      { k: '所属', v: '筑波大学 社会工学類 学部4年' },
      { k: '研究室', v: '大西研究室 (産総研 連携大学院)' },
      { k: '専門', v: '人流解析 / スポーツ × データ' },
    ] satisfies FactItem[],
  },

  /* Research */
  research: {
    heading: 'Research',
    lead: 'スタジアムの「人の動き」を研究しています。',
    intro:
      'スタジアム、街、データ、AI。離れて見えるものが、実はぜんぶつながっています。難しく聞こえる話を、できるだけやさしい言葉でまとめてみました。',
    items: [
      {
        no: '01',
        en: 'Crowd Flow Analytics',
        ja: '人の流れを測る',
        body: '何万人ものお客さんがスタジアムに来て、帰っていく — その動きをセンサーやカメラ、データで観察して、安全と快適のバランスを設計します。',
        chart: 'crowd',
        tag: 'CROWD',
      },
      {
        no: '02',
        en: 'Sports × Data',
        ja: 'スポーツの裏側を覗く',
        body: '試合のプレー、観客の動き、街への波及。スポーツが起こす「動き」を、データを通して一気通貫に捉えます。鹿島アントラーズとの連携プロジェクトにも関わっています。',
        chart: 'sports',
        tag: 'SPORTS',
      },
      {
        no: '03',
        en: 'Real-world Deployment',
        ja: '研究を、街に降ろす',
        body: '研究室の中だけで終わらせず、現場で動かして、改善する。産総研の社会知能研究チームで、AIの社会実装に研究補助として関わっています。',
        chart: 'city',
        tag: 'IMPLEMENTATION',
      },
    ] satisfies ResearchItem[],
  },

  /* Activities */
  activities: {
    heading: 'Activities',
    lead: '研究室の外でやっていること。',
    items: [
      {
        tag: 'COMMUNITY',
        title: 'OneThing (筑波大学エンジニアコミュニティ) 前代表',
        body: 'LT会の主催、コミュニティ運営。エンジニア同士が話すきっかけ作りをやってきました。',
        meta: { since: '2023-', role: '前代表' },
        href: 'https://onethingtsukuba.github.io/',
      },
      {
        tag: 'STARTUP',
        title: 'STARTiX (筑波大学起業サークル)',
        body: '学生発の起業・新規事業を応援する筑波大学のサークル。所属しています。',
        meta: { role: 'メンバー' },
        href: 'https://startix-tsukuba.net/',
      },
      {
        tag: 'CAMPUS',
        title: '筑波大学 宿舎祭実行委員',
        body: '筑波大の宿舎祭を運営する学生団体の実行委員。',
        meta: { role: '実行委員' },
        href: 'https://yadokarisai.com/',
      },
      {
        tag: 'TENNIS',
        title: '硬式テニス愛好会',
        body: '高校・大学と続けてきた硬式テニス。週末はだいたいラケット握ってます。',
        meta: { since: '高校〜', role: 'メンバー' },
      },
    ] satisfies ActivityItem[],
  },

  /* Personality (Off the field) */
  personality: {
    heading: 'Off the field',
    lead: '研究の外側にいる、もう一人の自分。',
    body: '研究テーマと、テーマの外側にいる自分の関心は、たいていどこかで繋がっています。',
    bites: [
      { emoji: '⚽', text: 'Jリーグ。水戸ホーリーホックと鹿島アントラーズを応援。' },
      { emoji: '🥊', text: 'ボクシング。日本人の世界戦は追ってます。' },
      { emoji: '🎾', text: '硬式テニス。高校・大学と続けて、いまも週末は握ってます。' },
      { emoji: '🍜', text: 'ラーメン巡り。Instagram に記録を残してます。' },
      { emoji: '🏍️', text: 'バイク。motoGP も観るし、大型二輪MT 持ちです。' },
      { emoji: '🚴', text: 'サイクリング。霞ヶ浦一周しました。' },
      { emoji: '🎯', text: 'ダーツ。マイダーツ買いました。Bフラから A 目指し中。' },
      { emoji: '📈', text: '金融投資。メインはインデックス、ちょっとだけBTC。' },
      { emoji: '📖', text: 'Wikipedia サーフィン。人の人生と歴史を読むのが好き。' },
    ] satisfies PersonalityBite[],
  },

  /* Links */
  links: {
    heading: 'Links',
    lead: 'もっと知りたい人へ。',
    items: [
      {
        kind: 'researcher',
        title: '研究者向け / Researcher Page',
        body: '業績・所属・論文など、フォーマルな情報はこちら。準備中です。',
        href: '/researcher',
        cta: 'open /researcher',
        accent: 'red',
      },
      {
        kind: 'cv',
        title: 'CV (学歴・職歴)',
        body: '学歴と職歴をまとめたシンプルなページ。',
        href: '/cv',
        cta: 'open /cv',
        accent: 'blue',
      },
      {
        kind: 'note',
        title: 'note (記事)',
        body: 'LT会開催報告など、書いたものを置いています。',
        href: 'https://note.com/naotoizu_7010/',
        cta: 'open note',
      },
    ] satisfies LinkItem[],
  },

  /* Footer */
  footer: {
    big_top: 'スポーツと、街と、',
    big_red: 'データを、',
    big_blue: '橋渡し。',
    cta_label: 'お話しませんか',
    cta_href: 'https://x.com/naotoizu_7010',
    sns: [
      { label: 'X / Twitter', href: 'https://x.com/naotoizu_7010' },
      { label: 'GitHub', href: 'https://github.com/naotoizu7010' },
      { label: 'Instagram', href: 'https://www.instagram.com/naotoizu_7010/' },
      { label: 'Facebook', href: 'https://www.facebook.com/naotoizu7010/' },
      { label: 'note', href: 'https://note.com/naotoizu_7010/' },
    ] satisfies SnsItem[],
    legal: '© 2026 Naoto Oizumi · 7010',
  },
};

/* CV 用データ — /cv ページで使う */
export const cv = {
  basic: [
    { k: '氏名', v: '大泉直人 (Naoto Oizumi)' },
    { k: '居住地', v: '茨城県 つくば市' },
    { k: '出身', v: '茨城県 日立市' },
    { k: '所属', v: '筑波大学 理工学群 社会工学類 学部4年' },
  ] satisfies FactItem[],
  education: [
    {
      period: '2020.04 - 2023.03',
      title: '茨城県立 水戸第一高等学校',
      role: '普通科',
      note: '令和5年卒',
      href: 'https://www.mito1-h.ibk.ed.jp/',
    },
    {
      period: '2023.04 -',
      title: '筑波大学 理工学群 社会工学類',
      role: '経営工学主専攻',
      note: '大西研究室 — 大規模スタジアムにおける人流解析',
      noteParts: [
        { text: '大西研究室', href: 'http://onishi-lab.jp/' },
        { text: ' — 大規模スタジアムにおける人流解析' },
      ],
      href: 'https://www.sk.tsukuba.ac.jp/College/index.php',
    },
  ],
  work: [
    {
      period: '2026.02 -',
      title:
        '産業技術総合研究所 人工知能研究センター 社会知能研究チーム',
      titleParts: [
        {
          text: '産業技術総合研究所',
          href: 'https://www.aist.go.jp/aist_j/information/about_aist.html',
        },
        {
          text: '人工知能研究センター 社会知能研究チーム',
          href: 'https://www.airc.aist.go.jp/cosine/',
        },
      ],
      role: 'テクニカルスタッフ',
      note: '鹿島アントラーズとの包括協定に関連するプロジェクトを中心とした、人工知能の社会実装に資する研究補助業務',
      noteParts: [
        {
          text: '鹿島アントラーズとの包括協定',
          href: 'https://www.aist.go.jp/aist_j/news/pr20170729.html',
        },
        { text: 'に関連するプロジェクトを中心とした、人工知能の社会実装に資する研究補助業務' },
      ],
    },
  ],
  affiliations: [
    {
      name: '大西研究室 (産業技術総合研究所 人工知能研究センター 社会知能研究チーム)',
      href: 'http://onishi-lab.jp/',
      note: '連携大学院制度を使っています',
    },
    {
      name: 'OneThing (筑波大学エンジニアコミュニティ) 前代表',
      href: 'https://onethingtsukuba.github.io/',
      note: 'LT会の主催・コミュニティ運営',
    },
    {
      name: 'STARTiX (筑波大学起業サークル)',
      href: 'https://startix-tsukuba.net/',
      note: 'メンバー',
    },
    {
      name: '硬式テニス愛好会',
      href: null,
      note: 'テニスサークル',
    },
    {
      name: '筑波大学 宿舎祭実行委員',
      href: 'https://yadokarisai.com/',
      note: '実行委員',
    },
  ],
};
