const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const adminRoutes = require('./routes/admin.routes');
require('dotenv').config();


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Définir PORT avec une valeur par défaut

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server connecter au port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('impossible de ce connecter a MongoDB', err);
        console.log('Cloud not connect to mongoDB'); // Ce message est désormais dans le bloc catch
    });

module.exports = app;
