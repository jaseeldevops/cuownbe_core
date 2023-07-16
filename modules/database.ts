import { Product } from "./product";

const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://jaseel1234:jaseel1234@cluster0.ghbxwm2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export const connectDataBase = async () => {
  await client.connect();
  console.log("Atles Connected");
};

export const dbGetUser = async (data: any) => {
  const database = client.db(data.org);
  const collection = database.collection("users");
  return collection.findOne({ user: data.user, password: data.password });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
export const dbGetProducts = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("products");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbSearchProducts = async (org: any, search: any) => {
  const database = client.db(org);
  const collection = database.collection("products");
  let regex = new RegExp(search, "i");
  return collection
    .find({ deleted: { $ne: true }, name: { $regex: regex } })
    .toArray();
};
export const dbGetProduct = async (org: any, data: any, _id?: any) => {
  const database = client.db(org);
  const collection = database.collection("products");
  if (_id) return collection.findOne({ _id: new ObjectId(_id) });
  return collection.findOne(data);
};
export const dbPostProduct = async (org: any, data: Product) => {
  const database = client.db(org);
  const collection = database.collection("products");
  return collection.insertOne(data);
};
export const dbUpdateProduct = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("products");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
export const dbGetPurchases = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbGetPurchase = async (org: any, _id: any) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.findOne({ _id: new ObjectId(_id) });
};
export const dbPostPurchase = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  return collection.insertOne(data);
};
export const dbUpdatePurchase = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("purchases");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
export const dbGetSales = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbGetSale = async (org: any, _id: any) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.findOne({ _id: new ObjectId(_id) });
};
export const dbPostSale = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  return collection.insertOne(data);
};
export const dbUpdateSale = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("sales");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
export const dbGetStaffs = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbGetStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.findOne(data);
};
export const dbPostStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.insertOne(data);
};
export const dbUpdateStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
