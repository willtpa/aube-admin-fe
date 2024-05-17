// import {
// 	ADMINAPI_HOST,
// 	ADMINAPI_PORT,
// 	ADMINAPI_PREFIX,
// 	RATES_SSE_PREFIX
// } from '$env/static/private';

// const adminAPIBaseURL = `${ADMINAPI_HOST}:${ADMINAPI_PORT}/${ADMINAPI_PREFIX}`;

export async function load() {
	return {
		sseCurrencyRates: `http://localhost:8085/admin/api/rates/sse?stream="FXRATE"`
	};
}
