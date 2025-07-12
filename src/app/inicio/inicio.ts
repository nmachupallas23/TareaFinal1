import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forumPost } from '../app';
import { Foro } from '../foro';
import { Editar } from "../editar/editar";
import { Eliminar } from "../eliminar/eliminar";

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, CommonModule, Editar, Eliminar],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
forum: forumPost = {
 id: 0,
  name: '',
  address: '',
  phone: ''
};

forums: forumPost[] = [];

constructor(private forumService: Foro) {}
title:string = '';
comment:string = '';

ngOnInit() {
  // Inicializa el formulario con valores por defecto
  this.forumService.getForums().subscribe((data) => {
    this.forums = data;
    console.log('Forums loaded:', data);
  });
}

}
