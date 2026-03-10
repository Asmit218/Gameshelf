export const protectRoute = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verify the token and attach the user to the request object
  next();
};