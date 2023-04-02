const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    {
      username: user.username,
      id: user.id,
    },
    "GONNACHANGE"
  );
  return accessToken;
};

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.json({
      msg: "you're not authenticated",
    });
  }
  try {
    const validToken = verify(accessToken, "GONNACHANGE");
    if (validToken) {
      req.userId = validToken.id;
      return next();
    }
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
