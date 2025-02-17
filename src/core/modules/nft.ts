/**
 * @packageDocumentation
 * NFT module for interacting with NFTs on Conflux eSpace.
 * Provides functionality for querying NFT balances, tokens, transfers, and ownership information.
 * @module core/modules/nft
 */

import { CoreApi } from "../api";
import { AddressValidator } from "../../utils";
import { createLogger } from "../../utils/logger";
import { NFT } from "../../types";
import { ApiConfig } from "../../types";

/**
 * Module for handling NFT-related operations on Conflux eSpace.
 * Provides methods for querying NFT balances, tokens, transfers, and ownership information.
 *
 * @class NFTModule
 * @extends {CoreApi}
 */
export class NFTModule extends CoreApi {
  /** Logger instance for NFT operations */
  protected logger = createLogger("NFTModule");

  /**
   * Creates an instance of NFTModule.
   * @param {ApiConfig} config - Configuration object for the NFT module
   */
  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Get NFT balances for an address.
   * Retrieves all NFT balances for a specific address.
   *
   * @param {NFT.BalancesParams} params - Parameters for the NFT balances query
   * @param {string} params.owner - Address to check the NFT balances for
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<NFT.Balances>} The NFT balances for the address
   * @throws {Error} If the owner address is invalid
   */
  async getBalances(params: NFT.BalancesParams): Promise<NFT.Balances> {
    this.logger.debug({ params }, "Getting NFT balances");
    if (!AddressValidator.validateAddress(params.owner)) {
      throw new Error(`Invalid address: ${params.owner}`);
    }
    const response = await this.fetchApi<NFT.Balances>("/nft/balances", {
      owner: params.owner,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get NFT tokens for a contract.
   * Retrieves all NFT tokens for a specific contract address with optional filtering.
   *
   * @param {NFT.TokensParams} params - Parameters for the NFT tokens query
   * @param {string} params.contract - Contract address to get tokens from
   * @param {string} [params.owner] - Filter tokens by owner address
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {string} [params.sortField] - Field to sort by
   * @param {string} [params.cursor] - Cursor for pagination
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @param {boolean} [params.withBrief] - Include brief token information
   * @param {boolean} [params.withMetadata] - Include token metadata
   * @param {boolean} [params.suppressMetadataError] - Suppress metadata-related errors
   * @returns {Promise<NFT.Tokens>} The NFT tokens for the contract
   * @throws {Error} If the contract address is invalid
   */
  async getTokens(params: NFT.TokensParams): Promise<NFT.Tokens> {
    this.logger.debug({ params }, "Getting NFT tokens");
    if (!AddressValidator.validateAddress(params.contract)) {
      throw new Error(`Invalid contract address: ${params.contract}`);
    }
    const response = await this.fetchApi<NFT.Tokens>("/nft/tokens", {
      contract: params.contract,
      owner: params.owner,
      sort: params.sort,
      sortField: params.sortField,
      cursor: params.cursor,
      skip: params.skip,
      limit: params.limit,
      withBrief: params.withBrief,
      withMetadata: params.withMetadata,
      suppressMetadataError: params.suppressMetadataError,
    });
    return response.data;
  }

  /**
   * Get NFT preview data.
   * Retrieves preview information for a specific NFT token.
   *
   * @param {NFT.PreviewParams} params - Parameters for the NFT preview query
   * @param {string} params.contract - Contract address of the NFT
   * @param {string} params.tokenId - Token ID to get preview for
   * @param {boolean} [params.withMetadata] - Include token metadata
   * @returns {Promise<NFT.Preview>} The NFT preview data
   * @throws {Error} If the contract address is invalid
   */
  async getPreview(params: NFT.PreviewParams): Promise<NFT.Preview> {
    this.logger.debug({ params }, "Getting NFT preview");
    if (!AddressValidator.validateAddress(params.contract)) {
      throw new Error(`Invalid contract address: ${params.contract}`);
    }
    const response = await this.fetchApi<NFT.Preview>("/nft/preview", {
      contract: params.contract,
      tokenId: params.tokenId,
      withMetadata: params.withMetadata,
    });
    return response.data;
  }

  /**
   * Get NFT fungible tokens for a contract.
   * Searches for NFTs by name and/or contract address.
   *
   * @param {NFT.FtsParams} params - Parameters for the NFT fungible tokens query
   * @param {string} [params.contract] - Contract address to filter by
   * @param {string} [params.name] - NFT name to search for
   * @returns {Promise<NFT.Fts>} The matching NFT fungible tokens
   */
  async getFts(params: NFT.FtsParams): Promise<NFT.Fts> {
    this.logger.debug({ params }, "Search the NFT by NFT name and/or contract address.");
    const response = await this.fetchApi<NFT.Fts>("/nft/fts", {
      contract: params.contract,
      name: params.name,
    });
    return response.data;
  }

  /**
   * Get NFT owners for a specific token.
   * Retrieves all owners of a specific NFT token.
   *
   * @param {NFT.OwnersParams} params - Parameters for the NFT owners query
   * @param {string} params.contract - Contract address of the NFT
   * @param {string} params.tokenId - Token ID to get owners for
   * @param {string} [params.cursor] - Cursor for pagination
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<NFT.Owners>} The NFT token owners
   * @throws {Error} If the contract address is invalid
   */
  async getOwners(params: NFT.OwnersParams): Promise<NFT.Owners> {
    this.logger.debug({ params }, "Getting NFT owners");
    if (!AddressValidator.validateAddress(params.contract)) {
      throw new Error(`Invalid contract address: ${params.contract}`);
    }
    const response = await this.fetchApi<NFT.Owners>("/nft/owners", {
      contract: params.contract,
      tokenId: params.tokenId,
      cursor: params.cursor,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get NFT transfers for a specific token.
   * Retrieves transfer history for a specific NFT token with optional filtering.
   *
   * @param {NFT.TransfersParams} params - Parameters for the NFT transfers query
   * @param {string} params.contract - Contract address of the NFT
   * @param {string} params.tokenId - Token ID to get transfers for
   * @param {string} [params.cursor] - Cursor for pagination
   * @param {number} [params.limit] - Maximum number of results to return
   * @param {string} [params.from] - Filter transfers from this address
   * @param {string} [params.to] - Filter transfers to this address
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.minTimestamp] - Minimum timestamp
   * @param {number} [params.maxTimestamp] - Maximum timestamp
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @returns {Promise<NFT.Transfers>} The NFT transfer history
   * @throws {Error} If the contract address is invalid
   */
  async getTransfers(params: NFT.TransfersParams): Promise<NFT.Transfers> {
    this.logger.debug({ params }, "Getting NFT transfers");
    if (!AddressValidator.validateAddress(params.contract)) {
      throw new Error(`Invalid contract address: ${params.contract}`);
    }
    const response = await this.fetchApi<NFT.Transfers>("/nft/transfers", {
      contract: params.contract,
      tokenId: params.tokenId,
      cursor: params.cursor,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
    });
    return response.data;
  }
}
