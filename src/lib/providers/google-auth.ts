import type { AuthProvider } from '.';

export class GoogleAuth implements AuthProvider {
	constructor() {}
	authenticate(username: string, password: string): Promise<string> {
		console.log('GoogleAuth.authenticate called', username, password);
		throw new Error('Method not implemented.');
	}
}
