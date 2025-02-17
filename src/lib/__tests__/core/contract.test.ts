import { ContractModule } from "../../../core/modules/contract";
import { jest } from "@jest/globals";

describe("ContractModule", () => {
  let module: ContractModule;

  beforeEach(() => {
    module = new ContractModule({ target: "mainnet" });
  });

  describe("getABI", () => {
    it("should get contract ABI correctly", async () => {
      const mockABI = [{ type: "function", name: "test", inputs: [], outputs: [] }];
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: JSON.stringify(mockABI) }),
        } as Response)
      );

      const result = await module.getABI({
        address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
      });
      expect(result).toEqual(mockABI);
    });

    it("should throw error for invalid address", async () => {
      await expect(module.getABI({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });

    it("should throw error when ABI is not available", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: "" }),
        } as Response)
      );

      await expect(
        module.getABI({ address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2" })
      ).rejects.toThrow(
        "Contract cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2 not verified or ABI not available"
      );
    });
  });

  describe("getSourceCode", () => {
    it("should get contract source code correctly", async () => {
      const mockSource = {
        SourceCode: "contract Test {}",
        ABI: "[]",
        ContractName: "Test",
        CompilerVersion: "v0.8.0",
        OptimizationUsed: "1",
        Runs: "200",
        ConstructorArguments: "",
        EVMVersion: "default",
        Library: "",
        LicenseType: "MIT",
        Proxy: "0",
        Implementation: "",
        SwarmSource: "",
      };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: [mockSource] }),
        } as Response)
      );

      const result = await module.getSourceCode({
        address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
      });
      expect(result).toEqual(mockSource);
    });

    it("should throw error for invalid address", async () => {
      await expect(module.getSourceCode({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });

    it("should throw error when source code is not available", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: [] }),
        } as Response)
      );

      await expect(
        module.getSourceCode({ address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2" })
      ).rejects.toThrow(
        "Contract cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2 not verified or source code not available"
      );
    });
  });

  describe("checkVerifyStatus", () => {
    it("should check verification status correctly", async () => {
      const mockStatus = { status: "Pending" };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockStatus }),
        } as Response)
      );

      const result = await module.checkVerifyStatus({ guid: "test-guid" });
      expect(result).toEqual(mockStatus);
    });

    it("should throw error when GUID is missing", async () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(module.checkVerifyStatus({} as any)).rejects.toThrow(
        "GUID is required for checking verification status"
      );
    });
  });

  describe("verifyProxyContract", () => {
    it("should verify proxy contract correctly", async () => {
      const mockResult = { status: "Success" };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResult }),
        } as Response)
      );

      const result = await module.verifyProxyContract({
        address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
      });
      expect(result).toEqual(mockResult);
    });

    it("should verify proxy contract with implementation address", async () => {
      const mockResult = { status: "Success" };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResult }),
        } as Response)
      );

      const result = await module.verifyProxyContract({
        address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
        expectedimplementation: "cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1",
      });
      expect(result).toEqual(mockResult);

      const calls = (global.fetch as jest.Mock).mock.calls;
      expect(decodeURIComponent(calls[0][0] as string)).toContain(
        "expectedimplementation=cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1"
      );
    });

    it("should throw error for invalid address", async () => {
      await expect(module.verifyProxyContract({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });

    it("should throw error for invalid implementation address", async () => {
      await expect(
        module.verifyProxyContract({
          address: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
          expectedimplementation: "invalid",
        })
      ).rejects.toThrow("Invalid implementation address: invalid");
    });
  });

  describe("checkProxyVerification", () => {
    it("should check proxy verification status correctly", async () => {
      const mockStatus = { status: "Pending" };
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockStatus }),
        } as Response)
      );

      const result = await module.checkProxyVerification({ guid: "test-guid" });
      expect(result).toEqual(mockStatus);
    });

    it("should throw error when GUID is missing", async () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(module.checkProxyVerification({} as any)).rejects.toThrow(
        "GUID is required for checking proxy verification status"
      );
    });
  });
});
