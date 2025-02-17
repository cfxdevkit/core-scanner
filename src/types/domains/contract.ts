/**
 * @packageDocumentation
 * Contract-related type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for contract source code, ABI, and verification.
 * @module types/domains/contract
 */

/**
 * Parameters for getting contract source code
 *
 * @interface SourceParams
 */
export interface SourceParams {
  /** Contract address to get source code for */
  address: string;
}

/**
 * Contract source code and metadata information
 *
 * @interface Source
 */
export interface Source {
  /** Contract source code */
  SourceCode: string;
  /** Contract ABI in JSON format */
  ABI: string;
  /** Name of the contract */
  ContractName: string;
  /** Solidity compiler version used */
  CompilerVersion: string;
  /** Whether optimization was enabled (1 for yes, 0 for no) */
  OptimizationUsed: string;
  /** Number of optimization runs if optimization was enabled */
  Runs: string;
  /** Constructor arguments used in deployment */
  ConstructorArguments: string;
  /** EVM version used for compilation */
  EVMVersion: string;
  /** Library addresses used by the contract */
  Library: string;
  /** License type of the contract */
  LicenseType: string;
  /** Whether the contract is a proxy (1 for yes, 0 for no) */
  Proxy: string;
  /** Implementation contract address if this is a proxy */
  Implementation: string;
  /** IPFS/Swarm source hash */
  SwarmSource: string;
}

/**
 * Parameters for getting contract ABI
 *
 * @interface ABIParams
 */
export interface ABIParams {
  /** Contract address to get ABI for */
  address: string;
}

/**
 * Contract ABI
 * Represents the contract's interface in JSON format
 *
 * @typedef {object} ABI
 */
export type ABI = object;

/**
 * Parameters for checking contract verification status
 *
 * @interface checkVerifyStatusParams
 */
export interface checkVerifyStatusParams {
  /** Verification GUID returned from verification request */
  guid: string;
}

/**
 * Contract verification status response
 * Returns the same format as Source if verification is complete
 *
 * @typedef {Source} checkVerifyStatus
 */
export type checkVerifyStatus = Source;

/**
 * Parameters for verifying proxy contract
 *
 * @interface verifyProxyContractParams
 */
export interface verifyProxyContractParams {
  /** Proxy contract address to verify */
  address: string;
  /** Expected implementation contract address */
  expectedimplementation?: string;
}

/**
 * Proxy contract verification response
 * Returns a string indicating verification status
 *
 * @typedef {string} verifyProxyContract
 */
export type verifyProxyContract = string;

/**
 * Parameters for checking proxy verification status
 * Uses same parameters as regular verification status check
 *
 * @typedef {checkVerifyStatusParams} checkProxyVerificationParams
 */
export type checkProxyVerificationParams = checkVerifyStatusParams;

/**
 * Proxy verification status response
 * Returns a string indicating verification status
 *
 * @typedef {string} checkProxyVerification
 */
export type checkProxyVerification = string;
