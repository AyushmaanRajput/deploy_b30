const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//** POST - 'users/add-user' for creating a new user  */
router.post("/add-user", userController.addUser);

//** POST - 'users/login' for logging in  a  user  */
router.post("/login", userController.login);

//** POST - 'users/logout' for logging out a  user  */
router.post("/logout", userController.logout);

module.exports = router;
