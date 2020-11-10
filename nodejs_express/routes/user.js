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
		const user = await UserService.create(body);
		if(body.guid != null)
		{
			user.guid = body.guid;
		}
		res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });
		
		// add user to DB
		const usercol = db.get().collection("users");
		const p = usercol.insertOne(user);
		console.log('User added!')
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
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const user = await UserService.retrieve(req.params.id);

		return res.json({ user: user });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* retrieves a customer by uid */
// router.get('/:id', async (req, res, next) =>
// {
// 	try
// 	{
// 		const customer = await CustomerService.retrieve(req.params.id);

// 		return res.json({ customer: customer });
// 	}
// 	catch(err)
// 	{
// 		// unexpected error
// 		return next(err);
// 	}
// });

/* updates the user by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const user = await UserService.update(req.params.id, req.body);

		return res.json({ user: user });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the user from the user list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const user = await UserService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* checks user login TODO */
router.post('/login', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const user = await UserService.create(body);

		if(body.guid != null)
		{
			user.guid = body.guid;
		}

		res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });

		// created the user! 
		return res.status(201).json({ user: user });
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
	db.get().collection('people').find({}).toArray()
	.then((users) => {
            console.log('Users', users);
        });
});

module.exports = router;
