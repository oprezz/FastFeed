import { UserPreferences } from './userpreferences';

export class User {
    guid: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    preferences: UserPreferences;
    token: string;
}