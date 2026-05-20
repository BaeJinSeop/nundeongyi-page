// landing.jsx — 눈덩이 랜딩 페이지 (한 페이지 스크롤)

const L = {
  bg: '#F7F4ED',          // warm cream — landing 전용 따뜻한 톤
  bg2: '#EAE3D8',
  surface: '#FFFFFF',
  ink: '#0D2844',
  ink2: '#506782',
  ink3: '#8AA0B7',
  line: 'rgba(13,40,68,0.08)',
  lineSoft: 'rgba(13,40,68,0.04)',
  accent: '#7DB4DD',
  accentDeep: '#3F7AB0',
  ice: '#B8D4E8',
  iceLight: '#E6EEF7',
  navy: '#0D2844',
  navyDeep: '#08192C',
  good: '#3A9D7E',
  warm: '#D97757',
};

// ──────────────────────────────────────────────────────────
// NAV
// ──────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`landing-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="landing-brand">
        <Mascot size={28} palette="light" mood="happy" shadow={false} />
        <span className="landing-brand-name">눈덩이</span>
        <span className="landing-brand-sub">· snowball</span>
      </a>
      <div className="landing-nav-links">
        {[
          { label: 'features', href: '#features' },
          { label: 'simulator', href: '#simulator' },
          { label: 'goals', href: '#goals' },
          { label: 'faq', href: '#faq' },
        ].map((l) => (
          <a key={l.href} href={l.href} className="landing-nav-link">
            {l.label}
          </a>
        ))}
        <a href="#download" className="landing-cta-btn">
          앱 다운로드
        </a>
      </div>
    </nav>
  );
}

