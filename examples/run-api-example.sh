#!/bin/bash

# Get the path from command line argument or use default
PATH_ARG=${1:-"/statistics/tps"}

# Run the example with the path argument
LOG_LEVEL=silent ts-node examples/openapi-usage.ts "$PATH_ARG" 