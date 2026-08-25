// landing.jsx — 눈덩이 editorial landing page
//
// 다국어: 모든 카피는 아래 KO_COPY(기본)에 있고, ja.html은 landing.copy.ja.jsx가
// 정의한 window.LANDING_COPY로 통째로 교체한다 (컴포넌트는 공유 — 전체 사본 복제
// 금지 원칙). 카피 키를 추가/삭제하면 landing.copy.ja.jsx도 반드시 함께 수정할 것.

const V2_ASSET = 'assets/images/v2';

const STORE_URLS = {
  apple: 'https://apps.apple.com/app/id6778849270',
  google: 'https://play.google.com/store/apps/details?id=com.snowball.nundeongyi',
};

const KO_COPY = {
  brandName: '눈덩이',
  versionPill: 'v1.7.0 · 지금 사용 가능',
  storeAria: {
    apple: 'App Store에서 눈덩이 다운로드',
    google: 'Google Play에서 눈덩이 다운로드',
  },
  nav: {
    aria: '주요 메뉴',
    homeAria: '눈덩이 홈',
    links: [['사용 흐름', '#journey'], ['빠른 기록', '#quick'], ['기능', '#features'], ['FAQ', '#faq']],
    download: '무료로 시작하기',
    langSwitch: { label: '日本語', href: 'ja.html', hrefLang: 'ja' },
  },
  hero: {
    kicker: 'SPEND · SAVE · GROW',
    title: <>오늘의 작은 선택이<br /><em>내일의 눈덩이</em>가 되도록.</>,
    lead: '사고 싶은 마음은 잠시 맡기고, 쓴 돈과 참아낸 돈은 빠르게 기록하세요. 고민·지출·절약·목표가 하나의 흐름으로 이어집니다.',
    notesAria: '앱 이용 안내',
    notes: ['무료로 시작', '계좌 연결 없음', 'iOS · Android'],
    stageAria: '눈덩이 홈 화면',
    phone: { src: 'dashboard-iphone15pro.webp', alt: '실제 아이폰에서 실행 중인 눈덩이 홈 대시보드' },
    quickLabel: '빠른 기록',
    quickChips: ['고민', '지출', '절약'],
    scroll: '앱 둘러보기',
  },
  journey: {
    header: {
      eyebrow: 'ONE BETTER FLOW',
      title: <>마음을 다그치지 않고,<br />선택을 바꾸는 네 장면.</>,
      description: '눈덩이는 무조건 아끼라고 말하지 않아요. 한 번 더 생각하고, 선명하게 기록하고, 더 먼 미래와 비교하고, 함께 씁니다.',
    },
    items: [
      {
        step: '01',
        label: 'THINK',
        title: <>충동은 잠깐 맡기고,<br />결정은 천천히.</>,
        description: '사고 싶은 순간 고민을 담아두면 눈덩이가 대신 기억해요. 정한 시간이 지난 뒤, 내 선택을 다시 확인할 수 있어요.',
        tags: ['6시간부터 7일까지', '미래 가치 미리보기', '참았어요 · 샀어요'],
        image: 'consideration.webp',
        alt: '소비 고민을 보관하고 결정하는 화면',
        tone: 'blue',
      },
      {
        step: '02',
        label: 'RECORD',
        title: <>쓴 돈도 지킨 돈도,<br />가볍게 한 줄로.</>,
        description: '"어제 스벅 6500 카드"처럼 말하듯 기록하세요. 수입까지 더해 예산과 소비 흐름을 한눈에 모아드려요.',
        tags: ['한 줄 입력 · 결제수단', '수입 · 예산 · 고정지출', '달력 · 소비 인사이트'],
        image: 'expense-insight.webp',
        alt: '월 지출과 소비 흐름을 보여주는 인사이트 화면',
        tone: 'mint',
      },
      {
        step: '03',
        label: 'GROW',
        title: <>작은 절약을,<br />보이는 미래로.</>,
        description: '오늘 지킨 돈이 시간이 지나면 얼마나 자랄지 비교하고, 나만의 목표까지 연결해보세요.',
        tags: ['복리 시뮬레이터', '목표 역산', '눈송이 컬렉션'],
        image: 'simulator.webp',
        alt: '절약한 돈의 미래 가치를 계산하는 시뮬레이터 화면',
        tone: 'lavender',
      },
      {
        step: '04',
        label: 'SHARE',
        title: <>같이 쓰는 가계부,<br />여행 정산까지.</>,
        description: '초대코드 하나로 함께 쓰되, 공유는 올릴 기록만 골라서. 여행방에서는 "라멘 1200엔"처럼 현지 통화 그대로 적으면 1/N 정산까지 자동이에요.',
        tags: ['올릴 기록만 골라서', '여행방 · 현지 통화', '1/N 정산 자동'],
        image: 'ledger.webp',
        alt: '커플이 함께 쓰는 공유 가계부 화면',
        tone: 'peach',
      },
    ],
  },
  how: {
    eyebrow: 'HOW IT WORKS',
    title: '결제 직전, 딱 한 번만 멈춰보세요.',
    steps: [
      { number: '1', icon: 'shopping-bag.webp', title: '마음을 담고', text: '살까 말까 고민되는 소비를 10초 안에 적어요.' },
      { number: '2', icon: 'future-plant.webp', title: '미래와 비교하고', text: '그 돈이 시간이 지나면 얼마가 될지 먼저 확인해요.' },
      { number: '3', icon: 'decision-check.webp', title: '내 선택을 남겨요', text: '참아도, 사도 괜찮아요. 충분히 고민한 선택으로 남아요.' },
    ],
  },
  quick: {
    pill: 'v1.7.0 · 더 빨라진 기록',
    eyebrow: 'QUICK INPUT',
    title: <>생각이 사라지기 전에,<br />바로 남기세요.</>,
    lead: '대시보드에서 고민·지출·절약을 곧바로 시작할 수 있어요. 필요한 입력만 짧게, 확인은 분명하게 만들었습니다.',
    optionsAria: '빠른 입력 종류',
    options: [
      { tone: 'is-blue', sym: '?', name: '고민', desc: '살까 말까 잠시 보관' },
      { tone: 'is-coral', sym: '₩', name: '지출', desc: '쓴 돈을 한 줄로' },
      { tone: 'is-mint', sym: '✓', name: '절약', desc: '지킨 돈을 바로 기록' },
    ],
    visualAria: '빠른 입력과 지출 화면',
    back: { src: 'expense-add.webp', alt: '한 줄 지출을 빠르게 입력하는 화면' },
    front: { src: 'dashboard-iphone15pro.webp', alt: '고민, 지출, 절약을 빠르게 시작하는 실제 아이폰 대시보드' },
  },
  features: {
    header: {
      eyebrow: 'EVERYTHING IN ONE PLACE',
      title: <>고민에서 목표까지,<br />필요한 기능만 한곳에.</>,
      description: '계좌 연결이나 복잡한 금융 용어 없이, 내가 직접 남긴 선택을 이해하는 데 집중했어요.',
    },
    badge: 'AVAILABLE NOW',
    items: [
      { icon: 'snowflake.webp', title: '눈송이 도감', description: '절약할 때마다 하나뿐인 눈송이가 쌓여요.', tone: 'ice', size: 'wide' },
      { icon: 'goal-mountain.webp', title: '목표 플래너', description: '목표 금액과 기간을 현실적인 계획으로 바꿔요.', tone: 'sand' },
      { icon: 'streak-fire.webp', title: '절약 스트릭', description: '작은 선택을 끊기지 않는 습관으로 만들어요.', tone: 'peach' },
      { icon: 'hand-wave.webp', title: '에코 커뮤니티', description: '이름도 비교도 없이 조용한 응원을 나눠요.', tone: 'lavender' },
      { icon: 'shopping-bag.webp', title: '지출 인사이트', description: '예산·달력·반복 패턴을 한눈에 확인해요.', tone: 'plain', size: 'wide' },
      { icon: 'future-plant.webp', title: '홈 화면 위젯', description: '앱을 열지 않아도 절약액과 스트릭을 확인해요.', tone: 'mint' },
    ],
    disclaimer: '눈덩이는 금융 상품을 판매하거나 실제 자산을 운용하지 않는 소비 습관 도구입니다.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: <>시작하기 전에<br />궁금한 점.</>,
    lead: '더 궁금한 내용은 언제든 메일로 알려주세요.',
    contactLabel: '문의하기 ↗',
    items: [
      {
        q: '눈덩이는 어떤 앱인가요?',
        a: '사고 싶은 게 생겼을 때 잠시 맡겨두고 다시 결정하는 소비 습관 앱입니다. 참아낸 소비는 절약 기록과 미래 가치로 이어지고, 지출·목표·시뮬레이터·에코 커뮤니티를 함께 제공합니다.',
      },
      {
        q: 'v1.7.0에서는 무엇이 달라졌나요?',
        a: '여행이 끝나면 방장이 여행을 종료하고 \'지난 여행\'에 보관해 언제든 다시 꺼내볼 수 있어요. 공유 가계부의 기록마다 멤버들이 짧은 댓글을 남길 수 있고, 내 기록에 댓글이 달리면 알림으로 알려드립니다. 기기 언어에 맞춰 앱 전체가 일본어·영어로도 표시되고, 통화도 원/엔 중에 고를 수 있어요. 각 스토어에서 최신 버전으로 업데이트해 사용할 수 있습니다.',
      },
      {
        q: '소비를 못 하게 막는 앱인가요?',
        a: '아니요. 눈덩이는 소비를 막지 않습니다. 잠시 시간을 두고 다시 묻고, 사기로 했다면 그것도 충분히 고민한 결정으로 기록합니다.',
      },
      {
        q: '무료인가요?',
        a: '핵심 기능은 무료로 제공되며 광고가 포함됩니다. 실제 금융 상품을 판매하거나 자산을 대신 운용하지 않습니다.',
      },
      {
        q: '내 계좌를 연결해야 하나요?',
        a: '아니요. 계좌 정보를 연결하지 않습니다. 사용자가 직접 입력한 소비·절약·목표 정보만 사용합니다.',
      },
      {
        q: '공유 가계부에 올리면 내 모든 기록이 보이나요?',
        a: '아니요. 기록할 때 "공유 가계부에도 올리기"를 켠 것만 공유됩니다. 평소 지출 탭에서 적은 기록은 나만 볼 수 있고, 이미 적어둔 기록도 수정 화면에서 공유로 바꾸거나 되돌릴 수 있어요.',
      },
      {
        q: '에코 커뮤니티에서 내가 누군지 드러나나요?',
        a: '이름·프로필·팔로우가 없는 익명 공간이며 눈송이로만 표시됩니다. 공유 여부는 매번 직접 선택할 수 있고, 신고와 차단 기능을 제공합니다.',
      },
      {
        q: '어떤 기기에서 사용할 수 있나요?',
        a: 'iOS 15 이상, Android 7.0(API 24) 이상에서 사용할 수 있습니다.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'START YOUR SNOWBALL',
    title: <>다음 소비는,<br />눈덩이에 잠시 맡겨보세요.</>,
    lead: '오늘 한 번 더 생각한 선택이 내일의 더 큰 가능성이 됩니다.',
  },
  footer: {
    tagline: '오늘의 소비를 미래의 선택과 비교하는 소비 습관 플래너.',
    version: 'APP VERSION 1.7.0',
    columns: [
      { title: '둘러보기', links: [['사용 흐름', '#journey'], ['빠른 기록', '#quick'], ['주요 기능', '#features']] },
      { title: '지원', links: [['자주 묻는 질문', '#faq'], ['문의하기', 'mailto:poxy1535@gmail.com']] },
      { title: '정책', links: [['이용약관', 'terms.html'], ['개인정보처리방침', 'privacy.html'], ['계정 삭제 요청', 'delete-account.html']] },
    ],
    copyright: '© 2026 Nundeongyi. All rights reserved.',
    madeWith: 'made with snow in seoul.',
  },
};

const C = window.LANDING_COPY || KO_COPY;

function trackStoreClick(platform, location) {
  if (typeof gtag === 'function') {
    gtag('event', 'store_click', { platform, location });
  }
}

function StoreBadge({ kind, where = 'unknown', light = false }) {
  const apple = kind === 'apple';
  return (
    <a
      className={`store-badge ${light ? 'is-light' : ''}`}
      href={STORE_URLS[kind]}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackStoreClick(kind, where)}
      aria-label={apple ? C.storeAria.apple : C.storeAria.google}
    >
      {apple ? (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 12.04c-.03-2.85 2.32-4.22 2.43-4.29-1.32-1.93-3.39-2.19-4.13-2.22-1.76-.18-3.43 1.04-4.32 1.04-.89 0-2.27-1.01-3.73-.99-1.92.03-3.69 1.12-4.68 2.83-2 3.46-.51 8.58 1.43 11.39.95 1.38 2.08 2.92 3.56 2.87 1.43-.06 1.97-.92 3.7-.92s2.22.92 3.73.89c1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.16 1.57-3.24-.04-.02-3.01-1.15-3.04-4.57M14.5 4.31c.78-.95 1.31-2.27 1.17-3.58-1.13.05-2.5.75-3.31 1.7-.72.84-1.36 2.18-1.19 3.47 1.27.1 2.55-.64 3.33-1.59" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
          <path d="M3.609 1.814 13.792 12 3.61 22.186c-.293-.157-.493-.46-.493-.83V2.643c0-.37.2-.672.493-.83Z" fill="#00C853" />
          <path d="m16.81 8.97-2.6 2.6 2.6 2.6 3.78-2.18c.43-.25.43-.85 0-1.1l-3.78-1.92Z" fill="#FFD600" />
          <path d="m16.81 14.17-2.6-2.6-10.6 10.62c.27.13.59.13.86-.02l12.34-7Z" fill="#FF3D00" />
          <path d="M3.61 1.81c-.29.16-.49.46-.49.83v.86l11.09 8.07-2.6-2.6-8-7.16Z" fill="#2962FF" />
        </svg>
      )}
      <span>
        <small>{apple ? 'Download on the' : 'GET IT ON'}</small>
        <strong>{apple ? 'App Store' : 'Google Play'}</strong>
      </span>
    </a>
  );
}

function VersionPill({ children, dark = false }) {
  return <span className={`version-pill ${dark ? 'is-dark' : ''}`}><i aria-hidden="true" />{children || C.versionPill}</span>;
}

function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-header is-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}

