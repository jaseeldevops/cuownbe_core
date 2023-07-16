const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://jaseel1234:jaseel1234@cluster0.ghbxwm2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectDataBase() {
  await client.connect();
  console.log("Atles Connected");
}

const dbGetUser = async (data) => {
  const database = client.db(data.org);
  const collection = database.collection("users");
  return collection.findOne({ user: data.user, password: data.password });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
const dbGetProdects = async (org) => {
  const database = client.db(org);
  const collection = database.collection("products");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
const dbSearchProdects = async (org, search) => {
  const database = client.db(org);
  const collection = database.collection("products");
  let regex = new RegExp(search, "i");
  return collection
    .find({ deleted: { $ne: true }, name: { $regex: regex } })
    .toArray();
};
const dbGetProdect = async (org, data, _id) => {
  const database = client.db(org);
  const collection = database.collection("products");
  if (_id) return collection.findOne({ _id: new ObjectId(_id) });
  return collection.findOne(data);
};
const dbPostProdect = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("products");
  return collection.insertOne(data);
};
const dbUpdateProdect = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("products");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
const dbGetPurchases = async (org) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
const dbGetPurchase = async (org, _id) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.findOne({ _id: new ObjectId(_id) });
};
const dbPostPurchase = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.insertOne(data);
};
const dbUpdatePurchase = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
const dbGetSales = async (org) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
const dbGetSale = async (org, _id) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.findOne({ _id: new ObjectId(_id) });
};
const dbPostSale = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.insertOne(data);
};
const dbUpdateSale = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
const dbGetStaffs = async (org) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
const dbGetStaff = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.findOne(data);
};
const dbPostStaff = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.insertOne(data);
};
const dbUpdateStaff = async (org, data) => {
  const database = client.db(org);
  const collection = database.collection("users");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////

module.exports = {
  connectDataBase,
  dbGetUser,
  dbGetProdects,
  dbSearchProdects,
  dbGetProdect,
  dbPostProdect,
  dbUpdateProdect,
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
};
