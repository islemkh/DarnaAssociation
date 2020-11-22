import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const host = 'http://localhost:8080';
@Injectable({
  providedIn: 'root',
})

export class EventService {

  constructor(private http: HttpClient) {}
  //Get all event
  getAllEvents() {
    return this.http.get(host + '/api/GetAllEvents');
  }
  //get Event
  getEvent(id) {
    return this.http.get(host + '/api/GetEvent/' + id);
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

}


