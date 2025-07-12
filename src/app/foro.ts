import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { forumPost } from './app';

@Injectable({
  providedIn: 'root'
})
export class Foro {

  private readonly apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getForums():Observable<forumPost[]>{
      return this.http.get<forumPost[]>(`${this.apiUrl}`,{

      }).pipe(
        map((raw) => raw.reverse())
      );
    }

    addForum(forum: forumPost): Observable<forumPost>{
      return this.http.post<forumPost>(`${this.apiUrl}`, forum, {
        headers: this.jsonHeaders
      });
    }

    updateForm(forum: forumPost): Observable<forumPost>{
      return this.http.put<forumPost>(`${this.apiUrl}/${forum.id}`, forum, {
        headers: this.jsonHeaders
      })
    }
}
