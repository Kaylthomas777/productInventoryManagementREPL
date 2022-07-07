# Product Inventory Mangement REPL

A command line REPL to manage product inventory written in NodeJS

# How to run my program

1. Clone the repository
2. npm install
3. npm start
4. EOF to quit the REPL

## Commands

- ADD PRODUCT "PRODUCT NAME" SKU
- ADD WAREHOUSE WAREHOUSE# [STOCK_LIMIT]
- STOCK SKU WAREHOUSE# QTY
- UNSTOCK SKU WAREHOUSE# QTY
- LIST PRODUCTS
- LIST WAREHOUSES
- LIST WAREHOUSE WAREHOUSE#

## Command History

- Written asynchrounously to `commandHistory.txt` in batches of 2 commands

## Testing

- Run tests in root directory using `npm test`
