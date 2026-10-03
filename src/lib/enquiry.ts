import { site } from '../data/site';

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  heardFrom: string;
  queryAbout: string;
  question: string;
  /** Specialised forms only, e.g. migration destination or coaching exam. */
  interest?: { label: string; value: string };
}

export type EnquiryResult = 'sent' | 'mail-client';

/** Which form a submission came from; the email endpoint only accepts these. */
export type FormKind = 'enquiry' | 'free-counselling-registration' | 'appointment-request';

/** A submission as it is emailed to UEMS: one subject and readable lines of text. */
export interface FormMessage {
  form: FormKind;
  subject: string;
  lines: string[];
  /** Visitor's email, so UEMS can reply straight to them. */
  replyTo?: string;
}

/**
 * Same-origin Worker route that emails submissions to UEMS (see worker/). Builds can point
 * VITE_ENQUIRY_ENDPOINT at another form service instead.
 */
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry';

/**
 * Every UEMS form is delivered the same way: a JSON POST to the email endpoint. If that fails
 * for any reason (static host without the Worker, email not set up yet, rate limit, rejected
 * input, network error), the visitor's mail client opens with the same message addressed to
 * UEMS, so a submission is never lost.
 */
async function deliver(message: FormMessage, fields: object): Promise<EnquiryResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...message, fields }),
    });
    if (res.ok) return 'sent';
  } catch {
    // Network failure: fall through to the mail app.
  }

  window.location.href = toMailto(message);
  return 'mail-client';
}

/** A mailto: URL addressed to UEMS with the message as subject and body. */
export function toMailto({ subject, lines }: FormMessage): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function enquiryMessage(data: Enquiry): FormMessage {
  const lines = [`Name: ${data.name}`, `Email: ${data.email}`, `Contact number: ${data.phone}`];
  if (data.heardFrom) lines.push(`Where did you hear about us: ${data.heardFrom}`);
  if (data.queryAbout) lines.push(`Query about: ${data.queryAbout}`);
  if (data.interest) lines.push(`${data.interest.label}: ${data.interest.value}`);
  if (data.question) lines.push('', data.question);
  const subject = `Website enquiry${data.queryAbout ? ` – ${data.queryAbout}` : ''}`;
  return { form: 'enquiry', subject, lines, replyTo: data.email };
}

export function submitEnquiry(data: Enquiry): Promise<EnquiryResult> {
  return deliver(enquiryMessage(data), data);
}

export function buildMailto(data: Enquiry): string {
  return toMailto(enquiryMessage(data));
}

/** Free counselling / Global Profile Accelerator registration. */
export interface Registration {
  role: string;
  location: string;
  applicantName: string;
  school: string;
  curriculum: string;
  grade: string;
  completionYear: string;
  phone: string;
  interest: string;
}

const registrationLabels: Record<keyof Registration, string> = {
  role: 'I am a',
  location: 'City / Country',
  applicantName: 'Applicant name',
  school: 'School name',
  curriculum: 'Curriculum',
  grade: 'Grade',
  completionYear: 'Year of completion',
  phone: 'Phone number',
  interest: 'Interested in',
};

export function registrationMessage(data: Registration): FormMessage {
  const lines = (Object.keys(registrationLabels) as (keyof Registration)[])
    .filter((key) => data[key])
    .map((key) => `${registrationLabels[key]}: ${data[key]}`);
  return { form: 'free-counselling-registration', subject: `Free counselling registration – ${data.applicantName}`, lines };
}

export function submitRegistration(data: Registration): Promise<EnquiryResult> {
  return deliver(registrationMessage(data), data);
}

export function buildRegistrationMailto(data: Registration): string {
  return toMailto(registrationMessage(data));
}

/** Appointment request from the Book appointment page. */
export interface Appointment {
  name: string;
  email: string;
  phone: string;
  /** Preferred date as YYYY-MM-DD. */
  date: string;
  time: string;
  mode: string;
  topic: string;
  message: string;
}

const appointmentLabels: Record<Exclude<keyof Appointment, 'message'>, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Contact number',
  date: 'Preferred date',
  time: 'Preferred time',
  mode: 'Meeting type',
  topic: 'Appointment about',
};

export function appointmentMessage(data: Appointment): FormMessage {
  const lines = (Object.keys(appointmentLabels) as (keyof typeof appointmentLabels)[])
    .filter((key) => data[key])
    .map((key) => `${appointmentLabels[key]}: ${key === 'date' ? formatDate(data.date) : data[key]}`);
  if (data.message) lines.push('', data.message);
  return { form: 'appointment-request', subject: `Appointment request: ${data.name}`, lines, replyTo: data.email };
}

export function submitAppointment(data: Appointment): Promise<EnquiryResult> {
  return deliver(appointmentMessage(data), data);
}

export function buildAppointmentMailto(data: Appointment): string {
  return toMailto(appointmentMessage(data));
}

/** "2026-10-14" becomes "Wednesday, 14 October 2026" (a calendar date, so no time zone shift). */
export function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
