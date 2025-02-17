/**
 * @packageDocumentation
 * NFT-related type definitions for the Conflux Core Scanner SDK.
 * Contains types for NFT balances, tokens, metadata, and transfers.
 * @module types/domains/nft
 */

import { PaginationParams, TimestampRangeParams, BlockRangeParams } from "../common";

/**
 * Parameters for fetching NFT balances
 *
 * @interface BalancesParams
 * @extends {PaginationParams}
 */
export interface BalancesParams extends PaginationParams {
  /** Owner address to get NFT balances for */
  owner: string;
}

/**
 * NFT balance information
 *
 * @interface NFTBalance
 */
export interface NFTBalance {
  /** Contract address of the NFT */
  contract?: string;
  /** Token balance amount */
  balance?: string;
  /** Name of the NFT collection */
  name?: string;
  /** Symbol of the NFT collection */
  symbol?: string;
  /** Token type (CRC721 or CRC1155) */
  type?: string;
  /** Project website URL */
  webSite?: string;
  /** Icon/logo URL */
  iconUrl?: string;
}

/**
 * NFT balances response
 *
 * @interface Balances
 */
export interface Balances {
  /** Total number of NFT balances */
  total?: number;
  /** List of NFT balances */
  list?: NFTBalance[];
}

/**
 * Parameters for fetching NFT tokens
 *
 * @interface TokensParams
 * @extends {PaginationParams}
 */
export interface TokensParams extends PaginationParams {
  /** NFT contract address */
  contract: string;
  /** Owner address to filter tokens by */
  owner?: string;
  /** Field to sort by (latest_update_time or mint_time) */
  sortField?: "latest_update_time" | "mint_time";
  /** Cursor for pagination */
  cursor?: string;
  /** Whether to include token metadata brief */
  withBrief?: string;
  /** Whether to include full token metadata */
  withMetadata?: string;
  /** Whether to suppress metadata parsing errors */
  suppressMetadataError?: string;
}

/**
 * NFT token metadata and information
 *
 * @interface NFTToken
 */
export interface NFTToken {
  /** Contract address */
  contract?: string;
  /** Token ID */
  tokenId?: string;
  /** Token name */
  name?: string;
  /** Token image URL */
  image?: string;
  /** Token description */
  description?: string;
  /** Raw token data */
  rawData?: {
    /** Contract function called */
    funcCall?: string;
    /** Token metadata URI */
    tokenUri?: string;
  };
  /** Error message if metadata fetch failed */
  error?: string;
}

/**
 * NFT tokens response
 *
 * @interface Tokens
 */
export interface Tokens {
  /** Total number of tokens */
  total?: number;
  /** Pagination cursor */
  next?: string;
  /** List of NFT tokens */
  list?: NFTToken[];
}

/**
 * Parameters for fetching NFT preview
 *
 * @interface PreviewParams
 */
export interface PreviewParams {
  /** NFT contract address */
  contract: string;
  /** Token ID */
  tokenId: string;
  /** Whether to include full metadata */
  withMetadata?: string;
}

/**
 * NFT preview information
 * Extends NFTToken with additional ownership details
 *
 * @interface Preview
 * @extends {NFTToken}
 */
export interface Preview extends NFTToken {
  /** Token type (CRC721 or CRC1155) */
  type?: string;
  /** Current token owner */
  owner?: string;
  /** Token creator/minter */
  creator?: string;
  /** Token mint timestamp */
  mintTimestamp?: number | string;
}

/**
 * Parameters for NFT full-text search
 *
 * @interface FtsParams
 */
export interface FtsParams {
  /** Name to search for in metadata */
  name: string;
  /** Contract address to limit search to */
  contract?: string;
}

/**
 * NFT full-text search response
 *
 * @interface Fts
 */
export interface Fts {
  /** Total number of matches */
  total?: number;
  /** List of matching NFTs */
  list?: Array<{
    /** Contract address */
    contract?: string;
    /** Token ID */
    tokenId?: string;
    /** Token name */
    name?: string;
  }>;
}

/**
 * Parameters for fetching NFT owners
 *
 * @interface OwnersParams
 * @extends {PaginationParams}
 */
export interface OwnersParams extends PaginationParams {
  /** NFT contract address */
  contract: string;
  /** Token ID to get owners for */
  tokenId?: string;
  /** Pagination cursor */
  cursor?: string;
}

/**
 * NFT owners response
 *
 * @interface Owners
 */
export interface Owners {
  /** Total number of owners */
  total?: number;
  /** Pagination cursor */
  next?: string;
  /** List of owners and their balances */
  list?: Array<{
    /** Owner address */
    address?: string;
    /** Token balance */
    amount?: string;
  }>;
}

/**
 * Parameters for fetching NFT transfers
 *
 * @interface TransfersParams
 * @extends {PaginationParams}
 * @extends {TimestampRangeParams}
 * @extends {BlockRangeParams}
 */
export interface TransfersParams extends PaginationParams, TimestampRangeParams, BlockRangeParams {
  /** NFT contract address */
  contract: string;
  /** Token ID to get transfers for */
  tokenId?: string;
  /** Pagination cursor */
  cursor?: string;
  /** Sender address to filter by */
  from?: string;
  /** Recipient address to filter by */
  to?: string;
}

/**
 * NFT transfer information
 *
 * @interface NFTTransfer
 */
export interface NFTTransfer {
  /** Block number */
  blockNumber?: number;
  /** Transaction hash */
  transactionHash?: string;
  /** Sender address */
  from?: string;
  /** Recipient address */
  to?: string;
  /** Token amount (relevant for CRC1155) */
  amount?: string;
  /** Token ID */
  tokenId?: string;
  /** Transfer timestamp */
  timestamp?: number | string;
}

/**
 * NFT transfers response
 *
 * @interface Transfers
 */
export interface Transfers {
  /** Total number of transfers */
  total?: number;
  /** Pagination cursor */
  next?: string;
  /** List of transfers */
  list?: NFTTransfer[];
  /** Additional address information */
  addressInfo?: {
    [key: string]: {
      /** Contract information */
      contract?: {
        /** Contract name */
        name?: string;
        /** Verification status */
        verify?: {
          /** Whether contract is verified */
          result?: number;
        };
      };
      /** Token information */
      token?: {
        /** Token name */
        name?: string;
        /** Token symbol */
        symbol?: string;
        /** Token decimals */
        decimals?: number;
        /** Project website */
        website?: string;
        /** Token icon URL */
        iconUrl?: string;
        /** Token type */
        tokenType?: string;
      };
    };
  };
}
