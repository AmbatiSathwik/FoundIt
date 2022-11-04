require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./model/user");
const auth = require("./middleware/auth");

const LostItem = require("./model/lostitem");
const FoundItem = require("./model/founditem");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, username, email, roll, password } = req.body;

    if (!(firstname && lastname && username && email && roll && password)) {
      res.status(400).send({ error: "Require all fields" });
    }

    const isExisting = await User.findOne({ roll });
    if (isExisting) {
      res.status(401).send({ error: "User Already exists" });
    }
    const UsernameAvailable = await User.findOne({ username });
    if (UsernameAvailable) {
      res
        .status(402)
        .send({ error: "Username not available. Please use new one." });
    }

    const EncryptPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      sid: roll,
      firstname,
      lastname,
      username,
      roll,
      email,
      password: EncryptPassword,
    });

    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });

    user.jwttoken = token;

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send({ error: "Require all fields" });
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "10h",
      });

      user.jwttoken = token;
      user.password = undefined;
      res.status(201).json(user);
    }

    res.status(400).send({ error: "Incorrect username or password" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/dashboard", auth, (req, res) => {
  res.send("This is dashboard, Not accesible for everyone.");
});

app.post("/addlostItems", auth, async (req, res) => {
  try {
    const { itemname, type, details, lsid, date } = req.body;
    await LostItem.create({
      itemname,
      type,
      details,
      lsid,
      date,
      isDiscovered: false,
    });
    res.status(201).send({ success: "Item added successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/removelostItems", auth, async (req, res) => {
  const { id } = req.body;
  await LostItem.deleteOne({
    _id: id,
  })
    .then(() => {
      res.status(201).send({ success: "Item deleted successfully" });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/addfoundItems", auth, async (req, res) => {
  const { itemname, type, details, fsid, date } = req.body;
  await FoundItem.create({
    itemname,
    type,
    details,
    fsid,
    date,
    isDiscovered: false,
  });
  res.status(201).send({ success: "Item added successfully" });
});

app.post("/removefoundItems", auth, async (req, res) => {
  const { id } = req.body;
  await FoundItem.deleteOne({
    _id: id,
  })
    .then(() => {
      res.status(201).send({ success: "Item deleted successfully" });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/alllostitems", async (req, res) => {
  const items = await LostItem.find();
  res.status(200).send(items);
});

app.get("/allfounditems", async (req, res) => {
  const items = await FoundItem.find();
  res.status(200).send(items);
});

app.post("/userdetails", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(400).send({ error: "No user Found" });
    }
    user.password = undefined;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: "No user Found" });
  }
});

app.post("/getuserlostitems", async (req, res) => {
  try {
    const { id } = req.body;

    const items = await LostItem.find({ lsid: id });
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getuserfounditems", async (req, res) => {
  try {
    const { id } = req.body;

    const items = await FoundItem.find({ fsid: id });
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
});

app.post("/lostitemdetails", async (req, res) => {
  try {
    const { id } = req.body;

    let item = await LostItem.findOne({ _id: id });

    const user = await User.findOne({ _id: item.lsid.toString() });

    user.password = undefined;
    res.status(200).send([item, user]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/founditemdetails", async (req, res) => {
  try {
    const { id } = req.body;

    let item = await FoundItem.findOne({ _id: id });

    const user = await User.findOne({ _id: item.fsid.toString() });

    user.password = undefined;
    res.status(200).send([item, user]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
