import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EnquiryForm } from '../../src/components/EnquiryForm';
import { submitEnquiry } from '../../src/lib/enquiry';

vi.mock('../../src/lib/enquiry', () => ({ submitEnquiry: vi.fn<typeof submitEnquiry>() }));
const submit = vi.mocked(submitEnquiry);

function renderForm(props: Parameters<typeof EnquiryForm>[0] = {}) {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <EnquiryForm {...props} />
    </MemoryRouter>,
  );
  return user;
}

async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), 'Asha Rao');
  await user.type(screen.getByLabelText(/your email/i), 'asha@example.com');
  await user.type(screen.getByLabelText(/your contact number/i), '+91 98765 43210');
}

const sendButton = () => screen.getByRole('button', { name: /send enquiry/i });

beforeEach(() => {
  submit.mockReset();
});

describe('EnquiryForm', () => {
  it('shows an error for each missing required field and focuses the first', async () => {
    const user = renderForm();
    await user.click(sendButton());

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your contact number.')).toBeInTheDocument();
    const name = screen.getByLabelText(/your name/i);
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Please enter your name.');
    expect(submit).not.toHaveBeenCalled();
  });

  it('rejects malformed email and phone values', async () => {
    const user = renderForm();
    await user.type(screen.getByLabelText(/your name/i), 'Asha');
    await user.type(screen.getByLabelText(/your email/i), 'asha@');
    await user.type(screen.getByLabelText(/your contact number/i), 'call me');
    await user.click(sendButton());

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid contact number.')).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toHaveFocus();
    expect(submit).not.toHaveBeenCalled();
  });

  it('clears a field error as soon as the user edits it', async () => {
    const user = renderForm();
    await user.click(sendButton());
    await user.type(screen.getByLabelText(/your name/i), 'A');
    expect(screen.queryByText('Please enter your name.')).not.toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
  });

  it('submits valid data, confirms, and resets the form', async () => {
    submit.mockResolvedValue('sent');
    const user = renderForm();
    await fillRequired(user);
    await user.selectOptions(screen.getByLabelText(/where did you hear/i), 'Google');
    await user.type(screen.getByLabelText(/what is your question/i), 'Hello');
    await user.click(sendButton());

    expect(submit).toHaveBeenCalledWith({
      name: 'Asha Rao',
      email: 'asha@example.com',
      phone: '+91 98765 43210',
      heardFrom: 'Google',
      queryAbout: '',
      question: 'Hello',
      interest: undefined,
    });
    expect(await screen.findByText(/your enquiry has been sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });

  it('tells the user when their mail app is used instead', async () => {
    submit.mockResolvedValue('mail-client');
    const user = renderForm();
    await fillRequired(user);
    await user.click(sendButton());
    expect(await screen.findByText(/your email app should now open/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('Asha Rao');
  });

  it('shows a fallback contact message when sending fails', async () => {
    submit.mockRejectedValue(new Error('network'));
    const user = renderForm();
    await fillRequired(user);
    await user.click(sendButton());
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('adds the preset choice and preselects the matching query type', async () => {
    submit.mockResolvedValue('sent');
    const user = renderForm({ preset: 'migration' });
    expect(screen.getByRole('group', { name: 'I want to migrate to' })).toBeInTheDocument();
    expect(screen.getByLabelText(/what is your query about/i)).toHaveValue('Migration');
    expect(screen.getByRole('radio', { name: 'Australia' })).toBeChecked();

    await user.click(screen.getByRole('radio', { name: 'Canada' }));
    await fillRequired(user);
    await user.click(sendButton());
    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        queryAbout: 'Migration',
        interest: { label: 'I want to migrate to', value: 'Canada' },
      }),
    );
  });
});
