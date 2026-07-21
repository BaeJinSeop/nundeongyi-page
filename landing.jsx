// landing.jsx — 눈덩이 랜딩 페이지 (2026-07 전체 리뉴얼)
// 내러티브: 사기 전에 하루만 맡겨두세요 — 담다 → 기다리다 → 답하다 → 눈송이로 남다

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
  // 시즌 눈송이 팔레트
  spring: '#E08FA9',
  summer: '#4FB39F',
  autumn: '#D9A04E',
  winter: '#7DB4DD',
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
          { label: 'how it works', href: '#how' },
          { label: 'echo', href: '#echo' },
          { label: 'collect', href: '#collect' },
          { label: 'tools', href: '#tools' },
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
// HERO — 센터 스테이지
// ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: L.bg }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        <SnowField count={24} color="rgba(125,180,221,0.5)" />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1080, margin: '0 auto', padding: '150px 24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, textTransform: 'uppercase', marginBottom: 26 }}>
          mindful spending · snowball planner
        </div>
        <h1 className="landing-h1">
          사기 전에,<br />
          <span className="font-italiana" style={{ fontWeight: 400, letterSpacing: '-0.005em', color: L.accentDeep }}>
            하루만
          </span>
          {' '}맡겨두세요.
        </h1>
        <p className="landing-lead" style={{ margin: '28px auto 0', maxWidth: 560, fontSize: 'clamp(15px, 1.6vw, 18px)', color: L.ink2, lineHeight: 1.65 }}>
          참으라고 하지 않아요. 눈덩이에 맡겨두면 내일의 내가 다시 물어봐요 —
          내일도 필요하면 그때 사도 늦지 않으니까요.
        </p>

        <div style={{ marginTop: 34, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <StoreBadge kind="apple" where="hero" />
          <StoreBadge kind="google" where="hero" />
        </div>

        {/* Phone stage */}
        <div style={{ position: 'relative', marginTop: 64, display: 'flex', justifyContent: 'center', paddingBottom: 0 }}>
          {/* halo */}
          <div style={{
            position: 'absolute', width: 560, height: 560, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(125,180,221,0.35), transparent 65%)',
            left: '50%', top: '55%', transform: 'translate(-50%, -50%)', maxWidth: '100%',
          }} />

          {/* floating mascot */}
          <div className="hero-float" style={{ position: 'absolute', top: -18, left: 'calc(50% - 300px)', zIndex: 5, animation: 'slow-float 4s ease-in-out infinite' }}>
            <Mascot size={120} palette="light" mood="happy" />
          </div>

          {/* quote badge */}
          <div className="hero-float" style={{
            position: 'absolute', top: 130, left: 'calc(50% + 170px)', zIndex: 6,
            padding: '14px 18px', background: L.surface, borderRadius: 16,
            border: `1px solid ${L.line}`, boxShadow: '0 12px 28px rgba(13,40,68,0.10)',
            maxWidth: 220, transform: 'rotate(2deg)', textAlign: 'left',
          }}>
            <div className="font-italiana" style={{ fontSize: 14, color: L.accentDeep, lineHeight: 1, letterSpacing: '0.02em' }}>hold on.</div>
            <div style={{ marginTop: 4, fontSize: 12, color: L.ink, fontWeight: 700, lineHeight: 1.4 }}>
              "에어팟, 내일 다시 물어볼게요 <span style={{ color: L.accentDeep }}>D-1</span>"
            </div>
          </div>

          {/* device — 하단을 살짝 잘라 다음 섹션으로 이어지는 느낌 */}
          <div style={{ position: 'relative', zIndex: 2, transform: 'rotate(-2deg)', boxShadow: '0 40px 80px rgba(13,40,68,0.18)', borderRadius: 44, marginBottom: -140 }}>
            <ConsiderationMockup />
          </div>
        </div>
      </div>

      {/* fade into next section */}
      <div style={{ position: 'relative', zIndex: 3, height: 180, background: `linear-gradient(to bottom, transparent, ${L.surface})` }} />
    </section>
  );
}

