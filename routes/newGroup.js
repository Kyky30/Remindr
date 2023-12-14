const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Utilisez le middleware body-parser pour analyser le corps de la demande
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        const { groupName } = req.body;
        const createdGroup = await prisma.groupe.create({
            data: {
                name: groupName,
            },
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
