import { Component, EventEmitter, Output } from '@angular/core';
import { IceCream } from '../../../interfaces/icecream.interface';
import { CommonModule } from '@angular/common';
import { IceCreamService } from '../../../services/icecream.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Output() selectedItem = new EventEmitter<IceCream>();
  dataSource: any;
  items!: IceCream[];

  constructor(private icecreamService: IceCreamService) {}

  ngOnInit(): void {
    this.icecreamService.getData().subscribe((result) => {
      this.items = result;
    });
  }

  handleClick(item: IceCream) {
    this.selectedItem.emit(item);
  }
}
