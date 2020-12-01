import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListeDemandeService {
  constructor(private http: HttpClient) { }
  getListeDemand() {
    return this.http.get(environment.host + '/api/listeDemandes');
  }
  deleteDemand(id) {
    return this.http.get(environment.host + '/api/deleteDemande/' + id);
  }
  AcceptDemande(demande) {
    return this.http.post(environment.host + '/api/acceptDemande', demande);
  }
}
