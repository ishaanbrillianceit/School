import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { EventModal } from "../../components/event-modal/event-modal";

@Component({
  selector: 'app-events',
  imports: [CommonModule, EventModal],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {

  eventArray = signal<any[]>([])
  eventInfo = signal<any>({})

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getEvents()
  }

  constructor(private apiService:Api){}

  getEvents(){
    this.apiService.getEvent().subscribe({
      next: (response: any) => {
        console.log(response)
        response.events.forEach((obj: any) => {
          this.eventArray.update(old => [...old, obj])
        })
        console.log(this.eventArray())

      }
    })
  }

  showEventInfo(info: any){
    this.eventInfo.set(info)
    console.log("This is the eventInfo: ", this.eventInfo())
  }

}
