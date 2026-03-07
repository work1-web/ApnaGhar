const Property = require('../models/Property');
const { sendSuccess, sendError } = require('../utils/response');

// GET /api/properties
exports.getAll = async (req, res) => {
  try {
    const { city, type, bhk, furnishing, rera, q, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };

    if (city)      filter.city         = city;
    if (type)      filter.propertyType = type;
    if (bhk)       filter.bhk          = Number(bhk);
    if (furnishing)filter.furnishing   = furnishing;
    if (rera === 'true') filter.reraApproved = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) filter.$text = { $search: q };

    const sortMap = {
      price_asc:  { price:  1 },
      price_desc: { price: -1 },
      newest:     { createdAt: -1 },
      default:    { isFeatured: -1, createdAt: -1 },
    };
    const sortQuery = sortMap[sort] || sortMap.default;

    const skip  = (page - 1) * limit;
    const total = await Property.countDocuments(filter);
    const properties = await Property.find(filter)
      .populate('seller', 'name phone email')
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    sendSuccess(res, 200, 'Properties fetched', {
      properties, total, page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET /api/properties/featured
exports.getFeatured = async (req, res) => {
  try {
    const featured = await Property.find({ isFeatured: true, isActive: true })
      .populate('seller', 'name phone')
      .limit(6);
    sendSuccess(res, 200, 'Featured properties', { properties: featured });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET /api/properties/mine (seller only)
exports.getMine = async (req, res) => {
  try {
    const props = await Property.find({ seller: req.user._id }).sort({ createdAt: -1 });
    sendSuccess(res, 200, 'My properties', { properties: props });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET /api/properties/:id
exports.getById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'name phone email');
    if (!property) return sendError(res, 404, 'Property not found');
    property.views += 1;
    await property.save();
    sendSuccess(res, 200, 'Property fetched', { property });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// POST /api/properties
exports.create = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, seller: req.user._id });
    sendSuccess(res, 201, 'Property listed', { property });
  } catch (err) {
    sendError(res, 400, err.message);
  }
};

// PUT /api/properties/:id
exports.update = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      req.body, { new: true, runValidators: true }
    );
    if (!property) return sendError(res, 404, 'Not found or unauthorized');
    sendSuccess(res, 200, 'Property updated', { property });
  } catch (err) {
    sendError(res, 400, err.message);
  }
};

// DELETE /api/properties/:id
exports.remove = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, seller: req.user._id });
    if (!property) return sendError(res, 404, 'Not found or unauthorized');
    sendSuccess(res, 200, 'Property deleted');
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
