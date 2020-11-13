class UserModel
{
	constructor(firstName, lastName, username, password, guid)
	{
		this.guid = guid;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
	}
}

module.exports = UserModel;

