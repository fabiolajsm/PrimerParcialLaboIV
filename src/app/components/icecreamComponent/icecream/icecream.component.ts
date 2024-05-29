import { Component } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { ModifyComponent } from '../modify/modify.component';
import { ListComponent } from '../list/list.component';
import { IceCream } from '../../../interfaces/icecream.interface';
import { IceCreamService } from '../../../services/icecream.service';

@Component({
  selector: 'app-icecream',
  standalone: true,
  imports: [CreateComponent, DeleteComponent, ModifyComponent, ListComponent],
  templateUrl: './icecream.component.html',
  styleUrl: './icecream.component.scss',
})
export class IcecreamComponent {
  selectedItem: IceCream | undefined = undefined;

  constructor(private icecreamService: IceCreamService) {}

  ngOnInit(): void {}

  handleItemSelected(icecream: any) {
    this.selectedItem = icecream;
  }

  createNewItem(newItem: IceCream) {
    this.icecreamService.createData(newItem);
  }
}
