// index.js
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sessionConfig = require('./session'); // Importez le fichier session.js
const passport = require('passport');

const authRoutes = require('./routes/auth');
const flash = require('express-flash');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static('public'));

// Appel de la configuration de session
sessionConfig(app);

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);

// Authentification GitHub
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirigez l'utilisateur vers le dashboard ou toute autre page après l'authentification réussie
    res.redirect('/dashboard');
  });

///////////////////////////////////////////////////////////////////
///////////////////// Authentification/////////////////////////////
///////////////////////////////////////////////////////////////////
const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
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

///////////////////////////////////////////////////////////////////
///////////////////// Routes //////////////////////////////////////
///////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  // Si l'utilisateur est connecté, redirigez vers le dashboard
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  // Sinon, affichez la page d'accueil
  res.render('home');
});

// Définir la route de vérification d'authentification avant la route /login
app.get('/dashboard', checkAuth, (req, res) => {
  res.render('dashboard', { user: req.user.username });
});

app.get('/login', (req, res) => {
  // Si l'utilisateur est connecté, redirigez vers le dashboard
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  // Sinon, affichez la page de connexion
  res.render('login');
});

///////////////////////////////////////////////////////////////////
///////////////////// Port d'écoute ///////////////////////////////
///////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
