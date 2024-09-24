require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRoute");

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = process.env.PORT || "";

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
