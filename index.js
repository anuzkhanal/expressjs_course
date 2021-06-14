const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

//init middleware
//app.use(logger);
/* 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
}); */

//handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

//set a static folder
app.use(express.static(path.join(__dirname, "public")));
//members api route
app.use("/api/members", require("./routes/api/membres"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
