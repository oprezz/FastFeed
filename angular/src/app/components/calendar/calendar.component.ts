import {Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {EventSettingsModel, View} from '@syncfusion/ej2-schedule';
import {ScheduleComponent, EventClickArgs} from '@syncfusion/ej2-angular-schedule';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {eventsData, EventData} from '../../classes/events';
import {User} from '../../classes';
import {AccountService, AlertService, CalendarService} from '../../services';
import {Calendar} from '../../classes/calendar';
import {first, map, take} from 'rxjs/operators';
import {throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, forkJoin} from 'rxjs';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit{
    user: User;
    calendar: Calendar;

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel;
    public selectedDate: Date = new Date();
    public scheduleViews: View[] = ['Day'];
    public currentView: View = 'Day';
    public multiple = false;

    @Output() sendDetailsEmitter = new EventEmitter();

    constructor(private calendarService: CalendarService) {
        this.user = JSON.parse(localStorage.getItem('user')).user;
        this.calendarService.getEventsByGuid(this.user.guid)
            .subscribe(response => this.scheduleObj.eventSettings.dataSource = response.calendar.EventArray);
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void{}

    onEventClick(args: EventClickArgs): void {
        if ((args.event as unknown as EventData).EventType === 'food') {
            this.sendDetailsEmitter.emit(parseInt((args.event as unknown as EventData).Other, 10));
        }
    }
}
