import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { host } from 'src/app/host';

@Injectable({
  providedIn: 'root',
})
export class ListMemberService {
  constructor(private http: HttpClient) { }
  getAllmembers() {
    return this.http.get(host + '/api/ListMember');
  }
  //getMember
  getMember(id) {
    return this.http.get(host + '/api/detailsMember/' + id);
  }
  AddMember(obj) {
    return this.http.post(host + '/api/AddMember', obj);
  }
  deleteMember(id) {
    return this.http.delete(host + '/api/deleteMember/' + id);
  }
  updateMember(id, updateform) {
    return this.http.put(host + '/api/UpdateMember/' + id, updateform);
  }
  bannirMember(id, value) {
    return this.http.put(host + '/api/bannirmember/' + id, { statut: value });
  }
}
