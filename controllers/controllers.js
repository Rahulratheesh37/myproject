const fs = require('fs');
const users = JSON.parse(fs.readFileSync('database.json', 'Utf-8'));

module.exports = controllers = {
    gethome: (req, res) => {
        res.render('home');
    },
    gethome: (req, res) => {
        if (req.session.isAuth) {
            res.render('welcome', { user: req.session.user })
        }
        else(req,res)=>{
             req.redirect('login');
        } 
    },
    getlogin: (req, res) => {
        if (req.session.isAuth) {
            res.redirect('/welcome');
        }
        res.render('login', { err: req.session.err  , user: req.session.user})
    },
    getsignup: (req, res) => {
        res.render('signup', { errorm : req.session.errorm });
    },
    postlogin: (req, res) => {
        const { username, password } = req.body;
        const userExist = users.find(fn => fn.Username === username && fn.password === password)
        console.log(userExist);
        if (userExist) {
            req.session.isAuth=true
            req.session.user = userExist;
            res.render('welcome',{user : userExist});
        }
        else {
            return res.send('username or password is error');
        }
    },
    postsignup: (req, res) => {

        const { username, email, password, password2 } = req.body;


        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        var regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        const existingemail = users.find(fnd => fnd.email === email);
        const existingpword = users.find(fnd => fnd.password === password);

        req.session.errorm = {}
        console.log('email status', emailFormat.test(email));
        if (email === "") {
            req.session.errorm.emailError = "Email can't be empty"
        }
        else if (!emailFormat.test(email)) {
            req.session.errorm.emailError = 'Write valid email'
        }
        if (password === '') {
            req.session.errorm.perror = "Password can't be empty"
        }
        else if (!regexpassword.test(password)) {
            req.session.errorm.perror = "Password format is incorrect"
        }
        if (password2 != password) {
            req.session.errorm.cperror = "Password doesn't match"
        }
        if (Object.keys(req.session.errorm).length > 0) {
            return res.redirect('/signup');
        }
        console.log('user body',req.body);
        users.push(req.body);
        fs.writeFileSync('./database.json',JSON.stringify(users))
        res.redirect('/login');
    }
}
