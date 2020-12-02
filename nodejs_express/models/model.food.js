var SpecDiet = require('./user.specdiet.js')
var Allergies = require('./user.allergies.js')

class FoodModel {
    constructor(name, place, description, allergens, specdiet, category, order, img) {
        this.name = name;
        this.place = place;
        this.description = description;
        this.specdiet = new SpecDiet();
        this.specdiet.updatespecdiet(specdiet);
        this.allergens = new Allergies();
        this.allergens.updateallergies(allergens);
        this.category = category;
        this.order = order;
        this.img = img;
    }
}

module.exports = FoodModel;
