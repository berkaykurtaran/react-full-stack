// TODO design what to store in the session object other than just user.id
// TODO see what happens if someone sends a request with an invalid session but actual id
//        - I assume the session store just rejects it or wipes it or something....
// TODO create utility function that takes row and converts to userObject for client

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var {User} = require('../models');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user)
            })
            .catch(function (err) {
                done(err);
            });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                User.findAll({where: {email: email}})
                    .then(function (users) {
                        if (users.length && users.length > 0)
                            return done(null, false, {error: 'That email is already being used.'});
                        else {
                            // if there is no user with that email
                            // create the user
                            var salt = bcrypt.genSaltSync(10);
                            var passwordHash = bcrypt.hashSync(password, salt);
                            User.create({
                                email: email,
                                password: passwordHash
                            }).then(function (user) {
                                return done(null, user);
                            }).catch(function (err) {
                                return done(err);
                            });

                        }
                    })
                    .catch(function (err) {
                        return done(err);
                    });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                User.findOne({where: {email: email}})
                    .then(function (user) {
                        console.log(user);
                        if (!user) {
                            console.log("no user found...");
                            return done(null, false, {error: 'Email not found.'});
                        }else {
                            return done(null, user);
                        }
                    })
                    .catch(function (err) {
                        return done(err);
                    });
            })
    );

};


