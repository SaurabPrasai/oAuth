require('dotenv').config();
const express=require("express");
const app=express();
const passport=require('passport')
const session=require('express-session')



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  
  require('./auth.js')

  const validateSession=(req,res,next)=>{
        req.user?next():res.json("Sessionid expired")
  }

app.get('/',(req,res)=>{
    res.send('<a href="auth/google">sign up with google</a>')
})

app.get('/auth/google',
passport.authenticate("google",{scope:["profile","email"]}))


app.get('/auth/google/callback',
passport.authenticate("google",{
    successRedirect:"/about",
    failureRedirect:"/auth/error"
})
)

app.get('/about',validateSession,(req,res)=>{
    res.send('<h1>This is about page</h1>')
})

app.get('/about/logout',(req,res)=>{
    req.logOut((err)=>{
        if(err) throw err;
        else {
            req.session.destroy();
             res.redirect('/')
        }
    })
})



app.listen(3000,()=>{
    console.log("Listening on port 3000");
})

