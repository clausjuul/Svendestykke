import jwt from "jsonwebtoken";

const getMe = async (req) => {
  
  const token = await req.get("token");
  
  if (!token || token === "") {
    return req.user = null;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    
  } catch (err) {
    return req.user = null;
  }

  if (!decoded) {
    return req.user = null;
  }
  return req.user = {
    _id: decoded._id, 
    email: decoded.email, 
    role: decoded.role
  }
};
export default getMe;
