export async function readFile(filePath: string): Promise<Record<string, unknown> | null> {
    try {
        const content = await fetch(filePath);
        const result = await content.text();
        return JSON.parse(result) as Record<string, unknown>;
    } catch (error) {
        return null;
    }
}
