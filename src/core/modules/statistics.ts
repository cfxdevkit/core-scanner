/**
 * @packageDocumentation
 * Statistics module for retrieving network and blockchain statistics from Conflux eSpace.
 * Provides comprehensive functionality for querying various metrics, analytics, and statistics.
 * @module core/modules/statistics
 */

import { CoreApi } from "../api";
import { createLogger } from "../../utils/logger";
import { ApiConfig } from "../../types";
import { Statistics } from "../../types";

/**
 * Module for handling statistics and analytics operations on Conflux eSpace.
 * Provides methods for querying network metrics, account statistics, transaction data,
 * and various other blockchain analytics.
 *
 * @class StatisticsModule
 * @extends {CoreApi}
 */
export class StatisticsModule extends CoreApi {
  /** Logger instance for statistics operations */
  protected logger = createLogger("StatisticsModule");

  /**
   * Creates an instance of StatisticsModule.
   * @param {ApiConfig} config - Configuration object for the statistics module
   */
  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Get current network supply statistics.
   * Retrieves information about the current CFX token supply.
   *
   * @returns {Promise<Statistics.Supply>} Current supply statistics
   */
  async getSupply(): Promise<Statistics.Supply> {
    this.logger.debug("Getting supply");

    const response = await this.fetchApi<Statistics.Supply>("/statistics/supply");
    return response.data;
  }

