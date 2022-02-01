const userSchema = require('../../schemas/userSchema');
const {transporterG, mailOptionsG} = require('../../mail/gmail');
const bCrypt = require('bcrypt');

//Function to encrypt the password
let createHash = (pass)=>{
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(10), null);
}

//Function to destroy the session
const logout = (req, res)=>{
    req.logout();
    res.send('Success!');
}

//Function to know if one user is logged in
const isLog = (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
}

//Funtion to register one user
const SignUp = (req, username, password, done) => {
    const createUser = async()=>{
        //We search if exist one user with the username receipt
        let userIs = await userSchema.find({username: username});
        //If user exist, we return error
        if(userIs.length > 0) return done(null, false);
        //set the new user to register, encrypt the password
        let user = {username: username, password: createHash(password), email: req.body.email, direccion: req.body.direccion, phone: req.body.phone, edad: req.body.edad, avatar: req.body.avatar};
        //Save the user in the DB
        const newUser = new userSchema(user);
        await newUser.save((err)=>console.log(err));  
        console.log('Ok');
        return done(null, [user]);
    }
    //Send a mail to the new user
    transporterG.sendMail(mailOptionsG(req.body), (err, info) => {
        if(err) {return err}});
    process.nextTick(createUser);
}

//Funtion to logged in an user
const LogIn = async (req, username, password, done) => {
    //we comprobe if the user exist
    let user = await userSchema.find({username: username});
    //if doesn't exist, we return an error
    if(!user) return done(null, false);
    //if exist, we comprobe the password and do the login
    let success =  user[0].username == username && user[0].password == password;
    if(!success) return done(null, false)
    return done(null, user);
}

//export the funtion to use in a route
module.exports = {
    logout,
    isLog,
    SignUp,
    LogIn
};