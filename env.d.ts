/// <reference types="@sveltejs/kit" />

declare module '$env/static/public' {
    export const PUBLIC_ADMINAPI_HOST: string;
    // Add more environment variables as needed
}

declare module '$env/static/private' {
    export const CF_ACCESS_CLIENT_SECRET: string;
    export const CF_ACCESS_CLIENT_ID: string;
    // Add more environment variables as needed
}
