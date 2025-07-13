import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { usuarioPost } from '../app';
import { Foro } from '../foro';
import { Contacto } from '../contacto/contacto';

@Component({
  selector: 'app-administracion',
  imports: [FormsModule, CommonModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css'
})

@Injectable({
  providedIn: 'root'
})
export class Administracion {
  
forumsAux: usuarioPost[] = [];

  constructor(private foro: Foro, private contacto1: Contacto) {}

  ngOnInitaaa() {
    this.forumsAux = this.contacto1.forums;
  }


}
