require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

const User = require("../models/users");

loginRouter.post("/", async (request, response) => {
  const { username, password} = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .json({ token, username: user.username, id: user._id });
});


loginRouter.post("/verify-token", (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return res.json(decodedToken);
  } catch (err) {
    return res.json({ error: "token missing or invalid" });
  }
});
module.exports = loginRouter;
