var UserPreferences = require('./user.preferences.js')

class UserModel
{
	// guid;
	// username;
	// firstName;
	// lastName;
	// password;
	// preferences;

	constructor(firstName, lastName, username, password, guid)
	{
		this.guid = guid;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.preferences = new UserPreferences();
	}
	
	updateValues(user){
		this.guid = user.guid;
		this.username = user.username;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.password = user.password;
		this.preferences.updatepreferences(user.preferences);
	}
}
module.exports = UserModel;

