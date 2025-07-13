import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { usuarioPost } from './app';

@Injectable({
  providedIn: 'root'
})
export class Foro {

  private readonly apiUrl = environment.apiUrl;
  private readonly apiUrlUpdate = environment.apiUrlUpdate;
  private readonly apiUrlCreate = environment.apiUrlCreate;
  private readonly apiUrlDelete = environment.apiUrlDelete;
  private readonly apiUrlbyId = environment.apiUrlbyId
    ;
  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Request-Headers': 'content-type' // Necesario para CORS
  });

  private http = inject(HttpClient);

  getForums(): Observable<usuarioPost[]> {
    return this.http.get<usuarioPost[]>(`${this.apiUrl}`, {

    }).pipe(
      map((raw) => raw.reverse())
    );
  }

  addForum(forum: usuarioPost): Observable<usuarioPost> {
    return this.http.post<usuarioPost>(`${this.apiUrl}`, forum, {
      headers: this.jsonHeaders
    });
  }


  updateForm(forum: usuarioPost): Observable<usuarioPost> {
    return this.http.put<usuarioPost>(this.apiUrlUpdate, forum, {
      headers: this.jsonHeaders
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error del API:', error);
        let errorMessage = 'Error al actualizar el foro';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del backend
          errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
          if (error.error && error.error.message) {
            errorMessage += `\nDetalles: ${error.error.message}`;
          }
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  actualizarFormulario(forum: usuarioPost): Observable<usuarioPost> {
    return this.http.put<usuarioPost>(this.apiUrlUpdate, forum, {
      headers: this.jsonHeaders
    }).pipe(
      catchError(error => {
        console.error('Error del API:', error);
        return throwError(() => new Error('Fallo al actualizar el foro'));
      })
    );
  }
  // updateForm(forum: usuarioPost): Observable<usuarioPost>{
  //   return this.http.put<usuarioPost>(`${this.apiUrlUpdate}/${forum}`, forum, {
  //     headers: this.jsonHeaders
  //   })
  // }
}
