function errorHandler(err, req, res, next) {
  // console.log(err.name, "<<<><");
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    res.status(400).json({ message: err.errors[0].message });
  } else if (
    err.name === "BAD_REQUEST" ||
    err.name === "WRONG_EMAIL" ||
    err.name === "WRONG_PASSWORD"
  ) {
    res.status(401).json({ message: "Invalid Email or Password" });
  } else if (err.name === "DATA_NOT_FOUND") {
    res.status(404).json({ message: "DATA NOT FOUND" });
  } else if (err.name === "Forbidden") {
    res.status(403).json({ message: `You don't have access` });
  } else if (err.name === "JsonWebTokenError" || err.name === "Unauthorized") {
    res.status(401).json({ msg: "Please login first" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = errorHandler;
