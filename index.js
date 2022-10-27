const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config");

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/static", express.static("store"));

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  dbName: "gmbh",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Successfully connected to GMBH database");
}).catch((error) => {
  console.log("Could not connect to the database", error);
  process.exit();
});

const loginRoutes = require("./routes/login.routes");
loginRoutes(app);

const employeeRoutes = require("./routes/employee.routes");
employeeRoutes(app);

const commentRoutes = require("./routes/comment.routes");
commentRoutes(app);

const port = process.env.PORT || 3553;
app.set("port", port);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

module.exports = app;