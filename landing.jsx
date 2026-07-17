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
            mindful spending · snowball planner
          </div>
          <h1 className="landing-h1">
            사기 전에,<br />
            <span className="font-italiana" style={{ fontWeight: 400, letterSpacing: '-0.005em', color: L.accentDeep }}>
              하루만
            </span>
            {' '}맡겨두세요.
          </h1>
          <p className="landing-lead" style={{ marginTop: 28, maxWidth: 540 }}>
            참으라고 하지 않아요. 눈덩이에 맡겨두면 내일의 내가 다시 물어봐요 — 내일도 필요하면 그때 사도 늦지 않으니까요.
          </p>

          {/* CTAs */}
          <div style={{ marginTop: 36, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
          </div>

          {/* Mini stats — 출시 후 실제 수치 확보 시 활성화
          <div style={{ marginTop: 44, display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            <Stat n="4.8" sub="App Store 평점" />
            <Stat n="12K+" sub="누적 다운로드" />
            <Stat n="₩2.3억" sub="유저들 누적 절약액" />
          </div>
          */}
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
            <ConsiderationMockup />
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
            <div className="font-italiana" style={{ fontSize: 14, color: L.accentDeep, lineHeight: 1, letterSpacing: '0.02em' }}>hold on.</div>
            <div style={{ marginTop: 4, fontSize: 12, color: L.ink, fontWeight: 700, lineHeight: 1.4 }}>
              "에어팟, 내일 다시 물어볼게요 <span style={{ color: L.accentDeep }}>D-1</span>"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Hero mockup — 삼고초려 [참는 중] 화면 (1.1 실화면 재현) ───
function ConsiderationMockup() {
  return (
    <Phone bg="#F1F6FB">
      <SnowField count={16} color="rgba(125,180,221,0.35)" />
      <div style={{ position: 'absolute', inset: 0, paddingTop: 64, padding: '64px 22px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: L.ink3 }}>MICRO ACTION</div>
          <div className="font-italiana" style={{ fontSize: 21, color: L.ink, marginTop: 2 }}>money choices.</div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          {[['참는 중', 2, true], ['절약함', 9, false]].map(([label, n, on]) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 999,
              background: on ? L.ink : '#FFFFFF', color: on ? '#fff' : L.ink2,
              fontSize: 13, fontWeight: 700, border: `1px solid ${on ? L.ink : L.line}`,
            }}>
              {label} <span style={{ opacity: 0.6, fontWeight: 600 }}>{n}</span>
            </div>
          ))}
        </div>

        {/* Today decision banner */}
        <div style={{ marginTop: 14, padding: '11px 14px', background: L.iceLight, borderRadius: 12, border: `1px solid ${L.ice}`, fontSize: 12, color: L.accentDeep, fontWeight: 600 }}>
          ⏰ 오늘 다시 물어볼 고민이 1개 있어요
        </div>

        {/* Consideration cards */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ConsiderCard emoji="🎧" name="에어팟 프로 3세대" amount="329,000원" dday="D-2" ddayColor={L.accentDeep} note="7일 중 5일 참는 중" />
          <ConsiderCard emoji="🏕️" name="캠핑 릴렉스 체어" amount="89,000원" dday="D-DAY" ddayColor={L.warm} note="오늘 결정하는 날이에요" highlight />
        </div>

        {/* Future compare hint */}
        <div style={{ marginTop: 12, padding: '13px 14px', background: '#FFFFFF', borderRadius: 12, border: `1px solid ${L.line}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: L.ink3 }}>10-SECOND FUTURE</div>
          <div style={{ marginTop: 5, fontSize: 12.5, color: L.ink2, lineHeight: 1.5 }}>
            둘 다 참으면 10년 뒤 <span className="tnum" style={{ color: L.accentDeep, fontWeight: 700 }}>약 82만원</span>이 될 수 있어요
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <PrimaryCTA theme="navy">+ 고민 담기</PrimaryCTA>
      </div>
    </Phone>
  );
}

function ConsiderCard({ emoji, name, amount, dday, ddayColor, note, highlight }) {
  return (
    <div style={{
      padding: '13px 14px', background: '#FFFFFF', borderRadius: 14,
      border: `1px solid ${highlight ? ddayColor + '55' : L.line}`,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: '#db277715', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>
        {emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: L.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ marginTop: 2, fontSize: 11.5, color: L.ink3 }}>
          <span className="tnum" style={{ fontWeight: 600, color: L.ink2 }}>{amount}</span> · {note}
        </div>
      </div>
      <span style={{ padding: '4px 9px', borderRadius: 999, background: ddayColor + '15', color: ddayColor, fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
        {dday}
      </span>
    </div>
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
        href="https://apps.apple.com/app/id6778849270"
        target="_blank"
        rel="noopener noreferrer"
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
      href="https://play.google.com/store/apps/details?id=com.snowball.nundeongyi"
      target="_blank"
      rel="noopener noreferrer"
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
          소비를 참는 앱이 아니라,<br />
          <span style={{ color: L.accentDeep }}>소비를 고르는 앱입니다.</span>
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
      eyebrow: '01 · pause',
      title: '사기 전에 맡겨두세요',
      sub: '살까 말까 고민되면 1·3·7일 눈덩이에 맡겨두세요. 시간이 끝나면 다시 물어봐요. 참았다면 절약으로, 샀다면 충분히 고민한 결정으로 — 어느 쪽도 실패가 아니에요.',
      svg: <FeatureIconA />,
    },
    {
      eyebrow: '02 · compare',
      title: '10초 미래 비교',
      sub: '금액만 입력하면 이 소비가 10년 뒤 얼마가 될 수 있는지 바로 보여줘요. 한 번의 소비는 한 번으로, 매주 반복이라면 반복대로 — 결론은 당신이 내려요.',
      svg: <FeatureIconB />,
    },
    {
      eyebrow: '03 · collect',
      title: '선택이 눈송이로 남아요',
      sub: '절약 하나하나가 세상에 하나뿐인 눈송이가 돼요. 계절마다 색이 다른 눈송이를 모아 나만의 사계절 도감을 완성해보세요.',
      svg: <FeatureIconC />,
    },
  ];
  return (
    <section id="features" style={{ background: L.surface, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="WHAT IT DOES" lead="pause · compare · collect." title="참지 않고 모으는 방법." />

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

        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 13.5, color: L.ink3 }}>
          그리고 든든한 도구들 — <span style={{ color: L.ink2, fontWeight: 600 }}>복리 시뮬레이터 · 금융 목표 · 저축 스케줄 · 주담대 비교</span>
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
  // snowflake — 눈송이 도감
  const arms = [0, 60, 120, 180, 240, 300];
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r="32" fill="none" stroke={L.accent} strokeWidth="1" strokeDasharray="3 4" />
      {arms.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 44 44)`}>
          <path d="M44 44 L44 18" stroke={L.accentDeep} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M44 26 L39 21 M44 26 L49 21" stroke={L.accentDeep} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <circle cx="44" cy="44" r="5" fill={L.iceLight} stroke={L.accentDeep} strokeWidth="1" />
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
            still want it?
          </div>
          <h2 className="landing-h2 on-dark">
            하루가 지나면,<br />
            <span className="font-italiana" style={{ fontWeight: 400, color: L.accent, letterSpacing: '-0.005em' }}>내일의 내</span>
            가 물어봐요.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 480 }}>
            참았다면 그 돈은 절약으로 굴러가고, 목표 도달일이 얼마나 당겨졌는지 즉시 보여드려요.
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

// Static "magic moment" phone — 쿨다운 종료, 내일의 내가 묻는 순간
function MicroMomentMockup() {
  return (
    <Phone bg="#F1F6FB">
      <SnowField count={10} color="rgba(125,180,221,0.28)" />
      <div style={{ position:'absolute', inset:0, paddingTop:70, paddingBottom:28, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ padding: '0 28px', textAlign: 'center', width: '100%' }}>
          <div style={{ animation:'pixel-pulse 2.5s ease-in-out infinite' }}>
            <Mascot size={120} palette="light" mood="happy" />
          </div>
          <div className="font-italiana" style={{ marginTop:18, fontSize:22, color:L.accentDeep, letterSpacing:'0.02em' }}>still want it?</div>
          <div style={{ marginTop:6, fontSize:22, fontWeight:700, color:L.ink, letterSpacing:'-0.02em', lineHeight:1.3 }}>
            하루가 지났어요.<br />아직도 갖고 싶으세요?
          </div>

          <div style={{ marginTop:20, padding:'16px 20px', background:'#FFFFFF', borderRadius:18, border:`1px solid ${L.line}`, textAlign:'left' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:42, height:42, borderRadius:12, background:'#db277715', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🎧</div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:L.ink }}>에어팟 프로 3세대</div>
                <div className="tnum" style={{ marginTop:2, fontSize:12.5, color:L.ink2, fontWeight:600 }}>329,000원</div>
              </div>
            </div>
            <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${L.lineSoft}`, fontSize:12, color:L.ink2, lineHeight:1.5 }}>
              참으면 10년 뒤 <span className="tnum" style={{ color:L.accentDeep, fontWeight:700 }}>약 65만원</span>이 될 수 있어요
            </div>
          </div>

          <div style={{ marginTop:16, display:'flex', gap:10 }}>
            <div style={{ flex:1, padding:'14px 0', borderRadius:14, background:L.ink, color:'#fff', fontSize:14, fontWeight:700 }}>
              참았어요 ❄️
            </div>
            <div style={{ flex:1, padding:'14px 0', borderRadius:14, background:'#FFFFFF', color:L.ink, fontSize:14, fontWeight:700, border:`1px solid ${L.line}` }}>
              샀어요
            </div>
          </div>
          <div style={{ marginTop:12, fontSize:11.5, color:L.ink3 }}>
            어느 쪽을 골라도 괜찮아요 — 실패가 아니니까요.
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
    { q: '눈덩이는 어떤 앱인가요?', a: '사고 싶은 게 생겼을 때 하루만 맡겨두는 소비 습관 앱입니다. 참는 게 아니라 시간을 두고 고르는 것 — 참았다면 절약으로, 샀다면 충분히 고민한 결정으로 남아요. 절약이 10년 뒤 어떻게 자라는지 보여주는 복리 시뮬레이터와 금융 목표 관리도 함께 제공합니다.' },
    { q: '소비를 못 하게 막는 앱인가요?', a: '아니요. 눈덩이는 소비를 막지 않습니다. 고민되는 소비를 1·3·7일 맡겨두고, 시간이 끝나면 다시 물어볼 뿐이에요. 사기로 했다면 그것도 충분히 고민한 좋은 결정으로 기록됩니다.' },
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
            hold on, snowball.
          </div>
          <h2 style={{ margin: 0, fontSize: 48, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            다음 충동구매,<br />눈덩이에 맡겨보세요.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 380 }}>
            가입 30초 · 고민 담기 10초 — 내일의 당신이 답해줄 거예요.
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
  const [showAbout, setShowAbout] = React.useState(false);

  return (
    <footer style={{ background: L.bg, padding: '60px 40px 36px', borderTop: `1px solid ${L.line}` }}>
      {showAbout && (
        <div
          onClick={() => setShowAbout(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(13,40,68,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 20, padding: 32, maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(13,40,68,0.15)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Mascot size={44} palette="light" mood="happy" shadow={false} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0D2844' }}>눈덩이</div>
                <div className="font-italiana" style={{ fontSize: 13, color: '#8AA0B7' }}>snowball.</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#506782', lineHeight: 1.75, marginBottom: 20 }}>
              눈덩이는 충동구매를 하루 맡아주고, 작은 절약의 복리 효과를 보여주는 소비 습관 앱입니다.<br />
              1인 풀스택으로 개발·운영합니다.
            </p>
            <div style={{ fontSize: 13, color: '#506782', lineHeight: 2 }}>
              <div>개발자&nbsp;&nbsp;<strong style={{ color: '#0D2844' }}>배진섭</strong></div>
              <div>이메일&nbsp;&nbsp;<a href="mailto:poxy1535@gmail.com" style={{ color: '#3F7AB0', textDecoration: 'none' }}>poxy1535@gmail.com</a></div>
            </div>
            <button
              onClick={() => setShowAbout(false)}
              style={{ marginTop: 24, width: '100%', padding: '13px 0', background: '#0D2844', color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >닫기</button>
          </div>
        </div>
      )}

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
            사기 전에 하루만 맡겨두세요. 오늘의 소비를 미래와 비교하는 소비 습관 플래너.
          </p>
        </div>
        <FooterCol title="제품" links={[
          ['기능', '#features'],
          ['다운로드', '#download'],
        ]} />
        <FooterCol title="회사" links={[
          ['개발자 소개', null, () => setShowAbout(true)],
          ['문의하기', 'mailto:poxy1535@gmail.com'],
        ]} />
        <FooterCol title="정책" links={[
          ['이용약관', 'terms.html'],
          ['개인정보처리방침', 'privacy.html'],
          ['계정 삭제 요청', 'delete-account.html'],
        ]} />
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
          const onClick = Array.isArray(l) ? l[2] : null;
          return (
            <li key={i}>
              {onClick ? (
                <button
                  onClick={onClick}
                  style={{ fontSize: 13, color: L.ink2, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
                >{label}</button>
              ) : (
                <a href={href || '#'} style={{ fontSize: 13, color: L.ink2, textDecoration: 'none' }}>{label}</a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Tagline, Features, MagicMoment, SimulatorShow, GoalsShow, FAQ, FinalCTA, Footer });
