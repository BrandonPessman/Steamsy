const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    res.status(201).json({"message": "POST Review"});
})

router.get("/:reviewId", (req, res) => {
    const id = req.params.reviewId;
    res.status(200).json({
        "message": "GET Review",
        "id": id
    });
});

router.patch("/:reviewId", (req, res) => {
    res.status(200).json({"message": "PATCH Review"});
})

router.delete("/:reviewId", (req, res) => {
    res.status(200).json({"message": "DELETE Review"});
})

module.exports = router;