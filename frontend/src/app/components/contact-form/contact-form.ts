import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm implements OnInit {
    contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService:Api){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log("Contact Form")
  }

  onSubmit(){
    this.apiService.formSubmitted(this.contactForm.value).subscribe({
      next: (response: any) => {
        alert(response.message);
        console.log(response)
      }
    })
  }
}
