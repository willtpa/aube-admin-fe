// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        interface Error {
            // follow problem detail from RFC9457
            type: string;
            title: string;
            status: string;
            detail: string;
            instance: string;
        }
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
