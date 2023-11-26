const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_Token);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if(!token){
    res.status(401);
    throw new Error("Not authorized, no token received");
}
});


module.exports=protect