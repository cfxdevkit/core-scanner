import { UtilsWrapper } from "../../../wrapper/modules/utils";
import { jest } from "@jest/globals";

describe("UtilsWrapper", () => {
  let wrapper: UtilsWrapper;
  const mockHash = "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932";
  const mockContract = "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2";
  const mockInput = "0xaea1414f";

  beforeEach(() => {
    wrapper = new UtilsWrapper({ target: "mainnet" });
  });

  describe("decodeMethod", () => {
    it("should decode method data correctly", async () => {
      const mockResponse = {
        hash: mockHash,
        decodedData: "transfer(address,uint256)",
        error: null,
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      ) as unknown as typeof global.fetch;

      const result = await wrapper.decodeMethod({ hashes: mockHash });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        hash: mockHash,
        decodedData: "transfer(address,uint256)",
        error: null,
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      ) as unknown as typeof global.fetch;

      const result = await wrapper.decodeMethod({ hashes: mockHash }, true);
      expect(result).toEqual(mockResponse);
    });

    it("should handle API error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      ) as unknown as typeof global.fetch;

      await expect(wrapper.decodeMethod({ hashes: "invalid" })).rejects.toThrow(
        "HTTP error! status: 400"
      );
    });
  });

  describe("decodeMethodRaw", () => {
    it("should decode raw method data correctly", async () => {
      const mockResponse = {
        contract: mockContract,
        input: mockInput,
        decodedData: "transfer(address,uint256)",
        error: null,
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      ) as unknown as typeof global.fetch;

      const result = await wrapper.decodeMethodRaw({ contracts: mockContract, inputs: mockInput });
      expect(result).toEqual(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = {
        contract: mockContract,
        input: mockInput,
        decodedData: "transfer(address,uint256)",
        error: null,
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      ) as unknown as typeof global.fetch;

      const result = await wrapper.decodeMethodRaw(
        { contracts: mockContract, inputs: mockInput },
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
      ) as unknown as typeof global.fetch;

      await expect(
        wrapper.decodeMethodRaw({ contracts: "invalid", inputs: "invalid" })
      ).rejects.toThrow("HTTP error! status: 400");
    });
  });
});
