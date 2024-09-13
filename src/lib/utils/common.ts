import { CryptoCurrency } from '$utils/enum';

const DEFAULT_FRACTION_DIGITS = 2;

export async function readFile(filePath: string): Promise<Record<string, unknown> | null> {
    try {
        const content = await fetch(filePath);
        const result = await content.text();
        return JSON.parse(result) as Record<string, unknown>;
    } catch (error) {
        return null;
    }
}

export function isEnumType<T extends object>(value: unknown, obj: T): value is T[keyof T] {
    return Object.values(obj).includes(value);
}

export function isCrypto(symbol: string): boolean {
    return isEnumType(symbol, CryptoCurrency);
}

export function formatToSGTime(stringDate: string): string {
    // Convert the input string to a Date object
    const date = new Date(stringDate);

    // Convert the UTC date to Singapore timezone (SGT is UTC+8)
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Singapore',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour time format
    };
    const formatter = new Intl.DateTimeFormat('en-SG', options);

    // Format the date to '10 July 2024 14:30' format
    return formatter.format(date);
}

export function formatFiatAmount(
    n: number | string,
    fractionDigits = DEFAULT_FRACTION_DIGITS,
): string {
    const numStr = n.toString().replace(/,/g, '');
    const parts = parseFloat(numStr).toFixed(fractionDigits).toString().split('.');
    return parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '.00');
}
