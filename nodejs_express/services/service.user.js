const UserModel = require("../models/model.user");
let Validator = require('fastest-validator');


let users = {};
let counter = 0;

/* create an instance of the validator */
let userValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let usernamePattern = /([A-Za-z0-9\-\’])*/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* user validator shema */
const userVSchema = {
		guid: {type: "string", min: 3},
		
		firstName: { type: "string", min: 1, max: 50, pattern: namePattern},
		lastName: { type: "string", min: 1, max: 50, pattern: namePattern},
		//email: { type: "email", max: 75 },
		username: { type: "string", min: 3, max: 50},
		password: { type: "string", min: 2, max: 50, pattern: passwordPattern}
	};

/* static user service class */
class UserService
{
	static create(data)
	{
		var vres = userValidator.validate(data, userVSchema);
		/* validation failed */
		if(!(vres === true))
		{
			let errors = {}, item;
			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

		let user = new UserModel(data.first_name, data.last_name, data.username, data.password);
		// TODO check if email already exists.. 

		user.uid = 'c' + counter++;
		users[user.uid] = user;

		return user;
	}

	static retrieve(uid)
	{
		if(users[uid] != null)
		{
			return users[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(users[uid] != null)
		{
			const user = users[uid];
			
			Object.assign(user, data);
		}
		else
		{
			throw new Error('Unable to retrieve a user by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(users[uid] != null)
		{
			delete users[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a user by (uid:'+ cuid +')');
		}
	}
}

module.exports = UserService;