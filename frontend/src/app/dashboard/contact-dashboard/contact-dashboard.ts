import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-dashboard',
  imports: [],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss',
})
export class ContactDashboard implements OnInit {
  contactsArray = signal<any[]>([]);

  constructor(private apiService: Api, http: HttpClient) {}

  ngOnInit(): void {
    this.apiService.getContact().subscribe({
      next: (response: any) => {
        console.log(response);
        let contacts = response.contacts;
        this.contactsArray.set(contacts);
      },
    });
  }
}
