import type { ServiceProviders } from '$lib/providers';

export abstract class BaseService {
	constructor(protected readonly serviceProviders: ServiceProviders) {}
}
