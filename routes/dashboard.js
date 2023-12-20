// dashboard.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { checkAuth } = require('./auth'); // Adjust the path accordingly

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
    try {
        // Ensure that req.user is defined and has an id property
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { GroupeMember: { include: { groupe: true } } },
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('dashboard', { user: req.user.username, groups: user.GroupeMember.map(member => member.groupe) });
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).send('Inernal Server Error');
    }
});

module.exports = router;
