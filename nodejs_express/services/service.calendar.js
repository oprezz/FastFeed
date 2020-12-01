
const CalendarModel = require("../models/model.calendar");
let Validator = require('fastest-validator');
var db = require('../bin/db.js')


let calendars = {};
let calendarCounter = 0;

/* static user service class */
class CalendarService
{
    static async create(data)
    {
        let calendar = new CalendarModel(data.OwnerGuid, data.EventArray);

        const calendarCol = db.get().collection("calendars");
        await calendarCol.insertOne(calendar);

        return calendar;
    }

    static async updateGuid(currentGuid, newGuid)
    {
        console.log("Guid update requested!", currentGuid);
        const calendarCol = db.get().collection("calendars");
        var calendar = await calendarCol.findOne({OwnerGuid: currentGuid});
        calendar.OwnerGuid = newGuid;
        const newValues = {$set: {OwnerGuid: calendar.OwnerGuid}};
        calendar = await calendarCol.updateOne({OwnerGuid : currentGuid}, newValues);
        // user = usercol.findOne({username: _username});
        console.log("Guid updated!");
        return calendar;
    }

    static async updateEvents(ownerGuid, newEvents)
    {
        console.log("Guid update requested!", ownerGuid);
        const calendarCol = db.get().collection("calendars");
        var calendar = await calendarCol.findOne({OwnerGuid: ownerGuid});
        calendar.EventArray = calendar.EventArray.concat(newEvents);
        const newValues = {$set: {events: calendar.EventArray}};
        calendar = await calendarCol.updateOne({OwnerGuid : ownerGuid}, newValues);
        // user = usercol.findOne({username: _username});
        console.log("Guid updated!");
        return calendar;
    }

    static recommendLunch(calendar)
    {
        let todayDate = new Date();
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        let eventArray = calendar.EventArray.filter(appointment => {
            let startTime = new Date(appointment.StartTime);
            return ((todayDate.getFullYear() === startTime.getFullYear()) &&
                    (todayDate.getMonth() === startTime.getMonth()) &&
                    (todayDate.getDate() === startTime.getDate()));
        }).map(appointment => appointment);
    }

    static async retrieve(ownerGuid)
    {
        console.log('Requested user by username:', ownerGuid);
        const calendarCol = await db.get().collection("calendars");
        const calendar = await calendarCol.findOne({OwnerGuid: ownerGuid});
        if(calendar == null)
        {
            console.error('Unable to retrieve a user by (ownerGuid:'+ ownerGuid +')');
        }
        else
        {
            console.log('User (ownerGuid:'+ ownerGuid +') retrieved from DB!');
            this.recommendLunch(calendar);
        }
        return calendar;
    }

    static async delete(ownerGuid)
    {
        console.log("Deletion requested!")
        try{
            await db.get().collection("calendars").remove({OwnerGuid : ownerGuid});
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAll()
    {
        await db.get().collection('calendars').find({}).toArray()
            .then((calendars) => {
                console.log('Calendars', calendars);
            });
    }
}

module.exports = CalendarService;
