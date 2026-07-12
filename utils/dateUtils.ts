// Return date in format YYYY-MM-DD calculates in X days ahead. 
// By default is 7 days
export function getFutureDate(daysAhead: number = 7): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysAhead);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}