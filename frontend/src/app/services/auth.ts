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
  logout(){
    localStorage.removeItem('token')
  }
  isLoggedIn(): boolean{
    let isLocalStorage:boolean
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      isLocalStorage=true
    }
    else{
      isLocalStorage= false
    }

    return isLocalStorage
  }
  getToken(): string | null{
    return localStorage.getItem('token')
  }

}
