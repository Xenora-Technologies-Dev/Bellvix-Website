export type ChatMsg =
  | { from: 'bot'; text: string; time: string; buttons?: string[] }
  | { from: 'me'; text: string; time: string; quote?: string }

export const clinicChat: ChatMsg[] = [
  {
    from: 'bot',
    text: 'Hello Layla, your Physiotherapy session is booked.\n\nTue 20 Oct, 10:00 – 11:00\nRoom 2\n\nPlease confirm your appointment.',
    time: '18:02',
    buttons: ['Confirm', 'Reschedule', 'Cancel'],
  },
  { from: 'me', text: 'Reschedule', time: '18:04' },
  {
    from: 'bot',
    text: 'No problem. Available slots on Wed 21 Oct:\n1. 09:30 – 10:30\n2. 15:00 – 16:00',
    time: '18:04',
    buttons: ['09:30', '15:00'],
  },
  { from: 'me', text: '15:00', time: '18:05' },
  { from: 'bot', text: 'Done. Your session is moved to Wed 21 Oct, 15:00 – 16:00. See you then.', time: '18:05' },
]

export const remindiqChat: ChatMsg[] = [
  {
    from: 'bot',
    text: 'Hello Omar.\n\nWhat do you want to do?\n1. Today’s reminders\n2. Create an event\n3. Event for a staff member',
    time: '09:00',
    buttons: ['Today’s reminders', 'Create an event', 'For a staff member'],
  },
  { from: 'me', text: 'Today’s reminders', time: '09:01', quote: 'What do you want to do?' },
  {
    from: 'bot',
    text: 'Reminders due on 20 Oct 2026:\n\n• VAT return filing\n• Vehicle registration renewal',
    time: '09:01',
    buttons: ['Completed', 'Remind tomorrow'],
  },
  { from: 'me', text: 'Completed', time: '09:03' },
  { from: 'bot', text: 'Marked as completed and logged. The owner summary is updated.', time: '09:03' },
]
