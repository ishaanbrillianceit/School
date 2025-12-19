import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../../services/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.html',
  styleUrls: ['./notice.scss']
})
export class Notice implements OnInit {

  noticeArray = signal<string[]>([])

  constructor(private apiService: Api){}

  ngOnInit(): void {
    this.getNotices()
  }

  getNotices(){
    // I use pipe and filter to get the only data whose status is 200
    this.apiService.getNotice().subscribe({
      next: (response: any) => {
        response.notices.forEach((obj: any) => {
          this.noticeArray.update((old) => [...old, obj.title]);
        });
      },
    })
  }
}
