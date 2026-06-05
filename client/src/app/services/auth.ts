import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

export interface AuthUser{id:string,name:string,email:string,role:string}
interface LoginResponse{token:string,user:AuthUser}

@Injectable({providedIn:'root'})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private readonly TOKEN_KEY = 'auth_token';

    // initialized from storage so the refresh keeps you loggedIn
    readonly token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
    readonly isLoggedIn = computed(() => !!this.token()!==null);

    login(email:string,password:string){
        return this.http.post<LoginResponse>(`${environment.apiBase}/auth/login`,{email,password})
        .pipe(tap((res)=>{
            localStorage.setItem(this.TOKEN_KEY,res.token);
            this.token.set(res.token);
        }))
    }
    logout(){
        localStorage.removeItem(this.TOKEN_KEY);
        this.token.set(null);
        this.router.navigate(['/login']);
    }
}
