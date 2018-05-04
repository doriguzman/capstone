const passport = require('passport')
const pgp = require('pg-promise')({})
const connectionString= process.env.DATABASE_URL
const db = pgp(connectionString)
//pgp('postgres://localhost/feathers') 

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        db.one('SELECT id, username FROM users WHERE username=$1', [username])
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => {
                return done(err, null)
            })
    })
}