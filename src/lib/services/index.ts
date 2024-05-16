import type { ServiceProviders } from '$lib/providers';
import { AuthService } from './auth';
import { CurrencyRateService } from './currency-rate';

export type Services = {
	authService: AuthService;
	currencyRateService: CurrencyRateService;
};

export const initServices = (serviceProviders: ServiceProviders): Services => {
	return {
		authService: new AuthService(serviceProviders),
		currencyRateService: new CurrencyRateService(serviceProviders)
	};
};
