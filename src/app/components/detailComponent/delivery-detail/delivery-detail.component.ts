import { Component, Input } from '@angular/core';
import { Delivery } from '../../../interfaces/delivery.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-detail.component.html',
  styleUrl: './delivery-detail.component.scss',
})
export class DeliveryDetailComponent {
  @Input() itemDetail: Delivery | undefined;
}
