var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')

// GET routes
router.get('/', db.getAllUsers)
router.get('/getUser',loginRequired, db.getUser)

router.get('/userAttributes/:username', loginRequired, db.getUserAttributes)

// POST routes
router.post('/survey', db.userSurvey) // sets user attributes after user survey is submitted
router.post('/addTrip', loginRequired, db.addTrip)

// DELETE routes
router.delete('/remove/:id', loginRequired, db.removeTrip) // removes a trip by trip ID

// User authentication routes 
router.post('/register', db.registerUser, passport.authenticate('local'), (req, res) => res.json(req.user.username))
router.post('/login', passport.authenticate('local'), (req, res) => res.json({ id: req.user.id, username: req.user.username }))
router.get('/logout', loginRequired, db.logoutUser)

module.exports = router;
