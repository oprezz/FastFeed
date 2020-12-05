var SpecDiet = require('./user.specdiet.js')
var Allergies = require('./user.allergies.js')

class FoodModel {
    constructor(name, place, description, allergens, specdiet, isInplace, payment, foodtype, img) {
        this.name = name;
        this.place = place;
        this.description = description;
        this.specdiet = new SpecDiet();
        this.specdiet.updatespecdiet(specdiet);
        this.allergens = new Allergies();
        this.allergens.updateallergies(allergens);
        this.isInplace = isInplace;
        this.payment = payment;
        this.foodtype = foodtype;
        this.img = img;
    }
}

module.exports = FoodModel;
