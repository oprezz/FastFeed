
var express = require('express');
var router = express.Router();
var FoodService = require('../services/service.food');
var db = require('../bin/db.js');
const Allergies = require('../models/user.allergies');
const SpecDiet = require('../models/user.specdiet');
const FoodModel = require("../models/model.food.js");

/* adds a new user to the list */
router.post('/food', async (req, res, next) =>
{
    const user = req.body;
    // lekérni az összes kaját is
    // meghívni egy fv-t ami ajánl egyet
    // Food-dal visszatérni
    // const food = RecommendService.recommendFood(user, allfoods);
    
    return res.status(201).json({ food: food });
});