import {Component, OnInit} from '@angular/core';

import {foodiesGoodies, Food} from '../../classes/foods';

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

    constructor() {}

    ngOnInit(): void {}

    receiveFoodId(food): void {
        console.log(food);
        this.name = food.name;
        this.img = food.img;
        this.description = food.description;
        this.allergens = food.allergens;
        this.specdiet = food.specdiet;
        const detailsCard: HTMLElement = document.getElementById('item-details');
        detailsCard.hidden = false;
    }
}
