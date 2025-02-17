import { NFTModule } from "../../src";
import {
  TEST_ADDRESSES,
  TEST_DATA,
  PAGINATION,
  inspect,
  demonstrationWrapper,
  MODULE_OPTIONS,
} from "../common/utils";

/**
 * Demonstrates all methods available in the NFT module
 */
async function demonstrateNFTModule() {
  // Initialize scanner for mainnet
  const nft = new NFTModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== NFT Module Demonstration ===");

    // Get NFT balances
    console.log("\nTesting getBalances...");
    const balances = await nft.getBalances({
      owner: TEST_ADDRESSES.ACCOUNT.OWNER,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
    });
    console.log("NFT balances result:", inspect(balances));

    // Get NFT tokens
    console.log("\nTesting getTokens...");
    const tokens = await nft.getTokens({
      contract: TEST_ADDRESSES.CONTRACT.NFT,
      owner: TEST_ADDRESSES.ACCOUNT.OWNER,
      skip: PAGINATION.DEFAULT.skip,
      limit: PAGINATION.DEFAULT.limit,
      withBrief: "true",
      withMetadata: "true",
      suppressMetadataError: "true",
    });
    console.log("NFT tokens result:", inspect(tokens));

    // Get NFT preview
    console.log("\nTesting getPreview...");
    const preview = await nft.getPreview({
      contract: TEST_ADDRESSES.CONTRACT.NFT,
      tokenId: TEST_DATA.NFT.TOKEN_ID,
      withMetadata: "true",
    });
    console.log("NFT preview result:", inspect(preview));

    // Get NFT fungible tokens
    console.log("\nTesting getFts...");
    const fts = await nft.getFts({
      contract: TEST_ADDRESSES.CONTRACT.NFT,
      name: TEST_DATA.NFT.NAME,
    });
    console.log("NFT Search the NFT by NFT name and/or contract address result:", inspect(fts));

    // Get NFT owners
    console.log("\nTesting getOwners...");
    const owners = await nft.getOwners({
      contract: TEST_ADDRESSES.CONTRACT.NFT,
      tokenId: TEST_DATA.NFT.TOKEN_ID,
      cursor: "",
      limit: PAGINATION.DEFAULT.limit,
    });
    console.log("NFT owners result:", inspect(owners));

    // Get NFT transfers
    console.log("\nTesting getTransfers...");
    const transfers = await nft.getTransfers({
      contract: TEST_ADDRESSES.CONTRACT.NFT,
      tokenId: TEST_DATA.NFT.TOKEN_ID,
      startBlock: TEST_DATA.BLOCK.START,
      endBlock: TEST_DATA.BLOCK.END,
    });
    console.log("NFT transfers result:", inspect(transfers));
  } catch (error) {
    console.error(
      "Error during NFT module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("NFT module", demonstrateNFTModule);
}
