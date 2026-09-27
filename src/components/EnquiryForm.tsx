import { useId, useState, type FormEvent } from 'react';
import { enquiryOptions, enquiryPresets, site, type EnquiryPreset } from '../data/site';
import { submitEnquiry, type Enquiry } from '../lib/enquiry';
import { cx } from '../lib/cx';
import { Button } from './Button';
import { Icon } from './Icon';
import s from './EnquiryForm.module.css';

type Field = Exclude<keyof Enquiry, 'interest'>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'mail-client' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{7,20}$/;

function validate(data: Enquiry): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(data.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!data.phone.trim()) errors.phone = 'Please enter your contact number.';
  else if (!phonePattern.test(data.phone.trim())) errors.phone = 'Please enter a valid contact number.';
  return errors;
}

interface EnquiryFormProps {
  className?: string;
  /** Adds a specialised choice (e.g. migration destination) and preselects the query type. */
  preset?: EnquiryPreset;
}

export function EnquiryForm({ className, preset }: EnquiryFormProps) {
  const id = useId();
  const extra = preset ? enquiryPresets[preset] : undefined;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Enquiry = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      heardFrom: String(fd.get('heardFrom') ?? ''),
      queryAbout: String(fd.get('queryAbout') ?? ''),
      question: String(fd.get('question') ?? ''),
      interest: extra ? { label: extra.legend, value: String(fd.get('interest') ?? '') } : undefined,
    };
    const found = validate(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const result = await submitEnquiry(data);
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

  return (
    <form className={cx(s.form, className)} noValidate onSubmit={onSubmit}>
      {extra && (
        <fieldset className={s.choice}>
          <legend>{extra.legend}</legend>
          <div className={s.choiceOptions}>
            {extra.options.map((option, i) => (
              <label key={option} className={s.choiceOption}>
                <input type="radio" name="interest" value={option} defaultChecked={i === 0} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className={s.grid}>
        <div className={s.field}>
          <label htmlFor={`${id}-name`}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {error('name')}
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-email`}>
            Your email <span aria-hidden="true">*</span>
          </label>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
          {error('email')}
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-phone`}>
            Your contact number <span aria-hidden="true">*</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" required {...fieldProps('phone')} />
          {error('phone')}
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-heardFrom`}>Where did you hear about us</label>
          <div className={s.select}>
            <select defaultValue="" {...fieldProps('heardFrom')}>
              <option value="">Select an option</option>
              {enquiryOptions.heardFrom.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>
        <div className={cx(s.field, s.full)}>
          <label htmlFor={`${id}-queryAbout`}>What is your query about</label>
          <div className={s.select}>
            <select defaultValue={extra?.query ?? ''} {...fieldProps('queryAbout')}>
              <option value="">Select an option</option>
              {enquiryOptions.queryAbout.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>
        <div className={cx(s.field, s.full)}>
          <label htmlFor={`${id}-question`}>What is your question</label>
          <textarea rows={4} {...fieldProps('question')} />
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
        <Button type="submit" label={status === 'submitting' ? 'Sending…' : 'Send enquiry'} disabled={status === 'submitting'} />
      </div>

      <p className={cx(s.status, status === 'error' && s.statusError)} role="status" aria-live="polite">
        {status === 'sent' && 'Thank you — your enquiry has been sent. Our team will get back to you within 24 hours.'}
        {status === 'mail-client' && (
          <>
            Your email app should now open with your enquiry addressed to {site.email}. If it doesn’t, call us on{' '}
            <a href={site.phones[0].href}>{site.phones[0].display}</a>.
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
