import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Foro } from '../foro';
import { forumPost } from '../app';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
   constructor(private foro: Foro) {}
  public forums: forumPost[] = [];
  cargarUsuarios() {
        this.foro.getForums().subscribe(data => {
      this.forums = data;
      console.log('Cargado en Contactos', this.forums);      
    });
  }
}
