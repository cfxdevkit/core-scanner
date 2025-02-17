import { AccountModule } from "../../src";
import {
  TEST_ADDRESSES,
  PAGINATION,
  inspect,
  demonstrationWrapper,
  MODULE_OPTIONS,
} from "../common/utils";

/**
 * Demonstrates all methods available in the Account module
 */
async function demonstrateAccountModule() {
  // Initialize scanner for mainnet
  const account = new AccountModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Account Module Demonstration ===");

    // Get account transactions (account)
    console.log("\nTesting AccountTransactions...");
    const transactions = await account.AccountTransactions({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("Account transactions result:", inspect(transactions));

    // Get CFX transfers (account)
    console.log("\nTesting CfxTransfers...");
    const cfxTransfers = await account.CfxTransfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("CFX transfers result:", inspect(cfxTransfers));

    // Get CRC20 transfers (account)
    console.log("\nTesting Crc20Transfers...");
    const erc20Transfers = await account.Crc20Transfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("CRC20 transfers result:", inspect(erc20Transfers));

    // Get CRC721 transfers (account)
    console.log("\nTesting Crc721Transfers...");
    const erc721Transfers = await account.Crc721Transfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("CRC721 transfers result:", inspect(erc721Transfers));

    // Get CRC1155 transfers (account)
    console.log("\nTesting Crc1155Transfers...");
    const erc1155Transfers = await account.Crc1155Transfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("CRC1155 transfers result:", inspect(erc1155Transfers));

    // Get CRC3525 transfers (account)
    console.log("\nTesting Crc3525Transfers...");
    const erc3525Transfers = await account.Crc3525Transfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("CRC3525 transfers result:", inspect(erc3525Transfers));

    // Get account transfers (account)
    console.log("\nTesting AccountTransfers...");
    const accountTransfers = await account.AccountTransfers({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      sort: PAGINATION.DEFAULT.sort,
    });
    console.log("Account transfers result:", inspect(accountTransfers));

    // Get account approvals (account)
    console.log("\nTesting AccountApprovals...");
    const accountApprovals = await account.AccountApprovals({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      tokenType: "CRC20",
    });
    console.log("Account approvals result:", inspect(accountApprovals));

    // Get account tokens (account)
    console.log("\nTesting AccountTokens...");
    const accountTokens = await account.AccountTokens({
      account: TEST_ADDRESSES.ACCOUNT.SINGLE,
      tokenType: "CRC20,CRC721,CRC1155",
    });
    console.log("Account tokens result:", inspect(accountTokens));

    // Get token info (account)
    console.log("\nTesting Tokeninfos...");
    const tokenInfos = await account.Tokeninfos({
      contracts: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Token info result:", inspect(tokenInfos));
  } catch (error) {
    console.error(
      "Error during Account module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Account module", demonstrateAccountModule);
}
