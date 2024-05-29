import { Component, EventEmitter, Output } from '@angular/core';
import { IceCream } from '../../../interfaces/icecream.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Output() selectedItem = new EventEmitter<IceCream>();
}
