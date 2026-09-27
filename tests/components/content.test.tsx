import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { RichText } from '../../src/components/RichText';
import { SmartLink } from '../../src/components/SmartLink';
import { destinations } from '../../src/data/home';
import { Destinations } from '../../src/sections/home/Destinations';

const inRouter = (ui: React.ReactNode) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('RichText', () => {
  it('renders bold text and internal links from inline markup', () => {
    inRouter(<RichText text="Talk to **our experts** or [contact us](/contact-us) today." />);
    expect(screen.getByText('our experts').tagName).toBe('STRONG');
    expect(screen.getByRole('link', { name: 'contact us' })).toHaveAttribute('href', '/contact-us');
    expect(document.body).toHaveTextContent('Talk to our experts or contact us today.');
  });

  it('leaves plain text untouched', () => {
    inRouter(<RichText text="No markup [here] (really)." />);
    expect(document.body).toHaveTextContent('No markup [here] (really).');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('SmartLink', () => {
  it('opens external links in a new tab safely and announces it', () => {
    inRouter(<SmartLink to="https://www.ielts.org">IELTS</SmartLink>);
    const link = screen.getByRole('link', { name: /^IELTS\s*\(opens in a new tab\)$/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps tel: and mailto: links in the same tab', () => {
    inRouter(<SmartLink to="mailto:info@uemsventures.com">Email</SmartLink>);
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveAttribute('href', 'mailto:info@uemsventures.com');
  });
});

describe('Destinations tabs', () => {
  const items = destinations.items;

  it('shows the first destination and uses roving tabindex', () => {
    inRouter(<Destinations index={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(items.length);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  it('supports arrow, Home and End keys', async () => {
    const user = userEvent.setup();
    inRouter(<Destinations index={1} />);
    const tabs = screen.getAllByRole('tab');

    await user.click(tabs[0]!);
    await user.keyboard('{ArrowDown}');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(tabs.at(-1)).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[0]).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(tabs.at(-1)).toHaveFocus();
    await user.keyboard('{Home}');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('links the selected tab to its panel', async () => {
    const user = userEvent.setup();
    inRouter(<Destinations index={1} />);
    const second = screen.getAllByRole('tab')[1]!;
    await user.click(second);
    const panel = screen.getByRole('tabpanel');
    expect(second).toHaveAttribute('aria-controls', panel.id);
  });
});
