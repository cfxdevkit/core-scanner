/**
 * @packageDocumentation
 * Address validation utilities for Conflux Core.
 * Provides functionality for validating single and multiple Conflux-style addresses.
 * Uses cive's isAddress for validation and includes logging.
 * @module utils/validation
 */

import { isAddress } from "cive/utils";
import { createLogger } from "./logger";

const logger = createLogger("AddressValidator");

/**
 * Utility class for validating Conflux-style addresses used in Conflux Core.
 * Provides methods for validating both single addresses and arrays of addresses.
 *
 * @class AddressValidator
 */
export class AddressValidator {
  /**
   * Validates a single Conflux-style address.
   * Checks if the address is a valid 40-character (excluding '0x') hexadecimal string.
   *
   * @param {string} address - The address to validate
   * @returns {boolean} True if the address is valid, false otherwise
   *
   * @example
   * // Returns true
   * AddressValidator.validateAddress("0x1234567890123456789012345678901234567890")
   * // Returns false
   * AddressValidator.validateAddress("invalid-address")
   */
  static validateAddress(address: string): boolean {
    const isValid = isAddress(address);
    if (!isValid) {
      logger.error({ address }, "Invalid Core address provided");
    } else {
      logger.debug({ address }, "Address validation successful");
    }
    return isValid;
  }

  /**
   * Validates an array of Conflux-style addresses.
   * Checks each address in the array and returns true only if all addresses are valid.
   *
   * @param {string[]} addresses - Array of addresses to validate
   * @returns {boolean} True if all addresses are valid, false if any address is invalid
   *
   * @example
   * // Returns true
   * AddressValidator.validateAddresses([
   *   "0x1234567890123456789012345678901234567890",
   *   "0x0987654321098765432109876543210987654321"
   * ])
   * // Returns false
   * AddressValidator.validateAddresses([
   *   "0x1234567890123456789012345678901234567890",
   *   "invalid-address"
   * ])
   */
  static validateAddresses(addresses: string[]): boolean {
    logger.debug({ addressCount: addresses.length }, "Validating multiple addresses");
    const isValid = addresses.every((address) => this.validateAddress(address));
    if (!isValid) {
      logger.error({ addresses }, "One or more addresses are invalid");
    } else {
      logger.debug({ addresses }, "All addresses validated successfully");
    }
    return isValid;
  }
}
