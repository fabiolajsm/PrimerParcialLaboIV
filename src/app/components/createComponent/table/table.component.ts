import { Component, EventEmitter, Output } from '@angular/core';
import { Paises } from '../../../interfaces/paises.interface';
import { PaisesService } from '../../../services/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  isLoading: boolean = true;
  paises: Paises[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    if (this.paises.length > 0) return;
    this.isLoading = true;
    this.paisesService.getData().subscribe((paises) => {
      this.paises = paises;
      this.isLoading = false;
    });
  }

  handleSelect(optionName: string) {
    this.optionSelected.emit(optionName);
  }
}
