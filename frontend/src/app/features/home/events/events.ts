import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {

  eventArray = signal<any[]>([])

  ngOnInit(): void {
    this.getEvents()
  }

  constructor(private apiService:Api){}

  getEvents(){
    this.apiService.getEvent().subscribe({
      next: (response: any) => {
        response.events.forEach((obj: any) => {
          this.eventArray.update(old => [...old, obj])
        })
      }
    })
  }

}
