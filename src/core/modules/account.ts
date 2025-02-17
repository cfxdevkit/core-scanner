import { CoreApi } from "../api";
import { createLogger } from "../../utils/logger";
import { ApiConfig } from "../../types";
import { Account } from "../../types";
export class AccountModule extends CoreApi {
  protected logger = createLogger("AccountModule");

  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Get block number by Unix timestamp
   */
  async AccountTransactions(
    params: Account.AccountTransactionsParams
  ): Promise<Account.AccountTransactions> {
    this.logger.debug({ params }, "Getting account transactions");

    if (typeof params.account !== "string") {
      this.logger.error({ params }, "Invalid account provided");
      throw new Error(`Invalid account: ${params.account}`);
    }

    const response = await this.fetchApi<Account.AccountTransactions>("/account/transactions", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async CfxTransfers(params: Account.CfxTransfersParams): Promise<Account.CfxTransfers> {
    this.logger.debug({ params }, "Getting cfx transfers");

    const response = await this.fetchApi<Account.CfxTransfers>("/account/cfx/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async Crc20Transfers(params: Account.Crc20TransfersParams): Promise<Account.Crc20Transfers> {
    this.logger.debug({ params }, "Getting erc20 transfers");

    const response = await this.fetchApi<Account.Crc20Transfers>("/account/crc20/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async Crc721Transfers(params: Account.Crc721TransfersParams): Promise<Account.Crc721Transfers> {
    this.logger.debug({ params }, "Getting erc721 transfers");

    const response = await this.fetchApi<Account.Crc721Transfers>("/account/crc721/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async Crc1155Transfers(
    params: Account.Crc1155TransfersParams
  ): Promise<Account.Crc1155Transfers> {
    this.logger.debug({ params }, "Getting erc1155 transfers");

    const response = await this.fetchApi<Account.Crc1155Transfers>("/account/crc1155/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async Crc3525Transfers(
    params: Account.Crc3525TransfersParams
  ): Promise<Account.Crc3525Transfers> {
    this.logger.debug({ params }, "Getting erc3525 transfers");

    const response = await this.fetchApi<Account.Crc3525Transfers>("/account/crc3525/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
    });
    return response.data;
  }

  async AccountTransfers(
    params: Account.AccountTransfersParams
  ): Promise<Account.AccountTransfers> {
    this.logger.debug({ params }, "Getting account transfers");

    const response = await this.fetchApi<Account.AccountTransfers>("/account/transfers", {
      account: params.account,
      skip: params.skip,
      limit: params.limit,
      from: params.from,
      to: params.to,
      startBlock: params.startBlock,
      endBlock: params.endBlock,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort?.toUpperCase(),
      transferType: params.transferType,
    });
    return response.data;
  }

  async AccountApprovals(
    params: Account.AccountApprovalsParams
  ): Promise<Account.AccountApprovals> {
    this.logger.debug({ params }, "Getting account approvals");

    const response = await this.fetchApi<Account.AccountApprovals>("/account/approvals", {
      account: params.account,
      tokenType: params.tokenType,
      byTokenId: params.byTokenId,
    });
    return response.data;
  }

  async AccountTokens(params: Account.AccountTokensParams): Promise<Account.AccountTokens> {
    this.logger.debug({ params }, "Getting account tokens");

    const response = await this.fetchApi<Account.AccountTokens>("/account/tokens", {
      account: params.account,
      tokenType: params.tokenType,
    });
    return response.data;
  }

  async Tokeninfos(params: Account.TokeninfosParams): Promise<Account.Tokeninfos> {
    this.logger.debug({ params }, "Getting token tokeninfos");

    const response = await this.fetchApi<Account.Tokeninfos>("/token/tokeninfos", {
      contracts: params.contracts,
    });
    return response.data;
  }
}
