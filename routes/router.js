const router = require('express').Router();
const msgCtl = require('../controller/msgctl');
const  usersCtl = require('../controller/userctl')

// get to render pages
router.get('/createmasseges',(req,res)=>{
    if(req.session.user){
        res.render('createMasseges.ejs')
    }else{
        res.redirect('/login')
    }
 
});
router.get('/sign',(req,res)=>{res.render('sign.ejs',{massegeSign : req.flash('signmsg')});});
router.get('/login',(req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('login.ejs',{massegeLogin: req.flash('loginmsg'),notmatch: req.flash('notmatch')});
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/');
})
router.get('/',msgCtl.masseges);
router.get('/massegeSolve/:id',msgCtl.massegeSolve);


// post 
router.post('/signuser', usersCtl.sign);
router.post('/login',usersCtl.login);
router.post('/createMassege',msgCtl.createMassege);


router.delete('/deletemsg/:id',msgCtl.delete);
router.put('/massegesSolve/:id',msgCtl.saveMsgSolve);

module.exports = router