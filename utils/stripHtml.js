export const stripHtml = (html = '', maxLength = 250) => {
  const stripped = html.replace(/<[^>]+>/g, '');
  return stripped.length > maxLength
    ? stripped.slice(0, maxLength).trim() + '...'
    : stripped;
};
