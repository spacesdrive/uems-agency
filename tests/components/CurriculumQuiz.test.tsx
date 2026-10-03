import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import { CurriculumQuizzes } from '../../src/components/CurriculumQuiz';
import { quizOutcome, quizzes } from '../../src/data/quizzes';

// jsdom may not implement modal dialogs; a minimal stand-in is enough for these tests.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

describe('quizOutcome', () => {
  it('picks the most chosen answer', () => {
    expect(quizOutcome(['A', 'A', 'C'])).toBe('A');
    expect(quizOutcome(['D', 'B', 'D'])).toBe('D');
  });

  it('breaks ties toward the later letter, like the original site', () => {
    expect(quizOutcome(['A', 'B', 'C'])).toBe('C');
  });
});

describe('CurriculumQuizzes', () => {
  it('shows one card per quiz with a start button', () => {
    render(<CurriculumQuizzes />);
    for (const quiz of quizzes) {
      expect(screen.getByRole('heading', { name: quiz.card.title })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: new RegExp(quiz.card.cta, 'i') })).toBeInTheDocument();
    }
  });

  it('runs the IB quiz from intro to a recommended path', async () => {
    const user = userEvent.setup();
    render(<CurriculumQuizzes />);
    await user.click(screen.getByRole('button', { name: /start ib quiz/i }));

    const dialog = screen.getByRole('dialog', { name: 'IB Curriculum Quiz' });
    expect(within(dialog).getByText('Choose IB Subjects Like You’re Designing Your Future')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /start quiz/i }));

    // Moving on without an answer asks for one.
    expect(within(dialog).getByRole('group', { name: /what do you enjoy most/i })).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /^next/i }));
    expect(within(dialog).getByText('Please choose an answer to continue.')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('radio', { name: /debating ideas/i }));
    await user.click(within(dialog).getByRole('button', { name: /^next/i }));
    await user.click(within(dialog).getByRole('radio', { name: /business plan/i }));
    await user.click(within(dialog).getByRole('button', { name: /^next/i }));
    expect(within(dialog).getByText('Question 3 of 3')).toBeInTheDocument();

    // Going back keeps the earlier answer.
    await user.click(within(dialog).getByRole('button', { name: /previous/i }));
    expect(within(dialog).getByRole('radio', { name: /business plan/i })).toBeChecked();
    await user.click(within(dialog).getByRole('button', { name: /^next/i }));

    await user.click(within(dialog).getByRole('radio', { name: /lawyer \/ journalist/i }));
    await user.click(within(dialog).getByRole('button', { name: /see results/i }));

    expect(within(dialog).getByRole('heading', { name: 'Commerce / Business' })).toBeInTheDocument();
    expect(within(dialog).getByText('Strategic Mind')).toBeInTheDocument();
    expect(within(dialog).getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    expect(within(dialog).getByRole('link', { name: /try evaltest/i })).toHaveAttribute('href', 'https://www.evaltest.com/');
  });

  it('starts fresh each time a quiz is opened', async () => {
    const user = userEvent.setup();
    render(<CurriculumQuizzes />);
    await user.click(screen.getByRole('button', { name: /start icse quiz/i }));
    let dialog = screen.getByRole('dialog', { name: 'ICSE Curriculum Quiz' });
    await user.click(within(dialog).getByRole('button', { name: /start quiz/i }));
    await user.click(within(dialog).getByRole('radio', { name: /building a working model|math & science/i }));
    await user.click(within(dialog).getByRole('button', { name: /close quiz/i }));

    await user.click(screen.getByRole('button', { name: /start icse quiz/i }));
    dialog = screen.getByRole('dialog', { name: 'ICSE Curriculum Quiz' });
    expect(within(dialog).getByText('Get ready')).toBeInTheDocument();
  });
});
