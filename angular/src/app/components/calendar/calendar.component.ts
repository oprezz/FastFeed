import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {EventSettingsModel, View} from '@syncfusion/ej2-schedule';
import {ScheduleComponent, EventClickArgs} from '@syncfusion/ej2-angular-schedule';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import { eventsData, EventData } from '../../classes/events';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public scheduleViews: View[] = ['Day'];
  public eventSettings: EventSettingsModel = {
    dataSource: eventsData
  };
  public currentView: View = 'Day';
  public showFileList = false;
  public multiple = false;
  public buttons = { browse: 'Choose file' };
  // For event triggering
  @Output() sendDetailsEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  onEventClick(args: EventClickArgs): void {
    if ((args.event as unknown as EventData).EventType === 'food'){
      this.sendDetailsEmitter.emit(parseInt((args.event as unknown as EventData).Other, 10));
    }
  }
}
