const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");

const AuthRoutes = require('./Routes/AuthRoutes');
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json())

env.config()

mongoose.connect(
	"mongodb+srv://engine259:triadkube2019@cluster0.5ab7g.mongodb.net/nyx-learning?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once("open", () => {
	console.log("connected to db");
});

app.use('/auth', AuthRoutes);

app.use('/', (req, res) => {
    res.send("APP WORKING");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("APP RUNNING IN PORT "+ process.env.port || 3000)
})