function PhoneShot({ src, alt, eager = false, className = '', nativeStatusBar = false }) {
  return (
    <div className={`app-phone ${nativeStatusBar ? 'is-native-capture' : ''} ${className}`}>
      {!nativeStatusBar && <span className="phone-island" aria-hidden="true" />}
      <img
        src={`${V2_ASSET}/${src}`}
        alt={alt}
        width={nativeStatusBar ? 1179 : 390}
        height={nativeStatusBar ? 2556 : 844}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`landing-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label={C.nav.aria}>
      <a className="landing-brand" href="#top" aria-label={C.nav.homeAria}>
        <img src={`${V2_ASSET}/app-icon.webp`} alt="" width="38" height="38" />
        <span><strong>{C.brandName}</strong><small>snowball.</small></span>
      </a>
      <div className="landing-nav-links">
        {C.nav.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        {C.nav.langSwitch && (
          <a href={C.nav.langSwitch.href} hrefLang={C.nav.langSwitch.hrefLang} rel="alternate">{C.nav.langSwitch.label}</a>
        )}
        <a className="nav-download" href="#download">{C.nav.download}</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <main id="top" className="hero">
      <div className="hero-snow hero-snow-one" aria-hidden="true">✦</div>
      <div className="hero-snow hero-snow-two" aria-hidden="true">✦</div>
      <div className="hero-grid">
        <div className="hero-copy">
          <VersionPill />
          <p className="hero-kicker">{C.hero.kicker}</p>
          <h1>{C.hero.title}</h1>
          <p className="hero-lead">{C.hero.lead}</p>
          <div className="hero-actions">
            <StoreBadge kind="apple" where="hero" />
            <StoreBadge kind="google" where="hero" light />
          </div>
          <div className="hero-notes" aria-label={C.hero.notesAria}>
            {C.hero.notes.map((note) => <span key={note}>{note}</span>)}
          </div>
        </div>

        <div className="hero-stage" aria-label={C.hero.stageAria}>
          <PhoneShot
            src={C.hero.phone.src}
            alt={C.hero.phone.alt}
            eager
            nativeStatusBar
            className="hero-phone"
          />
          <div className="hero-quick-card" aria-hidden="true">
            <small>{C.hero.quickLabel}</small>
            <div>{C.hero.quickChips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <div className="hero-mascot" aria-hidden="true">
            <Mascot size={144} palette="light" mood="happy" />
          </div>
        </div>
      </div>
      <a className="hero-scroll" href="#journey"><span>{C.hero.scroll}</span><i aria-hidden="true">↓</i></a>
    </main>
  );
}

function V2Showcase() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow={C.journey.header.eyebrow}
          title={C.journey.header.title}
          description={C.journey.header.description}
        />
        <div className="journey-list">
          {C.journey.items.map((item, index) => (
            <article className={`journey-card is-${item.tone} ${index % 2 ? 'is-reverse' : ''}`} key={item.step}>
              <div className="journey-copy">
                <div className="journey-meta"><span>{item.step}</span><small>{item.label}</small></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <div className="journey-visual">
                <span className="journey-word" aria-hidden="true">{item.label.toLowerCase()}.</span>
                <PhoneShot src={item.image} alt={item.alt} nativeStatusBar />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how-section">
      <div className="section-inner">
        <div className="how-heading">
          <p className="eyebrow">{C.how.eyebrow}</p>
          <h2>{C.how.title}</h2>
        </div>
        <ol className="how-list">
          {C.how.steps.map((step) => (
            <li key={step.number}>
              <span className="how-number">{step.number}</span>
              <img src={`${V2_ASSET}/${step.icon}`} alt="" width="96" height="96" loading="lazy" />
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ExpensePreview() {
  return (
    <section id="quick" className="section quick-section">
      <div className="section-inner quick-grid">
        <div className="quick-copy">
          <VersionPill dark>{C.quick.pill}</VersionPill>
          <p className="eyebrow">{C.quick.eyebrow}</p>
          <h2>{C.quick.title}</h2>
          <p className="quick-lead">{C.quick.lead}</p>
          <div className="quick-options" aria-label={C.quick.optionsAria}>
            {C.quick.options.map((option) => (
              <div key={option.name}>
                <span className={`quick-icon ${option.tone}`}>{option.sym}</span>
                <strong>{option.name}</strong>
                <small>{option.desc}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="quick-visual" aria-label={C.quick.visualAria}>
          <PhoneShot src={C.quick.back.src} alt={C.quick.back.alt} nativeStatusBar className="quick-phone-back" />
          <PhoneShot
            src={C.quick.front.src}
            alt={C.quick.front.alt}
            nativeStatusBar
            className="quick-phone-front"
          />
          <div className="quick-snowflake" aria-hidden="true">
            <img src={`${V2_ASSET}/snowflake.webp`} alt="" width="112" height="112" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, tone, size }) {
  return (
    <article className={`feature-card is-${tone} ${size === 'wide' ? 'is-wide' : ''}`}>
      <div className="feature-icon"><img src={`${V2_ASSET}/${icon}`} alt="" width="88" height="88" loading="lazy" /></div>
      <div><span>{C.features.badge}</span><h3>{title}</h3><p>{description}</p></div>
    </article>
  );
}

function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow={C.features.header.eyebrow}
          title={C.features.header.title}
          description={C.features.header.description}
        />
        <div className="feature-grid">
          {C.features.items.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
        </div>
        <p className="feature-disclaimer">{C.features.disclaimer}</p>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq" className="section faq-section">
      <div className="section-inner faq-grid">
        <div className="faq-heading">
          <p className="eyebrow">{C.faq.eyebrow}</p>
          <h2>{C.faq.title}</h2>
          <p>{C.faq.lead}</p>
          <a href="mailto:poxy1535@gmail.com">{C.faq.contactLabel}</a>
        </div>
        <div className="faq-list">
          {C.faq.items.map((item, index) => {
            const expanded = open === index;
            return (
              <article className={expanded ? 'is-open' : ''} key={item.q}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span>{item.q}</span><span aria-hidden="true">+</span>
                </button>
                {expanded && <p id={`faq-answer-${index}`}>{item.a}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="download" className="section final-section">
      <div className="final-card">
        <div className="final-copy">
          <VersionPill dark />
          <p className="eyebrow">{C.finalCta.eyebrow}</p>
          <h2>{C.finalCta.title}</h2>
          <p>{C.finalCta.lead}</p>
          <div className="final-actions">
            <StoreBadge kind="apple" where="final_cta" />
            <StoreBadge kind="google" where="final_cta" light />
          </div>
        </div>
        <div className="final-art" aria-hidden="true">
          <span className="final-snow final-snow-one">✦</span>
          <span className="final-snow final-snow-two">✦</span>
          <Mascot size={220} palette="light" mood="happy" shadow={false} />
        </div>
      </div>
    </section>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <strong>{title}</strong>
      {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
    </div>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <a className="landing-brand" href="#top">
            <img src={`${V2_ASSET}/app-icon.webp`} alt="" width="42" height="42" />
            <span><strong>{C.brandName}</strong><small>snowball.</small></span>
          </a>
          <p>{C.footer.tagline}</p>
          <span className="footer-version">{C.footer.version}</span>
        </div>
        {C.footer.columns.map((column) => <FooterColumn key={column.title} title={column.title} links={column.links} />)}
      </div>
      <div className="footer-bottom"><span>{C.footer.copyright}</span><span>{C.footer.madeWith}</span></div>
    </footer>
  );
}

Object.assign(window, {
  Nav,
  Hero,
  V2Showcase,
  HowItWorks,
  ExpensePreview,
  Features,
  FAQ,
  FinalCTA,
  Footer,
});
