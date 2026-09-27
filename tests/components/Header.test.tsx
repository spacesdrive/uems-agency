import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Header } from '../../src/components/Header/Header';
import { primaryNav } from '../../src/data/site';

function GoTo({ to }: { to: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(to)}>
      go {to}
    </button>
  );
}

function renderHeader(path = '/') {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
      <Routes>
        <Route path="*" element={<GoTo to="/contact-us" />} />
      </Routes>
    </MemoryRouter>,
  );
  return user;
}

const mainNav = () => screen.getByRole('navigation', { name: 'Main' });
const menuButton = () => screen.getByRole('button', { name: /open menu|close menu/i });
const mobileMenu = () => document.getElementById('mobile-menu') as HTMLElement;

describe('Header', () => {
  it('renders every top-level section and marks the current page', () => {
    renderHeader('/contact-us');
    const nav = mainNav();
    for (const item of primaryNav.filter((i) => i.to !== '/')) {
      const control = item.children
        ? within(nav).getByRole('button', { name: item.label })
        : within(nav).getByRole('link', { name: item.label });
      expect(control).toBeInTheDocument();
    }
    expect(within(nav).getByRole('link', { name: 'Contact Us' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles a dropdown with its button and closes it with Escape', async () => {
    const user = renderHeader();
    const item = primaryNav.find((i) => i.children)!;
    const trigger = within(mainNav()).getByRole('button', { name: item.label });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the mobile menu, locks scrolling, and restores focus on Escape', async () => {
    const user = renderHeader();
    expect(mobileMenu()).toHaveAttribute('inert');

    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton()).toHaveAccessibleName('Close menu');
    expect(mobileMenu()).not.toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton()).toHaveFocus();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('closes the mobile menu after navigating to another page', async () => {
    const user = renderHeader();
    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true');

    // The route changes from outside the menu (e.g. browser history).
    const go = screen.getByRole('button', { name: 'go /contact-us', hidden: true });
    go.click();
    expect(await screen.findByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
