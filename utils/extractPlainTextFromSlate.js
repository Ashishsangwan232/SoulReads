
export const extractPlainTextFromSlate = (content, maxLength = 60) => {
  if (!content) return '';

  // Try to parse as Slate JSON
  try {
    const parsed = typeof content === 'string' ? JSON.parse(content) : content;

    if (Array.isArray(parsed)) {
      const text = parsed
        .map(block => {
          return block?.children?.map(child => child.text || '').join('') || '';
        })
        .join(' ')
        .trim();

      return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text;
    }
  } catch {
    // If not JSON, treat as HTML string
    const plainText = content
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]+>/g, '')
      .trim();

    return plainText.length > maxLength ? plainText.slice(0, maxLength).trim() + '...' : plainText;
  }

  return '';
};
