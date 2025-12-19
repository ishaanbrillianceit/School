import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { NoticeModal } from "../../components/notice-modal/notice-modal";

@Component({
  selector: 'app-notices',
  imports: [CommonModule, NoticeModal],
  templateUrl: './notices.html',
  styleUrl: './notices.scss'
})
export class Notices implements OnInit {

  noticeArray = signal<any[]>([])

  infoData = signal<string>('')

  constructor(private apiService: Api){}

  ngOnInit(): void {
    this.getNotices()

  }

  getNotices(){
    // I use pipe and filter to get the only data whose status is 200
    this.apiService.getNotice().subscribe({
      next: (response: any) => {
        if(response && response.notices.length !== 0){
          this.noticeArray.update(old => [...old, response.notices])
        };
        console.log("this is the notice data: ", this.noticeArray());

      },
      error(error: any){
        console.error(error)
      }
    })
  }

  showNoticeInfo(info: any){
    this.infoData.set(info.description)
  }
}
