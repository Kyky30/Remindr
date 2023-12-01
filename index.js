const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {engine} = require('express-handlebars'); // Assurez-vous que c'est correctement importé
const path = require('path');

const authRoutes = require('./routes/auth');

const flash = require('express-flash');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' })); // Utilisez exphbs comme une fonction
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Configuration de la session
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware pour vérifier l'authentification de l'utilisateur
const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

// Routes
app.use('/', authRoutes);

app.get('/', checkAuth, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
