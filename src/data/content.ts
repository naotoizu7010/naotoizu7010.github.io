import type {
  ActivityItem,
  FactItem,
  LinkItem,
  NavItem,
  PersonalityBite,
  ResearchItem,
  SnsItem,
} from './types';

export type {
  ActivityItem,
  FactItem,
  LinkItem,
  NavItem,
  PersonalityBite,
  ResearchItem,
  SnsItem,
  TextPart,
} from './types';

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
    en_caption: 'SPORTS × CROWD × DATA',
    sub: 'スタジアムでの人流解析とAIの社会実装をテーマに、つくばで研究をしています。\nスポーツが大好きな大学生です。',
    stats: null as null | { k: string; v: string; tone?: 'red' | 'blue' | 'fg' }[],
  },

  /* ナビゲーション */
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Activities', href: '#activities' },
    { label: 'Personality', href: '#personality' },
    { label: 'Links', href: '#links' },
  ] satisfies NavItem[],

  /* About */
  about: {
    heading: 'About',
    heading_ja: ['つくばで', '研究する大学生です。'],
    lead: 'こんにちは、大泉直人です。',
    body: '筑波大学 社会工学類で経営工学を勉強しながら、\n産業技術総合研究所でスタジアムの人流解析をテーマに研究をしています。',
    factoids: [
      { k: '氏名', v: '大泉直人' },
      { k: '居住地', v: '茨城県 つくば市' },
      { k: '出身地', v: '茨城県 日立市' },
      {
        k: '所属',
        v: '筑波大学 社会工学類 学部4年',
        vParts: [
          { text: '筑波大学 ' },
          { text: '社会工学類', href: 'https://www.sk.tsukuba.ac.jp/College/index.php' },
          { text: ' 学部4年' },
        ],
      },
      {
        k: '研究室',
        v: '大西研究室 (産業技術総合研究所 連携大学院)',
        vParts: [
          { text: '大西研究室', href: 'http://onishi-lab.jp/' },
          { text: ' ', tone: 'gap' },
          {
            text: '産業技術総合研究所',
            href: 'https://www.aist.go.jp/aist_j/information/about_aist.html',
            tone: 'muted',
          },
          { text: ' 連携大学院', tone: 'muted' },
        ],
      },
      { k: '専門', v: '人流解析' },
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
    heading: '活動',
    lead: '研究室の外でやっていること。',
    items: [
      {
        tag: 'ENGINEER COMMUNITY',
        title: 'OneThing',
        titleSub: '筑波大学エンジニアコミュニティ',
        body: '勉強会やLT会の主催、筑波大生エンジニアの情報交換を行うコミュニティ。',
        meta: { since: '2023-', role: '前代表' },
        href: 'https://onethingtsukuba.github.io/',
        cta: 'HP',
      },
      {
        tag: 'STARTUP COMMUNITY',
        title: 'STARTiX',
        titleSub: '筑波大学起業サークル',
        body: '起業やビジネスに興味がある筑波大生向けにイベントを開催したり、\n情報交換をするコミュニティです。',
        meta: { since: '2024-', role: 'メンバー' },
        href: 'https://startix-tsukuba.net/',
        cta: 'HP',
      }
    ] satisfies ActivityItem[],
  },

  personality: {
    heading: '人柄',
    lead: '趣味がたくさん。',
    body: '',
    bites: [
      { emoji: '⚽', text: 'サッカー' },
      { emoji: '🥊', text: 'ボクシング観戦' },
      { emoji: '🎾', text: '硬式テニス' },
      { emoji: '🍜', text: 'ラーメン巡り' },
      { emoji: '🏍️', text: 'バイク' },
      { emoji: '🚴', text: 'サイクリング' },
      { emoji: '🎯', text: 'ダーツ' },
      { emoji: '📈', text: '金融投資' },
      { emoji: '📖', text: 'Wikipedia サーフィン' },
    ] satisfies PersonalityBite[],
  },

  /* Links */
  links: {
    heading: 'Links',
    lead: 'もっとくわしく。',
    items: [
      {
        kind: 'personality',
        title: 'Personality',
        body: '好きなもの、休日の過ごし方、\n研究の外側にある関心はこちら。',
        href: '/personality',
        cta: 'open',
        accent: 'red',
      },
      {
        kind: 'researcher',
        title: '研究情報',
        body: '業績・所属・論文などの情報まとめ。\n（準備中）',
        href: '/researcher',
        cta: 'open',
        accent: 'blue',
      },
      {
        kind: 'cv',
        title: 'CV（履歴書）',
        body: '履歴書ページ。',
        href: '/cv',
        cta: 'open'
      },
      {
        kind: 'note',
        title: 'Blog (note)',
        body: '趣味とか思考とか色々書いてます。',
        href: 'https://note.com/naotoizu_7010/',
        cta: 'open',
      },
    ] satisfies LinkItem[],
  },

  /* Footer */
  footer: {
    big_top: '人の流れを、',
    big_red: 'データで、',
    big_blue: '見てみよう。',
    cta_label: 'お問い合わせ（準備中）',
    cta_href: '/contact',
    sns: [
      { label: 'Twitter / X', href: 'https://x.com/naotoizu_7010' },
      { label: 'Instagram', href: 'https://www.instagram.com/naotoizu_7010/' },
      { label: 'Facebook', href: 'https://www.facebook.com/naotoizu7010/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%E7%9B%B4%E4%BA%BA-%E5%A4%A7%E6%B3%89-5804892a0/' },
      { label: 'note', href: 'https://note.com/naotoizu_7010/' },
      { label: 'GitHub', href: 'https://github.com/naotoizu7010' },
    ] satisfies SnsItem[],
    legal: '© 2026 Naoto Oizumi · naotoizu_7010',
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
