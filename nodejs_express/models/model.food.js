
class FoodModel {
    constructor(name, place, description, allergens, diet, category, order, img) {
        this.name = name;
        this.place = place;
        this.discreption = description;
        this.allergens = allergens;
        this.diet = diet;
        this.category = category;
        this.order = order;
        this.img = img;
    }
}

module.exports = FoodModel;
