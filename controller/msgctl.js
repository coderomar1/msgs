const { render } = require('ejs');
const msg = require('../model/msg');

module.exports =({
    createMassege:(req,res)=>{
        if(req.session.user){
            const massege = req.body
            const newMsg = new msg({
              title: massege.title,
              msg_info:massege.maginfo,
              massenger_name: massege.msgrname
            });
            newMsg.save().then(()=> res.redirect('/'));
        }else{
            res.redirect('/login')
        }
       
    },
    masseges:(req,res)=>{
        if(req.session.user){
             if(req.session.admin){
                msg.find({},(err,rs)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.render('masseges.ejs',{adms:rs})
                    }
                })
            }
            else{
                msg.find({massenger_name:req.session.user.name},(err,rs)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.render('masseges.ejs',{ms: rs});
                    }
                })
            }
        }
        else{
            res.redirect('/login');
        }
    },
    massegeSolve:(req,res)=>{
        if(req.session.admin){
            const id = req.params.id;
            msg.findById(id,(err,data)=>{
                if(err) console.log(err)
                else{
                    res.render('massegeSolve.ejs',{msg: data});
                }
            })
        }else{
            res.redirect('/');
        }
    },
    saveMsgSolve:(req,res)=>{
        if(req.session.admin){
            const id = req.params.id
            msg.findByIdAndUpdate(id,{msg_state: req.body.state, resaboutmsg: req.body.resAboutMsg},(err)=>{
                if(err) console.log(err)
                else res.redirect('/');
            })
            
        }else{
            res.redirect('/');
        }
    },
    delete:(req,res)=>{
        const id = req.params.id;
        msg.findByIdAndDelete(id,(err)=>{
            if(err) console.log(err);
            else res.redirect('/');
        })
    }
})