/**
 * Formats a date string to dd.mm.yyyy format.
 * Handles:
 * 1. ISO strings (2026-04-07T08:25:42.000Z)
 * 2. Date strings (2026-04-07)
 * 3. Custom strings (15. April 2026) - if it's already in a custom format, it tries to preserve it or reformat if possible.
 */
export function formatDate(dateInput: string | undefined | null): string {
  if (!dateInput) return '';

  // If it's already in dd.mm.yyyy format (roughly), return it
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateInput)) {
    return dateInput;
  }

  try {
    const date = new Date(dateInput);
    
    // Check if valid date
    if (isNaN(date.getTime())) {
      return dateInput; // Return as is if it's a custom string like "15. April 2026"
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch (e) {
    return dateInput;
  }
}
