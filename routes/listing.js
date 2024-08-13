const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controller/listing.js");


const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
//    console.log(result);
   if(error){
    let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else {
    next();
   }
};

//Index Route
router.get("/" , wrapAsync(listingController.index));
  
  //New route
  router.get("/new",isLoggedIn,listingController.renderNewForm);
  
  //Show Route
  router.get("/:id" ,wrapAsync(listingController.showListing));
  
  //Create Route
  router.post("/", 
    isLoggedIn,
      validateListing,
      wrapAsync(listingController.createListing));
  
  //Edit Route
  router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditFrom));
  
  //Update Route 
  router.put("/:id" ,
    isLoggedIn,
    isOwner,
      validateListing,
       wrapAsync(listingController.updateListing));
  
  //Delete Route 
  router.delete("/:id" ,
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.destroyListing));

  module.exports = router;