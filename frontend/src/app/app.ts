import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './features/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'frontend';
  boxes = [1, 2, 3, 4, 5, 6, 7, 8, null];

  movebox(index: number) {
    console.log(`This is the index: ${index}`);
    const emptyIndex = this.boxes.indexOf(null);
    console.log(`This is the emptyIndex: ${emptyIndex}`);

    [this.boxes[index], this.boxes[emptyIndex]] = [
      this.boxes[emptyIndex],
      this.boxes[index],
    ];
  }
}
