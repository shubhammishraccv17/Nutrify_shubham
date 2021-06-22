const express=require('express');
const { createUser ,verifyUser} = require('../controller/auth');
const router=express.Router();
const auth=require("../controller/auth.js")


router.get('/register',(req,res)=>{

    res.render("register")
})


router.post('/register', (req, res) => {
    createUser(req.body)
        .then((response) => {
            res.redirect('/auth/login');
        })
        .catch((err) => {
            console.log('Error: ', err);
        })
})



router.get('/login',(req,res)=>{
    res.render(("login"),{
        message:" "
    })
})


router.post('/login', (req, res) => {
    verifyUser(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else if (data && data.message) {
            res.render('signin', data);
        } else {
            req.session.email = data.email;
            req.session.is_admin = true;
            res.redirect('/home');
        }
    })
})

module.exports=router;
