var SpecDiet = require('./user.specdiet.js')
var Allergies = require('./user.allergies.js')

class UserPreferences
{
    restaurantPref;
    orderPref;
    cashPref;
    cardPref;
    fastfoodPref;
    finedinePref;
    specdiet;
    allergies;

    constructor()
    {
        this.restaurantPref = 5;
        this.orderPref = 5;
        this.cashPref = 5;
        this.cardPref = 5;
        this.fastfoodPref = 5;
        this.finedinePref = 5;
		this.specdiet = new SpecDiet();
		this.allergies = new Allergies();
    }

	updatevalues(restaurantPref, orderPref, cashPref, cardPref, fastfoodPref, finedinePref, specdiet, allergies)
	{
        this.restaurantPref = restaurantPref;
        this.orderPref = orderPref;
        this.cashPref = cashPref;
        this.cardPref = cardPref;
        this.fastfoodPref = fastfoodPref;
        this.finedinePref = finedinePref;
		this.specdiet.updatespecdiet(specdiet);
		this.allergies.updateallergies(allergies);
        return this;
    }
    
    updatepreferences(userpreferences){
        this.restaurantPref = userpreferences.restaurantPref;
        this.orderPref = userpreferences.orderPref;
        this.cashPref = userpreferences.cashPref;
        this.cardPref = userpreferences.cardPref;
        this.fastfoodPref = userpreferences.fastfoodPref;
        this.finedinePref = userpreferences.finedinePref;
		this.specdiet.updatespecdiet(userpreferences.specdiet);
		this.allergies.updateallergies(userpreferences.allergies);
        return this;
    }
}

module.exports = UserPreferences;

