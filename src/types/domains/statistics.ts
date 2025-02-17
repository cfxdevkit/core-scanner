/**
 * @packageDocumentation
 * Statistics-related type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for network statistics, token metrics, and account activity.
 * @module types/domains/statistics
 */

import { PaginationParams, TimestampRangeParams, StatsIntervalType, StatsPeriod } from "../common";

/**
 * Network supply information
 * Contains various token supply metrics
 *
 * @interface Supply
 */
export interface Supply {
  /** Total issued balance in Drip */
  totalIssued: string;
  /** Total circulating balance in Drip */
  totalCirculating: string;
  /** Total staking balance in Drip */
  totalStaking: string;
  /** Total collateral balance in Drip */
  totalCollateral: string;
  /** Zero address's balance in Drip */
  nullAddressBalance: string;
  /** Two year unlock address's balance in Drip */
  twoYearUnlockBalance: string;
  /** Four year unlock address's balance in Drip */
  fourYearUnlockBalance: string;
}

/**
 * Parameters for mining statistics
 *
 * @interface MiningParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface MiningParams extends PaginationParams, TimestampRangeParams {
  /** Interval for data aggregation */
  intervalType?: StatsIntervalType;
}

/**
 * Mining statistics information
 *
 * @interface Mining
 */
export interface Mining {
  /** Total number of records */
  total?: number;
  /** List of mining statistics */
  list?: Array<{
    /** Average block time in seconds */
    blockTime?: string;
    /** Network hash rate */
    hashRate?: string;
    /** Mining difficulty */
    difficulty?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for TPS (Transactions Per Second) statistics
 *
 * @interface TpsParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface TpsParams extends PaginationParams, TimestampRangeParams {
  /** Interval for data aggregation */
  intervalType?: StatsIntervalType;
}

/**
 * TPS statistics information
 *
 * @interface Tps
 */
export interface Tps {
  /** Total number of records */
  total?: number | string;
  /** List of TPS statistics */
  list?: Array<{
    /** Transactions per second */
    tps?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for contract statistics
 *
 * @interface ContractParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface ContractParams extends PaginationParams, TimestampRangeParams {}

/**
 * Contract deployment statistics
 *
 * @interface Contract
 */
export interface Contract {
  /** Total number of records */
  total?: number | string;
  /** List of contract statistics */
  list?: Array<{
    /** Daily deployed contracts count */
    count?: string;
    /** Total deployed contracts count */
    total?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for CFX holder statistics
 *
 * @interface CfxHolderParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface CfxHolderParams extends PaginationParams, TimestampRangeParams {}

/**
 * CFX holder statistics
 *
 * @interface CfxHolder
 */
export interface CfxHolder {
  /** Total number of records */
  total?: number | string;
  /** List of holder statistics */
  list?: Array<{
    /** Daily CFX holders count */
    count?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for account growth statistics
 *
 * @interface AccountGrowthParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface AccountGrowthParams extends PaginationParams, TimestampRangeParams {}

/**
 * Account growth statistics
 *
 * @interface AccountGrowth
 */
export interface AccountGrowth {
  /** Total number of records */
  total?: number | string;
  /** List of account growth statistics */
  list?: Array<{
    /** Daily new accounts count */
    count?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for account activity statistics
 *
 * @interface AccountActiveParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface AccountActiveParams extends PaginationParams, TimestampRangeParams {}

/**
 * Account activity statistics
 *
 * @interface AccountActive
 */
export interface AccountActive {
  /** Total number of records */
  total?: number | string;
  /** List of account activity statistics */
  list?: Array<{
    /** Daily active accounts count */
    count?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for overall account activity statistics
 *
 * @interface ActiveOverallParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface ActiveOverallParams extends PaginationParams, TimestampRangeParams {}

/**
 * Overall account activity statistics
 *
 * @interface ActiveOverall
 */
export interface ActiveOverall {
  /** Total number of records */
  total?: number | string;
  /** List of overall activity statistics */
  list?: Array<{
    /** Daily active accounts count */
    count?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for transaction statistics
 *
 * @interface TransactionParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface TransactionParams extends PaginationParams, TimestampRangeParams {}

/**
 * Transaction statistics
 *
 * @interface Transaction
 */
export interface Transaction {
  /** Total number of records */
  total?: number | string;
  /** List of transaction statistics */
  list?: Array<{
    /** Daily transaction count */
    count?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for CFX transfer statistics
 *
 * @interface CfxTransferParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface CfxTransferParams extends PaginationParams, TimestampRangeParams {}

/**
 * CFX transfer statistics
 *
 * @interface CfxTransfer
 */
export interface CfxTransfer {
  /** Total number of records */
  total?: number | string;
  /** List of transfer statistics */
  list?: Array<{
    /** Daily CFX transfer count */
    transferCount?: string;
    /** Daily unique users count */
    userCount?: string;
    /** Daily total CFX amount transferred */
    amount?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for token transfer statistics
 *
 * @interface TokenTransferParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface TokenTransferParams extends PaginationParams, TimestampRangeParams {
  /** Token contract address */
  contract?: string;
}

/**
 * Token transfer statistics
 *
 * @interface TokenTransfer
 */
export interface TokenTransfer {
  /** Total number of records */
  total?: number | string;
  /** List of token transfer statistics */
  list?: Array<{
    /** Daily token transfer count */
    transferCount?: string;
    /** Daily unique users count */
    userCount?: string;
    /** Statistics timestamp (UTC) */
    statTime?: string;
  }>;
}

/**
 * Parameters for top gas used statistics
 *
 * @interface TopGasUsedParams
 */
export interface TopGasUsedParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top gas used statistics
 *
 * @interface TopGasUsed
 */
export interface TopGasUsed {
  /** Total gas used */
  gasTotal?: string;
  /** List of top gas users */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Gas used amount */
    gas?: string;
  }>;
}

/**
 * Parameters for top miner statistics
 *
 * @interface TopMinerParams
 */
export interface TopMinerParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top miner statistics
 *
 * @interface TopMiner
 */
export interface TopMiner {
  /** Minimum timestamp in range */
  minTime?: string;
  /** Maximum timestamp in range */
  maxTime?: string;
  /** Total difficulty in range */
  difficultyTotal?: string;
  /** List of top miners */
  list?: Array<{
    /** Miner address */
    address?: string;
    /** Blocks mined count */
    blockCntr?: string;
    /** Total mining rewards */
    rewardSum?: string;
    /** Total transaction fees */
    txFeeSum?: string;
    /** Hash rate */
    hashRate?: string;
  }>;
}

/**
 * Parameters for top transaction sender statistics
 *
 * @interface TopTransactionSenderParams
 */
export interface TopTransactionSenderParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top transaction sender statistics
 *
 * @interface TopTransactionSender
 */
export interface TopTransactionSender {
  /** Minimum timestamp in range */
  minTime?: string;
  /** Maximum timestamp in range */
  maxTime?: string;
  /** Total value in range */
  valueTotal?: string;
  /** List of top senders */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Transaction count */
    value?: string;
  }>;
}

/**
 * Parameters for top transaction receiver statistics
 *
 * @interface TopTransactionReceiverParams
 */
export interface TopTransactionReceiverParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top transaction receiver statistics
 *
 * @interface TopTransactionReceiver
 */
export interface TopTransactionReceiver {
  /** Minimum timestamp in range */
  minTime?: string;
  /** Maximum timestamp in range */
  maxTime?: string;
  /** Total value in range */
  valueTotal?: string;
  /** List of top receivers */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Transaction count */
    value?: string;
  }>;
}

/**
 * Parameters for top CFX sender statistics
 *
 * @interface TopCfxSenderParams
 */
export interface TopCfxSenderParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top CFX sender statistics
 *
 * @interface TopCfxSender
 */
export interface TopCfxSender {
  /** Minimum timestamp in range */
  minTime?: string;
  /** Maximum timestamp in range */
  maxTime?: string;
  /** Total value in range */
  valueTotal?: string;
  /** List of top senders */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Total CFX sent */
    value?: string;
  }>;
}

/**
 * Parameters for top CFX receiver statistics
 *
 * @interface TopCfxReceiverParams
 */
export interface TopCfxReceiverParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top CFX receiver statistics
 *
 * @interface TopCfxReceiver
 */
export interface TopCfxReceiver {
  /** Minimum timestamp in range */
  minTime?: string;
  /** Maximum timestamp in range */
  maxTime?: string;
  /** Total value in range */
  valueTotal?: string;
  /** List of top receivers */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Total CFX received */
    value?: string;
  }>;
}

/**
 * Parameters for top token transfer statistics
 *
 * @interface TopTokenTransferParams
 */
export interface TopTokenTransferParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top token transfer statistics
 *
 * @interface TopTokenTransfer
 */
export interface TopTokenTransfer {
  /** List of top transferred tokens */
  list?: Array<{
    /** Token contract address */
    address?: string;
    /** Transfer count */
    transferCntr?: string;
  }>;
}

/**
 * Parameters for top token sender statistics
 *
 * @interface TopTokenSenderParams
 */
export interface TopTokenSenderParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top token sender statistics
 *
 * @interface TopTokenSender
 */
export interface TopTokenSender {
  /** List of top token senders */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Send count */
    value?: string;
  }>;
}

/**
 * Parameters for top token receiver statistics
 *
 * @interface TopTokenReceiverParams
 */
export interface TopTokenReceiverParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top token receiver statistics
 *
 * @interface TopTokenReceiver
 */
export interface TopTokenReceiver {
  /** Maximum timestamp in range */
  maxTime?: string;
  /** List of top token receivers */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Receive count */
    transferCntr?: string;
  }>;
}

/**
 * Parameters for top token participant statistics
 *
 * @interface TopTokenParticipantParams
 */
export interface TopTokenParticipantParams {
  /** Time span for ranking calculation */
  spanType?: StatsPeriod;
}

/**
 * Top token participant statistics
 *
 * @interface TopTokenParticipant
 */
export interface TopTokenParticipant {
  /** Maximum timestamp in range */
  maxTime?: string;
  /** List of top token participants */
  list?: Array<{
    /** Account address */
    address?: string;
    /** Participation count */
    transferCntr?: string;
  }>;
}

/**
 * Parameters for token holder statistics
 *
 * @interface TokenHolderParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface TokenHolderParams extends PaginationParams, TimestampRangeParams {
  /** Token contract address */
  contract: string;
}

/**
 * Token holder statistics
 *
 * @interface TokenHolder
 */
export interface TokenHolder {
  /** Total number of records */
  total?: number | string;
  /** List of holder statistics */
  list?: Array<{
    /** Statistics timestamp (UTC) */
    statTime?: string;
    /** Daily holder count */
    holderCount?: string;
  }>;
}

/**
 * Parameters for unique token sender statistics
 *
 * @interface UniqueSenderParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface UniqueSenderParams extends PaginationParams, TimestampRangeParams {
  /** Token contract address */
  contract: string;
}

/**
 * Unique token sender statistics
 *
 * @interface UniqueSender
 */
export interface UniqueSender {
  /** Total number of records */
  total?: number | string;
  /** List of sender statistics */
  list?: Array<{
    /** Statistics timestamp (UTC) */
    statTime?: string;
    /** Daily unique sender count */
    uniqueSenderCount?: string;
  }>;
}

/**
 * Parameters for unique token receiver statistics
 *
 * @interface UniqueReceiverParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface UniqueReceiverParams extends PaginationParams, TimestampRangeParams {
  /** Token contract address */
  contract: string;
}

/**
 * Unique token receiver statistics
 *
 * @interface UniqueReceiver
 */
export interface UniqueReceiver {
  /** Total number of records */
  total?: number | string;
  /** List of receiver statistics */
  list?: Array<{
    /** Statistics timestamp (UTC) */
    statTime?: string;
    /** Daily unique receiver count */
    uniqueReceiverCount?: string;
  }>;
}

/**
 * Parameters for unique token participant statistics
 *
 * @interface UniqueParticipantParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface UniqueParticipantParams extends PaginationParams, TimestampRangeParams {
  /** Token contract address */
  contract: string;
}

/**
 * Unique token participant statistics
 *
 * @interface UniqueParticipant
 */
export interface UniqueParticipant {
  /** Total number of records */
  total?: number | string;
  /** List of participant statistics */
  list?: Array<{
    /** Statistics timestamp (UTC) */
    statTime?: string;
    /** Daily unique participant count */
    uniqueParticipantCount?: string;
  }>;
}

/**
 * Parameters for block base fee statistics
 *
 * @interface BlockBasefeeParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface BlockBasefeeParams extends PaginationParams, TimestampRangeParams {}

/**
 * Block base fee statistics
 *
 * @interface BlockBasefee
 */
export interface BlockBasefee {
  /** Total number of records */
  total?: number | string;
  /** List of base fee statistics */
  list?: Array<{
    /** Base fee per gas */
    baseFee?: string;
    /** Block number */
    blockNumber?: number;
    /** Block timestamp (UTC) */
    timestamp?: number | string;
  }>;
}

/**
 * Parameters for block average priority fee statistics
 *
 * @interface BlockAvgpriorityfeeParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface BlockAvgpriorityfeeParams extends PaginationParams, TimestampRangeParams {}

/**
 * Block average priority fee statistics
 *
 * @interface BlockAvgpriorityfee
 */
export interface BlockAvgpriorityfee {
  /** Total number of records */
  total?: number | string;
  /** List of priority fee statistics */
  list?: Array<{
    /** Average priority fee per gas */
    avgPriorityFee?: string;
    /** Block number */
    blockNumber?: number;
    /** Block timestamp (UTC) */
    timestamp?: number | string;
  }>;
}

/**
 * Parameters for block gas used statistics
 *
 * @interface BlockGasusedParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface BlockGasusedParams extends PaginationParams, TimestampRangeParams {}

/**
 * Block gas used statistics
 *
 * @interface BlockGasused
 */
export interface BlockGasused {
  /** Total number of records */
  total?: number | string;
  /** List of gas used statistics */
  list?: Array<{
    /** Gas used amount */
    gasUsed?: string;
    /** Block number */
    blockNumber?: number;
    /** Block timestamp (UTC) */
    timestamp?: number | string;
  }>;
}

/**
 * Parameters for block transactions by type statistics
 *
 * @interface BlockTxsbytypeParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 */
export interface BlockTxsbytypeParams extends PaginationParams, TimestampRangeParams {}

/**
 * Block transactions by type statistics
 *
 * @interface BlockTxsbytype
 */
export interface BlockTxsbytype {
  /** Total number of records */
  total?: number | string;
  /** List of transaction type statistics */
  list?: Array<{
    /** Transaction counts by type */
    txsByType?: {
      /** Legacy transaction count */
      legacy?: number;
      /** CIP2930 transaction count */
      cip2930?: number;
      /** CIP1559 transaction count */
      cip1559?: number;
    };
    /** Block number */
    blockNumber?: number;
    /** Block timestamp (UTC) */
    timestamp?: number | string;
  }>;
}
