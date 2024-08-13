const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");

const reviewControler = require("../controller/review.js");
const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
//    console.log(result);
   if(error){
    let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else {
    next();
   }
};

//Review 
//Post Review Route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewControler.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewControler.destroyReview)
);

module.exports = router;