import { Router } from 'express';
import type { Controllers } from './controllers';

export function sseRouterFactory(controllers: Controllers): Router {
	const router = Router();

	router.get('/currencyrates', controllers.currencyRateController.getRateStream);

	return router;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function restfulRouterFactory(controllers: Controllers): Router {
	const router = Router();

	// define restful routes here

	return router;
}
