export const formatISODate = (isoString: string, locale = 'en-US') => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};
