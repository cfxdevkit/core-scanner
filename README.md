# @cfxdevkit/confluxscan-espace

A TypeScript library for interacting with Conflux eSpace Scanner API.

## Installation

```bash
npm install @cfxdevkit/confluxscan-espace
# or
yarn add @cfxdevkit/confluxscan-espace
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

## Usage

```typescript
import { ESpaceScanner, ESpaceScannerWrapper } from "@cfxdevkit/confluxscan-espace";

// Initialize scanner with configuration
const scanner = new ESpaceScannerWrapper({ 
    target: "mainnet", 
    apiKey: "YOUR_API_KEY" // optional
});

// Get contract ABI with formatted output
const { formatted, raw } = await scanner.getContractABI("0x1234...");
console.log(formatted); // Pretty printed output
console.log(raw); // Raw data

// Get token statistics
const stats = await scanner.getTokenHolderStats("0x1234...");

// Use formatters directly
import { NumberFormatter, DateFormatter } from "@cfxdevkit/confluxscan-espace";

// Format CFX amounts
console.log(NumberFormatter.formatCFX("1000000000000000000")); // "1 CFX"

// Format timestamps
console.log(DateFormatter.formatTimestamp(1707307200)); // "2024-02-07 12:00:00"
```

## Project Structure

```
├── src/
│   ├── core/         # Core API implementation
│   ├── formatters/   # Number and date formatting utilities
│   ├── wrapper/      # High-level wrapper with formatting
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── examples/         # Usage examples
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

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Generate documentation
npm run docs

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run example
npm run example

# Clean build artifacts
npm run clean
```

## Testing

The package includes a comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Documentation

API documentation is generated using TypeDoc:

```bash
# Generate documentation
npm run docs
```

The documentation will be available in the `docs` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR:
- Passes all tests
- Has updated documentation
- Follows the existing code style
- Includes relevant tests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/cfxdevkit/espace-scanner)
- [Issue Tracker](https://github.com/cfxdevkit/espace-scanner/issues)
- [Documentation](https://cfxdevkit.github.io/espace-scanner)

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Open a new issue if needed 