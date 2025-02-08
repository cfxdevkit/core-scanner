import { ESpaceScanner } from "../scanner";
import { jest } from "@jest/globals";
import { StatsPeriod } from "../../types/stats";

describe("ESpaceScanner", () => {
  let scanner: ESpaceScanner;
  const mockFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;
  const validAddress = "0x1234567890123456789012345678901234567890";
  const invalidAddress = "0xinvalid";

  beforeEach(() => {
    jest.clearAllMocks();
    scanner = new ESpaceScanner();
    global.fetch = mockFetch;
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "1", result: {} }),
      } as Response)
    );
  });

  describe("Contract Methods", () => {
    describe("getContractABI", () => {
      const mockABI = '[{"type":"function","name":"test"}]';

      beforeEach(() => {
        mockFetch.mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: mockABI }),
          } as Response)
        );
      });

      it("should fetch and parse contract ABI", async () => {
        const result = await scanner.getContractABI(validAddress);
        expect(result).toEqual(JSON.parse(mockABI));
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/api?module=contract&action=getabi&address=${validAddress}`,
          { headers: {} }
        );
      });

      it("should throw error for invalid address", async () => {
        await expect(scanner.getContractABI(invalidAddress)).rejects.toThrow("Invalid address");
      });

      it("should handle missing ABI", async () => {
        mockFetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: "" }),
          } as Response)
        );

        await expect(scanner.getContractABI(validAddress)).rejects.toThrow(
          `Contract ${validAddress} not verified or ABI not available`
        );
      });
    });

    describe("getContractSourceCode", () => {
      const mockSourceCode = {
        sourceCode: "contract Test {}",
        abi: "[]",
        contractName: "Test",
        compiler: "v0.8.0",
        optimizationUsed: true,
        runs: 200,
        constructorArguments: "",
        evmVersion: "london",
        library: "",
        licenseType: "MIT",
        proxy: "0x0",
        implementation: "0x0",
        swarmSource: "",
      };

      beforeEach(() => {
        mockFetch.mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: [mockSourceCode] }),
          } as Response)
        );
      });

      it("should fetch contract source code", async () => {
        const result = await scanner.getContractSourceCode(validAddress);
        expect(result).toEqual(mockSourceCode);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/api?module=contract&action=getsourcecode&address=${validAddress}`,
          { headers: {} }
        );
      });

      it("should throw error for invalid address", async () => {
        await expect(scanner.getContractSourceCode(invalidAddress)).rejects.toThrow(
          "Invalid address"
        );
      });
    });
  });

  describe("Token Methods", () => {
    const mockTokens = [
      { address: validAddress, name: "Token1", symbol: "TK1", decimals: 18 },
      {
        address: "0x2234567890123456789012345678901234567890",
        name: "Token2",
        symbol: "TK2",
        decimals: 18,
      },
    ];

    describe("getAccountTokens", () => {
      beforeEach(() => {
        mockFetch.mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: { list: mockTokens } }),
          } as Response)
        );
      });

      it("should fetch account tokens", async () => {
        const result = await scanner.getAccountTokens(validAddress);
        expect(result).toEqual(mockTokens);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/account/tokens?account=${validAddress}&tokenType=ERC20&skip=0&limit=10`,
          { headers: {} }
        );
      });

      it("should handle token type parameter", async () => {
        await scanner.getAccountTokens(validAddress, "ERC721");
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/account/tokens?account=${validAddress}&tokenType=ERC721&skip=0&limit=10`,
          { headers: {} }
        );
      });

      it("should handle pagination parameters", async () => {
        await scanner.getAccountTokens(validAddress, "ERC20", 10, 20);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/account/tokens?account=${validAddress}&tokenType=ERC20&skip=10&limit=20`,
          { headers: {} }
        );
      });
    });

    describe("getTokenInfos", () => {
      beforeEach(() => {
        mockFetch.mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: { list: mockTokens } }),
          } as Response)
        );
      });

      it("should fetch token infos", async () => {
        const addresses = [validAddress, "0x2234567890123456789012345678901234567890"];
        const result = await scanner.getTokenInfos(addresses);
        expect(result).toEqual(mockTokens);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/token/tokeninfos?contracts=${addresses.join(",")}`,
          { headers: {} }
        );
      });

      it("should throw error for invalid addresses", async () => {
        await expect(scanner.getTokenInfos([invalidAddress])).rejects.toThrow(
          "Invalid contract addresses provided"
        );
      });
    });
  });

  describe("Statistics Methods", () => {
    const mockStatsResponse = {
      total: 100,
      list: [
        { statTime: "2024-02-07", count: 50 },
        { statTime: "2024-02-06", count: 40 },
      ],
    };

    beforeEach(() => {
      mockFetch.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", result: mockStatsResponse }),
        } as Response)
      );
    });

    describe("Basic Stats Methods", () => {
      it("should fetch active account stats", async () => {
        const result = await scanner.getActiveAccountStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/account\/active\?/
          ),
          { headers: {} }
        );
      });

      it("should fetch CFX holder stats", async () => {
        const result = await scanner.getCfxHolderStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/account\/cfx\/holder\?/
          ),
          { headers: {} }
        );
      });

      it("should handle stats parameters", async () => {
        const params = {
          minTimestamp: 1000,
          maxTimestamp: 2000,
          sort: "ASC" as const,
          skip: 10,
          limit: 20,
        };
        await scanner.getActiveAccountStats(params);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/account/active?minTimestamp=1000&maxTimestamp=2000&sort=ASC&skip=10&limit=20`,
          { headers: {} }
        );
      });
    });

    describe("Top Stats Methods", () => {
      const mockTopStatsResponse = {
        maxTime: "2024-02-07",
        list: [{ address: validAddress, value: "1000" }],
      };

      beforeEach(() => {
        mockFetch.mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1", result: mockTopStatsResponse }),
          } as Response)
        );
      });

      it("should fetch top gas used stats", async () => {
        const result = await scanner.getTopGasUsed("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/gas/used?spanType=24h`,
          { headers: {} }
        );
      });

      it("should handle different span types", async () => {
        const spanType: StatsPeriod = "24h";
        await scanner.getTopGasUsed(spanType);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/gas/used?spanType=24h`,
          { headers: {} }
        );
      });

      it("should fetch top transaction receivers", async () => {
        const result = await scanner.getTopTransactionReceivers("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/transaction/receiver?spanType=24h`,
          { headers: {} }
        );
      });

      it("should fetch top CFX receivers", async () => {
        const result = await scanner.getTopCfxReceivers("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/cfx/receiver?spanType=24h`,
          { headers: {} }
        );
      });

      it("should fetch top token senders", async () => {
        const result = await scanner.getTopTokenSenders("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/token/sender?spanType=24h`,
          { headers: {} }
        );
      });

      it("should fetch top token receivers", async () => {
        const result = await scanner.getTopTokenReceivers("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/token/receiver?spanType=24h`,
          { headers: {} }
        );
      });

      it("should fetch top token participants", async () => {
        const result = await scanner.getTopTokenParticipants("24h");
        expect(result).toEqual(mockTopStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `https://evmapi.confluxscan.io/statistics/top/token/participant?spanType=24h`,
          { headers: {} }
        );
      });
    });

    describe("Token Stats Methods", () => {
      it("should fetch token holder stats", async () => {
        const result = await scanner.getTokenHolderStats(validAddress);
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/^https:\/\/evmapi\.confluxscan\.io\/statistics\/token\/holder\?/),
          { headers: {} }
        );
      });

      it("should throw error for invalid contract address", async () => {
        await expect(scanner.getTokenHolderStats(invalidAddress)).rejects.toThrow(
          "Invalid contract address"
        );
      });

      it("should fetch token unique receiver stats", async () => {
        const result = await scanner.getTokenUniqueReceiverStats(validAddress);
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/token\/unique\/receiver\?/
          ),
          { headers: {} }
        );
      });

      it("should fetch token unique participant stats", async () => {
        const result = await scanner.getTokenUniqueParticipantStats(validAddress);
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/token\/unique\/participant\?/
          ),
          { headers: {} }
        );
      });
    });

    describe("Block Stats Methods", () => {
      it("should fetch block base fee stats", async () => {
        const result = await scanner.getBlockBaseFeeStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/block\/base-fee\?/
          ),
          { headers: {} }
        );
      });

      it("should fetch block gas used stats", async () => {
        const result = await scanner.getBlockGasUsedStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/block\/gas-used\?/
          ),
          { headers: {} }
        );
      });

      it("should fetch block average priority fee stats", async () => {
        const result = await scanner.getBlockAvgPriorityFeeStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/block\/avg-priority-fee\?/
          ),
          { headers: {} }
        );
      });

      it("should fetch block transactions by type stats", async () => {
        const result = await scanner.getBlockTxsByTypeStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /^https:\/\/evmapi\.confluxscan\.io\/statistics\/block\/txs-by-type\?/
          ),
          { headers: {} }
        );
      });
    });

    describe("Transaction Stats Methods", () => {
      it("should fetch contract stats", async () => {
        const result = await scanner.getContractStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/^https:\/\/evmapi\.confluxscan\.io\/statistics\/contract\?/),
          { headers: {} }
        );
      });

      it("should fetch transaction stats", async () => {
        const result = await scanner.getTransactionStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/^https:\/\/evmapi\.confluxscan\.io\/statistics\/transaction\?/),
          { headers: {} }
        );
      });

      it("should fetch CFX transfer stats", async () => {
        const result = await scanner.getCfxTransferStats();
        expect(result).toEqual(mockStatsResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/^https:\/\/evmapi\.confluxscan\.io\/statistics\/cfx\/transfer\?/),
          { headers: {} }
        );
      });
    });

    describe("Error Handling", () => {
      it("should handle API error response", async () => {
        mockFetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "0", message: "API Error" }),
          } as Response)
        );

        await expect(scanner.getActiveAccountStats()).rejects.toThrow("API error: API Error");
      });

      it("should handle missing result", async () => {
        mockFetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ status: "1" }),
          } as Response)
        );

        await expect(scanner.getActiveAccountStats()).rejects.toThrow(
          "No result returned for /statistics/account/active"
        );
      });
    });
  });
});
