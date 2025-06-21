export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

// ✅ Export this function
export const authorizeAdminRole = (roles) => {
  return (req, res, next) => {
    const allowed = Array.isArray(roles) ? roles : [roles];
    const role = req.user?.role;

    if (!role || !allowed.includes(role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Unauthorized role" });
    }

    next();
  };
};
