const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    res.status(201).json({"message": "POST Game"});
})

router.get("/:gameId", (req, res) => {
    const id = req.params.gameId;
    res.status(200).json({
        "message": "GET Game",
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