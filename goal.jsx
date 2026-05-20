// goal.jsx — 목표 리스트 + 목표 상세 (A 톤 · Premium Ice)
// 두 화면을 같은 폰에 담아 흐름으로 보여준다 — 탭하면 상세 진입.

const GOAL = {
  bg: '#F1F6FB',
  surface: '#FFFFFF',
  ink: '#0D2844',
  ink2: '#506782',
  ink3: '#8AA0B7',
  line: 'rgba(13,40,68,0.08)',
  lineSoft: 'rgba(13,40,68,0.04)',
  accent: '#7DB4DD',
  accentDeep: '#3F7AB0',
  ice: '#B8D4E8',
  iceSoft: '#E6EEF7',
  good: '#3A9D7E',
  warn: '#D97757',
  housing: '#3F7AB0',
  retire: '#3A9D7E',
  emergency: '#D9A04E',
  car: '#6B73C0',
  travel: '#C97A5D',
  wedding: '#B6679E',
};

const GOAL_TYPE = {
  HOUSING: { label: '내집마련', short: '집', color: GOAL.housing },
  RETIREMENT: { label: '은퇴/FIRE', short: 'FIRE', color: GOAL.retire },
  EMERGENCY: { label: '비상금', short: '비상', color: GOAL.emergency },
  CAR: { label: '자동차', short: '차', color: GOAL.car },
  TRAVEL: { label: '여행', short: '여행', color: GOAL.travel },
  WEDDING: { label: '결혼', short: '결혼', color: GOAL.wedding },
};

const GOALS = [
  {
    id: 'g1',
    type: 'HOUSING',
    name: '내 집 마련 (전세 보증금)',
    saved: 41_300_000,
    target: 80_000_000,
    daysLeft: 423,
    monthly: 700_000,
    pct: 51.6,
    pinned: true,
  },
  {
    id: 'g2',
    type: 'EMERGENCY',
    name: '비상금',
    saved: 8_500_000,
    target: 10_000_000,
    daysLeft: 89,
    monthly: 300_000,
    pct: 85.0,
  },
  {
    id: 'g3',
    type: 'TRAVEL',
    name: '유럽 한 달 살기',
    saved: 1_200_000,
    target: 8_000_000,
    daysLeft: 247,
    monthly: 250_000,
    pct: 15.0,
  },
  {
    id: 'g4',
    type: 'RETIREMENT',
    name: 'FIRE — 5억',
    saved: 38_420_000,
    target: 500_000_000,
    daysLeft: 5847,
    monthly: 800_000,
    pct: 7.7,
  },
];

function GoalFlow() {
  const [view, setView] = React.useState('list'); // 'list' | 'detail'
  const [activeId, setActiveId] = React.useState('g1');
  const goal = GOALS.find((g) => g.id === activeId) || GOALS[0];

  return (
    <Phone bg={GOAL.bg}>
      <SnowField count={14} color="rgba(125,180,221,0.28)" />

      <div className={`phone-screen ${view === 'list' ? 'is-active' : ''}`}>
        <GoalList onOpen={(id) => { setActiveId(id); setView('detail'); }} />
      </div>
      <div className={`phone-screen ${view === 'detail' ? 'is-active' : ''}`}>
        <GoalDetail goal={goal} onBack={() => setView('list')} />
      </div>
    </Phone>
  );
}

