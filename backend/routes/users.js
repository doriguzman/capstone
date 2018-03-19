var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')

// gets all users in the db
router.get('/', db.getAllUsers)

// POST functions
router.post('/userSurvey', db.userSurvey) // sets user attributes after user survey is submitted

// User authentication functions 
router.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user))
// router.post('/new', db.registerUser)
router.get('/logout', loginRequired, db.logoutUser)

module.exports = router;
