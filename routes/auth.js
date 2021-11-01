const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

//////// WORKS NON-View Engine HBS - No Templates   ///////////
// ** TEST - Browser: url - localhost:5500/index
// ** TEST - Browser: url - localhost:5500/indexlogin

//////// WORKS View Engine HBS Handel-bar Templates ///////////
//like saying /auth/index
//controller will deal with data from form

//load function index() in controller dir
router.post('/index', authController.index);
//load function indexlogin() in controller dir
router.post('/indexlogin', authController.indexlogin);
router.post('/home'      , authController.about);
router.post('/numbers'   , authController.numbers);
router.post('/contacts'  , authController.contacts);

module.exports = router;    