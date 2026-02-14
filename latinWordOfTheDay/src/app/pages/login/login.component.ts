import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, Card, InputText, Password, Button],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    username = '';
    password = '';
    errorMessage = '';
    loading = false;

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/praefectus']);
        }
    }

    login(): void {
        this.loading = true;
        this.errorMessage = '';
        this.authService
            .login(this.username, this.password)
            .subscribe({
                next: () => {
                    this.router.navigate(['/praefectus']);
                },
                error: () => {
                    this.loading = false;
                    this.errorMessage = 'Invalid credentials';
                },
            });
    }
}
