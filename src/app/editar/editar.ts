import { Component, Input, } from '@angular/core';
import { usuarioPost } from '../app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foro } from '../foro';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar {
  @Input() usuarios: usuarioPost[] = [];
  @Input() usuarioId!: number;
  constructor(private forumService: Foro) { }
  showPopup = false;
  usuarioEditable: usuarioPost[] = []; // Array para múltiples elementos
  loading: boolean = false;
  errorMessage: string = '';
  editarFila() {
    // Buscar el Usuario por ID y asignarlo al array editable
    const usuario = this.usuarios.find(f => f.id === this.usuarioId);
    if (usuario) {
      this.usuarioEditable = [usuario]; // Creamos un array con un solo elemento
      this.showPopup = true;
    } else {
      alert('No se encontró el Usuario con id: ' + this.usuarioId);
    }
  }

  actualizarUsuario() {
    // Actualizar el usuario original con los cambios
    if (this.usuarioEditable.length > 0) {
      const index = this.usuarios.findIndex(f => f.id === this.usuarioId);
      this.forumService.updateForm(this.usuarioEditable[0]).subscribe({
        next: (updatedForum) => {
          console.log('Actualización exitosa:', updatedForum);
          this.showPopup = false;
          // Actualiza la lista si es necesario
          //this.loadForums(); // Método hipotético para recargar datos
        },
        error: (err) => {
          console.error('Error completo:', err);
          if (err.error instanceof ErrorEvent) {
            // Error del lado del cliente
            this.errorMessage = `Error: ${err.error.message}`;
          } else {
            // Error del backend
            this.errorMessage = `Código de Error: ${err.status}\nMensaje: ${err.message}`;
            if (err.error && err.error.message) {
              this.errorMessage += `\nDetalles: ${err.error.message}`;
            }
          }
        },
        complete: () => {
          this.loading = false;
        }
      });

      console.log('Usuario actualizado:', this.usuarioEditable[0]);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarioEditable[0] };
      }
    }
    this.showPopup = false;
  }

  cancelarEdicion() {
    this.showPopup = false;
  }
}