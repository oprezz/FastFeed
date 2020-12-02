var express = require('express');
var router = express.Router();
var FoodService = require('../services/service.food');
var db = require('../bin/db.js');
const Allergies = require('../models/user.allergies');
const SpecDiet = require('../models/user.specdiet');
const FoodModel = require("../models/model.food.js");


/* adds a new user to the list */
router.post('/add', async (req, res, next) =>
{
    let allergies = new Allergies();
    allergies.updatevalues(false, true, true);
    let specdiet = new SpecDiet();
    specdiet.updatevalues(true, false, false);
    console.log("specdiet", specdiet);
	let food = new FoodModel("Hereporkolt", "Jozsi bacsi vendegloje", "Autentikus magyar etel", allergies, specdiet, 1, 0, '/assets/jonyi_hereporkolt.jpg');
    
    console.log('Post register invoked!');
    console.log(food);
    
    const foodCol = db.get().collection("foods");
    await foodCol.insertOne(food);
    
    // try
	// {		
	// 	let _user = await UserService.create(body);
	// 	if(body.guid != null)
	// 	{
	// 		_user.guid = body.guid;
	// 	}

	// 	res.cookie('guid', _user.guid, { maxAge: 900000, httpOnly: true });
	// 	_user = await UserService.updateGuid(_user.username, _user.guid);

	// 	// created the user! 
	// 	return res.status(201).json({ user: _user });
	// }
	// catch(err)
	// {
	// 	console.log('5');
	// 	if (err.name === 'ValidationError')
	// 	{
    //     	return res.status(400).json({ error: err.message });
	// 	}

	// 	// unexpected error
	// 	return next(err);
	// }
});

/* retrieves a user by uid */
// router.get('/:id', async (req, res, next) =>
// {
// 	try
// 	{
// 		const user = await UserService.retrieve(req.params.id);

// 		return res.json({ user: user });
// 	}
// 	catch(err)
// 	{
// 		// unexpected error
// 		return next(err);
// 	}
// });

/* retrieves a customer by username */
router.get('/getfood', async (req, res, next) =>
{
	try
	{   
        console.log("food:", req.query);
		// req.params.id
		const food = await FoodService.retrieve(req.query.name);
		return res.json({food: food})
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;
