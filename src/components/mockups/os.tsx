import { AppShell, Btn, DeviceFrame, Donut, Panel, Pill, T } from './kit'
import { C, smoothPath } from './palette'

const OS_NAV = ['Home', 'Sales', 'Purchase', 'Inventory', 'Finance', 'Accounts', 'Reports', 'People', 'Settings']
const W = 1000
const H = 620

function Kpi({ x, y, w, label, value, note, accent = C.teal }: { x: number; y: number; w: number; label: string; value: string; note: string; accent?: string }) {
  return (
    <g>
      <Panel x={x} y={y} w={w} h={86} />
      <T x={x + 14} y={y + 22} size={9.5} weight={600} fill={C.sub}>
        {label}
      </T>
      <T x={x + 14} y={y + 52} size={22} weight={800}>
        {value}
      </T>
      <rect x={x + 14} y={y + 62} width={w - 28} height={4} rx={2} fill={C.bg} />
      <rect x={x + 14} y={y + 62} width={(w - 28) * 0.68} height={4} rx={2} fill={accent} />
      <T x={x + 14} y={y + 79} size={8.5} fill={C.faint}>
        {note}
      </T>
    </g>
  )
}

/** Dashboard: KPIs, sales trend, needs attention, pipeline. */
export function OsDashboard({ className = '' }: { className?: string }) {
  const pts: [number, number][] = [
    [190, 330], [240, 300], [290, 312], [340, 270], [390, 285], [440, 240], [490, 252], [540, 210], [590, 226], [640, 190],
  ]
  const line = smoothPath(pts)
  return (
    <DeviceFrame w={W} h={H} label="Bellvix OS · Operations overview" ariaLabel="Bellvix OS dashboard with sample data: collection rate, sales value, margin, sales trend and items needing attention" className={className}>
      <AppShell w={W} h={H} product="Bellvix OS" page="Home  /  Dashboard" nav={OS_NAV}>
        <T x={170} y={78} size={18} weight={800}>
          Operations overview
        </T>
        <T x={170} y={96} size={9.5} fill={C.sub}>
          Sample Trading LLC · AED · this month vs last month
        </T>
        <Btn x={880} y={64} w={100} label="+ New order" />
        <Kpi x={170} y={112} w={190} label="Collection rate" value="72.4%" note="Receipts vs invoiced this month" />
        <Kpi x={372} y={112} w={190} label="Sales value" value="AED 412.6K" note="▲ 8.1% vs last month" accent={C.lime} />
        <Kpi x={574} y={112} w={190} label="Avg. margin" value="14.2%" note="Gross margin on sales" />
        <g>
          <Panel x={776} y={112} w={204} h={86} fill={C.limeSoft} stroke="#DCE8B0" />
          <T x={790} y={134} size={9.5} weight={700} fill="#5D6B1E">
            Needs attention
          </T>
          <T x={790} y={160} size={14} weight={800}>
            2 things to look at
          </T>
          <T x={790} y={180} size={9} fill={C.sub}>
            2 customers over credit limit
          </T>
        </g>
        <Panel x={170} y={212} w={490} h={250} />
        <T x={186} y={236} size={11} weight={700}>
          Sales vs collections
        </T>
        <T x={186} y={252} size={9} fill={C.faint}>
          Last 10 weeks · AED
        </T>
        {[290, 330, 370, 410].map((y) => (
          <line key={y} x1={186} y1={y} x2={644} y2={y} stroke={C.bg} />
        ))}
        <path d={`${line} L640,440 L190,440 Z`} fill={C.tealSoft} opacity={0.8} />
        <path d={line} fill="none" stroke={C.teal} strokeWidth={2.5} />
        <path d={smoothPath(pts.map(([x, y]) => [x, y + 38] as [number, number]))} fill="none" stroke={C.lime} strokeWidth={2} strokeDasharray="5 4" />
        <circle cx={540} cy={210} r={4.5} fill="#fff" stroke={C.teal} strokeWidth={2} />
        <rect x={500} y={168} width={120} height={32} rx={6} fill={C.dark} />
        <T x={510} y={182} size={8.5} fill="#B9BEC9">
          Week 8 · sales
        </T>
        <T x={510} y={194} size={9.5} weight={700} fill="#fff">
          AED 48,250
        </T>
        <Panel x={672} y={212} w={308} h={250} />
        <T x={688} y={236} size={11} weight={700}>
          Order pipeline
        </T>
        {[
          ['Draft', 18, 260, C.faint],
          ['Approved', 14, 230, C.teal],
          ['Part-paid', 9, 170, C.lime],
          ['Fully paid', 22, 270, C.dark],
        ].map(([label, n, w, color], i) => (
          <g key={label as string}>
            <T x={688} y={268 + i * 46} size={9.5} fill={C.sub}>
              {label as string}
            </T>
            <rect x={688} y={274 + i * 46} width={276} height={12} rx={6} fill={C.bg} />
            <rect x={688} y={274 + i * 46} width={w as number} height={12} rx={6} fill={color as string} />
            <T x={964} y={268 + i * 46} size={9.5} weight={700} anchor="end">
              {String(n)}
            </T>
          </g>
        ))}
        <Panel x={170} y={476} w={810} h={124} />
        <T x={186} y={500} size={11} weight={700}>
          Recent activity
        </T>
        {[
          ['Sales invoice SI-2026-0412', 'Demo Foods FZE', 'Posted', C.tealSoft, C.teal],
          ['Receipt RV-2026-0198', 'Northwind General Trading', 'Posted', C.tealSoft, C.teal],
          ['Purchase order PO-2026-0087', 'Sample Supplies LLC', 'Approved', C.blueSoft, C.blue],
        ].map(([a, b, s, f, c], i) => (
          <g key={a}>
            <T x={186} y={526 + i * 24} size={10} weight={600}>
              {a}
            </T>
            <T x={420} y={526 + i * 24} size={10} fill={C.sub}>
              {b}
            </T>
            <Pill x={900} y={514 + i * 24} w={64} label={s} fill={f} color={c} />
          </g>
        ))}
      </AppShell>
    </DeviceFrame>
  )
}

