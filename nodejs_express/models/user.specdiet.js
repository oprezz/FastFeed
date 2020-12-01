class SpecDiet
{
    paleo;
    vegetarian;
    vegan;

    constructor()
    {
        this.paleo = false;
        this.vegetarian = false;
        this.vegan = false;
    }

    updatevalues(paleo, vegetarian, vegan)
	{
        this.paleo = paleo;
        this.vegetarian = vegetarian;
        this.vegan = vegan;

        return this;
    }
    
	updatespecdiet(specdiet)
	{
        this.paleo = specdiet.paleo;
        this.vegetarian = specdiet.vegetarian;
        this.vegan = specdiet.vegan;

        return this;
	}
}

module.exports = SpecDiet;