// ──────────────────────────────────────────────────────────
// GOAL LIST
// ──────────────────────────────────────────────────────────
function GoalList({ onOpen }) {
  const total = GOALS.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = GOALS.reduce((sum, g) => sum + g.target, 0);

  return (
    <>
      {/* Header */}
      <div
        style={{
          position: 'absolute', top: 60, left: 0, right: 0, zIndex: 5,
          padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 10.5, color: GOAL.ink3, letterSpacing: '0.18em', fontWeight: 600 }}>GOALS</div>
          <div className="font-italiana" style={{ fontSize: 20, color: GOAL.ink, letterSpacing: '0.02em' }}>your dreams.</div>
        </div>
        <button
          style={{
            padding: '7px 12px', height: 32, borderRadius: 999, background: GOAL.ink,
            color: '#fff', border: 'none', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          새 목표
        </button>
      </div>

      <div style={{ position: 'absolute', inset: 0, paddingTop: 110, paddingBottom: 28, overflow: 'auto' }}>
        {/* HERO summary */}
        <div style={{ padding: '0 24px', textAlign: 'center' }}>
          <div className="font-italiana" style={{ fontSize: 14, color: GOAL.ink3, letterSpacing: '0.04em' }}>
            saved across {GOALS.length} goals
          </div>
          <div className="tnum" style={{ fontSize: 36, fontWeight: 700, color: GOAL.ink, letterSpacing: '-0.03em', marginTop: 4, lineHeight: 1.1 }}>
            {formatAmt(total)}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: GOAL.ink3 }}>
            of <span className="tnum">{formatAmt(totalTarget)}</span> · {Math.round((total / totalTarget) * 100)}%
          </div>

          {/* Stacked bar */}
          <div style={{ marginTop: 20, height: 8, background: GOAL.iceSoft, borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
            {GOALS.map((g) => {
              const w = (g.saved / totalTarget) * 100;
              const t = GOAL_TYPE[g.type];
              return <div key={g.id} style={{ width: w + '%', background: t.color }} />;
            })}
          </div>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {GOALS.map((g) => {
              const t = GOAL_TYPE[g.type];
              return (
                <span key={g.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: GOAL.ink3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: t.color }} />
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '28px 24px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: GOAL.ink3, letterSpacing: '0.05em' }}>
            in progress · {GOALS.length}
          </span>
          <span style={{ flex: 1, height: 1, background: GOAL.line }} />
          <button style={{ fontSize: 11, color: GOAL.accentDeep, fontWeight: 600, background: 'none', border: 'none' }}>
            마감 임박순 ↓
          </button>
        </div>

        {/* Goal cards */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GOALS.map((g) => (
            <GoalCard key={g.id} goal={g} onClick={() => onOpen(g.id)} />
          ))}
        </div>

        {/* Empty CTA */}
        <div style={{ padding: '24px 20px 0' }}>
          <button
            style={{
              width: '100%', padding: '16px',
              background: 'transparent',
              border: `1.5px dashed ${GOAL.line}`,
              borderRadius: 16,
              color: GOAL.ink2,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Pretendard Variable', Pretendard, system-ui",
              letterSpacing: '-0.01em',
            }}
          >
            + 새 목표 만들기
          </button>
        </div>
      </div>
    </>
  );
}

function GoalCard({ goal, onClick }) {
  const t = GOAL_TYPE[goal.type];
  const pct = goal.pct;
  return (
    <button
      onClick={onClick}
      style={{
        padding: 18, borderRadius: 18, background: GOAL.surface,
        border: `1px solid ${GOAL.line}`, textAlign: 'left',
        fontFamily: "'Pretendard Variable', Pretendard, system-ui",
        color: GOAL.ink, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 10,
        position: 'relative',
      }}
    >
      {goal.pinned && (
        <span
          style={{
            position: 'absolute', top: -6, right: 14, height: 18, padding: '0 8px',
            background: GOAL.ink, color: '#fff',
            fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em',
            display: 'flex', alignItems: 'center', borderRadius: 4,
          }}
        >
          PINNED
        </span>
      )}
      {/* Top row: type tag + d-day */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 10.5, fontWeight: 700, color: t.color, letterSpacing: '0.1em',
            padding: '4px 10px', background: t.color + '15', borderRadius: 999,
          }}
        >
          {t.label.toUpperCase()}
        </span>
        <span style={{ fontSize: 11, color: GOAL.ink3, fontWeight: 600 }}>
          D-{goal.daysLeft.toLocaleString()}
        </span>
      </div>

      {/* Goal name */}
      <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
        {goal.name}
      </div>

      {/* Amount line */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="tnum" style={{ fontSize: 20, fontWeight: 700, color: GOAL.ink, letterSpacing: '-0.02em' }}>
          {formatAmt(goal.saved)}
        </span>
        <span style={{ fontSize: 12, color: GOAL.ink3 }}>
          / {formatAmt(goal.target)}
        </span>
        <span className="font-italiana" style={{ marginLeft: 'auto', fontSize: 18, color: t.color, letterSpacing: '0.01em' }}>
          {pct.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 5, background: GOAL.iceSoft, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: t.color, borderRadius: 999 }} />
      </div>
    </button>
  );
}

// ──────────────────────────────────────────────────────────
// GOAL DETAIL
// ──────────────────────────────────────────────────────────
function GoalDetail({ goal, onBack }) {
  const t = GOAL_TYPE[goal.type];
  const remaining = goal.target - goal.saved;
  const monthsLeft = Math.ceil(remaining / goal.monthly);
  const onTrack = monthsLeft * 30 <= goal.daysLeft;

  // Trajectory: 12 months of accumulation rendering
  const points = React.useMemo(() => {
    const arr = [];
    let cum = goal.saved;
    arr.push({ m: 0, v: cum, real: true });
    for (let i = 1; i <= 12; i++) {
      cum += goal.monthly;
      arr.push({ m: i, v: cum, real: false });
    }
    return arr;
  }, [goal]);

  return (
    <>
      {/* Header */}
      <div
        style={{
          position: 'absolute', top: 60, left: 0, right: 0, zIndex: 5,
          padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: 12, background: GOAL.surface,
            border: `1px solid ${GOAL.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOAL.ink} strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10.5, color: GOAL.ink3, letterSpacing: '0.18em', fontWeight: 600 }}>GOAL</div>
          <div className="font-italiana" style={{ fontSize: 14, color: GOAL.ink, letterSpacing: '0.02em' }}>{t.label}</div>
        </div>
        <button
          style={{
            width: 36, height: 36, borderRadius: 12, background: GOAL.surface,
            border: `1px solid ${GOAL.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOAL.ink} strokeWidth="2">
            <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      <div style={{ position: 'absolute', inset: 0, paddingTop: 110, paddingBottom: 96, overflow: 'auto' }}>
        {/* HERO: goal name + ring */}
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: GOAL.ink, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            {goal.name}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: GOAL.ink3 }}>
            D-{goal.daysLeft.toLocaleString()} · 약 {Math.ceil(goal.daysLeft / 30)}개월 후
          </div>

          {/* Ring */}
          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
            <GoalRing pct={goal.pct} color={t.color} />
          </div>

          {/* Amount under ring */}
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 6 }}>
            <span className="tnum" style={{ fontSize: 28, fontWeight: 700, color: GOAL.ink, letterSpacing: '-0.03em' }}>
              {formatAmt(goal.saved)}
            </span>
            <span style={{ fontSize: 13, color: GOAL.ink3 }}>
              / {formatAmt(goal.target)}
            </span>
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: GOAL.ink3 }}>
            남은 금액 · <span className="tnum">{formatAmt(remaining)}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '28px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: GOAL.ink3, letterSpacing: '0.05em' }}>
            pace
          </span>
          <span style={{ flex: 1, height: 1, background: GOAL.line }} />
          <span
            style={{
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em',
              color: onTrack ? GOAL.good : GOAL.warn,
              padding: '4px 10px',
              background: (onTrack ? GOAL.good : GOAL.warn) + '15',
              borderRadius: 999,
            }}
          >
            {onTrack ? 'ON TRACK' : 'BEHIND'}
          </span>
        </div>

        {/* Trajectory bars */}
        <div style={{ margin: '0 20px', padding: 18, background: GOAL.surface, borderRadius: 18, border: `1px solid ${GOAL.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span className="font-italiana" style={{ fontSize: 14, color: GOAL.ink, letterSpacing: '0.02em' }}>
              monthly · {(goal.monthly / 10000).toFixed(0)}만원
            </span>
            <span style={{ fontSize: 11, color: GOAL.ink3 }}>
              앞으로 {monthsLeft}개월 필요
            </span>
          </div>
          <GoalTrajectory points={points} target={goal.target} color={t.color} />
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '28px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: GOAL.ink3, letterSpacing: '0.05em' }}>
            recent · 4
          </span>
          <span style={{ flex: 1, height: 1, background: GOAL.line }} />
        </div>

        {/* Recent contributions list */}
        <div style={{ margin: '0 20px', background: GOAL.surface, borderRadius: 18, border: `1px solid ${GOAL.line}`, overflow: 'hidden' }}>
          <ContribRow date="5월 14일" label="자동 저축" amount={700000} />
          <ContribRow date="5월 8일" label="커피값 절약" amount={4500} micro />
          <ContribRow date="5월 5일" label="구독 해지 환급" amount={12000} micro />
          <ContribRow date="4월 14일" label="자동 저축" amount={700000} last />
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 28, display: 'flex', gap: 8 }}>
        <button
          style={{
            width: 50, height: 50, borderRadius: 14, background: GOAL.surface,
            border: `1px solid ${GOAL.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOAL.ink} strokeWidth="1.6">
            <path d="M11 5h-7a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <PrimaryCTA theme="navy">+ 저축 기록 추가</PrimaryCTA>
        </div>
      </div>
    </>
  );
}

function GoalRing({ pct, color, size = 150, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (pct / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={GOAL.iceSoft} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Mascot size={70} palette="light" mood="happy" shadow={false} />
        <div className="font-italiana" style={{ fontSize: 22, color: GOAL.ink, marginTop: 2, letterSpacing: '0.02em' }}>
          {pct.toFixed(0)}<span style={{ fontSize: 14, color: GOAL.ink3 }}>%</span>
        </div>
      </div>
    </div>
  );
}

function GoalTrajectory({ points, target, color }) {
  const maxY = Math.max(target, points[points.length - 1].v) * 1.05;
  const w = 300, h = 110, pad = { t: 8, b: 18, l: 0, r: 4 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const px = (i) => pad.l + (i / (points.length - 1)) * innerW;
  const py = (v) => pad.t + innerH - (v / maxY) * innerH;
  const barW = innerW / points.length - 4;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {/* target line */}
      <line x1="0" y1={py(target)} x2={w} y2={py(target)} stroke={GOAL.line} strokeDasharray="3 4" />
      <text x={w - 4} y={py(target) - 4} fontSize="9" fill={GOAL.ink3} textAnchor="end" fontFamily="Pretendard">목표</text>

      {points.map((p, i) => {
        const top = py(p.v);
        const bottom = pad.t + innerH;
        return (
          <g key={i}>
            <rect
              x={px(i) - barW / 2}
              y={top}
              width={barW}
              height={bottom - top}
              fill={p.real ? color : color}
              opacity={p.real ? 1 : 0.28}
              rx="2"
            />
            {i % 2 === 0 && (
              <text x={px(i)} y={h - 4} fontSize="8" fill={GOAL.ink3} textAnchor="middle" fontFamily="Pretendard">
                {p.m === 0 ? '오늘' : `+${p.m}m`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ContribRow({ date, label, amount, last, micro }) {
  return (
    <div
      style={{
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: last ? 'none' : `1px solid ${GOAL.lineSoft}`,
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 8, background: micro ? GOAL.iceSoft : GOAL.ink + '0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
        {micro ? '✨' : '💧'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: GOAL.ink }}>{label}</div>
        <div style={{ fontSize: 10.5, color: GOAL.ink3, marginTop: 1 }}>{date}</div>
      </div>
      <span className="tnum" style={{ fontSize: 14, fontWeight: 700, color: GOAL.good, letterSpacing: '-0.01em' }}>
        +{amount.toLocaleString()}
      </span>
    </div>
  );
}

Object.assign(window, { GoalFlow });
