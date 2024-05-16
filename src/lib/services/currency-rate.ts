import type { CurrencyRateProvider, ServiceProviders } from '$lib/providers';
import type { Currency } from '$lib/utils/enum';
import { BaseService } from './base';

type CurrencyRateFilters = {
	targetCurrency: Currency;
	// baseCurrency: Currency;
	// add more filters here
};

export class CurrencyRateService extends BaseService {
	private _currencyRateProvider: CurrencyRateProvider;
	constructor(serviceProviders: ServiceProviders) {
		super(serviceProviders);
		this._currencyRateProvider = this.serviceProviders.currencyRateProvider;
	}

	getRateStream(filters: CurrencyRateFilters, callback: (...args: unknown[]) => void) {
		// This is a placeholder for a real implementation
		console.log('CurrencyRateService.getRateStream called');
		const subject = filters.targetCurrency || `*`;
		this._currencyRateProvider.subscribe(subject, callback);
	}
}
