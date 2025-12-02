import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  x = signal(0);
  a = signal(0);
  b = signal(0);
  somme = signal(0);
  

  incrementer(nombre: any) {
    nombre.update((n:number) => n + 1);
  }

  decrementer(nombre: any) {
    nombre.update((n:number)  => n - 1);
  }

  reset(nombre: any) {
    nombre.set(0);
  }
  sum = computed(() => this.a() + this.b());
}
