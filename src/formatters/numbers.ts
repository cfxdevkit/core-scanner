import { formatEther, formatUnits } from "viem";
import { createLogger } from "../utils/logger";

const logger = createLogger("NumberFormatter");

/**
 * Utility class for formatting numbers in various formats used throughout the application.
 * Handles formatting of regular numbers, percentages, gas values, CFX amounts, and token amounts.
 */
export class NumberFormatter {
  /**
   * Formats a number with comma separators and up to 4 decimal places.
   * @param value - The number to format (can be string or number)
   * @returns Formatted string with comma separators and optional decimals
   * @example
   * formatNumber(1234.5678) // returns "1,234.5678"
   * formatNumber(1000000) // returns "1,000,000"
   */
  static formatNumber(value: string | number | undefined): string {
    if (value === undefined || value === null || value === "") return "0";
    try {
      const num = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(num)) {
        logger.warn({ value }, "Invalid number value, returning 0");
        return "0";
      }

      // Handle decimal truncation manually to ensure exact 4 decimal places
      const parts = num.toString().split(".");
      if (parts.length === 1) return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let decimals = parts[1];
      if (decimals.length > 4) {
        decimals = decimals.substring(0, 4);
      }

      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimals;
    } catch (error) {
      logger.error(
        { value, error: error instanceof Error ? error.message : String(error) },
        "Error formatting number"
      );
      return "0";
    }
  }

  /**
   * Formats a number as a percentage with 2 decimal places.
   * @param value - The value to format as percentage
   * @returns Formatted percentage string with % symbol
   * @example
   * formatPercentage(50.5678) // returns "50.57%"
   * formatPercentage(0) // returns "0.00%"
   */
  static formatPercentage(value: string | number): string {
    if (value === undefined || value === null || value === "") return "0%";
    try {
      const num = Number(value);
      if (isNaN(num)) return "0%";
      return num.toFixed(2) + "%";
    } catch {
      return "0%";
    }
  }

  /**
   * Formats a gas value in Gwei (divides by 1e9).
   * @param value - The gas value to format
   * @returns Formatted gas value string
   * @example
   * formatGas(1000000000) // returns "1"
   */
  static formatGas(value: string | number | undefined): string {
    if (value === undefined || value === null || value === "" || value === 0 || value === "0") {
      logger.debug("Empty or zero gas value provided, returning 0");
      return "0";
    }
    try {
      const gasValue =
        typeof value === "string" ? BigInt(value) : BigInt(Math.floor(Number(value)));
      const formatted = formatUnits(gasValue, 0);
      logger.debug({ originalValue: value, formatted }, "Successfully formatted gas value");
      return this.formatNumber(formatted);
    } catch (error) {
      logger.error(
        {
          value,
          error: error instanceof Error ? error.message : String(error),
        },
        "Error formatting gas value"
      );
      return "0";
    }
  }

  /**
   * Formats a CFX value with proper decimals and unit.
   * Handles scientific notation and converts to human-readable format.
   * @param value - The CFX value to format
   * @returns Formatted CFX value string with unit
   * @example
   * formatCFX("1000000000000000000") // returns "1 CFX"
   * formatCFX(1.5e18) // returns "1.5 CFX"
   */
  static formatCFX(value: string | number | undefined): string {
    if (value === undefined || value === null || value === "") return "0 CFX";
    try {
      // Special case for zero
      if (value === 0 || value === "0") return "0 CFX";

      // Handle scientific notation by converting to a regular number string first
      const normalizedValue =
        typeof value === "number"
          ? value.toLocaleString("fullwide", { useGrouping: false })
          : value;
      const valueInCFX = formatEther(BigInt(normalizedValue));
      logger.debug(
        { originalValue: value, normalizedValue, valueInCFX },
        "Successfully formatted CFX value"
      );
      return `${this.formatNumber(valueInCFX)} CFX`;
    } catch (error) {
      logger.error(
        {
          value,
          error: error instanceof Error ? error.message : String(error),
        },
        "Error formatting CFX value"
      );
      return "0 CFX";
    }
  }

  /**
   * Formats a token amount with proper decimals.
   * Can handle both regular tokens and CFX tokens.
   * @param amount - The token amount to format
   * @param decimals - Number of decimals for the token (default: 18)
   * @param isCFX - Whether this is a CFX token amount (default: false)
   * @returns Formatted token amount string
   * @example
   * formatTokenAmount("1000000000000000000", 18) // returns "1"
   * formatTokenAmount("1000000000000000000", 18, true) // returns "1 CFX"
   */
  static formatTokenAmount(
    amount: string | number,
    decimals: number = 18,
    isCFX: boolean = false
  ): string {
    if (!amount) {
      logger.debug("Empty amount provided, returning 0");
      return isCFX ? "0 CFX" : "0";
    }
    try {
      let formatted: string;
      if (isCFX) {
        // Handle scientific notation by converting to BigInt first
        const bigAmount =
          typeof amount === "string" ? BigInt(amount) : BigInt(Math.floor(Number(amount)));
        formatted = formatEther(bigAmount);
        logger.debug(
          {
            originalAmount: amount,
            bigAmount: bigAmount.toString(),
            formatted,
          },
          "Successfully formatted CFX token amount"
        );
        return `${this.formatNumber(formatted)} CFX`;
      }
      formatted = formatUnits(BigInt(amount), decimals);
      logger.debug(
        {
          originalAmount: amount,
          decimals,
          formatted,
        },
        "Successfully formatted token amount"
      );
      return this.formatNumber(formatted);
    } catch (error) {
      logger.error(
        {
          amount,
          decimals,
          isCFX,
          error: error instanceof Error ? error.message : String(error),
        },
        "Error formatting token amount"
      );
      return isCFX ? "0 CFX" : "0";
    }
  }
}
