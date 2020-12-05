var express = require('express');
var router = express.Router();
var db = require('../bin/db.js')
var router = express.Router();
var UserService = require('../services/service.user');
var UserModel = require('../models/model.user')
var FoodService = require('../services/service.food');
const Allergies = require('../models/user.allergies');
const SpecDiet = require('../models/user.specdiet');
const FoodModel = require("../models/model.food.js");

class RecommendationService {
    static recommendFood(user, allfood){
        var foodWithCorrectDiet = allfood.filter(function(allfoodObj) {
        console.log("Food recommendation service invoked!");
            if ((user.preferences.specdiet.paleo === true) && (allfoodObj.specdiet.paleo === false)) // the user can not consume this food, return false
                return false;
            if ((user.preferences.specdiet.vegetarian === true) && (allfoodObj.specdiet.vegetarian === false))
                return false;
            if ((user.preferences.specdiet.vegan === true) && (allfoodObj.specdiet.vegan === false)) 
                return false;
            return true;
        });

        // console.log("foodWithCorrectDiet", foodWithCorrectDiet);
        var foodWithoutAllergens = foodWithCorrectDiet.filter(function(foods) {
            if ((user.preferences.allergies.lactose === true) && (foods.allergens.lactose === true)) // user is allergic to lactose, AND the food contains -> sort it out
                return false;
            if ((user.preferences.allergies.gluten === true) && (foods.allergens.gluten === true))
                return false;
            if ((user.preferences.allergies.nuts === true) && (foods.allergens.nuts === true))
                return false;
            return true;                
        });
        // console.log("foodWithoutAllergens", foodWithoutAllergens);
        return foodWithoutAllergens[0];
    }

    static recommendCoffee(user, coffee)
    {
        console.log("Coffee recommendation service invoked!");
        if(user.preferences.coffee == false)
            return null;
        var rnd = Math.floor(Math.random() * coffee.length);
        return coffee[rnd];        
    }
}
module.exports = RecommendationService;