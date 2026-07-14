import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from '../Login';
import { AuthContext } from '../../context/AuthContext';
import { CountPostContext } from '../../context/CountPostContext';

// These aren't relevant to login behavior and can carry animation/canvas side
// effects that don't matter in a jsdom test environment.
vi.mock('../ParticleBackground', () => ({ default: () => null }));
vi.mock('../Footer', () => ({ default: () => null }));

function renderLogin(login) {
  return render(
    <AuthContext.Provider value={{ login }}>
      <CountPostContext.Provider value={{ refreshMyPosts: vi.fn() }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </CountPostContext.Provider>
    </AuthContext.Provider>
  );
}

describe('Login', () => {
  it('shows the backend’s actual "please verify your email" message on failed login', async () => {
    // Regression test: this component used to compare result.message against
    // a hardcoded string ('Email not verified') that the backend never
    // actually sends -- the real message per API_REFERENCE.md is "Please
    // verify your email before logging in.", so the friendlier branch was
    // unreachable dead code and the raw message should just pass through.
    const login = vi.fn().mockResolvedValue({
      success: false,
      message: 'Please verify your email before logging in.',
    });

    renderLogin(login);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please verify your email before logging in.');
    });
  });

  it('disables the submit button while a login request is in flight', async () => {
    let resolveLogin;
    const login = vi.fn(() => new Promise((resolve) => { resolveLogin = resolve; }));

    renderLogin(login);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();

    resolveLogin({ success: true });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });
});
