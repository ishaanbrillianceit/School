import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) {}
    getNotice():Observable<any>{
      return this.http.get(`${environment.apiUrl}/notice/`)
    }

    getEvent(): Observable<any>{
      return this.http.get(`${environment.apiUrl}/event/`)
    }

    getGallery(): Observable<any>{
      return this.http.get(`${environment.apiUrl}/gallery/`)
    }

    getTeacher(): Observable<any>{
      return this.http.get(`${environment.apiUrl}/teacher/`)
    }

    formSubmitted(data: any){
      return this.http.post(`${environment.apiUrl}/contact/`, data)
    }
}
