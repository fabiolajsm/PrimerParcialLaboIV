import { Component, Input } from '@angular/core';
import { Paises } from '../../../interfaces/paises.interface';
import { PaisesService } from '../../../services/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
})
export class CountryDetailComponent {
  isLoading: boolean = true;
  countries: Paises[] = [];
  country: Paises | undefined = undefined;
  @Input() countryName: string | undefined;

  constructor(private countryService: PaisesService) {}

  ngOnInit(): void {
    if (this.countries.length === 0) {
      this.isLoading = true;
      this.countryService.getData().subscribe((data) => {
        this.countries = data;
        this.isLoading = false;
      });
    }
  }

  ngOnChanges(): void {
    if (this.countryName) {
      this.country = this.searchCountryByName(this.countryName);
      console.log(this.country, 'aca el pais seleccionado');
    }
  }

  searchCountryByName(countryName: string): Paises | undefined {
    return this.countries.find(
      (item) => item.name.toLowerCase() === countryName.toLowerCase()
    );
  }
}
