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

export interface CoreStatItem {
  statTime: string | number;
  [key: string]: string | number;
}

export interface TopStatsItem extends StatItem {
  address: string;
  gas?: string;
  value?: string | number;
  transferCntr?: string | number;
}

export interface CoreTopStatsResponse {
  gasTotal?: string;
  valueTotal?: string | number;
  maxTime?: string;
  total?: number;
  list: TopStatsItem[];
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
