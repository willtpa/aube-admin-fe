import { error, isHttpError, type NumericRange } from '@sveltejs/kit';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type QueryParams = Record<string, string | number | boolean | null | undefined>;

interface RequestConfigGet {
    query?: QueryParams;
    headers?: Record<string, string>;
    rawURL?: boolean;
}

interface RequestConfig {
    query?: QueryParams;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    rawURL?: boolean;
}

const StatusInternalServerError = 500;
const ErrorLowerBound = 400;
const ErrorUpperBound = 599;

export class HTTPError extends Error {
    constructor(
        public status: NumericRange<typeof ErrorLowerBound, typeof ErrorUpperBound>,
        public override message: string,
    ) {
        super(message);
    }
}

export function querystring(params: QueryParams): string {
    return Object.entries(params)
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => `${k}=${encodeURIComponent(v ?? '')}`)
        .join('&');
}

export function handleRequestError(err: unknown): never {
    if (isHttpError(err)) {
        error(err.status, err.body);
    } else if (err instanceof Error) {
        error(StatusInternalServerError);
    }
    error(StatusInternalServerError);
}

export class Requestor {
    constructor(private readonly baseURL: string) {}

    async request<T>(url: string, method: Method, config?: RequestConfig): Promise<T> {
        const query = config?.query ? `?${querystring(config.query)}` : '';
        const reqURL = url.includes('://') ? `${url}${query}` : `${this.baseURL}${url}${query}`;

        const result = await fetch(reqURL, {
            ...config,
            method,
            body: config?.body ? JSON.stringify(config.body) : null,
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
        });
        if (!result.ok) {
            throw new Error(`HTTP error: ${result.status}`);
        }

        return result.json() as Promise<T>;
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
