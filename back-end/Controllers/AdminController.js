const express = require("express");
const User = require("../Modules/users");
const Category = require("../Modules/category");
const Like = require('../Modules/likePost');
const Follow = require('../Modules/follow');
const Place = require("../Modules/places");
const Post = require("../Modules/post");
const router = express.Router();

const bcrypt = require('bcryptjs');
const { json } = require("body-parser");

//Authentication admin (Login AdminPage)
router.post('/0508c70f-e907-4d2a-a718-479e6fab5749', async(req, res) => {
    const checkuser = await User.findOne({ username: req.body.username });
    if (checkuser == null) {
        res.json({ 'Sucessful': false });
    } else if(await bcrypt.compare(req.body.password,checkuser.password)== true && checkuser.isAdmin == true) {
        res.json({ checkuser,'Sucessful': true });
    } else {
        res.json({'Sucessful': false });
    }
});
//delete user
router.delete('/d9bf9936-c269-401e-a811-bb2b19b40be6/:id',async(req,res)=>{
    try {
        await Follow.deleteMany({id_user:req.params.id});
        await Follow.deleteMany({id_follower:req.params.id});
        await Like.deleteMany({id_user:req.params.id});
        const posts = await Post.find({userPost:req.params.id});
        posts.forEach(post => {
            await Like.deleteMany({id_post:post._id});
            await fixRatingPlace(post.place,post.rating);
            Post.findByIdAndDelete(post._id);
        });
        await User.findOneAndDelete({_id: req.params.id});
        res.json({'Sucessful': true});} 
    catch (err) {
        res.send('Error' + err);
    }
});

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
// get all place need be accepted
router.get('/9498b701-7324-4825-b5b2-895bc471ec78', async(req, res) => {
    try {
        const places = await Place.find({status:false});
        res.json(places);
    } catch (err) {
        res.send('Error' + err);
    }
});
//accept post new place
router.post('/38125532-3ba8-4019-a7ea-17d88ea3cb32/:id',async(req,res)=>{
    try{
        place = await Place.findOne({_id: req.params.id});
        await increaseCategoryNumber(place.categories);
        await Place.findOneAndUpdate({_id: req.params.id},{
        status : true
    });
    res.json({"Successful":true,place});
    }
    catch (err){
        res.send('Error' + err);
    }
});
async function increaseCategoryNumber(id){
    try {
        const categories = await Category.findById(id);
        categories.number += 1;
        await Category.findByIdAndUpdate(id,{number:categories.number});
    } catch (err) {
        res.send('Error' + err);
    }
}
//get reported post
router.get('/7d075fed-f74a-4c94-8897-331430d92514',async(req,res)=>{
    var count = User.count();
    if(count <=10 ){
        reportedPost = await Post.find({reported: { $gte: count/3 } });
    }
    else{
        reportedPost = await Post.find({reported: { $gte: 10 } });
    }
    res.json({ reportedPost});
});

module.exports = router;