const express = require('express');
const  app = express();
const router = require('./routes/router');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride= require('method-override');
const flash = require('express-flash');
const cookie = require('cookie-parser');

mongoose.connect("mongodb://localhost:27017/onedb",{ useNewUrlParser: true,useUnifiedTopology: true});

app.set('view engine','ejs');
app.use(express.static('views'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(methodOverride('_method',{methods:['POST','GET']}))

app.use(session({
    secret: 'sr',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: new Date() * 60}
}))
app.use(cookie('sr'))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.user = req.session.user || null
    res.locals.isAdmin = req.session.admin || null
    next()
})
app.use('/',router)



app.listen(3000,()=> console.log('server runing'));