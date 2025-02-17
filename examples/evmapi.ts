import { OpenAPIV3 } from "openapi-types";

export const evmApi: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Conflux Scan Open Api",
    description:
      "Use any http client to fetch data from the ConfluxScan mainnet or testnet.<br/>\n<h3>Endpoints:</h3>\n<table>\n<tr>\n<td>API Host</td><td>Net</td><td>Mode</td><td>Scan</td>\n</tr>\n<tr>\n<td><a href='https://api.confluxscan.net/doc'>https://api.confluxscan.net</a></td><td>Mainnet Core</td><td>Production</td>\n<td><a target='_blank' href='https://confluxscan.net'>https://confluxscan.net</a></td>\n</tr>\n<tr>\n<td><a href='https://evmapi.confluxscan.net/doc'>https://evmapi.confluxscan.net</a></td><td>Mainnet eSpace</td><td>Production</td>\n<td><a target='_blank' href='https://evm.confluxscan.net'>https://evm.confluxscan.net</a></td>\n</tr>\n<tr>\n<td><a href='https://api-testnet.confluxscan.net/doc'>https://api-testnet.confluxscan.net</a></td><td>Testnet Core</td><td>Production</td>\n<td><a target='_blank' href='https://testnet.confluxscan.net'>https://testnet.confluxscan.net</a></td>\n</tr>\n<tr>\n<td><a href='https://evmapi-testnet.confluxscan.net/doc'>https://evmapi-testnet.confluxscan.net</a></td><td>Testnet eSpace</td><td>Production</td>\n<td><a target='_blank' href='https://evmtestnet.confluxscan.net'>https://evmtestnet.confluxscan.net</a></td>\n</tr>\n</table>\n\n<h3>Notes:</h3>\n<li>Timestamp is in seconds format.</li>\n<li>Maximum 'skip' is 10,000 when paging.</li>\n<li>Maximum 'limit' is 100 when paging.</li>\n<li>The block list, transaction list, CFX transfer list and token transfer list  querying by account dimension can only be viewed the last 20,000 records due to data prune.</li>\n\n<h3>Rate Limit:</h3>\nReference for various API tiers and their rate limits\n<table>\n<tr>\n<td>API Tier</td>\n<td>Price</td>\n<td>Rate Limit</td>\n</tr>\n<tr>\n<td>Free</td>\n<td>$0</td>\n<td>5 calls/second, up to 100,000 calls/day</td>\n</tr>\n<tr>\n<td>Standard</td>\n<td>$150/mo</td>\n<td>20 calls/second, up to 500,000 calls/day</td>\n</tr>\n<tr>\n<td>Enterprise</td>\n<td>For details, please email bd@confluxnetwork.org</td>\n<td>Customize according to demand</td>\n</tr>\n</table>\n\n<h3>SDK:</h3>\n<table>\n<tr>\n<td>Space</td>\n<td>Link</td>\n</tr>\n<tr>\n<td>Core</td>\n<td><a target='_blank' href='https://www.npmjs.com/package/@conflux-lib/openapi-sdk-core'>openapi-sdk-core</a></td>\n</tr>\n<tr>\n<td>EVM</td>\n<td><a target='_blank' href='https://www.npmjs.com/package/@conflux-lib/openapi-sdk-evm'>openapi-sdk-evm</a></td>\n</tr>\n</table>\n",
    version: "0.0.1",
  },
  servers: [
    {
      url: "",
      description: "This server",
    },
  ],
  paths: {
    "/api?module=account&action=balance": {
      get: {
        tags: ["Accounts"],
        description: "Get CFX Balance for a Single Address",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/tag",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=balancemulti": {
      get: {
        tags: ["Accounts"],
        description: "Get CFX Balance for Multiple Addresses in a Single Call",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/tag",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BalanceMulti",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=txlist": {
      get: {
        tags: ["Accounts"],
        description: "Get a list of 'Normal' Transactions By Address",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/startblock",
          },
          {
            $ref: "#/components/parameters/endblock",
          },
          {
            $ref: "#/components/parameters/page",
          },
          {
            $ref: "#/components/parameters/offset",
          },
          {
            $ref: "#/components/parameters/sort",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TxList",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=txlistinternal": {
      get: {
        tags: ["Accounts"],
        description:
          "Get a list of 'Internal' Transactions.\n\nUsage:\n\n1> Get 'Internal' Transactions by Address.\n\n   example:\n\n       https://evmapi.confluxscan.net/api\n\n       ?module=account\n\n       &action=txlistinternal\n\n       &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3\n\n       &startblock=0\n\n       &endblock=2702578\n\n       &page=1\n\n       &offset=10\n\n       &sort=asc\n\n       &apikey=YourApiKeyToken\n\n2> Get 'Internal Transactions' by Transaction Hash.\n\n   example:\n\n       https://evmapi.confluxscan.net/api\n\n       ?module=account\n\n       &action=txlistinternal\n\n       &txhash=0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170\n\n       &apikey=YourApiKeyToken\n\n3> Get 'Internal Transactions' by Block Range.\n\n   example:\n\n       https://evmapi.confluxscan.net/api\n\n       ?module=account\n\n       &action=txlistinternal\n\n       &startblock=13481773\n\n       &endblock=13491773\n\n       &page=1\n\n       &offset=10\n\n       &sort=asc\n\n       &apikey=YourApiKeyToken",
        parameters: [
          {
            $ref: "#/components/parameters/txhash",
          },
          {
            $ref: "#/components/parameters/address",
          },
          {
            $ref: "#/components/parameters/startblock",
          },
          {
            $ref: "#/components/parameters/endblock",
          },
          {
            $ref: "#/components/parameters/page",
          },
          {
            $ref: "#/components/parameters/offset",
          },
          {
            $ref: "#/components/parameters/sort",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransferCfxList",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=tokentx": {
      get: {
        tags: ["Accounts"],
        description:
          "Get a list of 'CRC20 - Token Transfer Events' by Address\n\nUsage:\n\n1> ERC-20 transfers from an address, specify the address parameter\n\n2> ERC-20 transfers from a contract address, specify the contract address parameter\n\n3> ERC-20 transfers from an address filtered by a token contract, specify both address and contract address parameters.",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddress",
          },
          {
            $ref: "#/components/parameters/address",
          },
          {
            $ref: "#/components/parameters/page",
          },
          {
            $ref: "#/components/parameters/offset",
          },
          {
            $ref: "#/components/parameters/startblock",
          },
          {
            $ref: "#/components/parameters/endblock",
          },
          {
            $ref: "#/components/parameters/sort",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer20List",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=tokennfttx": {
      get: {
        tags: ["Accounts"],
        description:
          "Get a list of 'CRC721 - Token Transfer Events' by Address\n\nUsage:\n\n1> ERC-721 transfers from an address, specify the address parameter\n\n2> ERC-721 transfers from a contract address, specify the contract address parameter\n\n3> ERC-721 transfers from an address filtered by a token contract, specify both address and contract address parameters.",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddress",
          },
          {
            $ref: "#/components/parameters/address",
          },
          {
            $ref: "#/components/parameters/page",
          },
          {
            $ref: "#/components/parameters/offset",
          },
          {
            $ref: "#/components/parameters/startblock",
          },
          {
            $ref: "#/components/parameters/endblock",
          },
          {
            $ref: "#/components/parameters/sort",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer721List",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=getminedblocks": {
      get: {
        tags: ["Accounts"],
        description: "Get list of Blocks Mined by Address",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/blocktype",
          },
          {
            $ref: "#/components/parameters/page",
          },
          {
            $ref: "#/components/parameters/offset",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MinedBlockList",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=balancehistory": {
      get: {
        tags: ["Accounts"],
        description: "Get Historical CFX Balance for a Single Address By BlockNo",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/blocknoMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BalanceHistory",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=contract&action=getabi": {
      get: {
        tags: ["Contracts"],
        description: "Get Contract ABI for Verified Contract Source Codes",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=contract&action=getsourcecode": {
      get: {
        tags: ["Contracts"],
        description: "Get Contract Source Code for Verified Contract Source Codes",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ContractInfo",
                },
              },
            },
          },
        },
      },
    },
    "/api": {
      post: {
        tags: ["Contracts"],
        requestBody: {
          description: "Verify Source Code - Source Code Submission Gist",
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/VerifySourcecode",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=contract&action=checkverifystatus": {
      get: {
        tags: ["Contracts"],
        description: "Verify Source Code - Check Source Code Verification Submission Status",
        parameters: [
          {
            $ref: "#/components/parameters/guidMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ContractInfo",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=contract&action=verifyproxycontract": {
      get: {
        tags: ["Contracts"],
        description: "Verifying Proxy Contract using cURL",
        parameters: [
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/expectedimplementation",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=contract&action=checkproxyverification": {
      get: {
        tags: ["Contracts"],
        description: "Checking Proxy Contract Verification Submission Status using cURL",
        parameters: [
          {
            $ref: "#/components/parameters/guidMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=transaction&action=getstatus": {
      get: {
        tags: ["Transactions"],
        description: "Check Contract Execution Status",
        parameters: [
          {
            $ref: "#/components/parameters/txhashMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ContractExecutionStatus",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=transaction&action=gettxreceiptstatus": {
      get: {
        tags: ["Transactions"],
        description: "Check Transaction Receipt Status",
        parameters: [
          {
            $ref: "#/components/parameters/txhashMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransactionReceiptStatus",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=block&action=getblocknobytime": {
      get: {
        tags: ["Blocks"],
        description: "Get Block Number by Timestamp",
        parameters: [
          {
            $ref: "#/components/parameters/timestampMust",
          },
          {
            $ref: "#/components/parameters/closest",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=stats&action=tokensupply": {
      get: {
        tags: ["Tokens"],
        description: "Get CRC20-Token TotalSupply by ContractAddress",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddressMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=tokenbalance": {
      get: {
        tags: ["Tokens"],
        description: "Get CRC20-Token Account Balance for TokenContractAddress",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddressMust",
          },
          {
            $ref: "#/components/parameters/addressMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=stats&action=tokensupplyhistory": {
      get: {
        tags: ["Tokens"],
        description: "Get Historical CRC20-Token TotalSupply by ContractAddress & BlockNo",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddressMust",
          },
          {
            $ref: "#/components/parameters/blocknoMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api?module=account&action=tokenbalancehistory": {
      get: {
        tags: ["Tokens"],
        description:
          "Get Historical CRC20-Token Account Balance for TokenContractAddress by BlockNo",
        parameters: [
          {
            $ref: "#/components/parameters/contractaddressMust",
          },
          {
            $ref: "#/components/parameters/addressMust",
          },
          {
            $ref: "#/components/parameters/blocknoMust",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/nft/balances": {
      get: {
        tags: ["NFT Assets"],
        description: "Get balances of NFT assets for account address.",
        parameters: [
          {
            $ref: "#/components/parameters/ownerParamMust",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NFTBalanceList",
                },
              },
            },
          },
        },
      },
    },
    "/nft/tokens": {
      get: {
        tags: ["NFT Assets"],
        description:
          "Get token id array of specified NFT contract for account address.\n\nAt least one of the parameters 'contract' and 'owner' is required.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/ownerParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/sortFieldParam",
          },
          {
            $ref: "#/components/parameters/cursorParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/withBriefParam",
          },
          {
            $ref: "#/components/parameters/withMetadataParam",
          },
          {
            $ref: "#/components/parameters/suppressMetadataErrorParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NFTTokenList",
                },
              },
            },
          },
        },
      },
    },
    "/nft/preview": {
      get: {
        tags: ["NFT Assets"],
        description: "View the NFT for the specified contract address and tokenID.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/tokenIdParamMust",
          },
          {
            $ref: "#/components/parameters/withMetadataParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NFTPreview",
                },
              },
            },
          },
        },
      },
    },
    "/nft/fts": {
      get: {
        tags: ["NFT Assets"],
        description: "Search the NFT by NFT name and/or contract address.",
        parameters: [
          {
            $ref: "#/components/parameters/nameParamMust",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NFTTokenFtsList",
                },
              },
            },
          },
        },
      },
    },
    "/nft/owners": {
      get: {
        tags: ["NFT Assets"],
        description:
          "Get a list of owners for a NFT or a NFT collection. The owners are sorted by transfer timestamp with ascending direction",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/cursorParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NFTOwnerList",
                },
              },
            },
          },
        },
      },
    },
    "/nft/transfers": {
      get: {
        tags: ["NFT Assets"],
        description: "Get a list of transfers for a NFT",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/cursorParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransferList",
                },
              },
            },
          },
        },
      },
    },
    "/util/decode/method": {
      get: {
        tags: ["Utils"],
        description:
          "Decode the data of the transaction, where the `to` address of the transaction is the verified contract. Supports up to 10 transactions at a time.",
        parameters: [
          {
            $ref: "#/components/parameters/hashesParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DecodedMethod",
                },
              },
            },
          },
        },
      },
    },
    "/util/decode/method/raw": {
      get: {
        tags: ["Utils"],
        description:
          "Decode the data of the raw transaction, where the `to` address of the transaction is the verified contract. Supports up to 10 transactions at a time.",
        parameters: [
          {
            $ref: "#/components/parameters/contractsParam",
          },
          {
            $ref: "#/components/parameters/inputsParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DecodedMethodRaw",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/supply": {
      get: {
        tags: ["Statistics"],
        description:
          "Return supply info about CFX on Conflux Network.\n\ntotalIssued: Total issued balance in Drip,\n\ntotalCirculating: Total circulating balance in Drip,\n\ntotalStaking: Total staking balance in Drip,\n\ntotalCollateral: Total collateral balance in Drip,\n\nnullAddressBalance: Zero address's balance in Drip,\n\ntwoYearUnlockBalance: Two year unlock address's balance in Drip,\n\nfourYearUnlockBalance: Four year unlock address's balance in Drip.",
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MarketStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/mining": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of mining within ${limit} ${intervalType}.",
        parameters: [
          {
            description:
              "Indicator calculation period, should be one of min(minute), hour or day. Default is hour.",
            name: "intervalType",
            in: "query",
            required: false,
            schema: {
              type: "string",
              default: "hour",
              enum: ["min", "hour", "day"],
            },
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MiningStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/tps": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of tps within ${limit} ${intervalType}.",
        parameters: [
          {
            name: "intervalType",
            description:
              "Indicate calculation period, should be one of min(minute), hour or day. Default is hour.",
            in: "query",
            required: false,
            schema: {
              type: "string",
              default: "hour",
              enum: ["min", "hour", "day"],
            },
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TpsStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/contract": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of deployed contract.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ContractDeployedStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/account/cfx/holder": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of total cfx holder by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CfxHolderStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/account/growth": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of account growth by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AccountGrowthStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/account/active": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of tx sender by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AccountActiveStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/account/active/overall": {
      get: {
        tags: ["Statistics"],
        description:
          "Get statistics of unique addresses that were active on the network as a sender or receiver of CFX or Token.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AccountActiveStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/transaction": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of transaction account by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransactionStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/cfx/transfer": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of cfx transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CfxTransferStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/token/transfer": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of token transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenTransferStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/gas/used": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of gas used for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GasUsedTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/miner": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of miner for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MinerTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/transaction/sender": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of transaction sender for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddressTransactionTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/transaction/receiver": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of transaction receiver for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddressTransactionTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/cfx/sender": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of cfx sender for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddressCfxTransferTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/cfx/receiver": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of cfx receiver for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddressCfxTransferTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/token/transfer": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of token transfer for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenTransferTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/token/sender": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of token sender for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenSenderTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/token/receiver": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of token receiver for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenReceiverTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/top/token/participant": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of token participant for top 10.",
        parameters: [
          {
            $ref: "#/components/parameters/spanParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenParticipantTopStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/token/holder": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of holder count for token transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenHolderStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/token/unique/sender": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of unique sender count for token transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenTransferUniqueSenderStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/token/unique/receiver": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of unique receiver count for token transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenTransferUniqueReceiverStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/token/unique/participant": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of unique participant count for token transfer by daily.",
        parameters: [
          {
            $ref: "#/components/parameters/contractParamMust",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenTransferUniqueParticipantStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/block/base-fee": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of base fee within ${limit}.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BaseFeeStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/block/avg-priority-fee": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of base fee within ${limit}.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AvgPriorityFeeStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/block/gas-used": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of base fee within ${limit}.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GasUsedStat",
                },
              },
            },
          },
        },
      },
    },
    "/statistics/block/txs-by-type": {
      get: {
        tags: ["Statistics"],
        description: "Get statistics of base fee within ${limit}.",
        parameters: [
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/skipParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/limitParamStat",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TxsByTypeStat",
                },
              },
            },
          },
        },
      },
    },
    "/account/transactions": {
      get: {
        tags: ["Accounts(Deprecated)"],
        description:
          "Get transactions associated with an account. A transaction with 'from' or 'to' equals to specified account\nis considered as 'associate'. Parameters 'from' and 'to' are [or] logic.",
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransactionListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/cfx/transfers": {
      get: {
        description: "Get cfx transfer records of an account.",
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransferCfxListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/erc20/transfers": {
      get: {
        description: "Get erc20 transfer records of an account.",
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer20ListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/erc721/transfers": {
      description: "Get erc721 transfer records of an account",
      get: {
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer721ListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/erc1155/transfers": {
      description: "Get erc1155 transfer records of an account",
      get: {
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer1155ListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/erc3525/transfers": {
      description: "Get erc1155 transfer records of an account",
      get: {
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transfer3525ListResp",
                },
              },
            },
          },
        },
      },
    },
    "/account/transfers": {
      description:
        "Get all transfer records (includes: cfx transfer, erc20/erc721/erc1155 transfer) of an account",
      get: {
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/cursorParamWithoutMaximum",
          },
          {
            $ref: "#/components/parameters/skipParam",
          },
          {
            $ref: "#/components/parameters/limitParam",
          },
          {
            $ref: "#/components/parameters/contractParam",
          },
          {
            $ref: "#/components/parameters/fromParam",
          },
          {
            $ref: "#/components/parameters/toParam",
          },
          {
            $ref: "#/components/parameters/startBlockParam",
          },
          {
            $ref: "#/components/parameters/endBlockParam",
          },
          {
            $ref: "#/components/parameters/minTimestampParam",
          },
          {
            $ref: "#/components/parameters/maxTimestampParam",
          },
          {
            $ref: "#/components/parameters/tokenIdParam",
          },
          {
            $ref: "#/components/parameters/sortParam",
          },
          {
            $ref: "#/components/parameters/transferTypeParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransferListWithCursor",
                },
              },
            },
          },
        },
      },
    },
    "/account/approvals": {
      description: "Get token approvals of an account",
      get: {
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            name: "tokenType",
            in: "query",
            required: false,
            schema: {
              type: "string",
              default: "",
              enum: ["CRC20", "CRC721", "CRC1155"],
            },
          },
          {
            name: "byTokenId",
            in: "query",
            description: "Whether to query each NFT token id, only valid for CRC721.",
            required: false,
            schema: {
              type: "string",
              default: false,
              enum: [true, false],
            },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Approvals",
                },
              },
            },
          },
        },
      },
    },
    "/account/tokens": {
      get: {
        description: "Get assets held by an account. Some tokens may not show up for some reasons.",
        tags: ["Accounts(Deprecated)"],
        parameters: [
          {
            $ref: "#/components/parameters/accountParam",
          },
          {
            $ref: "#/components/parameters/tokenTypeParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AssetsOfAccountResp",
                },
              },
            },
          },
        },
      },
    },
    "/token/tokeninfos": {
      get: {
        tags: ["Tokens(Deprecated)"],
        description: "Get Token Info by contract addresses. Supports up to 30 tokens at a time.",
        parameters: [
          {
            $ref: "#/components/parameters/contractArrayParam",
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokenInfos",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CommonResponse: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "string",
          },
        },
      },
      BalanceMulti: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                address: {
                  type: "string",
                  description: "Account address",
                },
                balance: {
                  type: "string",
                  description: "Account balance",
                },
              },
            },
          },
        },
      },
      TxList: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                blockNumber: {
                  type: "string",
                },
                timeStamp: {
                  type: "string",
                },
                hash: {
                  type: "string",
                },
                nonce: {
                  type: "string",
                },
                blockHash: {
                  type: "string",
                },
                transactionIndex: {
                  type: "string",
                },
                from: {
                  type: "string",
                },
                to: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
                gas: {
                  type: "string",
                },
                gasPrice: {
                  type: "string",
                },
                isError: {
                  type: "string",
                },
                txreceipt_status: {
                  type: "string",
                },
                input: {
                  type: "string",
                },
                contractAddress: {
                  type: "string",
                },
                cumulativeGasUsed: {
                  type: "string",
                },
                gasUsed: {
                  type: "string",
                },
                confirmations: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      TransferCfxList: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                blockNumber: {
                  type: "string",
                },
                timeStamp: {
                  type: "string",
                },
                hash: {
                  type: "string",
                },
                from: {
                  type: "string",
                },
                to: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
                contractAddress: {
                  type: "string",
                },
                input: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                traceId: {
                  type: "string",
                },
                isError: {
                  type: "string",
                },
                errCode: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      Transfer20List: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                blockNumber: {
                  type: "string",
                },
                timeStamp: {
                  type: "string",
                },
                hash: {
                  type: "string",
                },
                nonce: {
                  type: "string",
                },
                blockHash: {
                  type: "string",
                },
                from: {
                  type: "string",
                },
                contractAddress: {
                  type: "string",
                },
                to: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
                tokenName: {
                  type: "string",
                },
                tokenSymbol: {
                  type: "string",
                },
                tokenDecimal: {
                  type: "string",
                },
                transactionIndex: {
                  type: "string",
                },
                gas: {
                  type: "string",
                },
                gasPrice: {
                  type: "string",
                },
                gasUsed: {
                  type: "string",
                },
                cumulativeGasUsed: {
                  type: "string",
                },
                input: {
                  type: "string",
                  description: "deprecated",
                },
                confirmations: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      Transfer721List: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                blockNumber: {
                  type: "string",
                },
                timeStamp: {
                  type: "string",
                },
                hash: {
                  type: "string",
                },
                nonce: {
                  type: "string",
                },
                blockHash: {
                  type: "string",
                },
                from: {
                  type: "string",
                },
                contractAddress: {
                  type: "string",
                },
                to: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
                tokenName: {
                  type: "string",
                },
                tokenSymbol: {
                  type: "string",
                },
                tokenDecimal: {
                  type: "string",
                },
                transactionIndex: {
                  type: "string",
                },
                gas: {
                  type: "string",
                },
                gasPrice: {
                  type: "string",
                },
                gasUsed: {
                  type: "string",
                },
                cumulativeGasUsed: {
                  type: "string",
                },
                input: {
                  type: "string",
                  description: "deprecated",
                },
                confirmations: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      MinedBlockList: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                blockNumber: {
                  type: "string",
                  description: "Block Number",
                },
                timeStamp: {
                  type: "string",
                  description: "The timeStamp is represented in Unix timestamp",
                },
                blockReward: {
                  type: "string",
                  description: "Block Reward",
                },
              },
            },
          },
        },
      },
      BalanceHistory: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "string",
          },
        },
      },
      ContractInfo: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                SourceCode: {
                  type: "string",
                },
                ABI: {
                  type: "string",
                },
                ContractName: {
                  type: "string",
                },
                CompilerVersion: {
                  type: "string",
                },
                OptimizationUsed: {
                  type: "string",
                },
                Runs: {
                  type: "string",
                },
                ConstructorArguments: {
                  type: "string",
                },
                EVMVersion: {
                  type: "string",
                },
                Library: {
                  type: "string",
                },
                LicenseType: {
                  type: "string",
                },
                Proxy: {
                  type: "string",
                },
                Implementation: {
                  type: "string",
                },
                SwarmSource: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      ContractExecutionStatus: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              isError: {
                type: "string",
                description:
                  "The isError field returns 0 for successful transactions and 1 for failed transactions",
              },
              errDescription: {
                type: "string",
                description: "Error description",
              },
            },
          },
        },
      },
      TransactionReceiptStatus: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description:
                  "The status field returns 0 for failed transactions and 1 for successful transactions",
              },
            },
          },
        },
      },
      TokenInfos: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                contract: {
                  description: "Contract address of the token.",
                  type: "string",
                },
                name: {
                  description: "Name of the token.",
                  type: "string",
                },
                symbol: {
                  description: "Symbol of the token.",
                  type: "string",
                  example: "CFX",
                },
                decimals: {
                  description: "Decimal of the token, omit if empty.",
                  type: "integer",
                },
                type: {
                  description: "Token type, CRC20、CRC721、CRC1155.",
                  type: "string",
                },
                iconUrl: {
                  description: "Icon url, optional.",
                  type: "string",
                  example: "http://scan-icons.oss-cn-hongkong.aliyuncs.com/testnet/xxxxxx.svg",
                },
                quoteUrl: {
                  description: "The quote url of token, optional.",
                  type: "string",
                },
                priceInUSDT: {
                  description: "The price of token in USDT, optional.",
                  type: "string",
                },
                error: {
                  description:
                    "A string describing a particular reason that we were unable to get token info.",
                  type: "string",
                },
              },
            },
          },
        },
      },
      TokenInfo: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          result: {
            type: "array",
            items: {
              properties: {
                contractAddress: {
                  type: "string",
                },
                tokenName: {
                  type: "string",
                },
                symbol: {
                  type: "string",
                },
                divisor: {
                  type: "string",
                },
                tokenType: {
                  type: "string",
                },
                totalSupply: {
                  type: "string",
                },
                blueCheckmark: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                website: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                blog: {
                  type: "string",
                },
                reddit: {
                  type: "string",
                },
                slack: {
                  type: "string",
                },
                facebook: {
                  type: "string",
                },
                twitter: {
                  type: "string",
                },
                bitcointalk: {
                  type: "string",
                },
                github: {
                  type: "string",
                },
                telegram: {
                  type: "string",
                },
                wechat: {
                  type: "string",
                },
                linkedin: {
                  type: "string",
                },
                discord: {
                  type: "string",
                },
                whitepaper: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      NFTBalanceList: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    contract: {
                      description: "Contract address of the token.",
                      type: "string",
                    },
                    balance: {
                      description:
                        "The token balance of an account, the string is not divided by the token decimal.",
                      type: "string",
                    },
                    name: {
                      description: "Name of the token.",
                      type: "string",
                    },
                    symbol: {
                      description: "Symbol of the token.",
                      type: "string",
                    },
                    type: {
                      description: "The type of the token, and it may be CRC721/CRC1155.",
                      type: "string",
                    },
                    webSite: {
                      description: "The web site of the token.",
                      type: "string",
                    },
                    iconUrl: {
                      description: "Icon url.",
                      type: "string",
                      example: "http://scan-icons.oss-cn-hongkong.aliyuncs.com/testnet/xxxxxx.svg",
                    },
                  },
                },
              },
            },
          },
        },
      },
      NFTTokenList: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              next: {
                description: "A cursor to retrieve the next page",
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    contract: {
                      description: "Contract address of the token.",
                      type: "string",
                    },
                    tokenId: {
                      description: "The token id.",
                      type: "string",
                    },
                    name: {
                      description: "The name of NFT",
                      type: "string",
                    },
                    image: {
                      description: "The image uri of NFT",
                      type: "string",
                    },
                    description: {
                      description: "The description of NFT",
                      type: "string",
                    },
                    rawData: {
                      type: "object",
                      properties: {
                        funcCall: {
                          description: "The function of contract which is called",
                          type: "string",
                        },
                        tokenUri: {
                          description:
                            "uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the metadata field is not automatically populated.",
                          type: "string",
                        },
                        metadata: {
                          description:
                            "relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata url in tokenUri to parse manually",
                        },
                      },
                    },
                    error: {
                      description:
                        "A string describing a particular reason that we were unable to fetch complete metadata for the NFT.",
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      NFTPreview: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              contract: {
                description: "Contract address of the token.",
                type: "string",
              },
              tokenId: {
                description: "The token id.",
                type: "string",
              },
              name: {
                description: "The name of NFT",
                type: "string",
              },
              image: {
                description: "The image uri of NFT",
                type: "string",
              },
              description: {
                description: "The description of NFT",
                type: "string",
              },
              type: {
                description: "Token type, CRC20、CRC721 or CRC1155",
                type: "string",
              },
              owner: {
                description: "The owner address.",
                type: "string",
              },
              rawData: {
                type: "object",
                properties: {
                  funcCall: {
                    description: "The function of contract which is called",
                    type: "string",
                  },
                  tokenUri: {
                    description:
                      "uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the metadata field is not automatically populated.",
                    type: "string",
                  },
                  metadata: {
                    description:
                      "relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata url in tokenUri to parse manually",
                  },
                },
              },
              error: {
                description:
                  "A string describing a particular reason that we were unable to fetch complete metadata for the NFT.",
                type: "string",
              },
            },
          },
        },
      },
      NFTTokenFtsList: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    contract: {
                      description: "Contract address of the token.",
                      type: "string",
                    },
                    tokenId: {
                      description: "The token id.",
                      type: "string",
                    },
                    name: {
                      description: "The name of NFT",
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      NFTOwnerList: {
        type: "object",
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              next: {
                description: "A cursor to retrieve the next page",
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      description: "The owner address.",
                      type: "string",
                    },
                    amount: {
                      description:
                        "When a tokenId is provided, it is the amount of nft; Otherwise it is the balance of nft.",
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AddressInfo: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            contract: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the contract.",
                },
                verify: {
                  type: "object",
                  properties: {
                    result: {
                      type: "integer",
                      description: "Verify result of the contract, 1-verified, 0-not verified.",
                    },
                  },
                },
              },
            },
            token: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the token.",
                },
                symbol: {
                  type: "string",
                  description: "Symbol of the token.",
                },
                decimals: {
                  type: "integer",
                  description: "Decimal of the token, omit if empty.",
                },
                website: {
                  type: "string",
                  description: "Website  of the token, optional",
                },
                iconUrl: {
                  type: "string",
                  description: "Icon url, optional",
                },
                tokenType: {
                  type: "string",
                  description: "Token type, CRC20、CRC721 or CRC1155",
                },
              },
            },
          },
        },
      },
      TransactionListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionIndex: {
                      type: "integer",
                      description:
                        "One block may have multiple transactions. It's the position of this transaction in all transactions.",
                    },
                    nonce: {
                      type: "integer",
                    },
                    hash: {
                      description: "transaction hash",
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                      description: "Amount of cfx, in drip.",
                    },
                    gasPrice: {
                      type: "string",
                    },
                    gasFee: {
                      type: "string",
                    },
                    timestamp: {
                      description: "Timestamp in seconds. ",
                      type: "number",
                    },
                    status: {
                      type: "integer",
                    },
                    contractCreated: {
                      type: "string",
                    },
                    method: {
                      type: "string",
                      description: "method id or method name.",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      TransferCfxListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionHash: {
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    amount: {
                      type: "string",
                    },
                    timestamp: {
                      type: "integer",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      Transfer20ListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionHash: {
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    amount: {
                      type: "string",
                    },
                    timestamp: {
                      type: "integer",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      Transfer721ListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionHash: {
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    tokenId: {
                      type: "string",
                    },
                    timestamp: {
                      type: "integer",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      Transfer1155ListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionHash: {
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    amount: {
                      type: "string",
                    },
                    tokenId: {
                      type: "string",
                    },
                    timestamp: {
                      type: "integer",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      Transfer3525ListResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                    },
                    transactionHash: {
                      type: "string",
                    },
                    from: {
                      type: "string",
                    },
                    to: {
                      type: "string",
                    },
                    fromTokenId: {
                      type: "string",
                      description: "field for TransferValue event",
                    },
                    toTokenId: {
                      type: "string",
                      description: "field for TransferValue event",
                    },
                    event: {
                      type: "string",
                      description: "event name, TransferValue or Transfer",
                    },
                    amount: {
                      type: "string",
                    },
                    tokenId: {
                      type: "string",
                    },
                    slot: {
                      type: "string",
                    },
                    timestamp: {
                      type: "integer",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      Approvals: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    value: {
                      description:
                        "This field has different meanings according to different situations.\nFor CRC20, it is the approval amount. For CRC1155 it is the `ApprovalForAll` flag.\nFor CRC721, it is the `ApprovalForAll` flag or the `Approval` tokenId, depending on the `type` field.",
                      type: "string",
                    },
                    approvalType: {
                      description: "Approval type, could be: `Approval` or `ApprovalForAll`.",
                      type: "string",
                    },
                    balance: {
                      description: "Token balance for CRC20",
                      type: "string",
                    },
                    contract: {
                      type: "string",
                    },
                    spenderName: {
                      type: "string",
                    },
                    spender: {
                      type: "string",
                    },
                    tokenInfo: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        symbol: {
                          type: "string",
                        },
                        base32: {
                          type: "string",
                        },
                        iconUrl: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        decimals: {
                          type: "integer",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      TransferList: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              next: {
                description: "A cursor to retrieve the next page",
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockNumber: {
                      type: "integer",
                      description: "Block Number",
                    },
                    transactionHash: {
                      type: "string",
                      description: "Transaction Hash",
                    },
                    from: {
                      type: "string",
                      description:
                        "Account address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
                    },
                    to: {
                      type: "string",
                      description:
                        "Account address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
                    },
                    amount: {
                      type: "string",
                      description:
                        "The CFX value or token amount in the transfer, the string is not divided by the CFX/token decimal",
                    },
                    tokenId: {
                      type: "string",
                      description: "The token id in CRC721/CRC1155 transfer, otherwise it is 0",
                    },
                    timestamp: {
                      type: "integer",
                      description: "Timestamp in seconds",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      TransferListWithCursor: {
        type: "object",
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              next: {
                description: "A cursor to retrieve the next page",
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    epochNumber: {
                      type: "integer",
                      description: "Epoch Number",
                    },
                    transactionHash: {
                      type: "string",
                      description: "Transaction Hash",
                    },
                    from: {
                      type: "string",
                      description:
                        "Account address, on testnet, it's like cfxtest:aatmcd6m3e4gjczt9v9d1gca1d77trk3vjr04w5yha,\non mainnet it's like cfx:aanjcf1esdz50j6zhkm0k60wc7669tfkw28mzudg24",
                    },
                    to: {
                      type: "string",
                      description:
                        "Account address, on testnet, it's like cfxtest:aatmcd6m3e4gjczt9v9d1gca1d77trk3vjr04w5yha,\non mainnet it's like cfx:aanjcf1esdz50j6zhkm0k60wc7669tfkw28mzudg24",
                    },
                    amount: {
                      type: "string",
                      description:
                        "The CFX value or token amount in the transfer, the string is not divided by the CFX/token decimal",
                    },
                    tokenId: {
                      type: "string",
                      description: "The token id in CRC721/CRC1155 transfer, otherwise it is 0",
                    },
                    timestamp: {
                      type: "integer",
                      description: "Timestamp in seconds.",
                    },
                    cursor: {
                      type: "string",
                      description: "The cursor of the transfer.",
                    },
                    type: {
                      type: "string",
                      description: "Transfer type.",
                    },
                    nonce: {
                      type: "string",
                      description: "Transaction nonce, omit if empty.",
                    },
                    method: {
                      type: "string",
                      description: "Transaction method name, omit if empty.",
                    },
                    status: {
                      type: "integer",
                      description: "Transaction status, 1-success, 0-fail, omit if empty.",
                    },
                    gasFee: {
                      type: "string",
                      description: "Transaction fee, omit if empty.",
                    },
                    methodId: {
                      type: "string",
                      description: "Transaction method id, omit if empty.",
                    },
                  },
                },
              },
              addressInfo: {
                $ref: "#/components/schemas/AddressInfo",
              },
            },
          },
        },
      },
      AssetsOfAccountResp: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              list: {
                type: "array",
                items: {
                  properties: {
                    contract: {
                      description: "Contract address of the token. Omit if it is native token.",
                      type: "string",
                    },
                    name: {
                      description: "Name of the token.",
                      type: "string",
                    },
                    symbol: {
                      description: "Symbol of the token.",
                      type: "string",
                      example: "CFX",
                    },
                    decimals: {
                      description: "Decimal of the token, omit if empty.",
                      type: "integer",
                    },
                    type: {
                      description: "Token type, CRC20、CRC721、CRC1155 or native",
                      type: "string",
                    },
                    iconUrl: {
                      description: "Icon url, optional.",
                      type: "string",
                      example: "http://scan-icons.oss-cn-hongkong.aliyuncs.com/testnet/xxxxxx.svg",
                    },
                    quoteUrl: {
                      description: "The quote url of token, optional.",
                      type: "string",
                    },
                    priceInUSDT: {
                      description: "The price of token in USDT, optional.",
                      type: "string",
                    },
                    amount: {
                      description:
                        "The token/native-token balance of an account, the string is not divided by the token decimal.",
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      VerifySourcecode: {
        type: "object",
        properties: {
          module: {
            type: "string",
            required: ["true"],
            description: "request module",
            default: "contract",
          },
          action: {
            type: "string",
            required: ["true"],
            description: "request action",
            default: "verifysourcecode",
          },
          contractaddress: {
            type: "string",
            required: ["true"],
            description: "Contract Address starts with 0x... ",
          },
          sourceCode: {
            type: "string",
            required: ["true"],
            description: "Contract Source Code (Flattened if necessary)",
          },
          codeformat: {
            type: "string",
            required: ["false"],
            description: "only support 'solidity-single-file' format",
            default: "solidity-single-file",
          },
          contractname: {
            type: "string",
            required: ["true"],
            description: "contract name",
          },
          compilerversion: {
            type: "string",
            required: ["true"],
            description: "compiler version",
          },
          optimizationUsed: {
            type: "string",
            required: ["true"],
            description:
              "0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)",
            default: 0,
          },
          runs: {
            type: "number",
            required: ["true"],
            description:
              "set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file) ",
            default: 200,
          },
          constructorArguements: {
            type: "string",
            required: ["false"],
            description: "if applicable",
            default: "",
          },
          evmversion: {
            type: "string",
            required: ["false"],
            description:
              "leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)",
            default: "",
          },
          licenseType: {
            type: "string",
            required: ["true"],
            description:
              "Valid codes 1-14 where\n1.  No License (None)\n2.  The Unlicense (Unlicense)\n3. \tMIT License (MIT)\n4. \tGNU General Public License v2.0 (GNU GPLv2)\n5. \tGNU General Public License v3.0 (GNU GPLv3)\n6. \tGNU Lesser General Public License v2.1 (GNU LGPLv2.1)\n7. \tGNU Lesser General Public License v3.0 (GNU LGPLv3)\n8. \tBSD 2-clause 'Simplified' license (BSD-2-Clause)\n9. \tBSD 3-clause 'New' Or 'Revised' license* (BSD-3-Clause)\n10. Mozilla Public License 2.0 (MPL-2.0)\n11. Open Software License 3.0 (OSL-3.0)\n12. Apache 2.0 (Apache-2.0)\n13. GNU Affero General Public License (GNU AGPLv3)\n14. Business Source License (BSL 1.1)",
            default: 1,
          },
          libraryname1: {
            type: "string",
            required: ["false"],
            description: "if applicable, a matching pair with libraryaddress1 required",
          },
          libraryaddress1: {
            type: "string",
            required: ["false"],
            description: "if applicable, a matching pair with libraryname1 required",
          },
          libraryname2: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress2: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname3: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress3: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname4: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress4: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname5: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress5: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname6: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress6: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname7: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress7: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname8: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress8: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname9: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress9: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryname10: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
          libraryaddress10: {
            type: "string",
            required: ["false"],
            description: "if applicable, matching pair required",
          },
        },
      },
      DecodedMethod: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              hash: {
                description: "Transaction hash.",
                type: "string",
              },
              decodedData: {
                description: "Decoded data of the transaction.",
                type: "string",
              },
              error: {
                description: "Error message when something wrong.",
                type: "string",
              },
            },
          },
        },
      },
      DecodedMethodRaw: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              contract: {
                description: "Contract address.",
                type: "string",
              },
              input: {
                description: "Input data of the transaction.",
                type: "string",
              },
              decodedData: {
                description: "Decoded data of the transaction.",
                type: "string",
              },
              error: {
                description: "Error message when something wrong.",
                type: "string",
              },
            },
          },
        },
      },
      MarketStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              totalIssued: {
                type: "string",
                description: "Total issued balance in Drip",
              },
              totalCirculating: {
                type: "string",
                description: "Total circulating balance in Drip",
              },
              totalStaking: {
                type: "string",
                description: "Total staking balance in Drip",
              },
              totalCollateral: {
                type: "string",
                description: "Total collateral balance in Drip",
              },
              nullAddressBalance: {
                type: "string",
                description: "Zero address's balance in Drip",
              },
              twoYearUnlockBalance: {
                type: "string",
                description: "Two year unlock address's balance in Drip",
              },
              fourYearUnlockBalance: {
                type: "string",
                description: "Four year unlock address's balance in `Drip`",
              },
            },
          },
        },
      },
      MiningStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    blockTime: {
                      type: "string",
                      description: "",
                    },
                    hashRate: {
                      type: "string",
                      description: "",
                    },
                    difficulty: {
                      type: "string",
                      description: "",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TpsStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    tps: {
                      type: "string",
                      description: "",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      ContractDeployedStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    count: {
                      type: "string",
                      description: "daily deployed contracts.",
                    },
                    total: {
                      type: "string",
                      description: "total deployed contracts.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      CfxHolderStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    count: {
                      type: "string",
                      description: "total cfx holders count by daily",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AccountGrowthStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    count: {
                      type: "string",
                      description: "daily account growth count.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AccountActiveStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    count: {
                      type: "string",
                      description: "daily active account count.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TransactionStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    count: {
                      type: "string",
                      description: "daily transaction count.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      CfxTransferStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    transferCount: {
                      type: "string",
                      description: "daily cfx transfer count.",
                    },
                    userCount: {
                      type: "string",
                      description: "daily user count.",
                    },
                    amount: {
                      type: "string",
                      description: "daily amount of cfx transfer.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenTransferStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    transferCount: {
                      type: "string",
                      description: "daily token transfer count.",
                    },
                    userCount: {
                      type: "string",
                      description: "daily user count.",
                    },
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      GasUsedTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              totalGas: {
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "account address.",
                    },
                    gas: {
                      type: "string",
                      description: "gas used.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      MinerTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              minTime: {
                type: "string",
              },
              maxTime: {
                type: "string",
              },
              difficultyTotal: {
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "account address.",
                    },
                    blockCntr: {
                      type: "string",
                      description: "block count",
                    },
                    rewardSum: {
                      type: "string",
                      description: "reward sum",
                    },
                    txFeeSum: {
                      type: "string",
                      description: "tx fee sum",
                    },
                    hashRate: {
                      type: "string",
                      description: "hash rate",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AddressCfxTransferTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              minTime: {
                type: "string",
              },
              maxTime: {
                type: "string",
              },
              valueTotal: {
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "account address.",
                    },
                    value: {
                      type: "string",
                      description: "address transfer value.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AddressTransactionTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              minTime: {
                type: "string",
              },
              maxTime: {
                type: "string",
              },
              valueTotal: {
                type: "string",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "account address.",
                    },
                    value: {
                      type: "string",
                      description: "address transaction count.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenTransferTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "token address.",
                    },
                    value: {
                      type: "string",
                      description: "token transfer count.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenSenderTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "token address.",
                    },
                    value: {
                      type: "string",
                      description: "token sender count.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenReceiverTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "token address.",
                    },
                    value: {
                      type: "string",
                      description: "token receiver count.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenParticipantTopStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              list: {
                type: "array",
                items: {
                  properties: {
                    address: {
                      type: "string",
                      description: "token address.",
                    },
                    value: {
                      type: "string",
                      description: "token participant count.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenHolderStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                    holderCount: {
                      type: "string",
                      description: "daily holder count of token.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenTransferUniqueSenderStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                    uniqueSender: {
                      type: "string",
                      description: "daily unique sender count of token transfer.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenTransferUniqueReceiverStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                    uniqueReceiver: {
                      type: "string",
                      description: "daily unique receiver count of token transfer.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TokenTransferUniqueParticipantStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    statTime: {
                      type: "string",
                      description: "Statistics time, UTC.",
                    },
                    uniqueParticipant: {
                      type: "string",
                      description: "daily unique participant count of token transfer.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      BaseFeeStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    baseFee: {
                      type: "string",
                      description: "Base fee per gas.",
                    },
                    blockNumber: {
                      type: "number",
                      description: "Block Number.",
                    },
                    timestamp: {
                      type: "number",
                      description: "Block timestamp, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      AvgPriorityFeeStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    avgPriorityFee: {
                      type: "string",
                      description: "Average priority fee per gas.",
                    },
                    blockNumber: {
                      type: "number",
                      description: "Block Number.",
                    },
                    timestamp: {
                      type: "number",
                      description: "Block timestamp, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      GasUsedStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    gasUsed: {
                      type: "string",
                      description: "Gas used.",
                    },
                    blockNumber: {
                      type: "number",
                      description: "Block Number.",
                    },
                    timestamp: {
                      type: "number",
                      description: "Block timestamp, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      TxsByTypeStat: {
        type: "object",
        properties: {
          status: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          result: {
            type: "object",
            properties: {
              total: {
                type: "integer",
              },
              list: {
                type: "array",
                items: {
                  properties: {
                    txsByType: {
                      type: "object",
                      description: "Transactions by type.",
                      properties: {
                        legacy: {
                          type: "number",
                          description: "Number of transactions of type legacy.",
                        },
                        cip2930: {
                          type: "number",
                          description: "Number of transactions of type CIP2930.",
                        },
                        cip1559: {
                          type: "number",
                          description: "Number of transactions of type CIP1559.",
                        },
                      },
                    },
                    blockNumber: {
                      type: "number",
                      description: "Block Number.",
                    },
                    timestamp: {
                      type: "number",
                      description: "Block timestamp, UTC.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    parameters: {
      addressMust: {
        name: "address",
        in: "query",
        description: "the string representing the address to check for balance",
        required: true,
        schema: {
          type: "string",
        },
      },
      address: {
        name: "address",
        in: "query",
        description: "the string representing the address to check for balance",
        required: false,
        schema: {
          type: "string",
        },
      },
      expectedimplementation: {
        name: "expectedimplementation",
        in: "query",
        description: "proxy's implementation contract address",
        required: false,
        schema: {
          type: "string",
        },
      },
      txhashMust: {
        name: "txhash",
        in: "query",
        description:
          "the string representing the transaction hash to check for internal transactions",
        required: true,
        schema: {
          type: "string",
        },
      },
      txhash: {
        name: "txhash",
        in: "query",
        description:
          "the string representing the transaction hash to check for internal transactions",
        required: false,
        schema: {
          type: "string",
        },
      },
      contractaddressMust: {
        name: "contractaddress",
        in: "query",
        description: "the string representing the token contract address to check for balance",
        required: true,
        schema: {
          type: "string",
        },
      },
      contractaddress: {
        name: "contractaddress",
        in: "query",
        description: "the string representing the token contract address to check for balance",
        required: false,
        schema: {
          type: "string",
        },
      },
      guidMust: {
        name: "guid",
        in: "query",
        description:
          "Upon successful submission, a GUID is returned, which can be used to check for submission status.",
        required: true,
        schema: {
          type: "string",
        },
      },
      tag: {
        name: "tag",
        in: "query",
        description:
          "the string pre-defined block parameter, either latest_mined, latest_state, latest_finalized, latest_confirmed, latest_checkpoint or earliest",
        required: false,
        schema: {
          type: "string",
          default: "latest_state",
        },
      },
      blocktype: {
        name: "blocktype",
        in: "query",
        description: "the string pre-defined block type, only support 'blocks' type",
        required: false,
        schema: {
          type: "string",
          default: "blocks",
        },
      },
      page: {
        name: "page",
        in: "query",
        description: "the integer page number, if pagination is enabled",
        required: false,
        schema: {
          type: "integer",
          default: 1,
          maximum: 10000,
        },
      },
      offset: {
        name: "offset",
        in: "query",
        description: "the number of transactions displayed per page",
        required: false,
        schema: {
          type: "integer",
          maximum: 100,
          default: 100,
        },
      },
      blocknoMust: {
        name: "blockno",
        in: "query",
        description: "the integer block number to check balance for eg. 12697906",
        required: true,
        schema: {
          type: "integer",
        },
      },
      blockno: {
        name: "blockno",
        in: "query",
        description: "the integer block number to check balance for eg. 12697906",
        required: false,
        schema: {
          type: "integer",
        },
      },
      fromBlockMust: {
        name: "fromBlock",
        in: "query",
        description: "the integer block number eg. 12697906",
        required: true,
        schema: {
          type: "integer",
        },
      },
      toBlockMust: {
        name: "toBlock",
        in: "query",
        description: "the integer block number eg. 12697906",
        required: true,
        schema: {
          type: "integer",
        },
      },
      topic0: {
        name: "topic0",
        in: "query",
        description: "32 Bytes per topic",
        required: false,
        schema: {
          type: "string",
        },
      },
      topic1: {
        name: "topic1",
        in: "query",
        description: "32 Bytes per topic",
        required: false,
        schema: {
          type: "string",
        },
      },
      topic2: {
        name: "topic2",
        in: "query",
        description: "32 Bytes per topic",
        required: false,
        schema: {
          type: "string",
        },
      },
      topic3: {
        name: "topic3",
        in: "query",
        description: "32 Bytes per topic",
        required: false,
        schema: {
          type: "string",
        },
      },
      timestampMust: {
        description: "the integer representing the Unix timestamp in seconds",
        name: "timestamp",
        in: "query",
        required: true,
        schema: {
          type: "integer",
        },
      },
      closest: {
        description:
          "the closest available block to the provided timestamp, either before or after",
        name: "closest",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "before",
        },
      },
      startblock: {
        name: "startblock",
        in: "query",
        description: "the integer block number to start searching for transactions",
        required: false,
        schema: {
          type: "integer",
        },
      },
      endblock: {
        name: "endblock",
        in: "query",
        description: "the integer block number to stop searching for transactions",
        required: false,
        schema: {
          type: "integer",
        },
      },
      sort: {
        description:
          "the sorting preference, use asc to sort by ascending and desc to sort by descending",
        name: "sort",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "desc",
        },
      },
      accountParam: {
        name: "account",
        in: "query",
        description: "Account address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: true,
        schema: {
          type: "string",
        },
      },
      skipParam: {
        name: "skip",
        in: "query",
        description:
          "The number of skipped records, usually it's pageSize * (pageNumber - 1). Maximum 10000.",
        required: false,
        schema: {
          type: "integer",
          default: 0,
          maximum: 10000,
        },
      },
      skipParamWithoutMaximum: {
        name: "skip",
        in: "query",
        description: "The number of skipped records, usually it's pageSize * (pageNumber - 1).",
        required: false,
        schema: {
          type: "integer",
          default: 0,
        },
      },
      cursorParamWithoutMaximum: {
        name: "cursor",
        in: "query",
        description: "A cursor to retrieve the next page",
        required: false,
        schema: {
          type: "string",
          default: 0,
        },
      },
      limitParam: {
        name: "limit",
        in: "query",
        description: "The number of records displayed on the page. Maximum 100.",
        required: false,
        schema: {
          type: "integer",
          maximum: 100,
          default: 10,
        },
      },
      limitParamStat: {
        name: "limit",
        in: "query",
        description: "The number of records displayed on the page. Maximum 2000.",
        required: false,
        schema: {
          type: "integer",
          maximum: 2000,
          default: 10,
        },
      },
      contractParam: {
        name: "contract",
        in: "query",
        description: "Contract address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: false,
        schema: {
          type: "string",
        },
      },
      contractParamMust: {
        name: "contract",
        in: "query",
        description: "Contract address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: true,
        schema: {
          type: "string",
        },
      },
      contractArrayParam: {
        description:
          "Contract addresses, separated by comma,\neg. it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a,0xfd2209bc1b7818fe48b2a672158893ce87d812be",
        name: "contracts",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      fromParam: {
        name: "from",
        in: "query",
        description: "Account address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: false,
        schema: {
          type: "string",
        },
      },
      toParam: {
        name: "to",
        in: "query",
        description: "Account address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: false,
        schema: {
          type: "string",
        },
      },
      minTimestampParam: {
        description: "Timestamp in seconds.",
        name: "minTimestamp",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      maxTimestampParam: {
        description: "Timestamp in seconds.",
        name: "maxTimestamp",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      tokenIdParam: {
        description: "Token id. It's uint256 in solidity. Using string here.",
        name: "tokenId",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      tokenIdParamMust: {
        description: "Token id. It's uint256 in solidity. Using string here.",
        name: "tokenId",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      tokenTypeParam: {
        description:
          "Token type, includes CRC20、CRC721、CRC1155 or native. Multiple types separated by commas. If not set, all tokens will be returned.",
        name: "tokenType",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      sortParam: {
        description: "Sort in ASC or DESC order by timestamp",
        name: "sort",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "DESC",
        },
      },
      sortFieldParam: {
        description: "The field used for sorting. The value is latest_update_time or mint_time",
        name: "sortField",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "latest_update_time",
        },
      },
      ownerParam: {
        name: "owner",
        in: "query",
        description: "Owner address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: false,
        schema: {
          type: "string",
        },
      },
      ownerParamMust: {
        name: "owner",
        in: "query",
        description: "Owner address, it's like 0x672158893ce87d812befd2209bc1b7818fe48b2a",
        required: true,
        schema: {
          type: "string",
        },
      },
      detailParam: {
        description:
          "(Deprecated, see 'withBrief' parameter)If show detail, the value is true/false.",
        name: "detail",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "false",
        },
      },
      withBriefParam: {
        description:
          "If show brief which contains name，image and description, the value is true/false.",
        name: "withBrief",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "false",
        },
      },
      withMetadataParam: {
        description: "If show metadata, the value is true/false.",
        name: "withMetadata",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "false",
        },
      },
      suppressMetadataErrorParam: {
        description:
          "If suppress error when withBrief and/or withMetadata is set to true to parse metadata, the value is true/false.",
        name: "suppressMetadataError",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "false",
        },
      },
      startBlockParam: {
        name: "startBlock",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      endBlockParam: {
        name: "endBlock",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      spanParam: {
        description:
          "Calculates the ranking in the specified time span 24h, 3d or 7d. If not provided, default value is 24h",
        name: "spanType",
        in: "query",
        required: false,
        schema: {
          type: "string",
          default: "24h",
        },
      },
      hashesParam: {
        description:
          "Hash array of transactions to decode data, separated by comma,\neg. 0x8378892767d0afce19b278015702531a61512e8444ee7f51c41c90e56fec462d,0xa09c63d8dc9867851b254b31a723e653c9608a94a4a61bc97bf8a5f4aeffb4f4",
        name: "hashes",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      contractsParam: {
        description:
          "To address array of transactions to decode data, separated by comma,\neg. 0xc18944582317654327f20ce92df111cae83995dd,0x30b987679c1dcf3a8c890395eadf178078a99b82",
        name: "contracts",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      inputsParam: {
        description:
          "To input data array of transactions to decode data, separated by comma,\neg. 0xaea1414f,0x6e756fb200000000000000000000000015a0a156ce9feb9f01881b3b4a9788c49e65c6fa00000000000000000000000000000000000000000000",
        name: "inputs",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      nameParamMust: {
        description: "The name attribute contained in nft metadata",
        name: "name",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      transferTypeParam: {
        description:
          "Query the transfer record of the address based on the specified transferType which includes\n1. Transaction\n\n\t1.1 'transaction'\n2. CFX Transfer\n\n\t2.1 'call'\n\n\t2.2 'create'\n3. Token Transfer\n\n\t3.1 'transfer_20'\n\n\t3.2 'transfer_721'\n\n\t3.3 'transfer_1155'",
        name: "transferType",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    },
  },
  externalDocs: {
    description: "Conflux JSON RPC Docs",
    url: "https://developer.confluxnetwork.org/conflux-doc/docs/json_rpc",
  },
};
