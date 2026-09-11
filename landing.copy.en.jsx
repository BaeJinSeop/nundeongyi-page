// landing.copy.en.jsx — 영어 랜딩 카피 (en.html 전용)
//
// landing.jsx의 KO_COPY와 같은 스키마. landing.jsx보다 먼저 로드되어야 한다.
// 카피 키가 바뀌면 이 파일도 반드시 함께 수정할 것.
//
// 폰 목업 6키는 en 실캡처(assets/images/v2/en/ — store_screenshots/en/raw 1.8.0
// 파이프라인 산출물을 1179×2556 webp로 변환)를 쓴다. 재생성은 앱 레포
// scripts/generate_store_screenshots_en.py 재촬영 후 page 레포에서 Pillow 변환.
// 자연어 한 줄 입력(파서)은 ko 전용이라 ja와 마찬가지로 소구에서 제외했다.
// 정책 문서는 영어판(privacy-en/terms-en/delete-account-en.html)으로 연결하고,
// 한국어 원문 링크를 함께 노출한다.

window.LANDING_COPY = {
  brandName: 'Snowball',
  versionPill: 'Expense tracking meets saving habits',
  install: {
    title: 'Start your first record with Snowball',
    note: 'Free core features · Contains ads',
    hint: 'Choose the store for your phone.',
    screenshotNote: 'Actual app screens · Amounts and records are examples.',
    preview: 'See how it works first',
  },
  storeAria: {
    apple: 'Download Snowball on the App Store',
    google: 'Get Snowball on Google Play',
  },
  nav: {
    aria: 'Main menu',
    homeAria: 'Snowball home',
    links: [['App preview', '#journey'], ['Quick entry', '#quick'], ['Features', '#features'], ['FAQ', '#faq']],
    download: 'Get it free',
    langSwitch: [
      { label: '한국어', href: './', hrefLang: 'ko' },
      { label: '日本語', href: 'ja.html', hrefLang: 'ja' },
    ],
  },
  hero: {
    kicker: 'SPEND LESS. SEE MORE.',
    title: <>Track what you spend.<br /><em>Celebrate what you keep.</em></>,
    lead: 'The coffee you skipped deserves a record, too. See spending and small saves together, and connect them to a goal you care about.',
    notesAria: 'What you should know',
    notes: ['Free core features · Contains ads', 'Manual entry, no bank linking'],
    stageAria: 'The Snowball home screen',
    phone: { src: 'en/dashboard.webp', alt: 'The Snowball home dashboard' },
    quickLabel: 'Quick entry',
    quickChips: ['Tempted', 'Spent', 'Saved'],
    scroll: 'Take a look',
  },
  journey: {
    tabsAria: 'Preview Snowball features',
    tabs: ['Pause a purchase', 'Track spending', 'Save toward a goal', 'Share a ledger'],
    header: {
      eyebrow: 'YOUR MONEY, YOUR WAY',
      title: <>Start with the record<br />you need today.</>,
      description: 'Just track expenses, or park a purchase you are unsure about. Pick a feature to see it in the app.',
    },
    items: [
      {
        step: '01',
        label: 'THINK',
        title: <>Park the impulse.<br />Decide later.</>,
        description: 'Found something you want? Park it, and Snowball holds on to it for you. When the timer runs out, you answer one question: do you still want it?',
        tags: ['From 6 hours to 7 days', 'Preview the future value', 'Held out · Bought it'],
        image: 'en/consideration.webp',
        alt: 'Parking a purchase you are unsure about and deciding on it later',
        tone: 'blue',
      },
      {
        step: '02',
        label: 'RECORD',
        title: <>What you spent, what you kept.<br />One line each.</>,
        description: 'Log expenses and income in a few taps. Budgets and recurring bills come along for the ride, so this month reads clearly at a glance.',
        tags: ['Payment method included', 'Income · budgets · recurring', 'Calendar · spending insights'],
        image: 'en/expense-insight.webp',
        alt: 'A month of spending and budgets in one view',
        tone: 'mint',
      },
      {
        step: '03',
        label: 'GROW',
        title: <>Turn small saves into<br />a future you can see.</>,
        description: 'See what the money you kept today could grow into, then point it at a goal that actually matters to you. Every save mints a snowflake that is yours alone.',
        tags: ['Compound simulator', 'Goal planner', 'Snowflake collection'],
        image: 'en/snowflake-gallery.webp',
        alt: 'The snowflake collection that grows with every saving record',
        tone: 'lavender',
      },
      {
        step: '04',
        label: 'SHARE',
        title: <>A ledger you share,<br />trips settled for you.</>,
        description: 'One invite code opens a shared ledger, and only the entries you choose get posted. Record trip expenses in the local currency and see how to split the bill evenly.',
        tags: ['Share only what you pick', 'Trip rooms · local currency', 'Automatic even split'],
        image: 'en/ledger.webp',
        alt: 'A trip ledger settling an even split between members',
        tone: 'peach',
      },
    ],
  },
  how: {
    eyebrow: 'HOW IT WORKS',
    title: 'A little pause before you pay.',
    steps: [
      { number: '1', icon: 'shopping-bag.webp', title: 'Park it', text: 'Jot down the item you are torn about and its price.' },
      { number: '2', icon: 'future-plant.webp', title: 'Weigh it', text: 'See what that money could be worth years from now, before it is gone.' },
      { number: '3', icon: 'decision-check.webp', title: 'Make the call', text: 'Hold out or buy it. Either way it is a choice you actually thought about.' },
    ],
  },
  quick: {
    pill: 'Start small. Keep it simple.',
    eyebrow: 'QUICK INPUT',
    title: <>Catch it before<br />the thought is gone.</>,
    lead: 'One coffee you bought. One delivery order you skipped. Record either right from home. You do not have to use every feature at once.',
    optionsAria: 'Quick entry types',
    options: [
      { tone: 'is-blue', sym: '?', name: 'Tempted', desc: 'Park it and decide later' },
      { tone: 'is-coral', sym: '$', name: 'Spent', desc: 'Log what you spent' },
      { tone: 'is-mint', sym: '✓', name: 'Saved', desc: 'Log what you kept' },
    ],
    visualAria: 'Quick entry and saving record screens',
    back: { src: 'en/saving-add.webp', alt: 'Recording a saving in a few taps' },
    front: { src: 'en/dashboard.webp', alt: 'A dashboard that starts a parked purchase, an expense or a save' },
  },
  features: {
    header: {
      eyebrow: 'EVERYTHING IN ONE PLACE',
      title: <>From second thoughts<br />to goals you reach.</>,
      description: 'No bank connections and no jargon. Snowball focuses on making sense of the choices you recorded yourself.',
    },
    badge: 'AVAILABLE NOW',
    items: [
      { icon: 'snowflake.webp', title: 'Snowflake collection', description: 'Every save mints a snowflake that exists only once.', tone: 'ice', size: 'wide' },
      { icon: 'goal-mountain.webp', title: 'Goal planner', description: 'Turns a target amount and a date into a plan you can keep.', tone: 'sand' },
      { icon: 'streak-fire.webp', title: 'Saving streak', description: 'Strings small choices together until they hold on their own.', tone: 'peach' },
      { icon: 'hand-wave.webp', title: 'Echo community', description: 'Quiet encouragement, with no names and nothing to compare.', tone: 'lavender' },
      { icon: 'shopping-bag.webp', title: 'Spending insights', description: 'Budgets, calendar and repeat patterns at a glance.', tone: 'plain', size: 'wide' },
      { icon: 'future-plant.webp', title: 'Home screen widgets', description: 'Check your streak and savings without opening the app.', tone: 'mint' },
    ],
    disclaimer: 'Snowball is a spending-habit tool. It does not sell financial products and it never manages real money on your behalf.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: <>Before you<br />get started.</>,
    lead: 'Anything else on your mind? Email us any time.',
    contactLabel: 'Contact us ↗',
    items: [
      {
        q: 'What is Snowball?',
        a: 'A spending-habit app built for the moment before you buy. Park a purchase you are unsure about, decide again when the timer ends, and the money you held on to becomes a saving record with a future value attached. Expense tracking, goals, a compound simulator and an anonymous echo community come with it.',
      },
      {
        q: 'Is the app available in English?',
        a: 'Yes. The entire app is in English whenever your device language is English, and since v1.8.0 currency display covers US dollars alongside Korean won and Japanese yen (Profile → App settings → Currency). You can send feedback from inside the app at any time.',
      },
      {
        q: 'Where should I start?',
        a: 'Add one expense from today or a purchase you are unsure about. Try goals and shared ledgers when you need them. There is no need to import your entire history or connect a bank account.',
      },
      {
        q: 'Is this an app that stops me from buying things?',
        a: 'No. Snowball never blocks a purchase. It puts a little time between the urge and the payment and then asks again. If you decide to buy, that is recorded as a decision you thought through.',
      },
      {
        q: 'Is it free?',
        a: 'The core features are free and supported by ads. Snowball does not sell financial products and does not manage money for you.',
      },
      {
        q: 'Do I have to connect my bank account?',
        a: 'No. Snowball never links to a bank or card. It only uses the spending, saving and goal information you enter yourself.',
      },
      {
        q: 'If I join a shared ledger, can the others see everything I record?',
        a: 'No. Only the entries where you switch on "post to the shared ledger" are shared. Anything you log in your own expense tab stays private, and you can move an entry into the shared ledger, or take it back out, later.',
      },
      {
        q: 'Am I identifiable in the echo community?',
        a: 'It is an anonymous space with no names, profiles or follows, and you appear only as a snowflake. You choose whether to share every single time, and reporting and blocking are built in.',
      },
      {
        q: 'Which devices are supported?',
        a: 'iOS 15 and later, and Android 7.0 (API 24) and later.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'START YOUR SNOWBALL',
    title: <>One thing you spent.<br />One thing you saved.</>,
    lead: 'No grand plan needed. Just your first record.',
  },
  footer: {
    tagline: 'A spending-habit planner that weighs today against the future you are saving for.',
    version: 'APP VERSION 1.8.0',
    columns: [
      { title: 'Explore', links: [['How it works', '#journey'], ['Quick entry', '#quick'], ['Features', '#features']] },
      { title: 'Support', links: [['FAQ', '#faq'], ['Contact', 'mailto:poxy1535@gmail.com']] },
      {
        title: 'Policies',
        links: [
          ['Terms of Service', 'terms-en.html'],
          ['Privacy Policy', 'privacy-en.html'],
          ['Delete your account', 'delete-account-en.html'],
          ['Terms (Korean original)', 'terms.html'],
          ['Privacy (Korean original)', 'privacy.html'],
        ],
      },
    ],
    copyright: '© 2026 Nundeongyi. All rights reserved.',
    madeWith: 'made with snow in seoul.',
  },
};
