const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/", require("./routes/path"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port----------> ${PORT}`));
