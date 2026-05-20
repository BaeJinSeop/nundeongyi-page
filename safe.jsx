// safe.jsx — V1 안전: Premium Ice
// 파라미터화: hero motif + 영문 폰트 조합을 변경 가능.
// 4가지 변형: A 기하 눈결정 + Italiana / B 매트 구체 + Cormorant /
//             C 라인 아트 + EB Garamond / D 타입 only + DM Serif

const SAFE = {
  bg: '#F1F6FB',
  surface: '#FFFFFF',
  ink: '#0D2844',
  ink2: '#506782',
  ink3: '#8AA0B7',
  line: 'rgba(13,40,68,0.08)',
  accent: '#7DB4DD',
  accentDeep: '#3F7AB0',
  ice: '#B8D4E8',
  iceSoft: '#E6EEF7',
  kakao: '#FEE500',
  kakaoText: '#1A1A1A',
  naver: '#03C75A',
};

// ──────────────────────────────────────────────────────────
// HERO MOTIFS — 모두 앱 마스코트 기반
// ──────────────────────────────────────────────────────────

// A — Hero solo. Big mascot front and centre.
function HeroSolo() {
  return (
    <div style={{ animation: 'slow-float 5s ease-in-out infinite' }}>
      <Mascot size={150} palette="light" mood="happy" />
    </div>
  );
}

// B — Mascot on a soft ice disc (premium plate).
function HeroDisc() {
  return (
    <div style={{ position: 'relative', width: 180, height: 180 }}>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="disc-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D6E6F2" />
          </radialGradient>
        </defs>
        <circle cx="90" cy="90" r="86" fill="none" stroke={SAFE.line} strokeWidth="0.5" strokeDasharray="2 5" />
        <circle cx="90" cy="90" r="72" fill="url(#disc-grad)" stroke={SAFE.accent} strokeWidth="0.5" opacity="0.95" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'slow-float 6s ease-in-out infinite' }}>
        <Mascot size={120} palette="light" mood="happy" shadow={false} />
      </div>
    </div>
  );
}

// C — Mascot trail: small to big — the "rolling and growing" story.
function HeroTrail() {
  return (
    <div style={{ width: 240, height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6 }}>
      {[36, 56, 86, 130].map((sz, i) => (
        <div key={i} style={{ opacity: 0.45 + i * 0.18 }}>
          <Mascot size={sz} palette="light" mood="happy" shadow={false} />
        </div>
      ))}
    </div>
  );
}

