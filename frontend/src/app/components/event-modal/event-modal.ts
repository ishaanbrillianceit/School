import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.scss'
})
export class EventModal implements AfterViewInit {
  @Input() data!: any

  constructor(){}

  ngAfterViewInit(): void {
    console.log("Data received by event: ", this.data);

  }
}
