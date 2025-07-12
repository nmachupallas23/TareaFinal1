import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar',
  imports: [],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class Eliminar {
@Input() forum: any;
}
