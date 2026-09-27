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

  const lines = [`Name: ${data.name}`, `Email: ${data.email}`, `Contact number: ${data.phone}`];
  if (data.heardFrom) lines.push(`Where did you hear about us: ${data.heardFrom}`);
  if (data.queryAbout) lines.push(`Query about: ${data.queryAbout}`);
  if (data.interest) lines.push(`${data.interest.label}: ${data.interest.value}`);
  if (data.question) lines.push('', data.question);
  const subject = `Website enquiry${data.queryAbout ? ` – ${data.queryAbout}` : ''}`;
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  return 'mail-client';
}
