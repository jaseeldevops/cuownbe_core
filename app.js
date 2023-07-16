const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 9000;

var a1 = require("./routes/a1");
const { connectDataBase } = require("./modules/database");
connectDataBase();

app.use("/a1", a1);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Express app running on port ${port}!`));
