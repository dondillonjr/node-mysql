// SET UP DATABASE CONNECTION
//import database
const mysql  = require("mysql");
const path   = require("path");
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

//make connection to database
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
 
exports.indexlogin = async (req, res) => 
//exports.indexLogin = (req, res) =>
{
    try 
    {
        //console.log("BBB");
        console.log(req.body);
        //console.log("BBB");
        //const { username, password } = req.body;
        const {password, name} = req.body;

        console.log("username = " , name);
        console.log("password = " , password);
       // if ( !password || !name ) 
       // {
         //   console.log("CCC");
          //  return res.status(400).render('indexlogin', {message: 'Please provide a username and password'})
        //}
        //console.log("CCC");
        db.query('SELECT * FROM legal_users WHERE username = ?', [name], async (error, results) =>
        {
            //console.log("HHH1");
            console.log(results);
            //console.log("RL=",results.length)
            //console.log("HHH2");
            if ( error || results.length <= 0)
            {
                console.log("ERROR=",error);
                console.log("User Incorrect");
                res.status(401).render('indexlogin', { message: 'User Incorrect'})
            }
            else if ( results.length > 0 )
            {
                //if ( !results || !(await bcrypt.compare(password, results[0].password)) )
                
                console.log("passwd=",password);
                console.log("result[0]=",results[0].password);
                if ( password === results[0].password )
                {
                    console.log("Login Successfull");
                   // res.status(200).redirect("c:/temp/NODE-MYSQL/views/about.html");
                   res.sendFile("c:/temp/NODE-MYSQL/views/about.html");
                } 
                else 
                {
                    console.log("Password Incorrect");
                    res.status(401).render('indexlogin', { message: 'Password Incorrect'})
                }
            }
            //console.log("HHH3");
        })
    } catch ( error ) {
        console.log("Cought error");
        console.log(error);
    }
}

exports.index = (req, res) => 
{
    //console.log("AAA");
    console.log(req.body);
    //console.log("AAA");
    /*
    const name = req.body.name;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const email = req.body.email;
    const contactnumber = req.body.contactnumber;
    //replaced with below:
    */
    const {name, password, passwordConfirm, email, contactnumber} = req.body;
    
    //[email] - is page file name]
    // on login use email as unique entry - one per user
    // one person with one email
    // (error, results => is called a callback function)
    db.query('SELECT email FROM legal_users WHERE email = ?', [email], async (error, results) => 
    {
        if( error ) 
        {
            //console.log("EE1");
            console.log(error);
            //console.log("EE1");
        }
        //results is array - means email already exist
        if( results.length > 0 ) 
        {
            //send to web page
            return res.render('index', {
                message: 'Email Address Already in Use'
            });
        } 
        else if( password !== passwordConfirm ) 
        {
            return res.render('index', {
                message: 'Passwords do Not-Match'
            });
        }

        db.query('SELECT username FROM legal_users WHERE username =  ?', [name], (error, results) =>
        {
            if (error) 
            {
                //console.log("EE2");
                console.log(error);
                //console.log("EE2");
            } 
            if( results.length > 0 )
            {
                console.log(results);
                return res.render('index', {
                    message: 'User Already Registered'
                });
            }
        })

        // encypt password - encypt process could take few seconds
        // longer that what code needs to run
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO legal_users SET ?', {username: name, email: email, contactnumber: contactnumber, password: password}, (error, results) =>
        {
            if (error) 
            {
                //console.log("EE2");
                console.log(error);
                //console.log("EE2");
            } 
            else 
            {
                console.log(results);
                return res.render('index', {
                    message: 'User Successfully Registered'
                });
            }
        })
        
    });
}

exports.home = async (req, res) => 
{
    console.log("HOME"); 
    res.sendFile("c:/temp/NODE-MYSQL/views/home.html");
}

exports.about = async (req, res) => 
{
    console.log("ABOUT"); 
    res.sendFile("c:/temp/NODE-MYSQL/views/about.html");
}

exports.numbers = async (req, res) => 
{
    console.log("NUMBERS"); 
    res.sendFile("c:/temp/NODE-MYSQL/views/numbers.html");
}

exports.contacts = async (req, res) => 
{
    console.log("CONTACTS"); 
    res.sendFile("c:/temp/NODE-MYSQL/views/contacts.html");
}