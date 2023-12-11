// session.js

const session = require('express-session');
const passport = require('passport');

module.exports = function (app) {
  // Configuration de la session
  app.use(
    session({
      secret: 'ma-cle-de-securite-super-securisee',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 5000, // Durée de la session en millisecondes (par exemple, 5 secondes)
      },
    })
  );

  // Initialiser Passport
  app.use(passport.initialize());
  app.use(passport.session());
};
