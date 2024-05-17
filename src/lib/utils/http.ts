import { error, type NumericRange } from '@sveltejs/kit';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestConfigGet = {
	query?: QueryParams;
	headers?: Record<string, string>;
	rawURL?: boolean;
};

type RequestConfig = {
	query?: QueryParams;
	body?: Record<string, unknown>;
	headers?: Record<string, string>;
	rawURL?: boolean;
};

export class HTTPError extends Error {
	constructor(
		public status: NumericRange<400, 599>,
		public message: string,
	) {
		super(message);
	}
}

export function querystring(params: QueryParams): string {
	return Object.entries(params)
		.filter(([, v]) => Boolean(v))
		.map(([k, v]) => `${k}=${encodeURIComponent(v || '')}`)
		.join('&');
}

export function handleRequestError(err: unknown): never {
	if (err instanceof HTTPError) {
		error(err.status, err.message);
	} else if (err instanceof Error) {
		error(500, err.message);
	}
	error(500, `${err}`);
}

export class Requestor {
	constructor(private readonly baseURL: string) {}

	async request<T>(url: string, method: Method, config?: RequestConfig): Promise<T> {
		const query = config?.query ? `?${querystring(config.query)}` : '';
		const reqURL = url.includes('://') ? `${url}${query}` : `${this.baseURL}${url}${query}`;

		const result = await fetch(reqURL, {
			...config,
			method,
			body: config?.body ? JSON.stringify(config.body) : undefined,
			headers: {
				'Content-Type': 'application/json',
				...config?.headers,
			},
		});
		if (!result.ok) {
			throw new Error(`HTTP error: ${result.status}`);
		}

		return result.json();
	}

	async get<T>(url: string, config?: RequestConfigGet): Promise<T> {
		return this.request(url, 'GET', config);
	}

	async post<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request(url, 'POST', config);
	}

	async put<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request(url, 'PUT', config);
	}

	async del<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request(url, 'DELETE', config);
	}
}
