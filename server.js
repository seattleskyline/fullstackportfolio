require("dotenv").config();
var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// API Routes
require("./routes/api-comment")(app);
// require("./routes/api-messages")(app);
require("./routes/api-projects")(app);
// require("./routes/api-users")(app);

// HTML Routes
require("./routes/htmlRoutes")(app);
// require("./routes/html-comments")(app);
// require("./routes/html-messages")(app);
// require("./routes/html-projects")(app);
// require("./routes/html-users")(app);

// Run Server
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log("Server listening on port:", PORT);
  });
});

module.exports = app;