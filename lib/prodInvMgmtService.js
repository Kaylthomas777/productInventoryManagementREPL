var pimMethodsArr = [
  "ADD PRODUCT",
  "ADD WAREHOUSE",
  "STOCK",
  "UNSTOCK",
  "LIST PRODUCTS",
  "LIST WAREHOUSES",
  "LIST WAREHOUSE",
];
var PimService = {
  productCatalog: {},

  warehouses: {},

  addProduct: function (productName, sku) {
    if (this.productCatalog[sku]) {
      console.log(`ERROR ADDING PRODUCT with SKU ${sku} - ALREADY EXISTS`);
    } else {
      this.productCatalog[sku] = productName;
    }
  },

  addWarehouse: function (warehouseID, stockLimit = 0) {
    if (this.warehouses[warehouseID]) {
      console.log(
        `ERROR ADDING WAREHOUSE with ID ${warehouseID} - ALREADY EXISTS`
      );
    } else if (stockLimit > 0) {
      this.warehouses[warehouseID] = {
        StockLimit: stockLimit,
        Inventory: {},
      };
    } else {
      this.warehouses[warehouseID] = {
        StockLimit: "No Stock Limit",
        Inventory: {},
      };
    }
  },

  stock: function (sku, warehouseID, quantity) {
    if (!this.productCatalog[sku]) {
      console.log(`ERROR ADDING SKU with ID ${sku} - SKU DOES NOT EXISTS`);
    } else if (!this.warehouses[warehouseID]) {
      console.log(
        `ERROR ADDING SKU with ID ${sku} - WAREHOUSE DOES NOT EXISTS`
      );
    } else {
      let stkLmt = this.warehouses[warehouseID].StockLimit;
      let currentQuantity = this.warehouses[warehouseID].Inventory[sku] || 0;
      if (currentQuantity + quantity <= stkLmt) {
        this.warehouses[warehouseID].Inventory[sku] =
          currentQuantity + quantity;
      } else if (currentQuantity === stkLmt) {
        console.log(
          `ERROR STOCKING SKU with ID ${sku} - STOCKING LIMIT REACHED FOR ITEM`
        );
      } else {
        this.warehouses[warehouseID].Inventory[sku] = stkLmt;
      }
    }
  },

  unstock: function (sku, warehouseID, quantity) {
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
        this.warehouses[warehouseID].Inventory[sku] =
          currentQuantity - quantity;
      } else {
        this.warehouses[warehouseID].Inventory[sku] = 0;
      }
    }
  },

  listProducts: function () {
    for (product in this.productCatalog) {
      console.log(product, ":", this.productCatalog[product]);
    }
  },

  listWarehouses: function () {
    for (warehouse in this.warehouses) {
      console.log(`Warehouse# ${warehouse}`);
    }
  },

  listWarehouse: function (warehouseID) {
    console.log(`Warehouse Information for warehouse#: ${warehouseID}`);
    console.log(this.warehouses[warehouseID]);
  },
};

function parseAddProductInput() {}
function parseAddWarehouseInput() {}
function parseStockInput() {}
function parseUnstockInput() {}
function parseListProductsInput() {}
function parseListWarehousesInput() {}
function parseListWarehouseInput() {}

function parseUserInput(input) {
  pimMethodsArr.forEach((method) => {
    let re = new RegExp(`${method}`);
    if (re.test(input.toUpperCase())) {
      switch (method) {
        case "ADD PRODUCT":
          parseAddProductInput(input);
          break;
        case "ADD WAREHOUSE":
          parseAddWarehouseInput(input);
          break;
        case "STOCK":
          parseStockInput(input);
          break;
        case "UNSTOCK":
          parseUnstockInput(input);
          break;
        case "LIST PRODUCTS":
          parseListProductsInput(input);
          break;
        case "LIST WAREHOUSES":
          parseListWarehousesInput(input);
          break;
        case "LIST WAREHOUSE":
          parseListWarehouseInput(input);
          break;
        default:
          console.log(
            "Input Error, please provide input in the following formats"
          );
      }
    }
  });
}

module.exports = { parseUserInput, PimService };
