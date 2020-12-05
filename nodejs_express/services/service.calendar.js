
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

    static convertToHours(msecs)
    {
        let secs = msecs / 1000;
        let minutes = secs / 60;
        let hours = secs / 3600;
        return {hours, minutes, secs};
    }

    static checkNSetIfDiffIsOneHour(currAppointmentEnd, nextAppointmentStart, lunchTimeApp)
    {
        let diff = currAppointmentEnd - nextAppointmentStart;
        let diffInHours = this.convertToHours(diff);
        if(diffInHours.hours >= 1 || (diffInHours.hours === 0 && diffInHours.minutes === 59)){
            lunchTimeApp.StartTime = currAppointmentEnd;
            lunchTimeApp.EndTime = currAppointmentEnd;
            lunchTimeApp.EndTime.setHours(startLunch.getHours() + 1);
            return true;
        }
        return false;
    }

    static checkNSetIfDiffIsHalfHour(currAppointmentEnd, nextAppointmentStart, lunchTimeApp)
    {
        let diff = currAppointmentEnd - nextAppointmentStart;
        let diffInHours = this.convertToHours(diff);
        if(diffInHours.hours >= 1 || (diffInHours.hours === 0 && diffInHours.minutes >= 29)){
            lunchTimeApp.StartTime = currAppointmentEnd;
            lunchTimeApp.EndTime = currAppointmentEnd;
            lunchTimeApp.EndTime.setHours(startLunch.getHours() + 1);
            return true;
        }
        return false;
    }

    static searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
    {
        let lunchTimeFound = false;
        for(let appIdx = 0; appIdx < (shortBlockingApps.length - 1); appIdx++){
            let currAppointment = shortBlockingApps[appIdx];
            let nextAppointment = shortBlockingApps[appIdx + 1];

            if(appIdx === 0){
                if(currAppointment.StartTime > startLunch){
                    lunchTimeFound = this.checkNSetIfDiffIsOneHour(startLunch, currAppointment.StartTime, lunchTimeApp);
                    if (lunchTimeFound)
                        return lunchTimeApp;
                }
            }

            lunchTimeFound = this.checkNSetIfDiffIsOneHour(currAppointment.EndTime, nextAppointment.StartTime, lunchTimeApp);
            if(lunchTimeFound)
                return lunchTimeApp;

            if (appIdx === (shortBlockingApps.length - 2)) {
                if (nextAppointment.EndTime < endLunch) {
                    lunchTimeFound = this.checkNSetIfDiffIsOneHour(nextAppointment.EndTime, endLunch, lunchTimeApp);
                    if (lunchTimeFound)
                        return lunchTimeApp;
                }
            }
        }
        return lunchTimeApp;
    }

    static searchForHalfHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
    {
        let lunchTimeFound = false;
        for(let appIdx = 0; appIdx < (shortBlockingApps.length - 1); appIdx++){
            let currAppointment = shortBlockingApps[appIdx];
            let nextAppointment = shortBlockingApps[appIdx + 1];

            if(appIdx === 0){
                if(currAppointment.StartTime > startLunch){
                    lunchTimeFound = this.checkNSetIfDiffIsHalfHour(startLunch, currAppointment.StartTime, lunchTimeApp);
                    if (lunchTimeFound)
                        return lunchTimeApp;
                }
            }

            lunchTimeFound = this.checkNSetIfDiffIsHalfHour(currAppointment.EndTime, nextAppointment.StartTime, lunchTimeApp);
            if(lunchTimeFound)
                return lunchTimeApp;

            if (appIdx === (shortBlockingApps.length - 2)) {
                if (nextAppointment.EndTime < endLunch) {
                    lunchTimeFound = this.checkNSetIfDiffIsHalfHour(nextAppointment.EndTime, endLunch, lunchTimeApp);
                    if (lunchTimeFound)
                        return lunchTimeApp;
                }
            }
        }
        return lunchTimeApp;
    }

    static recommendLunch(calendar)
    {
        let todayDate = new Date();
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        let dailyEventsArray = calendar.EventArray.filter(appointment => {
            let startTime = new Date(appointment.StartTime);
            return ((todayDate.getFullYear() === startTime.getFullYear()) &&
                    (todayDate.getMonth() === startTime.getMonth()) &&
                    (todayDate.getDate() === startTime.getDate()));
        }).map(appointment => appointment);

        const startLunch = new Date(dailyEventsArray[0].StartTime);
        startLunch.setHours(11,0,0,1);
        const endLunch = new Date(dailyEventsArray[0].StartTime);
        endLunch.setHours(13,59,59,999);

        // Check if there is an appointment that overlaps the whole lunch break time
        let lunchOverlappingApps = dailyEventsArray.filter(appointment => {
            return appointment.StartTime < startLunch && appointment.EndTime > endLunch;
        }).map(appointment => appointment);
        // If overlapping appointment exists, we wont recommend anything
        if (lunchOverlappingApps.length > 0){
            return null;
        }

        // Check for appointments which start before 11 and finish in lunch break or start before 14 and finish
        // after lunch break
        let shortBlockingApps = dailyEventsArray.filter(appointment => {
            return (endLunch > appointment.StartTime > startLunch) || (startLunch < appointment.EndTime < endLunch);
        }).map(appointment => appointment);
        // If there are no existing blockers, set lunch recommendation at 12-13
        if (shortBlockingApps.length === 0){
            // Create appointment and set attributes

            // Call for recommendation

        }
        else{
            // Search for an empty hour
            let lunchTimeFound = false;
            let lunchTimeApp = shortBlockingApps[0];
            lunchTimeApp.StartTime.setHours(0,0,0,0);

            lunchTimeApp = this.searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
            if(lunchTimeApp.StartTime.getHours() !== 0){
                // Create appointment and set attributes

                // Call for recommendation
            }

            // If the prev search was unsuccessful, search for a half an hour
            lunchTimeApp = this.searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
            if(lunchTimeApp.StartTime.getHours() !== 0){
                // Create appointment and set attributes

                // Call for recommendation
            }
        }
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
