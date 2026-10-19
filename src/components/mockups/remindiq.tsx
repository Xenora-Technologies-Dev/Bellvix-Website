import { AppShell, Btn, DeviceFrame, Panel, Pill, T } from './kit'
import { C } from './palette'

const RQ_NAV = ['Dashboard', 'Enquiries', 'Board', 'Reminders', 'Calendar', 'Customers', 'Staff', 'Reports', 'Audit', 'WhatsApp log']
const W = 1000

/** Enquiry pipeline board. */
export function RqPipeline({ className = '' }: { className?: string }) {
  const cols: [string, [string, string, string][]][] = [
    ['New', [['ENQ-1042', 'Sample Retail LLC', 'High'], ['ENQ-1041', 'Example Hospitality LLC', 'Normal']]],
    ['Assigned', [['ENQ-1039', 'Demo Foods FZE', 'Normal'], ['ENQ-1038', 'Northwind General Trading', 'High']]],
    ['Contacted', [['ENQ-1035', 'Sample Supplies LLC', 'Normal']]],
    ['Supplier search', [['ENQ-1031', 'Demo Imports LLC', 'High'], ['ENQ-1030', 'Example Retail LLC', 'Low']]],
    ['Quotation', [['ENQ-1027', 'Sample Trading LLC', 'Normal']]],
  ]
  const colW = 156
  return (
    <DeviceFrame w={W} h={500} label="RemindiQ · Enquiry board" ariaLabel="RemindiQ enquiry pipeline board with sample enquiries in New, Assigned, Contacted, Supplier search and Quotation stages" className={className}>
      <AppShell w={W} h={500} product="RemindiQ" page="Enquiries  /  Board" nav={RQ_NAV} active={2} darkSidebar>
        <T x={170} y={80} size={18} weight={800}>
          Enquiry board
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Pipeline view grouped by stage · owner, priority and overdue filters
        </T>
        <Btn x={760} y={66} w={90} label="List view" dark={false} />
        <Btn x={860} y={66} w={120} label="+ New enquiry" />
        {cols.map(([name, cards], i) => {
          const x = 170 + i * (colW + 7)
          return (
            <g key={name}>
              <Panel x={x} y={114} w={colW} h={366} fill="#EEF0F3" stroke="#E6E8EC" />
              <T x={x + 12} y={136} size={10.5} weight={800}>
                {name}
              </T>
              <T x={x + 12} y={151} size={8.5} fill={C.faint}>
                {`${cards.length} ${cards.length === 1 ? 'enquiry' : 'enquiries'}`}
              </T>
              {cards.map(([id, cust, pr], j) => {
                const [f, c] = pr === 'High' ? [C.redSoft, C.red] : pr === 'Low' ? [C.bg, C.sub] : [C.blueSoft, C.blue]
                const y = 164 + j * 92
                return (
                  <g key={id}>
                    <Panel x={x + 8} y={y} w={colW - 16} h={82} r={8} />
                    <T x={x + 18} y={y + 20} size={8.5} weight={700} fill={C.faint} mono>
                      {id}
                    </T>
                    <T x={x + 18} y={y + 38} size={10} weight={700}>
                      {cust.length > 22 ? `${cust.slice(0, 21)}…` : cust}
                    </T>
                    <Pill x={x + 18} y={y + 50} w={52} h={16} label={pr} fill={f} color={c} size={8.5} />
                    <circle cx={x + colW - 26} cy={y + 58} r={9} fill={C.dark} />
                    <T x={x + colW - 26} y={y + 61} size={7.5} weight={700} fill="#fff" anchor="middle">
                      {['SK', 'OR', 'PN', 'AM', 'JT'][(i + j) % 5]}
                    </T>
                  </g>
                )
              })}
            </g>
          )
        })}
      </AppShell>
    </DeviceFrame>
  )
}

