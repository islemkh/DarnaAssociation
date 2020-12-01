import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListMemberService {
  constructor(private http: HttpClient) { }
  getAllmembers() {
    return this.http.get(environment.host + '/api/ListMember');
  }
  getmembers(Create_date) {
    return this.http.get(environment.host + '/api/GetMemberByYear/'+Create_date);
  }
  //getMember
  getMember(id) {
    return this.http.get(environment.host + '/api/detailsMember/' + id);
  }
  AddMember(obj) {
    return this.http.post(environment.host + '/api/AddMember', obj);
  }
  deleteMember(id) {
    return this.http.delete(environment.host + '/api/deleteMember/' + id);
  }
  updateMember(id, updateform) {
    return this.http.put(environment.host + '/api/UpdateMember/' + id, updateform);
  }
  updateEtatMember(id, value) {
    return this.http.put(environment.host + '/api/updateEtatMember/' + id, { statut: value });
  }
  // archiverMember(id,value){
  //   return this.http.put(host + '/api/archivermember/' + id, { statut: value });
  // }
  renewMember(id,Create_date){
    return this.http.put(environment.host + '/api/RenewMember/' + id,{Create_date});
  }

}
