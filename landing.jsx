// landing.jsx — 눈덩이 V2 Premium Ice landing page (2026-07)

const V2_ASSET = 'assets/images/v2';

const L = {
  bg: '#F5F7FA',
  surface: '#FFFFFF',
  surface2: '#F3F6FA',
  stroke: '#E7ECF3',
  ink: '#172238',
  ink2: '#748197',
  ink3: '#A2ACBA',
  blue: '#3F7EDB',
  blueSoft: '#E8F1FF',
  green: '#35AD79',
  greenSoft: '#E7F7F0',
  coral: '#E97973',
  coralSoft: '#FFF0EF',
  dark: '#0B111B',
};

const STORE_URLS = {
  apple: 'https://apps.apple.com/app/id6778849270',
  google: 'https://play.google.com/store/apps/details?id=com.snowball.nundeongyi',
};

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
      aria-label={apple ? 'App Store에서 눈덩이 다운로드' : 'Google Play에서 눈덩이 다운로드'}
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

function StatusPill({ children, kind = 'blue' }) {
  return <span className={`status-pill is-${kind}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-header is-${align}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

function PhoneShot({ src, alt, eager = false, className = '' }) {
  return (
    <div className={`v2-phone ${className}`}>
      <img
        src={`${V2_ASSET}/${src}`}
        alt={alt}
        width="390"
        height="844"
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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`landing-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="주요 메뉴">
      <a className="landing-brand" href="#top" aria-label="눈덩이 홈">
        <img src={`${V2_ASSET}/app-icon.webp`} alt="" width="38" height="38" />
        <span>
          <strong>눈덩이</strong>
          <small className="font-italiana">snowball.</small>
        </span>
      </a>
      <div className="landing-nav-links">
        <a href="#v2">V2</a>
        <a href="#how">사용법</a>
        <a href="#features">기능</a>
        <a href="#faq">FAQ</a>
        <a className="nav-download" href="#download">앱 다운로드</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <main id="top" className="hero">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <StatusPill>V2 PREVIEW · 곧 업데이트</StatusPill>
          <p className="hero-kicker font-italiana">spend · save · grow.</p>
          <h1>
            돈을 쓰기 전과<span className="desktop-space"> </span><br className="mobile-only" />후,<br />
            <span>선택을 더<span className="desktop-space"> </span><br className="mobile-only" />똑똑하게.</span>
          </h1>
          <p className="hero-lead">
            사고 싶은 마음은 잠시 맡기고, 쓴 돈은 가볍게 기록하고,
            참아낸 돈은 미래의 목표로 이어보세요. 소비와 절약이 한눈에 보이는 눈덩이 V2입니다.
          </p>
          <div className="hero-actions">
            <StoreBadge kind="apple" where="hero" />
            <StoreBadge kind="google" where="hero" light />
          </div>
          <div className="hero-trust" aria-label="눈덩이 앱 특징">
            <span>무료로 시작</span>
            <span>iOS · Android</span>
            <span>계좌 연결 없음</span>
          </div>
        </div>

        <div className="hero-stage" aria-label="눈덩이 V2 홈 화면 미리보기">
          <div className="hero-snowflake" aria-hidden="true">
            <img src={`${V2_ASSET}/snowflake.webp`} alt="" width="136" height="136" />
          </div>
          <PhoneShot src="dashboard.webp" alt="눈덩이 V2 홈 대시보드" eager className="hero-phone" />
          <div className="hero-float-card hero-float-card-top">
            <img src={`${V2_ASSET}/decision-check.webp`} alt="" width="48" height="48" />
            <div><small>오늘의 선택</small><strong>하루 더 생각하기</strong></div>
          </div>
          <div className="hero-float-card hero-float-card-bottom">
            <div className="float-dot" />
            <div><small>이번 달 지킨 돈</small><strong className="tnum">128,500원</strong></div>
          </div>
          <div className="hero-mascot" aria-hidden="true">
            <Mascot size={128} palette="light" mood="happy" />
          </div>
        </div>
      </div>
      <a className="hero-scroll font-italiana" href="#v2">discover v2 <span>↓</span></a>
    </main>
  );
}

