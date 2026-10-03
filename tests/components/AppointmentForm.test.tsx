import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppointmentForm, todayIso, validateAppointment } from '../../src/components/AppointmentForm';
import type * as enquiry from '../../src/lib/enquiry';
import { submitAppointment } from '../../src/lib/enquiry';

vi.mock('../../src/lib/enquiry', async (importOriginal) => ({
  ...(await importOriginal<typeof enquiry>()),
  submitAppointment: vi.fn<typeof submitAppointment>(),
}));
const submit = vi.mocked(submitAppointment);

function renderForm() {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <AppointmentForm />
    </MemoryRouter>,
  );
  return user;
}

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return todayIso(d);
};

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), 'Asha Rao');
  await user.type(screen.getByLabelText(/your email/i), 'asha@example.com');
  await user.type(screen.getByLabelText(/your contact number/i), '+91 98765 43210');
  await user.selectOptions(screen.getByLabelText(/appointment about/i), 'Migration');
  await user.type(screen.getByLabelText(/preferred date/i), tomorrow());
  await user.selectOptions(screen.getByLabelText(/preferred time/i), 'Afternoon');
}

const requestButton = () => screen.getByRole('button', { name: /request appointment/i });

beforeEach(() => {
  submit.mockReset();
});

describe('validateAppointment', () => {
  const base = {
    name: 'A',
    email: 'a@b.co',
    phone: '+91 98765 43210',
    date: '2026-10-14',
    time: 'Morning',
    mode: 'Phone call',
    topic: 'Migration',
    message: '',
  };

  it('accepts a complete request for today or later', () => {
    expect(validateAppointment(base, '2026-10-14')).toEqual({});
  });

  it('rejects dates in the past', () => {
    expect(validateAppointment(base, '2026-10-15').date).toBe('Please choose today or a later date.');
  });
});

describe('AppointmentForm', () => {
  it('blocks the earliest date from being in the past', () => {
    renderForm();
    expect(screen.getByLabelText(/preferred date/i)).toHaveAttribute('min', todayIso());
  });

  it('lists every required field that is missing and focuses the first', async () => {
    const user = renderForm();
    await user.click(requestButton());

    for (const message of [
      'Please enter your name.',
      'Please enter your email address.',
      'Please enter your contact number.',
      'Please choose a preferred date.',
      'Please choose a preferred time.',
      'Please tell us what the appointment is about.',
    ]) {
      expect(screen.getByText(message)).toBeInTheDocument();
    }
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(submit).not.toHaveBeenCalled();
  });

  it('sends the request and confirms the chosen slot', async () => {
    submit.mockResolvedValue('sent');
    const user = renderForm();
    await user.click(screen.getByRole('radio', { name: 'Online video call' }));
    await fillValid(user);
    await user.type(screen.getByLabelText(/anything we should know/i), 'Skilled visa options');
    await user.click(requestButton());

    expect(submit).toHaveBeenCalledWith({
      name: 'Asha Rao',
      email: 'asha@example.com',
      phone: '+91 98765 43210',
      date: tomorrow(),
      time: 'Afternoon',
      mode: 'Online video call',
      topic: 'Migration',
      message: 'Skilled visa options',
    });
    expect(await screen.findByText(/your appointment request for .* \(afternoon\) has been sent/i)).toBeInTheDocument();
  });

  it('asks the visitor to send the email when their mail app is used', async () => {
    submit.mockResolvedValue('mail-client');
    const user = renderForm();
    await fillValid(user);
    await user.click(requestButton());
    expect(await screen.findByText(/your email app should now open with your appointment request/i)).toBeInTheDocument();
  });

  it('offers phone and email when sending fails', async () => {
    submit.mockRejectedValue(new Error('network'));
    const user = renderForm();
    await fillValid(user);
    await user.click(requestButton());
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
