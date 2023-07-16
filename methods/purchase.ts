import {
  dbGetPurchases,
  dbGetPurchase,
  dbPostPurchase,
  dbUpdatePurchase,
  dbGetProduct,
  dbUpdateProduct,
} from "../modules/database";
import { Purchase } from "../modules/product";

export const getAllPurchases = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetPurchases(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getSinglePurchase = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetPurchase(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProduct(authkey[0], {}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const addSinglePurchase = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var purchase = new Purchase();
  purchase = {
    ...purchase,
    ...req.body,
    createdBy: authkey[1],
    createdAt: Date(),
  };
  await dbPostPurchase(authkey[0], purchase)
    .then(() => {
      res.send({ msg: "Succes" });
      for (let i = 0; i < purchase.list.length; i++) {
        dbGetProduct(authkey[0], {}, purchase.list[i].product)
          .then((dbRes) => {
            const body = {
              _id: purchase.list[i].product,
              stock: dbRes.stock + Number(purchase.list[i].qty),
              purchasePrice: Number(purchase.list[i].price) * 100,
            };
            dbUpdateProduct(authkey[0], body);
          })
          .catch((e) => {});
      }
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};

export const editSinglePurchase = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdatePurchase(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};

export const deleteSinglePurchase = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdatePurchase(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