// ──────────────────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: L.bg }}>
      {/* Background pattern — falling snow */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        <SnowField count={20} color="rgba(125,180,221,0.5)" />
      </div>

      <div className="landing-hero-grid">
        {/* Left: copy */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, textTransform: 'uppercase', marginBottom: 24 }}>
            micro-saving · scenario planner
          </div>
          <h1 className="landing-h1">
            작은 눈 한 톨이<br />
            <span className="font-italiana" style={{ fontWeight: 400, letterSpacing: '-0.005em', color: L.accentDeep }}>
              거대한 부
            </span>
            가 됩니다.
          </h1>
          <p className="landing-lead" style={{ marginTop: 28, maxWidth: 540 }}>
            오늘 아낀 커피 한 잔이 10년 뒤 얼마가 되는지 — 매일의 작은 절약을 미래의 자산으로 굴려주는 시나리오 플래너.
          </p>

          {/* CTAs */}
          <div style={{ marginTop: 36, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
          </div>

          {/* Mini stats */}
          <div style={{ marginTop: 44, display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            <Stat n="4.8" sub="App Store 평점" />
            <Stat n="12K+" sub="누적 다운로드" />
            <Stat n="₩2.3억" sub="유저들 누적 절약액" />
          </div>
        </div>

        {/* Right: device showcase */}
        <div className="landing-hero-device">
          {/* Soft halo */}
          <div
            style={{
              position: 'absolute', width: 480, height: 480, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(125,180,221,0.35), transparent 65%)',
              left: '50%', top: '50%', transform: 'translate(-50%, -55%)',
              maxWidth: '100%',
            }}
          />

          {/* Floating mascot */}
          <div
            style={{
              position: 'absolute', top: 30, left: -10, zIndex: 5,
              animation: 'slow-float 4s ease-in-out infinite',
            }}
          >
            <Mascot size={130} palette="light" mood="happy" />
          </div>

          {/* Device — primary */}
          <div
            style={{
              position: 'relative', zIndex: 2,
              transform: 'rotate(-3deg)',
              boxShadow: '0 40px 80px rgba(13,40,68,0.18)',
              borderRadius: 44,
            }}
          >
            <SafePrototype heroKind="solo" fontKey="italiana" />
          </div>

          {/* Small badge / quote */}
          <div
            style={{
              position: 'absolute', bottom: 60, right: -8, zIndex: 6,
              padding: '14px 18px', background: L.surface, borderRadius: 16,
              border: `1px solid ${L.line}`,
              boxShadow: '0 12px 28px rgba(13,40,68,0.10)',
              maxWidth: 220, transform: 'rotate(2deg)',
            }}
          >
            <div className="font-italiana" style={{ fontSize: 14, color: L.accentDeep, lineHeight: 1, letterSpacing: '0.02em' }}>well done.</div>
            <div style={{ marginTop: 4, fontSize: 12, color: L.ink, fontWeight: 700, lineHeight: 1.4 }}>
              "오늘의 절약이 목표를 <span style={{ color: L.accentDeep }}>3일</span> 앞당겼어요"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, sub }) {
  return (
    <div>
      <div className="tnum" style={{ fontSize: 28, fontWeight: 700, color: L.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11, color: L.ink3, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function StoreBadge({ kind }) {
  if (kind === 'apple') {
    return (
      <a
        href="#"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 20px', background: L.ink, color: '#fff',
          textDecoration: 'none', borderRadius: 14,
          fontFamily: "'Pretendard Variable', Pretendard, system-ui",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 12.04c-.03-2.85 2.32-4.22 2.43-4.29-1.32-1.93-3.39-2.19-4.13-2.22-1.76-.18-3.43 1.04-4.32 1.04-.89 0-2.27-1.01-3.73-.99-1.92.03-3.69 1.12-4.68 2.83-2 3.46-.51 8.58 1.43 11.39.95 1.38 2.08 2.92 3.56 2.87 1.43-.06 1.97-.92 3.7-.92s2.22.92 3.73.89c1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.16 1.57-3.24-.04-.02-3.01-1.15-3.04-4.57M14.5 4.31c.78-.95 1.31-2.27 1.17-3.58-1.13.05-2.5.75-3.31 1.7-.72.84-1.36 2.18-1.19 3.47 1.27.1 2.55-.64 3.33-1.59"/>
        </svg>
        <div style={{ textAlign: 'left', lineHeight: 1 }}>
          <div style={{ fontSize: 9, color: '#A6C8E4', letterSpacing: '0.04em' }}>Download on the</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>App Store</div>
        </div>
      </a>
    );
  }
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '12px 20px', background: L.surface, color: L.ink,
        border: `1px solid ${L.line}`, textDecoration: 'none', borderRadius: 14,
        fontFamily: "'Pretendard Variable', Pretendard, system-ui",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.293-.157-.493-.46-.493-.83V2.643c0-.37.2-.672.493-.83z" fill="#00C853"/>
        <path d="M16.81 8.97l-2.6 2.6 2.6 2.6 3.78-2.18c.43-.25.43-.85 0-1.1l-3.78-1.92z" fill="#FFD600"/>
        <path d="M16.81 14.17l-2.6-2.6-10.6 10.62c.27.13.59.13.86-.02l12.34-7z" fill="#FF3D00"/>
        <path d="M3.61 1.81c-.29.16-.49.46-.49.83v.86l11.09 8.07-2.6-2.6L3.61 1.81z" fill="#2962FF"/>
      </svg>
      <div style={{ textAlign: 'left', lineHeight: 1 }}>
        <div style={{ fontSize: 9, color: L.ink3, letterSpacing: '0.04em' }}>GET IT ON</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>Google Play</div>
      </div>
    </a>
  );
}

// ──────────────────────────────────────────────────────────
// TAGLINE — between hero and features
// ──────────────────────────────────────────────────────────
function Tagline() {
  return (
    <section style={{ background: L.bg, padding: 'clamp(60px, 8vw, 80px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.ink3, marginBottom: 18 }}>
          THE PHILOSOPHY
        </div>
        <p className="landing-tagline">
          매일 굴리는 작은 눈,<br />
          <span style={{ color: L.accentDeep }}>그것이 가장 큰 차이를 만듭니다.</span>
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// FEATURES — 3 value props
// ──────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      eyebrow: '01 · capture',
      title: '오늘의 절약을 한 번에',
      sub: '커피, 도시락, 택시. 4초 안에 기록하면 매일의 작은 절약이 데이터가 됩니다.',
      svg: <FeatureIconA />,
    },
    {
      eyebrow: '02 · roll',
      title: '미래로 굴려보세요',
      sub: '월 저축, 수익률, 기간 — 시나리오를 슬라이더로 비교하며 비관/기대/낙관까지 한 화면에서.',
      svg: <FeatureIconB />,
    },
    {
      eyebrow: '03 · arrive',
      title: '목표가 더 빨리 옵니다',
      sub: '매번 절약할 때마다 목표 도달일이 얼마나 앞당겨졌는지 알려줍니다. 가장 큰 동기부여.',
      svg: <FeatureIconC />,
    },
  ];
  return (
    <section id="features" style={{ background: L.surface, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="WHAT IT DOES" lead="three steps." title="작은 절약을 자산으로 굴리는 방법." />

        <div className="features-grid" style={{ marginTop: 56 }}>
          {features.map((f, i) => (
            <article
              key={i}
              style={{
                padding: '36px 32px',
                background: L.bg, borderRadius: 22, border: `1px solid ${L.line}`,
                display: 'flex', flexDirection: 'column', gap: 22,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ height: 88, display: 'flex', alignItems: 'center' }}>{f.svg}</div>
              <div className="font-italiana" style={{ fontSize: 13, color: L.accentDeep, letterSpacing: '0.04em' }}>
                {f.eyebrow}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: L.ink, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: L.ink2, lineHeight: 1.65 }}>{f.sub}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, lead, title, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: 760, margin: center ? '0 auto' : 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.ink3, marginBottom: 16 }}>
        {eyebrow}
      </div>
      {lead && (
        <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
          {lead}
        </div>
      )}
      <h2 className="landing-h2">{title}</h2>
    </div>
  );
}

function FeatureIconA() {
  // a coin-like circle + droplet
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r="32" fill="none" stroke={L.accent} strokeWidth="1" />
      <circle cx="44" cy="44" r="22" fill={L.iceLight} />
      <text x="44" y="50" textAnchor="middle" fontSize="22" fill={L.accentDeep} fontFamily="Italiana, serif">₩</text>
      <circle cx="68" cy="22" r="4" fill={L.accentDeep} />
      <circle cx="74" cy="34" r="2" fill={L.accent} />
    </svg>
  );
}
function FeatureIconB() {
  // chart up
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <path d="M10 70 L10 18" stroke={L.ink3} strokeWidth="1" />
      <path d="M10 70 L80 70" stroke={L.ink3} strokeWidth="1" />
      <path d="M10 62 C 24 60, 30 50, 42 42 S 64 28, 80 14" fill="none" stroke={L.accentDeep} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 70 C 24 66, 30 56, 42 48 S 64 32, 80 14 L 80 70 Z" fill={L.accent} fillOpacity="0.18" />
      <circle cx="80" cy="14" r="4" fill={L.accentDeep} />
    </svg>
  );
}
function FeatureIconC() {
  // flag/target
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r="32" fill="none" stroke={L.accent} strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="44" cy="44" r="20" fill={L.iceLight} stroke={L.accentDeep} strokeWidth="1" />
      <circle cx="44" cy="44" r="6" fill={L.accentDeep} />
      <path d="M44 16 L44 44" stroke={L.ink} strokeWidth="1" strokeDasharray="2 3" />
      <path d="M44 16 L62 22 L44 28 Z" fill={L.ink} />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────
// MAGIC MOMENT — narrative section with mascot trail
// ──────────────────────────────────────────────────────────
function MagicMoment() {
  return (
    <section style={{ background: L.navy, color: '#fff', padding: 'clamp(80px, 10vw, 120px) 24px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <SnowField count={30} color="rgba(136,208,255,0.4)" />
      </div>

      <div className="landing-section-2col" style={{ position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accent, marginBottom: 16 }}>
            THE MAGIC MOMENT
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accent, letterSpacing: '0.02em', marginBottom: 10 }}>
            ₩4,500 saved →
          </div>
          <h2 className="landing-h2 on-dark">
            오늘의 절약이<br />
            <span className="font-italiana" style={{ fontWeight: 400, color: L.accent, letterSpacing: '-0.005em' }}>3일</span>
            을 앞당깁니다.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 480 }}>
            매번 절약할 때마다 목표 도달일이 얼마나 당겨졌는지 즉시 알려드려요.
            추상적인 숫자가 아니라, 손에 잡히는 시간으로.
          </p>

          {/* Mascot growth trail */}
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'flex-end', gap: 'clamp(6px, 1.2vw, 12px)', flexWrap: 'wrap' }}>
            {[28, 42, 60, 84, 112].map((sz, i, arr) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5 + (i / (arr.length - 1)) * 0.5 }}>
                <Mascot size={sz} palette="light" mood="happy" shadow={false} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                  {['Day 1', 'Week 1', 'Month 3', 'Year 1', 'Year 5'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phone — mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{ transform: 'rotate(3deg)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', borderRadius: 44 }}>
            <MicroMomentMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// Static "magic moment" phone for landing
function MicroMomentMockup() {
  return (
    <Phone bg="#F1F6FB">
      <SnowField count={10} color="rgba(125,180,221,0.28)" />
      <div style={{ position:'absolute', inset:0, paddingTop:80, paddingBottom:28, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ padding: '0 32px', textAlign: 'center' }}>
          <div style={{ animation:'pixel-pulse 2.5s ease-in-out infinite' }}>
            <Mascot size={140} palette="light" mood="happy" />
          </div>
          <div className="font-italiana" style={{ marginTop:22, fontSize:22, color:L.accentDeep, letterSpacing:'0.02em' }}>well done.</div>
          <div style={{ marginTop:6, fontSize:24, fontWeight:700, color:L.ink, letterSpacing:'-0.02em', lineHeight:1.25 }}>
            <span className="tnum">4,500</span>원이<br />눈덩이로 굴러갔어요.
          </div>
          <div style={{ marginTop:24, padding:'18px 22px', background:'#FFFFFF', borderRadius:18, border:`1px solid ${L.line}` }}>
            <div style={{ fontSize:11, color:L.ink3, letterSpacing:'0.12em', fontWeight:600 }}>YOUR GOAL · 내 집 마련</div>
            <div style={{ marginTop:6, fontSize:13, color:L.ink2 }}>목표 도달이</div>
            <div style={{ marginTop:4, display:'flex', alignItems:'baseline', justifyContent:'center', gap:6 }}>
              <span className="font-italiana" style={{ fontSize:44, color:L.accentDeep, lineHeight:1 }}>3</span>
              <span style={{ fontSize:14, color:L.ink2, fontWeight:600 }}>일</span>
              <span style={{ fontSize:14, color:L.ink, fontWeight:700 }}>앞당겨졌어요</span>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ──────────────────────────────────────────────────────────
// SIMULATOR SHOWCASE
// ──────────────────────────────────────────────────────────
function SimulatorShow() {
  return (
    <section id="simulator" style={{ background: L.surface, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div className="landing-section-2col">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: 'rotate(-2deg)', boxShadow: '0 30px 60px rgba(13,40,68,0.15)', borderRadius: 44 }}>
            <SimEditorial />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, marginBottom: 16 }}>
            SCENARIO SIMULATOR
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
            in 10 years,
          </div>
          <h2 className="landing-h2">
            당신의 눈덩이는<br />
            얼마나 커져 있을까요?
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: L.ink2, lineHeight: 1.65, maxWidth: 480 }}>
            월 저축, 예상 수익률, 운용 기간을 슬라이더 하나로 조정하면서 비관 / 기대 / 낙관 시나리오를 동시에 확인하세요. 가장 마음에 드는 시나리오는 대시보드에 고정.
          </p>

          {/* Feature bullets */}
          <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['연 수익률 1~12%', '시장 상황에 맞게 조정 가능'],
              ['최대 30년', '단기 비상금부터 은퇴까지'],
              ['시나리오 핀', '대시보드에 즉시 반영'],
            ].map(([k, v], i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: L.accentDeep, marginTop: 8, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: L.ink }}>{k}</span>
                  <span style={{ fontSize: 14, color: L.ink3, marginLeft: 8 }}>{v}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// GOALS SHOWCASE
// ──────────────────────────────────────────────────────────
function GoalsShow() {
  return (
    <section id="goals" style={{ background: L.bg, padding: 'clamp(80px, 10vw, 120px) 24px' }}>
      <div className="landing-section-2col">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, marginBottom: 16 }}>
            GOALS
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
            your dreams,
          </div>
          <h2 className="landing-h2">
            한 곳에서,<br />같은 페이스로.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: L.ink2, lineHeight: 1.65, maxWidth: 480 }}>
            내 집 · 비상금 · 여행 · 은퇴. 모든 목표가 한 화면에. 어디까지 왔는지, 얼마나 남았는지, 언제 도달할지 — 명확하게.
          </p>

          {/* Inline goal cards preview */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InlineGoal tag="HOUSING" color="#3F7AB0" name="내 집 마련" saved="4,130만원" target="8,000만원" pct={51.6} />
            <InlineGoal tag="EMERGENCY" color="#D9A04E" name="비상금" saved="850만원" target="1,000만원" pct={85} />
            <InlineGoal tag="TRAVEL" color="#C97A5D" name="유럽 한 달 살기" saved="120만원" target="800만원" pct={15} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: 'rotate(2deg)', boxShadow: '0 30px 60px rgba(13,40,68,0.15)', borderRadius: 44 }}>
            <GoalFlow />
          </div>
        </div>
      </div>
    </section>
  );
}

