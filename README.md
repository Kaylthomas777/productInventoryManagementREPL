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

# EXAMPLE SESSION

Here is an example session to show you what a run of your program should look like.

• Example Input is prepended with >
• Example output is not prepended with >.

> ADD WAREHOUSE 970
> ADD WAREHOUSE 45
> ADD WAREHOUSE 2
> LIST WAREHOUSES
> WAREHOUSES
> 970
> 45
> 2
> ADD PRODUCT "Sofia Vegara 5 Piece Living Room Set" 38538505-0767-453f-89afd11c809ebb3b
> ADD PRODUCT "BED" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
> ADD PRODUCT "TRUNK" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
> ERROR ADDING PRODUCT PRODUCT with SKU 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
> ALREADY EXISTS
> LIST PRODUCTS
> Sofia Vegara 5 Piece Living Room Set 38538505-0767-453f-89af-d11c809ebb3b
> BED 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
> STOCK 38538505-0767-453f-89af-d11c809ebb3b 970 1000
> LIST WAREHOUSE 970
> ITEM NAME ITEM_SKU
> QTY
> Sofia Vegara 5 Piece Living Room Set 38538505-0767-453f-89af-d11c809ebb3b
> 1000
