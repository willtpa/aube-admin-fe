import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		permissions: ["clipboard-read", "clipboard-write"]
	},
	globalSetup: './tests/global-setup',
	globalTeardown: './tests/global-teardown',
};

export default config;
