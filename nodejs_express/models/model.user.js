class UserModel
{
	constructor(uid, firstName, lastName, username, password)
	{
		this.uid = uid;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
	}
}

module.exports = UserModel;

