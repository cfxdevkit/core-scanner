import { CoreScanner } from "../../../core/scanner";
import { jest } from "@jest/globals";

describe("CoreScanner", () => {
  let scanner: CoreScanner;

  beforeEach(() => {
    scanner = new CoreScanner({ target: "mainnet" });
  });

  it("should initialize with default config", () => {
    const defaultScanner = new CoreScanner();
    expect(defaultScanner).toBeInstanceOf(CoreScanner);
  });

  it("should initialize with custom config", () => {
    const customScanner = new CoreScanner({ target: "testnet" });
    expect(customScanner).toBeInstanceOf(CoreScanner);
  });

  it("should have all required modules", () => {
    expect(scanner.account).toBeDefined();
    expect(scanner.contract).toBeDefined();
    expect(scanner.nft).toBeDefined();
    expect(scanner.statistics).toBeDefined();
    expect(scanner.utils).toBeDefined();
  });

  it("should initialize modules with the same config", () => {
    const testnetScanner = new CoreScanner({ target: "testnet" });

    // Test a method from each module to ensure they're initialized with the correct config
    const mockResponses = {
      getBalance: { status: "1", data: "1000000000000000000" },
      getABI: { status: "1", data: "[]" },
      getBalances: { status: "1", data: { total: 0, list: [] } },
      getStatus: { status: "1", data: { isError: "0" } },
      decodeMethod: { status: "1", data: { name: "transfer" } },
      AccountTransactions: { status: "1", data: { total: 0, list: [] } },
    };

    let currentMockIndex = 0;
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(Object.values(mockResponses)[currentMockIndex++]),
      } as Response)
    );

    const validAddress = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";

    // Call one method from each module to verify they're working
    return Promise.all([
      testnetScanner.account.AccountTransactions({ account: validAddress }),
      testnetScanner.contract.getABI({ address: validAddress }),
      testnetScanner.nft.getBalances({ owner: validAddress }),
      testnetScanner.statistics.getSupply(),
      testnetScanner.utils.decodeMethod({
        hashes: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
      }),
      testnetScanner.account.AccountTransactions({
        account: validAddress,
      }),
    ]).then(() => {
      // Verify that fetch was called 9 times (once for each module)
      expect(fetch).toHaveBeenCalledTimes(6);
      // Verify that all calls were made to the testnet URL
      const calls = (global.fetch as jest.Mock).mock.calls;
      calls.forEach((call) => {
        expect(call[0]).toContain("testnet");
      });
    });
  });
});
