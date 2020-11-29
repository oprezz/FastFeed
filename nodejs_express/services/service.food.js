
const FoodModel = require("../models/model.food.js");
let Validator = require('fastest-validator');
var db = require('../bin/db.js')

let foods = {};
let foodCounter = 0;

/* create an instance of the validator */
let foodValidator = new Validator();

/* food validator shema */
const foodVSchema = {
    name: { type: "string", min: 3 },
    place: { type: "string", min: 3 },
    allergens: { type: "array" },
    diet: { type: "array" },
    category: { type: "string" },
    order: { type: "bool" },
    img: { type: "string" }
};

/* static user service class */
class FoodService
{
    static async create(data)
    {
        var vres = foodValidator.validate(data, foodVSchema);
        /* validation failed */
        if(!(vres === true))
        {
            let errors = {}, item;
            for(const index in vres)
            {
                item = vres[index];

                errors[item.field] = item.message;
            }
            throw {
                name: "ValidationError",
                message: errors
            };
        }

        let food = new FoodModel(data.name, data.place, data.allergens, data.diet, data.category, data.order);
        const foodCol = db.get().collection("foods");
        await foodCol.insertOne(food);
        return food;
    }

    static async retrieve(name)
    {
        console.log('Requested user by username:', name);
        const usercol = db.get().collection("foods");
        const user = await usercol.findOne({username: name});
        if(user == null)
        {
            console.error('Unable to retrieve a user by (username:'+ name +')');
        }
        else
        {
            console.log('Food (name:'+ name +') retrieved from DB!');
        }

        return user;
    }

    static async delete(name)
    {
        try{
            await db.get().collection("foods").remove({username : name});
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAll()
    {
        await db.get().collection('foods').find({}).toArray()
            .then((users) => {
                console.log('Foods', users);
            });
    }
}

module.exports = FoodService;
