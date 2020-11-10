import {Component, OnInit, ViewChild} from '@angular/core';

import { View, EventSettingsModel } from '@syncfusion/ej2-schedule';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { SelectedEventArgs } from '@syncfusion/ej2-inputs';


export let scheduleData: object[] = [
  {
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    StartTime: new Date(2020, 11, 10, 9, 30),
    EndTime: new Date(2020, 11, 10, 11, 0),
    CategoryColor: '#1aaa55'
  }];


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public todaysDate = new Date();
  public calendarView: View = 'Day';

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public scheduleViews: View[] = ['Day'];
  public eventSettings: EventSettingsModel = { dataSource: scheduleData };
  public currentView: View = 'Day';
  public showFileList = false;
  public multiple = false;
  public buttons = { browse: 'Choose file' };
  constructor() { }

  ngOnInit(): void {
  }

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0]);
  }

}
