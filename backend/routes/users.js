var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// User authentication functions 
router.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user))
router.post('/new', db.registerUser)
router.get('/logout', loginRequired, db.logoutUser)


module.exports = router;
