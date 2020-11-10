import {Component, OnInit, ViewChild} from '@angular/core';

import { View } from '@syncfusion/ej2-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public todaysDate = new Date();
  public calendarView: View = 'Day';
  constructor() { }

  ngOnInit(): void {
  }

}
