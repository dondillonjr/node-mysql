const express = require("express");
const mysql   = require("mysql");
const dotenv  = require('dotenv');
const path    = require('path');
const { response } = require("express");
dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    //host: 'ec2-18-216-119-62.us-east-2.compute.amazonaws.com',
    //user: 'root',
    //password: 'myPassword',
    //database: 'validate_users'   
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public'); 
//make sure app is using publicDirectory
app.use(express.static(publicDirectory));
//handel bars templet engine
//app.set('view engine', 'hbs');

//Parse URL-encoded bodies (as sent by HTML forms)
//can now grab data from any forms
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API clients)
//values from form are in json format
app.use(express.json());
console.log(express.json());

console.log(publicDirectory);
//console.log(__dirname +'\\view\\index.hbs');

app.set('view engine', 'hbs');

db.connect( (error) => {
   if (error) {
        console.log(error)
    }
    else
    {
        console.log("MySQL Connected..")
    }
});

/////////////////////////////////////////////
// ** TEST - Browser: url - localhost:5500 
//app.get("/", (req, res) => {
    //  *** nodeJS server - send html string to browser
    //res.send("<h1>HOME PAGE</h1>")
    //res.render("index.hbs");
//});

///////WORKS - NO View Engine (sendFile) ///////
// ** TEST - Browser: url - localhost:5500/index
// ** TEST - Browser: url - localhost:5500/indexLogin
// ** nodejs server get index.html file
//app.get("/index", (req, res) => {
    // **nodejs server send html file to browser
    //res.sendFile(__dirname + '/views/index.html');
//});
// ** nodejs server get index.html file
//app.get("/indexLogin", (req, res) => {
    // **nodejs server send html file to browser
    //res.sendFile(__dirname + '/views/indexLogin.html');
//});

//////// WORKS View Engine HBS (render) ////////
// ** TEST - Browser: url - localhost:5500
// ** TEST - Browser: url - localhost:5500/indexLogin
// **Uses templates handelbars --viewEngine hbs
// **index.hbs and indexLogin.hbs must be in 
// **directory (views)
// ** extentions on both files is to be changed
// ** to (hbs) example: index.hbs */
//app.set('view engine', 'hbs');

//////////////////////////////////////////////
/*** now using routes/page.js 
app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/indexlogin", (req, res) => {
    res.render("indexlogin");
});
***/

// USING routes/pages.js
// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth' , require('./routes/auth'));

//////////////////////////////////////////// 
app.listen(5500, () => { 
    console.log("Server started on Port 5500");
})