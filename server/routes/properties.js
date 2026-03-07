const router = require('express').Router();
const ctrl   = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');

router.get('/',         ctrl.getAll);
router.get('/featured', ctrl.getFeatured);
router.get('/mine',     protect, authorize('seller', 'admin'), ctrl.getMine);
router.get('/:id',      ctrl.getById);
router.post('/',        protect, authorize('seller', 'admin'), ctrl.create);
router.put('/:id',      protect, authorize('seller', 'admin'), ctrl.update);
router.delete('/:id',   protect, authorize('seller', 'admin'), ctrl.remove);

module.exports = router;
