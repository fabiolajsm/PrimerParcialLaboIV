import { Component, Input } from '@angular/core';
import { IceCream } from '../../../interfaces/icecream.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  @Input() item: IceCream | undefined;
}
