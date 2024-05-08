var jwt = require("jsonwebtoken");
const tokenKey = "kaka#1";

const fetchuser = (req, res, next) => {
  //fetching user id from authentication token and adding to req
  const authToken = req.header("auth-token");
  if (!authToken) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(authToken, tokenKey);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
