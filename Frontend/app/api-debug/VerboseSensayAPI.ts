import { SensayAPI } from "../../src/sensay-sdk";
import type { OpenAPIConfig } from "../../src/sensay-sdk/index";
import { VerboseHttpRequest } from "./VerboseHttpRequest";

/**
 * Enhanced SensayAPI with verbose logging
 */
export class VerboseSensayAPI extends SensayAPI {
  constructor(config?: Partial<OpenAPIConfig>) {
    // Use our custom VerboseHttpRequest instead of the default FetchHttpRequest
    super(config, VerboseHttpRequest);
    console.log("📊 Initialized VerboseSensayAPI with debug logging enabled");
  }
}
