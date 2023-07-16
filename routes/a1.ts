const express = require("express");
import {
  dbGetUser,
  dbGetProduct,
  dbGetSales,
  dbGetSale,
  dbPostSale,
  dbUpdateSale,
  dbGetStaffs,
  dbGetStaff,
  dbPostStaff,
  dbUpdateStaff,
} from "../modules/database";
import {
  getAllPurchases,
  getSinglePurchase,
  addSinglePurchase,
  editSinglePurchase,
  deleteSinglePurchase,
} from "../methods/purchase";
import {
  getAllProducts,
  addSingleProduct,
  editSingleProduct,
  deleteSingleProduct,
  getProductsBySearch,
} from "../methods/product";
import {
  getAllSales,
  getSingleSale,
  addSingleSale,
  editSingleSale,
  deleteSingleSale,
} from "../methods/sale";
export const a1: any = express.Router();
a1.post("/login", async (req: any, res: any) => {
  const user = await dbGetUser(req.body);
  if (user === null) res.status(401).send({ msg: "Wrong User Details" });
  else
    res.send({
      user: user.user,
      org: req.body.org,
      id: user._id,
      name: user.name,
    });
});

// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/dashboard", async (req: any, res: any) => {
  //   const authkey = req.headers.authkey.split(" ");
  //   req.body.creater = authkey[1];
  //   await dbGetProducts(authkey[0])
  //     .then((dbRes) => res.send(dbRes))
  //     .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
  res.send([
    { icon: "", title: "Today Sale", value: "3300rs / 30" },
    { icon: "", title: "Today Purchase", value: "3000rs / 30" },
    { icon: "", title: "Out of Stock Items", value: "10/100" },
    { icon: "", title: "Out of Stock Items", value: "10/100" },
  ]);
});

// ////////////////////////////////////////////////////////////////
a1.get("/products", getAllProducts);
a1.get("/products/:search", getProductsBySearch);
a1.post("/product", addSingleProduct);
a1.put("/product", editSingleProduct);
a1.delete("/product/:_id", deleteSingleProduct);
// ////////////////////////////////////////////////////////////////
a1.get("/purchases", getAllPurchases);
a1.get("/purchase/:_id", getSinglePurchase);
a1.post("/purchase", addSinglePurchase);
a1.put("/purchase", editSinglePurchase);
a1.delete("/purchase/:_id", deleteSinglePurchase);
// ////////////////////////////////////////////////////////////////
a1.get("/sales",getAllSales );
a1.get("/sale/:_id",getSingleSale );
a1.post("/sale",addSingleSale );
a1.put("/sale",editSingleSale );
a1.delete("/sale/:_id",deleteSingleSale );

// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/staffs", async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetStaffs(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});

a1.post("/staff", async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.createdBy = authkey[1];
  await dbGetStaff(authkey[0], { user: req.body.user })
    .then(async (dbRes) => {
      if (dbRes === null)
        await dbPostStaff(authkey[0], req.body)
          .then(() => res.send({ msg: "Succes" }))
          .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Name already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.put("/staff", async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdateStaff(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.delete("/staff/:_id", async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdateStaff(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});
