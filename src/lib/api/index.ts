import cors from 'cors';
import express from 'express';
import http from 'http';
import { API_PORT, API_PREFIX, SSE_PREFIX } from '$env/static/private';
import { initControllers } from './controllers';
import { initProviders } from '$lib/providers';
import { initServices } from '$lib/services';
import { restfulRouterFactory, sseRouterFactory } from './router';

export default class Api {
	private static _instance: Api;
	private static _serverConnection: http.Server | null = null;

	constructor() {
		if (Api._instance) {
			return Api._instance;
		}
		Api._instance = this;
	}

	async start() {
		if (!Api._serverConnection) {
			const api = await this._init();
			Api._serverConnection = api.listen(API_PORT, () => {
				console.log(`API started at PORT: ${API_PORT}`);
			});
		}

		return Api._serverConnection;
	}

	async stop() {
		if (!Api._serverConnection) {
			console.log('API server is not running');
			return;
		}
		console.log('shutting down API server');
		Api._serverConnection.close();
	}

	private async _init(): Promise<express.Express> {
		const api = express();
		const providers = await initProviders();
		const services = initServices(providers);
		const controllers = initControllers(services);

		// initiate router for sse
		const sseRouter = sseRouterFactory(controllers);
		// initiate router for restful
		const restfulRouter = restfulRouterFactory(controllers);

		api.use(cors());
		api.use(express.json());

		// setup routes
		api.use(`/${API_PREFIX}/${SSE_PREFIX}`, sseRouter);
		api.use(`/${API_PREFIX}`, restfulRouter);

		return api;
	}
}
