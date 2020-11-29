
var express = require('express');
var router = express.Router();
var CalendarService = require('../services/service.calendar');
var db = require('../bin/db.js')

/* GET calendar listing. */
router.get('/', async function(req, res, next)
{
    res.json({error: "Invalid Calendar GUID."});
});

/* adds a new calendar to the list */
router.post('/import', async (req, res, next) =>
{
    console.log('Post import invoked!');
    const body = req.body;

    var date = Date.now();
    var curDate = null;
    do {
        curDate = Date.now();
    } while (curDate-date < 5000);

    console.log(body);
    try
    {
        let calendar = await CalendarService.create(body);
        if(body.OwnerGuid != null)
        {
            calendar.OwnerGuid = body.OwnerGuid;
        }
        res.cookie('ownerGuid', calendar.OwnerGuid, { maxAge: 900000, httpOnly: true })
        return res.status(201).json({ calendar: calendar });
    }
    catch(err)
    {
        console.log('6');
        if (err.name === 'ValidationError')
        {
            return res.status(400).json({ error: err.message });
        }

        // unexpected error
        return next(err);
    }
});

/* retrieves a calendar by guid */
router.get('/:ownerGuid', async (req, res, next) =>
{
    try
    {
        // req.params.id
        const calendar = await CalendarService.retrieve(req.param.OwnerGuid);
        return res.json({calendar: calendar})
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});

/* updates the events in calendar by guid */
router.put('/update', async (req, res, next) =>
{
    const body = req.body;
    try
    {
        console.log("Calendar update requested! For calendar:", body.OwnerGuid);
        let calendar = CalendarService.updateEvents(body.OwnerGuid, body.EventArray);
        return res.status(200).json({ calendar: calendar });
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});

/* removes the calendar from the calendar list by guid */
router.delete('/ownerGuid', async (req, res, next) =>
{
    try
    {
        const calendar = await CalendarService.delete(req.query.OwnerGuid);
        return res.json({success: true});
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});

router.get('/calendars', (req, res) => {
    CalendarService.getAll();
    return;
});

module.exports = router;
