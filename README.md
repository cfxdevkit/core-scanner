# @cfxdevkit/confluxscan-core

A TypeScript library for interacting with Conflux Core confluxscan API.

[![npm version](https://img.shields.io/npm/v/@cfxdevkit/confluxscan-core)](https://www.npmjs.com/package/@cfxdevkit/confluxscan-core)
[![Build Status](https://img.shields.io/github/actions/workflow/status/cfxdevkit/core-scanner/ci.yml)](https://github.com/cfxdevkit/core-scanner/actions)
[![Coverage Status](https://codecov.io/gh/cfxdevkit/core-scanner/branch/main/graph/badge.svg)](https://codecov.io/gh/cfxdevkit/core-scanner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node Version](https://img.shields.io/node/v/@cfxdevkit/confluxscan-core)](https://www.npmjs.com/package/@cfxdevkit/confluxscan-core)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cfxdevkit/core-scanner/pulls)


## Installation

```bash
npm install @cfxdevkit/confluxscan-core
```

## Features

- Full TypeScript support with comprehensive type definitions
- Complete Conflux Core confluxscan API coverage
- Comprehensive data formatting utilities
- Built-in error handling and address validation
- Detailed documentation and examples
- Jest-based test suite with high coverage
- ESLint and Prettier for code quality
- Husky for git hooks

## Project Structure

```
src/
├── core/                 # Core API implementation
│   ├── api.ts           # Base API class for HTTP requests
│   ├── scanner.ts       # Main scanner implementation
│   └── modules/         # API module implementations
│       ├── account.ts   # Account-related operations
│       ├── contract.ts  # Smart contract operations
│       ├── nft.ts       # NFT-related operations
│       ├── statistics.ts # Network statistics
│       └── utils.ts     # Utility operations
├── formatters/          # Data formatting utilities
│   ├── dates.ts        # Date and timestamp formatting
│   ├── numbers.ts      # Numeric and unit formatting
│   └── responses.ts    # API response formatting
├── wrapper/            # High-level wrapper with formatting
│   ├── base.ts        # Base wrapper functionality
│   ├── scanner.ts     # Main scanner wrapper
│   └── modules/       # Formatted module implementations
├── types/             # TypeScript type definitions
│   └── domains/       # Domain-specific types
└── utils/             # Utility functions
    ├── logger.ts      # Logging configuration
    └── validation.ts  # Address validation
```

## Core Modules

### Account Module
- Account balance queries
- Transaction history
- Token transfer history
- NFT transfer tracking
- Account statistics

### Contract Module
- Contract ABI retrieval
- Source code access
- Contract verification status
- Contract creation info
- Contract events and logs

### NFT Module
- NFT holdings and balances
- Token metadata and details
- Transfer history
- Collection information
- NFT minting history

### Statistics Module
- Network metrics and analytics
- Account activity statistics
- Transaction analytics
- Gas usage metrics
- Mining statistics

### Utils Module
- Address validation and formatting
- Transaction hash validation
- Block number utilities
- Network status checks
- General utility functions

## Formatters

### Date Formatter
```typescript
import { DateFormatter } from "@cfxdevkit/confluxscan-core";

// Format timestamps
DateFormatter.formatDate(1707307200, "full"); // "2024-02-07 12:00:00"
DateFormatter.formatDate(1707307200, "date"); // "2024-02-07"

// Get relative timestamps
DateFormatter.get24HoursAgo(); // timestamp from 24 hours ago
DateFormatter.getTimeAgo(7); // timestamp from 7 days ago
```

### Number Formatter
```typescript
import { NumberFormatter } from "@cfxdevkit/confluxscan-core";

// Format numbers
NumberFormatter.formatNumber(1234.5678); // "1,234.5678"
NumberFormatter.formatPercentage(50.5678); // "50.57%"

// Format blockchain values
NumberFormatter.formatGas("1000000000"); // "1.0 Gdrip"
NumberFormatter.formatCFX("1000000000000000000"); // "1 CFX"
```

## Utilities

### Address Validation
```typescript
import { AddressValidator } from "@cfxdevkit/confluxscan-core";

// Validate single address
AddressValidator.validateAddress("cfx:1234..."); // true/false

// Validate multiple addresses
AddressValidator.validateAddresses(["cfx:1234...", "cfx:5678..."]); // true/false
```

### Logging
```typescript
import { createLogger } from "@cfxdevkit/confluxscan-core";

// Create module-specific logger
const logger = createLogger("MyModule");
logger.info("Operation successful");
logger.error({ error }, "Operation failed");
```

## Usage

### Basic Setup

```typescript
import { CoreScanner, CoreScannerWrapper } from "@cfxdevkit/confluxscan-core";

// Initialize scanner for different networks
const mainnetScanner = new CoreScannerWrapper({ target: "mainnet" });
const testnetScanner = new CoreScannerWrapper({ target: "testnet" });

// With API key for higher rate limits
const scannerWithApiKey = new CoreScannerWrapper({
    target: "mainnet",
    apiKey: "YOUR_API_KEY", // optional
    host: "YOUR_CUSTOM_HOST" // optional, for custom endpoint
});
```

### Account Operations

```typescript
// Get account transactions
const transactions = await scanner.account.AccountTransactions({
    account: "cfx:1234...",
    skip: 0,
    limit: 10,
    sort: "DESC"
});

// Get CFX transfers
const cfxTransfers = await scanner.account.CfxTransfers({
    account: "cfx:1234...",
    skip: 0,
    limit: 10,
    sort: "DESC"
});

// Get CRC20 token transfers
const tokenTransfers = await scanner.account.Crc20Transfers({
    account: "cfx:1234...",
    skip: 0,
    limit: 10,
    sort: "DESC"
});

// Get CRC721 NFT transfers
const nftTransfers = await scanner.account.Crc721Transfers({
    account: "cfx:1234...",
    skip: 0,
    limit: 10,
    sort: "DESC"
});
```

### Contract Operations

```typescript
// Get contract ABI
const abi = await scanner.contract.getABI({
    address: "cfx:1234..."
});

// Get contract source code
const source = await scanner.contract.getSourceCode({
    address: "cfx:1234..."
});

// Get contract creation info
const creation = await scanner.contract.getCreationInfo({
    address: "cfx:1234..."
});

// Get contract events
const events = await scanner.contract.getEvents({
    address: "cfx:1234...",
    skip: 0,
    limit: 10
});
```

### NFT Operations

```typescript
// Get NFT balances
const balances = await scanner.nft.getBalances({
    owner: "cfx:1234...",
    skip: 0,
    limit: 10
});

// Get NFT tokens
const tokens = await scanner.nft.getTokens({
    contract: "cfx:1234...",
    skip: 0,
    limit: 10,
    withMetadata: true
});

// Get NFT owners
const owners = await scanner.nft.getOwners({
    contract: "cfx:1234...",
    tokenId: "1",
    limit: 10
});

// Get NFT transfers
const transfers = await scanner.nft.getTransfers({
    contract: "cfx:1234...",
    tokenId: "1",
    limit: 10,
    sort: "DESC"
});
```

### Statistics Operations

```typescript
// Get contract statistics
const contractStats = await scanner.statistics.getContract({
    minTimestamp: 1234567890,
    maxTimestamp: 2345678901,
    sort: "DESC",
    skip: 0,
    limit: 10
});

// Get account growth statistics
const accountGrowth = await scanner.statistics.getAccountGrowth({
    minTimestamp: 1234567890,
    maxTimestamp: 2345678901,
    sort: "DESC",
    skip: 0,
    limit: 10
});

// Get active account statistics
const activeAccounts = await scanner.statistics.getAccountActive({
    minTimestamp: 1234567890,
    maxTimestamp: 2345678901,
    sort: "DESC",
    skip: 0,
    limit: 10
});

// Get overall active account statistics
const overallStats = await scanner.statistics.getAccountActiveOverall({
    minTimestamp: 1234567890,
    maxTimestamp: 2345678901,
    sort: "DESC",
    skip: 0,
    limit: 10
});
```

### Utils Operations

```typescript
// Decode transaction method
const decodedMethod = await scanner.utils.decodeMethod({
    hashes: "0x1234..."
});

// Decode raw method data
const decodedRaw = await scanner.utils.decodeMethodRaw({
    contracts: "0x1234...",
    inputs: "0x5678..."
});
```

## Development

Requirements:
- Node.js >= 16.0.0
- npm or yarn

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Generate documentation
npm run docs

# Lint and format code
npm run lint
npm run format

# Run examples
npm run example:scanner:account
npm run example:scanner:contract
npm run example:scanner:nft
npm run example:scanner:statistics
npm run example:scanner:utils
```

## Documentation

API documentation is generated using TypeDoc and is available in the `docs` directory:

```bash
npm run docs
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/cfxdevkit/core-scanner)
- [Issue Tracker](https://github.com/cfxdevkit/core-scanner/issues)
- [Documentation](https://cfxdevkit.github.io/core-scanner)

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Open a new issue if needed 