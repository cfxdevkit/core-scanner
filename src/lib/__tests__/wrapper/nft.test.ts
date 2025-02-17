import { NFTWrapper } from "../../../wrapper/modules/nft";
import { jest } from "@jest/globals";

describe("NFTWrapper", () => {
  let wrapper: NFTWrapper;
  const mockAddress = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";
  const mockContractAddress = "cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1";

  beforeEach(() => {
    wrapper = new NFTWrapper({ target: "mainnet" });
  });

  describe("getBalances", () => {
    it("should get NFT balances and format numbers correctly", async () => {
      const mockResponse = {
        total: 2,
        list: [
          {
            contract: mockContractAddress,
            balance: "5",
            name: "Test NFT",
            symbol: "TNFT",
            type: "CRC721",
          },
          {
            contract: mockContractAddress,
            balance: "10",
            name: "Test NFT 2",
            symbol: "TNFT2",
            type: "CRC1155",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBalances({ owner: mockAddress });
      expect(result.list?.[0].balance).toBe("5");
      expect(result.list?.[1].balance).toBe("10");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            contract: mockContractAddress,
            balance: "5",
            name: "Test NFT",
            symbol: "TNFT",
            type: "CRC721",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getBalances({ owner: mockAddress }, true);
      expect(result).toEqual(mockResponse);
    });

    it("should handle invalid address", async () => {
      await expect(wrapper.getBalances({ owner: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });
  });

  describe("getTokens", () => {
    it("should get NFT tokens correctly", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            tokenId: "1",
            name: "Token #1",
            description: "Test token",
            image: "https://example.com/image.png",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTokens({ contract: mockContractAddress });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            tokenId: "1",
            name: "Token #1",
            description: "Test token",
            image: "https://example.com/image.png",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTokens({ contract: mockContractAddress }, true);
      expect(result).toEqual(mockResponse);
    });

    it("should handle invalid contract address", async () => {
      await expect(wrapper.getTokens({ contract: "invalid" })).rejects.toThrow(
        "Invalid contract address: invalid"
      );
    });
  });

  describe("getPreview", () => {
    it("should get NFT preview and format timestamp correctly", async () => {
      const mockResponse = {
        tokenId: "1",
        name: "Token #1",
        description: "Test token",
        image: "https://example.com/image.png",
        mintTimestamp: "1677649200",
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getPreview({ contract: mockContractAddress, tokenId: "1" });
      expect(result.mintTimestamp).toBe("2023-03-01 05:40:00");
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        tokenId: "1",
        name: "Token #1",
        description: "Test token",
        image: "https://example.com/image.png",
        mintTimestamp: "1677649200",
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getPreview(
        { contract: mockContractAddress, tokenId: "1" },
        true
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle invalid contract address", async () => {
      await expect(wrapper.getPreview({ contract: "invalid", tokenId: "1" })).rejects.toThrow(
        "Invalid contract address: invalid"
      );
    });
  });

  describe("getFts", () => {
    it("should get NFT fungible tokens correctly", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            tokenId: "1",
            name: "Token #1",
            description: "Test token",
            image: "https://example.com/image.png",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getFts({ name: "Test NFT", contract: mockContractAddress });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            tokenId: "1",
            name: "Token #1",
            description: "Test token",
            image: "https://example.com/image.png",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getFts(
        { name: "Test NFT", contract: mockContractAddress },
        true
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(
        wrapper.getFts({ name: "Test NFT", contract: mockContractAddress })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });

  describe("getOwners", () => {
    it("should get NFT owners correctly", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            owner: mockAddress,
            balance: "1",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getOwners({ contract: mockContractAddress, tokenId: "1" });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            owner: mockAddress,
            balance: "1",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getOwners({ contract: mockContractAddress, tokenId: "1" }, true);
      expect(result).toEqual(mockResponse);
    });

    it("should handle invalid contract address", async () => {
      await expect(wrapper.getOwners({ contract: "invalid", tokenId: "1" })).rejects.toThrow(
        "Invalid contract address: invalid"
      );
    });
  });

  describe("getTransfers", () => {
    it("should get NFT transfers correctly", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            from: mockAddress,
            to: mockAddress,
            tokenId: "1",
            timestamp: "1234567890",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTransfers({ contract: mockContractAddress, tokenId: "1" });
      const expected = {
        total: 1,
        list: [
          {
            from: mockAddress,
            to: mockAddress,
            tokenId: "1",
            timestamp: "2009-02-13 23:31:30",
          },
        ],
      };
      expect(result).toEqual(expected);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        total: 1,
        list: [
          {
            from: mockAddress,
            to: mockAddress,
            tokenId: "1",
            timestamp: "1234567890",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.getTransfers(
        { contract: mockContractAddress, tokenId: "1" },
        true
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle invalid contract address", async () => {
      await expect(wrapper.getTransfers({ contract: "invalid", tokenId: "1" })).rejects.toThrow(
        "Invalid contract address: invalid"
      );
    });
  });
});
