const express = require("express");
const {
  dbGetUser,
  dbPostProdect,
  dbGetProdects,
  dbUpdateProdect,
  dbGetProdect,
  dbGetPurchases,
  dbGetPurchase,
  dbPostPurchase,
  dbUpdatePurchase,
  dbGetSales,
  dbGetSale,
  dbPostSale,
  dbUpdateSale,
  dbGetStaffs,
  dbGetStaff,
  dbPostStaff,
  dbUpdateStaff,
  dbSearchProdects,
} = require("../modules/database");
const a1 = express.Router();

a1.post("/login", async (req, res) => {
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
a1.get("/dashboard", async (req, res) => {
  //   const authkey = req.headers.authkey.split(" ");
  //   req.body.creater = authkey[1];
  //   await dbGetProdects(authkey[0])
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
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/products", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetProdects(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});
a1.get("/products/:search", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbSearchProdects(authkey[0], req.params.search)
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});

a1.post("/product", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.createdBy = authkey[1];
  await dbGetProdect(authkey[0], { name: req.body.name })
    .then(async (dbRes) => {
      if (dbRes === null)
        await dbPostProdect(authkey[0], req.body)
          .then(() => res.send({ msg: "Succes" }))
          .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Name already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.put("/product", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdateProdect(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.delete("/product/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdateProdect(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/purchases", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetPurchases(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});
a1.get("/purchase/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetPurchase(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProdect(authkey[0], {}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});
a1.post("/purchase", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.createdBy = authkey[1];
  await dbPostPurchase(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});
a1.put("/purchase", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdatePurchase(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});
a1.delete("/purchase/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdatePurchase(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/sales", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSales(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});
a1.get("/sale/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSale(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProdect(authkey[0], {}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});
a1.post("/sale", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.createdBy = authkey[1];
  await dbPostSale(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.put("/sale", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdateSale(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.delete("/sale/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdateSale(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});

// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
a1.get("/staffs", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetStaffs(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
});

a1.post("/staff", async (req, res) => {
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

a1.put("/staff", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdateStaff(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
});

a1.delete("/staff/:_id", async (req, res) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdateStaff(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
});

module.exports = a1;