const SHOWCASES = [
  {
    image: 'dashboard.webp',
    label: '01 · NEW HOME',
    title: '오늘 필요한 선택부터',
    description: '해야 할 행동과 이번 달 흐름을 가장 먼저 보여주는 새 홈.',
    tone: L.blue,
  },
  {
    image: 'consideration.webp',
    label: '02 · THINK TWICE',
    title: '소비 삼고초려',
    description: '사기 전 잠시 맡겨두고 내일의 내가 다시 답해요.',
    tone: L.coral,
  },
  {
    image: 'expense-add.webp',
    label: '03 · ONE LINE',
    title: '한 줄 지출',
    description: '복잡한 입력 대신 말하듯 적는 자연스러운 지출 기록.',
    tone: L.green,
  },
  {
    image: 'expense-insight.webp',
    label: '04 · INSIGHT',
    title: '소비 인사이트',
    description: '쓴 돈과 예산, 반복되는 소비 패턴을 한눈에 비교해요.',
    tone: L.blue,
  },
  {
    image: 'snowflake-gallery.webp',
    label: '05 · COLLECTION',
    title: '눈송이 도감',
    description: '참아낸 선택이 세상에 하나뿐인 눈송이로 남아요.',
    tone: '#8A78D7',
  },
  {
    image: 'simulator.webp',
    label: '06 · SIMULATE',
    title: '미래 시뮬레이터',
    description: '오늘의 작은 돈이 10년 뒤 어떻게 자라는지 확인해요.',
    tone: L.green,
  },
];

