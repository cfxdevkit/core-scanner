import { isAddress } from "cive/utils";
import { createLogger } from "./logger";

const logger = createLogger("AddressValidator");

export class AddressValidator {
  static validateAddress(address: string): boolean {
    const isValid = isAddress(address);
    if (!isValid) {
      logger.error({ address }, "Invalid Core address provided");
    } else {
      logger.debug({ address }, "Address validation successful");
    }
    return isValid;
  }

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

/**
 * Validates if a given string is a valid Conflux address
 */
export function isValidAddress(address: string): boolean {
  if (!address || typeof address !== "string") {
    return false;
  }

  // Basic Conflux address format check
  return address.startsWith("cfx:") && address.length >= 42;
}

/**
 * Validates timestamp range parameters
 */
export function validateTimestampRange(params: {
  minTimestamp?: number;
  maxTimestamp?: number;
}): void {
  const { minTimestamp, maxTimestamp } = params;

  if (minTimestamp && maxTimestamp && minTimestamp > maxTimestamp) {
    throw new Error("minTimestamp must be less than or equal to maxTimestamp");
  }
}
