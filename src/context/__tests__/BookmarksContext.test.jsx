import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookmarksProvider, useBookmarks } from '../BookmarksContext';
import { AuthContext } from '../AuthContext';
import api from '../../services/api';

vi.mock('../../services/api', () => ({
  default: { get: vi.fn(), post: vi.fn() },
}));

function Consumer() {
  const { bookmarks, isBookmarked } = useBookmarks();
  return (
    <div>
      <span data-testid="count">{bookmarks.length}</span>
      <span data-testid="is-bookmarked">{String(isBookmarked('post-1'))}</span>
    </div>
  );
}

function renderWithUser(user = { _id: 'user-1' }) {
  return render(
    <AuthContext.Provider value={{ user }}>
      <BookmarksProvider>
        <Consumer />
      </BookmarksProvider>
    </AuthContext.Provider>
  );
}

describe('BookmarksContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('unwraps the paginated {bookmarks, pagination} envelope the real API returns', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        bookmarks: [{ post: { _id: 'post-1', title: 'Bookmarked post' } }],
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
      },
    });

    renderWithUser();

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1');
      expect(screen.getByTestId('is-bookmarked')).toHaveTextContent('true');
    });
  });

  it('falls back to an empty array (not a crash) if the response shape is unexpected', async () => {
    api.get.mockResolvedValueOnce({ data: {} });

    renderWithUser();

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('0');
    });
  });

  it('does not fetch bookmarks when there is no logged-in user', async () => {
    renderWithUser(null);

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('0');
    });
    expect(api.get).not.toHaveBeenCalled();
  });
});