/** Reminders list: overdue / due today / upcoming + acknowledge. */
export function RqReminders({ className = '' }: { className?: string }) {
  const rows = [
    ['Trade licence renewal', '18 Oct 2026', 'Yearly', 'Omar R.', 'Overdue'],
    ['Warehouse insurance renewal', '19 Oct 2026', 'Yearly', 'Sara K.', 'Overdue'],
    ['VAT return filing', '20 Oct 2026', 'Quarterly', 'Priya N.', 'Today'],
    ['Vehicle registration renewal', '20 Oct 2026', 'Yearly', 'Omar R.', 'Today'],
    ['Supplier contract review', '24 Oct 2026', 'Does not repeat', 'Sara K.', 'Upcoming'],
  ]
  return (
    <DeviceFrame w={W} h={540} label="RemindiQ · Reminders" ariaLabel="RemindiQ reminders list with sample overdue, due-today and upcoming reminders and acknowledge buttons" className={className}>
      <AppShell w={W} h={540} product="RemindiQ" page="Reminders  /  List" nav={RQ_NAV} active={3} darkSidebar>
        <T x={170} y={80} size={18} weight={800}>
          Reminders
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Open events, who they are for, and when they are due · Asia/Dubai
        </T>
        <Btn x={770} y={66} w={80} label="Calendar" dark={false} />
        <Btn x={860} y={66} w={120} label="+ New reminder" />
        {[
          ['Overdue', '2', 'Date has passed', C.redSoft, C.red],
          ['Due today', '2', 'Happening today', C.blueSoft, C.blue],
          ['Upcoming', '7', 'Next 30 days', C.amberSoft, C.amber],
        ].map(([a, b, c, f, col], i) => (
          <g key={a}>
            <Panel x={170 + i * 273} y={114} w={262} h={78} fill={f} stroke={f} />
            <T x={186 + i * 273} y={136} size={9.5} weight={800} fill={col}>
              {a.toUpperCase()}
            </T>
            <T x={186 + i * 273} y={168} size={24} weight={800}>
              {b}
            </T>
            <T x={186 + i * 273} y={184} size={8.5} fill={C.sub}>
              {c}
            </T>
          </g>
        ))}
        <Panel x={170} y={206} w={810} h={314} />
        {['EVENT', 'DATE', 'REPEATS', 'STAFF', 'DUE', ''].map((h, i) => (
          <T key={h + i} x={[186, 450, 560, 680, 780, 880][i]} y={232} size={8.5} weight={700} fill={C.sub}>
            {h}
          </T>
        ))}
        {rows.map((r, i) => {
          const y = 244 + i * 54
          const [f, c] = r[4] === 'Overdue' ? [C.redSoft, C.red] : r[4] === 'Today' ? [C.blueSoft, C.blue] : [C.amberSoft, C.amber]
          return (
            <g key={r[0]}>
              <line x1={186} y1={y} x2={964} y2={y} stroke={C.bg} />
              <T x={186} y={y + 30} size={10.5} weight={700}>
                {r[0]}
              </T>
              <T x={450} y={y + 30} size={10} fill={C.sub}>
                {r[1]}
              </T>
              <T x={560} y={y + 30} size={10} fill={C.sub}>
                {r[2]}
              </T>
              <T x={680} y={y + 30} size={10} fill={C.sub}>
                {r[3]}
              </T>
              <Pill x={780} y={y + 18} w={70} label={r[4]} fill={f} color={c} />
              <Btn x={872} y={y + 15} w={92} label="Acknowledge" />
            </g>
          )
        })}
      </AppShell>
    </DeviceFrame>
  )
}

/** New reminder form. */
export function RqNewReminder({ className = '' }: { className?: string }) {
  const field = (x: number, y: number, w: number, label: string, value: string, placeholder = false) => (
    <g key={label}>
      <T x={x} y={y} size={9.5} weight={700}>
        {label}
      </T>
      <rect x={x} y={y + 8} width={w} height={30} rx={7} fill={C.panel} stroke={C.stroke} />
      <T x={x + 12} y={y + 27} size={10} fill={placeholder ? C.faint : C.ink}>
        {value}
      </T>
    </g>
  )
  return (
    <DeviceFrame w={W} h={480} label="RemindiQ · New reminder" ariaLabel="RemindiQ new reminder form with event name, date, time, recurrence, remind-me lead time and staff fields" className={className}>
      <AppShell w={W} h={480} product="RemindiQ" page="Reminders  /  New" nav={RQ_NAV} active={3} darkSidebar>
        <T x={170} y={80} size={18} weight={800}>
          New reminder
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Name the event, when it happens, and when to be reminded
        </T>
        <Panel x={170} y={114} w={600} h={346} />
        {field(190, 146, 560, 'Event name *', 'Trade licence renewal')}
        {field(190, 206, 272, 'Date *', '15 Nov 2026')}
        {field(478, 206, 272, 'Time *', '09:00')}
        {field(190, 266, 272, 'Recurrence', 'Yearly')}
        {field(478, 266, 272, 'Remind me', '7 days before')}
        {field(190, 326, 560, 'Staff', 'Omar R.')}
        <T x={190} y={392} size={9} fill={C.sub}>
          The reminder is sent on WhatsApp at the event time on the day selected in “Remind me”. Times are Dubai time.
        </T>
        <Btn x={190} y={410} w={120} label="Create reminder" h={28} />
        <Btn x={320} y={410} w={80} label="Cancel" dark={false} h={28} />
        <Panel x={786} y={114} w={194} h={200} fill={C.tealSoft} stroke="#C9EEEA" />
        <T x={802} y={140} size={10.5} weight={800} fill="#0B6F6B">
          What happens next
        </T>
        {['WhatsApp reminder to staff', 'Completed / Remind tomorrow', 'Logged in the audit trail', 'Owner sees it in the summary'].map((s, i) => (
          <g key={s}>
            <circle cx={808} cy={166 + i * 34} r={7} fill="#fff" />
            <T x={808} y={169 + i * 34} size={8} weight={800} fill={C.teal} anchor="middle">
              {String(i + 1)}
            </T>
            <T x={822} y={170 + i * 34} size={9} fill="#0B6F6B">
              {s}
            </T>
          </g>
        ))}
      </AppShell>
    </DeviceFrame>
  )
}
