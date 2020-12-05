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

        var foodWithCorrectService = foodWithoutAllergens.filter(function(foods) {
            //  isInplace: 0 -> inplace, 1 -> both, 2 -> takeaway ||||| orderpref: 0 -> no order, 10 -> only order
            if ((user.preferences.orderPref >= 7) && (foods.isInplace) == 0)    // user WANTS to eat TAKEAWAY but the food is only available for INPLACE
                return false; // food service and user pref does not match
            if ((user.preferences.orderPref <= 3) && (foods.isInplace) == 2)    // user WANTS to eat INPLACE but food is only available for TAKEAWAY
                return false;
            return true;
        });

        var foodWithCorrectPayment = foodWithCorrectService.filter(function(foods) {
            //  payment: 0 -> cash, 1 -> both, 2 -> card ||||| cashPref: 0 -> only card, 10 -> only cashm   3--7: both is ok
            if ((user.preferences.cashPref >= 7) && (foods.payment) == 2)    // user WANTS to pay by CASH but the food is only available by paying with CARD
                return false; 
            if ((user.preferences.cashPref <= 3) && (foods.payment) == 0)    // user WANTS to pay by CARD but the food is only available by paying with CASH
                return false;
            return true;
        });

        var filteredFoods = foodWithCorrectPayment.filter(function(foods) {
            //  foodtype: 0 -> fastfood, 1 -> both/none, 2 -> finedine ||||| fastfoodPref: 0 -> only finedine, 10 -> only fastfood   3--7: both is ok
            if ((user.preferences.fastfoodPref >= 7) && (foods.foodtype) == 2)    // user WANTS to eat FASTFOOD but the food is FINEDINE
                return false; 
            if ((user.preferences.fastfoodPref <= 3) && (foods.foodtype) == 0)    // user WANTS to eat FINEDINE but the food is FASTFOOD
                return false;
            return true;
        });

        
        var rnd = Math.floor(Math.random() * filteredFoods.length);
        return filteredFoods[rnd];
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