import jwt from "jsonwebtoken";

const createToken = async (user, secret, expiresIn = "7d") => {
  
  const { _id, email, role } = user;

  return await jwt.sign({ _id, email, role }, secret, {
    expiresIn
  });
};
export default createToken;
