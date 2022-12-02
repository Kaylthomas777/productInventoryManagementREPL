# Product Inventory Mangement REPL

A command line REPL to manage product inventory written in NodeJS

# How to run my program

1. Clone the repository
2. npm install
3. npm start
4. EOF to quit the REPL

The application takes in user input one line at a time.

## Commands

Bold text denotes text that will be entered as-is, italics denote arguments that will be
replaced by a value. Optional arguments are surrounded by square brackets ([]).

- **ADD PRODUCT** *"PRODUCT NAME"* *SKU*
- **ADD WAREHOUSE** *WAREHOUSE#* [STOCK_LIMIT]
- **STOCK** *SKU* *WAREHOUSE#* *QTY*
- **UNSTOCK** *SKU* *WAREHOUSE#* *QTY*
- **LIST PRODUCTS**
- **LIST WAREHOUSES**
- **LIST WAREHOUSE** *WAREHOUSE#*

## Command History

- Log of commands is kept in the product management software so we can debug issues that arose during manual data entry. 
- Written asynchrounously to `commandHistory.txt` in batches of 2 commands

## Testing

- Run tests in root directory using `npm test`

## EXAMPLE SESSION

• Example Input is prepended with ->

• Example output is not prepended with ->.

-> ADD WAREHOUSE 970 10
WAREHOUSE#970  { StockLimit: 10, Inventory: {} } was added!

-> ADD WAREHOUSE 45
WAREHOUSE#45  { StockLimit: 'No Stock Limit', Inventory: {} } was added!

-> ADD WAREHOUSE 2
WAREHOUSE#2  { StockLimit: 'No Stock Limit', Inventory: {} } was added!

> LIST WAREHOUSES
Warehouse# 2
Warehouse# 45
Warehouse# 970

-> ADD PRODUCT "Sofia Vegara 5 Piece Living Room Set" 38538505-0767-453f-89af-d11c809ebb3b
-> ADD PRODUCT "BED" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
-> ADD PRODUCT "TRUNK" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
ERROR ADDING PRODUCT PRODUCT with SKU 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70 - ALREADY EXISTS

-> LIST PRODUCTS
38538505-0767-453F-89AF-D11C809EBB3B : Sofia Vegara 5 Piece Living Room Set
5CE956FA-A71E-4BFB-B6AE-5EEAA5EB0A70 : BED

-> STOCK 38538505-0767-453F-89AF-D11C809EBB3B 970 1000
-> LIST WAREHOUSE 970
ITEM NAME ITEM_SKU
QTY
{
  StockLimit: 10,
  Inventory: { '38538505-0767-453F-89AF-D11C809EBB3B': 10 }
}
