import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RichTextViewer from '../RichTextViewer';

// This suite exists specifically to lock in the Phase 1 fix: RichTextViewer
// used to pass HTML `content` straight into dangerouslySetInnerHTML with no
// sanitization at all, even though `dompurify` was already an installed
// dependency (just never actually used). Any content that looked like HTML
// (or failed to parse as Slate JSON, which fell back to being treated as
// HTML) was injected into the DOM unsanitized -- a stored XSS path.
describe('RichTextViewer', () => {
  it('strips <script> tags from HTML content before rendering', () => {
    const malicious = '<p>Hello</p><script>window.__pwned = true;</script>';
    const { container } = render(<RichTextViewer content={malicious} />);

    expect(container.querySelector('script')).toBeNull();
    expect(container.textContent).toContain('Hello');
  });

  it('strips inline event-handler attributes (onerror, onclick, etc.)', () => {
    const malicious = '<img src="x" onerror="window.__pwned = true" />';
    const { container } = render(<RichTextViewer content={malicious} />);

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('onerror')).toBeNull();
  });

  it('still renders benign HTML content normally', () => {
    const safe = '<p>Just a <strong>normal</strong> post.</p>';
    const { container } = render(<RichTextViewer content={safe} />);

    expect(container.querySelector('strong')).not.toBeNull();
    expect(container.textContent).toContain('Just a');
  });

  it('treats malformed/unparseable content as HTML and still sanitizes it', () => {
    // Falls through the JSON.parse catch branch, which previously flagged
    // content as HTML and rendered it completely unsanitized.
    const malformed = 'not json and not html-looking <script>window.__pwned = true;</script>';
    const { container } = render(<RichTextViewer content={malformed} />);

    expect(container.querySelector('script')).toBeNull();
  });
});
