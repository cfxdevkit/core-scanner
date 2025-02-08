import { NumberFormatter } from "../numbers";
import { formatEther, formatUnits } from "viem";

jest.mock("viem", () => ({
  formatEther: jest.fn(),
  formatUnits: jest.fn(),
}));

describe("NumberFormatter", () => {
  const MockedFormatEther = formatEther as jest.MockedFunction<typeof formatEther>;
  const MockedFormatUnits = formatUnits as jest.MockedFunction<typeof formatUnits>;

  beforeEach(() => {
    jest.clearAllMocks();
    MockedFormatEther.mockReturnValue("1.0");
    MockedFormatUnits.mockReturnValue("1.0");
  });

  describe("formatNumber", () => {
    it("should format integer numbers with commas", () => {
      expect(NumberFormatter.formatNumber(1000000)).toBe("1,000,000");
    });

    it("should format decimal numbers", () => {
      expect(NumberFormatter.formatNumber("1234.5678")).toBe("1,234.5678");
    });

    it("should truncate decimals to 4 places", () => {
      expect(NumberFormatter.formatNumber("1234.56789")).toBe("1,234.5678");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatNumber(0)).toBe("0");
    });

    it("should handle undefined/empty values", () => {
      expect(NumberFormatter.formatNumber("")).toBe("0");
      expect(NumberFormatter.formatNumber(undefined as unknown as string)).toBe("0");
    });

    it("should handle invalid numbers", () => {
      expect(NumberFormatter.formatNumber("invalid")).toBe("0");
    });
  });

  describe("formatPercentage", () => {
    it("should format number as percentage", () => {
      expect(NumberFormatter.formatPercentage(50.5678)).toBe("50.57%");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatPercentage(0)).toBe("0.00%");
    });

    it("should handle undefined/empty values", () => {
      expect(NumberFormatter.formatPercentage("")).toBe("0%");
      expect(NumberFormatter.formatPercentage(undefined as unknown as string)).toBe("0%");
    });

    it("should handle invalid numbers", () => {
      expect(NumberFormatter.formatPercentage("invalid")).toBe("0%");
    });
  });

  describe("formatGas", () => {
    it("should format gas value in Gwei", () => {
      expect(NumberFormatter.formatGas("1000000000")).toBe("1");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatGas(0)).toBe("0");
    });
  });

  describe("formatCFX", () => {
    it("should format CFX value", () => {
      MockedFormatEther.mockReturnValue("1.5");
      expect(NumberFormatter.formatCFX("1500000000000000000")).toBe("1.5 CFX");
    });

    it("should handle scientific notation", () => {
      MockedFormatEther.mockReturnValue("1.5");
      expect(NumberFormatter.formatCFX(1.5e18)).toBe("1.5 CFX");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatCFX(0)).toBe("0 CFX");
    });

    it("should handle undefined values", () => {
      expect(NumberFormatter.formatCFX(undefined)).toBe("0 CFX");
      expect(NumberFormatter.formatCFX("")).toBe("0 CFX");
    });

    it("should handle invalid values", () => {
      expect(NumberFormatter.formatCFX("invalid")).toBe("0 CFX");
    });
  });

  describe("formatTokenAmount", () => {
    it("should format token amount", () => {
      MockedFormatUnits.mockReturnValue("1.5");
      expect(NumberFormatter.formatTokenAmount("1500000000000000000", 18)).toBe("1.5");
    });

    it("should format CFX amount", () => {
      MockedFormatEther.mockReturnValue("1.5");
      expect(NumberFormatter.formatTokenAmount("1500000000000000000", 18, true)).toBe("1.5 CFX");
    });

    it("should handle scientific notation for CFX", () => {
      MockedFormatEther.mockReturnValue("1.5");
      expect(NumberFormatter.formatTokenAmount(1.5e18, 18, true)).toBe("1.5 CFX");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatTokenAmount(0)).toBe("0");
      expect(NumberFormatter.formatTokenAmount(0, 18, true)).toBe("0 CFX");
    });

    it("should handle errors", () => {
      MockedFormatUnits.mockImplementation(() => {
        throw new Error("Test error");
      });
      expect(NumberFormatter.formatTokenAmount("invalid")).toBe("0");
      expect(NumberFormatter.formatTokenAmount("invalid", 18, true)).toBe("0 CFX");
    });
  });
});
