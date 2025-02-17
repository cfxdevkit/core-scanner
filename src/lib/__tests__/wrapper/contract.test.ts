import { ContractWrapper } from "../../../wrapper/modules/contract";
import { jest } from "@jest/globals";
import type { Contract } from "../../../types";

describe("ContractWrapper", () => {
  let wrapper: ContractWrapper;
  const mockAddress = "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2";

  beforeEach(() => {
    wrapper = new ContractWrapper({ target: "mainnet" });
  });

  describe("getABI", () => {
    it("should get contract ABI correctly", async () => {
      const mockABI = [
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ type: "uint256", name: "" }],
          stateMutability: "view",
          type: "function",
        },
      ];
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: JSON.stringify(mockABI) }),
        } as Response)
      );

      const result = await wrapper.getABI({ address: mockAddress });
      expect(result).toEqual(mockABI);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockABI = [
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ type: "uint256", name: "" }],
          stateMutability: "view",
          type: "function",
        },
      ];
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: JSON.stringify(mockABI) }),
        } as Response)
      );

      const result = await wrapper.getABI({ address: mockAddress }, true);
      expect(result).toEqual(mockABI);
    });

    it("should handle invalid address", async () => {
      await expect(wrapper.getABI({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });
  });

  describe("getSourceCode", () => {
    it("should get source code correctly", async () => {
      const mockSourceCode: Contract.Source = {
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
          json: () => Promise.resolve({ status: "1", data: [mockSourceCode] }),
        } as Response)
      );

      const result = await wrapper.getSourceCode({ address: mockAddress });
      expect(result).toEqual(mockSourceCode);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockSourceCode: Contract.Source = {
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
          json: () => Promise.resolve({ status: "1", data: [mockSourceCode] }),
        } as Response)
      );

      const result = await wrapper.getSourceCode({ address: mockAddress }, true);
      expect(result).toEqual(mockSourceCode);
    });

    it("should handle invalid address", async () => {
      await expect(wrapper.getSourceCode({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });
  });

  describe("checkVerifyStatus", () => {
    it("should check verification status correctly", async () => {
      const mockResponse = "Pass - Verified";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.checkVerifyStatus({ guid: "test-guid" });
      expect(result).toBe(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = "Pass - Verified";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.checkVerifyStatus({ guid: "test-guid" }, true);
      expect(result).toBe(mockResponse);
    });

    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(wrapper.checkVerifyStatus({ guid: "invalid" })).rejects.toThrow(
        "HTTP error! status: 400"
      );
    });
  });

  describe("verifyProxyContract", () => {
    it("should verify proxy contract correctly", async () => {
      const mockResponse = "Success";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.verifyProxyContract({ address: mockAddress });
      expect(result).toBe(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = "Success";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.verifyProxyContract({ address: mockAddress }, true);
      expect(result).toBe(mockResponse);
    });

    it("should handle invalid address", async () => {
      await expect(wrapper.verifyProxyContract({ address: "invalid" })).rejects.toThrow(
        "Invalid address: invalid"
      );
    });
  });

  describe("checkProxyVerification", () => {
    it("should check proxy verification status correctly", async () => {
      const mockResponse = "Pass - Verified";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.checkProxyVerification({ guid: "test-guid" });
      expect(result).toBe(mockResponse);
    });

    it("should return raw response when returnRaw is true", async () => {
      const mockResponse = "Pass - Verified";
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: "1", data: mockResponse }),
        } as Response)
      );

      const result = await wrapper.checkProxyVerification({ guid: "test-guid" }, true);
      expect(result).toBe(mockResponse);
    });

    it("should handle API error", async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: "Bad Request",
        } as Response)
      );

      await expect(wrapper.checkProxyVerification({ guid: "invalid" })).rejects.toThrow(
        "HTTP error! status: 400"
      );
    });
  });
});
