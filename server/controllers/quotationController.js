const prisma = require('../config/db');

// @desc    Create a new quotation request
// @route   POST /api/quotations
// @access  Public
const createQuotation = async (req, res) => {
    try {
        const { institutionName, contactPerson, email, phone, selectedJournals, notes } = req.body;

        if (selectedJournals && selectedJournals.length === 0) {
            res.status(400).json({ message: 'No journals selected' });
            return;
        }

        const createdQuotation = await prisma.quotation.create({
            data: {
                institutionName,
                contactPerson,
                email,
                phone,
                notes,
                selectedJournals: {
                    connect: selectedJournals.map(id => ({ id }))
                }
            }
        });

        res.status(201).json(createdQuotation);
    } catch (error) {
        res.status(400).json({ message: 'Invalid quotation data' });
    }
};

// @desc    Get all quotation requests
// @route   GET /api/quotations
// @access  Private/Admin
const getQuotations = async (req, res) => {
    try {
        const quotations = await prisma.quotation.findMany({
            include: {
                selectedJournals: {
                    select: {
                        id: true,
                        name: true,
                        publisher: true
                    }
                }
            }
        });
        res.json(quotations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update quotation status
// @route   PUT /api/quotations/:id
// @access  Private/Admin
const updateQuotationStatus = async (req, res) => {
    try {
        const quotationExists = await prisma.quotation.findUnique({
            where: { id: req.params.id }
        });

        if (quotationExists) {
            const updatedQuotation = await prisma.quotation.update({
                where: { id: req.params.id },
                data: {
                    status: req.body.status !== undefined ? req.body.status : quotationExists.status,
                    adminNotes: req.body.adminNotes !== undefined ? req.body.adminNotes : quotationExists.adminNotes
                }
            });
            res.json(updatedQuotation);
        } else {
            res.status(404).json({ message: 'Quotation not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Update failed' });
    }
};

module.exports = {
    createQuotation,
    getQuotations,
    updateQuotationStatus
};
