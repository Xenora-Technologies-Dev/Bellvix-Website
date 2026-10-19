import { AppShell, Btn, DeviceFrame, Panel, Pill, T } from './kit'
import { C } from './palette'

const CF_NAV = ['Dashboard', 'Appointments', 'Bookings', 'Patients', 'Therapists', 'Doctors', 'Rooms', 'Leaves', 'Reports', 'WhatsApp']
const W = 1000

/** CliniqFlow dashboard. Sample data only. */
export function CfDashboard({ className = '' }: { className?: string }) {
  const kpis = [
    ['Patients this month', '148', C.tealSoft, C.teal],
    ['Active therapists', '6', C.blueSoft, C.blue],
    ['Today’s bookings', '11', C.limeSoft, '#6E8A10'],
    ['Pending leave requests', '1', C.amberSoft, C.amber],
  ]
  const today = [
    ['Layla M.', 'Physiotherapy · Room 2', '09:00 – 10:00', 'Completed'],
    ['Daniel P.', 'Speech therapy · Room 1', '10:30 – 11:15', 'Confirmed'],
    ['Noor H.', 'Consultation · Consultation room', '12:00 – 12:30', 'Scheduled'],
    ['Karim S.', 'Occupational therapy · Room 3', '14:00 – 15:00', 'Scheduled'],
  ]
  const upcoming = [
    ['Elena V.', 'Physiotherapy · Room 4', 'Tomorrow 09:30'],
    ['Arjun D.', 'Consultation', 'Tomorrow 11:00'],
    ['Sample Patient', 'Speech therapy · Room 1', 'Thu 16:00'],
  ]
  return (
    <DeviceFrame w={W} h={560} label="CliniqFlow · Dashboard" ariaLabel="CliniqFlow clinic dashboard with sample data: KPI cards, today’s appointments and upcoming bookings" className={className}>
      <AppShell w={W} h={560} product="CliniqFlow" page="Dashboard" nav={CF_NAV}>
        <T x={170} y={80} size={18} weight={800}>
          Dashboard
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Overview of clinic operations and key metrics
        </T>
        <Btn x={870} y={66} w={110} label="Open bookings" />
        {kpis.map(([a, b, f, c], i) => (
          <g key={a}>
            <Panel x={170 + i * 204} y={114} w={192} h={78} />
            <T x={184 + i * 204} y={136} size={9.5} weight={600} fill={C.sub}>
              {a}
            </T>
            <T x={184 + i * 204} y={170} size={24} weight={800}>
              {b}
            </T>
            <rect x={334 + i * 204} y={124} width={18} height={18} rx={5} fill={f} />
            <rect x={340 + i * 204} y={130} width={6} height={6} rx={1.5} fill={c} />
          </g>
        ))}
        <Panel x={170} y={206} w={480} h={334} />
        <T x={186} y={230} size={11} weight={700}>
          Today’s appointments
        </T>
        {today.map(([n, t, time, s], i) => {
          const [f, c] = s === 'Completed' ? [C.tealSoft, C.teal] : s === 'Confirmed' ? [C.limeSoft, '#6E8A10'] : [C.blueSoft, C.blue]
          return (
            <g key={n}>
              <rect x={186} y={246 + i * 70} width={448} height={60} rx={8} fill={C.bg} />
              <rect x={186} y={246 + i * 70} width={4} height={60} rx={2} fill={C.violet} />
              <T x={202} y={270 + i * 70} size={11} weight={700}>
                {n}
              </T>
              <T x={202} y={288 + i * 70} size={9} fill={C.sub}>
                {t}
              </T>
              <T x={520} y={270 + i * 70} size={10} weight={600} anchor="end">
                {time}
              </T>
              <Pill x={540} y={259 + i * 70} w={80} label={s} fill={f} color={c} />
            </g>
          )
        })}
        <Panel x={664} y={206} w={316} h={334} />
        <T x={680} y={230} size={11} weight={700}>
          Upcoming bookings
        </T>
        {upcoming.map(([n, t, when], i) => (
          <g key={n}>
            <rect x={680} y={246 + i * 76} width={284} height={64} rx={8} fill={C.bg} />
            <rect x={680} y={246 + i * 76} width={4} height={64} rx={2} fill={C.amber} />
            <T x={696} y={270 + i * 76} size={11} weight={700}>
              {n}
            </T>
            <T x={696} y={287 + i * 76} size={9} fill={C.sub}>
              {t}
            </T>
            <T x={696} y={302 + i * 76} size={9} weight={600} fill={C.teal}>
              {when}
            </T>
          </g>
        ))}
      </AppShell>
    </DeviceFrame>
  )
}

