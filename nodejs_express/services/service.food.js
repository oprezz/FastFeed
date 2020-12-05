
const FoodModel = require("../models/model.food.js");
let Validator = require('fastest-validator');
var db = require('../bin/db.js')

// let foods = {};
// let foodCounter = 0;

/* static user service class */
class FoodService
{
    static async create(data)
    {
        let food = new FoodModel(data.name, data.place, data.description, data.allergens, data.specdiet, data.category, data.order);
        const foodCol = db.get().collection("foods");
        await foodCol.insertOne(food);
        return food;
    }

    static async retrieve(name)
    {
        console.log('Requested food by foodname:', name);
        const foodcol = db.get().collection("foods");
        const food = await foodcol.findOne({name: name});
        if(food == null)
        {
            console.error('Unable to retrieve a food by (foodname:'+ name +')');
        }
        else
        {
            console.log('Food (name:'+ name +') retrieved from DB!');
            console.log(food);
        }
        

        return food;
    }

    static async delete(name)
    {
        try{
            await db.get().collection("foods").remove({name : name});
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAll()
    {
        try{
            const foods = await db.get().collection("foods").find({}).toArray();
            // console.log("getall foods:", foods);
            return foods;
        }
        catch (err) {
            console.error(err);
        }
    }
    
    static async getAllCoffee()
    {
        try{
            const coffee = await db.get().collection("coffee").find({}).toArray();
            // console.log("getall coffee:", coffee);
            return coffee;
        }
        catch (err) {
            console.error(err);
        }
    }


}
module.exports = FoodService;
