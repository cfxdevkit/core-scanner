/**
 * @packageDocumentation
 * NFT-related wrapper module for the Conflux eSpace Scanner SDK.
 * Provides high-level methods for NFT operations with data formatting.
 * @module wrapper/modules/nft
 * @category Wrappers
 */

import { BaseWrapper } from "../base";
import { ApiConfig, NFT } from "../../types";
import { NFTModule } from "../../core/modules";
export class NFTWrapper extends BaseWrapper {
  /**
   * Get NFT balances for an address
   */
  private nft: NFTModule;
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super();
    this.nft = new NFTModule(config);
  }
  async getBalances(params: NFT.BalancesParams, returnRaw: boolean = false): Promise<NFT.Balances> {
    const data = await this.nft.getBalances(params);
    if (returnRaw) return data;
    return {
      ...data,
      list: data.list?.map((item) => ({
        ...item,
        balance: item.balance ? this.formatNumber(item.balance) : item.balance,
      })),
    };
  }

  /**
   * Get NFT tokens for a contract
   */
  async getTokens(params: NFT.TokensParams, returnRaw: boolean = false): Promise<NFT.Tokens> {
    const data = await this.nft.getTokens(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Get NFT preview data
   */
  async getPreview(params: NFT.PreviewParams, returnRaw: boolean = false): Promise<NFT.Preview> {
    const data = await this.nft.getPreview(params);
    if (returnRaw) return data;
    data.mintTimestamp = data.mintTimestamp
      ? this.formatTimestamp(Number(data.mintTimestamp))
      : data.mintTimestamp;
    return data;
  }

  /**
   * Get NFT fungible tokens for a contract
   */
  async getFts(params: NFT.FtsParams, returnRaw: boolean = false): Promise<NFT.Fts> {
    const data = await this.nft.getFts(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Get NFT owners for a specific token
   */
  async getOwners(params: NFT.OwnersParams, returnRaw: boolean = false): Promise<NFT.Owners> {
    const data = await this.nft.getOwners(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Get NFT transfers for a specific token
   */
  async getTransfers(
    params: NFT.TransfersParams,
    returnRaw: boolean = false
  ): Promise<NFT.Transfers> {
    const data = await this.nft.getTransfers(params);
    if (returnRaw) return data;
    return {
      ...data,
      list: data.list?.map((item) => ({
        ...item,
        timestamp: item.timestamp ? this.formatTimestamp(Number(item.timestamp)) : item.timestamp,
      })),
    };
  }
}
