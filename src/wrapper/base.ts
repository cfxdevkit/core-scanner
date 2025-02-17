/**
 * @packageDocumentation
 * Base wrapper module providing common formatting functionality.
 * Contains the base wrapper class that all other wrapper modules extend.
 * @module wrapper/base
 */

import { ResponseFormatter } from "../formatters";

/**
 * Base wrapper class that provides common functionality for all wrapper modules.
 * Handles module instance creation and common formatting methods.
 *
 * This class serves as the foundation for all wrapper modules in the SDK,
 * providing shared formatting utilities for consistent data presentation.
 *
 * @public
 * @class BaseWrapper
 */
export class BaseWrapper {
  constructor() {}

  /**
   * Format a timestamp value to a human-readable date string.
   * @param {string | number} value - The timestamp to format
   * @returns {string} Formatted date string
   */
  protected formatTimestamp(value: string | number): string {
    return ResponseFormatter.formatTimestamp(value);
  }

  /**
   * Format a CFX value with appropriate decimal places and units.
   * @param {string} value - The CFX value to format
   * @returns {string} Formatted CFX value
   */
  protected formatCFX(value: string): string {
    return ResponseFormatter.formatCFX(value);
  }

  /**
   * Format a gas value with appropriate units.
   * @param {string} value - The gas value to format
   * @returns {string} Formatted gas value
   */
  protected formatGas(value: string): string {
    return ResponseFormatter.formatGas(value);
  }

  /**
   * Format a numeric value with appropriate separators.
   * @param {string | number} value - The number to format
   * @returns {string} Formatted number string
   */
  protected formatNumber(value: string | number): string {
    return ResponseFormatter.formatNumber(value);
  }

  /**
   * Format a value with specified decimal places.
   * @param {string} value - The value to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted value with specified decimals
   */
  protected formatUnit(value: string, decimals: number): string {
    return ResponseFormatter.formatUnit(value, decimals);
  }
}
