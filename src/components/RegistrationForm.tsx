import { useId, useState, type FormEvent } from 'react';
import { registrationOptions, site } from '../data/site';
import { submitRegistration, type Registration } from '../lib/enquiry';
import { cx } from '../lib/cx';
import { Button } from './Button';
import { Icon } from './Icon';
import s from './EnquiryForm.module.css';

type Field = Exclude<keyof Registration, 'role' | 'interest'>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'mail-client' | 'error';

const phonePattern = /^\+?[\d\s()-]{7,20}$/;
const required: Record<Exclude<Field, 'phone'>, string> = {
  applicantName: 'Please enter the applicant’s name.',
  location: 'Please enter your city and country.',
  school: 'Please enter the school name.',
  curriculum: 'Please choose a curriculum.',
  grade: 'Please choose a grade.',
  completionYear: 'Please choose the year of completion.',
};

function validate(data: Registration): Errors {
  const errors: Errors = {};
  for (const [field, message] of Object.entries(required) as [Field, string][]) {
    if (!data[field].trim()) errors[field] = message;
  }
  if (!data.phone.trim()) errors.phone = 'Please enter a phone number.';
  else if (!phonePattern.test(data.phone.trim())) errors.phone = 'Please enter a valid phone number, with country code.';
  return errors;
}

const firstYear = new Date().getFullYear();
const completionYears = Array.from({ length: 7 }, (_, i) => String(firstYear + i));

/** Free counselling registration for career counselling, study abroad and the Global Profile Accelerator. */
export function RegistrationForm({ className }: { className?: string }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const value = (name: keyof Registration) => String(fd.get(name) ?? '');
    const data: Registration = {
      role: value('role'),
      location: value('location'),
      applicantName: value('applicantName'),
      school: value('school'),
      curriculum: value('curriculum'),
      grade: value('grade'),
      completionYear: value('completionYear'),
      phone: value('phone'),
      interest: value('interest'),
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
      const result = await submitRegistration(data);
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
        <legend>Are you a parent or a student?</legend>
        <div className={s.choiceOptions}>
          {registrationOptions.role.map((option, i) => (
            <label key={option} className={s.choiceOption}>
              <input type="radio" name="role" value={option} defaultChecked={i === 0} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className={s.choice}>
        <legend>I’m interested in</legend>
        <div className={s.choiceOptions}>
          {registrationOptions.interest.map((option, i) => (
            <label key={option} className={s.choiceOption}>
              <input type="radio" name="interest" value={option} defaultChecked={i === 0} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={s.grid}>
        <div className={s.field}>
          {label('applicantName', 'Applicant name')}
          <input type="text" autoComplete="name" required {...fieldProps('applicantName')} />
          {error('applicantName')}
        </div>
        <div className={s.field}>
          {label('location', 'City / Country')}
          <input type="text" autoComplete="address-level2" placeholder="e.g. Mumbai, India" required {...fieldProps('location')} />
          {error('location')}
        </div>
        <div className={s.field}>
          {label('school', 'School name')}
          <input type="text" autoComplete="organization" required {...fieldProps('school')} />
          {error('school')}
        </div>
        <div className={s.field}>
          {label('curriculum', 'Curriculum')}
          {select('curriculum', registrationOptions.curriculum)}
          {error('curriculum')}
        </div>
        <div className={s.field}>
          {label('grade', 'Grade')}
          {select('grade', registrationOptions.grade)}
          {error('grade')}
        </div>
        <div className={s.field}>
          {label('completionYear', 'Year of completion')}
          {select('completionYear', completionYears)}
          {error('completionYear')}
        </div>
        <div className={cx(s.field, s.full)}>
          {label('phone', 'Phone number')}
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required {...fieldProps('phone')} />
          {error('phone')}
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
            <Icon name="clock" size={14} /> Free session
          </li>
        </ul>
        <Button
          type="submit"
          label={status === 'submitting' ? 'Registering…' : 'Register for free counselling'}
          disabled={status === 'submitting'}
        />
      </div>

      <p className={cx(s.status, status === 'error' && s.statusError)} role="status" aria-live="polite">
        {status === 'sent' && 'Thank you for registering. Our counsellors will call you within 24 hours to book your free session.'}
        {status === 'mail-client' && (
          <>
            Your email app should now open with your registration addressed to {site.email}. If it doesn’t, call us on{' '}
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
