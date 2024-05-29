import { Component, Input } from '@angular/core';
import { IceCream } from '../../../interfaces/icecream.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss',
})
export class ModifyComponent {
  @Input() item: IceCream | undefined;
}
