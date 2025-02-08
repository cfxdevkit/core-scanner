import { jest } from "@jest/globals";

// Extend Jest matchers
expect.extend({
  toBeValidAddress(received: string): { message: () => string; pass: boolean } {
    const pass = /^0x[a-fA-F0-9]{40}$/.test(received);
    if (pass) {
      return {
        message: (): string => `expected ${received} not to be a valid Ethereum address`,
        pass: true,
      };
    } else {
      return {
        message: (): string => `expected ${received} to be a valid Ethereum address`,
        pass: false,
      };
    }
  },
});

// Global test timeout
jest.setTimeout(30000);

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Add custom matchers to TypeScript
declare global {
  interface JestMatchers<R> {
    toBeValidAddress(): R;
  }
}
