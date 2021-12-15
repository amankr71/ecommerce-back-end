const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');

const { addCategory, getCategories } = require('../controller/category');
const router = express.Router();
const path= require('path');
const shortid = require('shortid');
const multer = require('multer');


const fileStorage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null,path.join(path.dirname(__dirname),'uploads'));
    },
    filename: (req, file, cb)=> {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

  const upload = multer({storage:fileStorage});


router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage') ,addCategory );
router.get('/category/getcategory', getCategories );


module.exports = router