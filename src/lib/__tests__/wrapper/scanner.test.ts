import { CoreScannerWrapper } from "../../../wrapper/scanner";
import { jest } from "@jest/globals";

describe("CoreScannerWrapper", () => {
  let wrapper: CoreScannerWrapper;

  beforeEach(() => {
    wrapper = new CoreScannerWrapper({ target: "mainnet" });
  });

  it("should initialize with default config", () => {
    const defaultWrapper = new CoreScannerWrapper();
    expect(defaultWrapper).toBeInstanceOf(CoreScannerWrapper);
  });

  it("should initialize with custom config", () => {
    const customWrapper = new CoreScannerWrapper({ target: "testnet" });
    expect(customWrapper).toBeInstanceOf(CoreScannerWrapper);
  });

  it("should have all required modules", () => {
    expect(wrapper.account).toBeDefined();
    expect(wrapper.contract).toBeDefined();
    expect(wrapper.nft).toBeDefined();
    expect(wrapper.stats).toBeDefined();
    expect(wrapper.utils).toBeDefined();
    expect(wrapper.account).toBeDefined();
  });

  it("should initialize modules with the same config", () => {
    const testnetWrapper = new CoreScannerWrapper({ target: "testnet" });

    // Test a method from each module to ensure they're initialized with the correct config
    const mockResponses = {
      getABI: { status: "1", data: "[]" },
      getBalances: { status: "1", data: { total: 0, list: [] } },
      getSupply: { status: "1", data: { totalIssued: "1000000000000000000" } },
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
      testnetWrapper.contract.getABI({ address: validAddress }),
      testnetWrapper.nft.getBalances({ owner: validAddress }),
      testnetWrapper.stats.getSupply(),
      testnetWrapper.utils.decodeMethod({ hashes: "0x1234" }),
      testnetWrapper.account.AccountTransactions({
        account: validAddress,
      }),
    ]).then(() => {
      // Verify that fetch was called 9 times (once for each module)
      expect(fetch).toHaveBeenCalledTimes(5);
      // Verify that all calls were made to the testnet URL
      const calls = (global.fetch as jest.Mock).mock.calls;
      calls.forEach((call) => {
        expect(call[0]).toContain("testnet");
      });
    });
  });
});
