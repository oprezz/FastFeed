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
}

module.exports = UserModel;

