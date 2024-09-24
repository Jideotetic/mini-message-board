require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRoute");
const newFactRouter = require("./routes/newFactRoute");

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/", newFactRouter);

const PORT = process.env.PORT || "";

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
