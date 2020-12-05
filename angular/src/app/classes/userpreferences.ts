import { Allergies } from './allergies';
import { SpecialDiet } from './specialdiet';

export class UserPreferences {
    id: string;
    restaurantPref: number;
    orderPref: number;
    cashPref: number;
    cardPref: number;
    fastfoodPref: number;
    finedinePref: number;
    coffee: boolean;
    specdiet: SpecialDiet;
    allergies: Allergies;
}