require('dotenv').config();
const express = require('express');
const cors = require('cors');

const journalRoutes = require('./routes/journalRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/journals', journalRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
