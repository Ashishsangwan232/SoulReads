import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, AuthContext } from '../AuthContext';
import { useContext } from 'react';
import api from '../../services/api';

vi.mock('../../services/api', () => ({
  default: { get: vi.fn(), post: vi.fn() },
  getErrorMessage: (err, fallback) => err?.response?.data?.message || fallback,
}));

function Consumer() {
  const { user, loading, login } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? user.username : 'anonymous'}</span>
      <button onClick={() => login('a@b.com', 'pw')}>login</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('restores the session from GET /auth/profile on mount', async () => {
    api.get.mockResolvedValueOnce({ data: { username: 'alice' } });

    render(<AuthProvider><Consumer /></AuthProvider>);

    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('alice');
    });
  });

  it('treats a failed session check as logged-out rather than crashing', async () => {
    api.get.mockRejectedValueOnce({ response: { status: 401 } });

    render(<AuthProvider><Consumer /></AuthProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('anonymous');
    });
  });

  it('clears the logged-in user when the shared api client broadcasts a 401', async () => {
    api.get.mockResolvedValueOnce({ data: { username: 'alice' } });

    render(<AuthProvider><Consumer /></AuthProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('alice');
    });

    window.dispatchEvent(new CustomEvent('auth:unauthorized'));

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('anonymous');
    });
  });
});
