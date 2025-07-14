import { Component, EventEmitter, Input, Output } from '@angular/core';
import { usuarioPost } from '../app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar',
  imports: [CommonModule, FormsModule],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class Eliminar {
@Input() usuarios: usuarioPost[] = [];
@Input() usuarioId!: number;
@Output() listaUsuariosEliminados = new EventEmitter<usuarioPost[]>();

eliminarUsuario(id: number): void {
     const usuariosEliminados = this.usuarios.filter(usuario => usuario.id === id);
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    
    // Emitir el evento con los usuarios eliminados
    this.listaUsuariosEliminados.emit(usuariosEliminados);
  }

}
