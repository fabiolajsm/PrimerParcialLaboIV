import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { WelcomeService } from '../../services/welcome.service';
import { Welcome } from '../../interfaces/welcome.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  constructor(
    private welcomeService: WelcomeService,
    private spinner: NgxSpinnerService
  ) {}
  isLoading: boolean = true;
  data: Welcome | undefined = undefined;

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();
    this.welcomeService.getData().subscribe((response) => {
      this.data = response;
      this.isLoading = false;
      this.spinner.hide();
    });
  }
}
