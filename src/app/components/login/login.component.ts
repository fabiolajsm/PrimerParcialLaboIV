import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { authErrors } from './authErrors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private spinner: NgxSpinnerService) {}
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  handleSubmit(): void {
    this.errorMessage = null;
    const rawForm = this.form.getRawValue();
    if (!rawForm.email || !rawForm.password) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }
    this.spinner.show();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.spinner.hide();
        this.router.navigateByUrl('');
        this.authService.addToLoginHistory(rawForm.email);
      },
      error: (err: FirebaseError) => {
        let errorMessage = 'Se produjo un error desconocido.';
        for (const error of authErrors) {
          if (error.code === err.code) {
            errorMessage = error.message;
            break;
          }
        }
        this.errorMessage = errorMessage;
        this.spinner.hide();
      },
    });
  }
  handleQuickAccess(): void {
    this.spinner.show();
    const quickAccessUsers = [
      'uno@gmail.com',
      'dos@gmail.com',
      'tres@gmail.com',
    ];
    const emailSelected =
      quickAccessUsers[Math.floor(Math.random() * quickAccessUsers.length)];

    this.authService.getUsers().subscribe((userData) => {
      userData.forEach((usuario) => {
        if ((usuario as any).email == emailSelected) {
          this.form.controls['email'].setValue((usuario as any).email);
          this.form.controls['password'].setValue((usuario as any).contraseña);
          this.spinner.hide();
        }
      });
    });
  }
}
