const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get("/", HomeController.index);
router.get("/user", AdminAuth, UserController.index);
router.get("/user/:id", UserController.search);
router.post("/user", UserController.create);
router.put("/user", UserController.edit);
router.delete("/user/:id", UserController.delete);
router.post("/recover-password", UserController.recoverPassword);
router.post("/change-password", UserController.changePassword);
router.post("/login", UserController.login);

module.exports = router;
