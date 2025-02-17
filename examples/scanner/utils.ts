import { UtilsModule } from "../../src";
import {
  TEST_ADDRESSES,
  TEST_DATA,
  inspect,
  demonstrationWrapper,
  MODULE_OPTIONS,
} from "../common/utils";

/**
 * Demonstrates all methods available in the Utils module
 */
async function demonstrateUtilsModule() {
  // Initialize scanner for mainnet
  const utils = new UtilsModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Utils Module Demonstration ===");

    // Decode method
    console.log("\nTesting decodeMethod...");
    const decodedMethod = await utils.decodeMethod({
      hashes: TEST_DATA.METHOD.HASH,
    });
    console.log("Decoded method result:", inspect(decodedMethod));

    // Decode method raw
    console.log("\nTesting decodeMethodRaw...");
    const decodedMethodRaw = await utils.decodeMethodRaw({
      contracts: TEST_ADDRESSES.CONTRACT.TOKEN,
      inputs: TEST_DATA.METHOD.INPUT_DATA,
    });
    console.log("Decoded method raw result:", inspect(decodedMethodRaw));
  } catch (error) {
    console.error(
      "Error during Utils module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Utils module", demonstrateUtilsModule);
}
