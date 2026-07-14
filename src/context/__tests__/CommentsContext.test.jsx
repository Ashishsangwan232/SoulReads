import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommentProvider, useComments } from '../CommentsContext';
import api from '../../services/api';

vi.mock('../../services/api', () => ({
  default: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));

// CommentsContext depends on LikeContext for per-comment like status; mock it
// out so this suite can focus purely on the comment-fetching behavior.
vi.mock('../LikeContext', () => ({
  useLikeContext: () => ({ checkUserLikeStatus: vi.fn().mockResolvedValue({ liked: false }) }),
}));

function Consumer({ postId }) {
  const { comments, fetchComments } = useComments();
  return (
    <div>
      <button onClick={() => fetchComments(postId, true)}>load</button>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
}

describe('CommentsContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('unwraps the paginated {comments, pagination} envelope the real API returns', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        comments: [{ _id: 'c1', content: 'Nice post!' }],
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
      },
    });

    render(
      <CommentProvider>
        <Consumer postId="post-1" />
      </CommentProvider>
    );

    screen.getByText('load').click();

    await waitFor(() => {
      expect(screen.getByText('Nice post!')).toBeInTheDocument();
    });
  });

  it('falls back to an empty array (not a crash) if the response shape is unexpected', async () => {
    api.get.mockResolvedValueOnce({ data: {} });

    render(
      <CommentProvider>
        <Consumer postId="post-1" />
      </CommentProvider>
    );

    screen.getByText('load').click();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
