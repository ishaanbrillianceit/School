import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {

  galleryArray = signal<any[]>([])

  constructor(private apiService: Api){}

  ngOnInit(): void {
    this.getGallerys()
  }

  getGallerys(){
    this.apiService.getGallery().subscribe({
      next: (response: any) => {
        response.gallerys.forEach((obj: any) => {
          this.galleryArray.update(old => [...old, obj])
        });
      }
    })
  }
}
