const express = require("express");
const router = express.Router();
const multer = require('multer');

//Storage for images
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './uploads/fundraiser/image');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + "_" + file.originalname );
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 5,
    },
  });

//Importing fundraiser controller
const fundraiserController = require('../controllers/fundraiser');

//add fundraiser
router.post("/create", upload.single('image'), fundraiserController.createFundraiser);

// Get fundraiser details by id
router.get("/:id", fundraiserController.getFundraiser);

// Get fundraiser by period
router.get("/ngo/:ngoId/period/:period", fundraiserController.getFundraiserByPeriod);

// Update fundraiser 
router.put("/:id/ngo/:ngoId", fundraiserController.updateFundraiser);

// Update image for fundraiser
router.put("/:id/image", upload.single('image'), fundraiserController.updateImage);

router.delete("/:id/ngo/:ngoId", fundraiserController.deleteFundraiser);

module.exports = router;

