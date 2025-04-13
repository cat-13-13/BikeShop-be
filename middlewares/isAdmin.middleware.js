function isAdmin(req, res, next) {
  if (!req.payload || req.payload.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
}

module.exports = { isAdmin };