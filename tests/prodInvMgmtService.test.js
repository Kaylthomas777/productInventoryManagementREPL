const ps = require("../lib/prodInvMgmtService");
const pimServiceObj = Object.create(ps.PimService);

const addProductTestCases = [
  [["Product1", "SKU1"], "Product1"],
  [["Product2", "SKU2"], "Product2"],
  [["Product3", "SKU3"], "Product3"],
  [["Product4", "SKU4"], "Product4"],
  [["Product5", "SKU5"], "Product5"],
  [["Product5", "SKU5"], "Product5"],
];

test.each(addProductTestCases)(
  "SHOULD add product with no sku duplication allowed",
  (product, expected) => {
    let productName = product[0];
    let sku = product[1];
    pimServiceObj.addProduct(productName, sku);
    expect(pimServiceObj.productCatalog[sku]).toBe(expected);
  }
);

test("SHOULD list all products", () => {
  expect(addProductTestCases.length - 1).toBe(
    Object.keys(pimServiceObj.productCatalog).length
  );
});

const addWarehouseTestCases = [
  [["111"], { StockLimit: "No Stock Limit" }],
  [["222", "10"], { StockLimit: 10 }],
  [["333", "20"], { StockLimit: 20 }],
  [["333", "20"], { StockLimit: 20 }],
];

test.each(addWarehouseTestCases)(
  "SHOULD add warehouses with no warehouseID duplication allowed",
  (args, expected) => {
    let warehouseID = args[0];
    let stkLmt = args[1];
    pimServiceObj.addWarehouse(warehouseID, stkLmt);
    if (!stkLmt) {
      expect(pimServiceObj.warehouses[warehouseID].StockLimit).toBe(
        expected.StockLimit
      );
    } else {
      expect(pimServiceObj.warehouses[warehouseID].StockLimit).toBe(
        expected.StockLimit
      );
    }
  }
);

test("SHOULD list all warehouses", () => {
  expect(addWarehouseTestCases.length - 1).toBe(
    Object.keys(pimServiceObj.warehouses).length
  );
});

const listWarehouseTestCases = [
  [["111"], ""],
  [["222", "10"], ""],
  [["333", "20"], ""],
  [["333", "20"], ""],
];

test.each(listWarehouseTestCases)(
  "SHOULD list a specific warehouse",
  (warehouse, expected) => {
    console.log(warehouse[0]);
    let bool = pimServiceObj.warehouses[warehouse[0]] ? true : false;
    expect(bool).toBe(true);
  }
);

const stockTestCases = [
  [["SKU1", "111", 1000], 1000],
  [["SKU1", "222", 7], 7],
  [["SKU1", "333", 50], 20],
];

test.each(stockTestCases)(
  "SHOULD stock items to a specific warehouse and not go over stock limit if there is one",
  (args, expected) => {
    let sku = args[0];
    let warehouseID = args[1];
    let quantity = args[2];
    pimServiceObj.stock(sku, warehouseID, quantity);
    let skuQtyInInventory =
      pimServiceObj.warehouses[warehouseID].Inventory[sku];
    expect(skuQtyInInventory).toBe(expected);
  }
);

const unStockTestCases = [
  [["SKU1", "111", 1000], 0],
  [["SKU1", "222", 4], 3],
  [["SKU1", "333", 50], 0],
];

test.each(unStockTestCases)(
  "SHOULD unstock items at a specific warehouse and not go under 0",
  (args, expected) => {
    let sku = args[0];
    let warehouseID = args[1];
    let quantity = args[2];
    pimServiceObj.unstock(sku, warehouseID, quantity);
    let skuQtyInInventory =
      pimServiceObj.warehouses[warehouseID].Inventory[sku];
    expect(skuQtyInInventory).toBe(expected);
  }
);
