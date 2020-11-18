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
        this.restaurantPref = 8;
        this.orderPref = 5;
        this.cashPref = 5;
        this.cardPref = 5;
        this.fastfoodPref = 5;
        this.finedinePref = 5;
        this.specdiet = "specdiet";
        this.allergies = "allergies";
    }

	updatevalues(restaurantPref, orderPref, cashPref, cardPref, fastfoodPref, finedinePref, specdiet, allergies)
	{
        this.restaurantPref = restaurantPref;
        this.orderPref = orderPref;
        this.cashPref = cashPref;
        this.cardPref = cardPref;
        this.fastfoodPref = fastfoodPref;
        this.finedinePref = finedinePref;
        this.specdiet = specdiet;
        this.allergies = allergies;
        return this;
	}
}

module.exports = UserPreferences;

