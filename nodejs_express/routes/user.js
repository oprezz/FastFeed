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
		
		let user = await UserService.create(body);
		if(body.guid != null)
		{
			user.guid = body.guid;
		}

		res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });
		user = await UserService.updateGuid(user.username, user.guid);

		// created the user! 
		return res.status(201).json({ user: user });
	}
	catch(err)
	{
		console.log('5');
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
router.get('/user', async (req, res, next) =>
{
	try
	{
		// req.params.id
		const user = await UserService.retrieve(req.query.username);
		return res.json({user: user})
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the user by uid */
router.put('/username', async (req, res, next) =>
{
	try
	{
		const user = await UserService.update(req.query.username, req.body);

		return res.json({ user: user });
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
		const user = await UserService.login(body.username, body.password);
		console.log("Login requested for user:", user);

		if (user.guid != null)
		{
			res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });

			// created the user! 
			return res.status(200).json({ user: user });
		}
		else
		{
			return res.status(400).json({error: "Password is not correct"});
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
