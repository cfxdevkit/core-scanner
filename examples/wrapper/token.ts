import { TokenWrapper } from "../../src";
import {
  TEST_ADDRESSES,
  inspect,
  demonstrationWrapper,
  MODULE_OPTIONS,
  getCurrentBlockNumber,
} from "../common/utils";

/**
 * Demonstrates all methods available in the Token module
 */
async function demonstrateTokenWrapper() {
  // Initialize scanner for mainnet
  const token = new TokenWrapper(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Token Wrapper Demonstration ===");

    // Get token balance
    console.log("\nTesting getTokenBalance...");
    const balance = await token.getTokenBalance({
      contractaddress: TEST_ADDRESSES.CONTRACT.TOKEN,
      address: TEST_ADDRESSES.ACCOUNT.SINGLE,
    });
    console.log("Token balance result:", inspect(balance));

    // Get token total supply
    console.log("\nTesting getTokenSupply...");
    const supply = await token.getTokenSupply({
      contractaddress: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Token supply result:", inspect(supply));

    const blockNo = await getCurrentBlockNumber();
    // Get historical token total supply
    console.log("\nTesting getTokenSupplyHistory...");
    const supplyHistory = await token.getTokenSupplyHistory({
      contractaddress: TEST_ADDRESSES.CONTRACT.TOKEN,
      address: TEST_ADDRESSES.ACCOUNT.SINGLE,
      blockno: blockNo,
    });
    console.log("Token supply history result:", inspect(supplyHistory));

    // Get historical token balance
    console.log("\nTesting getTokenBalanceHistory...");
    const balanceHistory = await token.getTokenBalanceHistory({
      contractaddress: TEST_ADDRESSES.CONTRACT.TOKEN,
      address: TEST_ADDRESSES.ACCOUNT.SINGLE,
      blockno: blockNo,
    });
    console.log("Token balance history result:", inspect(balanceHistory));
  } catch (error) {
    console.error(
      "Error during Token module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Token module", demonstrateTokenWrapper);
}
