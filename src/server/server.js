import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userSchema from "./model/userinfo.model.js";
import Product from "./model/product.model.js";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log(`server running at port ${port}`);
    });
  })
  .catch(() => {
    console.log("mongoose not connected");
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });



app.post("/user", async (req, res) => {
  try {
    const { fullName, email, password, userType } = req.body;

    if (!fullName || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const userData = new userSchema({
      fullName,
      email,
      password,
      userType,
    });

    await userData.save();
    console.log("User registered:", userData);

    return res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("User logged in:", user);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Error logging in" });
  }
});

app.post("/addproducts", async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid data, expected an array" });
    }

    const addedProducts = await Product.insertMany(products);
    res
      .status(201)
      .json({ message: "Products added successfully", data: addedProducts });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/addproduct", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/increaseBid", async (req, res) => {
  const { productName, newBid, username } = req.body;

  try {
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (newBid <= product.highestbid) {
      return res.status(400).json({ message: "Bid must be higher than the current highest bid" });
    }


    const previousHighestBidder = product.highestbidder;


    product.highestbid = newBid;
    product.highestbidder = username;
    await product.save();

    io.emit("bidUpdate", {
      productName,
      highestBid: newBid,
      highestBidder: username,
    });


    if (previousHighestBidder && previousHighestBidder !== username) {
      io.emit("outbidNotification", {
        productName,
        previousHighestBidder,
        newHighestBidder: username,
        highestBid: newBid,
      });
    }

    res.json({ 
      success: true, 
      highestBid: newBid, 
      highestBidder: username,
      bidHistory: product.bidHistory
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/product/:name/bidhistory", async (req, res) => {
  const productName = req.params.name;
  const product = await Product.findOne({ name: productName });

  if (product) {
    res.json({ highestbid: product.highestbid, history: product.bidHistory || [] });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


