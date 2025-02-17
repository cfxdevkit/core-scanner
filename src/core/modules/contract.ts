/**
 * @packageDocumentation
 * Contract module for interacting with smart contracts on Conflux eSpace.
 * Provides functionality for retrieving contract information, verification, and source code management.
 * @module core/modules/contract
 */

import { CoreApi } from "../api";
import { AddressValidator } from "../../utils";
import { createLogger } from "../../utils/logger";
import { ApiConfig, Contract } from "../../types";

/**
 * Module for handling smart contract operations on Conflux eSpace.
 * Provides methods for retrieving contract ABIs, source code, and managing contract verification.
 *
 * @class ContractModule
 * @extends {CoreApi}
 */
export class ContractModule extends CoreApi {
  /** Logger instance for contract operations */
  protected logger = createLogger("ContractModule");

  /**
   * Creates an instance of ContractModule.
   * @param {ApiConfig} config - Configuration object for the contract module
   */
  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Get ABI for a verified contract.
   * Retrieves the Application Binary Interface (ABI) for a verified smart contract.
   *
   * @param {Contract.ABIParams} params - Parameters for the ABI query
   * @param {string} params.address - Contract address to get ABI for
   * @returns {Promise<Contract.ABI>} The contract ABI
   * @throws {Error} If the address is invalid or contract is not verified
   */
  async getABI(params: Contract.ABIParams): Promise<Contract.ABI> {
    this.logger.debug({ params }, "Getting contract ABI");
    if (!AddressValidator.validateAddress(params.address)) {
      this.logger.error({ params }, "Invalid address provided for contract ABI");
      throw new Error(`Invalid address: ${params.address}`);
    }
    const response = await this.fetchApi<string>("/contract/getabi", { address: params.address });
    if (!response.data) {
      this.logger.error({ params }, "Contract ABI not available");
      throw new Error(`Contract ${params.address} not verified or ABI not available`);
    }
    this.logger.debug({ params }, "Successfully retrieved contract ABI");
    return JSON.parse(response.data);
  }

  /**
   * Get source code for a verified contract.
   * Retrieves the source code and related information for a verified smart contract.
   *
   * @param {Contract.SourceParams} params - Parameters for the source code query
   * @param {string} params.address - Contract address to get source code for
   * @returns {Promise<Contract.Source>} The contract source code and metadata
   * @throws {Error} If the address is invalid or contract is not verified
   */
  async getSourceCode(params: Contract.SourceParams): Promise<Contract.Source> {
    this.logger.debug({ params }, "Getting contract source code");
    if (!AddressValidator.validateAddress(params.address)) {
      this.logger.error({ params }, "Invalid address provided for contract source");
      throw new Error(`Invalid address: ${params.address}`);
    }
    const response = await this.fetchApi<Contract.Source[]>("/contract/getsourcecode", {
      address: params.address,
    });
    if (!response.data?.[0]) {
      this.logger.error({ params }, "Contract source code not available");
      throw new Error(`Contract ${params.address} not verified or source code not available`);
    }
    this.logger.debug({ params }, "Successfully retrieved contract source code");
    return response.data[0];
  }

  /**
   * Check source code verification submission status.
   * Retrieves the status of a contract verification submission.
   *
   * @param {Contract.checkVerifyStatusParams} params - Parameters for checking verification status
   * @param {string} params.guid - GUID of the verification submission
   * @returns {Promise<Contract.checkVerifyStatus>} The verification status
   * @throws {Error} If the GUID is not provided
   */
  async checkVerifyStatus(
    params: Contract.checkVerifyStatusParams
  ): Promise<Contract.checkVerifyStatus> {
    this.logger.debug({ params }, "Checking source code verification status");

    if (!params.guid) {
      this.logger.error({ params }, "GUID is required for checking verification status");
      throw new Error("GUID is required for checking verification status");
    }

    return (
      await this.fetchApi<Contract.checkVerifyStatus>("/contract/checkverifystatus", {
        guid: params.guid,
      })
    ).data;
  }

  /**
   * Verify a proxy contract.
   * Initiates the verification process for a proxy contract.
   *
   * @param {Contract.verifyProxyContractParams} params - Parameters for proxy contract verification
   * @param {string} params.address - Address of the proxy contract to verify
   * @param {string} [params.expectedimplementation] - Expected implementation contract address
   * @returns {Promise<Contract.verifyProxyContract>} The verification submission result
   * @throws {Error} If the addresses are invalid
   */
  async verifyProxyContract(
    params: Contract.verifyProxyContractParams
  ): Promise<Contract.verifyProxyContract> {
    this.logger.debug({ params }, "Verifying proxy contract");

    if (!AddressValidator.validateAddress(params.address)) {
      this.logger.error({ params }, "Invalid address provided for proxy contract verification");
      throw new Error(`Invalid address: ${params.address}`);
    }

    if (
      params.expectedimplementation &&
      !AddressValidator.validateAddress(params.expectedimplementation)
    ) {
      this.logger.error(
        { params },
        "Invalid implementation address provided for proxy contract verification"
      );
      throw new Error(`Invalid implementation address: ${params.expectedimplementation}`);
    }

    return (
      await this.fetchApi<Contract.verifyProxyContract>("/contract/verifyproxycontract", {
        address: params.address,
        ...(params.expectedimplementation && {
          expectedimplementation: params.expectedimplementation,
        }),
      })
    ).data;
  }

  /**
   * Check proxy contract verification submission status.
   * Retrieves the status of a proxy contract verification submission.
   *
   * @param {Contract.checkProxyVerificationParams} params - Parameters for checking proxy verification status
   * @param {string} params.guid - GUID of the proxy verification submission
   * @returns {Promise<Contract.checkProxyVerification>} The proxy verification status
   * @throws {Error} If the GUID is not provided
   */
  async checkProxyVerification(
    params: Contract.checkProxyVerificationParams
  ): Promise<Contract.checkProxyVerification> {
    this.logger.debug({ params }, "Checking proxy contract verification status");

    if (!params.guid) {
      this.logger.error({ params }, "GUID is required for checking proxy verification status");
      throw new Error("GUID is required for checking proxy verification status");
    }

    return (
      await this.fetchApi<Contract.checkProxyVerification>("/contract/checkproxyverification", {
        guid: params.guid,
      })
    ).data;
  }
}
