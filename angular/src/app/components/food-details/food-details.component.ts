import {Component, OnInit} from '@angular/core';

import {foodiesGoodies, Food} from '../../classes/foods';
import {Coffee} from '../../classes/coffee';

@Component({
    selector: 'app-food-details',
    templateUrl: './food-details.component.html',
    styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {

    public name: string;
    public img: string;
    public description: string;
    public allergens: string[];
    public specdiet: string[];

    public lactosestring: string;
    public nutsstring: string;
    public glutenstring: string;
    public vegeterianstring: string;
    public veganstring: string;
    public paleostring: string;
    public coffee: Coffee;
    public food;
    constructor() {}

    ngOnInit(): void {}

    receiveFoodId(recommendation): void {
      if(recommendation != null){

        console.log(recommendation);
        this.food =  recommendation.foods;
        this.coffee =  recommendation.coffee;

        if(this.food.allergens.nuts)
          this.nutsstring = "Yes";
        else
          this.nutsstring = "No";
        if(this.food.allergens.lactose)
          this.lactosestring = "Yes";
        else
          this.lactosestring = "No";
        if(this.food.allergens.gluten)
          this.glutenstring = "Yes";
        else
          this.glutenstring = "No";

        if(this.food.specdiet.vegetarian)
          this.vegeterianstring = "Yes";
        else
          this.vegeterianstring = "No";
        if(this.food.specdiet.vegan)
          this.veganstring = "Yes";
        else
          this.veganstring = "No";
        if(this.food.specdiet.paleo)
          this.paleostring = "Yes";
        else
          this.paleostring = "No";
        
        const detailsCard: HTMLElement = document.getElementById('item-details');
        detailsCard.hidden = false;
      }
    }
}
