var express = require('express');
var router = express.Router();
var UserService = require('../services/service.user');
var db = require('../bin/db.js')

/* GET user listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid User UID."});
});

/* adds a new user to the list */
router.post('/register', async (req, res, next) =>
{
	const body = req.body;
	console.log('Post register invoked!');
	console.log(body);
	try
	{		
		let _user = await UserService.create(body);
		if(body.guid != null)
		{
			_user.guid = body.guid;
		}

		res.cookie('guid', _user.guid, { maxAge: 900000, httpOnly: true });
		_user = await UserService.updateGuid(_user.username, _user.guid);

		// created the user! 
		return res.status(201).json({ user: _user });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a user by uid */
// router.get('/:id', async (req, res, next) =>
// {
// 	try
// 	{
// 		const user = await UserService.retrieve(req.params.id);

// 		return res.json({ user: user });
// 	}
// 	catch(err)
// 	{
// 		// unexpected error
// 		return next(err);
// 	}
// });

/* retrieves a customer by username */
router.get('/:username', async (req, res, next) =>
{
	try
	{
		// req.params.id
		const user = await UserService.retrieve(req.param.username);
		return res.json({user: user})
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the userpreferences by uid */
router.put('/update', async (req, res, next) =>
{
	const body = req.body;
	try
	{
		let _user = UserService.createModel(body);
		await UserService.updatePreferences(_user);
		return res.status(200).json({ user: _user });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the user from the user list by uid */
router.delete('/username', async (req, res, next) =>
{
	try
	{
		const user = await UserService.delete(req.query.username);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* checks user login TODO */
router.post('/authenticate', async (req, res, next) =>
{
	const body = req.body;
	try
	{
		const {user: _user, error: _error} = await UserService.login(body.username, body.password);
		console.log("Login requested for user:", _user);

		if (_user == null)
		{
			return res.status(400).json({error: _error});
		}
		if (_user.guid != null)
		{
			res.cookie('guid', _user.guid, { maxAge: 900000, httpOnly: true });

			// created the user! 
			return res.status(200).json({ user: _user });
		}
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});


router.get('/users', (req, res) => {
	UserService.getAll();
	return;
});

module.exports = router;
