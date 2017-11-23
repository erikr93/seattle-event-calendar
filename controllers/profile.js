var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req,res){
    //console.log("In the profile GET /");
    db.user.find({
        include: [db.venue],
        where: {
            id: req.user.id
        }
    }).then(function(user){
        //console.log("Trying to show the fave venues")
        //console.log(user.venues);
        res.render('profile', {venues: user.venues})
    });
});

router.post('/', isLoggedIn, function(req,res){
    //console.log('post route in profile.js: ', req.body.venueData);
    db.user.find({
        where: {id: req.user.id}
    }).then(function(user){
        // console.log("doing something in here?");
        // console.log(typeof req.body.id);
        user.createVenue({
            id: req.body.id,
            name: req.body.name || 'NA',
            capacity: req.body.capacity || 0,
            area: req.body.district || 'Seattle'
        }).then(function(venues){
            console.log("inside the render function");
            res.render('profile', {venues: venues});
        });
    });
});

router.delete('/:id', isLoggedIn, function(res,req){
    console.log("in te DELETE route" + id);
    db.venues.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(){
        res.render('/')
    })
});

module.exports = router;
