import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {Calendar} from '../classes/calendar';
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';


@Injectable({providedIn: 'root'})
export class CalendarService {
    private _CalendarSubject: BehaviorSubject<Calendar>;
    public _Calendar: Observable<Calendar>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this._CalendarSubject = new BehaviorSubject<Calendar>(JSON.parse(localStorage.getItem('calendar')));
        this._Calendar = this._CalendarSubject.asObservable();
    }

    public get calendarValue(): Calendar {
        return this._CalendarSubject.value;
    }

    import(calendar: Calendar) {
        return this.http.post(`${environment.apiUrl}/calendars/import`, calendar);
    }

    getAll() {
        return this.http.get<Calendar[]>(`${environment.apiUrl}/calendars`);
    }

    getEventsByGuid(ownerGuid: string) {
        return this.http.get<Calendar>(`${environment.apiUrl}/calendars/${ownerGuid}`)
            .pipe(map(calendar => {
                console.log("Calendar returned:", calendar);
                this._CalendarSubject.next(calendar);
                return calendar;
            }));
    }

    // update(guid, params) {
    //   return this.http.put(`${environment.apiUrl}/calendars/${guid}`, params)
    //     .pipe(map(x => {
    //       // update stored Calendar if the logged in Calendar updated their own record
    //       if (guid == this.CalendarValue.guid) {
    //         // update local storage
    //         const Calendar = { ...this.CalendarValue, ...params };
    //         localStorage.setItem('Calendar', JSON.stringify(Calendar));
    //
    //         // publish updated Calendar to subscribers
    //         this.CalendarSubject.next(Calendar);
    //       }
    //       return x;
    //     }));
    // }
    //
    // updateCalendardata(Calendar : Calendar) {
    //   return this.http.put(`${environment.apiUrl}/Calendars/update`, Calendar)
    //     .pipe(map(x => {
    //       // update stored Calendar if the logged in Calendar updated their own record
    //       if (Calendar.guid == this.CalendarValue.guid) {
    //         console.log("Calendar update requested on front-end!");
    //         // update local storage
    //         localStorage.setItem('Calendar', JSON.stringify(Calendar));
    //
    //         // publish updated Calendar to subscribers
    //         this.CalendarSubject.next(Calendar);
    //       }
    //       return x;
    //     }));
    // }


    // delete(ownerGuid: string) {
    //   return this.http.delete(`${environment.apiUrl}/calendars/${ownerGuid}`)
    //     .pipe(map(x => {
    //       // auto logout if the logged in Calendar deleted their own record
    //       if (ownerGuid == this.CalendarValue.ownerGuid) {
    //         this.logout();
    //       }
    //       return x;
    //     }));
    // }
}
