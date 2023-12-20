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
        maxAge: 600000, // 1 heure
      },
    })
  );

  // Initialiser Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Sérialisation de l'utilisateur pour la session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Désérialisation de l'utilisateur
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
