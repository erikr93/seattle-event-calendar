var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req,res){
    console.log("In the profile GET /");
    db.venue.findAll().then(function(result){
        res.render('profile', {result: result})
    });
});

router.post('/', isLoggedIn, function(req,res){
    console.log('post route in profile.js: ', req.body.venueData);
    db.user.find({
        where: {id: req.user.id}
    }).then(function(user){
        console.log("doing something in here?");
        console.log(typeof req.body.id);
        user.createVenue({
            id: req.body.id,
            name: req.body.name || 'NA',
            capacity: req.body.capacity || 0,
            area: req.body.district || 'Seattle'
        }).then(function(venues){
            console.log(venues);
            res.render('profile', {venues: venues});
        });

    });
});



module.exports = router;
