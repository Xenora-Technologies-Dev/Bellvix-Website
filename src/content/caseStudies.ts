import type { Link } from './types'

export type CaseStudy = {
  slug: 'cliniqflow' | 'remindiq'
  name: string
  title: string
  description: string
  h1: string
  summary: string
  client: string
  tags: string[]
  challenge: string[]
  solution: string[]
  glance: { label: string; value: string }[]
  features: { name: string; text: string }[]
  outcome: string[]
  related: Link[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cliniqflow',
    name: 'CliniqFlow',
    title: 'CliniqFlow: Clinic Scheduling & WhatsApp Booking',
    description:
      'How Bellvix built CliniqFlow for a multi-room therapy clinic in the UAE: room-based scheduling, a staff dashboard and WhatsApp booking confirmations.',
    h1: 'CliniqFlow: clinic scheduling and management with a WhatsApp chatbot',
    summary:
      'A multi-room therapy clinic in the UAE moved bookings, rooms, therapists and patient communication into one system, with WhatsApp handling confirmations and changes.',
    client: 'A multi-room therapy clinic in the UAE',
    tags: ['Healthcare & clinics', 'Custom software', 'WhatsApp chatbot'],
    challenge: [
      'Front-desk staff handled bookings for therapy sessions and consultations through calls and messages, which kept the desk busy and calls were missed.',
      'Several therapy rooms, therapists and a consultation room had to be scheduled without double bookings or leave conflicts.',
      'Missed calls and forgotten appointments meant lost sessions, and patient records were scattered.',
    ],
    solution: [
      'We built CliniqFlow, a clinic scheduling and management system with a dashboard for admins, doctors and therapists.',
      'A room-based booking calendar shows every therapy room and the consultation room side by side, so staff can see free slots at a glance.',
      'A WhatsApp chatbot sends booking confirmations and lets patients confirm, reschedule or cancel on the app they already use.',
    ],
    glance: [
      { label: 'Client', value: 'Multi-room therapy clinic, UAE' },
      { label: 'Channel', value: 'Web dashboard + WhatsApp' },
      { label: 'Users', value: 'Admins, doctors, therapists' },
      { label: 'Scope', value: 'Design, build and WhatsApp integration' },
    ],
    features: [
      { name: 'Room-based booking calendar', text: 'Therapy rooms and the consultation room in one day view, with conflict-free scheduling.' },
      { name: 'Today and upcoming view', text: 'KPI cards and lists of today’s appointments and upcoming bookings on the dashboard.' },
      { name: 'Appointment list with attention panel', text: 'Filter by booking type, therapist, therapy, status and date; appointments affected by staff leave are flagged for action.' },
      { name: 'WhatsApp automation', text: 'Automatic confirmations and reminders, plus reschedule and cancel handling, with a message log for staff.' },
      { name: 'Roles and access', text: 'Separate access for admins, doctors and therapists, with an activity log.' },
      { name: 'Patients, leave and reports', text: 'Patient history, therapist leave requests and reports in the same system.' },
    ],
    outcome: [
      'Booking and confirmation run around the clock on WhatsApp, the app patients already use.',
      'Less front-desk workload: staff see rooms, therapists and appointments in one place instead of chasing calls.',
      'Fewer no-shows and clashes, because patients get confirmations and the calendar prevents conflicts.',
    ],
    related: [
      { label: 'WhatsApp chatbot development', href: '/services/ai-automation/whatsapp-chatbot-development' },
      { label: 'Custom software development', href: '/services/software-development' },
      { label: 'Healthcare & clinics', href: '/industries#healthcare' },
    ],
  },
  {
    slug: 'remindiq',
    name: 'RemindiQ',
    title: 'RemindiQ: WhatsApp Reminders & Enquiry Tracking',
    description:
      'How Bellvix built RemindiQ for a UAE trading group: an enquiry pipeline, a reminders engine with acknowledgement, and a WhatsApp assistant for staff.',
    h1: 'RemindiQ: compliance reminders and enquiry tracking on WhatsApp',
    summary:
      'A UAE trading group replaced spreadsheets and memory with one system for enquiries and deadlines, and a WhatsApp assistant that puts reminders in front of the right person.',
    client: 'A UAE trading group',
    tags: ['Trading & distribution', 'Custom software', 'WhatsApp assistant'],
    challenge: [
      'Renewals, payments and compliance deadlines were tracked in spreadsheets, so dates slipped.',
      'Customer enquiries were easy to lose, and some were never followed up.',
      'Owners had no single view of what was done, what was pending and who was responsible.',
    ],
    solution: [
      'We built RemindiQ, which combines an enquiry pipeline with a reminders engine.',
      'Each reminder goes to the responsible person, with lead times such as “on the day” or days before, and every action is logged.',
      'A WhatsApp assistant lets staff check today’s reminders, create an event or set one for a colleague without opening the app.',
    ],
    glance: [
      { label: 'Client', value: 'Trading group, UAE' },
      { label: 'Channel', value: 'Web app + WhatsApp' },
      { label: 'Users', value: 'Owners, admins, staff' },
      { label: 'Time zone', value: 'Runs on Dubai time (UTC+4)' },
    ],
    features: [
      { name: 'Enquiry pipeline board', text: 'Stages from New and Assigned through Contacted, Supplier search and Quotation, with owner, priority and overdue filters.' },
      { name: 'Reminders engine', text: 'One-off or recurring events, “remind me” lead times, and overdue, due-today and upcoming views.' },
      { name: 'Acknowledge and track', text: 'Staff acknowledge each reminder; recurring reminders are tracked per occurrence.' },
      { name: 'WhatsApp assistant', text: 'A chat menu for today’s reminders, creating an event and creating one for a staff member.' },
      { name: 'Calendar, reports and export', text: 'A calendar view, date-range reports and Excel export of enquiries and reminders.' },
      { name: 'Audit trail and roles', text: 'Every action is logged, with staff roles and notifications.' },
    ],
    outcome: [
      'Nothing depends on memory: reminders reach the responsible person on WhatsApp before the deadline.',
      'Owners see at a glance what is done, what is pending and who owns it.',
      'Enquiries move through a visible pipeline instead of getting lost in chats.',
    ],
    related: [
      { label: 'WhatsApp chatbot development', href: '/services/ai-automation/whatsapp-chatbot-development' },
      { label: 'AI & automation', href: '/services/ai-automation' },
      { label: 'Trading & distribution', href: '/industries#trading-distribution' },
    ],
  },
]

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)