/** From buying to cash: four stage tiles + owed/owing. */
export function OsBuyingToCash({ className = '' }: { className?: string }) {
  const tiles = [
    ['Bought', 'AED 286,400', 'From vendors this month'],
    ['In stock', 'AED 318,900', 'At cost, today'],
    ['Sold', 'AED 402,150', 'Before VAT'],
    ['Collected', 'AED 341,700', 'Receipts this month'],
  ]
  return (
    <DeviceFrame w={W} h={360} label="Bellvix OS · Business flow" ariaLabel="Bellvix OS business flow with sample data: bought, in stock, sold and collected, plus amounts owed" className={className}>
      <rect width={W} height={360} fill={C.bg} />
      <T x={30} y={40} size={9} weight={700} fill={C.teal}>
        BUSINESS FLOW
      </T>
      <T x={30} y={66} size={20} weight={800}>
        From buying to cash
      </T>
      <T x={30} y={86} size={10} fill={C.sub}>
        What came in, what it cost and how long your money waits · this month · AED
      </T>
      {tiles.map(([a, b, c], i) => (
        <g key={a}>
          <Panel x={30 + i * 240} y={108} w={216} h={110} />
          <T x={46 + i * 240} y={134} size={10} weight={600} fill={C.sub}>
            {a}
          </T>
          <T x={46 + i * 240} y={168} size={21} weight={800}>
            {b}
          </T>
          <T x={46 + i * 240} y={196} size={9} fill={C.faint}>
            {c}
          </T>
          {i < 3 ? (
            <g>
              <circle cx={258 + i * 240} cy={163} r={11} fill={C.panel} stroke={C.stroke} />
              <path d={`M${253 + i * 240},163 h9 m-4,-4 l4,4 l-4,4`} stroke={C.teal} strokeWidth={1.8} fill="none" />
            </g>
          ) : null}
        </g>
      ))}
      <Panel x={30} y={236} w={456} h={96} fill={C.panel} />
      <rect x={30} y={236} width={4} height={96} rx={2} fill={C.teal} />
      <T x={50} y={262} size={10} weight={600} fill={C.sub}>
        Customers still owe you
      </T>
      <T x={50} y={296} size={22} weight={800}>
        AED 96.2K
      </T>
      <T x={50} y={318} size={9} fill={C.faint}>
        Incl. VAT, as of today
      </T>
      <Panel x={514} y={236} w={456} h={96} />
      <rect x={514} y={236} width={4} height={96} rx={2} fill={C.lime} />
      <T x={534} y={262} size={10} weight={600} fill={C.sub}>
        You still owe vendors
      </T>
      <T x={534} y={296} size={22} weight={800}>
        AED 54.8K
      </T>
      <T x={534} y={318} size={9} fill={C.faint}>
        Incl. VAT, as of today
      </T>
    </DeviceFrame>
  )
}

