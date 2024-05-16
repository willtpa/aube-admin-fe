import type { Services } from '$lib/services';

export abstract class BaseController {
	constructor(protected readonly services: Services) {}
}
