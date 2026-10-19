/**
 * UAE e-invoicing facts. ONLY verified facts live here; every page reads from this file.
 * Sources: Ministerial Decision No. 244 of 2025, Ministerial Decision No. 66 of 2026,
 * and the UAE Ministry of Finance e-invoicing guidelines.
 */
export type Milestone = { date: string; iso: string; who: string; what: string }

export const einvoicingMilestones: Milestone[] = [
  { date: '1 Jul 2026', iso: '2026-07-01', who: 'Pilot', what: 'The e-invoicing pilot started.' },
  {
    date: '30 Oct 2026',
    iso: '2026-10-30',
    who: 'Revenue of AED 50 million or more',
    what: 'Deadline to appoint an Accredited Service Provider (ASP).',
  },
  {
    date: '1 Jan 2027',
    iso: '2027-01-01',
    who: 'Revenue of AED 50 million or more',
    what: 'E-invoicing becomes mandatory.',
  },
  {
    date: '31 Mar 2027',
    iso: '2027-03-31',
    who: 'Revenue below AED 50 million',
    what: 'Deadline to appoint an Accredited Service Provider (ASP).',
  },
  {
    date: '1 Jul 2027',
    iso: '2027-07-01',
    who: 'Revenue below AED 50 million',
    what: 'E-invoicing becomes mandatory.',
  },
  { date: '1 Oct 2027', iso: '2027-10-01', who: 'Government entities', what: 'E-invoicing becomes mandatory.' },
]

export const einvoicingSources = [
  'Ministerial Decision No. 244 of 2025',
  'Ministerial Decision No. 66 of 2026',
  'UAE Ministry of Finance e-invoicing guidelines',
]

export const aspPositioning =
  'Bellvix is not an Accredited Service Provider. We make your system e-invoicing ready and connect it to the Accredited Service Provider you appoint.'
