import { useId, useState, type FormEvent } from 'react';
import { appointmentOptions, site } from '../data/site';
import { cx } from '../lib/cx';
import { formatDate, submitAppointment, type Appointment } from '../lib/enquiry';
import { Button } from './Button';
import { Icon } from './Icon';
import s from './EnquiryForm.module.css';

type Field = Exclude<keyof Appointment, 'mode' | 'message'>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'mail-client' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{7,20}$/;

/** Today's date as YYYY-MM-DD in the visitor's own time zone. */
export function todayIso(now = new Date()): string {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function validateAppointment(data: Appointment, today: string): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(data.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!data.phone.trim()) errors.phone = 'Please enter your contact number.';
  else if (!phonePattern.test(data.phone.trim())) errors.phone = 'Please enter a valid contact number.';
  if (!data.date) errors.date = 'Please choose a preferred date.';
  else if (data.date < today) errors.date = 'Please choose today or a later date.';
  if (!data.time) errors.time = 'Please choose a preferred time.';
  if (!data.topic) errors.topic = 'Please tell us what the appointment is about.';
  return errors;
}

/** Sets the earliest selectable date on mount (the page is pre-rendered, so a build-time date would be stale). */
function setMinToday(input: HTMLInputElement | null) {
  if (input) input.min = todayIso();
}

/** Appointment request, emailed to UEMS (replaces the former third-party booking widget). */
export function AppointmentForm({ className }: { className?: string }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [requested, setRequested] = useState<Appointment | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const value = (name: keyof Appointment) => String(fd.get(name) ?? '').trim();
    const data: Appointment = {
      name: value('name'),
      email: value('email'),
      phone: value('phone'),
      date: value('date'),
      time: value('time'),
      mode: value('mode'),
      topic: value('topic'),
      message: value('message'),
    };
    const found = validateAppointment(data, todayIso());
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const result = await submitAppointment(data);
      setRequested(data);
      setStatus(result);
      if (result === 'sent') form.reset();
    } catch {
      setStatus('error');
    }
  }

  const fieldProps = (name: Field) => ({
    id: `${id}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });

  const error = (name: Field) =>
    errors[name] && (
      <p id={`${id}-${name}-error`} className={s.error}>
        {errors[name]}
      </p>
    );

  const label = (name: Field, text: string) => (
    <label htmlFor={`${id}-${name}`}>
      {text} <span aria-hidden="true">*</span>
    </label>
  );

  const select = (name: Field, options: readonly string[]) => (
    <div className={s.select}>
      <select defaultValue="" required {...fieldProps(name)}>
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Icon name="chevron-down" size={16} />
    </div>
  );

  return (
    <form className={cx(s.form, className)} noValidate onSubmit={onSubmit}>
      <fieldset className={s.choice}>
        <legend>How would you like to meet?</legend>
        <div className={s.choiceOptions}>
          {appointmentOptions.mode.map((option, i) => (
            <label key={option} className={s.choiceOption}>
              <input type="radio" name="mode" value={option} defaultChecked={i === 0} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={s.grid}>
        <div className={s.field}>
          {label('name', 'Your name')}
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {error('name')}
        </div>
        <div className={s.field}>
          {label('email', 'Your email')}
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
          {error('email')}
        </div>
        <div className={s.field}>
          {label('phone', 'Your contact number')}
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required {...fieldProps('phone')} />
          {error('phone')}
        </div>
        <div className={s.field}>
          {label('topic', 'Appointment about')}
          {select('topic', appointmentOptions.topic)}
          {error('topic')}
        </div>
        <div className={s.field}>
          {label('date', 'Preferred date')}
          <input type="date" ref={setMinToday} required {...fieldProps('date')} />
          {error('date')}
        </div>
        <div className={s.field}>
          {label('time', 'Preferred time')}
          {select('time', appointmentOptions.time)}
          {error('time')}
        </div>
        <div className={cx(s.field, s.full)}>
          <label htmlFor={`${id}-message`}>Anything we should know before we meet?</label>
          <textarea id={`${id}-message`} name="message" rows={4} />
        </div>
      </div>

      <div className={s.footer}>
        <ul role="list" className={s.trust}>
          <li>
            <Icon name="lock" size={14} /> Secure
          </li>
          <li>
            <Icon name="shield" size={14} /> Private
          </li>
          <li>
            <Icon name="clock" size={14} /> Responds within 24hrs
          </li>
        </ul>
        <Button
          type="submit"
          label={status === 'submitting' ? 'Sending…' : 'Request appointment'}
          disabled={status === 'submitting'}
        />
      </div>

      <p className={cx(s.status, status === 'error' && s.statusError)} role="status" aria-live="polite">
        {status === 'sent' &&
          requested &&
          `Thank you. Your appointment request for ${formatDate(requested.date)} (${requested.time.toLowerCase()}) has been sent. Our team will confirm the time with you within 24 hours.`}
        {status === 'mail-client' && (
          <>
            Your email app should now open with your appointment request addressed to {site.email}. Please press send.
            If it doesn’t open, call us on <a href={site.phones[0].href}>{site.phones[0].display}</a>.
          </>
        )}
        {status === 'error' && (
          <>
            Sorry, something went wrong. Please email <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
            <a href={site.phones[0].href}>{site.phones[0].display}</a>.
          </>
        )}
      </p>
    </form>
  );
}
