const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const path= require('path');
const shortid = require('shortid');


const fileStorage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null,path.join(path.dirname(__dirname),'uploads'));
    },
    filename: (req, file, cb)=> {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

  const upload = multer({storage:fileStorage});

router.post('/product/create',requireSignin,adminMiddleware,upload.array("productPicture"),createProduct);

module.exports = router;