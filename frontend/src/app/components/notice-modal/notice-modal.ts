import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notice-modal',
  imports: [],
  templateUrl: './notice-modal.html',
  styleUrl: './notice-modal.scss'
})
export class NoticeModal {
  @Input() description!: string
}
