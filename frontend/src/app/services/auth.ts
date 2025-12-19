import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient, private router: Router) {
  }
  login(email: string, password: string){
    let body = {email, password}
    return this.http.post(`${environment.apiUrl}/user/login/`,body)
  }
}