/** Of every AED 100 you sell: donut split. */
export function OsProfitSplit({ className = '' }: { className?: string }) {
  const parts = [
    { label: 'Goods you sold', v: 78.2, color: C.dark },
    { label: 'Running the business', v: 12.4, color: C.lime },
    { label: 'Profit', v: 9.4, color: C.teal },
  ]
  return (
    <DeviceFrame w={500} h={360} label="Bellvix OS · Where the revenue went" ariaLabel="Sample profit split: of every AED 100 sold, AED 78.20 goods, AED 12.40 running costs, AED 9.40 profit" className={className}>
      <rect width={500} height={360} fill={C.bg} />
      <Panel x={16} y={16} w={468} h={328} />
      <T x={34} y={44} size={11} weight={700}>
        Where the revenue went
      </T>
      <T x={34} y={72} size={15} weight={800}>
        Of every AED 100 you sell, AED 9.40 is profit.
      </T>
      <Donut cx={130} cy={210} r={70} stroke={26} parts={parts} />
      <T x={130} y={206} size={9} fill={C.sub} anchor="middle">
        Net profit
      </T>
      <T x={130} y={226} size={17} weight={800} anchor="middle">
        9.4%
      </T>
      {parts.map((p, i) => (
        <g key={p.label}>
          <circle cx={250} cy={156 + i * 50} r={5} fill={p.color} />
          <T x={262} y={160 + i * 50} size={10.5} weight={600}>
            {p.label}
          </T>
          <T x={466} y={160 + i * 50} size={11} weight={800} anchor="end">
            {`AED ${p.v.toFixed(2)}`}
          </T>
          <line x1={250} y1={176 + i * 50} x2={466} y2={176 + i * 50} stroke={C.bg} />
        </g>
      ))}
    </DeviceFrame>
  )
}

