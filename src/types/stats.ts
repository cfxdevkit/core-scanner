export interface ESpaceStatItem {
  statTime: string;
  count?: number;
  holderCount?: number;
  uniqueSenderCount?: number;
  uniqueReceiverCount?: number;
  uniqueParticipantCount?: number;
  blockNumber?: number;
  timestamp?: number;
  baseFee?: string;
  gasUsed?: string;
}

export interface ESpaceTopStatsResponse {
  gasTotal?: string;
  valueTotal?: string;
  maxTime?: string;
  total?: number;
  list: Array<{
    address: string;
    gas?: string;
    value?: string | number;
    transferCntr?: string | number;
  }>;
}

export interface StatsParams {
  minTimestamp?: number;
  maxTimestamp?: number;
  sort?: "ASC" | "DESC";
  skip?: number;
  limit?: number;
  intervalType?: "hour" | "day" | "week" | "month";
}

export interface ESpaceStatsParams extends StatsParams {
  contract?: string;
}

export type StatsPeriod = "24h" | "1w" | "1m" | "3m" | "6m" | "1y";