/** Room-based booking calendar: therapy rooms + consultation room. */
export function CfRoomCalendar({ className = '' }: { className?: string }) {
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Consultation room']
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
  const x0 = 220
  const colW = 150
  const y0 = 150
  const rowH = 46
  const blocks: [number, number, number, string, string, string][] = [
    [0, 0, 1, 'Daniel P.', 'Speech therapy', C.violet],
    [1, 0, 1, 'Layla M.', 'Physiotherapy', C.teal],
    [2, 1, 1.5, 'Karim S.', 'Occupational therapy', C.blue],
    [4, 1, 0.5, 'Noor H.', 'Consultation', C.amber],
    [3, 2, 1, 'Elena V.', 'Physiotherapy', C.teal],
    [0, 3, 1, 'Arjun D.', 'Speech therapy', C.violet],
    [1, 5, 1, 'Sample Patient', 'Physiotherapy', C.teal],
    [4, 4, 0.5, 'Omar F.', 'Consultation', C.amber],
    [2, 5, 1.5, 'Maya L.', 'Occupational therapy', C.blue],
  ]
  return (
    <DeviceFrame w={W} h={560} label="CliniqFlow · Bookings" ariaLabel="CliniqFlow room-based booking calendar with sample sessions across four therapy rooms and a consultation room" className={className}>
      <AppShell w={W} h={560} product="CliniqFlow" page="Appointments  /  Bookings" nav={CF_NAV} active={2}>
        <T x={170} y={80} size={18} weight={800}>
          Bookings
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          Therapy and consultation sessions by room · Tue 20 Oct 2026
        </T>
        <Btn x={860} y={66} w={120} label="+ Create booking" />
        <Panel x={170} y={112} w={810} h={430} />
        {rooms.map((r, i) => (
          <g key={r}>
            <rect x={x0 + i * colW} y={122} width={colW} height={28} fill={C.bg} />
            <T x={x0 + i * colW + 12} y={140} size={10} weight={700}>
              {r}
            </T>
            <line x1={x0 + i * colW} y1={122} x2={x0 + i * colW} y2={y0 + hours.length * rowH} stroke={C.stroke} />
          </g>
        ))}
        {hours.map((h, i) => (
          <g key={h}>
            <line x1={180} y1={y0 + i * rowH} x2={970} y2={y0 + i * rowH} stroke={C.bg} />
            <T x={186} y={y0 + i * rowH + 14} size={9} fill={C.faint}>
              {h}
            </T>
          </g>
        ))}
        {blocks.map(([room, start, len, name, therapy, color]) => {
          const bx = x0 + room * colW + 5
          const by = y0 + start * rowH + 3
          const bh = len * rowH - 6
          return (
            <g key={`${room}-${start}`}>
              <rect x={bx} y={by} width={colW - 10} height={bh} rx={6} fill={color} opacity={0.14} />
              <rect x={bx} y={by} width={3} height={bh} rx={1.5} fill={color} />
              <T x={bx + 10} y={by + 16} size={9.5} weight={700}>
                {name}
              </T>
              {bh > 30 ? (
                <T x={bx + 10} y={by + 29} size={8.5} fill={C.sub}>
                  {therapy}
                </T>
              ) : null}
            </g>
          )
        })}
        <line x1={x0} y1={y0 + 2.6 * rowH} x2={970} y2={y0 + 2.6 * rowH} stroke={C.red} strokeWidth={1.5} />
        <circle cx={x0} cy={y0 + 2.6 * rowH} r={4} fill={C.red} />
      </AppShell>
    </DeviceFrame>
  )
}

