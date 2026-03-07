const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return sendError(res, 401, 'Not authorized');

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return sendError(res, 401, 'User not found');
    req.user = user;
    next();
  } catch {
    return sendError(res, 401, 'Token invalid or expired');
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendError(res, 403, `Role '${req.user.role}' not permitted`);
  }
  next();
};

module.exports = { protect, authorize };
