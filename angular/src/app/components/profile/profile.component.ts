
import { User } from '../../classes';
import { AccountService, AlertService } from '../../services';
import { HttpClient } from '@angular/common/http';

import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';

import {Calendar} from '../../classes/calendar';
import {CalendarService} from '../../services';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  selectedFile: File = null;
  calendar: Calendar;

  @ViewChild('scheduleObject')
  public scheduleObject: ScheduleComponent;
  public btnImport = {browse: 'Upload calendar'};

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private alertService: AlertService,
    private calendarService: CalendarService
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      console.log("profile user:", this.user);
    }

    ngOnInit(): void {}

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
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
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
