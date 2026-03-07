const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode = 500, message = 'Server error', errors = null) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  res.status(statusCode).json(body);
};

const paginate = (query, page = 1, limit = 12) => ({
  skip: (page - 1) * limit,
  limit: parseInt(limit),
});

module.exports = { sendSuccess, sendError, paginate };
