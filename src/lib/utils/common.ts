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
    const notFound = -1;
    return (
        ['BTC', 'ETH', 'MATIC', 'SOL', 'MATIC', 'TRX', 'XLM', 'USDT', 'USDC'].indexOf(symbol) !=
        notFound
    );
}
