const express = require('express');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient();

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  done(null, user);
});

// Routes
router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    req.login(user, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  } catch (error) {
    res.render('register', { error: 'Registration failed' });
  }
});

module.exports = router;
