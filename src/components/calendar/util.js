
let eventId = 0;

const priToColour = {
  "2":  '#C63D2F', // highest pri
  "1": '#FC6736', 
  "0": '#FFBB5C' // lowest pri
}

const colourToPri = {
  "#C63D2F": 2, // highest pri
  "#FC6736": 1, 
  "#FFBB5C": 0 // lowest pri
}

export function createEventId() {
  return String(eventId++);
}

export function mapToCalendar(timeslots, userId) {

  var userTimeslots = [];
  timeslots.forEach(timeslot => {
    if (timeslot['user'] === userId){ 
      userTimeslots.push({
        id: createEventId(),
        start: timeslot.start_time.substring(0, timeslot.start_time.length - 1),
        end: timeslot.end_time.substring(0, timeslot.end_time.length - 1),
        backgroundColor: priToColour[timeslot.priority]
      });  
    }
  });
  return userTimeslots;
}

export function mapEventsToTimeslots(events) {
  var timeslots = [];
  events.forEach(event => {
    timeslots.push({
      start_time: event.start.substring(0, 19), // TODO: check
      end_time: event.end.substring(0, 19),
      priority: colourToPri[event.backgroundColor]
    });
  
  });
  return timeslots;
}


export function mapContactsToOptions(contacts){
  var contactOptions = [];
  contacts.forEach(contact => {
    contactOptions.push({
      label: contact.email,
      id: contact.id
    })
  })
  return contactOptions;
}

export function mapPickedOptionsToUserIds(pickedOptions){
  return pickedOptions.map((option) => {
    return option.id;
  })
}