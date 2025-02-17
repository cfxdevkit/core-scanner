import { jest } from "@jest/globals";

// Extend Jest matchers
expect.extend({
  toBeValidAddress(received: string): { message: () => string; pass: boolean } {
    const pass = /^cfx:[a-z0-9]{42}$/.test(received);
    if (pass) {
      return {
        message: (): string => `expected ${received} not to be a valid Conflux address`,
        pass: true,
      };
    } else {
      return {
        message: (): string => `expected ${received} to be a valid Conflux address`,
        pass: false,
      };
    }
  },
  toBeValidHash(received: string): { message: () => string; pass: boolean } {
    const pass = /^0x[a-fA-F0-9]{64}$/.test(received);
    return {
      message: (): string =>
        pass
          ? `expected ${received} not to be a valid hash`
          : `expected ${received} to be a valid hash`,
      pass,
    };
  },

  toBeValidBlockNumber(received: string | number): { message: () => string; pass: boolean } {
    const num = Number(received);
    const pass = !isNaN(num) && num >= 0;
    return {
      message: (): string =>
        pass
          ? `expected ${received} not to be a valid block number`
          : `expected ${received} to be a valid block number`,
      pass,
    };
  },
});

// Global test timeout
jest.setTimeout(30000);

// Add default test config
export const TEST_CONFIG = {
  target: "mainnet" as const,
  apiKey: "test-api-key",
};

// Update global fetch mock with more realistic response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        status: "1",
        data: {},
      }),
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
    toBeValidHash(): R;
    toBeValidBlockNumber(): R;
  }
}