/** Appointment list with filters and the "needing attention" panel. */
export function CfAppointments({ className = '' }: { className?: string }) {
  const rows = [
    ['Layla M.', 'Physiotherapy', 'Maya L.', 'Room 2', 'Tue 20 Oct · 09:00', 'Completed'],
    ['Daniel P.', 'Speech therapy', 'Ravi T.', 'Room 1', 'Tue 20 Oct · 10:30', 'Confirmed'],
    ['Karim S.', 'Occupational therapy', 'Sana R.', 'Room 3', 'Tue 20 Oct · 14:00', 'Scheduled'],
    ['Elena V.', 'Physiotherapy', 'Maya L.', 'Room 4', 'Wed 21 Oct · 09:30', 'Scheduled'],
  ]
  return (
    <DeviceFrame w={W} h={520} label="CliniqFlow · Appointment list" ariaLabel="CliniqFlow appointment list with filters and a panel flagging appointments affected by staff leave, using sample data" className={className}>
      <AppShell w={W} h={520} product="CliniqFlow" page="Appointments  /  Appointment list" nav={CF_NAV} active={1}>
        <T x={170} y={80} size={18} weight={800}>
          Appointment list
        </T>
        <T x={170} y={98} size={9.5} fill={C.sub}>
          View, filter and manage all clinic appointments
        </T>
        <Panel x={170} y={112} w={810} h={66} fill={C.amberSoft} stroke="#F3D9A6" />
        <T x={186} y={136} size={11} weight={800} fill="#8A5A00">
          Appointments needing attention · 2
        </T>
        <T x={186} y={156} size={9.5} fill="#8A5A00">
          Therapist on approved leave Thu 22 Oct: 2 sessions need a new therapist or time.
        </T>
        <Btn x={870} y={130} w={94} label="Review" />
        <Panel x={170} y={190} w={810} h={310} />
        {['Booking type', 'Therapist', 'Therapy', 'Status', 'Date range'].map((f, i) => (
          <g key={f}>
            <T x={186 + i * 156} y={212} size={8.5} weight={700} fill={C.sub}>
              {f.toUpperCase()}
            </T>
            <rect x={186 + i * 156} y={220} width={144} height={24} rx={6} fill={C.bg} stroke={C.stroke} />
            <T x={196 + i * 156} y={236} size={9.5} fill={C.ink}>
              {['Therapy booking', 'All therapists', 'All therapies', 'All statuses', 'This week'][i]}
            </T>
          </g>
        ))}
        {rows.map((r, i) => {
          const [f, c] = r[5] === 'Completed' ? [C.tealSoft, C.teal] : r[5] === 'Confirmed' ? [C.limeSoft, '#6E8A10'] : [C.blueSoft, C.blue]
          const y = 262 + i * 58
          return (
            <g key={r[0]}>
              <rect x={186} y={y} width={778} height={50} rx={8} fill={C.panel} stroke={C.stroke} />
              <rect x={186} y={y} width={4} height={50} rx={2} fill={C.blue} />
              <T x={202} y={y + 21} size={11} weight={700}>
                {r[0]}
              </T>
              <T x={202} y={y + 38} size={9} fill={C.sub}>
                {r[1]}
              </T>
              <T x={380} y={y + 21} size={8.5} fill={C.faint}>
                THERAPIST
              </T>
              <T x={380} y={y + 38} size={10} weight={600}>
                {r[2]}
              </T>
              <T x={500} y={y + 21} size={8.5} fill={C.faint}>
                ROOM
              </T>
              <T x={500} y={y + 38} size={10} weight={600}>
                {r[3]}
              </T>
              <T x={600} y={y + 21} size={8.5} fill={C.faint}>
                WHEN
              </T>
              <T x={600} y={y + 38} size={10} weight={600}>
                {r[4]}
              </T>
              <Pill x={860} y={y + 16} w={84} label={r[5]} fill={f} color={c} />
            </g>
          )
        })}
      </AppShell>
    </DeviceFrame>
  )
}
