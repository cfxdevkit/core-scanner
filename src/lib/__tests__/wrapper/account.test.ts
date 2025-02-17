import { AccountWrapper } from "../../../wrapper/modules/account";
import { jest } from "@jest/globals";

describe("AccountWrapper", () => {
  let wrapper: AccountWrapper;
  const mockAccount = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";

  beforeEach(() => {
    wrapper = new AccountWrapper({ target: "mainnet" });
  });

  describe("AccountTransactions", () => {
    it("should get account transactions correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            value: "1000000000000000000",
            timestamp: 1677649200,
            gasPrice: "1000000000",
            gasFee: "21000000000000",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransactions({ account: mockAccount });
      expect(result.list?.[0].value).toBe("1");
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
      expect(result.list?.[0].gasPrice).toBe("1 Gdrip");
      expect(result.list?.[0].gasFee).toBe("21,000 Gdrip");
    });

    it("should handle empty transaction list", async () => {
      const mockResponse = { total: 0, list: [] };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransactions({ account: mockAccount });
      expect(result.total).toBe(0);
      expect(result.list).toEqual([]);
    });

    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(wrapper.AccountTransactions({ account: "invalid" })).rejects.toThrow();
    });
  });

  describe("CfxTransfers", () => {
    it("should get CFX transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.CfxTransfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });

    it("should handle empty transfer list", async () => {
      const mockResponse = { total: 0, list: [] };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.CfxTransfers({ account: mockAccount });
      expect(result.total).toBe(0);
      expect(result.list).toEqual([]);
    });
  });

  describe("Crc20Transfers", () => {
    it("should get CRC20 transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {
            token: {
              decimals: 18,
            },
          },
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc20Transfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });

    it("should handle empty transfer list", async () => {
      const mockResponse = { total: 0, list: [], addressInfo: {} };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc20Transfers({ account: mockAccount });
      expect(result.total).toBe(0);
      expect(result.list).toEqual([]);
    });

    it("should handle missing decimals in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {
            token: {},
          },
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc20Transfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing token info in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {},
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc20Transfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing contract in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {},
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc20Transfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });
  });

  describe("Crc721Transfers", () => {
    it("should get CRC721 transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            tokenId: "123",
            timestamp: 1677649200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc721Transfers({ account: mockAccount });
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });
  });

  describe("Crc1155Transfers", () => {
    it("should get CRC1155 transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            tokenId: "123",
            timestamp: 1677649200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc1155Transfers({ account: mockAccount });
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });
  });

  describe("Crc3525Transfers", () => {
    it("should get CRC3525 transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            tokenId: "123",
            timestamp: 1677649200,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Crc3525Transfers({ account: mockAccount });
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });
  });

  describe("AccountTransfers", () => {
    it("should get account transfers correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {
            token: {
              decimals: 18,
            },
          },
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
      expect(result.list?.[0].timestamp).toBe("2023-03-01 05:40:00");
    });

    it("should handle missing decimals in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {
            token: {},
          },
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing token info in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {
          "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2": {},
        },
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing contract in addressInfo", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
            from: mockAccount,
            to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            timestamp: 1677649200,
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          },
        ],
        addressInfo: {},
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTransfers({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });
  });

  describe("AccountApprovals", () => {
    it("should get account approvals correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            spender: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            tokenId: "123",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountApprovals({ account: mockAccount });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("AccountTokens", () => {
    it("should get account tokens correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
            decimals: 18,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTokens({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing decimals", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            amount: "1000000000000000000",
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTokens({ account: mockAccount });
      expect(result.list?.[0].amount).toBe("1");
    });

    it("should handle missing amount", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            decimals: 18,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.AccountTokens({ account: mockAccount });
      expect(result.list?.[0].amount).toBeUndefined();
    });
  });

  describe("Tokeninfos", () => {
    it("should get token tokeninfos correctly", async () => {
      const mockResponse = {
        total: 100,
        list: [
          {
            contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
            name: "Test Token",
            symbol: "TEST",
            decimals: 18,
          },
        ],
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.Tokeninfos({
        contracts: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
