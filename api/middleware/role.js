const ROLES = {
  Admin: "ADMIN",
  Visitor: "VISITOR",
};

const checkRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("You are unauthorized");
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send("You are not allowed to do this");
    }
  };

const role = { ROLES, checkRole };

module.exports = role;