// D — Type-led. Mascot is small and sits inside the type.
function HeroTypeBadge({ font }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
      <Mascot size={72} palette="light" mood="happy" />
      <span
        className={font.italicClass}
        style={{
          fontSize: 110, lineHeight: 1, color: SAFE.ink,
          letterSpacing: '-0.05em',
          fontWeight: font.heroWeight,
        }}
      >
        S
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// FONT PRESETS — 4가지 영문 폰트 조합
// ──────────────────────────────────────────────────────────
const FONTS = {
  italiana: {
    regularClass: 'font-italiana',
    italicClass: 'font-italiana',
    heroSize: 56,
    heroTrack: '0.02em',
    heroWeight: 400,
    sub: '엘레강스 · 패션',
  },
  cormorant: {
    regularClass: 'font-cormorant',
    italicClass: 'font-cormorant-it',
    heroSize: 70,
    heroTrack: '-0.02em',
    heroWeight: 400,
    sub: '클래식 출판물',
  },
  ebgaramond: {
    regularClass: 'font-ebgaramond',
    italicClass: 'font-ebgaramond-it',
    heroSize: 64,
    heroTrack: '-0.01em',
    heroWeight: 500,
    sub: '에디토리얼',
  },
  dmserif: {
    regularClass: 'font-dmserif',
    italicClass: 'font-dmserif-it',
    heroSize: 64,
    heroTrack: '-0.025em',
    heroWeight: 400,
    sub: '굵고 임팩트',
  },
};

// ──────────────────────────────────────────────────────────
// PARAMETERIZED PROTOTYPE
// props: heroKind = 'flake' | 'sphere' | 'orbit' | 'letter'
//        fontKey  = 'italiana' | 'cormorant' | 'ebgaramond' | 'dmserif'
// ──────────────────────────────────────────────────────────
function SafePrototype({ heroKind = 'solo', fontKey = 'italiana' }) {
  const [screen, setScreen] = React.useState(0);
  const [asset, setAsset] = React.useState(35000000);
  const next = () => setScreen((s) => Math.min(s + 1, 3));
  const reset = () => setScreen(0);

  const font = FONTS[fontKey] || FONTS.italiana;

  const Hero =
    heroKind === 'solo' ? HeroSolo :
    heroKind === 'disc' ? HeroDisc :
    heroKind === 'trail' ? HeroTrail :
    () => <HeroTypeBadge font={font} />;

  return (
    <Phone bg={SAFE.bg}>
      <SnowField count={28} color="rgba(125,180,221,0.45)" />

      <div
        style={{
          position: 'absolute', top: 60, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', zIndex: 5,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: SAFE.ink3 }}>
          NUNDEONGYI
        </span>
        <button onClick={reset} style={{ background: 'none', border: 'none', padding: 0 }}>
          {screen === 3
            ? <span style={{ fontSize: 11, color: SAFE.ink3, letterSpacing: '0.05em' }}>↻ 처음으로</span>
            : <StepDots n={4} active={screen} theme="ice" />}
        </button>
      </div>

      <div style={{ position: 'absolute', inset: 0, paddingTop: 90, paddingBottom: 40 }}>
        <SafeWelcome active={screen === 0} onNext={next} Hero={Hero} font={font} />
        <SafeValue   active={screen === 1} onNext={next} font={font} />
        <SafeLogin   active={screen === 2} onNext={next} font={font} />
        <SafeAsset   active={screen === 3} onNext={reset} asset={asset} setAsset={setAsset} font={font} />
      </div>
    </Phone>
  );
}

// ─── Screen 0: Welcome ────────────────────────────────
function SafeWelcome({ active, onNext, Hero, font }) {
  return (
    <div className={`phone-screen ${active ? 'is-active' : ''}`} style={{ padding: '0 28px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 38 }}>
          <Hero />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            className={font.regularClass}
            style={{
              fontSize: font.heroSize,
              lineHeight: 0.95,
              color: SAFE.ink,
              letterSpacing: font.heroTrack,
              fontWeight: font.heroWeight,
            }}
          >
            Snowball<span style={{ color: SAFE.accent }}>.</span>
          </div>
          <div
            style={{
              marginTop: 14, fontSize: 17, fontWeight: 500,
              color: SAFE.ink, letterSpacing: '0.4em', paddingLeft: '0.4em',
            }}
          >
            눈 · 덩 · 이
          </div>
          <div
            style={{
              marginTop: 26, fontSize: 15, lineHeight: 1.6,
              color: SAFE.ink2, fontWeight: 400,
              maxWidth: 250, margin: '26px auto 0',
            }}
          >
            작은 눈 한 톨이<br />거대한 부가 된다.
          </div>
        </div>
      </div>

      <div style={{ padding: '0 0 20px' }}>
        <PrimaryCTA onClick={onNext} theme="navy">시작하기</PrimaryCTA>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: SAFE.ink3 }}>
          이미 계정이 있으신가요? <span style={{ color: SAFE.ink, fontWeight: 600 }}>로그인</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: Value ────────────────────────────────
function SafeValue({ active, onNext, font }) {
  return (
    <div className={`phone-screen ${active ? 'is-active' : ''}`} style={{ padding: '0 28px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 60 }}>
        <div className={font.italicClass} style={{ fontSize: 18, color: SAFE.accentDeep, marginBottom: 18, letterSpacing: '0.02em' }}>
          01 — accumulate
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.32, fontWeight: 700, color: SAFE.ink, letterSpacing: '-0.02em' }}>
          오늘 아낀 <span className={font.italicClass} style={{ fontWeight: 400, color: SAFE.accentDeep }}>커피 한 잔</span>이<br />
          내일의 <span className={font.italicClass} style={{ fontWeight: 400 }}>10년 뒤</span>를 바꿉니다.
        </div>
        <div style={{ marginTop: 32, fontSize: 14, lineHeight: 1.7, color: SAFE.ink2, maxWidth: 290 }}>
          마이크로 액션, 자동 시뮬레이션, 시나리오 비교까지 — 작은 절약이 미래 자산이 되는 과정을 한 화면에서.
        </div>
        {/* Mascot growth trail — replaces bar chart, ties to brand */}
        <div style={{ marginTop: 40, padding: '14px 12px 8px', background: SAFE.surface, borderRadius: 14, border: `1px solid ${SAFE.line}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: SAFE.ink3, marginBottom: 8 }}>
            EXPECTED · 10 YEARS
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            {[
              [24, '오늘'],
              [36, '+1y'],
              [56, '+3y'],
              [82, '+5y'],
              [110, '+10y'],
            ].map(([sz, label], i, arr) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ opacity: 0.5 + (i / (arr.length - 1)) * 0.5 }}>
                  <Mascot size={sz} palette="light" mood="happy" shadow={false} />
                </div>
                <span style={{ fontSize: 10, color: SAFE.ink3, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 0 20px' }}>
        <PrimaryCTA onClick={onNext} theme="navy">다음</PrimaryCTA>
      </div>
    </div>
  );
}

// ─── Screen 2: Login ────────────────────────────────
function SafeLogin({ active, onNext, font }) {
  return (
    <div className={`phone-screen ${active ? 'is-active' : ''}`} style={{ padding: '0 28px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 24 }}>
        <div style={{ marginBottom: 18 }}>
          <Mascot size={56} palette="light" mood="happy" />
        </div>
        <div className={font.italicClass} style={{ fontSize: 38, color: SAFE.ink, lineHeight: 1, marginBottom: 8, fontWeight: font.heroWeight }}>
          welcome.
        </div>
        <div style={{ fontSize: 14, color: SAFE.ink2, marginBottom: 28 }}>
          소셜 계정으로 빠르게 시작하세요
        </div>
        <SocialButton bg={SAFE.kakao} fg={SAFE.kakaoText} icon={<KakaoMark />} label="카카오로 시작하기" />
        <div style={{ height: 10 }} />
        <SocialButton bg={SAFE.naver} fg="#fff" icon={<span style={{ fontWeight: 800, fontSize: 17 }}>N</span>} label="네이버로 시작하기" />
        <div style={{ height: 10 }} />
        <SocialButton bg="#fff" fg={SAFE.ink} icon={<GoogleMark />} label="구글로 시작하기" border={`1px solid ${SAFE.line}`} />
        <div style={{ height: 10 }} />
        <SocialButton bg="transparent" fg={SAFE.ink} icon={null} label="이메일로 계속하기" onClick={onNext} border={`1px solid ${SAFE.line}`} />
        <div style={{ marginTop: 22, textAlign: 'center', fontSize: 10.5, lineHeight: 1.6, color: SAFE.ink3 }}>
          로그인 시 서비스 이용약관 및<br />개인정보처리방침에 동의한 것으로 간주됩니다.
        </div>
      </div>
    </div>
  );
}

function SocialButton({ bg, fg, icon, label, border, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', height: 50, borderRadius: 14, background: bg, color: fg,
        border: border || 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
      }}
    >
      {icon && <span style={{ display: 'inline-flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>{icon}</span>}
      {label}
    </button>
  );
}
function KakaoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M12 3C6.48 3 2 6.48 2 10.78c0 2.73 1.84 5.13 4.6 6.51l-.94 3.44c-.07.25.22.46.45.31l4.13-2.74c.58.07 1.16.11 1.76.11 5.52 0 10-3.48 10-7.63C22 6.48 17.52 3 12 3z" fill="currentColor"/>
    </svg>
  );
}
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.46-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.98v2.33A9 9 0 009 18z" fill="#34A853"/>
      <path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.98A9 9 0 000 9c0 1.45.35 2.83.98 4.05l2.99-2.33z" fill="#FBBC05"/>
      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.98 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Screen 3: Asset ────────────────────────────────
function SafeAsset({ active, onNext, asset, setAsset, font }) {
  const pct = (asset / 500000000) * 100;
  return (
    <div className={`phone-screen ${active ? 'is-active' : ''}`} style={{ padding: '0 28px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 6 }}>
        <div className={font.italicClass} style={{ fontSize: 14, color: SAFE.ink3, marginBottom: 6 }}>
          step 2 / 3
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: SAFE.ink, lineHeight: 1.3 }}>
          현재 보유 자산을<br />알려주세요
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: SAFE.ink2 }}>
          정확하지 않아도 괜찮아요. 언제든 수정할 수 있어요.
        </div>

        {/* Mascot grows with asset */}
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', height: 130, alignItems: 'flex-end' }}>
          <div style={{ transition: 'all .25s cubic-bezier(.2,.7,.3,1)' }}>
            <Mascot size={40 + (asset / 500000000) * 90} palette="light" mood={asset > 200000000 ? 'happy' : asset > 50000000 ? 'happy' : 'sleepy'} />
          </div>
        </div>

        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <div className={font.italicClass} style={{ fontSize: 13, color: SAFE.ink3, marginBottom: 6 }}>
            current asset
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: SAFE.ink, letterSpacing: '-0.03em' }} className="tnum">
            {formatKorean(asset)}
          </div>
          <div className="tnum" style={{ fontSize: 12, color: SAFE.ink3, marginTop: 4 }}>
            ₩ {asset.toLocaleString()}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <input
            type="range" min={0} max={500000000} step={1000000} value={asset}
            onChange={(e) => setAsset(Number(e.target.value))}
            className="ice-slider"
            style={{ '--p': pct + '%', '--fill': SAFE.accentDeep }}
          />
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: SAFE.ink3 }}>
            <span>0원</span>
            <span>5억원</span>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[['1000만', 10000000], ['3000만', 30000000], ['5000만', 50000000], ['1억', 100000000], ['2억', 200000000]].map(([label, v]) => (
            <button
              key={v}
              onClick={() => setAsset(v)}
              style={{
                background: asset === v ? SAFE.ink : SAFE.surface,
                color: asset === v ? '#fff' : SAFE.ink2,
                border: `1px solid ${asset === v ? SAFE.ink : SAFE.line}`,
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 0 20px' }}>
        <PrimaryCTA onClick={onNext} theme="navy">다음</PrimaryCTA>
      </div>
    </div>
  );
}

function formatKorean(n) {
  const eok = Math.floor(n / 100000000);
  const man = Math.floor((n % 100000000) / 10000);
  if (eok > 0 && man > 0) return `${eok}억 ${man.toLocaleString()}만원`;
  if (eok > 0) return `${eok}억원`;
  if (man > 0) return `${man.toLocaleString()}만원`;
  return '0원';
}

Object.assign(window, { SafePrototype });
