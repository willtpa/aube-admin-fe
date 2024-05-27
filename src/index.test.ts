import { describe, it, expect } from 'vitest';

describe('sum test', () => {
    it('adds 1 + 2 to equal 3', () => {
        const input = 2;
        const output = 3;
        expect(1 + input).toBe(output);
    });
});
