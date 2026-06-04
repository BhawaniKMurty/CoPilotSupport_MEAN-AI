import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly health = signal('checking\u2026');

  ngOnInit(): void {
    this.http.get<{ status: string }>(`${environment.apiBase}/health`).subscribe({
      next: (res) => {
        this.health.set(`API says: ${res.status}`);
      },
      error: (err) => {
        this.health.set('Error');
        console.error(err);
      }
    });
  }
}
