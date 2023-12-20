const express = require('express');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
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
      return done(null, false, { message: 'Identifiants ou mot de passe invalide' });
    }

    return done(null, user);
  })
);

passport.use(new GitHubStrategy({
  clientID: '29bb2667a5a3ba5cc4f7',
  clientSecret: 'e1b0620f5b5fe2f43657d950594cfc4d61fa1c14',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Enregistrez ou récupérez l'utilisateur ici, vous pouvez utiliser prisma pour cela
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user.id || user.username); // Utilisez une propriété unique pour identifier l'utilisateur
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  done(null, user);
});

// Middleware pour vérifier l'authentification de l'utilisateur
const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

// Routes

// Authentification locale
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
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

// Authentification GitHub
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirigez l'utilisateur vers le tableau de bord après une connexion réussie
    res.redirect('/dashboard');
  });

// Enregistrement
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
