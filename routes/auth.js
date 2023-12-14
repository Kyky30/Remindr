// routes/auth.js

const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const router = express.Router();

// Configurations GitHub
passport.use(new GitHubStrategy({
  clientID: '29bb2667a5a3ba5cc4f7',
  clientSecret: 'e1b0620f5b5fe2f43657d950594cfc4d61fa1c14',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Vous pouvez enregistrer ou récupérer l'utilisateur ici
  return done(null, profile);
}));

// Sérialisation de l'utilisateur
passport.serializeUser((user, done) => {
  done(null, user);
});

// Désérialisation de l'utilisateur
passport.deserializeUser((user, done) => {
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

// Ajoutez la route GitHub pour l'authentification
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirigez l'utilisateur vers le tableau de bord après une connexion réussie
    res.redirect('/dashboard');
  });

// ...

module.exports = router;
