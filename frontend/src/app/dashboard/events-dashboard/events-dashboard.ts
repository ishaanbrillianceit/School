import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss',
})
export class EventsDashboard implements OnInit {
  eventArray = signal<any[]>([]);
  eventInfo = signal<any>({});

  addEventForm!: any;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getEvents();
  }

  constructor(private apiService: Api, private fb: FormBuilder) {
    this.addEventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  getEvents() {
    this.apiService.getEvent().subscribe({
      next: (response: any) => {
        console.log(response);
        this.eventArray.set(response.events);
        console.log(this.eventArray());
      },
    });
  }

  onSubmit() {
    const data = this.addEventForm.value;
    const eventData = {
      title: data.title,
      date: { eventDate: data.eventDate, eventTime: data.eventTime },
      description: data.eventDate,
      shortDescription: data.shortDescription,
      location: data.location,
    };

    console.log('This is the Event form Value: ', eventData);
    this.apiService.eventFormSubmitted(data).subscribe({
      next: (response: any) => {
        alert('Event has been added!');
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }
}
