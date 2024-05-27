export async function readFile(filePath: string) {
	try {
		const content = await fetch(filePath);
		const result = await content.text();
		return JSON.parse(result);
	} catch (error) {
		console.error('Error reading file:', error);
	}
}
