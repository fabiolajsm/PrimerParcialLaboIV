import { Component, Input } from '@angular/core';
import { IceCream } from '../../../interfaces/icecream.interface';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IceCreamService } from '../../../services/icecream.service';

@Component({
  selector: 'app-modify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modify.component.html',
})
export class ModifyComponent {
  @Input() item: IceCream | undefined;
  constructor(private icecreamService: IceCreamService) {}

  form!: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  icecreamType: string | undefined = undefined;

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
    });
  }

  checkType(event: any) {
    const selectedType = event.target.value;
    this.icecreamType = event.target.checked ? selectedType : undefined;
  }

  updateItem(): void {
    if (!this.item?.id) return;
    if (this.validateInputs()) {
      this.icecreamService.updateData(
        this.item?.id,
        this.form.value.type,
        parseFloat(this.form.value.price),
        parseFloat(this.form.value.weight)
      );
      this.showSuccessMessage();
    } else {
      this.showErrorMessage();
    }
  }

  validateInputs(): boolean {
    if (!this.icecreamType) {
      this.errorMessage = 'Debe seleccionar un tipo';
      this.showErrorMessage();
      return false;
    }
    if (!this.price?.valid) {
      this.errorMessage = "El campo 'Precio' es inválido.";
      this.showErrorMessage();
      return false;
    }
    if (!this.weight?.valid) {
      this.errorMessage = "El campo 'Peso' es inválido.";
      this.showErrorMessage();
      return false;
    }
    return true;
  }

  showSuccessMessage(): void {
    this.successMessage = 'Fue modificado exitosamente!';
    this.form.reset();
    setTimeout(() => {
      this.successMessage = undefined;
    }, 2500);
  }

  showErrorMessage(): void {
    setTimeout(() => {
      this.errorMessage = undefined;
    }, 2500);
  }

  get type() {
    return this.form.get('type');
  }

  get price() {
    return this.form.get('price');
  }

  get weight() {
    return this.form.get('weight');
  }
}
