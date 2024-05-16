import { GoogleAuth } from './google-auth';
import { NatsEventer } from './nats-eventer';

export type CurrencyRateProvider = EventerProvider; // in the future, this could be more types
// export type ServiceProvider = CurrencyRateProvider | AuthProvider; // service specific provider

export type ServiceProviders = {
	authProvider: AuthProvider;
	currencyRateProvider: CurrencyRateProvider;
};

export interface EventerProvider {
	subscribe(subject: string, onMessage: (...args: unknown[]) => void): void;
	close(): void;
}

export interface AuthProvider {
	authenticate(username: string, password: string): Promise<string>;
}

export const initProviders = async (): Promise<ServiceProviders> => {
	return {
		authProvider: new GoogleAuth(),
		currencyRateProvider: await NatsEventer.getInstance()
	};
};