function InlineGoal({ tag, color, name, saved, target, pct }) {
  return (
    <div style={{ padding: '14px 18px', background: L.surface, borderRadius: 14, border: `1px solid ${L.line}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color, letterSpacing: '0.1em', padding: '3px 8px', background: color + '15', borderRadius: 4 }}>{tag}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: L.ink }}>{name}</span>
        <span className="font-italiana" style={{ marginLeft: 'auto', fontSize: 18, color, letterSpacing: '0.01em' }}>{pct.toFixed(0)}%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 12 }}>
        <span className="tnum" style={{ fontWeight: 700, color: L.ink }}>{saved}</span>
        <span style={{ color: L.ink3 }}>/ {target}</span>
      </div>
      <div style={{ height: 4, background: L.iceLight, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: color }} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: '눈덩이는 어떤 앱인가요?', a: '오늘 절약한 작은 금액이 미래의 자산이 되는 과정을 시각화해주는 시나리오 플래너입니다. 단순 가계부가 아니라, 매일의 작은 선택이 10년 뒤에 어떻게 자라는지 보여줍니다.' },
    { q: '무료인가요?', a: '핵심 기능은 모두 무료로 제공됩니다. 향후 고급 시나리오 비교, 무제한 목표 등 일부 기능은 프리미엄으로 제공될 예정입니다.' },
    { q: '내 금융 정보가 안전한가요?', a: '눈덩이는 계좌 정보를 직접 연결하지 않습니다. 직접 입력한 자산과 목표 정보만 저장하며, 모든 데이터는 암호화되어 전송됩니다.' },
    { q: '어떤 OS에서 사용 가능한가요?', a: 'iOS 15 이상, Android 7.0 (API 24) 이상에서 사용 가능합니다.' },
    { q: '실제로 자산을 굴려주나요?', a: '아니요. 눈덩이는 자산 운용 상품을 판매하지 않습니다. 사용자가 직접 세운 시나리오와 목표를 추적하는 도구입니다.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ background: L.surface, padding: '120px 40px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionHeader eyebrow="FAQ" lead="frequently asked." title="자주 묻는 질문." center />
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((it, i) => (
            <div key={i} style={{ borderTop: `1px solid ${L.line}`, padding: '20px 4px', borderBottom: i === items.length - 1 ? `1px solid ${L.line}` : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 600, color: L.ink, letterSpacing: '-0.01em' }}>{it.q}</span>
                <span className="font-italiana" style={{ fontSize: 22, color: L.accentDeep, lineHeight: 1, transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              {open === i && (
                <p style={{ marginTop: 14, marginBottom: 0, fontSize: 14, color: L.ink2, lineHeight: 1.7, maxWidth: 600 }}>
                  {it.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// FINAL CTA
// ──────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="download" style={{ background: L.bg2, padding: '120px 40px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 56px', background: L.navy, borderRadius: 32, position: 'relative', overflow: 'hidden', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <SnowField count={18} color="rgba(136,208,255,0.4)" />
        </div>
        <div style={{ position: 'absolute', top: 30, right: 40, opacity: 0.95, animation: 'slow-float 4s ease-in-out infinite' }}>
          <Mascot size={140} palette="light" mood="happy" shadow={false} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 480 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accent, marginBottom: 14 }}>
            START TODAY
          </div>
          <div className="font-italiana" style={{ fontSize: 26, color: L.accent, letterSpacing: '0.02em', marginBottom: 10 }}>
            roll your snowball.
          </div>
          <h2 style={{ margin: 0, fontSize: 48, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            지금 굴리세요.<br />첫 천 원부터.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 380 }}>
            가입 30초 · 첫 절약 기록 1분 · 미래는 10년 더 빨라집니다.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: L.bg, padding: '60px 40px 36px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Mascot size={36} palette="light" mood="happy" shadow={false} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: L.ink }}>눈덩이</div>
              <div className="font-italiana" style={{ fontSize: 13, color: L.ink3, letterSpacing: '0.02em' }}>snowball.</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: L.ink2, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
            작은 눈 한 톨이 거대한 부가 됩니다. 매일의 작은 절약이 미래 자산이 되는 시나리오 플래너.
          </p>
        </div>
        <FooterCol title="제품" links={['기능', '시뮬레이터', '목표', '로드맵']} />
        <FooterCol title="회사" links={['소개', '블로그', '채용', '문의']} />
        <FooterCol title="정책" links={[['이용약관', '#'], ['개인정보처리방침', 'privacy.html'], ['라이선스', '#']]} />
      </div>
      <div style={{ maxWidth: 1200, margin: '40px auto 0', paddingTop: 24, borderTop: `1px solid ${L.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: L.ink3 }}>© 2026 Nundeongyi. All rights reserved.</span>
        <span className="font-italiana" style={{ fontSize: 13, color: L.ink3, letterSpacing: '0.02em' }}>made with ❄ in seoul.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: L.ink3, marginBottom: 14 }}>
        {title.toUpperCase()}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((l, i) => {
          const label = Array.isArray(l) ? l[0] : l;
          const href = Array.isArray(l) ? l[1] : '#';
          return (
            <li key={i}>
              <a href={href} style={{ fontSize: 13, color: L.ink2, textDecoration: 'none' }}>{label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Tagline, Features, MagicMoment, SimulatorShow, GoalsShow, FAQ, FinalCTA, Footer });
