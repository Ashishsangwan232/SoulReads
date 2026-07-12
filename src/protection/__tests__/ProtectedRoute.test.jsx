import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ProtectedRoute from '../ProtectedRoute';
import { AuthContext } from '../../context/AuthContext';

function renderProtected(authValue) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('ProtectedRoute', () => {
  it('shows a loading state while auth status is being determined', () => {
    renderProtected({ user: null, loading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument();
  });

  it('redirects to /login when there is no logged-in user', () => {
    renderProtected({ user: null, loading: false });
    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument();
  });

  it('renders the protected content when a user is logged in', () => {
    renderProtected({ user: { _id: 'user-1' }, loading: false });
    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });
});
