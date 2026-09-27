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

const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

/**
 * Sends an enquiry to the configured form endpoint (JSON POST).
 * Without an endpoint, opens the visitor's mail client addressed to UEMS
 * with the enquiry pre-filled, so the form always leads somewhere real.
 */
export async function submitEnquiry(data: Enquiry): Promise<EnquiryResult> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Enquiry failed with status ${res.status}`);
    return 'sent';
  }

  window.location.href = buildMailto(data);
  return 'mail-client';
}

/** A mailto: URL addressed to UEMS with the enquiry pre-filled as subject and body. */
export function buildMailto(data: Enquiry): string {
  const lines = [`Name: ${data.name}`, `Email: ${data.email}`, `Contact number: ${data.phone}`];
  if (data.heardFrom) lines.push(`Where did you hear about us: ${data.heardFrom}`);
  if (data.queryAbout) lines.push(`Query about: ${data.queryAbout}`);
  if (data.interest) lines.push(`${data.interest.label}: ${data.interest.value}`);
  if (data.question) lines.push('', data.question);
  const subject = `Website enquiry${data.queryAbout ? ` – ${data.queryAbout}` : ''}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
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

/** Sends a registration like an enquiry: JSON POST to the endpoint, or a pre-filled email. */
export async function submitRegistration(data: Registration): Promise<EnquiryResult> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form: 'free-counselling-registration', ...data }),
    });
    if (!res.ok) throw new Error(`Registration failed with status ${res.status}`);
    return 'sent';
  }

  window.location.href = buildRegistrationMailto(data);
  return 'mail-client';
}

export function buildRegistrationMailto(data: Registration): string {
  const lines = (Object.keys(registrationLabels) as (keyof Registration)[])
    .filter((key) => data[key])
    .map((key) => `${registrationLabels[key]}: ${data[key]}`);
  const subject = `Free counselling registration – ${data.applicantName}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
