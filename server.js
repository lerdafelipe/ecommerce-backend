const express = require('express');
const app = express();
// import Routes
const products = require('./routes/productos.route');
const mensajes = require('./routes/mensajes.route');
const orders = require('./routes/orders.route');
//const auth = require('./routes/auth.route');

//import keys as constants
const {MONGO_ATLAS_PASS, PORT} = require('./config');

//Function connection database
const Connection = require('./database/Connection');
Connection();

//Compression
const compression = require('compression');
app.use(compression());

//Parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//update and use the session
const mongoStore = require('connect-mongo');
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const session = require('express-session');
app.use(session({
    store: mongoStore.create({
        mongoUrl: `mongodb+srv://felipe:${MONGO_ATLAS_PASS}@cluster0.u1fee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions,
        ttl: 3000
    }),
    secret: 'manolito',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}));

//Cors
const cors = require('cors');
app.use(cors({ origin: '*' }));

//express extensions
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/productos', products);
app.use('/mensajes', mensajes);
app.use('/orders', orders);
//app.use('/auth', auth);

//Passport
const passport = require('passport');

//initialize passport and session with passport
app.use(passport.initialize());
app.use(passport.session());




////////////////////////
////////////////////////
////////////////////////
//import bcrypt to encryptc the passwords
const bCrypt = require('bcrypt');
//Declaration of a strategy of passport local
const LocalStrategy = require('passport-local').Strategy;
//DDBB of users
const userSchema = require('./schemas/userSchema');

//import functions and options to send mails
const {transporterG, mailOptionsG} = require('./mail/gmail')

//Serialize user in th use of the passport
passport.serializeUser(function(user, done){
    done(null, user[0].username)
});
//Deserialize user in th use of the passport
passport.deserializeUser(function(username, done){
    let usuario = userSchema.findOne({username: username});
    done(null, usuario);
});

//Encrypt the password
let createHash = (pass)=>{
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(10), null);
}

//validate the encrypt password
let isValidPass = (user, pass)=>{
    return bCrypt.compareSync(pass, user.password)
}

//Declaration the method login on passport
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
//function to do the login. If user exist, compare the password and it's valid, the login continue
async function(req, username, password, done){
        let user = await userSchema.find({username: username});
        if(!user) return done(null, false)
        let success =  user[0].username == username && isValidPass(user[0], password);
        if(!success) return done(null, false)
        return done(null, user);
    })
);

//Declaration the method signup on passport
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
//function to do the signup. If don't exists an user with the username selected, the user will be saved
    function(req, username, password, done){
        const createUser = async()=>{
            let userIs = await userSchema.find({username: username});
            if(userIs.length > 0) return done(null, false);
            let user = {username: username, password: createHash(password), email: req.body.email, direccion: req.body.direccion, phone: req.body.phone, edad: req.body.edad, avatar: req.body.avatar};
            const newUser = new userSchema(user);
            await newUser.save();  
            return done(null, [user]);
        }
        //When the login is completed, the server send a mail to the user and to the admin
        transporterG.sendMail(mailOptionsG(req.body), (err, info) => {
            if(err) {console.log(err)}});
        process.nextTick(createUser);
    })
);

//endpoint to know if exists an user with session active
app.get('/log', (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
})

//endpoint to authenticate the user with the method login
app.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res)=>{
    res.json('Success!')
});

//endpoint to authenticate the user with the method signup
app.post('/signup', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res)=>{
    res.json('Success!')
});

//If the login return an error, the previous endpoint return this endpoint
app.get('/error-login', (req, res)=>{
    res.send({error: 'error de logueo'});
});

//If the signup return an error, the previous endpoint return this endpoint
app.get('/error-signup', (req, res)=>{
    res.send({error: 'error de registro'})
});

//This endpoint destroy the session active
app.get('/logout', (req, res)=>{
    req.logout();
    res.send('Success!');
});

//This endpoint send the info of the user with the session active
app.get('/info-user', async(req, res)=>{
    let username = req.user._conditions;
    let userCome = await userSchema.find(username);
    let user = {email:userCome[0].email, username:userCome[0].username, direccion:userCome[0].direccion, edad:userCome[0].edad, phone:userCome[0].phone, avatar:userCome[0].avatar}
    res.json(user);
});
////////////////////////
///////////////////////
////////////////////////



//Server
const server = app.listen(PORT, () => {console.log('Servidor escuchando en el puerto 8080');});
//errors
server.on('error', error => {res.json({ error: -2, descripcion: 'Ruta con método no implementada' }, error);});