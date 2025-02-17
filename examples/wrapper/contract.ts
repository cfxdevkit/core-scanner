import { ContractWrapper } from "../../src";
import { TEST_ADDRESSES, inspect, demonstrationWrapper, MODULE_OPTIONS } from "../common/utils";

/**
 * Demonstrates all methods available in the Contract module
 */
async function demonstrateContractWrapper() {
  // Initialize scanner for mainnet
  const contract = new ContractWrapper(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Contract Wrapper Demonstration ===");

    // Get contract ABI
    console.log("\nTesting getABI...");
    const abi = await contract.getABI({
      address: TEST_ADDRESSES.CONTRACT.VERIFIED,
    });
    console.log("Contract ABI result:", inspect(abi));

    // Get contract source code
    console.log("\nTesting getSourceCode...");
    const sourceCode = await contract.getSourceCode({
      address: TEST_ADDRESSES.CONTRACT.VERIFIED,
    });
    console.log("Contract source code result:", inspect(sourceCode));

    // Verify proxy contract (Note: This requires a valid proxy contract address)
    console.log("\nTesting verifyProxyContract...");
    try {
      const proxyVerification = await contract.verifyProxyContract({
        address: TEST_ADDRESSES.CONTRACT.VERIFIED,
      });
      console.log("Proxy contract verification result:", inspect(proxyVerification));
    } catch (error) {
      console.log(
        "Proxy verification failed (expected if not a proxy contract):",
        error instanceof Error ? error.message : String(error)
      );
    }

    // Check proxy verification status (Note: This requires a valid GUID from a previous verification)
    console.log("\nTesting checkProxyVerification...");
    try {
      const proxyVerificationStatus = await contract.checkProxyVerification({
        guid: "example-guid", // Replace with a valid GUID from a previous verification
      });
      console.log("Proxy verification status result:", inspect(proxyVerificationStatus));
    } catch (error) {
      console.log(
        "Proxy verification status check failed (expected with invalid GUID):",
        error instanceof Error ? error.message : String(error)
      );
    }

    // Check source code verification status (Note: This requires a valid GUID from a previous verification)
    console.log("\nTesting checkVerifyStatus...");
    try {
      const verificationStatus = await contract.checkVerifyStatus({
        guid: "example-guid", // Replace with a valid GUID from a previous verification
      });
      console.log("Verification status result:", inspect(verificationStatus));
    } catch (error) {
      console.log(
        "Verification status check failed (expected with invalid GUID):",
        error instanceof Error ? error.message : String(error)
      );
    }
  } catch (error) {
    console.error(
      "Error during Contract module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Contract module", demonstrateContractWrapper);
}
