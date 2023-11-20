require("dotenv").config({ path: ".env.local" });
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("Você não tem a permissão necessária");
      }
    } catch (err) {
      res.status(403);
      res.send("Você não está autenticado");
    }
  } else {
    res.status(403);
    res.send("Você não está autenticado");
  }
};
