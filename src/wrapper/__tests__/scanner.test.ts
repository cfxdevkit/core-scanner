import { ESpaceScannerWrapper } from "../scanner";
import { ESpaceScanner } from "../../core";
import { ResponseFormatter } from "../../formatters";
import { jest } from "@jest/globals";
import { FormattedResponse } from "../../types/api";
import { ESpaceStatsParams, ESpaceStatsResponse } from "../../types";

jest.mock("../../core/scanner");
jest.mock("../../formatters/responses");

describe("ESpaceScannerWrapper", () => {
  let wrapper: ESpaceScannerWrapper;
  const MockedScanner = ESpaceScanner as jest.MockedClass<typeof ESpaceScanner>;
  const MockedFormatter = ResponseFormatter as jest.Mocked<typeof ResponseFormatter>;
  const validAddress = "0x1234567890123456789012345678901234567890";

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = new ESpaceScannerWrapper();
  });

  describe("Contract Methods", () => {
    describe("getContractABI", () => {
      const mockABI = { abi: '[{"type":"function","name":"test"}]' };

      beforeEach(() => {
        MockedScanner.prototype.getContractABI.mockResolvedValue(mockABI);
        MockedFormatter.wrapResponse.mockReturnValue({
          raw: mockABI,
          formatted: mockABI,
        });
      });

      it("should return formatted contract ABI", async () => {
        const result = await wrapper.getContractABI(validAddress);
        expect(result).toEqual({
          raw: mockABI,
          formatted: mockABI,
        });
        expect(MockedScanner.prototype.getContractABI).toHaveBeenCalledWith(validAddress);
        expect(MockedFormatter.wrapResponse).toHaveBeenCalledWith(mockABI, mockABI);
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
        MockedScanner.prototype.getContractSourceCode.mockResolvedValue(mockSourceCode);
        MockedFormatter.wrapResponse.mockReturnValue({
          raw: mockSourceCode,
          formatted: mockSourceCode,
        });
      });

      it("should return formatted contract source code", async () => {
        const result = await wrapper.getContractSourceCode(validAddress);
        expect(result).toEqual({
          raw: mockSourceCode,
          formatted: mockSourceCode,
        });
        expect(MockedScanner.prototype.getContractSourceCode).toHaveBeenCalledWith(validAddress);
        expect(MockedFormatter.wrapResponse).toHaveBeenCalledWith(mockSourceCode, mockSourceCode);
      });
    });
  });

  describe("Token Methods", () => {
    describe("getAccountTokens", () => {
      const mockTokens = [
        {
          address: validAddress,
          name: "Token1",
          symbol: "TK1",
          decimals: 18,
          amount: "1000000000000000000",
          priceInUSDT: "1.5",
        },
        {
          address: "0x2234567890123456789012345678901234567890",
          name: "Token2",
          symbol: "TK2",
          decimals: 18,
        },
      ];

      beforeEach(() => {
        MockedScanner.prototype.getAccountTokens.mockResolvedValue(mockTokens);
        MockedFormatter.formatUnit.mockImplementation((amount, _decimals) => {
          if (!amount) return "0";
          return String(amount === "1000000000000000000" ? "1.0" : amount);
        });
        MockedFormatter.wrapResponse.mockImplementation(
          <T, F>(raw: T, formatted: F): FormattedResponse<T, F> => ({
            raw,
            formatted,
          })
        );
      });

      it("should return formatted account tokens", async () => {
        const result = await wrapper.getAccountTokens(validAddress);
        expect(result.raw).toEqual({ list: mockTokens, total: mockTokens.length });
        expect(result.formatted[0].amount).toBe("1.0");
        expect(result.formatted[0].priceInUSDT).toBe("$1.5000");
        expect(MockedScanner.prototype.getAccountTokens).toHaveBeenCalledWith(
          validAddress,
          "ERC20",
          0,
          10
        );
      });

      it("should handle tokens without amount", async () => {
        const result = await wrapper.getAccountTokens(validAddress);
        expect(result.formatted[1].amount).toBe("0");
        expect(result.formatted[1].priceInUSDT).toBeUndefined();
      });

      it("should handle different token types and pagination", async () => {
        await wrapper.getAccountTokens(validAddress, "ERC721", 20, 50);
        expect(MockedScanner.prototype.getAccountTokens).toHaveBeenCalledWith(
          validAddress,
          "ERC721",
          20,
          50
        );
      });
    });
  });

  describe("Statistics Methods", () => {
    const mockStatsResponse = {
      total: 100,
      list: [
        { statTime: "2024-02-07", count: 50, holderCount: 100, uniqueSenderCount: 75 },
        { statTime: "2024-02-06", count: 40, holderCount: 90, uniqueSenderCount: 65 },
      ],
    };

    beforeEach(() => {
      MockedFormatter.formatNumber.mockReturnValue("50");
      MockedFormatter.wrapResponse.mockReturnValue({
        raw: mockStatsResponse,
        formatted: {
          total: mockStatsResponse.total,
          list: mockStatsResponse.list.map((item) => ({
            statTime: item.statTime,
            count: "50",
          })),
        },
      });
    });

    describe("Basic Stats Methods", () => {
      const statsParams: ESpaceStatsParams = {
        minTimestamp: 1000,
        maxTimestamp: 2000,
        sort: "ASC",
        skip: 10,
        limit: 20,
      };

      it("should return formatted active account stats", async () => {
        MockedScanner.prototype.getActiveAccountStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getActiveAccountStats(statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getActiveAccountStats).toHaveBeenCalledWith(statsParams);
      });

      it("should return formatted CFX holder stats", async () => {
        MockedScanner.prototype.getCfxHolderStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getCfxHolderStats(statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getCfxHolderStats).toHaveBeenCalledWith(statsParams);
      });

      it("should return formatted account growth stats", async () => {
        MockedScanner.prototype.getAccountGrowthStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getAccountGrowthStats(statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getAccountGrowthStats).toHaveBeenCalledWith(statsParams);
      });
    });

    describe("Token Stats Methods", () => {
      const statsParams: ESpaceStatsParams = {
        minTimestamp: 1000,
        maxTimestamp: 2000,
      };

      it("should return formatted token holder stats", async () => {
        MockedScanner.prototype.getTokenHolderStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getTokenHolderStats(validAddress, statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getTokenHolderStats).toHaveBeenCalledWith(
          validAddress,
          statsParams
        );
      });

      it("should return formatted token unique sender stats", async () => {
        MockedScanner.prototype.getTokenUniqueSenderStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getTokenUniqueSenderStats(validAddress, statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getTokenUniqueSenderStats).toHaveBeenCalledWith(
          validAddress,
          statsParams
        );
      });

      it("should return formatted token unique receiver stats", async () => {
        MockedScanner.prototype.getTokenUniqueReceiverStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getTokenUniqueReceiverStats(validAddress, statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getTokenUniqueReceiverStats).toHaveBeenCalledWith(
          validAddress,
          statsParams
        );
      });

      it("should return formatted token unique participant stats", async () => {
        MockedScanner.prototype.getTokenUniqueParticipantStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getTokenUniqueParticipantStats(validAddress, statsParams);
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getTokenUniqueParticipantStats).toHaveBeenCalledWith(
          validAddress,
          statsParams
        );
      });
    });

    describe("Block Stats Methods", () => {
      const mockBlockStatsResponse = {
        total: 100,
        list: [
          {
            statTime: "2024-02-07",
            blockNumber: "1000",
            timestamp: "1707307200",
            baseFee: "1000000000",
            gasUsed: "2000000000",
          },
        ],
      };

      beforeEach(() => {
        MockedFormatter.formatGas.mockReturnValue("1.0 Gwei");
        MockedFormatter.wrapResponse.mockImplementation(
          <T, F>(raw: T, formatted: F): FormattedResponse<T, F> => ({
            raw,
            formatted,
          })
        );
      });

      it("should return formatted block base fee stats", async () => {
        MockedScanner.prototype.getBlockBaseFeeStats.mockResolvedValue(mockBlockStatsResponse);
        const result = await wrapper.getBlockBaseFeeStats();
        expect(result.raw).toEqual(mockBlockStatsResponse);
        expect(result.formatted.list[0].baseFee).toBe("1.0 Gwei");
        expect(MockedScanner.prototype.getBlockBaseFeeStats).toHaveBeenCalled();
      });

      it("should return formatted block gas used stats", async () => {
        MockedScanner.prototype.getBlockGasUsedStats.mockResolvedValue(mockBlockStatsResponse);
        const result = await wrapper.getBlockGasUsedStats();
        expect(result.raw).toEqual(mockBlockStatsResponse);
        expect(result.formatted.list[0].gasUsed).toBe("1.0 Gwei");
        expect(MockedScanner.prototype.getBlockGasUsedStats).toHaveBeenCalled();
      });

      it("should return formatted block average priority fee stats", async () => {
        MockedScanner.prototype.getBlockAvgPriorityFeeStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getBlockAvgPriorityFeeStats();
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getBlockAvgPriorityFeeStats).toHaveBeenCalled();
      });

      it("should return formatted block transactions by type stats", async () => {
        const mockTxTypeStats = {
          total: 100,
          list: [
            {
              statTime: "2024-02-07",
              txsInType: {
                type1: "100",
                type2: "200",
              },
            },
          ],
        } as unknown as ESpaceStatsResponse;

        MockedScanner.prototype.getBlockTxsByTypeStats.mockResolvedValue(mockTxTypeStats);
        MockedFormatter.formatNumber.mockImplementation((value) => String(Number(value) / 2));
        MockedFormatter.wrapResponse.mockImplementation(
          <T, F>(raw: T, formatted: F): FormattedResponse<T, F> => ({
            raw,
            formatted,
          })
        );

        const result = await wrapper.getBlockTxsByTypeStats();
        expect(result.raw).toEqual(mockTxTypeStats);
        expect(
          (result.formatted as { list: Array<{ txsInType: Record<string, string> }> }).list[0]
            .txsInType
        ).toEqual({
          type1: "50",
          type2: "100",
        });
        expect(MockedScanner.prototype.getBlockTxsByTypeStats).toHaveBeenCalled();
      });
    });

    describe("Top Stats Methods", () => {
      const mockTopStatsResponse = {
        maxTime: "2024-02-07",
        gasTotal: "1000000000",
        valueTotal: "1000000",
        list: [
          {
            address: validAddress,
            gas: "500000000",
            value: "500000",
            transferCntr: "10",
          },
        ],
      };

      beforeEach(() => {
        MockedFormatter.formatGas.mockReturnValue("1.0 Gwei");
        MockedFormatter.formatNumber.mockReturnValue("500");
        MockedFormatter.formatCFX.mockReturnValue("0.5 CFX");
        MockedFormatter.wrapResponse.mockImplementation(
          <T, F>(raw: T, formatted: F): FormattedResponse<T, F> => ({
            raw,
            formatted,
          })
        );
      });

      it("should return formatted top gas used stats", async () => {
        MockedScanner.prototype.getTopGasUsed.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopGasUsed("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect((result.formatted as { gasTotal: string }).gasTotal).toBe("1.0 Gwei");
        expect(MockedScanner.prototype.getTopGasUsed).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top transaction senders stats", async () => {
        MockedScanner.prototype.getTopTransactionSenders.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopTransactionSenders("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect((result.formatted as { valueTotal: string }).valueTotal).toBe("500");
        expect(MockedScanner.prototype.getTopTransactionSenders).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top CFX senders stats", async () => {
        MockedScanner.prototype.getTopCfxSenders.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopCfxSenders("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect((result.formatted as { valueTotal: string }).valueTotal).toBe("0.5 CFX");
        expect(MockedScanner.prototype.getTopCfxSenders).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top token transfers stats", async () => {
        MockedScanner.prototype.getTopTokenTransfers.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopTokenTransfers("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect(
          (result.formatted as { list: { transferCntr: string }[] }).list[0].transferCntr
        ).toBe("500");
        expect(MockedScanner.prototype.getTopTokenTransfers).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top transaction receivers stats", async () => {
        MockedScanner.prototype.getTopTransactionReceivers.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopTransactionReceivers("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect(MockedScanner.prototype.getTopTransactionReceivers).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top token receivers stats", async () => {
        MockedScanner.prototype.getTopTokenReceivers.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopTokenReceivers("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect(MockedScanner.prototype.getTopTokenReceivers).toHaveBeenCalledWith("24h");
      });

      it("should return formatted top token participants stats", async () => {
        MockedScanner.prototype.getTopTokenParticipants.mockResolvedValue(mockTopStatsResponse);
        const result = await wrapper.getTopTokenParticipants("24h");
        expect(result.raw).toEqual(mockTopStatsResponse);
        expect(MockedScanner.prototype.getTopTokenParticipants).toHaveBeenCalledWith("24h");
      });
    });

    describe("Transaction Stats Methods", () => {
      it("should return formatted contract stats", async () => {
        MockedScanner.prototype.getContractStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getContractStats();
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getContractStats).toHaveBeenCalled();
      });

      it("should return formatted transaction stats", async () => {
        MockedScanner.prototype.getTransactionStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getTransactionStats();
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getTransactionStats).toHaveBeenCalled();
      });

      it("should return formatted CFX transfer stats", async () => {
        MockedScanner.prototype.getCfxTransferStats.mockResolvedValue(mockStatsResponse);
        const result = await wrapper.getCfxTransferStats();
        expect(result.raw).toEqual(mockStatsResponse);
        expect(MockedScanner.prototype.getCfxTransferStats).toHaveBeenCalled();
      });
    });
  });
});
