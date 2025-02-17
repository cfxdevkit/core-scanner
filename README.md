# @cfxdevkit/confluxscan-core

A TypeScript library for interacting with Conflux eSpace Scanner API.

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
- Complete Conflux eSpace Scanner API coverage
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
│       └── token.ts     # Token operations
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
- Balance queries (single/multi-address)
- Transaction history
- Token transfer history
- NFT transfer tracking
- Mining history
- Balance history

### Contract Module
- ABI retrieval
- Source code access
- Contract verification
- Proxy contract support

### NFT Module
- NFT balances
- Token metadata
- Transfer history
- Ownership tracking

### Statistics Module
- Network metrics
- Account activity
- Transaction analytics
- Token statistics
- Gas usage metrics
- Mining statistics

### Token Module
- Token balances
- Supply information
- Transfer history
- Historical data

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
AddressValidator.validateAddress("0x1234..."); // true/false

// Validate multiple addresses
AddressValidator.validateAddresses(["0x1234...", "0x5678..."]); // true/false
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
    apiKey: "YOUR_API_KEY" // optional
});
```

### Account Operations

```typescript
// Get account balance
const balance = await scanner.account.getBalance({
    address: "0x1234...",
    tag: "latest"
});

// Get transaction history
const transactions = await scanner.account.getTransactionList({
    address: "0x1234...",
    startblock: 1000000,
    endblock: 2000000,
    page: 1,
    offset: 10
});

// Get token transfers
const transfers = await scanner.account.getTokenTransfers({
    address: "0x1234...",
    contractaddress: "0x5678..." // optional
});
```

### Contract Operations

```typescript
// Get contract ABI
const abi = await scanner.contract.getABI({
    address: "0x1234..."
});

// Get contract source code
const source = await scanner.contract.getSourceCode({
    address: "0x1234..."
});

// Verify proxy contract
const verification = await scanner.contract.verifyProxyContract({
    address: "0x1234...",
    expectedimplementation: "0x5678..."
});
```

### NFT Operations

```typescript
// Get NFT balances
const balances = await scanner.nft.getBalances({
    owner: "0x1234..."
});

// Get NFT transfers
const transfers = await scanner.nft.getTransfers({
    contract: "0x1234...",
    tokenId: "1"
});

// Get NFT metadata
const metadata = await scanner.nft.getPreview({
    contract: "0x1234...",
    tokenId: "1",
    withMetadata: true
});
```

### Statistics Operations

```typescript
// Get network statistics
const supply = await scanner.statistics.getSupply();

// Get mining statistics
const mining = await scanner.statistics.getMining({
    intervalType: "day",
    minTimestamp: 1234567890,
    maxTimestamp: 2345678901
});

// Get top accounts
const topSenders = await scanner.statistics.getTopTransactionSender({
    spanType: "24h"
});
```

### Token Operations

```typescript
// Get token balance
const balance = await scanner.token.getTokenBalance({
    address: "0x1234...",
    contractaddress: "0x5678..."
});

// Get token supply
const supply = await scanner.token.getTokenSupply({
    contractaddress: "0x1234..."
});

// Get historical data
const history = await scanner.token.getTokenSupplyHistory({
    contractaddress: "0x1234...",
    blockno: 1000000
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