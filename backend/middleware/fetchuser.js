const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

// JWT token is used to verify the user.
const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to req object.
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data, 13);
    req.user = {
      id: data.user,
    };
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
};

module.exports = fetchuser;
