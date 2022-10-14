import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData?.id;

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
