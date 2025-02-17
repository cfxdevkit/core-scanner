import { NumberFormatter } from "../../../formatters/numbers";

describe("NumberFormatter", () => {
  describe("formatNumber", () => {
    it("should format integer with comma separators", () => {
      expect(NumberFormatter.formatNumber(1234567)).toBe("1,234,567");
    });

    it("should format decimal number with up to 4 decimal places", () => {
      expect(NumberFormatter.formatNumber(1234.5678)).toBe("1,234.5678");
      expect(NumberFormatter.formatNumber(1234.56789)).toBe("1,234.5678");
    });

    it("should handle string numbers", () => {
      expect(NumberFormatter.formatNumber("1234567")).toBe("1,234,567");
      expect(NumberFormatter.formatNumber("1234.5678")).toBe("1,234.5678");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatNumber(0)).toBe("0");
      expect(NumberFormatter.formatNumber("0")).toBe("0");
    });

    it("should handle undefined and null", () => {
      expect(NumberFormatter.formatNumber(undefined)).toBe("0");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(NumberFormatter.formatNumber(null as any)).toBe("0");
    });

    it("should handle empty string", () => {
      expect(NumberFormatter.formatNumber("")).toBe("0");
    });

    it("should handle invalid numbers", () => {
      expect(NumberFormatter.formatNumber("invalid")).toBe("0");
      expect(NumberFormatter.formatNumber(NaN)).toBe("0");
    });
  });

  describe("formatPercentage", () => {
    it("should format number as percentage with 2 decimal places", () => {
      expect(NumberFormatter.formatPercentage(50.5678)).toBe("50.57%");
    });

    it("should handle string numbers", () => {
      expect(NumberFormatter.formatPercentage("50.5678")).toBe("50.57%");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatPercentage(0)).toBe("0.00%");
    });

    it("should handle undefined and null", () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(NumberFormatter.formatPercentage(undefined as any)).toBe("0%");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(NumberFormatter.formatPercentage(null as any)).toBe("0%");
    });

    it("should handle empty string", () => {
      expect(NumberFormatter.formatPercentage("")).toBe("0%");
    });

    it("should handle invalid numbers", () => {
      expect(NumberFormatter.formatPercentage("invalid")).toBe("0%");
      expect(NumberFormatter.formatPercentage(NaN)).toBe("0%");
    });
  });

  describe("formatGas", () => {
    it("should format gas value in Gwei", () => {
      expect(NumberFormatter.formatGas("1000000000")).toBe("1 Gdrip");
    });

    it("should handle string gas values", () => {
      expect(NumberFormatter.formatGas("2000000000")).toBe("2 Gdrip");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatGas(0)).toBe("0 Gdrip");
      expect(NumberFormatter.formatGas("0")).toBe("0 Gdrip");
    });

    it("should handle undefined and null", () => {
      expect(NumberFormatter.formatGas(undefined)).toBe("0 Gdrip");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(NumberFormatter.formatGas(null as any)).toBe("0 Gdrip");
    });

    it("should handle invalid gas values", () => {
      expect(NumberFormatter.formatGas("invalid")).toBe("0 Gdrip");
    });
  });

  describe("formatCFX", () => {
    it("should format CFX value with proper decimals", () => {
      expect(NumberFormatter.formatCFX("1000000000000000000")).toBe("1");
    });

    it("should handle fractional CFX values", () => {
      expect(NumberFormatter.formatCFX("500000000000000000")).toBe("0.5");
    });

    it("should handle zero", () => {
      expect(NumberFormatter.formatCFX("0")).toBe("0");
    });

    it("should handle undefined and null", () => {
      expect(NumberFormatter.formatCFX(undefined)).toBe("0");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(NumberFormatter.formatCFX(null as any)).toBe("0");
    });

    it("should handle invalid CFX values", () => {
      expect(NumberFormatter.formatCFX("invalid")).toBe("");
    });

    it("should handle large CFX values", () => {
      expect(NumberFormatter.formatCFX("1000000000000000000000")).toBe("1,000");
    });
  });
});
