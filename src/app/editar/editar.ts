import { Component, Input } from '@angular/core';
import { forumPost } from '../app';

@Component({
  selector: 'app-editar',
  imports: [],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar {
  @Input() forums: forumPost[] = [];
  @Input() forumId!: number;

  editarFila() {
    const foro = this.forums.find(f => f.id === this.forumId);
    if (foro) {
      alert('Editando foro con id: ' + foro.id);
      console.log('Foro editado:', foro);
    } else {
      alert('No se encontró el foro con id: ' + this.forumId);
    }
  }

  obtenerFilaParaEditar(index: number): any {
    if (this.forums && index >= 0 && index < this.forums.length) {
      return this.forums[index];
    }
    return null;
  }
}
