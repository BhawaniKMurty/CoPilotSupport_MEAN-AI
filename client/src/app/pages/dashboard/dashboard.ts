import { Component, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

interface MeResponse {
  message: string;
  user:{id:string, role:string}
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  protected readonly status = signal('loading..')
  
  ngOnInit(): void {
    this.http.get<MeResponse>(`${environment.apiBase}/me`).subscribe({
      next:(res)=> this.status.set(`${res.message} - Role: ${res.user.role}`),
      error: (err) => this.status.set(`Error: ${err.message || 'Not Authorized'}`)
    });
  }

  logout() {
    this.auth.logout();
  }

}
