import { Component, EventEmitter, Output } from '@angular/core';
import { Paises } from '../../../interfaces/paises.interface';
import { PaisesService } from '../../../services/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
})
export class TableComponent {
  isLoading: boolean = true;
  countries: Paises[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  constructor(private countryService: PaisesService) {}

  ngOnInit(): void {
    if (this.countries.length > 0) return;
    this.isLoading = true;
    this.countryService.getData().subscribe((data) => {
      this.countries = data;
      this.isLoading = false;
    });
  }

  handleSelect(optionName: string) {
    this.optionSelected.emit(optionName);
  }
}
