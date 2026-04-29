const express = require('express');
const router = express.Router();
const {
    createQuotation,
    getQuotations,
    updateQuotationStatus
} = require('../controllers/quotationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createQuotation).get(protect, getQuotations);
router.route('/:id').put(protect, updateQuotationStatus);

module.exports = router;
