import { CoreScanner } from "../core";
import { CoreScannerWrapper } from "../wrapper";
import { jest } from "@jest/globals";

describe("CoreScanner", () => {
  let scanner: CoreScanner;
  let _wrapper: CoreScannerWrapper;

  beforeEach(() => {
    scanner = new CoreScanner({ target: "mainnet" });
    _wrapper = new CoreScannerWrapper({ target: "mainnet" });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve({ code: 0, message: "success", data: {} }),
      } as Response)
    ) as unknown as typeof fetch;
  });

  describe("Contract Methods", () => {
    const validAddress = "cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx";

    test("getContractABI should return contract ABI", async () => {
      const result = await scanner.getContractABI(validAddress);
      expect(result).toBeDefined();
    });

    test("getContractSourceCode should return contract source", async () => {
      const result = await scanner.getContractSourceCode(validAddress);
      expect(result).toBeDefined();
    });
  });

  describe("Token Methods", () => {
    const validAddress = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";

    test("getAccountTokens should return token list", async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              code: 0,
              data: {
                list: [],
                total: 0,
              },
            }),
        } as Response)
      ) as unknown as typeof fetch;

      const result = await scanner.getAccountTokens(validAddress);
      expect(result).toBeDefined();
    });
  });

  describe("Statistics Methods", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              code: 0,
              data: {
                list: [],
                total: 0,
              },
            }),
        } as Response)
      ) as unknown as typeof fetch;
    });

    test("getActiveAccountStats should return stats", async () => {
      const result = await scanner.getActiveAccountStats();
      expect(result.list).toBeDefined();
    });

    test("getCfxHolderStats should return stats", async () => {
      const result = await scanner.getCfxHolderStats();
      expect(result.list).toBeDefined();
    });

    test("getTopMiners should return miner stats", async () => {
      const result = await scanner.getTopMiners();
      expect(result.list).toBeDefined();
    });
  });
});

describe("CoreScannerWrapper", () => {
  let wrapper: CoreScannerWrapper;

  beforeEach(() => {
    wrapper = new CoreScannerWrapper({ target: "mainnet" });
  });

  test("getContractABI should return formatted response", async () => {
    const result = await wrapper.getContractABI("cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx");
    expect(result.formatted).toBeDefined();
    expect(result.raw).toBeDefined();
  });

  test("getSupplyStats should return formatted response", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            data: {
              totalSupply: "1000000000000000000",
              totalCirculating: "500000000000000000",
              totalStaking: "200000000000000000",
              totalCollateral: "0",
              totalEspaceTokens: "0",
              nullAddressBalance: "0",
              twoYearUnlockBalance: "0",
              fourYearUnlockBalance: "0",
              totalIssued: "0",
            },
          }),
      } as Response)
    ) as unknown as typeof fetch;

    const result = await wrapper.getSupplyStats();
    expect(result.formatted).toMatchObject({
      totalSupply: "1 CFX",
      totalCirculating: "0.5 CFX",
      totalStaking: "0.2 CFX",
    });
    expect(result.raw).toBeDefined();
  });
});
