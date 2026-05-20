// simulator.jsx — 시뮬레이터 리뉴얼 (A 톤 · Premium Ice + 마스코트)
// 두 가지 구성:
//   A · Editorial — 차트가 hero. 입력은 미니멀 인라인. 결과는 잡지 페이지처럼.
//   B · Live — 슬라이더 움직이면 마스코트 + 숫자가 실시간 반응. 게이미피케이션 톤.

const SIM = {
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
  optimistic: '#3A9D7E',
  base: '#3F7AB0',
  pessimistic: '#C97A5D',
};

// ── Calc: yearly trajectory for 3 scenarios ──
function simulate(P, M, r, years) {
  // P = initial, M = monthly, r = annual return (decimal), years = int
  const out = [];
  let pess = P, base = P, opt = P;
  const rP = Math.max(r - 0.02, 0.005);
  const rO = r + 0.03;
  out.push({ y: 0, pessimistic: pess, base, optimistic: opt });
  for (let y = 1; y <= years; y++) {
    // FV formula stepwise: A_new = A_old*(1+r) + M*12
    pess = pess * (1 + rP) + M * 12;
    base = base * (1 + r) + M * 12;
    opt = opt * (1 + rO) + M * 12;
    out.push({ y, pessimistic: pess, base, optimistic: opt });
  }
  return out;
}

// ── Chart (SVG line + area) ──
function ChartSVG({ data, width = 320, height = 200, padding = { t: 12, r: 12, b: 22, l: 36 } }) {
  if (!data || data.length === 0) return null;
  const xs = data.map((d) => d.y);
  const ys = data.flatMap((d) => [d.pessimistic, d.base, d.optimistic]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMin = 0;
  const yMax = Math.max(...ys) * 1.08;

  const innerW = width - padding.l - padding.r;
  const innerH = height - padding.t - padding.b;
  const px = (v) => padding.l + ((v - xMin) / (xMax - xMin)) * innerW;
  const py = (v) => padding.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const path = (key) =>
    data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(d.y).toFixed(1)} ${py(d[key]).toFixed(1)}`)
      .join(' ');

  // Area between optimistic and pessimistic
  const upPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(d.y).toFixed(1)} ${py(d.optimistic).toFixed(1)}`).join(' ');
  const downPath = data
    .slice()
    .reverse()
    .map((d) => `L ${px(d.y).toFixed(1)} ${py(d.pessimistic).toFixed(1)}`)
    .join(' ');
  const areaPath = `${upPath} ${downPath} Z`;

  // Y axis gridlines (4 tiers)
  const tiers = 4;
  const yLines = Array.from({ length: tiers + 1 }, (_, i) => yMin + ((yMax - yMin) * i) / tiers);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SIM.accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={SIM.accent} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {yLines.map((v, i) => (
        <g key={i}>
          <line x1={padding.l} y1={py(v)} x2={width - padding.r} y2={py(v)} stroke={SIM.line} strokeWidth="0.5" />
          <text x={padding.l - 6} y={py(v)} fontSize="9" fill={SIM.ink3} textAnchor="end" alignmentBaseline="middle" fontFamily="Pretendard">
            {shortAmount(v)}
          </text>
        </g>
      ))}

      {/* x ticks */}
      {data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 5)) === 0 || i === data.length - 1).map((d) => (
        <text key={d.y} x={px(d.y)} y={height - 6} fontSize="9" fill={SIM.ink3} textAnchor="middle" fontFamily="Pretendard">
          {d.y}y
        </text>
      ))}

      {/* range area */}
      <path d={areaPath} fill="url(#area-grad)" />

      {/* lines */}
      <path d={path('optimistic')} fill="none" stroke={SIM.optimistic} strokeWidth="1.5" strokeLinecap="round" />
      <path d={path('pessimistic')} fill="none" stroke={SIM.pessimistic} strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
      <path d={path('base')} fill="none" stroke={SIM.base} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* end dot on base */}
      {data.length > 0 && (
        <>
          <circle cx={px(data[data.length - 1].y)} cy={py(data[data.length - 1].base)} r="3.5" fill={SIM.base} />
          <circle cx={px(data[data.length - 1].y)} cy={py(data[data.length - 1].base)} r="6" fill="none" stroke={SIM.base} strokeOpacity="0.25" />
        </>
      )}
    </svg>
  );
}

function shortAmount(v) {
  if (v >= 100000000) return `${(v / 100000000).toFixed(v >= 1000000000 ? 0 : 1)}억`;
  if (v >= 10000000) return `${(v / 100000000).toFixed(2)}억`;
  if (v >= 10000) return `${Math.round(v / 10000)}만`;
  if (v === 0) return '0';
  return Math.round(v).toLocaleString();
}

