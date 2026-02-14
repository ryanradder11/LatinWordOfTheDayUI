import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private tokenSignal = signal<string | null>(
        sessionStorage.getItem('admin_token'),
    );

    isAuthenticated = computed(() => {
        const token = this.tokenSignal();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    });

    login(
        username: string,
        password: string,
    ): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
                username,
                password,
            })
            .pipe(
                tap((response) => {
                    sessionStorage.setItem('admin_token', response.token);
                    this.tokenSignal.set(response.token);
                }),
            );
    }

    logout(): void {
        sessionStorage.removeItem('admin_token');
        this.tokenSignal.set(null);
    }

    getToken(): string | null {
        return this.tokenSignal();
    }
}
