import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // backend runs on port 8081 (see backend application.properties)
  apiUrl = 'http://localhost:8081/api/todos';
  //injecter http client dans le constructeur
  constructor(private http: HttpClient) {
  }
    //defnir les methodes pour interagir avec l'api backend
    getTodos():Observable<Todo[]> {
      return this.http.get<Todo[]>(this.apiUrl);
   }
    addTodo(todo:Todo):Observable<Todo>{
      return this.http.post<Todo>(this.apiUrl,todo);
    }
    updateTodo(todo:Todo):Observable<Todo>{
      return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`,todo);
    }

    deleteTodo(id:number):Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/${id}`);


   

  }
 
}
