const {Router} = require("express");
const admin = require("firebase-admin");
const {v4} = require("uuid");
// eslint-disable-next-line new-cap
const router = Router();
admin.initializeApp({
  credential: admin.credential.cert(
      "./burger-demo-44d52-firebase-adminsdk-d3e9m-806a649e4e.json"
  ),
  databaseURL: "https://burger-demo-44d52-default-rtdb.firebaseio.com",
});
const db = admin.firestore();
// LOGIN
router.post("/api/users", async (req, res) => {
  try {
    const query = await db.collection("users").get();
    const docs = query.docs;
    const response = {};
    const isOk = docs.some((item) => {
      if (
        req.body.username === item.data().username &&
        req.body.password === item.data().password
      ) {
        (response.id = item.id),
        (response.name = item.data().name),
        (response.username = item.data().username);
        return true;
      }
      return false;
    });
    if (isOk) {
      return res.status(200).json(response);
    } else {
      return res.status(401).json({message: "Wrong"});
    }
  } catch (error) {
    throw new Error("Wrong username or password");
  }
});


// Register
router.post("/api/register", async (req, res) => {
  try {
    const {name, username, password} = req.body;
    const query = db.collection("users");
    const check = await query.get();
    const check2 = check.docs;
    const response = check2.filter((item) => username === item.data().username);
    if (response.length !== 0) {
      return res.status(401).json({message: "Accont is exist"});
    } else {
      const newAccount = {name, username, password};
      await query.doc(`/${v4()}/`).create(newAccount);
      return res.status(201).json(newAccount);
    }
  } catch (error) {
    throw new Error("Wrong username or password");
  }
});
// ADD order
router.post("/api/addOrder", async (req, res) => {
  try {
    const {idUser, order, price, contact} = req.body;
    const query = db.collection("orders");
    const newOrder = {idUser, order, price, contact};
    await query.doc(`/${v4()}/`).create(newOrder);
    return res.status(201).json(newOrder);
  } catch (error) {
    throw new Error("Some Think went wrong");
  }
});
// find order by id user
router.get("/api/userOrder/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const limit = req.query.limit;
    const page = req.query.page;
    const query = db.collection("orders");
    const check = await query.get();
    const check2 = check.docs;
    const arr = [];
    check2.forEach((item) => {
      if (idUser === item.data().idUser) {
        arr.push(item.data());
      }
    });
    const arrResponse = arr.slice((page - 1) * limit, page * limit);
    const pages = Math.trunc(arr.length / limit + 1);
    return res.status(200).json({arrResponse, limit, page, pages});
  } catch (error) {
    throw new Error("Some Think went wrong");
  }
});
module.exports = router;
