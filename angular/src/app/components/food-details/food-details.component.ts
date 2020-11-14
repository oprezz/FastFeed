import { Component, OnInit } from '@angular/core';

import { foodiesGoodies, Food } from '../../classes/foods';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {
  private foods;
  public name: string;
  public img: string;
  public description: string;
  constructor() { }

  ngOnInit(): void {
    this.foods = foodiesGoodies;
  }
  receiveFoodId(Id: number): void {
    const food = this.foods.find(f => f.Id === Id);
    this.name = food.Name;
    this.img = food.Img;
    this.description = food.Description;
    let detailsCard: HTMLElement = document.getElementById('item-details');
    detailsCard.hidden = false;
  }
}
