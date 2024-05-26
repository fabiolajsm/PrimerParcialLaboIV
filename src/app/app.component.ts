import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLogged: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isLogged = isAuthenticated;
    });
  }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: () => {
        console.log('error en logout');
      },
    });
  }
}
