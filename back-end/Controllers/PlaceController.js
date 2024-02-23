const express = require("express");
const multer = require("multer");
const Category = require("../Modules/category");
const Post = require("../Modules/post");
const Place = require("../Modules/places");
const router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/img/place')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({storage:storage});


// get all place
router.get('/699f071e-f8c7-40a3-8bfa-0ace8bac87e4', async(req, res) => {
    try {
        const places = await Place.find({status:true});
        res.json(places);
    } catch (err) {
        res.send('Error' + err);
    }
});
// search place by name
router.post('/aee1266f-b0e0-4c55-ba53-c1589c8565dd', async(req, res) => {
    try {
        const places = await Place.find({ name: new RegExp(req.body.name), status: true });
        res.json(places);
    } catch (err) {
        res.send('Error' + err);
    }
});

// search place by region
router.post('/6f0421d5-4357-49f8-8b24-14f79bea7f33', async(req, res) => {
    //search place by name & region
    if(req.body.name){
        try {
            const places = await Place.find({ name: new RegExp(req.body.name) , city: req.body.city, name: req.body.name, status : true });
            res.json(places);
        } catch (err) {
            res.send('Error' + err);
        }
    }
    // search place by region
    else{
        try {
            const places = await Place.find({ address: { city: req.body.city, district: req.body.district }, status : true });
            res.json(places);
        } catch (err) {
            res.send('Error' + err);
        }
    }
});

// get place by categories
router.get('/6f0421d5-4357-49f8-8b24-14f79bea7f33/:categories', async(req, res) => {
    try {
        const places = await Place.find({ categories: req.params.categories , status : true});
        res.json(places);
    } catch (err) {
        res.send('Error' + err);
    }
});

//post new place
router.post('/91d3992a-fb5f-403b-9274-128732a700d7', upload.array('placeImages',12), async(req, res) => {
    const places = new Place();
    places.name = req.body.name;    
    places.address = {
            city: req.body.city,
            district: req.body.district,
            address: req.body.address
        };
        places.image =req.files.filename;
        places.categories = req.body.categories;
        places.sum_rating = 0;
        places.rating =0;
        places.status = false;
    try {
        places.save();
        res.json(places);
    } catch (err) {
        res.send('Error' + err);
    }
});


// get place by id
router.get('/b0146340-5a11-49b5-a2f7-9b31baad0e5c/:id', async(req, res) => {
    try {
        const place = await Place.findOne({_id:req.params.id});
        res.json(place);
    } catch (err) {
        res.send('Error' + err);
    }
});
//update place or admin accept post the place
router.post('/cfc9853d-2866-473d-b274-88d838ea29c1', async(req, res) => {
    try {
        if(req.files){
            await Place.updateOne({_id: req.body._id},{
                image : req.files.filename
            })
        }
        if(req.file){
            await Place.updateOne({_id: req.body._id},{
                avatar : req.file.originalname,
            })
        }
        await Place.updateOne({_id: req.body._id},{
            name : req.body.name,
            address : {
                city: req.body.city,
                district: req.body.district,
                address: req.body.address
            },
            status : true
        })
        res.json({'Sucessful': true });
    }
    catch (err) {
        res.send('Error' + err);
    }
});

//delete Place
router.post('/b1ba7a47-29a2-470c-9a98-b511b401dd4b/:id', async(req, res) => {
    try {
        await Post.deleteMany({place:req.params.id});
        categories = Category.find({_id: req.body.categories});
        Place.deleteOne({_id: req.params.id});
        categories.number--;
        await Category.findByIdAndUpdate({_id:req.body.categories},{number:categories.number--});
        res.json({'Sucessful': true });
    }
    catch (err) {
        res.send('Error' + err);
    }
});

module.exports = router;