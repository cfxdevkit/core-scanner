import { StatsPeriod } from "../../../types/common";
import { StatisticsWrapper } from "../../../wrapper/modules/statistics";
import { jest } from "@jest/globals";

describe("StatisticsWrapper", () => {
  let wrapper: StatisticsWrapper;
  const mockContractAddress = "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2";

  beforeEach(() => {
    wrapper = new StatisticsWrapper({ target: "mainnet" });
  });

  describe("getMining", () => {
    it("should get mining statistics correctly", async () => {
      const mockResponse = {
        hashrate: "100000000",
        difficulty: "2000000",
        blockTime: "0.5",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getMining({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        hashrate: "100000000",
        difficulty: "2000000",
        blockTime: "0.5",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getMining(
        { minTimestamp: 1704067200, maxTimestamp: 1704153600 },
        true
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle empty statistics", async () => {
      const mockResponse = {
        hashrate: "0",
        difficulty: "0",
        blockTime: "0",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getMining({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(
        wrapper.getMining({ minTimestamp: 1704153600, maxTimestamp: 1704067200 })
      ).rejects.toThrow();
    });

    it("should handle optional parameters", async () => {
      const mockResponse = {
        hashrate: "100000000",
        difficulty: "2000000",
        blockTime: "0.5",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getMining({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
        intervalType: "hour",
        sort: "asc",
        skip: 0,
        limit: 10,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTopMiner", () => {
    it("should get top miner statistics correctly", async () => {
      const mockResponse = {
        miner: "0x1234567890123456789012345678901234567890",
        blocks: "100",
        percentage: "10",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopMiner({ spanType: "24h" });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        miner: "0x1234567890123456789012345678901234567890",
        blocks: "100",
        percentage: "10",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopMiner({ spanType: "24h" }, true);
      expect(result).toEqual(mockResponse);
    });

    it("should handle empty statistics", async () => {
      const mockResponse = {
        miner: "",
        blocks: "0",
        percentage: "0",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopMiner({ spanType: "24h" });
      expect(result).toEqual(mockResponse);
    });

    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(
        wrapper.getTopMiner({ spanType: "invalid" as unknown as StatsPeriod })
      ).rejects.toThrow();
    });

    it("should handle different span types", async () => {
      const mockResponse = {
        miner: "0x1234567890123456789012345678901234567890",
        blocks: "100",
        percentage: "10",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const spans = ["24h", "3d", "7d", "14d"] as const;
      for (const span of spans) {
        const result = await wrapper.getTopMiner({ spanType: span });
        expect(result).toEqual(mockResponse);
      }
    });
  });

  describe("getAccountGrowth", () => {
    it("should format account growth statistics correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            count: "50",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getAccountGrowth({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.total).toBe("100");
      expect(result.list?.[0].count).toBe("50");
      expect(result.list?.[0].statTime).toBe("2024-01-01 00:00:00");
    });

    it("should handle empty response", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      ) as unknown as typeof global.fetch;
      const result = await wrapper.getAccountGrowth({
        minTimestamp: 1677600000,
        maxTimestamp: 1677686400,
        sort: "desc",
        skip: 0,
        limit: 10,
      });
      expect(result).toEqual([]);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      ) as unknown as typeof global.fetch;
      await expect(
        wrapper.getAccountGrowth({
          minTimestamp: 1677600000,
          maxTimestamp: 1677686400,
        })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });

  describe("getAccountActive", () => {
    it("should handle empty response", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      ) as unknown as typeof global.fetch;
      const result = await wrapper.getAccountActive({
        minTimestamp: 1677600000,
        maxTimestamp: 1677686400,
        sort: "desc",
        skip: 0,
        limit: 10,
      });
      expect(result).toEqual([]);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      ) as unknown as typeof global.fetch;
      await expect(
        wrapper.getAccountActive({
          minTimestamp: 1677600000,
          maxTimestamp: 1677686400,
        })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });

  describe("getAccountActiveOverall", () => {
    it("should handle empty response", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      ) as unknown as typeof global.fetch;
      const result = await wrapper.getAccountActiveOverall({
        minTimestamp: 1677600000,
        maxTimestamp: 1677686400,
        sort: "desc",
        skip: 0,
        limit: 10,
      });
      expect(result).toEqual([]);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      ) as unknown as typeof global.fetch;
      await expect(
        wrapper.getAccountActiveOverall({
          minTimestamp: 1677600000,
          maxTimestamp: 1677686400,
        })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });

  describe("getSupply", () => {
    it("should get supply and format numbers correctly", async () => {
      const mockResponse = {
        totalIssued: "1000000000000000000000000", // 1M CFX
        totalCirculating: "900000000000000000000000", // 900K CFX
        totalStaking: "100000000000000000000000",
        totalCollateral: "50000000000000000000000",
        nullAddressBalance: "25000000000000000000000",
        twoYearUnlockBalance: "15000000000000000000000",
        fourYearUnlockBalance: "10000000000000000000000",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getSupply();
      expect(result.totalIssued).toBe("1,000,000");
      expect(result.totalCirculating).toBe("900,000");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        totalIssued: "1000000000000000000000000",
        totalCirculating: "900000000000000000000000",
        totalStaking: "100000000000000000000000",
        totalCollateral: "50000000000000000000000",
        nullAddressBalance: "25000000000000000000000",
        twoYearUnlockBalance: "15000000000000000000000",
        fourYearUnlockBalance: "10000000000000000000000",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getSupply(true);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTransaction", () => {
    it("should handle empty response", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      ) as unknown as typeof global.fetch;
      const result = await wrapper.getTransaction({
        minTimestamp: 1677600000,
        maxTimestamp: 1677686400,
        sort: "desc",
        skip: 0,
        limit: 10,
      });
      expect(result).toEqual([]);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      ) as unknown as typeof global.fetch;
      await expect(
        wrapper.getTransaction({
          minTimestamp: 1677600000,
          maxTimestamp: 1677686400,
        })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });

  describe("getTps", () => {
    it("should format TPS statistics correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            tps: "50.5",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTps({ minTimestamp: 1704067200, maxTimestamp: 1704153600 });
      expect(result.total).toBe("100");
      expect(result.list?.[0].tps).toBe("50.5");
      expect(result.list?.[0].statTime).toBe("2024-01-01 00:00:00");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        total: 100,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTps({ minTimestamp: 1704067200, maxTimestamp: 1704153600 });
      expect(result.list?.[0].tps).toBeUndefined();
      expect(result.list?.[0].statTime).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            tps: "50.5",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTps(
        { minTimestamp: 1704067200, maxTimestamp: 1704153600 },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContract", () => {
    it("should format contract statistics correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            count: "50",
            total: "1000",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getContract({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.total).toBe("100");
      expect(result.list?.[0].count).toBe("50");
      expect(result.list?.[0].total).toBe("1,000");
      expect(result.list?.[0].statTime).toBe("2024-01-01 00:00:00");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        total: 100,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getContract({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].count).toBeUndefined();
      expect(result.list?.[0].total).toBeUndefined();
      expect(result.list?.[0].statTime).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            count: "50",
            total: "1000",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getContract(
        { minTimestamp: 1704067200, maxTimestamp: 1704153600 },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCfxTransfer", () => {
    it("should format CFX transfer data correctly", async () => {
      const mockResponse = {
        status: "1",
        data: {
          total: "100",
          list: [
            {
              transferCount: "50",
              userCount: "30",
              amount: "1000000000000000000",
              statTime: 1677649200,
            },
          ],
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await wrapper.getCfxTransfer({
        minTimestamp: 1677649200,
        maxTimestamp: 1677735600,
      });
      expect(result.total).toBe("100");
      expect(result.list?.[0].transferCount).toBe("50");
      expect(result.list?.[0].userCount).toBe("30");
      expect(result.list?.[0].amount).toBe("1");
      expect(result.list?.[0].statTime).toBe("2023-03-01 05:40:00");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        status: "1",
        data: {
          total: "100",
          list: [
            {
              statTime: 1677649200,
            },
          ],
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await wrapper.getCfxTransfer({
        minTimestamp: 1677649200,
      });
      expect(result.list?.[0].transferCount).toBeUndefined();
      expect(result.list?.[0].userCount).toBeUndefined();
      expect(result.list?.[0].amount).toBeUndefined();
      expect(result.list?.[0].statTime).toBe("2023-03-01 05:40:00");
    });
  });

  describe("getTokenTransfer", () => {
    it("should format token transfer data correctly", async () => {
      const mockResponse = {
        status: "1",
        data: {
          total: "100",
          list: [
            {
              transferCount: "50",
              userCount: "30",
              statTime: 1677649200,
            },
          ],
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await wrapper.getTokenTransfer({
        minTimestamp: 1677649200,
        maxTimestamp: 1677735600,
      });
      expect(result.total).toBe("100");
      expect(result.list?.[0].transferCount).toBe("50");
      expect(result.list?.[0].userCount).toBe("30");
      expect(result.list?.[0].statTime).toBe("2023-03-01 05:40:00");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        status: "1",
        data: {
          total: "100",
          list: [
            {
              statTime: 1677649200,
            },
          ],
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await wrapper.getTokenTransfer({
        minTimestamp: 1677649200,
      });
      expect(result.list?.[0].transferCount).toBeUndefined();
      expect(result.list?.[0].userCount).toBeUndefined();
      expect(result.list?.[0].statTime).toBe("2023-03-01 05:40:00");
    });
  });

  describe("getTopGasUsed", () => {
    it("should get top gas used and format gas correctly", async () => {
      const mockResponse = {
        list: [
          {
            address: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
            gas: "1000000000", // 1 Gdrip
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopGasUsed({ spanType: "day" });
      expect(result.list?.[0].gas).toBe("1 Gdrip");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        list: [
          {
            address: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
            gas: "1000000000",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopGasUsed({ spanType: "day" }, true);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTopCfxSender", () => {
    it("should format top CFX sender statistics correctly", async () => {
      const mockResponse = {
        maxTime: 1704067200,
        valueTotal: "1000000000000000000",
        list: [
          {
            value: "500000000000000000",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopCfxSender({ spanType: "24h" });
      expect(result.maxTime).toBe("2024-01-01 00:00:00");
      expect(result.valueTotal).toBe("1");
      expect(result.list?.[0].value).toBe("0.5");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        maxTime: null,
        valueTotal: null,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopCfxSender({ spanType: "24h" });
      expect(result.maxTime).toBeNull();
      expect(result.valueTotal).toBeNull();
      expect(result.list?.[0].value).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        maxTime: 1704067200,
        valueTotal: "1000000000000000000",
        list: [
          {
            value: "500000000000000000",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopCfxSender({ spanType: "24h" }, true);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCfxHolder", () => {
    it("should format CFX holder statistics correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            count: "50",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getCfxHolder({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.total).toBe("100");
      expect(result.list?.[0].count).toBe("50");
      expect(result.list?.[0].statTime).toBe("2024-01-01 00:00:00");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        total: 100,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getCfxHolder({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].count).toBeUndefined();
      expect(result.list?.[0].statTime).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            count: "50",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getCfxHolder(
        { minTimestamp: 1704067200, maxTimestamp: 1704153600 },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTopTransactionSender", () => {
    it("should format top transaction sender statistics correctly", async () => {
      const mockResponse = {
        maxTime: 1704067200,
        valueTotal: "1000",
        list: [
          {
            value: "500",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopTransactionSender({ spanType: "24h" });
      expect(result.maxTime).toBe("2024-01-01 00:00:00");
      expect(result.valueTotal).toBe("1,000");
      expect(result.list?.[0].value).toBe("500");
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        maxTime: null,
        valueTotal: null,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopTransactionSender({ spanType: "24h" });
      expect(result.maxTime).toBeNull();
      expect(result.valueTotal).toBeNull();
      expect(result.list?.[0].value).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        maxTime: 1704067200,
        valueTotal: "1000",
        list: [
          {
            value: "500",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTopTransactionSender({ spanType: "24h" }, true);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBlockBasefee", () => {
    it("should get block base fee and format gas correctly", async () => {
      const mockResponse = {
        list: [
          {
            baseFee: "1000000000", // 1 Gdrip
            timestamp: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBlockBasefee({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].baseFee).toBe("1 Gdrip");
      expect(result.list?.[0].timestamp).toBe("2024-01-01 00:00:00");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        list: [
          {
            baseFee: "1000000000",
            timestamp: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBlockBasefee(
        {
          minTimestamp: 1704067200,
          maxTimestamp: 1704153600,
        },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTokenHolder", () => {
    it("should get token holder and format balance correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            address: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
            holderCount: "1", // 1 Token
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTokenHolder({
        contract: mockContractAddress,
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].holderCount).toBe("1");
      expect(result.list?.[0].statTime).toBe("2024-01-01 00:00:00");
    });

    it("should handle missing fields", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            address: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTokenHolder({
        contract: mockContractAddress,
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].holderCount).toBeUndefined();
      expect(result.list?.[0].statTime).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            address: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
            holderCount: "1",
            statTime: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTokenHolder(
        {
          contract: mockContractAddress,
          minTimestamp: 1704067200,
          maxTimestamp: 1704153600,
        },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUniqueSender", () => {
    it("should get unique sender count correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            uniqueSenderCount: "50",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getUniqueSender({
        contract: mockContractAddress,
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].uniqueSenderCount).toBe("50");
    });

    it("should handle missing uniqueSenderCount", async () => {
      const mockResponse = {
        total: 100,
        list: [{}],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getUniqueSender({
        contract: mockContractAddress,
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].uniqueSenderCount).toBeUndefined();
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            uniqueSenderCount: "50",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getUniqueSender(
        {
          contract: mockContractAddress,
          minTimestamp: 1704067200,
          maxTimestamp: 1704153600,
        },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBlockTxsbytype", () => {
    it("should get block transactions by type and format timestamp correctly", async () => {
      const mockResponse = {
        list: [
          {
            type: "0",
            count: "100",
            timestamp: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBlockTxsbytype({
        minTimestamp: 1704067200,
        maxTimestamp: 1704153600,
      });
      expect(result.list?.[0].timestamp).toBe("2024-01-01 00:00:00");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        list: [
          {
            type: "0",
            count: "100",
            timestamp: 1704067200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBlockTxsbytype(
        {
          minTimestamp: 1704067200,
          maxTimestamp: 1704153600,
        },
        true
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
