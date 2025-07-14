import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { usuarioPost } from '../app';
import { Foro } from '../foro';
import { Editar } from "../editar/editar";
import { Crear } from "../crear/crear";
import { Eliminar } from "../eliminar/eliminar";

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, CommonModule, Editar, Crear, Eliminar],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
usuario: usuarioPost = {
 id: 0,
  name: '',
  address: '',
  phone: ''
};

usuarios: usuarioPost[] = [];
@Output() listaUsuariosActual: usuarioPost[] = [];
listaUsuariosEliminados: usuarioPost[] = [];
loading: boolean = false;
errorMessage: string = '';

constructor(private forumService: Foro) {}
title:string = '';
comment:string = '';

ngOnInit() {
   this.cargarUsuariosIniciales();
  // Inicializa el formulario con valores por defecto
  // this.forumService.getForums().subscribe((data) => {
  //   this.usuarios = data;
  //   console.log('Forums loaded:', data);
  // });
}

cargarDatosApi() {
    this.forumService.getForums().subscribe((data) => {
     this.usuarios = data;
     console.log('Forums loaded:', data);
   });   
  }
  cargarUsuariosIniciales() {
    this.forumService.getForums().subscribe((data) => {
     this.usuarios = data;
     console.log('Forums loaded:', data);
   });
   this.usuarios = this.listaUsuariosActual;
  }

cargaListaActualizadaPorEliminacion(usuariosEliminados: usuarioPost[]) {
    // Actualizar la lista local eliminando los usuarios
    const usuariosEliminado = usuariosEliminados.filter(usuario => usuario.id === usuariosEliminados[0].id);
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== usuariosEliminado[0].id);
    this.eliminarUsuario(usuariosEliminado[0].id);
    // Opcional: Actualizar también en el servidor
    // usuariosEliminados.forEach(usuario => {
    //   this.forumService.deleteForum(usuario.id).subscribe(() => {
    //     console.log(`Usuario ${usuario.id} eliminado del servidor`);
    //   });
    // });


  }

  cargaListaActualizadaPorCreacion(usuarioAgregado: usuarioPost) {
    // Actualizar la lista local eliminando los usuarios
    const usuariosEliminado = usuarioAgregado;
    this.usuarios.push(usuarioAgregado);    
    // Opcional: Actualizar también en el servidor
    // usuariosEliminados.forEach(usuario => {
    //   this.forumService.deleteForum(usuario.id).subscribe(() => {
    //     console.log(`Usuario ${usuario.id} eliminado del servidor`);
    //   });
    // });


  }

  eliminarUsuario(id: number): void {

    this.forumService.deleteUsuarios({ id } as usuarioPost).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
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
    
  }
    
}