/** Cash conversion cycle. */
export function OsCashCycle({ className = '' }: { className?: string }) {
  const segs = [
    { label: 'Stock sits', v: 24.0, color: C.dark, note: 'How long stock waits before it sells' },
    { label: 'Customers pay', v: 38.5, color: C.teal, note: 'How long customers take to pay' },
    { label: 'Vendors wait', v: 31.0, color: C.lime, note: 'How long you take to pay vendors' },
  ]
  const total = segs.reduce((s, x) => s + x.v, 0)
  const starts = segs.map((_, i) => 34 + segs.slice(0, i).reduce((s, x) => s + (x.v / total) * 432, 0))
  return (
    <DeviceFrame w={500} h={360} label="Bellvix OS · Cash cycle" ariaLabel="Sample cash conversion cycle of 31.5 days: 24 days stock, 38.5 days customer payment, 31 days vendor payment" className={className}>
      <rect width={500} height={360} fill={C.bg} />
      <Panel x={16} y={16} w={468} h={328} />
      <T x={34} y={44} size={11} weight={700}>
        Cash cycle
      </T>
      <T x={34} y={60} size={9} fill={C.sub}>
        Days between paying vendors and collecting from customers
      </T>
      <T x={34} y={104} size={30} weight={800}>
        31.5 days
      </T>
      {segs.map((s, i) => (
        <rect key={s.label} x={starts[i]} y={122} width={(s.v / total) * 432 - 3} height={14} rx={3} fill={s.color} />
      ))}
      {segs.map((s, i) => (
        <g key={s.label}>
          <circle cx={40} cy={172 + i * 42} r={5} fill={s.color} />
          <T x={52} y={176 + i * 42} size={10.5} weight={700}>
            {s.label}
          </T>
          <T x={52} y={190 + i * 42} size={8.5} fill={C.faint}>
            {s.note}
          </T>
          <T x={466} y={176 + i * 42} size={11} weight={800} anchor="end">
            {`${s.v.toFixed(1)} days`}
          </T>
        </g>
      ))}
      <rect x={34} y={296} width={432} height={34} rx={8} fill={C.tealSoft} />
      <T x={46} y={317} size={9.5} weight={600} fill="#0B6F6B">
        Your cash is tied up for 31.5 days from paying vendors to collecting.
      </T>
    </DeviceFrame>
  )
}

/** Receivables vs payables ageing. */
export function OsAgeing({ className = '' }: { className?: string }) {
  const buckets = [
    ['0–30', 62, 38],
    ['31–60', 21, 12],
    ['61–90', 9, 4],
    ['90+', 4.2, 0.8],
  ] as const
  const max = 62
  return (
    <DeviceFrame w={500} h={360} label="Bellvix OS · Ageing" ariaLabel="Sample receivables versus payables ageing by 0–30, 31–60, 61–90 and over 90 days" className={className}>
      <rect width={500} height={360} fill={C.bg} />
      <Panel x={16} y={16} w={468} h={328} />
      <T x={34} y={44} size={11} weight={700}>
        Receivables vs payables ageing
      </T>
      <T x={34} y={60} size={9} fill={C.sub}>
        By days past due · AED thousand
      </T>
      {[110, 160, 210, 260].map((y) => (
        <line key={y} x1={50} y1={y} x2={466} y2={y} stroke={C.bg} />
      ))}
      <line x1={50} y1={300} x2={466} y2={300} stroke={C.stroke} />
      {buckets.map(([label, r, p], i) => {
        const bx = 80 + i * 100
        const rh = (r / max) * 190
        const ph = (p / max) * 190
        return (
          <g key={label}>
            <rect x={bx} y={300 - rh} width={26} height={rh} rx={4} fill={C.dark} />
            <rect x={bx + 30} y={300 - ph} width={26} height={ph} rx={4} fill={C.teal} />
            <T x={bx + 28} y={318} size={9.5} fill={C.sub} anchor="middle">
              {label}
            </T>
          </g>
        )
      })}
      <rect x={300} y={34} width={10} height={10} rx={2} fill={C.dark} />
      <T x={314} y={43} size={9} fill={C.sub}>
        Receivables
      </T>
      <rect x={384} y={34} width={10} height={10} rx={2} fill={C.teal} />
      <T x={398} y={43} size={9} fill={C.sub}>
        Payables
      </T>
    </DeviceFrame>
  )
}

export type DocKind = 'quotations' | 'purchase-orders' | 'inventory' | 'receipts' | 'accounts'

