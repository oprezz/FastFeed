import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {Calendar} from '../classes/calendar';

class Response{
    public calendar: Calendar;
}

@Injectable({providedIn: 'root'})
export class CalendarService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    import(calendar: Calendar): Observable<object> {
        return this.http.post(`${environment.apiUrl}/calendars/import`, calendar);
    }

    getAll(): Observable<Calendar[]> {
        return this.http.get<Calendar[]>(`${environment.apiUrl}/calendars`);
    }

    getEventsByGuid(ownerGuid: string): Observable<Response> {
        return this.http.get<Response>(`${environment.apiUrl}/calendars/${ownerGuid}`, {observe: 'body', responseType: 'json'})
            .pipe( map( data => data ) );
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
