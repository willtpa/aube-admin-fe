import { connect, type NatsConnection, StringCodec } from 'nats';
import { NATS_HOST, NATS_PORT } from '$env/static/private';
import type { EventerProvider } from '.';

export class NatsEventer implements EventerProvider {
	private static _instance: NatsEventer;
	private static _natsConnection: NatsConnection;

	private constructor() {}

	private async _init(): Promise<void> {
		const natsEndpoint = `${NATS_HOST}:${NATS_PORT}`;
		NatsEventer._natsConnection =
			NatsEventer._natsConnection ?? (await connect({ servers: natsEndpoint }));
	}

	static async getInstance(): Promise<NatsEventer> {
		if (!NatsEventer._instance) {
			NatsEventer._instance = new NatsEventer();
			await NatsEventer._instance._init();
		}
		return NatsEventer._instance;
	}

	async subscribe(subject: string, onMessage: (...args: unknown[]) => void): Promise<void> {
		console.log(`NatsEventer.subscribe called: ${JSON.stringify(subject)}`);
		const sub = NatsEventer._natsConnection.subscribe(subject);
		const sc = StringCodec();
		for await (const s of sub) {
			console.log(`[${sub.getProcessed()}]: ${sc.decode(s.data)}`);
			onMessage(sc.decode(s.data));
		}
	}

	close(): void {
		throw new Error('Method not implemented.');
	}
}