const docs: Record<DocKind, { title: string; sub: string; cols: string[]; widths: number[]; rows: string[][]; status?: number; button: string; nav: number }> = {
  quotations: {
    title: 'Quotations',
    sub: 'Offers to customers. Accepted quotations become sales orders.',
    cols: ['Quotation', 'Customer', 'Date', 'Valid until', 'Amount', 'Status'],
    widths: [120, 210, 90, 100, 110, 90],
    rows: [
      ['QT-2026-0141', 'Demo Foods FZE', '12 Oct', '26 Oct', 'AED 18,420', 'Sent'],
      ['QT-2026-0140', 'Northwind General Trading', '11 Oct', '25 Oct', 'AED 7,980', 'Accepted'],
      ['QT-2026-0139', 'Sample Retail LLC', '09 Oct', '23 Oct', 'AED 4,315', 'Converted'],
      ['QT-2026-0138', 'Example Hospitality LLC', '06 Oct', '13 Oct', 'AED 2,760', 'Expired'],
      ['QT-2026-0137', 'Demo Foods FZE', '03 Oct', '17 Oct', 'AED 11,050', 'Converted'],
    ],
    status: 5,
    button: '+ New quotation',
    nav: 1,
  },
  'purchase-orders': {
    title: 'Purchase orders',
    sub: 'Orders to vendors. Goods received update stock automatically.',
    cols: ['Order', 'Vendor', 'Date', 'Expected', 'Amount', 'Status'],
    widths: [120, 210, 90, 100, 110, 90],
    rows: [
      ['PO-2026-0087', 'Sample Supplies LLC', '13 Oct', '20 Oct', 'AED 24,600', 'Confirmed'],
      ['PO-2026-0086', 'Example Packaging FZE', '10 Oct', '17 Oct', 'AED 6,240', 'Received'],
      ['PO-2026-0085', 'Demo Imports LLC', '08 Oct', '22 Oct', 'AED 41,900', 'Part received'],
      ['PO-2026-0084', 'Sample Supplies LLC', '02 Oct', '09 Oct', 'AED 9,375', 'Received'],
      ['PO-2026-0083', 'Example Logistics LLC', '29 Sep', '06 Oct', 'AED 3,120', 'Closed'],
    ],
    status: 5,
    button: '+ New purchase order',
    nav: 2,
  },
  inventory: {
    title: 'Stock management',
    sub: 'Live stock levels, reorder points, batches and expiry.',
    cols: ['Item', 'Category', 'In stock', 'Reorder at', 'Price', 'Status'],
    widths: [200, 140, 80, 90, 110, 90],
    rows: [
      ['Basmati rice 10 kg', 'Grains', '340', '120', 'AED 64.00', 'Active'],
      ['Penne pasta 500 g × 20', 'Dry goods', '86', '60', 'AED 92.50', 'Active'],
      ['Mineral water 24 × 500 ml', 'Beverages', '42', '80', 'AED 18.75', 'Low stock'],
      ['Green tea 100 bags', 'Beverages', '128', '40', 'AED 21.00', 'Active'],
      ['Olive oil 1 L × 12', 'Oils', '19', '25', 'AED 310.00', 'Low stock'],
    ],
    status: 5,
    button: '+ Add stock item',
    nav: 3,
  },
  receipts: {
    title: 'Receipt vouchers',
    sub: 'Money received from customers, matched to invoices.',
    cols: ['Voucher', 'Date', 'Customer', 'Paid by', 'Amount', 'Status'],
    widths: [120, 80, 220, 110, 110, 90],
    rows: [
      ['RV-2026-0198', '14 Oct', 'Northwind General Trading', 'Bank transfer', 'AED 12,400', 'Posted'],
      ['RV-2026-0197', '13 Oct', 'Demo Foods FZE', 'Cheque', 'AED 8,950', 'Posted'],
      ['RV-2026-0196', '13 Oct', 'Walk-in customer', 'Cash', 'AED 615', 'Posted'],
      ['RV-2026-0195', '12 Oct', 'Sample Retail LLC', 'Card', 'AED 2,180', 'Posted'],
      ['RV-2026-0194', '11 Oct', 'Example Hospitality LLC', 'Bank transfer', 'AED 4,730', 'Draft'],
    ],
    status: 5,
    button: '+ New receipt',
    nav: 4,
  },
  accounts: {
    title: 'Chart of accounts',
    sub: 'Every ledger account, grouped by type. Balances come from posted entries.',
    cols: ['Code', 'Account', 'Group', 'Type', 'Balance', ''],
    widths: [80, 240, 160, 100, 140, 20],
    rows: [
      ['1100', 'Cash in hand', 'Current assets', 'Asset', 'AED 18,240 Dr', ''],
      ['1200', 'Bank: current account', 'Current assets', 'Asset', 'AED 246,910 Dr', ''],
      ['1300', 'Accounts receivable', 'Current assets', 'Asset', 'AED 96,215 Dr', ''],
      ['2100', 'Accounts payable', 'Current liabilities', 'Liability', 'AED 54,830 Cr', ''],
      ['2200', 'VAT payable', 'Current liabilities', 'Liability', 'AED 6,412 Cr', ''],
    ],
    button: '+ New account',
    nav: 5,
  },
}

