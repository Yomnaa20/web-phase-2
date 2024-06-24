// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const Mydata = require('./models/mydataschema'); // Adjust the path if necessary

// module.exports = function(passport) {
//     passport.use(
//         new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//             try {
//                 const user = await Mydata.findOne({ email: email });
//                 if (!user) {
//                     return done(null, false, { message: 'No user with that email' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Password incorrect' });
//                 }
//             } catch (err) {
//                 return done(err);
//             }
//         })
//     );

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });

//     passport.deserializeUser(async (id, done) => {
//         try {
//             const user = await Mydata.findById(id);
//             done(null, user);
//         } catch (err) {
//             done(err);
//         }
//     });
// };





const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Mydata = require('./models/mydataschema');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Match user
        const user = await Mydata.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Mydata.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};