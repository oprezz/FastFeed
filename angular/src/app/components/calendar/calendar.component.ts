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
    public selectedDate: Date = new Date();
    public scheduleViews: View[] = ['Day'];
    public currentView: View = 'Day';
    public multiple = false;

    public eventArray: object[];
    public recommendedFoodies: object;

    @Output() sendDetailsEmitter = new EventEmitter();

    constructor(private accountService: AccountService, private calendarService: CalendarService) {
        this.accountService.user.subscribe(user => {
           this.user = user;
           this.callForCalendar();
        });
    }
    
    callForCalendar(): void {
        this.calendarService.getEventsByGuid(this.user.guid)
            .subscribe(response => {
                this.eventArray = response.calendar.EventArray;
                this.callForRecommendation();
            });
    }

    callForRecommendation(): void{
        this.accountService.generateFoodAdvise(this.user).subscribe( recommendation => {
            this.recommendedFoodies = recommendation;
            this.compileRecommendation();
        });
    }

    compileRecommendation(): void{
        this.eventArray = this.eventArray.map(appointment => {
            // @ts-ignore
            if (appointment.Subject === 'Lunch'){
                // @ts-ignore
                appointment.Subject = this.recommendedFoodies.foods.name;
                // @ts-ignore
                appointment.Location = this.recommendedFoodies.foods.place;
                // @ts-ignore
                appointment.Description = "Recommendation";
            }
            return appointment;
        });
        this.scheduleObj.eventSettings.dataSource = this.eventArray;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void{}

    onEventClick(args: EventClickArgs): void {
        // @ts-ignore
        if ((args.event as object).Description === 'Recommendation') {
            // @ts-ignore
            this.sendDetailsEmitter.emit(this.recommendedFoodies);
        }
    }
}
