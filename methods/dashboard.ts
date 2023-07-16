export const getDashBoardData = async (req: any, res: any) => {
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
  }