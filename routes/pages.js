//Routes for pages (index and indexlogin)
//import express
const express = require('express');

const router = express.Router();


//////// WORKS View Engine HBS (render) ///////////
// ** TEST - Browser: url - localhost:5500/index
// ** TEST - Browser: url - localhost:5500/indexLogin
//allows you to used router.get when on register page
router.get('/index', (req, res) => {
   // go to file index.hbs
   res.render('index');
});

//router.get('/', (req, res) => {
   // res.render('index');
//});

//router.get('/indexlogin' , (req, res) => {
   // res.render('indexlogin.hbs');
//});
//allows you to used router.get when on login page
router.get('/indexlogin' , (req, res) => {
    //go to file indexlogin.hbs
    res.render('indexlogin');
});

router.get('/about' , (req, res) => {
    console.log("InPagesRouterGet/about");
   res.sendFile('c:/temp/node-mysql/views/about.html');
});


router.get('/contacts' , (req, res) => {
    console.log("InPagesRouterGet/contacts");
    res.sendFile('c:/temp/node-mysql/views/contacts.html'); 
});

router.get('/numbers' , (req, res) => {
    console.log("InPagesRouterGet/numbers");
    res.sendFile('c:/temp/node-mysql/views/numbers.html'); 
});

router.get('/home' , (req, res) => {
    console.log("InPagesRouterGet/home");
    res.sendFile('c:/temp/node-mysql/views/home.html'); 
});

///////WORKS - NO View Engine (sendFile) ///////
// ** TEST - Browser: url - localhost:5500/index
// ** TEST - Browser: url - localhost:5500/indexLogin
// ** nodejs server get index.html file
/*
const path    = require('path');
const baseDirectory = path.join(__dirname, '../views/'); 
router.use(express.static(baseDirectory));
console.log(baseDirectory);

router.get('/index', (req, res) => {
    // **nodejs server send html file to browser
    res.sendFile(baseDirectory + 'index.html');
});
// ** nodejs server get index.html file
router.get('/indexLogin', (req, res) => {
    // **nodejs server send html file to browser
    res.sendFile(baseDirectory + 'indexLogin.html');
})
*/
// allows you to export router
module.exports = router;