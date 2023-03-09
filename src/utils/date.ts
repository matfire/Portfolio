export function formatDate(date: Date) {
  return `${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
}
