// Contract types
export interface ContractABIData {
  abi: string;
}

export interface ContractSourceData {
  sourceCode: string;
  abi: string;
  contractName: string;
  compiler: string;
  optimizationUsed: boolean;
  runs: number;
  constructorArguments: string;
  evmVersion: string;
  library: string;
  licenseType: string;
  proxy: string;
  implementation: string;
  swarmSource: string;
}

export type ContractABIResponse = ContractABIData;
export type ContractSourceResponse = ContractSourceData;

// Token types
export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  iconUrl?: string;
  price?: number;
  totalSupply?: string;
  transferCount?: number;
  holderCount?: number;
  type?: string;
  amount?: string;
  contract?: string;
  priceInUSDT?: string;
  quoteUrl?: string;
}

export interface TokenListResponse {
  list: TokenData[];
  total: number;
}

// Stats types
export interface StatItem {
  statTime: string | number;
  count: string | number;
  [key: string]: string | number | undefined;
}

export interface ContractStatItem extends StatItem {
  total: string | number;
}

export interface TransferStatItem {
  statTime: string | number;
  transferCount: string | number;
  userCount: string | number;
  amount: string | number;
}

export interface TpsStatItem {
  statTime: string | number;
  tps: string | number;
}

export interface TopGasItem {
  address: string;
  gas: string | number;
}

export interface TopValueItem {
  address: string;
  value: string | number;
}

/**
 * Represents a single item in top statistics responses
 */
export interface TopStatsItem {
  /** The address associated with the stats */
  address: string;
  /** Amount of gas used */
  gas?: string;
  /** Number of transactions/operations */
  count: string;
  /** Timestamp of the stats */
  statTime: string | number;
  /** Number of blocks */
  blockCntr?: string;
  /** Hash rate for mining stats */
  hashRate?: string;
  /** Total rewards earned */
  rewardSum?: string;
  /** Total transaction fees */
  txFeeSum?: string;
  /** Value in transactions */
  value?: string | number;
  /** Number of transfers */
  transferCntr?: string | number;
}

/**
 * Represents a single item in core statistics responses
 */
export interface CoreStatItem {
  /** Timestamp of the stat */
  statTime: string | number;
  /** Count/value of the stat */
  count: string | number;
  /** Optional timestamp field */
  timestamp?: string | number;
  /** Optional transactions per second */
  tps?: string | number;
}

/**
 * Response structure for top statistics endpoints
 */
export interface CoreTopStatsResponse {
  /** List of top stats items */
  list: TopStatsItem[];
  /** Total gas used */
  gasTotal?: string;
  /** Total value */
  valueTotal?: string | number;
  /** Maximum time */
  maxTime?: string;
  /** Total count */
  total: string | number;
}

export interface ESpaceStatsResponse {
  total: number;
  list: CoreStatItem[];
  intervalType?: string;
}

export interface ListResponse<T = StatItem> {
  list: T[];
  valueTotal?: string | number;
  gasTotal?: string;
}

export interface MinerItem {
  address: string;
  blockCntr: string | number;
  hashRate: string | number;
  rewardSum: string | number;
  txFeeSum: string | number;
}

export interface SupplyResponse {
  totalSupply: string;
  totalCirculating: string;
  totalStaking: string;
  totalCollateral: string;
  totalEspaceTokens: string;
  totalIssued: string;
  nullAddressBalance: string;
  twoYearUnlockBalance: string;
  fourYearUnlockBalance: string;
}
