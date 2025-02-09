import { ResponseFormatter } from "../responses";
import { NumberFormatter } from "../numbers";
import { DateFormatter } from "../dates";
import { jest } from "@jest/globals";
import { formatUnits } from "cive";
import { TopStatsItem } from "../../types";

jest.mock("../numbers");
jest.mock("../dates");
jest.mock("cive");

describe("ResponseFormatter", () => {
  const MockedNumberFormatter = NumberFormatter as jest.Mocked<typeof NumberFormatter>;
  const MockedDateFormatter = DateFormatter as jest.Mocked<typeof DateFormatter>;
  const MockedFormatUnits = formatUnits as jest.MockedFunction<typeof formatUnits>;

  beforeEach(() => {
    jest.clearAllMocks();
    MockedNumberFormatter.formatNumber.mockReturnValue("1,000");
    MockedNumberFormatter.formatGas.mockReturnValue("1 Gwei");
    MockedDateFormatter.formatTimestamp.mockReturnValue("2024-02-07 12:00:00");
    MockedFormatUnits.mockReturnValue("1.0");
  });

  describe("formatUnit", () => {
    it("should format unit with decimals", () => {
      const result = ResponseFormatter.formatUnit("1000000000000000000", 18);
      expect(result).toBe("1.0");
      expect(MockedFormatUnits).toHaveBeenCalledWith(BigInt("1000000000000000000"), 18);
    });

    it('should return "0" for undefined value', () => {
      expect(ResponseFormatter.formatUnit(undefined, 18)).toBe("0");
    });
  });

  describe("formatNumber", () => {
    it("should format number using NumberFormatter", () => {
      const result = ResponseFormatter.formatNumber(1000);
      expect(result).toBe("1,000");
      expect(MockedNumberFormatter.formatNumber).toHaveBeenCalledWith(1000);
    });

    it('should return "0" for undefined value', () => {
      expect(ResponseFormatter.formatNumber(undefined)).toBe("0");
    });
  });

  describe("formatGas", () => {
    it("should format gas using NumberFormatter", () => {
      const result = ResponseFormatter.formatGas("1000000000");
      expect(result).toBe("1 Gwei");
      expect(MockedNumberFormatter.formatGas).toHaveBeenCalledWith("1000000000");
    });

    it('should return "0" for undefined value', () => {
      expect(ResponseFormatter.formatGas(undefined)).toBe("0");
    });
  });

  describe("formatTimestamp", () => {
    it("should format timestamp using DateFormatter", () => {
      const result = ResponseFormatter.formatTimestamp(1707307200);
      expect(result).toBe("2024-02-07 12:00:00");
      expect(MockedDateFormatter.formatTimestamp).toHaveBeenCalledWith(1707307200);
    });

    it('should return "N/A" for undefined value', () => {
      expect(ResponseFormatter.formatTimestamp(undefined)).toBe("N/A");
    });
  });

  describe("formatTokenData", () => {
    const mockToken = {
      address: "0x1234567890123456789012345678901234567890",
      name: "Test Token",
      symbol: "TEST",
      decimals: 18,
      type: "ERC20",
      amount: "1000000000000000000",
      contract: "0x1234567890123456789012345678901234567890",
      priceInUSDT: "1.5",
    };

    beforeEach(() => {
      MockedNumberFormatter.formatTokenAmount.mockImplementation((amount, _decimals) => {
        if (!amount) return "0";
        return amount === "1000000000000000000" ? "1.0" : "0";
      });
    });

    it("should format token data with all fields", () => {
      const result = ResponseFormatter.formatTokenData(mockToken);
      expect(result).toContain("Token: Test Token (TEST)");
      expect(result).toContain("Type: ERC20");
      expect(result).toContain("Amount: 1.0 TEST");
      expect(result).toContain("Contract: 0x1234567890123456789012345678901234567890");
      expect(result).toContain("Price: $1.5000");
    });

    it("should handle missing optional fields", () => {
      const minimalToken = {
        address: "0x1234567890123456789012345678901234567890",
        name: "Test Token",
        symbol: "TEST",
        decimals: 18,
      };
      const result = ResponseFormatter.formatTokenData(minimalToken);
      expect(result).toContain("Token: Test Token (TEST)");
      expect(result).toContain("Type: Unknown");
      expect(result).toContain("Amount: 0 TEST");
      expect(result).toContain("Contract: Unknown");
      expect(result).not.toContain("Price:");
    });
  });

  describe("formatStatItem", () => {
    const mockStatItem = {
      statTime: "2024-02-07",
      count: 100,
      value: 1000,
    };

    it("should format stat item", () => {
      const result = ResponseFormatter.formatStatItem(mockStatItem);
      expect(result).toContain("Time: 2024-02-07 12:00:00");
      expect(result).toContain("count: 1,000");
      expect(result).toContain("value: 1,000");
    });
  });

  describe("formatTopStats", () => {
    beforeEach(() => {
      MockedNumberFormatter.formatNumber.mockImplementation((val) => val?.toString() || "0");
      MockedNumberFormatter.formatGas.mockImplementation((val) => val?.toString() || "0");
    });

    const mockTopStats = {
      gasTotal: "1000000",
      valueTotal: "2000000",
      list: [
        {
          address: "cfx:type.user.address",
          gas: "500000",
          value: "1000000",
          transferCntr: "100",
          statTime: 1234567890,
          count: "1",
        },
      ] as TopStatsItem[],
    };

    test("should format top stats correctly", () => {
      const result = ResponseFormatter.formatTopStats(mockTopStats);
      expect(result).toContain("Total Gas Used: 1000000");
      expect(result).toContain("Total Value: 2000000");
      expect(result).toContain("#1 cfx:type.user.address");
    });
  });

  describe("wrapResponse", () => {
    it("should wrap raw and formatted data", () => {
      const raw = { data: "raw" };
      const formatted = { data: "formatted" };
      const result = ResponseFormatter.wrapResponse(raw, formatted);
      expect(result).toEqual({
        raw,
        formatted,
      });
    });
  });
});
