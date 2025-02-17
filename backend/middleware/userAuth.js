import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorised Login Agian!" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorised ",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
