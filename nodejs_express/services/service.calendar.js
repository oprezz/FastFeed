let uid_gen = require('uuid');
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
        let diff = nextAppointmentStart - currAppointmentEnd;
        console.log("ADIFF")
        console.log(diff)
        let diffInHours = this.convertToHours(diff);
        console.log("CHECKES")
        console.log(diffInHours)
        if(diffInHours.hours >= 1 || (diffInHours.hours === 0 && diffInHours.minutes === 59)){
            lunchTimeApp.StartTime = currAppointmentEnd.toISOString();
            lunchTimeApp.EndTime = currAppointmentEnd;
            lunchTimeApp.EndTime.setHours(currAppointmentEnd.getHours() + 1);
            lunchTimeApp.EndTime = lunchTimeApp.EndTime.toISOString()
            console.log("INDIFF FUNC")
            console.log(lunchTimeApp)
            return true;
        }
        return false;
    }

    static checkNSetIfDiffIsHalfHour(currAppointmentEnd, nextAppointmentStart, lunchTimeApp)
    {
        let diff = nextAppointmentStart - currAppointmentEnd;
        let diffInHours = this.convertToHours(diff);
        if(diffInHours.hours >= 1 || (diffInHours.hours === 0 && diffInHours.minutes >= 29)){
            lunchTimeApp.StartTime = currAppointmentEnd.toISOString();
            lunchTimeApp.EndTime = currAppointmentEnd;
            lunchTimeApp.EndTime.setHours(currAppointmentEnd.getHours() + 1);
            lunchTimeApp.EndTime = lunchTimeApp.EndTime.toISOString()
            return true;
        }
        return false;
    }

    static searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
    {
        let lunchTimeFound = false;
        if (shortBlockingApps.length === 1)
        {
            let currAppointment = shortBlockingApps[0];
            if (new Date(currAppointment.StartTime) > startLunch){
                lunchTimeFound = this.checkNSetIfDiffIsOneHour(startLunch, new Date(currAppointment.StartTime), lunchTimeApp);
                if (lunchTimeFound)
                    return lunchTimeApp;
            }
            else if (new Date(currAppointment.EndTime) < endLunch){
                lunchTimeFound = this.checkNSetIfDiffIsOneHour(new Date(currAppointment.EndTime), endLunch, lunchTimeApp);
                if (lunchTimeFound)
                    return lunchTimeApp;
            }
        }
        else{
            for(let appIdx = 0; appIdx < (shortBlockingApps.length - 1); appIdx++){
                console.log(appIdx)
                let currAppointment = shortBlockingApps[appIdx];
                let nextAppointment = shortBlockingApps[appIdx + 1];

                if(appIdx === 0){
                    if(new Date(currAppointment.StartTime) > startLunch){
                        lunchTimeFound = this.checkNSetIfDiffIsOneHour(startLunch, new Date(currAppointment.StartTime), lunchTimeApp);
                        if (lunchTimeFound)
                            return lunchTimeApp;
                    }
                    else if (new Date(currAppointment.EndTime) < endLunch){
                        lunchTimeFound = this.checkNSetIfDiffIsOneHour(new Date(currAppointment.EndTime), endLunch, lunchTimeApp);
                        if (lunchTimeFound)
                            return lunchTimeApp;
                    }
                }

                lunchTimeFound = this.checkNSetIfDiffIsOneHour(new Date(currAppointment.EndTime), new Date(nextAppointment.StartTime), lunchTimeApp);
                if(lunchTimeFound)
                    return lunchTimeApp;

                if (appIdx === (shortBlockingApps.length - 2)) {
                    if (new Date(nextAppointment.EndTime) < endLunch) {
                        lunchTimeFound = this.checkNSetIfDiffIsOneHour(new Date(nextAppointment.EndTime), endLunch, lunchTimeApp);
                        if (lunchTimeFound)
                            return lunchTimeApp;
                    }
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
                if(new Date(currAppointment.StartTime) > startLunch){
                    lunchTimeFound = this.checkNSetIfDiffIsHalfHour(startLunch, new Date(currAppointment.StartTime), lunchTimeApp);
                    if (lunchTimeFound)
                        return lunchTimeApp;
                }
            }

            lunchTimeFound = this.checkNSetIfDiffIsHalfHour(new Date(currAppointment.EndTime), new Date(nextAppointment.StartTime), lunchTimeApp);
            if(lunchTimeFound)
                return lunchTimeApp;

            if (appIdx === (shortBlockingApps.length - 2)) {
                if (new Date(nextAppointment.EndTime) < endLunch) {
                    lunchTimeFound = this.checkNSetIfDiffIsHalfHour(new Date(nextAppointment.EndTime), endLunch, lunchTimeApp);
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
        todayDate.setDate(todayDate.getDate()+1);
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 2);

        let dailyEventsArray = calendar.EventArray.filter(appointment => {
            let startTime = new Date(appointment.StartTime);
            return ((todayDate.getFullYear() === startTime.getFullYear()) &&
                    (todayDate.getMonth() === startTime.getMonth()) &&
                    (todayDate.getDate() === startTime.getDate()));
        }).map(appointment => appointment);

        dailyEventsArray.sort((a,b) => {
            return new Date(b.StartTime) - new Date(a.StartTime);
        });

        const startLunch = new Date(dailyEventsArray[0].StartTime);
        startLunch.setHours(11,0,0,1);
        const endLunch = new Date(dailyEventsArray[0].StartTime);
        endLunch.setHours(13,59,59,999);


        // Check if there is an appointment that overlaps the whole lunch break time
        let lunchOverlappingApps = dailyEventsArray.filter(appointment => {
            return new Date(appointment.StartTime) < startLunch && new Date(appointment.EndTime) > endLunch;
        }).map(appointment => appointment);
        // If overlapping appointment exists, we wont recommend anything
        if (lunchOverlappingApps.length > 0){
            return calendar;
        }

        // Check for appointments which start before 11 and finish in lunch break or start before 14 and finish
        // after lunch break
        let shortBlockingApps = dailyEventsArray.filter(appointment => {
            return (startLunch < new Date(appointment.StartTime) && new Date(appointment.StartTime) < endLunch)
                || (startLunch < new Date(appointment.EndTime) && new Date(appointment.EndTime) < endLunch);
        }).map(appointment => appointment);

        // If there are no existing blockers, set lunch recommendation at 12-13
        if (shortBlockingApps.length === 0){
            let lunchTimeApp = JSON.parse(JSON.stringify(dailyEventsArray[0]));
            lunchTimeApp.UID = uid_gen.v4();
            lunchTimeApp.Id = 999;
            lunchTimeApp.Subject = "Lunch";
            lunchTimeApp.StartTime = new Date(lunchTimeApp.StartTime).setHours(12,0,0,0).toISOString();
            lunchTimeApp.EndTime = new Date(lunchTimeApp.EndTime).setHours(13,0,0,0).toISOString();
            calendar.EventArray.push(lunchTimeApp);
            return calendar;
        }
        else{
            // Search for an empty hour
            let lunchTimeApp = JSON.parse(JSON.stringify(shortBlockingApps[0]));
            lunchTimeApp.UID = uid_gen.v4();
            lunchTimeApp.Id = 999;
            lunchTimeApp.Subject = "Lunch";
            lunchTimeApp.StartTime = new Date(lunchTimeApp.StartTime);
            lunchTimeApp.StartTime.setHours(1,0,0,0);
            lunchTimeApp.StartTime = lunchTimeApp.StartTime.toISOString();

            lunchTimeApp = this.searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
                if(new Date(lunchTimeApp.StartTime).getHours() !== 1){
                calendar.EventArray.push(lunchTimeApp);
                return calendar;
            }

            // If the prev search was unsuccessful, search for a half an hour
            lunchTimeApp = this.searchForWholeHour(shortBlockingApps, startLunch, endLunch, lunchTimeApp)
            if(new Date(lunchTimeApp.StartTime).getHours() !== 1){
                calendar.EventArray.push(lunchTimeApp);
                return calendar;
            }
        }
        return calendar;
    }

    static async retrieve(ownerGuid)
    {
        console.log('Requested user by username @ calendar:', ownerGuid);
        const calendarCol = await db.get().collection("calendars");
        let calendar = await calendarCol.findOne({OwnerGuid: ownerGuid});
        if(calendar == null)
        {
            console.error('Unable to retrieve a user by (ownerGuid:'+ ownerGuid +')');
        }
        else
        {
            console.log('User (ownerGuid:'+ ownerGuid +') retrieved from DB!');
            calendar = this.recommendLunch(calendar);
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
