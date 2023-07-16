import {
  dbGetProduct,
  dbGetSale,
  dbGetSales,
  dbPostSale,
  dbUpdateSale,
} from "../modules/database";

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
  req.body.createdBy = authkey[1];
  await dbPostSale(authkey[0], req.body)
    .then(() => res.send({ msg: "Succes" }))
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
