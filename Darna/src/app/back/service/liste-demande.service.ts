import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpRequest} from '@angular/common/http';

const host = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ListeDemandeService {

  constructor(private http: HttpClient) { }

  getListeDemand() {
    return this.http.get(host +'/api/listeDemandes');
 }
 deleteDemand(id) {

  return this.http.get(host +'/api/deleteDemande/'+id);
}
AcceptDemande(demande) {

  return this.http.post(host +'/api/acceptDemande',demande);
}
}
