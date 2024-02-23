const express = require("express");
const multer = require("multer");
const router = express.Router();
const Category = require("../Modules/category");
const Place = require("../Modules/places");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/img/category')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({storage:storage});

//post new category
router.post('/70830c14-476d-4ece-b52c-b39e2c4997e4', upload.single('placeImage'), (req, res) => {
    var categories = new Category();
    categories.name = req.body.name;
    categories.avatar = req.file.originalname;
    categories.number = 0;
    
    try {
        categories.save();
        res.json(categories);
    } catch (err) {
        res.send('Error' + err);
    }
});

//get category
router.get('/fc82d78d-ee17-4b3e-8233-e2e074b629ec', async(req, res) => {
    try {
        var categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.send('Error' + err);
    }
});
//get category by id
router.get('/4a2bd1f6-31eb-48c5-a894-8a664423bc01/:id',async(req, res)=>{
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    } catch (err) {
        res.send('Error' + err);
    }
})
//update category
router.post('/0f0ff4fd-c3a6-41ea-927c-6fb058822da5',upload.single('categoryImage'),async(req,res)=>{
    if(req.files){
        await Category.updateOne({_id: req.body._id},{
            name : req.body.name,
            avatar : req.file.filename
        })
    }
    else{
        await Category.updateOne({_id: req.body._id},{
            name : req.body.name
        })
    }
    
})

//delete category
router.post('/5871f3c4-de8e-42c2-808c-31d4db8a0824', async(req, res) => {
    try {
        await Place.findByIdAndUpdate({categories: req.body._id},{categories : null})
        Category.deleteOne({_id: req.body._id});
        res.json({'Sucessful': true });
    }
    catch (err) {
        res.send('Error' + err);
    }
});


module.exports = router;