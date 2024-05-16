import type { Services } from '$lib/services';
import type { CurrencyRateService } from '$lib/services/currency-rate';
import { type Request, type Response } from 'express';
import { BaseController } from './base';
import { Currency } from '$lib/utils/enum';

export class CurrencyRateController extends BaseController {
	private _currencyRateService: CurrencyRateService;
	constructor(services: Services) {
		super(services);
		this._currencyRateService = this.services.currencyRateService;
	}

	getRateStream = (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/event-stream');

		const targetCurrency = req.query.target as Currency;
		const filters = { targetCurrency };

		this._currencyRateService.getRateStream(filters, (message: unknown) => {
			this._writeSSEMessage(res, message);
		});
	};

	private _writeSSEMessage = (res: Response, message: unknown) => {
		return res.write(`data: ${message}\n\n`);
	};
}
