
export class EventData {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  EventType: string;
  Location: string;
  CategoryColor: string;
  Other: string;

  constructor(id, subject, startTime, endTime, eventType, location, categoryColor, other) {
    this.Id = id;
    this.Subject = subject;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.EventType = eventType;
    this.Location = location;
    this.CategoryColor = categoryColor;
    this.Other = other;
  }
}



export let eventsData: EventData[] = [
  {
    Id: 1,
    Subject: 'Lunch',
    StartTime: new Date(2020, 10, 14, 10, 0),
    EndTime: new Date(2020, 10, 14, 11, 30),
    EventType: 'food',
    Location: 'Seattle',
    CategoryColor: '#1aaa55',
    Other: '2'
  }, {
    Id: 2,
    Subject: 'Art & Painting Gallery',
    StartTime: new Date(2020, 10, 14, 12, 0),
    EndTime: new Date(2020, 10, 14, 14, 0),
    EventType: 'public-event',
    Location: 'Costa Rica',
    CategoryColor: '#357cd2',
    Other: ''
  }, {
    Id: 3,
    Subject: 'Dany Birthday Celebration',
    StartTime: new Date(2020, 10, 14, 10, 0),
    EndTime: new Date(2020, 10, 14, 11, 30),
    EventType: 'family-event',
    Location: 'Kirkland',
    CategoryColor: '#7fa900',
    Other: ''
  }];
