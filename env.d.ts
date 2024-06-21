/// <reference types="@sveltejs/kit" />

declare module '$env/static/public' {
    export const PUBLIC_ADMINAPI_HOST: string;
    export const PUBLIC_CF_PREVIEW_URL: string;
    // Add more environment variables as needed
}

declare module '$env/static/private' {
    export const CF_ACCESS_CLIENT_SECRET: string;
    export const CF_ACCESS_CLIENT_ID: string;
    export const USER_EMAIL: string;
    export const USER_PW: string;
    // Add more environment variables as needed
}
