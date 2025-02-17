import { UtilsModule } from "../../../core/modules/utils";
import { jest } from "@jest/globals";

describe("UtilsModule", () => {
  let module: UtilsModule;

  beforeEach(() => {
    module = new UtilsModule({ target: "mainnet" });
  });

  describe("decodeMethod", () => {
    it("should decode method correctly", async () => {
      const mockResponse = {
        hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
        decodedData: "transfer(address,uint256)",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await module.decodeMethod({
        hashes: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw error for invalid hashes", async () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(module.decodeMethod({ hashes: undefined as any })).rejects.toThrow(
        "Invalid hashes: undefined"
      );
    });

    it("should handle error response", async () => {
      const mockResponse = {
        hash: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
        error: "Unable to decode method",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await module.decodeMethod({
        hashes: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
      });
      expect(result.error).toBe("Unable to decode method");
    });
  });

  describe("decodeMethodRaw", () => {
    it("should decode method raw correctly", async () => {
      const mockResponse = {
        contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        input: "0x456",
        decodedData: "transfer(address,uint256)",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await module.decodeMethodRaw({
        contracts: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        inputs: "0x456",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw error for invalid contracts", async () => {
      await expect(
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        module.decodeMethodRaw({ contracts: undefined as any, inputs: "0x456" })
      ).rejects.toThrow("Invalid contracts: undefined");
    });

    it("should throw error for invalid inputs", async () => {
      await expect(
        module.decodeMethodRaw({
          contracts: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputs: undefined as any,
        })
      ).rejects.toThrow("Invalid inputs: undefined");
    });

    it("should handle error response", async () => {
      const mockResponse = {
        contract: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        input: "0x456",
        error: "Unable to decode method",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await module.decodeMethodRaw({
        contracts: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        inputs: "0x456",
      });
      expect(result.error).toBe("Unable to decode method");
    });
  });
});
