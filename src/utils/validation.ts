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
