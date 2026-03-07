const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

const respond = (res, status, message, data = {}) =>
  res.status(status).json({ success: status < 400, message, ...data });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return respond(res, 400, 'Name, email and password are required');
    }
    if (password.length < 6) {
      return respond(res, 400, 'Password must be at least 6 characters');
    }

    // Duplicate check
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return respond(res, 400, 'Email already registered');

    // Create user
    const user = await User.create({
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone || '',
      role:  ['buyer', 'seller'].includes(role) ? role : 'buyer',
    });

    const token = signToken(user._id);
    return respond(res, 201, 'Registered successfully', { token, user });
  } catch (err) {
    console.error('Register error:', err.message);
    return respond(res, 500, err.message);
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return respond(res, 400, 'Email and password required');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) return respond(res, 401, 'Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return respond(res, 401, 'Invalid credentials');

    const token = signToken(user._id);
    return respond(res, 200, 'Login successful', { token, user });
  } catch (err) {
    console.error('Login error:', err.message);
    return respond(res, 500, err.message);
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  return respond(res, 200, 'Profile fetched', { user: req.user });
};