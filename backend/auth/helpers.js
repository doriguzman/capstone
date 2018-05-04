const bcrypt = require("bcryptjs");
const pgp = require("pg-promise")({});
const connectionString= process.env.DATABASE_URL
const db = pgp(connectionString)
//pgp("postgres://localhost/feathers");

function comparePassword(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

function createHash(password) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      status: "Please log in"
    });
  }
  return next();
}

module.exports = {
  comparePassword: comparePassword,
  createHash: createHash,
  loginRequired: loginRequired
};
