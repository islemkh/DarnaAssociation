import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private host = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest(
      'POST',
      this.host + '/api/uploadFile',
      formdata,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(req);
  }
  getFile(): Observable<any> {
    return this.http.get(this.host + '/api/getfile/' + name);
  }
}
