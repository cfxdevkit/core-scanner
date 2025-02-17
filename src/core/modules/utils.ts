import { CoreApi } from "../api";
import { createLogger } from "../../utils/logger";
import { ApiConfig } from "../../types";
import { Utils } from "../../types";
export class UtilsModule extends CoreApi {
  protected logger = createLogger("UtilsModule");

  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Get block number by Unix timestamp
   */
  async decodeMethod(params: Utils.DecodeMethodParams): Promise<Utils.DecodeMethod> {
    this.logger.debug({ params }, "Decoding method");

    if (typeof params.hashes !== "string") {
      this.logger.error({ params }, "Invalid hashes provided");
      throw new Error(`Invalid hashes: ${params.hashes}`);
    }

    const response = await this.fetchApi<Utils.DecodeMethod>("/util/decode/method", {
      hashes: params.hashes,
    });
    return response.data;
  }

  async decodeMethodRaw(params: Utils.MethodRawParams): Promise<Utils.MethodRaw> {
    this.logger.debug({ params }, "Decoding method raw");

    if (typeof params.contracts !== "string") {
      this.logger.error({ params }, "Invalid contracts provided");
      throw new Error(`Invalid contracts: ${params.contracts}`);
    }

    if (typeof params.inputs !== "string") {
      this.logger.error({ params }, "Invalid inputs provided");
      throw new Error(`Invalid inputs: ${params.inputs}`);
    }

    const response = await this.fetchApi<Utils.MethodRaw>("/util/decode/method/raw", {
      contracts: params.contracts,
      inputs: params.inputs,
    });
    return response.data;
  }
}
