import { AccountModule } from "../../../core/modules/account";
import { jest } from "@jest/globals";

describe("AccountModule", () => {
  let module: AccountModule;

  beforeEach(() => {
    module = new AccountModule({ target: "mainnet" });
  });

  describe("AccountTransactions", () => {
    it("should throw error for invalid account", async () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(module.AccountTransactions({ account: 123 as any })).rejects.toThrow(
        "Invalid account: 123"
      );
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
        module.AccountTransactions({ account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm" })
      ).rejects.toThrow();
    });

    it("should handle optional parameters", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [] } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await module.AccountTransactions({
        account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
        skip: 0,
        limit: 10,
        from: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
        to: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        startBlock: 1000,
        endBlock: 2000,
        minTimestamp: 1677649200,
        maxTimestamp: 1677735600,
        sort: "desc",
      });

      expect(result).toEqual(mockResponse.data);
      const calls = (global.fetch as jest.Mock).mock.calls;
      expect(calls[0][0]).toContain("/account/transactions");
      expect(calls[0][1]).toEqual(
        expect.objectContaining({
          headers: expect.any(Object),
        })
      );
    });
  });

  describe("CfxTransfers", () => {
    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(
        module.CfxTransfers({ account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm" })
      ).rejects.toThrow();
    });

    it("should handle sort parameter case conversion", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [] } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      await module.CfxTransfers({
        account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
        sort: "desc",
      });

      const calls = (global.fetch as jest.Mock).mock.calls;
      const urlString = calls[0][0] as string;
      const url = new URL(urlString);
      expect(url.searchParams.get("sort")).toBe("DESC");
    });
  });

  describe("Crc20Transfers", () => {
    it("should handle missing optional parameters", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [], addressInfo: {} } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const result = await module.Crc20Transfers({
        account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("AccountApprovals", () => {
    it("should handle tokenType parameter", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [] } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      await module.AccountApprovals({
        account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
        tokenType: "CRC20",
      });

      const calls = (global.fetch as jest.Mock).mock.calls;
      const urlString = calls[0][0] as string;
      const url = new URL(urlString);
      expect(url.searchParams.get("tokenType")).toBe("CRC20");
    });

    it("should handle byTokenId parameter", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [] } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      await module.AccountApprovals({
        account: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
        byTokenId: true,
      });

      const calls = (global.fetch as jest.Mock).mock.calls;
      const urlString = calls[0][0] as string;
      const url = new URL(urlString);
      expect(url.searchParams.get("byTokenId")).toBe("true");
    });
  });

  describe("Tokeninfos", () => {
    it("should handle multiple contract addresses", async () => {
      const mockResponse = { status: "1", data: { total: 0, list: [] } };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const contracts = [
        "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        "cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1",
      ].join(",");

      await module.Tokeninfos({ contracts });

      const calls = (global.fetch as jest.Mock).mock.calls;
      const urlString = calls[0][0] as string;
      const url = new URL(urlString);
      expect(url.searchParams.get("contracts")).toBe(contracts);
    });
  });
});
