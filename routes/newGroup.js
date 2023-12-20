const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Utilize the body-parser middleware to parse the request body
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        const { groupName } = req.body;

        // Get the user ID (you may have your own way of obtaining this)
        const userId = req.user.id;

        // Create the group
        const createdGroup = await prisma.groupe.create({
            data: {
                name: groupName,
                // Add the user as a group member
                GroupeMember: {
                    create: {
                        userId: userId,
                    },
                },
            },
            // Include the GroupeMember relation in the response
            include: {
                GroupeMember: true,
            },
        });

        // Redirect or send a response as needed
        res.redirect('/');
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
