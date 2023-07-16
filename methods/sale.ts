import {
  dbGetProduct,
  dbGetSale,
  dbGetSales,
  dbPostSale,
  dbUpdateProduct,
  dbUpdateSale,
} from "../modules/database";
import { Sale } from "../modules/product";

export const getAllSales = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSales(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
export const getSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSale(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProduct(authkey[0], {}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
export const addSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var sale = new Sale();
  sale = {
    ...sale,
    ...req.body,
    createdBy: authkey[1],
    createdAt: Date(),
  };
  await dbPostSale(authkey[0], sale)
    .then(() => {
      res.send({ msg: "Succes" });
      for (let i = 0; i < sale.list.length; i++) {
        dbGetProduct(authkey[0], {}, sale.list[i].product).then((dbRes) => {
          const body = {
            _id: sale.list[i].product,
            stock: dbRes.stock - Number(sale.list[i].qty),
            sallingPrice: Number(sale.list[i].price) * 100,
          };
          dbUpdateProduct(authkey[0], body);
        });
      }
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const editSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.updatedBy = authkey[1];
  await dbUpdateSale(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const deleteSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deleted = true;
  await dbUpdateSale(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
