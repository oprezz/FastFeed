const UserModel = require("../models/model.user");
let Validator = require('fastest-validator');
var db = require('../bin/db.js')


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
	static async create(data)
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

		let user = new UserModel(data.firstName, data.lastName, data.username, data.password);
		// TODO check if email already exists.. 
		const usercol = db.get().collection("users");
		await usercol.insertOne(user);

		return user;
	}

	static async updateGuid(_username, _guid)
	{
		console.log("Guid update requested!", _username);
		const usercol = db.get().collection("users");
		var user = await usercol.findOne({username: _username});
		user.guid = _guid;
		const newvalues = {$set: {guid: user.guid}};
		user = await usercol.updateOne({username : _username}, newvalues);
		// user = usercol.findOne({username: _username});
		console.log("Guid updated!");
		
		return user;
	}

	static async retrieve(_username)
	{
		console.log('Requested user by username:', _username);
		const usercol = db.get().collection("users");
		const user = await usercol.findOne({username: _username});
		if(user == null)
		{
			console.error('Unable to retrieve a user by (username:'+ _username +')');
		}
		else
		{
			console.log('User (username:'+ _username +') retrieved from DB!');
		}

		return user;
	}

	static async updatePreferences(_user)
	{
		try {
			const query = { username : _user.username };
			const updateDocumentPref = {
				$set: {"preferences": _user.preferences }
			};
			await db.get().collection("users").updateOne(query,updateDocumentPref);
			return true;
		}
		catch (err) {
			console.error(err);
			return null;
		}
	}

	static async delete(_username)
	{
		try{
			await db.get().collection("users").remove({username : _username});
		}
		catch (err) {
			console.error(err);
		}			
	}
	
	static async login(_username, _password){
		const user = await UserService.retrieve(_username);
		if (user.password == _password){
			console.log("User PW correct!")
			return user;
		} else { 
			console.log("User PW incorrect!") // TODO inform user
			return null;
		}
	}

	static async getAll()
	{
		await db.get().collection('users').find({}).toArray()
			.then((users) => {
				console.log('Users', users);
		});
	}

	static createWithPreferences(user, userpreferences)
	{
		user = new UserModel(user.firstName, user.lastName, user.username, user.password, user.guid);
		user.preferences.updatevalues(
			userpreferences.restaurantPref, 
			userpreferences.orderPref,
			userpreferences.cashPref,
			userpreferences.cardPref, 
			userpreferences.fastfoodPref,
			userpreferences.finedinePref,
			userpreferences.specdiet,
			userpreferences.allergies);

		return user;
	}
}

module.exports = UserService;