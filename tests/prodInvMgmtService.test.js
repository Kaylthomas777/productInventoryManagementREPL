const ps = require("../lib/prodInvMgmtService");
const pimServiceObj = Object.create(ps.PimService);

test("Testing the test", () => {
  pimServiceObj.addProduct("Product", 1);
  expect(pimServiceObj.productCatalog[1]).toBe("Product");
});
