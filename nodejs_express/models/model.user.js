class UserModel
{
	constructor(firstName, lastName, username, password, uid)
	{
		this.uid = uid;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
	}
}

module.exports = UserModel;

