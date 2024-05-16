import type { AuthProvider, ServiceProviders } from '$lib/providers';
import { BaseService } from './base';

export class AuthService extends BaseService {
	private _authProvider: AuthProvider;
	constructor(serviceProviders: ServiceProviders) {
		super(serviceProviders);
		this._authProvider = this.serviceProviders.authProvider;
	}
}
