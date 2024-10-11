const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')

const app = express();
const port = process.env.PORT;;



app.use(cors())
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(
    `MyNotebook listening on port ${port} and link is http://localhost:${port}`
  );
});

connectToMongo();
