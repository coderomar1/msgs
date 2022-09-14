const users = require('../model/users');
const bcrypt = require('bcrypt');

module.exports = ({
    sign: async (req,res)=>{
        const Hachpassword = await bcrypt.hash(req.body.password, 10);
        const user ={
            name: req.body.name,
            email: req.body.email,
            password: Hachpassword
        }
        const name = await users.findOne({name: user.name});
        const email = await users.findOne({email: user.email});
        if(email || name){
            req.flash('signmsg', 'المستخدم مسجل');
            res.redirect('/sign');
        }else{
            const createuser =  new users({
                name: user.name,
                email: user.email,
                password: user.password
            });
            createuser.save().then(()=>{
                res.redirect('/login')
            })
        }
    },
    login: async (req,res)=>{
        const name = req.body.name;
        const password = req.body.password;
        const user = await users.findOne({name: name})
        if(!user){
            req.flash('loginmsg','المستخدم غير موجود')
            res.redirect('/login');
        }else{
            await bcrypt.compare(password,user.password).then((match)=>{
                if(match){
                    req.session.user = user;
                    req.session.admin = user.isAdmin;
                    res.redirect('/');
                }else{
                    req.flash('notmatch','خطا في كلمة المرور او اسم المستخدم')
                    res.redirect('/login');
                }
            })
        }
    }
})