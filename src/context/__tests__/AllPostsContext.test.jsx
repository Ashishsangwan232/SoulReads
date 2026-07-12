import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AllPostsProvider, useAllPosts } from '../AllPostsContext';
import api from '../../services/api';

// This suite exists specifically to catch the class of bug that shipped to
// production originally: GET /posts/getAll returns { posts, pagination } per
// API_REFERENCE.md, and the context previously did `Array.isArray(res.data)`
// (always false against an object) or assigned the whole envelope to state.
// Both silently produced an empty/broken feed. This locks in the fix.
vi.mock('../../services/api', () => ({
  default: { get: vi.fn() },
  getErrorMessage: (err, fallback) => err?.message || fallback,
}));

function Consumer() {
  const { posts, loading } = useAllPosts();
  if (loading) return <div>loading</div>;
  return (
    <ul>
      {posts.map((p) => (
        <li key={p._id}>{p.title}</li>
      ))}
    </ul>
  );
}

describe('AllPostsContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('unwraps the paginated {posts, pagination} envelope the real API returns', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        posts: [{ _id: '1', title: 'First post' }, { _id: '2', title: 'Second post' }],
        pagination: { page: 1, limit: 20, total: 2, totalPages: 1 },
      },
    });

    render(
      <AllPostsProvider>
        <Consumer />
      </AllPostsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('First post')).toBeInTheDocument();
      expect(screen.getByText('Second post')).toBeInTheDocument();
    });
  });

  it('falls back to an empty array (not a crash) if the response shape is unexpected', async () => {
    api.get.mockResolvedValueOnce({ data: {} });

    render(
      <AllPostsProvider>
        <Consumer />
      </AllPostsProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('loading')).not.toBeInTheDocument();
    });
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
