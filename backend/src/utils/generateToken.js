const jwt = require("jsonwebtoken");

const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRETKEY,
    {
      expiresIn: "7d",
    }
  );

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  return token;
};

module.exports = {
  generateToken,
};