const statusStyle = (s: string): [string, string] => {
  if (['Accepted', 'Converted', 'Received', 'Posted', 'Active', 'Closed'].includes(s)) return [C.tealSoft, C.teal]
  if (['Expired', 'Low stock'].includes(s)) return [C.redSoft, C.red]
  if (['Part received', 'Draft'].includes(s)) return [C.amberSoft, C.amber]
  return [C.blueSoft, C.blue]
}

/** Document list screens (quotations, POs, stock, receipts, chart of accounts). */
export function OsDocument({ kind, className = '' }: { kind: DocKind; className?: string }) {
  const d = docs[kind]
  const x0 = 170
  return (
    <DeviceFrame w={W} h={480} label={`Bellvix OS · ${d.title}`} ariaLabel={`Bellvix OS ${d.title.toLowerCase()} screen with sample records`} className={className}>
      <AppShell w={W} h={480} product="Bellvix OS" page={`${OS_NAV[d.nav]}  /  ${d.title}`} nav={OS_NAV} active={d.nav}>
        <T x={x0} y={80} size={18} weight={800}>
          {d.title}
        </T>
        <T x={x0} y={98} size={9.5} fill={C.sub}>
          {d.sub}
        </T>
        <Btn x={850} y={66} w={130} label={d.button} />
        <Panel x={x0} y={116} w={810} h={344} />
        <rect x={x0 + 16} y={130} width={260} height={24} rx={7} fill={C.bg} stroke={C.stroke} />
        <T x={x0 + 28} y={146} size={9.5} fill={C.faint}>
          Search…
        </T>
        {['All', 'This month', 'Last quarter'].map((f, i) => (
          <Pill key={f} x={x0 + 292 + i * 86} y={133} w={78} h={18} label={f} fill={i === 0 ? C.dark : C.bg} color={i === 0 ? '#fff' : C.sub} />
        ))}
        <rect x={x0 + 16} y={168} width={778} height={26} fill={C.bg} />
        {d.cols.map((c, i) => {
          const cx = x0 + 28 + d.widths.slice(0, i).reduce((s, n) => s + n, 0)
          return (
            <T key={c + i} x={cx} y={185} size={8.5} weight={700} fill={C.sub}>
              {c.toUpperCase()}
            </T>
          )
        })}
        {d.rows.map((r, ri) => (
          <g key={r[0]}>
            <line x1={x0 + 16} y1={194 + (ri + 1) * 48} x2={x0 + 794} y2={194 + (ri + 1) * 48} stroke={C.bg} />
            {r.map((cell, ci) => {
              const cx = x0 + 28 + d.widths.slice(0, ci).reduce((s, n) => s + n, 0)
              if (d.status !== undefined && ci === d.status) {
                const [f, col] = statusStyle(cell)
                return <Pill key={ci} x={cx} y={208 + ri * 48} w={Math.max(56, cell.length * 6.2)} label={cell} fill={f} color={col} />
              }
              return (
                <T key={ci} x={cx} y={222 + ri * 48} size={10} weight={ci === 0 || ci === 4 ? 700 : 500} fill={ci === 0 || ci === 4 ? C.ink : C.sub}>
                  {cell}
                </T>
              )
            })}
          </g>
        ))}
      </AppShell>
    </DeviceFrame>
  )
}

