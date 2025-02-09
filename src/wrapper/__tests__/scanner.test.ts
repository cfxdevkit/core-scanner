import { CoreScanner } from "../../core";
import { CoreScannerWrapper } from "../scanner";
import { ResponseFormatter } from "../../formatters";
import { StatsPeriod } from "../../types";
import { jest } from "@jest/globals";

jest.mock("../../core/scanner");
jest.mock("../../formatters/responses");

describe("CoreScannerWrapper", () => {
  let wrapper: CoreScannerWrapper;
  const MockedScanner = CoreScanner as jest.MockedClass<typeof CoreScanner>;
  const MockedFormatter = ResponseFormatter as jest.Mocked<typeof ResponseFormatter>;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = new CoreScannerWrapper({ target: "mainnet" });
  });

  test("should format contract ABI response", async () => {
    const mockABI = { abi: '[{"type":"function","name":"test"}]' };
    MockedScanner.prototype.getContractABI.mockResolvedValue(mockABI);

    // Mock the formatter response
    MockedFormatter.wrapResponse.mockReturnValue({
      raw: mockABI,
      formatted: { formattedAbi: "test" },
    });

    const result = await wrapper.getContractABI("cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx");
    expect(result.formatted).toBeDefined();
    expect(result.raw).toBeDefined();
  });

  test("should format supply stats response", async () => {
    const mockSupplyStats = {
      totalSupply: "1000000000000000000",
      totalCirculating: "500000000000000000",
      totalStaking: "200000000000000000",
      totalCollateral: "0",
      totalEspaceTokens: "0",
      nullAddressBalance: "0",
      twoYearUnlockBalance: "0",
      fourYearUnlockBalance: "0",
      totalIssued: "0",
    };

    MockedScanner.prototype.getSupplyStats.mockResolvedValue(mockSupplyStats);

    // Mock the formatter methods with type-safe implementation
    MockedFormatter.formatCFX.mockImplementation((value: string | number) => {
      if (typeof value === "string") {
        if (value === "0") return "0 CFX";
        const num = Number(BigInt(value)) / 10 ** 18;
        return `${num} CFX`;
      }
      return "0 CFX";
    });

    MockedFormatter.wrapResponse.mockImplementation((raw, formatted) => ({
      raw,
      formatted,
    }));

    const result = await wrapper.getSupplyStats();
    expect(result.formatted).toMatchObject({
      totalSupply: "1 CFX",
      totalCirculating: "0.5 CFX",
      totalStaking: "0.2 CFX",
    });
    expect(result.raw).toBeDefined();
  });

  describe("token methods", () => {
    it("should get account tokens for different token types", async () => {
      const mockTokenResponse = [
        {
          address: "cfx:test",
          name: "Test Token",
          symbol: "TEST",
          decimals: 18,
          amount: "1000000000000000000",
        },
      ];

      MockedScanner.prototype.getAccountTokens.mockResolvedValue(mockTokenResponse);
      MockedFormatter.formatUnit.mockReturnValue("1.0");

      const scanner = new CoreScannerWrapper({ target: "mainnet" });
      const address = "cfx:test";

      for (const tokenType of ["CRC20", "CRC721", "CRC1155"] as const) {
        const result = await scanner.getAccountTokens(address, tokenType);
        expect(result).toBeDefined();
        expect(result.raw).toBeDefined();
        expect(result.formatted.list).toBeDefined();
      }
    });
  });

  describe("statistics methods", () => {
    const mockStatResponse = {
      list: [
        {
          statTime: 1234567890,
          timestamp: 1234567890,
          count: "100",
          tps: "10",
        },
      ],
      total: "100",
    };

    beforeEach(() => {
      MockedScanner.prototype.getActiveAccountStats.mockResolvedValue(mockStatResponse);
      MockedScanner.prototype.getCfxHolderStats.mockResolvedValue(mockStatResponse);
      MockedScanner.prototype.getTpsStats.mockResolvedValue(mockStatResponse);
      MockedFormatter.formatNumber.mockReturnValue("100");
    });

    const statsParams = {
      minTimestamp: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60,
      maxTimestamp: Math.floor(Date.now() / 1000),
      limit: 5,
    };

    it("should get active account stats", async () => {
      const result = await wrapper.getActiveAccountStats(statsParams);
      expect(result).toBeDefined();
      expect(result.formatted.list).toBeDefined();
    });

    it("should get CFX holder stats", async () => {
      const result = await wrapper.getCfxHolderStats(statsParams);
      expect(result).toBeDefined();
      expect(result.formatted.list).toBeDefined();
    });

    it("should get TPS stats for different intervals", async () => {
      for (const intervalType of ["min", "hour", "day"] as const) {
        const result = await wrapper.getTpsStats({ ...statsParams, intervalType });
        expect(result).toBeDefined();
        expect(result.formatted.list).toBeDefined();
      }
    });
  });

  describe("top statistics methods", () => {
    const mockTopStatsResponse = {
      list: [
        {
          address: "cfx:test",
          gas: "1000000",
          count: "100",
          statTime: 1234567890,
          blockCntr: "50",
          hashRate: "1000",
          rewardSum: "1000",
          txFeeSum: "100",
        },
      ],
      gasTotal: "1000000",
      total: "100",
    };

    beforeEach(() => {
      MockedScanner.prototype.getTopGasUsed.mockResolvedValue(mockTopStatsResponse);
      MockedScanner.prototype.getTopTransactionSenders.mockResolvedValue(mockTopStatsResponse);
      MockedScanner.prototype.getTopMiners.mockResolvedValue(mockTopStatsResponse);
      MockedFormatter.formatGas.mockReturnValue("1.0");
      MockedFormatter.formatNumber.mockReturnValue("100");
    });

    it("should get top statistics for different periods", async () => {
      const periods: StatsPeriod[] = ["24h", "7d"];

      for (const period of periods) {
        const gasUsed = await wrapper.getTopGasUsed(period);
        expect(gasUsed).toBeDefined();
        expect(gasUsed.formatted.gasTotal).toBeDefined();

        const txSenders = await wrapper.getTopTransactionSenders(period);
        expect(txSenders).toBeDefined();

        const miners = await wrapper.getTopMiners(period);
        expect(miners).toBeDefined();
      }
    });
  });

  describe("mining statistics", () => {
    const mockRewardStatsResponse = {
      list: [
        {
          timestamp: 1234567890,
          statTime: 1234567890,
          count: "100",
        },
      ],
      total: "100",
    };

    beforeEach(() => {
      MockedScanner.prototype.getPowRewardStats.mockResolvedValue(mockRewardStatsResponse);
      MockedScanner.prototype.getPosRewardStats.mockResolvedValue(mockRewardStatsResponse);
      MockedFormatter.formatNumber.mockReturnValue("100");
    });

    const statsParams = {
      minTimestamp: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60,
      maxTimestamp: Math.floor(Date.now() / 1000),
      limit: 5,
    };

    it("should get mining reward stats for different intervals", async () => {
      for (const intervalType of ["hour", "day"] as const) {
        const powStats = await wrapper.getPowRewardStats({
          ...statsParams,
          intervalType,
        });
        expect(powStats).toBeDefined();
        expect(powStats.formatted.list).toBeDefined();

        const posStats = await wrapper.getPosRewardStats({
          ...statsParams,
          intervalType,
        });
        expect(posStats).toBeDefined();
        expect(posStats.formatted.list).toBeDefined();
      }
    });
  });

  describe("supply statistics", () => {
    it("should get supply stats for different networks", async () => {
      const mainnetScanner = new CoreScannerWrapper({ target: "mainnet" });
      const testnetScanner = new CoreScannerWrapper({ target: "testnet" });

      const mainnetStats = await mainnetScanner.getSupplyStats();
      expect(mainnetStats).toBeDefined();

      const testnetStats = await testnetScanner.getSupplyStats();
      expect(testnetStats).toBeDefined();
    });
  });

  describe("parameter handling", () => {
    it("should handle optional parameters in getAccountTokens", async () => {
      const mockTokenResponse = [
        {
          address: "cfx:test",
          name: "Test Token",
          symbol: "TEST",
          decimals: 18,
          amount: "1000000000000000000",
        },
      ];

      MockedScanner.prototype.getAccountTokens.mockResolvedValue(mockTokenResponse);

      // Test with different combinations of optional parameters
      await wrapper.getAccountTokens("cfx:test", "CRC20");
      await wrapper.getAccountTokens("cfx:test", "CRC20", 10);
      await wrapper.getAccountTokens("cfx:test", "CRC20", 10, 20);

      expect(MockedScanner.prototype.getAccountTokens).toHaveBeenCalledTimes(3);
    });

    it("should handle different network targets", () => {
      const mainnetScanner = new CoreScannerWrapper({ target: "mainnet" });
      const testnetScanner = new CoreScannerWrapper({ target: "testnet" });
      const customScanner = new CoreScannerWrapper({
        target: "mainnet",
        apiKey: "test-key",
      });

      expect(mainnetScanner).toBeDefined();
      expect(testnetScanner).toBeDefined();
      expect(customScanner).toBeDefined();
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      MockedScanner.prototype.getContractABI.mockImplementation((address: string) => {
        if (address === "0xinvalid" || address === "0x0000000000000000000000000000000000000000") {
          throw new Error("Invalid address");
        }
        return Promise.resolve({ abi: '[{"type":"function","name":"test"}]' });
      });
    });

    it("should handle invalid addresses", async () => {
      const scanner = new CoreScannerWrapper({ target: "mainnet" });
      await expect(scanner.getContractABI("0xinvalid")).rejects.toThrow();
    });

    it("should handle non-existent contracts", async () => {
      const scanner = new CoreScannerWrapper({ target: "mainnet" });
      await expect(
        scanner.getContractABI("0x0000000000000000000000000000000000000000")
      ).rejects.toThrow();
    });

    it("should handle API errors", async () => {
      MockedScanner.prototype.getSupplyStats.mockRejectedValue(new Error("API Error"));
      await expect(wrapper.getSupplyStats()).rejects.toThrow("API Error");
    });

    it("should handle formatting errors", async () => {
      const invalidStats = {
        totalSupply: "invalid",
        totalCirculating: "invalid",
        totalStaking: "invalid",
        totalCollateral: "0",
        totalEspaceTokens: "0",
        totalIssued: "0",
        nullAddressBalance: "0",
        twoYearUnlockBalance: "0",
        fourYearUnlockBalance: "0",
      };

      MockedScanner.prototype.getSupplyStats.mockResolvedValue(invalidStats);
      MockedFormatter.formatCFX.mockImplementation(() => {
        throw new Error("Format Error");
      });

      await expect(wrapper.getSupplyStats()).rejects.toThrow();
    });
  });

  describe("response formatting", () => {
    it("should handle empty lists", async () => {
      const emptyResponse = {
        list: [],
        total: "0",
      };

      MockedScanner.prototype.getActiveAccountStats.mockResolvedValue(emptyResponse);
      const result = await wrapper.getActiveAccountStats({});
      expect(result.formatted.list).toEqual([]);
    });

    it("should handle null/undefined values", async () => {
      const nullResponse = {
        list: [
          {
            statTime: 1234567890,
            timestamp: 0,
            count: "0",
            tps: "10",
          },
        ],
        total: "0",
      };

      MockedScanner.prototype.getTpsStats.mockResolvedValue(nullResponse);
      const result = await wrapper.getTpsStats({ intervalType: "min" });
      expect(result).toBeDefined();
      expect(result.formatted.list).toBeDefined();
    });

    it("should handle edge case values", async () => {
      const edgeCaseResponse = {
        list: [
          {
            statTime: 1234567890,
            timestamp: 1234567890,
            count: "0",
            tps: "0",
          },
        ],
        total: "0",
      };

      MockedScanner.prototype.getTpsStats.mockResolvedValue(edgeCaseResponse);
      const result = await wrapper.getTpsStats({ intervalType: "min" });
      expect(result).toBeDefined();
      expect(result.formatted.list).toBeDefined();
    });
  });
});
