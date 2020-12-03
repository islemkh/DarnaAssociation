import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})

export class EventService {
  constructor(private http: HttpClient) { }
  //Get all event
  getAllEvents() {
    return this.http.get(environment.host + '/api/GetAllEvents');
  }
  //get Event
  getEvent(id) {
    return this.http.get(environment.host + '/api/detailsEvent/' + id);
  }
  getEventbyYear(Create_date) {
    return this.http.get(environment.host + '/api/GetEventByYear/' + Create_date);
  }
  //Add Event
  AddNewEvent(obj) {
    return this.http.post(environment.host + '/api/AddEvent', obj);
  }
  //Delete Event
  deleteEvent(id) {
    return this.http.delete(environment.host + '/api/deleteEvent/' + id);
  }
  //Update Event
  updateEvent(id, updateform) {
    return this.http.put(environment.host + '/api/UpdateEvent/' + id, updateform);
  }
  Participate(id, userConnect) {
    return this.http.put(environment.host + '/api/ParticipateEvent/' + id, { userConnect });
  }
  PublishEvent(id, value) {
    return this.http.put(environment.host + '/api/PublishEvent/' + id, { publish: value });
  }

  ValiderP(id, email) {
    return this.http.put(environment.host + '/api/validerParticipant/' + id, { email });
  }
  NoValiderP(id, email) {
    return this.http.put(environment.host + '/api/NovaliderParticipant/' + id, { email });
  }
}


