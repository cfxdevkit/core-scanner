import { ResponseFormatter } from "../../../formatters/responses";

describe("ResponseFormatter", () => {
  describe("formatUnit", () => {
    it("should format value with specified decimals", () => {
      expect(ResponseFormatter.formatUnit("1000000000000000000", 18)).toBe("1");
      expect(ResponseFormatter.formatUnit("1000000", 6)).toBe("1");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatUnit(undefined, 18)).toBe("0");
    });

    it("should handle invalid values", () => {
      expect(ResponseFormatter.formatUnit("invalid", 18)).toBe("0");
    });
  });

  describe("formatNumber", () => {
    it("should format number with comma separators", () => {
      expect(ResponseFormatter.formatNumber("1234567")).toBe("1,234,567");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatNumber(undefined)).toBe("0");
    });
  });

  describe("formatGas", () => {
    it("should format gas value in Gwei", () => {
      expect(ResponseFormatter.formatGas("1000000000")).toBe("1 Gdrip");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatGas(undefined)).toBe("0 Gdrip");
    });
  });

  describe("formatCFX", () => {
    it("should format CFX value with proper decimals", () => {
      expect(ResponseFormatter.formatCFX("1000000000000000000")).toBe("1");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatCFX(undefined)).toBe("0");
    });
  });

  describe("formatTimestamp", () => {
    it("should format timestamp to date string", () => {
      expect(ResponseFormatter.formatTimestamp(1677649200)).toBe("2023-03-01 05:40:00");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatTimestamp(undefined)).toBe("N/A");
    });
  });

  describe("formatDate", () => {
    it("should format date with specified style", () => {
      expect(ResponseFormatter.formatDate(1677649200, "full")).toBe("2023-03-01 05:40:00");
      expect(ResponseFormatter.formatDate(1677649200, "date")).toBe("2023-03-01");
      expect(ResponseFormatter.formatDate(1677649200, "unix")).toBe("1677649200");
    });

    it("should handle undefined value", () => {
      expect(ResponseFormatter.formatDate(undefined)).toBe("N/A");
    });

    it("should use default style when not specified", () => {
      expect(ResponseFormatter.formatDate(1677649200)).toBe("2023-03-01 05:40:00");
    });
  });
});
