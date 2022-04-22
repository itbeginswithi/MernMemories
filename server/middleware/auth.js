import jwt from "jsonwebtoken";

//wants to like a post
//click the like button => auth middleware(next) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;

    let decodedToken;

    if (token && isCustomToken) {
      decodedToken = jwt.verify(token, "tokenSecret");
      req.userId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(token);
      //Google's id = sub
      req.userId = decodedToken?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
