import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { host } from '../../../app/host'

@Injectable({
  providedIn: 'root',
})

export class EventService {

  constructor(private http: HttpClient) { }
  //Get all event
  getAllEvents() {
    return this.http.get(host + '/api/GetAllEvents');
  }
  //get Event
  getEvent(id) {
    return this.http.get(host + '/api/detailsEvent/' + id);
  }
  getEventbyYear(Create_date) {
    return this.http.get(host + '/api/GetEventByYear/' +Create_date);
  }
  //Add Event
  AddNewEvent(obj) {
    return this.http.post(host + '/api/AddEvent', obj);
  }
  //Delete Event
  deleteEvent(id) {
    return this.http.delete(host + '/api/deleteEvent/' + id);
  }
  //Update Event
  updateEvent(id, updateform) {
    return this.http.put(host + '/api/UpdateEvent/' + id, updateform);
  }
  Participate(id, userConnect) {
    return this.http.put(host + '/api/ParticipateEvent/' + id, { userConnect });
  }
  PublishEvent(id, value) {
    return this.http.put(host + '/api/PublishEvent/' + id, { publish: value });
  }
/*   ArchiveEvent(id, val) {
    return this.http.put(host + '/api/ArchiveEvent/' + id, { archive: val });
  } */

  ValiderP(id, email) {
    return this.http.put(host + '/api/validerParticipant/' + id,{email});
  }
  NoValiderP(id, email) {
    return this.http.put(host + '/api/NovaliderParticipant/' + id,{email});
  }
}


