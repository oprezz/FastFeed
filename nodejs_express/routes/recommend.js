
var express = require('express');
var router = express.Router();
var FoodService = require('../services/service.food');
var db = require('../bin/db.js');
const Allergies = require('../models/user.allergies');
const SpecDiet = require('../models/user.specdiet');
const FoodModel = require("../models/model.food.js");
const UserService = require('../services/service.user');
const RecommendationService = require('../services/service.recommend');

/* adds a new user to the list */
router.post('/food', async (req, res, next) =>
{
    const user = req.body;
    // lekérni az összes kaját is
    // meghívni egy fv-t ami ajánl egyet
    // Food-dal visszatérni
    console.log("server side food gen req");
    const allfoods = await FoodService.getAll();
    const coffees = await FoodService.getAllCoffee();
    // const user = await UserService.retrieve(username);
    const food = RecommendationService.recommendFood(user, allfoods);
    const coffee = RecommendationService.recommendCoffee(user, coffees);
    console.log("coffee:", coffee);
    return res.status(201).json({ foods: food , coffee: coffee});
});

module.exports = router;