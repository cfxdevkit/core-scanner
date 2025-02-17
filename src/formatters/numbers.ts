/**
 * @packageDocumentation
 * Number formatting utilities for blockchain-specific values.
 * Provides functionality for formatting numbers, percentages, gas values, and cryptocurrency amounts.
 * Handles scientific notation, decimal places, and unit conversions.
 * @module formatters/numbers
 */

import { formatCFX, formatUnits } from "cive";
import { createLogger } from "../utils/logger";

const logger = createLogger("NumberFormatter");

/**
 * Utility class for formatting numbers in various formats used throughout the application.
 * Handles formatting of regular numbers, percentages, gas values, CFX amounts, and token amounts.
 */
export class NumberFormatter {
  /**
   * Formats a number with comma separators and up to 4 decimal places.
   * Handles both string and number inputs, with fallback to "0" for invalid values.
   *
   * @param {string | number | undefined} value - The number to format
   * @returns {string} Formatted string with comma separators and optional decimals
   * @throws {Error} If the value cannot be parsed or formatted
   *
   * @example
   * // Returns "1,234.5678"
   * NumberFormatter.formatNumber(1234.5678)
   * // Returns "1,000,000"
   * NumberFormatter.formatNumber(1000000)
   * // Returns "1,234.56"
   * NumberFormatter.formatNumber("1234.56")
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
   * Always includes the % symbol and handles invalid inputs gracefully.
   *
   * @param {string | number} value - The value to format as percentage
   * @returns {string} Formatted percentage string with % symbol
   *
   * @example
   * // Returns "50.57%"
   * NumberFormatter.formatPercentage(50.5678)
   * // Returns "0.00%"
   * NumberFormatter.formatPercentage(0)
   * // Returns "100.00%"
   * NumberFormatter.formatPercentage("100")
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
   * Converts raw gas values to human-readable format with appropriate units.
   *
   * @param {string | number | undefined} value - The gas value to format
   * @returns {string} Formatted gas value string with units
   *
   * @example
   * // Returns "1.0 Gwei"
   * NumberFormatter.formatGas(1000000000)
   * // Returns "1.5 Gwei"
   * NumberFormatter.formatGas("1500000000")
   * // Returns "0 Gwei"
   * NumberFormatter.formatGas(undefined)
   */
  static formatGas(value: string | number | undefined): string {
    if (!value) return "0 Gdrip";
    try {
      const formatted = formatUnits(BigInt(value), 9);
      return `${this.formatNumber(formatted)} Gdrip`;
    } catch (error) {
      logger.error("Error formatting gas value", { module: "NumberFormatter", value, error });
      return "0 Gdrip";
    }
  }

  /**
   * Formats a CFX value with proper decimals and unit.
   * Handles scientific notation and converts to human-readable format.
   * Uses 18 decimal places as the standard for CFX tokens.
   *
   * @param {string | number | undefined} value - The CFX value to format (in wei)
   * @returns {string} Formatted CFX value string
   *
   * @example
   * // Returns "1 CFX"
   * NumberFormatter.formatCFX("1000000000000000000")
   * // Returns "1.5 CFX"
   * NumberFormatter.formatCFX("1500000000000000000")
   * // Returns "0"
   * NumberFormatter.formatCFX(undefined)
   */
  static formatCFX(value: string | number | undefined): string {
    if (!value) return "0";
    try {
      const formatted = formatCFX(BigInt(value));
      return `${this.formatNumber(formatted)}`;
    } catch (error) {
      logger.error("Error formatting CFX value", { module: "NumberFormatter", value, error });
      return "";
    }
  }
}
