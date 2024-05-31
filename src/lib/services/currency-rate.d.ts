import { Decimal } from 'decimal.js';

export interface MedianFxRateV1 {
    id: string;
    version: number;
    providers_contrib: Record<string, Decimal>;
    rates_count: number;
    outliers_perc: number;
    created_at: Date;

    base: string;
    quote: string;
    rate_base_quote: Decimal;
    rate_base_usd: Decimal;
    rate_usd_quote: Decimal;
}

export type CurrencyTypeFilter = 'all' | 'crypto' | 'fiat';

export type CurrencyCodeToMedianFxRateV1Map = Record<string, MedianFxRateV1>;
