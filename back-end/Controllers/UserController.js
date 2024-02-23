const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../Modules/users");
const Follow = require("../Modules/follow");

var session = require('express-session');

const bcrypt = require('bcryptjs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/img/user')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({storage:storage});
// get all user
router.get('/077137bb-22ec-479c-8be3-62dd5c9e599d', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.send('Error' + err);
    }

});

//add user (Sign-up)
router.post('/6e45ab7f-4ccc-451b-8e8a-fca558df5f0c', async(req, res) => {
    if(await req.body.password != req.body.confirmpassword){
        res.json({'Result':"Confirm Password does not match"});
    }else{
        const checkuser = await User.findOne({ username: req.body.username });
        if (checkuser == null) {
            var hashedpassword = await bcrypt.hash(req.body.password,12)
            var users = new User();
            users.username = req.body.username;
            
            users.password = hashedpassword;
            users.fullname = req.body.fullname;
            users.email = req.body.email;
            users.phone = null;
            users.birthday = null;
            users.avatar = "80-805523_default-avatar-svg-png-icon-free-download-264157";
            users.country = null;
            users.gender = true;
            users.follower = 0;
            users.isAdmin = false;
            try {
                users.save();
                res.json({ users, 'Sucessful': true });
            } catch (err) {
                res.json({ 'Error': err });
            }
        } else {
            res.json({ 'Sucessful': false });
        }
    }
});
//Authentication (Sign-in)
router.post('/4b3735b2-533d-4963-9e39-8cb61f3d1198', async(req, res) => {
    const checkuser = await User.findOne({ username: req.body.username });
    if (checkuser == null)  {
        res.json({ 'Sucessful': false });
    } else if(await bcrypt.compare(req.body.password,checkuser.password)== true){
        req.session.loggedin = true;
        req.session.username = checkuser.username;
        req.session.id = checkuser._id;
        res.json({ checkuser, 'Sucessful': true });
    }else{
        res.json({ 'Sucessful': false });
    }
});
//log out
router.get('/15a593b9-1208-41f7-baac-53db63f04ba1',(req,res)=>{
    if(req.session){
        req.session.loggedin = false;
        req.session = null;
        delete req.session;
        res.json({ "Session": req.session,'Sucessful': true });
    }
});

//restore Password
router.post('/06b5a92f-4299-47ed-a7b4-d4a90341496c',async(req,res)=>{
    let expired_time = "60m";
    await User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) {
            return res.json({
              result: "error",
              message: "User with that email does not exist",
            });
          }
    const token = generateJwtToken(user._id, user.isAdmin);
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: req.body.email,
        subject: `Password Reset link`,
        html: `
                    <h1>Please use the following link to reset your password</h1>
                    <a href="http://localhost:9000/user/3c5b2a09-762c-44ae-a01e-3bed04e04834/${token}">Reset passord link</p>
                    <hr />
                    <p>This link will expired in 60 minutes</p>
  
                `,
      };
      user.updateOne({ resetPasswordToken: token }, (err, success) => {
        if (err) {
          console.log("RESET PASSWORD LINK ERROR", err);
          return res.status(400).json({
            result: "error",
            message: "Database connection error on user password forgot request",
          });
        } else {
          transporter
            .sendMail(emailData)
            .then((res) => {
              return res.json({
                result: "success",
                message: `Email has been sent to ${req.body.email}. Follow the instruction to activate your account`,
              });
            })
            .catch((err) => {
              return res.json({ result: "error", message: err.message });
            });
        }
      });
    });
});
router.post('3c5b2a09-762c-44ae-a01e-3bed04e04834/:token',async(req,res)=>{
  let resetPasswordToken = req.query.token;
  if (resetPasswordToken) {
    jsonwebtoken.verify(
      resetPasswordToken,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
          return res.json({
            result: "error",
            message: "Expired link. Try again",
          });
        }
      }
    );
    let hashed_password= await bcrypt.hash(req.body.password, 12);
    await User.findOneAndUpdate(
      { resetPasswordToken: resetPasswordToken },
      {password:hashed_password}
    ).then((responses) => {
      return res.json({
        result: "success",
        message: "Password update succesfully your can try login again",
      });
    });
  } else {
    return res.json({
      result: "error",
      message: "No Found Token",
    });
  }
});
// get user by id
router.get('/077137bb-22ec-479c-8be3-62dd5c9e599d/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(req.body.id_user != null){
            var result = checkfollowed(user._id,req.body.id_user);
            res.json(post, {isLiked : result});
        }
        else{
            res.json(user);
        }
    } catch (err) {
        res.send('Error' + err);
    }
});
//update information user
router.post('/509b6cf0-3996-4853-8e28-1dcd93ac14f2/:id',upload.single('userImage'), async(req, res) => {
    try {
        if(req.file){
            await User.findByIdAndUpdate(req.params.id,{
                avatar : req.file.filename
            });
        }
        await User.findByIdAndUpdate(req.params.id,{
            username : req.body.username,
            fullname : req.body.fullname,
            email:req.body.email,
            phone : req.body.phone,
            birthday : req.body.birthday,
            gender: req.body.gender,
            country: req.body.country
        });
        res.json({'Sucessful': true });
    } catch (err) {
        res.send('Error' + err);
    }
});
//change password
router.post('/e0c48bcf-db97-4c31-82f1-e87ecc9e58c8/:id', async(req,res)=>{
    try{
        var hashedpassword = await bcrypt.hash(req.body.password,12);
        await User.findOneAndUpdate(req.params.id,{password:hashedpassword});
    }catch(err){
        res.send('Error' + err);
    }
});
//follow-unfollow user
router.post('/26828687-b3e0-431b-9226-55fb3a857bef', async(req, res) => {
    try {
        var checkfollow = Follow.findOne({id_user: req.body.id_user,id_follower: req.body.id_post});
        if(checkfollow  == null){
            FollowUser(req.body.id_followed,req.body.id_user);
        }
        else{
            decreaseLikePost(req.body.id_followed,req.body.id_user);
        }
        res.json({'Sucessful': true });
    }
    catch{
        res.send('Error' + err);
    }
});

function FollowUser(id_User,id_Follower){
    var user = User.findOne({_id:id_User});
    var count = user.follower;
    User.findByIdAndUpdate(id_User,{follower: ++count});
    const follow = new Follow(
        id_user = id_User,
        id_follower = id_Follower
    )
    Follow.save();
}

function UnFollowUser(id_Followed,id_Follower){
    var user = User.findOne({_id:id_Followed});
    var count = user.follwer;
    User.findByIdAndUpdate(id_Followed,{follower: --count});
    Follow.deleteOne({id_user:id_Followed,id_follower:id_Follower});
}

//check is user followed ?
function checkfollowed(id_Followed,id_Follower){
    Follow.find({id_user:id_Followed}).forEach(function () {
        if(id_follower == id_Follower ) return true;
    });
    return false;
}
module.exports = router;