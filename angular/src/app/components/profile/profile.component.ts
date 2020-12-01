import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {User} from '../../classes';
import {Calendar} from '../../classes/calendar';
import {AccountService, AlertService} from '../../services';
import {CalendarService} from '../../services/calendar.service';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {ScheduleComponent, EventSettingsModel} from '@syncfusion/ej2-angular-schedule';
import {DataManager, Query, JsonAdaptor} from '@syncfusion/ej2-data';
import {compile} from '@syncfusion/ej2-base';
import {first} from 'rxjs/operators';
import {EventData, eventsData} from '../../classes/events';
import {Console} from 'inspector';
import * as EventS from 'events';
import {PromiseType} from 'protractor/built/plugins';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User;
    calendar: Calendar;

    @ViewChild('scheduleObject')
    public scheduleObject: ScheduleComponent;
    public btnImport = {browse: 'Upload calendar'};

    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private calendarService: CalendarService
    ) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user')).user;
    }

    public sleep(ms): void{
        const date = Date.now();
        let curDate = null;
        do {
            curDate = Date.now();
        } while (curDate - date < ms);
    }

    saveEventsIntoDatabase(eventArray): void{
        this.calendarService.import(new Calendar(this.user.guid, eventArray)).pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });;
                },
                error: error => {
                    this.alertService.error(error);
                }
            });
    }

    public onButtonClickedImport(args: SelectedEventArgs): void {
        this.scheduleObject.importICalendar((args.event.target as HTMLInputElement).files[0]);
        this.scheduleObject.dataBound.subscribe(x =>
            this.saveEventsIntoDatabase(this.scheduleObject.eventSettings.dataSource)
        );
    }
}
