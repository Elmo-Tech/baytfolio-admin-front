export function formatUserDate(date: string) {
  return new Intl.DateTimeFormat("en-GB").format(new Date(date));
}

export function formatUserLastLogin(date: string) {
  const loginDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const time = new Intl.DateTimeFormat("ar-EG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(loginDate);

  if (loginDate.toDateString() === today.toDateString())
    return `اليوم، ${time}`;
  if (loginDate.toDateString() === yesterday.toDateString()) {
    return `أمس، ${time}`;
  }

  return formatUserDate(date);
}
