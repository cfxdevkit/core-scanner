/**
 * @packageDocumentation
 * Account wrapper module for the Conflux Core Scanner SDK.
 * Provides high-level methods for account operations with data formatting.
 * @module wrapper/modules/account
 * @category Wrappers
 */

import { BaseWrapper } from "../base";
import { ApiConfig, Account } from "../../types";
import { AccountModule } from "../../core/modules";
export class AccountWrapper extends BaseWrapper {
  /**
   * Get account transactions
   */
  private account: AccountModule;
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super();
    this.account = new AccountModule(config);
  }
  async AccountTransactions(
    params: Account.AccountTransactionsParams,
    returnRaw: boolean = false
  ): Promise<Account.AccountTransactions> {
    const data = await this.account.AccountTransactions(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
      gasPrice: tx.gasPrice ? this.formatGas(tx.gasPrice) : tx.gasPrice,
      gasFee: tx.gasFee ? this.formatGas(tx.gasFee) : tx.gasFee,
      value: tx.value ? this.formatCFX(tx.value) : tx.value,
    }));
    return data;
  }

  /**
   * Get CFX transfers
   */
  async CfxTransfers(
    params: Account.CfxTransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.CfxTransfers> {
    const data = await this.account.CfxTransfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
      amount: tx.amount ? this.formatCFX(tx.amount) : tx.amount,
    }));
    return data;
  }

  /**
   * Get CRC20 transfers
   */
  async Crc20Transfers(
    params: Account.Crc20TransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.Crc20Transfers> {
    const data = await this.account.Crc20Transfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
      amount: tx.amount
        ? this.formatUnit(
            tx.amount,
            tx.contract ? (data.addressInfo?.[tx.contract]?.token?.decimals ?? 18) : 18
          )
        : tx.amount,
    }));
    return data;
  }

  /**
   * Get CRC721 transfers
   */
  async Crc721Transfers(
    params: Account.Crc721TransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.Crc721Transfers> {
    const data = await this.account.Crc721Transfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
    }));
    return data;
  }

  /**
   * Get CRC1155 transfers
   */
  async Crc1155Transfers(
    params: Account.Crc1155TransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.Crc1155Transfers> {
    const data = await this.account.Crc1155Transfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
    }));
    return data;
  }

  /**
   * Get CRC3525 transfers
   */
  async Crc3525Transfers(
    params: Account.Crc3525TransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.Crc3525Transfers> {
    const data = await this.account.Crc3525Transfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
    }));
    return data;
  }

  /**
   * Get account transfers
   */
  async AccountTransfers(
    params: Account.AccountTransfersParams,
    returnRaw: boolean = false
  ): Promise<Account.AccountTransfers> {
    const data = await this.account.AccountTransfers(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      timestamp: tx.timestamp ? this.formatTimestamp(Number(tx.timestamp)) : tx.timestamp,
      amount: tx.amount
        ? this.formatUnit(
            tx.amount,
            tx.contract ? (data.addressInfo?.[tx.contract]?.token?.decimals ?? 18) : 18
          )
        : tx.amount,
    }));
    return data;
  }

  /**
   * Get account approvals
   */
  async AccountApprovals(
    params: Account.AccountApprovalsParams,
    returnRaw: boolean = false
  ): Promise<Account.AccountApprovals> {
    const data = await this.account.AccountApprovals(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Get account tokens
   */
  async AccountTokens(
    params: Account.AccountTokensParams,
    returnRaw: boolean = false
  ): Promise<Account.AccountTokens> {
    const data = await this.account.AccountTokens(params);
    if (returnRaw) return data;
    data.list = data.list?.map((tx) => ({
      ...tx,
      amount: tx.amount ? this.formatUnit(tx.amount, tx.decimals ?? 18) : tx.amount,
    }));
    return data;
  }

  /**
   * Get token tokeninfos
   */
  async Tokeninfos(
    params: Account.TokeninfosParams,
    returnRaw: boolean = false
  ): Promise<Account.Tokeninfos> {
    const data = await this.account.Tokeninfos(params);
    if (returnRaw) return data;
    return data;
  }
}
