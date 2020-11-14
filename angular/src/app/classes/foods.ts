
export class Food{
  Id: number;
  Name: string;
  Img: string;
  Description: string;
}

export let foodiesGoodies: Food[] = [
  {
    Id: 1,
    Name: 'Firpo Burger',
    Img: '/assets/fullos_sajtburesz.png',
    Description: 'Finom cucc, baconnel meg minden mi jóval...'
  },{
    Id: 2,
    Name: 'Il Treno Pizza',
    Img: '/assets/pizza.jpg',
    Description: 'Olaszos pizza, magyaros csíposséggel...'
  }];
