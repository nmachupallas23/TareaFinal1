import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { usuarioPost } from '../app';
import { Foro } from '../foro';


@Component({
  selector: 'app-crear',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './crear.html',
  styleUrl: './crear.css'
})
export class Crear {
@Output() usuarioAgregado = new EventEmitter<usuarioPost>(); 
showPopupCrear = false;
loading: boolean = false;
errorMessage: string = '';
constructor(private forumService: Foro) { }
datosForm= new FormGroup({
  name: new FormControl('', [Validators.required, Validators.nullValidator]),
  address: new FormControl('', [Validators.required, Validators.nullValidator]),
  phone: new FormControl('', [Validators.required, Validators.nullValidator]),
});

mostrar() {  
  this.showPopupCrear=true
}

listaUsuarios: usuarioPost[] = []; 
@Output()usuarios: usuarioPost[] = [];
enviar() {
  if (this.datosForm.valid) {
    const { name, address,phone } = this.datosForm.value;
    this.listaUsuarios.push({
      name: name ?? '',
      address: address ?? '',
      phone: phone ?? '',
      id: 0 // Asignar un ID único
    });
    this.showPopupCrear=true
    this.forumService.addForum(this.listaUsuarios[0]).subscribe({
        next: (addUser) => {
          console.log('Usuario creado:', addUser);
        const usuariosEliminados = addUser;
        this.usuarioAgregado.emit(usuariosEliminados); // Emitir el usuario creado
        this.datosForm.reset();
        this.showPopupCrear = false;
        this.cargarUsuriarios();
        this.datosForm.reset();
          // Actualiza la lista si es necesario
          
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
     console.log('Usuario actualizado:', this.listaUsuarios[0]);     
    
      this.showPopupCrear = false;
  } 
}
cargarUsuriarios() {
    this.forumService.getForums().subscribe((data) => {
    this.usuarios = data;
    console.log('Forums loaded:', data);
  });
}
 cancelar() {
    this.showPopupCrear = false;
  }
}
