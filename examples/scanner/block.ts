import { BlockModule, DateFormatter } from "../../src";
import { inspect, demonstrationWrapper, MODULE_OPTIONS } from "../common/utils";

/**
 * Demonstrates all methods available in the Block module
 */
async function demonstrateBlockModule() {
  // Initialize scanner for mainnet
  const block = new BlockModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Block Module Demonstration ===");

    // Get block number by timestamp
    console.log("\nTesting getBlockNumberByTime...");

    // Test with current timestamp
    const currentTimestamp = DateFormatter.getCurrentTimestamp();

    // Get block before current timestamp
    console.log("\nGetting block before current timestamp...");
    const blockBefore = await block.getBlockNumberByTime({
      timestamp: currentTimestamp,
      closest: "before",
    });
    console.log("Block before result:", inspect(blockBefore));

    // Get block after timestamp (1 hour ago)
    console.log("\nGetting block after timestamp from 1 hour ago...");
    const blockAfter = await block.getBlockNumberByTime({
      timestamp: currentTimestamp - 3600,
      closest: "after",
    });
    console.log("Block after result:", inspect(blockAfter));
  } catch (error) {
    console.error(
      "Error during Block module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Block module", demonstrateBlockModule);
}
