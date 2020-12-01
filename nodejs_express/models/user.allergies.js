class Allergies
{
    lactose;
    gluten;
    nuts;

    constructor()
    {
        this.lactose = false;
        this.gluten = false;
        this.nuts = false;
    }

	updatevalues(lactose, gluten, nuts)
	{
        this.lactose = lactose;
        this.gluten = gluten;
        this.nuts = nuts;
        return this;
    }
    
    updateallergies(allergies){
        this.lactose = allergies.lactose;
        this.gluten = allergies.gluten;
        this.nuts = allergies.nuts;
        return this;
    }
}

module.exports = Allergies;