import type { components } from './adminapi.schema';

export type ProblemDetail = components['schemas']['ProblemDetail'];

export class APIError extends Error {
    constructor(
        public status: number,
        public problem: ProblemDetail,
    ) {
        super(problem.detail);
    }
}
