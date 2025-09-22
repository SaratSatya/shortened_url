const User = require("../models/user.js");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.js");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "Email is already registered. Please login or use another email.",
      });
    }

    // create new user
    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login"); // redirect to login after successful signup
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).send("Something went wrong during signup");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", {
        error: "Invalid Email or Password",
      });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Something went wrong during login");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