function formatAmt(n) {
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000);
    const man = Math.floor((n % 100000000) / 10000);
    if (man > 1000) return `${eok}억 ${Math.round(man / 1000) * 1000 / 10000 % 1 === 0 ? Math.round(man/1000) + '천만' : (man/10000).toFixed(1) + '천만'}`;
    if (man > 0) return `${eok}억 ${man.toLocaleString()}만`;
    return `${eok}억원`;
  }
  if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만원`;
  return `${Math.round(n).toLocaleString()}원`;
}

// ──────────────────────────────────────────────────────────
// A · EDITORIAL — 차트가 hero
// ──────────────────────────────────────────────────────────
function SimEditorial() {
  const [initial, setInitial] = React.useState(38_420_000);
  const [monthly, setMonthly] = React.useState(500_000);
  const [rate, setRate] = React.useState(0.05);
  const [years, setYears] = React.useState(10);

  const data = React.useMemo(() => simulate(initial, monthly, rate, years), [initial, monthly, rate, years]);
  const last = data[data.length - 1];

  return (
    <Phone bg={SIM.bg}>
      <SnowField count={14} color="rgba(125,180,221,0.3)" />

      {/* Header */}
      <div
        style={{
          position: 'absolute', top: 60, left: 0, right: 0, zIndex: 5,
          padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            style={{
              width: 36, height: 36, borderRadius: 12, background: SIM.surface,
              border: `1px solid ${SIM.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIM.ink} strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <div style={{ fontSize: 10.5, color: SIM.ink3, letterSpacing: '0.18em', fontWeight: 600 }}>SIMULATOR</div>
            <div className="font-italiana" style={{ fontSize: 18, color: SIM.ink, letterSpacing: '0.02em' }}>future asset</div>
          </div>
        </div>
        <button
          style={{
            padding: '7px 12px', height: 32, borderRadius: 999, background: SIM.surface,
            border: `1px solid ${SIM.line}`, fontSize: 12, fontWeight: 600, color: SIM.ink,
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          저장
        </button>
      </div>

      <div style={{ position: 'absolute', inset: 0, paddingTop: 110, paddingBottom: 28, overflow: 'auto' }}>
        {/* HERO: expected final amount */}
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <div className="font-italiana" style={{ fontSize: 14, color: SIM.ink3, letterSpacing: '0.04em' }}>
            in {years} years, expected
          </div>
          <div className="tnum" style={{ fontSize: 42, fontWeight: 700, color: SIM.ink, letterSpacing: '-0.03em', marginTop: 4, lineHeight: 1.1 }}>
            {formatAmt(last.base)}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: SIM.ink3 }}>
            ↑ <span className="tnum">{formatAmt(last.optimistic)}</span>
            <span style={{ margin: '0 8px', color: SIM.line }}>·</span>
            ↓ <span className="tnum">{formatAmt(last.pessimistic)}</span>
          </div>
        </div>

        {/* CHART */}
        <div style={{ margin: '20px 14px 0', padding: '12px 6px', background: SIM.surface, borderRadius: 18, border: `1px solid ${SIM.line}` }}>
          <ChartSVG data={data} width={332} height={196} />
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, paddingBottom: 4, marginTop: 2 }}>
            <Legend color={SIM.optimistic} label="낙관" />
            <Legend color={SIM.base} label="기대" thick />
            <Legend color={SIM.pessimistic} label="비관" dashed />
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: SIM.ink3, letterSpacing: '0.05em' }}>
            inputs · 4
          </span>
          <span style={{ flex: 1, height: 1, background: SIM.line }} />
          <button style={{ fontSize: 11, color: SIM.accentDeep, fontWeight: 600, background: 'none', border: 'none' }}>
            ↻ 기본값
          </button>
        </div>

        {/* INPUTS — minimal stacked */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InputRow
            label="초기 자산"
            value={formatAmt(initial)}
            slider={{ min: 0, max: 200_000_000, step: 1_000_000, value: initial, onChange: setInitial }}
          />
          <InputRow
            label="월 저축액"
            value={`${(monthly / 10000).toFixed(0)}만원`}
            slider={{ min: 100_000, max: 3_000_000, step: 50_000, value: monthly, onChange: setMonthly }}
          />
          <InputRow
            label="예상 수익률"
            value={`연 ${(rate * 100).toFixed(1)}%`}
            slider={{ min: 0.01, max: 0.12, step: 0.001, value: rate, onChange: setRate }}
          />
          <InputRow
            label="운용 기간"
            value={`${years}년`}
            slider={{ min: 1, max: 30, step: 1, value: years, onChange: setYears }}
          />
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '28px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: SIM.ink3, letterSpacing: '0.05em' }}>
            outcomes
          </span>
          <span style={{ flex: 1, height: 1, background: SIM.line }} />
        </div>

        {/* OUTCOMES — three rows like a print table */}
        <div style={{ margin: '0 20px', padding: '4px 0', background: SIM.surface, borderRadius: 18, border: `1px solid ${SIM.line}` }}>
          <OutcomeRow tone="optimistic" label="낙관" sub={`연 ${((rate + 0.03) * 100).toFixed(1)}%`} amount={last.optimistic} />
          <OutcomeRow tone="base" label="기대" sub={`연 ${(rate * 100).toFixed(1)}%`} amount={last.base} primary />
          <OutcomeRow tone="pessimistic" label="비관" sub={`연 ${(Math.max(rate - 0.02, 0.005) * 100).toFixed(1)}%`} amount={last.pessimistic} last />
        </div>

        {/* CTA */}
        <div style={{ padding: '24px 20px 0' }}>
          <PrimaryCTA theme="navy">📌 이 시나리오 고정</PrimaryCTA>
        </div>
      </div>
    </Phone>
  );
}

