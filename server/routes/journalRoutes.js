const express = require('express');
const router = express.Router();
const {
    getJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getJournals).post(protect, createJournal);
router.route('/:id').get(getJournalById).put(protect, updateJournal).delete(protect, deleteJournal);

module.exports = router;
