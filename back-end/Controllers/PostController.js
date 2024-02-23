const express = require("express");
const multer = require("multer");
// var AWS = require("aws-sdk");

const Post = require("../Modules/post");
const Place = require("../Modules/places");
const Like = require("../Modules/likePost");

const router = express.Router();

// let s3bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   });

// var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/img/post')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    } 
  })
  var upload = multer({storage:storage});

// get all post by user
router.get('/07f59b0f-31db-4e34-b998-c494a2af9520/:iduser', async(req, res) => {
    try {
        const posts = await Post.find({userPost:req.params.iduser});
        res.json(posts);
    } catch (err) {
        res.send('Error' + err);
    }
});

//get all post by place
router.get('/6f65f910-b4c7-4276-9410-dbb46b1f7ad6/:idplace', async(req, res) => {
    try {
        const posts = await Post.find({place:req.params.idplace});
        res.json(posts);
    } catch (err) {
        res.send('Error' + err);
    }
});

//get one post (detail post)
router.post('/4911b499-bc8a-42a9-8cf0-34b1dd7f3c71/:idpost', async(req, res) => {
    try {
        const post = await Post.findOne({_id:req.params.idpost});
        if(req.body.id_user != null){
            var result = checkliked(post._id,req.body.id_user);
            res.json(post, {isLiked : result});
        }
        else{
            res.json(post);
        }
    } catch (err) {
        res.send('Error' + err);
    }
});

//create new post
router.post('/5469597b-3042-4088-a657-599bf3d9b1ba', upload.single('postImage'), async(req, res) => {
    let postTime = new Date();
    var post = new Post();
    if(req.file){
        // var params = {
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Key: file.originalname,
        //     Body: file.buffer,
        //   };
        post.image = req.file.filename;    
    }
    post.title = req.body.title;
    post.place =req.body.place;
    post.content = req.body.content;
    post.userPost = req.body.userPost;
    post.postDate = postTime;
    post.rating =req.body.rating;
    post.updateDate = null;
    post.like = 0;
    post.reported = 0;
    try {
        post.save();
        await updateRatingPlace(post.place,post.rating);
        res.json(post);
    } catch (err) {
        res.send('Error' + err);
    }
});

async function updateRatingPlace(id,rating){
    const place = await Place.findOne({_id:id});
    const count = await Post.count({place:id});
    const sum = place.sum_rating + rating;
    place.sum_rating = sum;
    place.rating = parseInt(sum/count);
    await Place.updateOne({_id: place._id},{
        rating : place.rating,
        sum_rating : place.sum_rating
    });
}
async function fixRatingPlace(id,rating){
    const place = await Place.findOne({_id:id});
    const count = await Post.count({place:id}) - 1;
    const sum = place.sum_rating - rating;
    place.sum_rating = sum;
    place.rating = parseInt(sum/count);
    await Place.updateOne({_id: place._id},{
        rating : place.rating,
        sum_rating : place.sum_rating
    });
}
//update post
router.post('/075313a0-481a-4a13-9765-3f14ee17b612', async(req, res) => {
    try {
        let updateTime = new Date();
        if(req.file){
            await Post.findOneAndUpdate({_id: req.body._id},{
                image  :req.files.filename
            })
        }
        await Post.findOneAndUpdate({_id: req.body._id},{
            title : req.body.title,  
            place : req.body.place,
            content : req.body.content,
            updateDate : updateTime,
            rating : req.body.rating,
        });
        res.json({'Sucessful': true });
    }
    catch (err) {
        res.send('Error' + err);
    }
});

//like Post-unlike Post
router.post('/094a0019-5f18-4c53-b8fc-a8142a21e622', async(req, res) => {
    try {
        checklike = await Like.findOne({id_user: req.body.id_user,id_post: req.body.id_post});
        if(checklike == null){
            await increaseLikePost(req.body.id_user,req.body.id_post);
        }
        else{
            await decreaseLikePost(req.body.id_user,req.body.id_post);
        }
        res.json({'Sucessful': true });
    }
    catch{
        res.send('Error' + err);
    }
});

//delete Post
router.post('/ca4ed1b4-e4d0-4c15-8728-1c1172a650b5/:id', async(req, res) => {
    try {
        await Like.deleteMany({id_post:req.params.id});
        const post = await Post.findOne({_id:req.params.id});
        await fixRatingPlace(post.place,post.rating);
        await Post.findOneAndDelete({_id: req.params.id});
        res.json({'Sucessful': true });
    }
    catch{
        res.send('Error' + err);
    }
});

 async function increaseLikePost(id_User,id_Post){
    var post = await Post.findOne({_id:id_Post});
    var count = post.like;
    await Post.findByIdAndUpdate(id_Post,{like: ++count});
    const likes = new Like();
    likes.id_user = id_User,
    likes.id_post = id_Post
    likes.save();
}

 async function decreaseLikePost (id_User,id_Post){
    var post = await Post.findOne({_id:id_Post});
    var count = await post.like;
    await Post.findByIdAndUpdate(id_Post,{like: --count});
    await Like.deleteOne({id_user:id_User,id_Post:id_Post});
}

//check is post liked
//check is user followed ?
async function checkliked(id_Post,id_User){
    await Like.find({id_post:id_Post}).forEach(function () {
        if(id_user == id_User ) return true;
    });
    return false;
}

module.exports = router;