function Legend({ color, label, dashed, thick }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <svg width="22" height="6">
        <line x1="0" y1="3" x2="22" y2="3" stroke={color} strokeWidth={thick ? 2.5 : 1.5} strokeDasharray={dashed ? '3 3' : undefined} strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 10.5, color }}>{label}</span>
    </span>
  );
}

function InputRow({ label, value, slider }) {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  return (
    <div style={{ padding: '14px 16px', background: SIM.surface, borderRadius: 14, border: `1px solid ${SIM.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: SIM.ink2 }}>{label}</span>
        <span className="tnum" style={{ fontSize: 16, fontWeight: 700, color: SIM.ink, letterSpacing: '-0.01em' }}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min={slider.min}
        max={slider.max}
        step={slider.step}
        value={slider.value}
        onChange={(e) => slider.onChange(Number(e.target.value))}
        className="ice-slider"
        style={{ '--p': pct + '%', '--fill': SIM.accentDeep, marginTop: 10 }}
      />
    </div>
  );
}

function OutcomeRow({ label, sub, amount, tone, primary, last }) {
  const color = tone === 'optimistic' ? SIM.optimistic : tone === 'pessimistic' ? SIM.pessimistic : SIM.base;
  return (
    <div
      style={{
        padding: '14px 18px',
        display: 'flex', alignItems: 'center',
        borderBottom: last ? 'none' : `1px solid ${SIM.lineSoft}`,
        background: primary ? SIM.iceSoft : 'transparent',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 12 }} />
      <div style={{ flex: 1 }}>
        <div className="font-italiana" style={{ fontSize: 15, color: SIM.ink, letterSpacing: '0.02em' }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: SIM.ink3, marginTop: 1 }}>{sub}</div>
      </div>
      <span className="tnum" style={{ fontSize: 16, fontWeight: 700, color: primary ? SIM.ink : SIM.ink2, letterSpacing: '-0.01em' }}>
        {formatAmt(amount)}
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// B · LIVE — 마스코트가 슬라이더에 반응
// ──────────────────────────────────────────────────────────
function SimLive() {
  const [initial, setInitial] = React.useState(38_420_000);
  const [monthly, setMonthly] = React.useState(500_000);
  const [rate, setRate] = React.useState(0.05);
  const [years, setYears] = React.useState(10);

  const data = React.useMemo(() => simulate(initial, monthly, rate, years), [initial, monthly, rate, years]);
  const last = data[data.length - 1];

  // Mascot size scales with expected outcome (rough log of base)
  const mascotSize = Math.min(140, 60 + Math.log10(last.base / 1_000_000) * 18);
  const mood = last.base > 200_000_000 ? 'happy' : last.base < 50_000_000 ? 'sleepy' : 'happy';
  // Multiplier from initial to base
  const multiplier = last.base / Math.max(initial, 1);

  return (
    <Phone bg={SIM.bg}>
      <SnowField count={16} color="rgba(125,180,221,0.32)" />

      {/* Header */}
      <div
        style={{
          position: 'absolute', top: 60, left: 0, right: 0, zIndex: 5,
          padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 10.5, color: SIM.ink3, letterSpacing: '0.18em', fontWeight: 600 }}>SIMULATOR</div>
          <div className="font-italiana" style={{ fontSize: 20, color: SIM.ink, letterSpacing: '0.02em' }}>roll your snowball</div>
        </div>
        <button
          style={{
            padding: '7px 12px', height: 32, borderRadius: 999, background: SIM.ink,
            color: '#fff', border: 'none', fontSize: 12, fontWeight: 600,
          }}
        >
          📌 고정
        </button>
      </div>

      <div style={{ position: 'absolute', inset: 0, paddingTop: 112, paddingBottom: 28, overflow: 'auto' }}>
        {/* HERO: live mascot + multiplier */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 24px 6px' }}>
          <div style={{ height: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', transition: 'all .25s ease' }}>
            <Mascot size={mascotSize} palette="light" mood={mood} />
          </div>
          <div className="font-italiana" style={{ fontSize: 14, color: SIM.ink3, letterSpacing: '0.04em', marginTop: 8 }}>
            in {years} years
          </div>
          <div className="tnum" style={{ fontSize: 36, fontWeight: 700, color: SIM.ink, letterSpacing: '-0.03em', marginTop: 2, lineHeight: 1.05 }}>
            {formatAmt(last.base)}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: SIM.accentDeep, fontWeight: 600 }}>
            × {multiplier.toFixed(1)} <span style={{ color: SIM.ink3, fontWeight: 400 }}>현재 자산의</span>
          </div>
        </div>

        {/* Compact chart */}
        <div style={{ margin: '14px 14px 0', padding: '10px 6px 4px', background: SIM.surface, borderRadius: 18, border: `1px solid ${SIM.line}` }}>
          <ChartSVG data={data} width={332} height={140} padding={{ t: 10, r: 12, b: 18, l: 36 }} />
        </div>

        {/* Quick stat ranges below chart */}
        <div style={{ margin: '8px 14px 0', display: 'flex', gap: 6 }}>
          <RangeChip color={SIM.optimistic} label="낙관" amt={last.optimistic} />
          <RangeChip color={SIM.pessimistic} label="비관" amt={last.pessimistic} dashed />
        </div>

        {/* DIVIDER */}
        <div style={{ padding: '22px 24px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-italiana" style={{ fontSize: 13, color: SIM.ink3, letterSpacing: '0.05em' }}>
            tune it
          </span>
          <span style={{ flex: 1, height: 1, background: SIM.line }} />
        </div>

        {/* Compact tap-to-edit chips + sliders */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <InputRowCompact
            icon="●"
            label="월 저축"
            value={`${(monthly / 10000).toFixed(0)}만`}
            slider={{ min: 100_000, max: 3_000_000, step: 50_000, value: monthly, onChange: setMonthly }}
          />
          <InputRowCompact
            icon="◆"
            label="연 수익률"
            value={`${(rate * 100).toFixed(1)}%`}
            slider={{ min: 0.01, max: 0.12, step: 0.001, value: rate, onChange: setRate }}
          />
          <InputRowCompact
            icon="◇"
            label="운용 기간"
            value={`${years}년`}
            slider={{ min: 1, max: 30, step: 1, value: years, onChange: setYears }}
          />
          <InputRowCompact
            icon="○"
            label="초기 자산"
            value={formatAmt(initial)}
            slider={{ min: 0, max: 200_000_000, step: 1_000_000, value: initial, onChange: setInitial }}
          />
        </div>

        <div style={{ padding: '24px 20px 0' }}>
          <PrimaryCTA theme="navy">시나리오 저장</PrimaryCTA>
        </div>
      </div>
    </Phone>
  );
}

function RangeChip({ color, label, amt, dashed }) {
  return (
    <div
      style={{
        flex: 1, padding: '10px 14px', background: SIM.surface, borderRadius: 12, border: `1px solid ${SIM.line}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      <svg width="14" height="6">
        <line x1="0" y1="3" x2="14" y2="3" stroke={color} strokeWidth="1.5" strokeDasharray={dashed ? '3 3' : undefined} strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 10.5, color: SIM.ink3, fontWeight: 600 }}>{label}</span>
      <span className="tnum" style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: SIM.ink2 }}>
        {formatAmt(amt)}
      </span>
    </div>
  );
}

function InputRowCompact({ icon, label, value, slider }) {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  return (
    <div style={{ padding: '12px 14px', background: SIM.surface, borderRadius: 14, border: `1px solid ${SIM.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 28, height: 28, borderRadius: 8, background: SIM.iceSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: SIM.accentDeep, fontSize: 12 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, color: SIM.ink3, fontWeight: 500 }}>{label}</span>
          <span className="tnum" style={{ fontSize: 14, fontWeight: 700, color: SIM.ink, letterSpacing: '-0.01em' }}>{value}</span>
        </div>
        <input
          type="range"
          min={slider.min}
          max={slider.max}
          step={slider.step}
          value={slider.value}
          onChange={(e) => slider.onChange(Number(e.target.value))}
          className="ice-slider"
          style={{ '--p': pct + '%', '--fill': SIM.accentDeep, marginTop: 6, height: 3 }}
        />
      </div>
    </div>
  );
}

Object.assign(window, { SimEditorial, SimLive });
