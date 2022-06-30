var pimMethodsArr = [
  "ADD PRODUCT",
  "ADD WAREHOUSE",
  "STOCK",
  "UNSTOCK",
  "LIST PRODUCTS",
  "LIST WAREHOUSES",
  "LIST WAREHOUSE",
];
var pimServiceObj = {};
pimServiceObj.productCatalog = {};
pimServiceObj.warehouses = {};

pimServiceObj.addProduct = function (productName, sku) {
  if (this.productCatalog[sku]) {
    console.log(`ERROR ADDING PRODUCT with SKU ${sku} - ALREADY EXISTS`);
  } else {
    this.productCatalog[sku] = productName;
  }
};

pimServiceObj.addWarehouse = function (warehouseID, stockLimit = 0) {
  if (this.warehouses[warehouseID]) {
    console.log(
      `ERROR ADDING WAREHOUSE with ID ${warehouseID} - ALREADY EXISTS`
    );
  } else if (stockLimit > 0) {
    this.warehouses[warehouseID] = {
      StockLimit: "No Stock Limit",
      Inventory: {},
    };
  } else {
    this.warehouses[warehouseID] = {
      StockLimit: stockLimit,
      Inventory: {},
    };
  }
};

pimServiceObj.stock = function (sku, warehouseID, quantity) {
  if (!this.productCatalog[sku]) {
    console.log(`ERROR ADDING SKU with ID ${sku} - SKU DOES NOT EXISTS`);
  } else if (!this.warehouses[warehouseID]) {
    console.log(`ERROR ADDING SKU with ID ${sku} - WAREHOUSE DOES NOT EXISTS`);
  } else {
    let stkLmt = this.warehouses[warehouseID].StockLimit;
    let currentQuantity = this.warehouses[warehouseID].Inventory[sku];
    if (currentQuantity + quantity <= stkLmt) {
      this.warehouses[warehouseID].Inventory[sku] = currentQuantity + quantity;
    } else {
      this.warehouses[warehouseID].Inventory[sku] = stkLmt - currentQuantity;
    }
  }
};

pimServiceObj.unstock = function (sku, warehouseID, quantity) {
  if (!this.productCatalog[sku]) {
    console.log(`ERROR UNSTOCKING SKU with ID ${sku} - SKU DOES NOT EXISTS`);
  } else if (!this.warehouses[warehouseID]) {
    console.log(
      `ERROR UNSTOCKING SKU with ID ${sku} - WAREHOUSE DOES NOT EXISTS`
    );
  } else if (!this.warehouses[warehouseID].Inventory[sku]) {
    console.log(
      `ERROR UNSTOCKING SKU with ID ${sku} - WAREHOUSE DOES NOT HAVE ITEM IN INVENTORY`
    );
  } else {
    let currentQuantity = this.warehouses[warehouseID].Inventory[sku];
    if (currentQuantity - quantity >= 0) {
      this.warehouses[warehouseID].Inventory[sku] = currentQuantity - quantity;
    } else {
      this.warehouses[warehouseID].Inventory[sku] = 0;
    }
  }
};

pimServiceObj.listProducts = function () {
  for (product in this.productCatalog) {
    console.log(product, ":", this.productCatalog[product]);
  }
};

pimServiceObj.listWarehouses = function () {
  for (warehouse in this.warehouses) {
    console.log(`Warehouse# ${warehouse}`);
  }
};

pimServiceObj.listWarehouse = function (warehouseID) {
  console.log(`Warehouse Information for warehouse#: ${warehouseID}`);
  console.log(this.warehouses[warehouseID]);
};

function parseUserInput(input) {
  const re = new RegExp("add product", "i");
}

function myEval(uInput) {
  parseUserInput(uInput);
  console.log(uInput.split("ADD PRODUCT "));
}

module.exports = { myEval };
