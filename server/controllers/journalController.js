const prisma = require('../config/db');

// @desc    Fetch all journals
// @route   GET /api/journals
// @access  Public
const getJournals = async (req, res) => {
    try {
        const { domain, publisher, frequency } = req.query;
        let where = {};
        
        if (domain) where.domain = { contains: domain, mode: 'insensitive' };
        if (publisher) where.publisher = { contains: publisher, mode: 'insensitive' };
        if (frequency) where.frequency = { contains: frequency, mode: 'insensitive' };

        const journals = await prisma.journal.findMany({ where });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single journal
// @route   GET /api/journals/:id
// @access  Public
const getJournalById = async (req, res) => {
    try {
        const journal = await prisma.journal.findUnique({
            where: { id: req.params.id }
        });
        if (journal) {
            res.json(journal);
        } else {
            res.status(404).json({ message: 'Journal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a journal
// @route   POST /api/journals
// @access  Private/Admin
const createJournal = async (req, res) => {
    try {
        const { name, publisher, frequency, impactFactor, domain, issn, description } = req.body;
        
        const createdJournal = await prisma.journal.create({
            data: {
                name,
                publisher,
                frequency,
                impactFactor,
                domain,
                issn,
                description
            }
        });

        res.status(201).json(createdJournal);
    } catch (error) {
        res.status(400).json({ message: 'Invalid journal data' });
    }
};

// @desc    Update a journal
// @route   PUT /api/journals/:id
// @access  Private/Admin
const updateJournal = async (req, res) => {
    try {
        const { name, publisher, frequency, impactFactor, domain, issn, description } = req.body;

        const journalExists = await prisma.journal.findUnique({
            where: { id: req.params.id }
        });

        if (journalExists) {
            const updatedJournal = await prisma.journal.update({
                where: { id: req.params.id },
                data: {
                    name: name !== undefined ? name : journalExists.name,
                    publisher: publisher !== undefined ? publisher : journalExists.publisher,
                    frequency: frequency !== undefined ? frequency : journalExists.frequency,
                    impactFactor: impactFactor !== undefined ? impactFactor : journalExists.impactFactor,
                    domain: domain !== undefined ? domain : journalExists.domain,
                    issn: issn !== undefined ? issn : journalExists.issn,
                    description: description !== undefined ? description : journalExists.description,
                }
            });
            res.json(updatedJournal);
        } else {
            res.status(404).json({ message: 'Journal not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a journal
// @route   DELETE /api/journals/:id
// @access  Private/Admin
const deleteJournal = async (req, res) => {
    try {
        const journalExists = await prisma.journal.findUnique({
            where: { id: req.params.id }
        });

        if (journalExists) {
            await prisma.journal.delete({
                where: { id: req.params.id }
            });
            res.json({ message: 'Journal removed' });
        } else {
            res.status(404).json({ message: 'Journal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal
};
