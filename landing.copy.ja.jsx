// landing.copy.ja.jsx — 일본어 랜딩 카피 (ja.html 전용)
//
// landing.jsx의 KO_COPY와 같은 스키마. landing.jsx보다 먼저 로드되어야 한다.
// 카피 키가 바뀌면 이 파일도 반드시 함께 수정할 것.
//
// 폰 목업은 일본어 실캡처(assets/images/v2/ja/ — 앱 스토어 스크린샷 raw 재활용).
// 시뮬레이터 화면은 ja 캡처가 없어 GROW 장면을 눈송이 도감으로 구성.
// 정책 문서는 일본어판(privacy-ja/terms-ja/delete-account-ja.html)으로 연결.

window.LANDING_COPY = {
  brandName: 'ゆきだま',
  versionPill: 'v1.8.0 · 配信中',
  storeAria: {
    apple: 'App Storeでゆきだまをダウンロード',
    google: 'Google Playでゆきだまをダウンロード',
  },
  nav: {
    aria: 'メインメニュー',
    homeAria: 'ゆきだまホーム',
    links: [['使いかた', '#journey'], ['クイック記録', '#quick'], ['機能', '#features'], ['FAQ', '#faq']],
    download: '無料ではじめる',
    langSwitch: [
      { label: '한국어', href: './', hrefLang: 'ko' },
      { label: 'EN', href: 'en.html', hrefLang: 'en' },
    ],
  },
  hero: {
    kicker: 'SPEND · SAVE · GROW',
    title: <>今日の小さな選択が、<br /><em>明日の雪だるま</em>になるように。</>,
    lead: '買いたい気持ちはいったんあずけて、使ったお金もがまんしたお金もさっと記録。迷い・支出・節約・目標が、ひとつの流れにつながります。',
    notesAria: 'アプリのご利用について',
    notes: ['無料ではじめる', '口座連携なし', 'iOS · Android'],
    stageAria: 'ゆきだまのホーム画面',
    phone: { src: 'ja/dashboard.webp', alt: '日本語で動くゆきだまのホームダッシュボード' },
    quickLabel: 'クイック記録',
    quickChips: ['迷い', '支出', '節約'],
    scroll: 'アプリを見てまわる',
  },
  journey: {
    header: {
      eyebrow: 'ONE BETTER FLOW',
      title: <>心を責めずに、<br />選択を変える4つの場面。</>,
      description: 'ゆきだまは「とにかく節約して」とは言いません。もう一度だけ考えて、はっきり記録して、もっと先の未来とくらべて、いっしょに使います。',
    },
    items: [
      {
        step: '01',
        label: 'THINK',
        title: <>衝動はいったんあずけて、<br />決めるのはゆっくり。</>,
        description: '買いたくなった瞬間、迷いをあずけておくと、ゆきだまが代わりに覚えておきます。決めた時間が過ぎたら、自分の選択をもう一度確認できます。',
        tags: ['6時間から7日まで', '未来の価値をプレビュー', 'がまんできた · 買った'],
        image: 'ja/consideration.webp',
        alt: '買い物の迷いをあずけて決める画面',
        tone: 'blue',
      },
      {
        step: '02',
        label: 'RECORD',
        title: <>使ったお金も守ったお金も、<br />さっとひと言で。</>,
        description: '支出も収入も数タップで記録。予算・固定費までまとめて、今月のお金の流れをひと目で見わたせます。',
        tags: ['支払い方法まで記録', '収入 · 予算 · 固定費', 'カレンダー · 支出インサイト'],
        image: 'ja/expense-insight.webp',
        alt: '月の支出と予算をまとめて見る画面',
        tone: 'mint',
      },
      {
        step: '03',
        label: 'GROW',
        title: <>小さな節約を、<br />見える未来へ。</>,
        description: '今日守ったお金が時間とともにいくらに育つかをくらべて、自分だけの目標につなげましょう。節約するたび、世界にひとつの雪の結晶も集まります。',
        tags: ['複利シミュレーター', '目標の逆算', '雪の結晶コレクション'],
        image: 'ja/snowflake-gallery.webp',
        alt: '節約するたび集まる雪の結晶コレクションの画面',
        tone: 'lavender',
      },
      {
        step: '04',
        label: 'SHARE',
        title: <>いっしょに使う家計簿、<br />旅行の精算まで。</>,
        description: '招待コードひとつでいっしょに使えて、共有するのは選んだ記録だけ。旅行ルームでは「ラーメン1,200円」のように現地通貨のまま書けば、割り勘の精算まで自動です。',
        tags: ['共有する記録だけ選んで', '旅行ルーム · 現地通貨', '割り勘の精算も自動'],
        image: 'ja/ledger.webp',
        alt: '旅行家計簿で割り勘を精算する画面',
        tone: 'peach',
      },
    ],
  },
  how: {
    eyebrow: 'HOW IT WORKS',
    title: '支払う直前、一度だけ立ち止まってみて。',
    steps: [
      { number: '1', icon: 'shopping-bag.webp', title: '迷いをあずけて', text: '買うか迷っている支出を10秒でメモします。' },
      { number: '2', icon: 'future-plant.webp', title: '未来とくらべて', text: 'そのお金が時間が経つといくらになるか、先に確かめます。' },
      { number: '3', icon: 'decision-check.webp', title: '自分の選択を残す', text: 'がまんしても、買ってもOK。じゅうぶん考えた選択として残ります。' },
    ],
  },
  quick: {
    pill: 'v1.8.0 · 日本語対応',
    eyebrow: 'QUICK INPUT',
    title: <>思いが消える前に、<br />その場で残す。</>,
    lead: 'ダッシュボードから迷い・支出・節約をすぐに始められます。入力は短く、確認ははっきりと。',
    optionsAria: 'クイック入力の種類',
    options: [
      { tone: 'is-blue', sym: '?', name: '迷い', desc: '買うか迷ったらいったん保管' },
      { tone: 'is-coral', sym: '¥', name: '支出', desc: '使ったお金をさっと記録' },
      { tone: 'is-mint', sym: '✓', name: '節約', desc: '守ったお金をその場で記録' },
    ],
    visualAria: 'クイック入力と節約記録の画面',
    back: { src: 'ja/saving-add.webp', alt: '節約をすばやく記録する画面' },
    front: { src: 'ja/dashboard.webp', alt: '迷い・支出・節約をすぐ始められるダッシュボード' },
  },
  features: {
    header: {
      eyebrow: 'EVERYTHING IN ONE PLACE',
      title: <>迷いから目標まで、<br />必要な機能をひとつに。</>,
      description: '口座連携もむずかしい金融用語もなし。自分で残した選択を理解することに集中しました。',
    },
    badge: 'AVAILABLE NOW',
    items: [
      { icon: 'snowflake.webp', title: '雪の結晶コレクション', description: '節約するたび、世界にひとつの結晶が増えていきます。', tone: 'ice', size: 'wide' },
      { icon: 'goal-mountain.webp', title: '目標プランナー', description: '目標金額と期間を、現実的なプランに変えます。', tone: 'sand' },
      { icon: 'streak-fire.webp', title: '節約ストリーク', description: '小さな選択を、途切れない習慣にします。', tone: 'peach' },
      { icon: 'hand-wave.webp', title: 'エコーコミュニティ', description: '名前も比較もなしで、静かな応援を交わします。', tone: 'lavender' },
      { icon: 'shopping-bag.webp', title: '支出インサイト', description: '予算・カレンダー・くり返しのパターンをひと目で。', tone: 'plain', size: 'wide' },
      { icon: 'future-plant.webp', title: 'ホーム画面ウィジェット', description: 'アプリを開かなくても、節約額とストリークを確認できます。', tone: 'mint' },
    ],
    disclaimer: 'ゆきだまは金融商品を販売したり、実際の資産を運用したりしない、支出習慣のためのツールです。',
  },
  faq: {
    eyebrow: 'FAQ',
    title: <>はじめる前に、<br />気になること。</>,
    lead: 'ほかに気になることがあれば、いつでもメールでどうぞ。',
    contactLabel: 'お問い合わせ ↗',
    items: [
      {
        q: 'ゆきだまはどんなアプリですか?',
        a: '買いたいものができたとき、いったんあずけてから決め直す支出習慣アプリです。がまんできた支出は節約記録と未来の価値につながり、家計簿・目標・シミュレーター・エコーコミュニティもいっしょに使えます。',
      },
      {
        q: '日本語で使えますか?',
        a: 'はい。アプリ全体が日本語に対応していて、金額表示も円に設定できます(プロフィール → アプリ設定 → 通貨)。気になる点はアプリ内のお問い合わせからいつでも送れます。',
      },
      {
        q: 'v1.8.0では何が変わりましたか?',
        a: '毎週月曜の朝、先週の支出を1枚にまとめた週間レポートが届きます — 合計・前週比・カテゴリTOP5・予算ペースまで。表示通貨に米ドルが加わり、海外にいてもリマインダーやレポートは自分のタイムゾーンに合わせて届きます。各ストアで最新版に更新してお使いください。',
      },
      {
        q: '買い物をやめさせるアプリですか?',
        a: 'いいえ。ゆきだまは買い物を止めません。少しだけ時間をおいてもう一度聞き、買うと決めたなら、それもじゅうぶん考えた決断として記録します。',
      },
      {
        q: '無料ですか?',
        a: '主要な機能は無料で、広告が含まれます。実際の金融商品を販売したり、資産を代わりに運用したりすることはありません。',
      },
      {
        q: '銀行口座の連携は必要ですか?',
        a: 'いいえ。口座情報は連携しません。ユーザーが自分で入力した支出・節約・目標の情報だけを使います。',
      },
      {
        q: '共有家計簿に入ると、記録が全部見えてしまいますか?',
        a: 'いいえ。記録するときに「共有家計簿にも載せる」をオンにしたものだけが共有されます。ふだんの支出タブの記録は自分にしか見えず、あとから共有に切り替えたり戻したりもできます。',
      },
      {
        q: 'エコーコミュニティで身元はわかりますか?',
        a: '名前・プロフィール・フォローのない匿名の場所で、雪の結晶としてだけ表示されます。共有するかは毎回自分で選べて、通報とブロックの機能もあります。',
      },
      {
        q: 'どの端末で使えますか?',
        a: 'iOS 15以上、Android 7.0(API 24)以上でお使いいただけます。',
      },
    ],
  },
  finalCta: {
    eyebrow: 'START YOUR SNOWBALL',
    title: <>次の買い物は、<br />ゆきだまにいったんあずけてみて。</>,
    lead: '今日もう一度考えた選択が、明日のもっと大きな可能性になります。',
  },
  footer: {
    tagline: '今日の支出を未来の選択とくらべる、支出習慣プランナー。',
    version: 'APP VERSION 1.8.0',
    columns: [
      { title: '見てまわる', links: [['使いかた', '#journey'], ['クイック記録', '#quick'], ['主な機能', '#features']] },
      { title: 'サポート', links: [['よくある質問', '#faq'], ['お問い合わせ', 'mailto:poxy1535@gmail.com']] },
      { title: 'ポリシー', links: [['利用規約', 'terms-ja.html'], ['プライバシーポリシー', 'privacy-ja.html'], ['アカウント削除のご案内', 'delete-account-ja.html']] },
    ],
    copyright: '© 2026 Nundeongyi. All rights reserved.',
    madeWith: 'made with snow in seoul.',
  },
};
