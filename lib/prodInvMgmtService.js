const fs = require("fs");
const pimMethodsArr = [
  "ADD PRODUCT",
  "ADD WAREHOUSE",
  "UNSTOCK",
  "STOCK",
  "LIST PRODUCTS",
  "LIST WAREHOUSES",
  "LIST WAREHOUSE",
];

var CmdHistory = {
  batchNum: 1,
  1: [],
};
var PimService = {
  productCatalog: {},

  warehouses: {},

  addProduct: function (productName, sku) {
    if (this.productCatalog[sku.toUpperCase()]) {
      console.log(`ERROR ADDING PRODUCT with SKU ${sku} - ALREADY EXIST`);
    } else {
      this.productCatalog[sku.toUpperCase()] = productName;
    }
  },

  addWarehouse: function (warehouseID, stockLimit = 0) {
    if (this.warehouses[warehouseID]) {
      console.log(
        `ERROR ADDING WAREHOUSE with ID ${warehouseID} - ALREADY EXIST`
      );
    } else if (Number(stockLimit) > 0) {
      this.warehouses[warehouseID] = {
        StockLimit: Number(stockLimit),
        Inventory: {},
      };
      console.log(
        `WAREHOUSE#${warehouseID} `,
        this.warehouses[warehouseID],
        "was added!"
      );
    } else {
      this.warehouses[warehouseID] = {
        StockLimit: "No Stock Limit",
        Inventory: {},
      };
      console.log(
        `WAREHOUSE#${warehouseID} `,
        this.warehouses[warehouseID],
        "was added!"
      );
    }
  },

  stock: function (sku, warehouseID, quantity) {
    quantity = Number(quantity);
    if (!this.productCatalog[sku]) {
      console.log(`ERROR ADDING SKU with ID ${sku} - SKU DOES NOT EXIST`);
    } else if (!this.warehouses[warehouseID]) {
      console.log(`ERROR ADDING SKU with ID ${sku} - WAREHOUSE DOES NOT EXIST`);
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
      } else if (stkLmt === "No Stock Limit") {
        this.warehouses[warehouseID].Inventory[sku] =
          currentQuantity + quantity;
      } else {
        this.warehouses[warehouseID].Inventory[sku] = stkLmt;
      }
    }
  },

  unstock: function (sku, warehouseID, quantity) {
    quantity = Number(quantity);
    if (!this.productCatalog[sku]) {
      console.log(`ERROR UNSTOCKING SKU with ID ${sku} - SKU DOES NOT EXIST`);
    } else if (!this.warehouses[warehouseID]) {
      console.log(
        `ERROR UNSTOCKING SKU with ID ${sku} - WAREHOUSE DOES NOT EXIST`
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

const pimServiceObj = Object.create(PimService);
const cmdHistoryObj = Object.create(CmdHistory);

function parseAddProductInput(stringInput) {
  const regex = /"(.*?)"/gi;
  let productName = stringInput.match(regex)[0].replaceAll('"', "");
  let sku = stringInput.split(` "${productName}" `)[1].replace("\n", "");
  pimServiceObj.addProduct(productName, sku);
}

function parseAddWarehouseInput(stringInput) {
  let [warehouseID, stockLimit] = stringInput
    .trim()
    .toUpperCase()
    .split("ADD WAREHOUSE ")
    .join("")
    .split(" ");
  pimServiceObj.addWarehouse(warehouseID, stockLimit);
}

function parseStockInput(stringInput) {
  let [sku, warehouseID, quantity] = stringInput
    .trim()
    .toUpperCase()
    .split("STOCK ")
    .join("")
    .split(" ");
  pimServiceObj.stock(sku, warehouseID, quantity);
}

function parseUnstockInput(stringInput) {
  let [sku, warehouseID, quantity] = stringInput
    .trim()
    .toUpperCase()
    .split("UNSTOCK ")
    .join("")
    .split(" ");
  pimServiceObj.unstock(sku, warehouseID, quantity);
}

function parseListProductsInput() {
  pimServiceObj.listProducts();
}

function parseListWarehousesInput() {
  pimServiceObj.listWarehouses();
}

function parseListWarehouseInput(stringInput) {
  let [warehouseID] = stringInput
    .trim()
    .toUpperCase()
    .split("LIST WAREHOUSE ")
    .join("")
    .split(" ");
  pimServiceObj.listWarehouse(warehouseID);
}

function updateCommandHistory(input) {
  let batchArr = cmdHistoryObj[cmdHistoryObj.batchNum];
  if (batchArr.length === 2) {
    let str = `Batch ${cmdHistoryObj.batchNum}\n${batchArr[0]}${batchArr[1]}`;
    fs.appendFile("commandHistory.txt", `${str}\n`, (err) => {
      if (err) throw err;
    });
    cmdHistoryObj.batchNum += 1;
    cmdHistoryObj[cmdHistoryObj.batchNum] = [input];
  } else {
    batchArr.push(input);
  }
}

function parseUserInput(input) {
  updateCommandHistory(input);
  let methodToInvoke = "";

  for (let i = 0; i < pimMethodsArr.length; i++) {
    let method = pimMethodsArr[i];
    let re = new RegExp(`${method}`, "i");
    if (re.test(input)) {
      methodToInvoke = method;
      break;
    }
  }
  switch (methodToInvoke) {
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
      parseListProductsInput();
      break;
    case "LIST WAREHOUSES":
      parseListWarehousesInput();
      break;
    case "LIST WAREHOUSE":
      parseListWarehouseInput(input);
      break;
    default:
      console.log("Input Error, please provide input in the following formats");
  }
}

function myEval(cmd, context, filename, callback) {
  callback(null, parseUserInput(cmd));
}

module.exports = { myEval, PimService };
