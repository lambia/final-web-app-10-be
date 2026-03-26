const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.index);
router.get("/:id", bookController.show);
router.post("/:id/reviews", bookController.storeReview);

module.exports = router;