  /**
   * Get mining statistics over time.
   * Retrieves mining-related metrics for specified time intervals.
   *
   * @param {Statistics.MiningParams} params - Parameters for mining statistics query
   * @param {string} [params.intervalType] - Time interval type for data aggregation
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.Mining>} Mining statistics
   */
  async getMining(params: Statistics.MiningParams): Promise<Statistics.Mining> {
    this.logger.debug("Getting mining");

    const response = await this.fetchApi<Statistics.Mining>("/statistics/mining", {
      intervalType: params.intervalType,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get transactions per second (TPS) statistics.
   * Retrieves TPS metrics for specified time intervals.
   *
   * @param {Statistics.TpsParams} params - Parameters for TPS statistics query
   * @param {string} [params.intervalType] - Time interval type for data aggregation
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.Tps>} TPS statistics
   */
  async getTps(params: Statistics.TpsParams): Promise<Statistics.Tps> {
    this.logger.debug("Getting tps");

    const response = await this.fetchApi<Statistics.Tps>("/statistics/tps", {
      intervalType: params.intervalType,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get contract deployment and interaction statistics.
   * Retrieves metrics about smart contract usage on the network.
   *
   * @param {Statistics.ContractParams} params - Parameters for contract statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.Contract>} Contract statistics
   */
  async getContract(params: Statistics.ContractParams): Promise<Statistics.Contract> {
    this.logger.debug("Getting contract");

    const response = await this.fetchApi<Statistics.Contract>("/statistics/contract", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get CFX token holder statistics.
   * Retrieves information about CFX token holders and distribution.
   *
   * @param {Statistics.CfxHolderParams} params - Parameters for CFX holder statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.CfxHolder>} CFX holder statistics
   */
  async getCfxHolder(params: Statistics.CfxHolderParams): Promise<Statistics.CfxHolder> {
    this.logger.debug("Getting cfx holder");

    const response = await this.fetchApi<Statistics.CfxHolder>("/statistics/account/cfx/holder", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get account growth statistics.
   * Retrieves metrics about new account creation and network growth.
   *
   * @param {Statistics.AccountGrowthParams} params - Parameters for account growth statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.AccountGrowth>} Account growth statistics
   */
  async getAccountGrowth(
    params: Statistics.AccountGrowthParams
  ): Promise<Statistics.AccountGrowth> {
    this.logger.debug("Getting account growth");

    const response = await this.fetchApi<Statistics.AccountGrowth>("/statistics/account/growth", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get active account statistics.
   * Retrieves metrics about account activity on the network.
   *
   * @param {Statistics.AccountActiveParams} params - Parameters for active account statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.AccountActive>} Active account statistics
   */
  async getAccountActive(
    params: Statistics.AccountActiveParams
  ): Promise<Statistics.AccountActive> {
    this.logger.debug("Getting active account");

    const response = await this.fetchApi<Statistics.AccountActive>("/statistics/account/active", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get overall active account statistics.
   * Retrieves comprehensive metrics about account activity across the network.
   *
   * @param {Statistics.ActiveOverallParams} params - Parameters for overall active account statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.ActiveOverall>} Overall active account statistics
   */
  async getAccountActiveOverall(
    params: Statistics.ActiveOverallParams
  ): Promise<Statistics.ActiveOverall> {
    this.logger.debug("Getting active account overall");

    const response = await this.fetchApi<Statistics.ActiveOverall>(
      "/statistics/account/active/overall",
      {
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }

  /**
   * Get transaction statistics.
   * Retrieves metrics about transaction activity on the network.
   *
   * @param {Statistics.TransactionParams} params - Parameters for transaction statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.Transaction>} Transaction statistics
   */
  async getTransaction(params: Statistics.TransactionParams): Promise<Statistics.Transaction> {
    this.logger.debug("Getting transaction");

    const response = await this.fetchApi<Statistics.Transaction>("/statistics/transaction", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get CFX transfer statistics.
   * Retrieves metrics about CFX token transfers on the network.
   *
   * @param {Statistics.CfxTransferParams} params - Parameters for CFX transfer statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.CfxTransfer>} CFX transfer statistics
   */
  async getCfxTransfer(params: Statistics.CfxTransferParams): Promise<Statistics.CfxTransfer> {
    this.logger.debug("Getting cfx transfer");

    const response = await this.fetchApi<Statistics.CfxTransfer>("/statistics/cfx/transfer", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get token transfer statistics.
   * Retrieves metrics about token transfers (excluding CFX) on the network.
   *
   * @param {Statistics.TokenTransferParams} params - Parameters for token transfer statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.TokenTransfer>} Token transfer statistics
   */
  async getTokenTransfer(
    params: Statistics.TokenTransferParams
  ): Promise<Statistics.TokenTransfer> {
    this.logger.debug("Getting token transfer");

    const response = await this.fetchApi<Statistics.TokenTransfer>("/statistics/token/transfer", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get top gas users statistics.
   * Retrieves statistics about accounts with highest gas consumption.
   *
   * @param {Statistics.TopGasUsedParams} params - Parameters for top gas users query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopGasUsed>} Top gas users statistics
   */
  async getTopGasUsed(params: Statistics.TopGasUsedParams): Promise<Statistics.TopGasUsed> {
    this.logger.debug("Getting top gas used");

    const response = await this.fetchApi<Statistics.TopGasUsed>("/statistics/top/gas/used", {
      spanType: params.spanType,
    });
    return response.data;
  }

  /**
   * Get top miners statistics.
   * Retrieves statistics about the most active miners on the network.
   *
   * @param {Statistics.TopMinerParams} params - Parameters for top miners query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopMiner>} Top miners statistics
   */
  async getTopMiner(params: Statistics.TopMinerParams): Promise<Statistics.TopMiner> {
    this.logger.debug("Getting top miner");

    const response = await this.fetchApi<Statistics.TopMiner>("/statistics/top/miner", {
      spanType: params.spanType,
    });
    return response.data;
  }

  /**
   * Get top transaction senders statistics.
   * Retrieves statistics about accounts that send the most transactions.
   *
   * @param {Statistics.TopTransactionSenderParams} params - Parameters for top senders query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopTransactionSender>} Top transaction senders statistics
   */
  async getTopTransactionSender(
    params: Statistics.TopTransactionSenderParams
  ): Promise<Statistics.TopTransactionSender> {
    this.logger.debug("Getting top transaction sender");

    const response = await this.fetchApi<Statistics.TopTransactionSender>(
      "/statistics/top/transaction/sender",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get top transaction receivers statistics.
   * Retrieves statistics about accounts that receive the most transactions.
   *
   * @param {Statistics.TopTransactionReceiverParams} params - Parameters for top receivers query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopTransactionReceiver>} Top transaction receivers statistics
   */
  async getTopTransactionReceiver(
    params: Statistics.TopTransactionReceiverParams
  ): Promise<Statistics.TopTransactionReceiver> {
    this.logger.debug("Getting top transaction receiver");

    const response = await this.fetchApi<Statistics.TopTransactionReceiver>(
      "/statistics/top/transaction/receiver",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get top CFX senders statistics.
   * Retrieves statistics about accounts that send the most CFX tokens.
   *
   * @param {Statistics.TopCfxSenderParams} params - Parameters for top CFX senders query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopCfxSender>} Top CFX senders statistics
   */
  async getTopCfxSender(params: Statistics.TopCfxSenderParams): Promise<Statistics.TopCfxSender> {
    this.logger.debug("Getting top cfx sender");

    const response = await this.fetchApi<Statistics.TopCfxSender>("/statistics/top/cfx/sender", {
      spanType: params.spanType,
    });
    return response.data;
  }

  /**
   * Get top CFX receivers statistics.
   * Retrieves statistics about accounts that receive the most CFX tokens.
   *
   * @param {Statistics.TopCfxReceiverParams} params - Parameters for top CFX receivers query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopCfxReceiver>} Top CFX receivers statistics
   */
  async getTopCfxReceiver(
    params: Statistics.TopCfxReceiverParams
  ): Promise<Statistics.TopCfxReceiver> {
    this.logger.debug("Getting top cfx receiver");

    const response = await this.fetchApi<Statistics.TopCfxReceiver>(
      "/statistics/top/cfx/receiver",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get top token transfer statistics.
   * Retrieves statistics about the most frequently transferred tokens.
   *
   * @param {Statistics.TopTokenTransferParams} params - Parameters for top token transfers query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopTokenTransfer>} Top token transfer statistics
   */
  async getTopTokenTransfer(
    params: Statistics.TopTokenTransferParams
  ): Promise<Statistics.TopTokenTransfer> {
    this.logger.debug("Getting top token transfer");

    const response = await this.fetchApi<Statistics.TopTokenTransfer>(
      "/statistics/top/token/transfer",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get top token receivers statistics.
   * Retrieves statistics about accounts that receive the most tokens.
   *
   * @param {Statistics.TopTokenReceiverParams} params - Parameters for top token receivers query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopTokenReceiver>} Top token receivers statistics
   */
  async getTopTokenReceiver(
    params: Statistics.TopTokenReceiverParams
  ): Promise<Statistics.TopTokenReceiver> {
    this.logger.debug("Getting top token receiver");

    const response = await this.fetchApi<Statistics.TopTokenReceiver>(
      "/statistics/top/token/receiver",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get top token participant statistics.
   * Retrieves statistics about the most active participants in token transfers.
   *
   * @param {Statistics.TopTokenParticipantParams} params - Parameters for top token participants query
   * @param {string} params.spanType - Time span type for the statistics
   * @returns {Promise<Statistics.TopTokenParticipant>} Top token participant statistics
   */
  async getTopTokenParticipant(
    params: Statistics.TopTokenParticipantParams
  ): Promise<Statistics.TopTokenParticipant> {
    this.logger.debug("Getting top token participant");

    const response = await this.fetchApi<Statistics.TopTokenParticipant>(
      "/statistics/top/token/participant",
      {
        spanType: params.spanType,
      }
    );
    return response.data;
  }

  /**
   * Get token holder statistics.
   * Retrieves statistics about token holders and distribution.
   *
   * @param {Statistics.TokenHolderParams} params - Parameters for token holder statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.TokenHolder>} Token holder statistics
   */
  async getTokenHolder(params: Statistics.TokenHolderParams): Promise<Statistics.TokenHolder> {
    this.logger.debug("Getting token holder");

    const response = await this.fetchApi<Statistics.TokenHolder>("/statistics/token/holder", {
      contract: params.contract,
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get unique sender statistics.
   * Retrieves statistics about unique transaction senders.
   *
   * @param {Statistics.UniqueSenderParams} params - Parameters for unique senders query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.UniqueSender>} Unique sender statistics
   */
  async getUniqueSender(params: Statistics.UniqueSenderParams): Promise<Statistics.UniqueSender> {
    this.logger.debug("Getting unique sender");

    const response = await this.fetchApi<Statistics.UniqueSender>(
      "/statistics/token/unique/sender",
      {
        contract: params.contract,
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }

  /**
   * Get unique receiver statistics.
   * Retrieves statistics about unique transaction receivers.
   *
   * @param {Statistics.UniqueReceiverParams} params - Parameters for unique receivers query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.UniqueReceiver>} Unique receiver statistics
   */
  async getUniqueReceiver(
    params: Statistics.UniqueReceiverParams
  ): Promise<Statistics.UniqueReceiver> {
    this.logger.debug("Getting unique receiver");

    const response = await this.fetchApi<Statistics.UniqueReceiver>(
      "/statistics/token/unique/receiver",
      {
        contract: params.contract,
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }

  /**
   * Get unique participant statistics.
   * Retrieves statistics about unique participants in transactions.
   *
   * @param {Statistics.UniqueParticipantParams} params - Parameters for unique participants query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.UniqueParticipant>} Unique participant statistics
   */
  async getUniqueParticipant(
    params: Statistics.UniqueParticipantParams
  ): Promise<Statistics.UniqueParticipant> {
    this.logger.debug("Getting unique participant");

    const response = await this.fetchApi<Statistics.UniqueParticipant>(
      "/statistics/token/unique/participant",
      {
        contract: params.contract,
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }

  /**
   * Get block base fee statistics.
   * Retrieves statistics about block base fees over time.
   *
   * @param {Statistics.BlockBasefeeParams} params - Parameters for block base fee statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.BlockBasefee>} Block base fee statistics
   */
  async getBlockBasefee(params: Statistics.BlockBasefeeParams): Promise<Statistics.BlockBasefee> {
    this.logger.debug("Getting block basefee");

    const response = await this.fetchApi<Statistics.BlockBasefee>("/statistics/block/base-fee", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get block average priority fee statistics.
   * Retrieves statistics about average priority fees in blocks.
   *
   * @param {Statistics.BlockAvgpriorityfeeParams} params - Parameters for block priority fee statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.BlockAvgpriorityfee>} Block average priority fee statistics
   */
  async getBlockAvgpriorityfee(
    params: Statistics.BlockAvgpriorityfeeParams
  ): Promise<Statistics.BlockAvgpriorityfee> {
    this.logger.debug("Getting block avgpriorityfee");

    const response = await this.fetchApi<Statistics.BlockAvgpriorityfee>(
      "/statistics/block/avg-priority-fee",
      {
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }

  /**
   * Get block gas used statistics.
   * Retrieves statistics about gas usage in blocks.
   *
   * @param {Statistics.BlockGasusedParams} params - Parameters for block gas usage statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.BlockGasused>} Block gas usage statistics
   */
  async getBlockGasused(params: Statistics.BlockGasusedParams): Promise<Statistics.BlockGasused> {
    this.logger.debug("Getting block gasused");

    const response = await this.fetchApi<Statistics.BlockGasused>("/statistics/block/gas-used", {
      minTimestamp: params.minTimestamp,
      maxTimestamp: params.maxTimestamp,
      sort: params.sort,
      skip: params.skip,
      limit: params.limit,
    });
    return response.data;
  }

  /**
   * Get block transactions by type statistics.
   * Retrieves statistics about different types of transactions in blocks.
   *
   * @param {Statistics.BlockTxsbytypeParams} params - Parameters for block transaction types statistics query
   * @param {number} [params.minTimestamp] - Start timestamp for the query range
   * @param {number} [params.maxTimestamp] - End timestamp for the query range
   * @param {string} [params.sort] - Sort direction ('asc' or 'desc')
   * @param {number} [params.skip] - Number of results to skip
   * @param {number} [params.limit] - Maximum number of results to return
   * @returns {Promise<Statistics.BlockTxsbytype>} Block transactions by type statistics
   */
  async getBlockTxsbytype(
    params: Statistics.BlockTxsbytypeParams
  ): Promise<Statistics.BlockTxsbytype> {
    this.logger.debug("Getting block txsbytype");

    const response = await this.fetchApi<Statistics.BlockTxsbytype>(
      "/statistics/block/txs-by-type",
      {
        minTimestamp: params.minTimestamp,
        maxTimestamp: params.maxTimestamp,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit,
      }
    );
    return response.data;
  }
}
