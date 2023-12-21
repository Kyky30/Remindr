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
  clientSecret: '345c42505bf2a76ea00c17936a3e6d16f4fdab36',
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
    return res.redirect('/');
  }

  // Session expire ?
  const currentTime = new Date().getTime();
  const sessionExpirationTime = req.session.cookie.expires.getTime();
  if (currentTime > sessionExpirationTime) {
    req.logout(); // Déconnecter l'utilisateur
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

// Ajoutez la route GitHub pour l'authentification
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const githubLogin = req.user.username;

      const existingUser = await prisma.user.findUnique({
        where: { githubLogin },
      });

      if (existingUser) {
        // User already exists, log in the user
        req.login(existingUser, (err) => {
          if (err) throw err;
          res.redirect('/dashboard');
        });
      } else {
        // User doesn't exist, create a new GitHub user in the database
        const newUser = await prisma.user.create({
          data: {
            githubLogin,
            isGitHubUser: true,
            // You can leave the password empty or set a placeholder value
            password: '', // or password: 'github-user'
            username: req.user.username,
            // Add any other necessary user information from the GitHub profile
          },
        });

        // Log in the newly created user
        req.login(newUser, (err) => {
          if (err) throw err;
          res.redirect('/dashboard');
        });
      }
    } catch (error) {
      console.error('Error during GitHub authentication callback:', error);
      res.redirect('/login');
    }
  });


// Enregistrement
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the password is provided
  if (!password) {
    return res.render('register', { error: 'Password is required' });
  }

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


module.exports = { router, checkAuth };
