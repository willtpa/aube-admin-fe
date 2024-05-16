import type { Services } from '$lib/services';
import { CurrencyRateController } from './currency-rate';

export type Controllers = {
	currencyRateController: CurrencyRateController;
};

export function initControllers(services: Services): Controllers {
	return {
		currencyRateController: new CurrencyRateController(services)
	};
}
