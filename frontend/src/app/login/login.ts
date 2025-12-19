import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup

  constructor(private fb:FormBuilder, private apiService: Auth, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    let body = this.loginForm.value
    this.apiService.login(body.email, body.password).subscribe({
      next: (response: any) => {
        alert(response.message)
        if(response){
          const token = response.user?.token
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(response?.user))
          this.router.navigateByUrl('dashboard')
        }
      },
      error(error: any){
        console.log(error);
      }
    })
  }



}
