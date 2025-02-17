import { BaseWrapper } from "../../../wrapper/base";
import { ResponseFormatter } from "../../../formatters/responses";

describe("BaseWrapper", () => {
  let wrapper: BaseWrapper;

  beforeEach(() => {
    wrapper = new BaseWrapper();
    jest.spyOn(ResponseFormatter, "formatTimestamp");
    jest.spyOn(ResponseFormatter, "formatCFX");
    jest.spyOn(ResponseFormatter, "formatGas");
    jest.spyOn(ResponseFormatter, "formatNumber");
    jest.spyOn(ResponseFormatter, "formatUnit");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("formatTimestamp", () => {
    it("should format timestamp string correctly", () => {
      const result = (
        wrapper as unknown as { formatTimestamp(timestamp: string): string }
      ).formatTimestamp("1677649200");
      expect(result).toBe("N/A");
      expect(ResponseFormatter.formatTimestamp).toHaveBeenCalledWith("1677649200");
    });

    it("should format timestamp number correctly", () => {
      const result = (
        wrapper as unknown as { formatTimestamp(timestamp: number): string }
      ).formatTimestamp(1677649200);
      expect(result).toBe("2023-03-01 05:40:00");
      expect(ResponseFormatter.formatTimestamp).toHaveBeenCalledWith(1677649200);
    });

    it("should handle invalid timestamp", () => {
      const result = (
        wrapper as unknown as { formatTimestamp(timestamp: string): string }
      ).formatTimestamp("invalid");
      expect(result).toBe("N/A");
      expect(ResponseFormatter.formatTimestamp).toHaveBeenCalledWith("invalid");
    });

    it("should handle undefined timestamp", () => {
      const result = (
        wrapper as unknown as { formatTimestamp(timestamp: undefined): string }
      ).formatTimestamp(undefined);
      expect(result).toBe("N/A");
      expect(ResponseFormatter.formatTimestamp).toHaveBeenCalledWith(undefined);
    });
  });

  describe("formatCFX", () => {
    it("should format CFX value correctly", () => {
      const result = (wrapper as unknown as { formatCFX(value: string): string }).formatCFX(
        "1000000000000000000"
      );
      expect(result).toBe("1");
      expect(ResponseFormatter.formatCFX).toHaveBeenCalledWith("1000000000000000000");
    });

    it("should format zero CFX correctly", () => {
      const result = (wrapper as unknown as { formatCFX(value: string): string }).formatCFX("0");
      expect(result).toBe("0");
      expect(ResponseFormatter.formatCFX).toHaveBeenCalledWith("0");
    });

    it("should handle very large CFX values", () => {
      const result = (wrapper as unknown as { formatCFX(value: string): string }).formatCFX(
        "1000000000000000000000"
      ); // 1000 CFX
      expect(result).toBe("1,000");
      expect(ResponseFormatter.formatCFX).toHaveBeenCalledWith("1000000000000000000000");
    });

    it("should handle very small CFX values", () => {
      const result = (wrapper as unknown as { formatCFX(value: string): string }).formatCFX(
        "1000000000000000"
      ); // 0.001 CFX
      expect(result).toBe("0.001");
      expect(ResponseFormatter.formatCFX).toHaveBeenCalledWith("1000000000000000");
    });
  });

  describe("formatGas", () => {
    it("should format gas value correctly", () => {
      const result = (wrapper as unknown as { formatGas(value: string): string }).formatGas(
        "21000"
      );
      expect(result).toBe("0.0000 Gdrip");
      expect(ResponseFormatter.formatGas).toHaveBeenCalledWith("21000");
    });

    it("should handle zero gas", () => {
      const result = (wrapper as unknown as { formatGas(value: string): string }).formatGas("0");
      expect(result).toBe("0 Gdrip");
      expect(ResponseFormatter.formatGas).toHaveBeenCalledWith("0");
    });

    it("should handle large gas values", () => {
      const result = (wrapper as unknown as { formatGas(value: string): string }).formatGas(
        "1000000"
      );
      expect(result).toBe("0.001 Gdrip");
      expect(ResponseFormatter.formatGas).toHaveBeenCalledWith("1000000");
    });
  });

  describe("formatNumber", () => {
    it("should format string number correctly", () => {
      const result = (wrapper as unknown as { formatNumber(value: string): string }).formatNumber(
        "1234567"
      );
      expect(result).toBe("1,234,567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith("1234567");
    });

    it("should format number correctly", () => {
      const result = (wrapper as unknown as { formatNumber(value: number): string }).formatNumber(
        1234567
      );
      expect(result).toBe("1,234,567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith(1234567);
    });

    it("should handle zero", () => {
      const formatNumber = (wrapper as unknown as { formatNumber(value: string | number): string })
        .formatNumber;
      expect(formatNumber("0")).toBe("0");
      expect(formatNumber(0)).toBe("0");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith("0");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith(0);
    });

    it("should handle negative numbers", () => {
      const formatNumber = (wrapper as unknown as { formatNumber(value: string | number): string })
        .formatNumber;
      expect(formatNumber("-1234567")).toBe("-1,234,567");
      expect(formatNumber(-1234567)).toBe("-1,234,567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith("-1234567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith(-1234567);
    });

    it("should handle decimal numbers", () => {
      const formatNumber = (wrapper as unknown as { formatNumber(value: string | number): string })
        .formatNumber;
      expect(formatNumber("1234.567")).toBe("1,234.567");
      expect(formatNumber(1234.567)).toBe("1,234.567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith("1234.567");
      expect(ResponseFormatter.formatNumber).toHaveBeenCalledWith(1234.567);
    });
  });

  describe("formatUnit", () => {
    it("should format unit with 18 decimals correctly", () => {
      const result = (
        wrapper as unknown as { formatUnit(value: string, decimals: number): string }
      ).formatUnit("1000000000000000000", 18);
      expect(result).toBe("1");
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1000000000000000000", 18);
    });

    it("should format unit with 6 decimals correctly", () => {
      const result = (
        wrapper as unknown as { formatUnit(value: string, decimals: number): string }
      ).formatUnit("1000000", 6);
      expect(result).toBe("1");
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1000000", 6);
    });

    it("should handle zero value", () => {
      const formatUnit = (
        wrapper as unknown as { formatUnit(value: string, decimals: number): string }
      ).formatUnit;
      expect(formatUnit("0", 18)).toBe("0");
      expect(formatUnit("0", 6)).toBe("0");
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("0", 18);
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("0", 6);
    });

    it("should handle very small values", () => {
      const formatUnit = (
        wrapper as unknown as { formatUnit(value: string, decimals: number): string }
      ).formatUnit;
      expect(formatUnit("1", 18)).toBe("0.000000000000000001");
      expect(formatUnit("1", 6)).toBe("0.000001");
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1", 18);
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1", 6);
    });

    it("should handle very large values", () => {
      const formatUnit = (
        wrapper as unknown as { formatUnit(value: string, decimals: number): string }
      ).formatUnit;
      expect(formatUnit("1000000000000000000000", 18)).toBe("1000");
      expect(formatUnit("1000000000", 6)).toBe("1000");
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1000000000000000000000", 18);
      expect(ResponseFormatter.formatUnit).toHaveBeenCalledWith("1000000000", 6);
    });
  });
});
