import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {EventSettingsModel, View} from '@syncfusion/ej2-schedule';
import {ScheduleComponent, EventClickArgs} from '@syncfusion/ej2-angular-schedule';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {log} from 'util';

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
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  onEventClick(args: EventClickArgs): void {
    let detailsDocument = document.getElementById('item-details') as HTMLDivElement;
    detailsDocument.hidden = false;
  }
}
