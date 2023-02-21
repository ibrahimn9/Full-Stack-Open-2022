const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();

const User = require("../models/users");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1 });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username , password} = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
