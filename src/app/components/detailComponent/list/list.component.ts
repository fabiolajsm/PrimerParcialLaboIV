import { Component, EventEmitter, Output } from '@angular/core';
import { Delivery } from '../../../interfaces/delivery.interface';
import { CommonModule } from '@angular/common';
import { CreateService } from '../../../services/create.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Output() itemSelected = new EventEmitter<Delivery>();
  constructor(private deliveryService: CreateService) {} // Cambiar nombre del servicio
  items: Delivery[] = [];

  ngOnInit(): void {
    this.deliveryService.getDeliveryPersons().subscribe((response) => {
      this.items = response;
    });
  }

  handleSelect(event: any) {
    const value = event.target.value;
    const selectedItem = this.items.find((item) => item.name === value);
    if (selectedItem) {
      this.itemSelected.emit(selectedItem);
    }
  }
}
