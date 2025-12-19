import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachers',
  imports: [],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers implements OnInit {

  http = HttpClient

  teacherArray = signal<any[]>([])

  constructor(private apiService: Api){}

  ngOnInit(): void {
    this.fetchTeacher()
  }

  fetchTeacher(){
    this.apiService.getTeacher().subscribe({
      next: ((response: any) => {
        console.log("This is the teacher Api calling: ", response)
        response.teachers.forEach((element: any) => {
          this.teacherArray.update((old) => [...old, element])
        });
      }), error(error: any){
        console.log(error);

      }
    })
  }

}
