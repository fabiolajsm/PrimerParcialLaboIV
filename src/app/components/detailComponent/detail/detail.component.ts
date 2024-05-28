import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { DeliveryDetailComponent } from '../delivery-detail/delivery-detail.component';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { CommonModule } from '@angular/common';
import { Delivery } from '../../../interfaces/delivery.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    DeliveryDetailComponent,
    CountryDetailComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  itemSelected: Delivery | undefined = undefined;
  countryName: string | undefined = undefined;

  handleSelected(itemSelected: any) {
    this.itemSelected = itemSelected;
    this.countryName = itemSelected.country;
  }
}
