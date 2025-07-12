import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

export interface forumPost {  
  id: number,
  name: string,
  address: string,
  phone: string
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'consumows';
}