/** E-invoicing readiness and VAT summary with UAE timeline. */
export function OsEInvoicing({ className = '' }: { className?: string }) {
  const checks = [
    ['Customer and vendor TRNs captured', true],
    ['Tax categories mapped on items', true],
    ['Invoice fields complete', true],
    ['Connection to your Accredited Service Provider', true],
  ] as const
  const tl = [
    ['30 Oct 2026', '≥ AED 50M: appoint ASP'],
    ['1 Jan 2027', '≥ AED 50M: mandatory'],
    ['31 Mar 2027', '< AED 50M: appoint ASP'],
    ['1 Jul 2027', '< AED 50M: mandatory'],
    ['1 Oct 2027', 'Government entities'],
  ]
  return (
    <DeviceFrame w={W} h={560} label="Bellvix OS · E-invoicing & VAT" ariaLabel="Bellvix OS e-invoicing readiness checklist, sample VAT summary and the UAE e-invoicing timeline" className={className}>
      <AppShell w={W} h={560} product="Bellvix OS" page="Reports  /  E-invoicing" nav={OS_NAV} active={6}>
        <T x={170} y={80} size={18} weight={800}>
          E-invoicing
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Readiness, invoice status and VAT in one view
        </T>
        <Pill x={858} y={68} w={122} h={22} label="E-invoicing ready" fill={C.tealSoft} color={C.teal} size={10} />
        <Panel x={170} y={116} w={400} h={196} />
        <T x={186} y={140} size={11} weight={700}>
          Readiness checklist
        </T>
        {checks.map(([label], i) => (
          <g key={label}>
            <circle cx={196} cy={170 + i * 34} r={9} fill={C.tealSoft} />
            <path d={`M191.5,${170 + i * 34} l3,3 l6,-6`} stroke={C.teal} strokeWidth={2} fill="none" />
            <T x={214} y={174 + i * 34} size={10.5} weight={600}>
              {label}
            </T>
          </g>
        ))}
        <Panel x={582} y={116} w={398} h={196} />
        <T x={598} y={140} size={11} weight={700}>
          VAT this quarter (sample)
        </T>
        {[
          ['Output VAT', 'AED 20,108'],
          ['Input VAT', 'AED 13,696'],
          ['Net VAT payable', 'AED 6,412'],
        ].map(([a, b], i) => (
          <g key={a}>
            <T x={598} y={176 + i * 38} size={10.5} fill={C.sub}>
              {a}
            </T>
            <T x={964} y={176 + i * 38} size={13} weight={800} anchor="end">
              {b}
            </T>
            <line x1={598} y1={188 + i * 38} x2={964} y2={188 + i * 38} stroke={C.bg} />
          </g>
        ))}
        <Panel x={170} y={326} w={810} h={214} />
        <T x={186} y={350} size={11} weight={700}>
          UAE e-invoicing timeline
        </T>
        <T x={186} y={366} size={9} fill={C.faint}>
          Ministerial Decisions 244/2025 and 66/2026 · Ministry of Finance guidelines
        </T>
        <line x1={210} y1={430} x2={940} y2={430} stroke={C.stroke} strokeWidth={2} />
        {tl.map(([date, what], i) => {
          const cx = 210 + i * 182.5
          return (
            <g key={date}>
              <circle cx={cx} cy={430} r={8} fill={i < 2 ? C.teal : C.panel} stroke={C.teal} strokeWidth={2} />
              <T x={cx} y={410} size={10.5} weight={800} anchor="middle">
                {date}
              </T>
              <T x={cx} y={460} size={9} fill={C.sub} anchor="middle">
                {what}
              </T>
            </g>
          )
        })}
        <rect x={186} y={486} width={778} height={36} rx={8} fill={C.bg} />
        <T x={200} y={508} size={9.5} fill={C.sub}>
          Bellvix connects Bellvix OS to the Accredited Service Provider you appoint. Bellvix is not an ASP.
        </T>
      </AppShell>
    </DeviceFrame>
  )
}
