import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {


  // columns: use Todo[] so drag/drop moves Todo objects between lists
  inProgress = signal<Todo[]>([]);
  review = signal<Todo[]>([]);
  done = signal<Todo[]>([]);

 
  todos = signal<Todo[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.isLoading.set(true);
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addTodo(title: string) {
    if (!title.trim()) return;
    const newTodo: Todo = { title, completed: false };

    // Optimistic UI update: add immediately, then reconcile with server response
    const temp = { ...newTodo };
    this.todos.update(t => [...t, temp]);

    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        // replace the last temp item (best-effort) with returned todo (with id)
        this.todos.update(list => {
          const copy = [...list];
          const idx = copy.findIndex(x => x === temp || x.title === temp.title && !x.id);
          if (idx !== -1) copy[idx] = todo;
          return copy;
        });
      },
      error: () => {
        // remove temp on error
        this.todos.update(list => list.filter(x => x !== temp));
      }
    });
  }

 delete(id?: number) {
  if (!id) return;
  
  // Demander confirmation avant suppression
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    return;
  }
  
  // Chercher la tâche dans toutes les colonnes
  const todoToDelete = this.findTodoInAllColumns(id);
  
  this.todoService.deleteTodo(id).subscribe({
    next: () => {
      // Supprimer de la colonne appropriée
      this.removeFromColumn(id);
    },
    error: (error) => {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la tâche');
    }
  });
}

// Méthode pour trouver une tâche dans toutes les colonnes
private findTodoInAllColumns(id: number): Todo | null {
  const allColumns = [
    this.todos(),
    this.inProgress(),
    this.review(),
    this.done()
  ];
  
  for (const column of allColumns) {
    const found = column.find(todo => todo.id === id);
    if (found) return found;
  }
  return null;
}

// Méthode pour supprimer d'une colonne spécifique
private removeFromColumn(id: number): void {
  // Supprimer de todos
  this.todos.update(list => list.filter(todo => todo.id !== id));
  
  // Supprimer de inProgress
  this.inProgress.update(list => list.filter(todo => todo.id !== id));
  
  // Supprimer de review
  this.review.update(list => list.filter(todo => todo.id !== id));
  
  // Supprimer de done
  this.done.update(list => list.filter(todo => todo.id !== id));
}

  /** Drag & Drop */
  drop(event: CdkDragDrop<any[]>) {
    const fromId = event.previousContainer.id;
    const toId = event.container.id;

    const fromRef = this.getArrayRef(fromId);
    const toRef = this.getArrayRef(toId);

    // defensive
    if (!fromRef || !toRef) return;

    const fromList = [...fromRef.arr];
    const toList = fromId === toId ? fromList : [...toRef.arr];

    if (fromId === toId) {
      moveItemInArray(fromList, event.previousIndex, event.currentIndex);
      fromRef.set(fromList);
    } else {
      const [moved] = fromList.splice(event.previousIndex, 1);
      toList.splice(event.currentIndex, 0, moved);
      fromRef.set(fromList);
      toRef.set(toList);
    }
  }

  private getArrayRef(id: string) {
    switch (id) {
      case 'todosList':
        return { arr: this.todos(), set: (v: Todo[]) => this.todos.set(v) };
      case 'inProgressList':
        return { arr: this.inProgress(), set: (v: Todo[]) => this.inProgress.set(v) };
      case 'reviewList':
        return { arr: this.review(), set: (v: Todo[]) => this.review.set(v) };
      case 'doneList':
        return { arr: this.done(), set: (v: Todo[]) => this.done.set(v) };
      default:
        return null;
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
