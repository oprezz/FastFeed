import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {EventSettingsModel, View} from '@syncfusion/ej2-schedule';
import {ScheduleComponent, CellClickEventArgs} from '@syncfusion/ej2-angular-schedule';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import { ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { extend, closest, isNullOrUndefined, remove, removeClass } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';

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


  @ViewChild('menuObj')
  public menuObj: ContextMenuComponent;
  public allowResizing = false;
  public allowDragDrop = false;
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    {
      text: 'New Event',
      iconCss: 'e-icons new',
      id: 'Add'
    }, {
      text: 'New Recurring Event',
      iconCss: 'e-icons recurrence',
      id: 'AddRecurrence'
    }, {
      text: 'Today',
      iconCss: 'e-icons today',
      id: 'Today'
    }, {
      text: 'Edit Event',
      iconCss: 'e-icons edit',
      id: 'Save'
    }, {
      text: 'Edit Event',
      id: 'EditRecurrenceEvent',
      iconCss: 'e-icons edit',
      items: [{
        text: 'Edit Occurrence',
        id: 'EditOccurrence'
      }, {
        text: 'Edit Series',
        id: 'EditSeries'
      }]
    }, {
      text: 'Delete Event',
      iconCss: 'e-icons delete',
      id: 'Delete'
    }, {
      text: 'Delete Event',
      id: 'DeleteRecurrenceEvent',
      iconCss: 'e-icons delete',
      items: [{
        text: 'Delete Occurrence',
        id: 'DeleteOccurrence'
      }, {
        text: 'Delete Series',
        id: 'DeleteSeries'
      }]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    const targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (this.selectedTarget.classList.contains('e-appointment')) {
      const eventObj: { [key: string]: object } = this.scheduleObj.getEventDetails(this.selectedTarget) as { [key: string]: object };
      if (eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj.showItems(['Save', 'Delete'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    }
    this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  onMenuItemSelect(args: MenuEventArgs): void {
    const selectedMenuItem: string = args.item.id;
    let eventObj: { [key: string]: object };
    if (this.selectedTarget && this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = (this.scheduleObj.getEventDetails(this.selectedTarget) as { [key: string]: object });
    }
    switch (selectedMenuItem) {
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        const selectedCells: Element[] = this.scheduleObj.getSelectedElements();
        const activeCellsData: CellClickEventArgs = this.scheduleObj.getCellDetails(
          selectedCells.length > 0 ? selectedCells : this.selectedTarget);
        if (selectedMenuItem === 'Add') {
          this.scheduleObj.openEditor(activeCellsData, 'Add');
        } else {
          this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          eventObj = new DataManager(this.scheduleObj.eventsData).executeLocal(
            new Query().where(this.scheduleObj.eventFields.id, 'equal',
              eventObj[this.scheduleObj.eventFields.recurrenceID] as unknown as string | number))[0] as { [key: string]: object };
        }
        this.scheduleObj.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        this.scheduleObj.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
        break;
    }
  }
}
