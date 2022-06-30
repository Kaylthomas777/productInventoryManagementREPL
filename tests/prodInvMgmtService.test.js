const ps = require("../lib/prodInvMgmtService");
const pimServiceObj = Object.create(ps.PimService);

const validAddProductCases = [
  [["Product1", "SKU1"], "Product1"],
  [["Product2", "SKU2"], "Product2"],
  [["Product3", "SKU3"], "Product3"],
  [["Product4", "SKU4"], "Product4"],
  [["Product5", "SKU5"], "Product5"],
];

test.each(validAddProductCases)("SHOULD add product", (product, expected) => {
  let productName = product[0];
  let sku = product[1];
  pimServiceObj.addProduct(productName, sku);
  expect(pimServiceObj.productCatalog[sku]).toBe(expected);
});