function StoreBadge({ kind, where }) {
  const track = () => {
    if (typeof gtag === 'function') {
      gtag('event', 'store_click', { platform: kind, location: where || 'unknown' });
    }
  };
  if (kind === 'apple') {
    return (
      <a
        href="https://apps.apple.com/app/id6778849270"
        target="_blank"
        rel="noopener noreferrer"
        onClick={track}
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
      onClick={track}
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

// ──────────────────────────────────────────────────────────
// EMPATHY — 새벽의 장바구니
// ──────────────────────────────────────────────────────────
function Empathy() {
  const bubbles = [
    { who: 'me', time: '새벽 1:24', text: '이건 진짜 사야 해... 🛒' },
    { who: 'snowball', time: '눈덩이', text: '좋아 보여요! 일단 하루만 맡겨둘까요?' },
    { who: 'me', time: '다음날 저녁 8:02', text: '어… 생각해보니 지난달에 산 거랑 똑같네' },
  ];
  return (
    <section style={{ background: L.surface, padding: 'clamp(70px, 9vw, 110px) 24px 0' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.ink3, marginBottom: 18 }}>
          WE'VE ALL BEEN THERE
        </div>
        <p className="landing-tagline">
          장바구니에 담을 때의 나와,<br />
          <span style={{ color: L.accentDeep }}>하루 뒤의 나는 생각이 달라요.</span>
        </p>

        {/* chat strip */}
        <div style={{ margin: '48px auto 0', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left', paddingBottom: 'clamp(70px, 9vw, 110px)' }}>
          {bubbles.map((b, i) => {
            const mine = b.who === 'me';
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: 10.5, color: L.ink3, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {!mine && <Mascot size={18} palette="light" mood="happy" shadow={false} />}
                  {b.time}
                </div>
                <div style={{
                  padding: '12px 16px', borderRadius: mine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: mine ? L.iceLight : L.bg,
                  border: `1px solid ${mine ? L.ice : L.line}`,
                  fontSize: 14, color: L.ink, fontWeight: 500, lineHeight: 1.5, maxWidth: 300,
                }}>
                  {b.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// HOW IT WORKS — 담다 · 기다리다 · 답하다
// ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      eyebrow: '01 · 담다',
      title: '고민을 눈덩이에',
      sub: '살까 말까 고민되는 순간, 10초면 담아둘 수 있어요. 기다릴 시간은 1·3·7일 중에서 고르세요.',
      visual: <StepVisualAdd />,
    },
    {
      eyebrow: '02 · 기다리다',
      title: '그동안 잊고 지내세요',
      sub: '쿨다운 동안 눈덩이가 대신 기억해요. 이 돈이 10년 뒤 얼마가 될 수 있는지도 미리 보여드려요.',
      visual: <StepVisualWait />,
    },
    {
      eyebrow: '03 · 답하다',
      title: '내일의 내가 답해요',
      sub: '시간이 끝나면 다시 물어봐요. 참았다면 절약으로, 샀다면 충분히 고민한 결정으로 — 어느 쪽도 실패가 아니에요.',
      visual: <StepVisualDecide />,
    },
  ];
  return (
    <section id="how" style={{ background: L.bg, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="HOW IT WORKS" lead="hold · wait · answer." title="참지 않고 모으는 방법." center />

        <div className="features-grid" style={{ marginTop: 56 }}>
          {steps.map((s, i) => (
            <article
              key={i}
              style={{
                padding: '32px 28px',
                background: L.surface, borderRadius: 22, border: `1px solid ${L.line}`,
                display: 'flex', flexDirection: 'column', gap: 18,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ height: 132, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.visual}</div>
              <div className="font-italiana" style={{ fontSize: 13, color: L.accentDeep, letterSpacing: '0.04em' }}>
                {s.eyebrow}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: L.ink, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 14, color: L.ink2, lineHeight: 1.65 }}>{s.sub}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// step 1 — 고민 담기 미니 카드
function StepVisualAdd() {
  return (
    <div style={{ width: '100%', maxWidth: 250, padding: '14px 16px', background: L.bg, borderRadius: 16, border: `1px solid ${L.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#db277715', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🎧</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: L.ink }}>에어팟 프로 3세대</div>
          <div className="tnum" style={{ fontSize: 11.5, color: L.ink2, fontWeight: 600 }}>329,000원</div>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
        {[['1일', false], ['3일', false], ['7일', true]].map(([d, on]) => (
          <span key={d} style={{
            flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 999, fontSize: 11.5, fontWeight: 700,
            background: on ? L.ink : '#FFFFFF', color: on ? '#fff' : L.ink2, border: `1px solid ${on ? L.ink : L.line}`,
          }}>{d}</span>
        ))}
      </div>
    </div>
  );
}

// step 2 — 쿨다운 대기
function StepVisualWait() {
  return (
    <div style={{ width: '100%', maxWidth: 250, textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <Mascot size={54} palette="light" mood="happy" shadow={false} />
        <div style={{ padding: '6px 14px', borderRadius: 999, background: L.iceLight, border: `1px solid ${L.ice}`, color: L.accentDeep, fontSize: 15, fontWeight: 800 }}>
          D-2
        </div>
      </div>
      <div style={{ marginTop: 14, padding: '11px 14px', background: L.bg, borderRadius: 12, border: `1px solid ${L.line}`, fontSize: 12, color: L.ink2, lineHeight: 1.5 }}>
        참으면 10년 뒤 <span className="tnum" style={{ color: L.accentDeep, fontWeight: 700 }}>약 65만원</span>
      </div>
    </div>
  );
}

// step 3 — 결정 버튼
function StepVisualDecide() {
  return (
    <div style={{ width: '100%', maxWidth: 250 }}>
      <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: L.ink, marginBottom: 12 }}>
        아직도 갖고 싶으세요?
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: 12, background: L.ink, color: '#fff', fontSize: 12.5, fontWeight: 700 }}>
          참았어요 ❄️
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: 12, background: '#FFFFFF', color: L.ink, fontSize: 12.5, fontWeight: 700, border: `1px solid ${L.line}` }}>
          샀어요
        </div>
      </div>
      <div style={{ marginTop: 10, textAlign: 'center', fontSize: 11, color: L.ink3 }}>
        어느 쪽도 실패가 아니에요
      </div>
    </div>
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

// ──────────────────────────────────────────────────────────
// DECISION MOMENT — navy narrative + 결정 목업
// ──────────────────────────────────────────────────────────
function DecisionMoment() {
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
// ECHO — 혼자 하는 절약 모임 (1.2.0 에코 커뮤니티)
// ──────────────────────────────────────────────────────────
function EchoCard({ color, seed, tag, text, cheers }) {
  return (
    <div style={{ padding: '14px 16px', background: L.surface, borderRadius: 16, border: `1px solid ${L.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Snowflake size={28} color={color} seed={seed} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color }}>{tag}</span>
        <span className="tnum" style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: L.accentDeep }}>❄️ {cheers}</span>
      </div>
      <div style={{ marginTop: 10, fontSize: 13.5, color: L.ink, lineHeight: 1.55 }}>{text}</div>
    </div>
  );
}

function Echo() {
  return (
    <section id="echo" style={{ background: L.bg, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div className="landing-section-2col">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, marginBottom: 16 }}>
            ECHO COMMUNITY
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
            alone, together,
          </div>
          <h2 className="landing-h2">
            참는 건 혼자,<br />응원은 함께 와요.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: L.ink2, lineHeight: 1.65, maxWidth: 480 }}>
            참아낸 순간에 익명 한마디를 남겨보세요. 같은 걸 참고 있는 누군가의
            이야기가 눈송이처럼 도착해요. 팔로우도, 댓글도, 비교도 없이 —
            조용한 응원만 오가는 혼자 하는 절약 모임이에요.
          </p>

          <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['익명 눈송이', '이름도 프로필도 없이, 오늘의 눈송이로만'],
              ['나눈 만큼 도착', '한마디를 나눈 기록에만 다른 사람의 에코가 와요'],
              ['타임캡슐', '참는 밤 내일의 나에게 쓴 한 줄, 결정의 순간에 개봉'],
              ['절약 날씨', '오늘 모두가 함께 참은 만큼 눈이 내려요'],
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

        {/* 도착한 에코 카드 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 420, padding: '26px 24px',
            background: L.iceLight, borderRadius: 26, border: `1px solid ${L.line}`,
            boxShadow: '0 30px 60px rgba(13,40,68,0.10)', transform: 'rotate(-1.5deg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: L.ink3 }}>ECHOES FOR YOU</div>
                <div className="font-italiana" style={{ fontSize: 22, color: L.ink, marginTop: 3 }}>for you.</div>
              </div>
              <div style={{ padding: '5px 11px', background: L.surface, borderRadius: 999, border: `1px solid ${L.line}`, fontSize: 11.5, fontWeight: 700, color: L.accentDeep }}>
                오늘의 절약 날씨 ❄️ 함박눈
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <EchoCard color={L.winter} seed={0} tag="카페" cheers={12}
                text="퇴근길 카페 그냥 지나쳤어요. 집 커피도 나쁘지 않네요." />
              <EchoCard color={L.spring} seed={4} tag="쇼핑" cheers={21}
                text="새벽에 담아둔 장바구니, 아침엔 왜 사려 했는지 기억이 안 나요." />
              <EchoCard color={L.autumn} seed={3} tag="배달" cheers={9}
                text="오늘은 냉장고 파먹기 성공. 이 2만원, 10년 뒤엔 얼마가 될까요?" />
            </div>

            {/* 타임캡슐 */}
            <div style={{ marginTop: 12, padding: '13px 16px', background: L.surface, borderRadius: 16, border: `1.5px dashed ${L.ice}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: L.accentDeep }}>🕰 타임캡슐 — 내일의 나에게</span>
                <span style={{ fontSize: 10.5, color: L.ink3, fontWeight: 600 }}>내일 아침 도착</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: L.ink2, lineHeight: 1.5, fontStyle: 'italic' }}>
                "이거 없어도 아무 일 안 생겨. 내일의 네가 고마워할 거야."
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 11, color: L.ink3, textAlign: 'center' }}>
              에코는 한마디를 나눈 사람에게만 도착해요 — 주고받는 응원.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// COLLECT — 눈송이 도감 (시즌 컬렉션)
// ──────────────────────────────────────────────────────────
function Snowflake({ size = 56, color = '#7DB4DD', seed = 0 }) {
  // 결정형 파라미터 — seed마다 가지 위치·길이가 달라 서로 다른 눈송이
  const b1 = 34 + (seed % 3) * 5;         // 안쪽 가지 위치 (중심으로부터 %)
  const b2 = 62 + (seed % 2) * 8;         // 바깥 가지 위치
  const blen = 9 + (seed % 4) * 2;        // 가지 길이
  const tip = seed % 2 === 0;             // 끝 장식 (점/다이아)
  const arms = [0, 60, 120, 180, 240, 300];
  const armEnd = 12;                       // 팔 끝 y (center 50 기준 위쪽)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {arms.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <path d={`M50 50 L50 ${armEnd}`} stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M50 ${b1} L${50 - blen} ${b1 - blen} M50 ${b1} L${50 + blen} ${b1 - blen}`} stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d={`M50 ${100 - b2} L${50 - blen * 0.7} ${100 - b2 - blen * 0.7} M50 ${100 - b2} L${50 + blen * 0.7} ${100 - b2 - blen * 0.7}`} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {tip
            ? <circle cx="50" cy={armEnd - 1} r="2.4" fill={color} />
            : <path d={`M50 ${armEnd - 5} L53 ${armEnd - 1} L50 ${armEnd + 3} L47 ${armEnd - 1} Z`} fill={color} />}
        </g>
      ))}
      <circle cx="50" cy="50" r="4.5" fill="#fff" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function Collect() {
  const seasons = [
    { name: '봄', en: 'spring', color: L.spring, seeds: [1, 4] },
    { name: '여름', en: 'summer', color: L.summer, seeds: [2, 7] },
    { name: '가을', en: 'autumn', color: L.autumn, seeds: [3, 6] },
    { name: '겨울', en: 'winter', color: L.winter, seeds: [0, 5] },
  ];
  return (
    <section id="collect" style={{ background: L.surface, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div className="landing-section-2col">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, marginBottom: 16 }}>
            SNOWFLAKE COLLECTION
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
            one of a kind,
          </div>
          <h2 className="landing-h2">
            당신의 선택이<br />눈송이로 남아요.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: L.ink2, lineHeight: 1.65, maxWidth: 480 }}>
            절약 하나하나가 세상에 하나뿐인 눈송이가 돼요. 금액이 클수록 더 화려하게,
            계절이 바뀌면 색도 달라져요. 봄의 벚꽃빛부터 겨울의 얼음빛까지 —
            나만의 사계절 도감을 완성해보세요.
          </p>

          <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['세상에 하나뿐', '기록마다 모양이 다른 결정 생성'],
              ['사계절 팔레트', '계절 따라 달라지는 색감'],
              ['도감 완성', '모을수록 채워지는 나의 겨울 왕국'],
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

        {/* 도감 카드 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 420, padding: '28px 26px',
            background: L.bg, borderRadius: 26, border: `1px solid ${L.line}`,
            boxShadow: '0 30px 60px rgba(13,40,68,0.10)', transform: 'rotate(1.5deg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: L.ink3 }}>MY COLLECTION</div>
                <div className="font-italiana" style={{ fontSize: 22, color: L.ink, marginTop: 3 }}>four seasons.</div>
              </div>
              <div className="tnum" style={{ fontSize: 12, color: L.ink3, fontWeight: 600 }}>23 / 48</div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {seasons.map((s) => (
                <div key={s.en} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: L.surface, borderRadius: 16, border: `1px solid ${L.line}` }}>
                  <div style={{ width: 52, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.name}</div>
                    <div className="font-italiana" style={{ fontSize: 11, color: L.ink3 }}>{s.en}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {s.seeds.map((seed) => (
                      <div key={seed} style={{ animation: seed % 2 ? 'slow-float 5s ease-in-out infinite' : 'none' }}>
                        <Snowflake size={46} color={s.color} seed={seed} />
                      </div>
                    ))}
                    {/* 미획득 실루엣 */}
                    <div style={{ opacity: 0.18 }}>
                      <Snowflake size={46} color={L.ink3} seed={s.seeds[0] + 2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// TOOLS — 든든한 도구들 (시뮬레이터 + 목표·저축·주담대)
// ──────────────────────────────────────────────────────────
function Tools() {
  const tools = [
    ['복리 시뮬레이터', '월 저축·수익률·기간을 슬라이더로 — 비관/기대/낙관을 한 화면에서'],
    ['금융 목표 역산', '목표 금액과 날짜를 넣으면 월 필요 저축액을 계산'],
    ['저축 스케줄', '적금·예금·청약을 등록하면 만기와 이자를 자동 추적'],
    ['주담대 비교', '체증식 vs 원리금균등, 손익분기 수익률까지 로컬 계산'],
  ];
  return (
    <section id="tools" style={{ background: L.bg, padding: 'clamp(80px, 10vw, 120px) 24px', borderTop: `1px solid ${L.line}` }}>
      <div className="landing-section-2col">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: 'rotate(-2deg)', boxShadow: '0 30px 60px rgba(13,40,68,0.15)', borderRadius: 44 }}>
            <SimEditorial />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: L.accentDeep, marginBottom: 16 }}>
            AND SOLID TOOLS
          </div>
          <div className="font-italiana" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: L.accentDeep, letterSpacing: '0.02em', marginBottom: 10 }}>
            in 10 years,
          </div>
          <h2 className="landing-h2">
            절약한 돈이 굴러갈<br />자리도 준비돼 있어요.
          </h2>
          <p style={{ marginTop: 24, fontSize: 'clamp(14px, 1.4vw, 16px)', color: L.ink2, lineHeight: 1.65, maxWidth: 480 }}>
            참아낸 돈이 그냥 사라지지 않도록 — 목표에 연결하고, 미래로 굴려보고,
            계획대로 가고 있는지 확인하는 도구들이 함께 있어요.
          </p>

          <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tools.map(([k, v], i) => (
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
// FAQ
// ──────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: '눈덩이는 어떤 앱인가요?', a: '사고 싶은 게 생겼을 때 하루만 맡겨두는 소비 습관 앱입니다. 참는 게 아니라 시간을 두고 고르는 것 — 참았다면 절약으로, 샀다면 충분히 고민한 결정으로 남아요. 절약이 10년 뒤 어떻게 자라는지 보여주는 복리 시뮬레이터와 금융 목표 관리도 함께 제공합니다.' },
    { q: '소비를 못 하게 막는 앱인가요?', a: '아니요. 눈덩이는 소비를 막지 않습니다. 고민되는 소비를 1·3·7일 맡겨두고, 시간이 끝나면 다시 물어볼 뿐이에요. 사기로 했다면 그것도 충분히 고민한 좋은 결정으로 기록됩니다.' },
    { q: '무료인가요?', a: '핵심 기능은 모두 무료로 제공됩니다. 향후 고급 시나리오 비교, 무제한 목표 등 일부 기능은 프리미엄으로 제공될 예정입니다.' },
    { q: '내 금융 정보가 안전한가요?', a: '눈덩이는 계좌 정보를 직접 연결하지 않습니다. 직접 입력한 자산과 목표 정보만 저장하며, 모든 데이터는 암호화되어 전송됩니다.' },
    { q: '에코 커뮤니티에서 내가 누군지 드러나나요?', a: '아니요. 에코는 이름·프로필·팔로우가 없는 완전 익명이며, 눈송이 모양으로만 표시됩니다. 남길 수 있는 건 짧은 한마디뿐이고, 부적절한 내용은 자동 필터와 신고·차단 기능으로 관리됩니다. 한마디를 남길지는 매번 직접 선택할 수 있어요.' },
    { q: '어떤 OS에서 사용 가능한가요?', a: 'iOS 15 이상, Android 7.0 (API 24) 이상에서 사용 가능합니다.' },
    { q: '실제로 자산을 굴려주나요?', a: '아니요. 눈덩이는 자산 운용 상품을 판매하지 않습니다. 사용자가 직접 세운 시나리오와 목표를 추적하는 도구입니다.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ background: L.surface, padding: 'clamp(70px, 10vw, 120px) clamp(20px, 4vw, 40px)', borderTop: `1px solid ${L.line}` }}>
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
    <section id="download" style={{ background: L.bg2, padding: 'clamp(60px, 10vw, 120px) clamp(20px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px)', background: L.navy, borderRadius: 32, position: 'relative', overflow: 'hidden', color: '#fff' }}>
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
          <h2 style={{ margin: 0, fontSize: 'clamp(28px, 5.5vw, 48px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            다음 충동구매,<br />눈덩이에 맡겨보세요.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 380 }}>
            가입 30초 · 고민 담기 10초 — 내일의 당신이 답해줄 거예요.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StoreBadge kind="apple" where="final_cta" />
            <StoreBadge kind="google" where="final_cta" />
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
    <footer style={{ background: L.bg, padding: '60px clamp(20px, 4vw, 40px) 36px', borderTop: `1px solid ${L.line}` }}>
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

      <div className="footer-grid">
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
          ['사용법', '#how'],
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

Object.assign(window, { Nav, Hero, Empathy, HowItWorks, DecisionMoment, Collect, Tools, FAQ, FinalCTA, Footer });
