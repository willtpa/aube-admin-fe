import Api from '$lib/api';
import { API_HOST, API_PORT, API_PREFIX, SSE_PREFIX } from '$env/static/private';

// const apiBaseUrl = `${API_HOST}:${API_PORT}/${API_PREFIX}`;
const sseBaseUrl = `${API_HOST}:${API_PORT}/${API_PREFIX}/${SSE_PREFIX}`;

export async function load() {
	const api = new Api();
	try {
		// start api server
		await api.start();
	} catch (e) {
		await api.stop();
		console.error(e);
	}

	return {
		sseCurrencyRates: getSSESubUrls().currencyRates
	};
}

function getSSESubUrls() {
	return {
		currencyRates: `${sseBaseUrl}/currencyrates`
	};
}
