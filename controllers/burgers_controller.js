var express = require("express");
// Import burger.js
var burger = require("../models/burger.js");

// Create the router and export it at the end of the file
var router = express.Router();

// Create routes
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Add a new burger to the database
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        // Send back the new burger ID
        res.json({ id: result.insertId });
    });
});

// Update the burger devoured status to true
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            
            // 404 if ID doesn't exist
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

// Delete a burger from the database
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            
            // 404 if ID doesn't exist
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

// Export the router
module.exports = router;