function V2Showcase() {
  return (
    <section id="v2" className="section showcase-section">
      <div className="section-inner is-wide">
        <SectionHeader
          eyebrow="THE NEW NUNDEONGYI"
          title={<>앱에서 보던 그대로,<br />더 선명해진 V2.</>}
          description="가짜 목업이 아닌 실제 V2 화면입니다. 필요한 정보는 더 앞에, 입력은 더 짧게, 선택의 결과는 더 분명하게 다듬었습니다."
        />
        <div className="showcase-status">
          <StatusPill>V2 UI 미리보기</StatusPill>
          <span>현재 v1.2.0 제공 중 · V2는 출시 준비 중</span>
        </div>
        <div className="showcase-track" role="list" aria-label="눈덩이 V2 주요 화면">
          {SHOWCASES.map((item) => (
            <article className="showcase-card" key={item.image} role="listitem" style={{ '--card-tone': item.tone }}>
              <div className="showcase-image">
                <img
                  src={`${V2_ASSET}/${item.image}`}
                  alt={`${item.title} V2 화면`}
                  width="390"
                  height="844"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="showcase-copy">
                <small>{item.label}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="swipe-hint font-italiana">swipe to explore →</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: 'shopping-bag.webp',
      title: '고민을 담아요',
      description: '살까 말까 하는 순간 10초면 충분해요. 지금은 1·3·7일, V2에서는 6시간도 고를 수 있어요.',
      tone: 'coral',
    },
    {
      number: '02',
      icon: 'future-plant.webp',
      title: '시간을 두고 봐요',
      description: '눈덩이가 대신 기억하는 동안, 그 돈이 10년 뒤 얼마가 될 수 있는지 먼저 보여드려요.',
      tone: 'green',
    },
    {
      number: '03',
      icon: 'decision-check.webp',
      title: '내일의 내가 답해요',
      description: '참았다면 절약으로, 샀다면 충분히 고민한 결정으로 남아요. 어느 쪽도 실패가 아니에요.',
      tone: 'blue',
    },
  ];

  return (
    <section id="how" className="section how-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title={<>참으라고 하지 않아요.<br />한 번 더 생각하게 해요.</>}
          description="결제 직전의 마음을 부정하지 않고, 잠시 거리를 두어 더 나은 선택을 만드는 눈덩이의 핵심은 그대로입니다."
        />
        <div className="how-grid">
          {steps.map((step) => (
            <article className={`how-card is-${step.tone}`} key={step.number}>
              <span className="how-number font-italiana">{step.number}</span>
              <img src={`${V2_ASSET}/${step.icon}`} alt="" width="112" height="112" loading="lazy" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChoiceStory() {
  return (
    <section className="section story-section">
      <div className="section-inner story-grid">
        <div className="story-visual">
          <div className="story-halo" aria-hidden="true" />
          <PhoneShot src="choice-result.webp" alt="소비를 참아낸 뒤 절약 결과를 보여주는 V2 화면" />
          <div className="story-badge">
            <img src={`${V2_ASSET}/snowflake.webp`} alt="" width="56" height="56" />
            <span><small>오늘 만든 눈송이</small><strong>+ 329,000원</strong></span>
          </div>
        </div>
        <div className="story-copy">
          <StatusPill kind="green">핵심 기능 · 지금 사용 가능</StatusPill>
          <p className="story-serif font-italiana">a choice becomes a future.</p>
          <h2>참아낸 순간을<br />미래의 가치로.</h2>
          <p>
            한 번의 절약이 숫자 하나로 끝나지 않도록, 목표 도달일과 10년 뒤 가치를 바로 연결해 보여드려요.
            작아 보였던 선택이 쌓이는 감각을 눈으로 확인할 수 있어요.
          </p>
          <ul className="check-list">
            <li>절약 기록과 스트릭 자동 연결</li>
            <li>계절마다 달라지는 나만의 눈송이</li>
            <li>금융 목표와 복리 시뮬레이션으로 확장</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExpensePreview() {
  return (
    <section className="section expense-section">
      <div className="section-inner expense-grid">
        <div className="expense-copy">
          <StatusPill kind="coral">V2에서 새로워져요</StatusPill>
          <p className="story-serif font-italiana">less typing, more clarity.</p>
          <h2>가계부가 아니라,<br />다음 선택을 위한 기록.</h2>
          <p>
            “어제 스벅 6500”처럼 한 줄로 적고, 예산과 고정지출, 달력과 인사이트를 한 흐름에서 확인하세요.
            저장 전에는 항상 내용을 직접 확인할 수 있어요.
          </p>
          <div className="mini-feature-grid">
            <div><strong>한 줄 입력</strong><span>말하듯 빠르게</span></div>
            <div><strong>월 예산</strong><span>쓴 돈과 바로 비교</span></div>
            <div><strong>지출 달력</strong><span>날짜별 흐름 확인</span></div>
            <div><strong>소비 인사이트</strong><span>반복 패턴 발견</span></div>
          </div>
          <p className="release-note">이 영역은 미게시 V2 기능 미리보기이며, 스토어 업데이트 완료 후 제공됩니다.</p>
        </div>
        <div className="expense-visual" aria-label="한 줄 지출과 소비 인사이트 V2 화면">
          <PhoneShot src="expense-add.webp" alt="한 줄 지출 입력 V2 화면" className="expense-phone-one" />
          <PhoneShot src="expense-insight.webp" alt="소비 인사이트 V2 화면" className="expense-phone-two" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, status, preview }) {
  return (
    <article className="feature-card">
      <div className="feature-icon"><img src={`${V2_ASSET}/${icon}`} alt="" width="72" height="72" loading="lazy" /></div>
      <span className={`feature-status ${preview ? 'is-preview' : ''}`}>{status}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Features() {
  const features = [
    {
      icon: 'snowflake.webp',
      title: '눈송이 도감',
      description: '절약마다 모양이 다른 눈송이를 만들고 사계절 컬렉션을 채워요.',
      status: '지금 사용 가능',
    },
    {
      icon: 'hand-wave.webp',
      title: '에코 커뮤니티',
      description: '이름·팔로우·비교 없이, 같은 소비를 참은 누군가와 조용한 응원을 나눠요.',
      status: '지금 사용 가능',
    },
    {
      icon: 'goal-mountain.webp',
      title: '목표와 시뮬레이터',
      description: '목표 금액을 역산하고 비관·기대·낙관 시나리오로 미래를 비교해요.',
      status: '지금 사용 가능',
    },
    {
      icon: 'streak-fire.webp',
      title: '절약 습관',
      description: '작은 절약을 스트릭, 캘린더, 챌린지와 연결해 꾸준한 흐름을 만들어요.',
      status: '지금 사용 가능',
    },
    {
      icon: 'shopping-bag.webp',
      title: '지출 허브',
      description: '예산·고정지출·달력·패턴 분석을 하나의 지출 탭에서 관리해요.',
      status: 'V2 미리보기',
      preview: true,
    },
    {
      icon: 'future-plant.webp',
      title: '홈 화면 위젯',
      description: '절약액과 스트릭, 고민 중인 소비를 앱을 열지 않고 확인해요.',
      status: 'V2 미리보기',
      preview: true,
    },
  ];

  return (
    <section id="features" className="section features-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="ONE APP, ONE FLOW"
          title={<>소비부터 목표까지,<br />흩어지지 않게.</>}
          description="눈덩이는 실제 자산을 운용하거나 계좌를 연결하지 않습니다. 직접 기록한 선택을 더 잘 이해하도록 돕는 소비 습관 도구입니다."
        />
        <div className="feature-grid">
          {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
        </div>
      </div>
    </section>
  );
}

function Echo() {
  const echoes = [
    ['카페', '퇴근길 카페 그냥 지나쳤어요. 집 커피도 생각보다 괜찮네요.', '❄ 12'],
    ['쇼핑', '새벽에 담아둔 장바구니, 아침에는 왜 사려 했는지 기억이 안 나요.', '❄ 21'],
    ['배달', '오늘은 냉장고 파먹기 성공. 이 2만원을 목표에 더해볼래요.', '❄ 9'],
  ];
  return (
    <section className="section echo-section">
      <div className="section-inner echo-grid">
        <div className="echo-copy">
          <StatusPill>v1.2 · 지금 사용 가능</StatusPill>
          <p className="story-serif font-italiana">alone, together.</p>
          <h2>참는 건 혼자,<br />응원은 함께 와요.</h2>
          <p>
            익명 한마디를 남기면 같은 카테고리를 절약한 누군가의 이야기가 눈송이처럼 도착해요.
            팔로우도, 댓글도, 비교도 없는 혼자 하는 절약 모임이에요.
          </p>
          <div className="echo-points"><span>완전 익명</span><span>give to get</span><span>신고·차단 지원</span></div>
        </div>
        <div className="echo-panel">
          <div className="echo-panel-head">
            <span><small>ECHOES FOR YOU</small><strong className="font-italiana">for you.</strong></span>
            <span className="weather-chip">오늘은 함박눈 ❄</span>
          </div>
          <div className="echo-list">
            {echoes.map(([tag, text, cheers], index) => (
              <article key={tag}>
                <div className={`echo-flake echo-flake-${index + 1}`}>❄</div>
                <div><span className="echo-tag">{tag}</span><p>{text}</p></div>
                <strong>{cheers}</strong>
              </article>
            ))}
          </div>
          <div className="time-capsule"><span>내일의 나에게</span><p>“이거 없어도 아무 일 안 생겨. 내일의 네가 답해줄 거야.”</p></div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: '눈덩이는 어떤 앱인가요?',
      a: '사고 싶은 게 생겼을 때 잠시 맡겨두고 다시 결정하는 소비 습관 앱입니다. 참아낸 소비는 절약 기록과 미래 가치로 이어지고, 목표·시뮬레이터·에코 커뮤니티 같은 도구를 함께 제공합니다.',
    },
    {
      q: 'V2는 지금 바로 사용할 수 있나요?',
      a: '현재 App Store와 Google Play에는 v1.2.0이 제공되고 있습니다. 이 페이지의 V2 화면과 지출 허브 기능은 출시 준비 중인 미리보기이며, 스토어 업데이트가 완료되면 순차적으로 사용할 수 있습니다.',
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
      a: '아니요. 눈덩이는 계좌 정보를 직접 연결하지 않습니다. 사용자가 직접 입력한 소비·절약·목표 정보만 사용합니다.',
    },
    {
      q: '에코 커뮤니티에서 내가 누군지 드러나나요?',
      a: '아니요. 이름·프로필·팔로우가 없는 익명 공간이며 눈송이로만 표시됩니다. 공유 여부는 매번 직접 선택할 수 있고, 신고와 차단 기능을 제공합니다.',
    },
    {
      q: '어떤 기기에서 사용할 수 있나요?',
      a: 'iOS 15 이상, Android 7.0(API 24) 이상에서 사용할 수 있습니다.',
    },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq" className="section faq-section">
      <div className="section-inner is-narrow">
        <SectionHeader eyebrow="FAQ" title="궁금한 점을 먼저 답할게요." />
        <div className="faq-list">
          {items.map((item, index) => {
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
        <div className="final-orb" aria-hidden="true" />
        <div className="final-mascot" aria-hidden="true"><Mascot size={180} palette="light" mood="happy" shadow={false} /></div>
        <div className="final-copy">
          <p className="eyebrow">START YOUR SNOWBALL</p>
          <p className="final-serif font-italiana">one better choice today.</p>
          <h2>다음 소비는,<br />눈덩이에 잠시 맡겨보세요.</h2>
          <p>지금 눈덩이를 시작하고 새로워진 V2도 가장 먼저 만나보세요.</p>
          <div className="final-actions">
            <StoreBadge kind="apple" where="final_cta" />
            <StoreBadge kind="google" where="final_cta" light />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <a className="landing-brand" href="#top">
            <img src={`${V2_ASSET}/app-icon.webp`} alt="" width="42" height="42" />
            <span><strong>눈덩이</strong><small className="font-italiana">snowball.</small></span>
          </a>
          <p>오늘의 소비를 미래의 선택과 비교하는 소비 습관 플래너.</p>
        </div>
        <FooterColumn title="제품" links={[["V2 미리보기", '#v2'], ['사용법', '#how'], ['다운로드', '#download']]} />
        <FooterColumn title="지원" links={[["자주 묻는 질문", '#faq'], ['문의하기', 'mailto:poxy1535@gmail.com']]} />
        <FooterColumn title="정책" links={[["이용약관", 'terms.html'], ['개인정보처리방침', 'privacy.html'], ['계정 삭제 요청', 'delete-account.html']]} />
      </div>
      <div className="footer-bottom"><span>© 2026 Nundeongyi. All rights reserved.</span><span className="font-italiana">made with snow in seoul.</span></div>
    </footer>
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

Object.assign(window, {
  Nav,
  Hero,
  V2Showcase,
  HowItWorks,
  ChoiceStory,
  ExpensePreview,
  Features,
  Echo,
  FAQ,
  FinalCTA,
  Footer,
});
