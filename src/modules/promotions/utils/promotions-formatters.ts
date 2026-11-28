export const formatMoney = (value: number) =>
  `${value.toLocaleString("en-US")} ج.م`;

export const addDaysToDate = (date: string, days: number) => {
  const [day, month, year] = date.split("/").map(Number);

  if (!day || !month || !year) return date;

  const result = new Date(year, month - 1, day + days);
  const resultDay = String(result.getDate()).padStart(2, "0");
  const resultMonth = String(result.getMonth() + 1).padStart(2, "0");

  return `${resultDay}/${resultMonth}/${result.getFullYear()}`;
};
