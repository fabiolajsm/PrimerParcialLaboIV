import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IceCream } from '../../../interfaces/icecream.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form!: FormGroup;
  @Output() newItem = new EventEmitter<any>();
  errorMessage: string | undefined;
  successMessage: string | undefined;
  icecreamType: string | undefined = undefined;

  ngOnInit(): void {
    this.form = new FormGroup({
      flavorName: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
    });
  }

  checkType(event: any) {
    const selectedType = event.target.value;
    this.icecreamType = event.target.checked ? selectedType : undefined;
  }

  createNewItem(): void {
    if (this.validateInputs()) {
      const newData: IceCream = {
        flavorName: this.form.value.flavorName.toLowerCase(),
        type: this.form.value.type,
        price: parseFloat(this.form.value.price),
        weight: parseFloat(this.form.value.weight),
      };
      this.newItem.emit(newData);
      this.showSuccessMessage();
    } else {
      this.showErrorMessage();
    }
  }

  validateInputs(): boolean {
    if (!this.flavorName?.valid) {
      this.errorMessage = "El campo 'Nombre del sabor' es inválido.";
      this.showErrorMessage();
      return false;
    }
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
    this.successMessage = 'Fue creado exitosamente!';
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

  get flavorName() {
    return this.form.get('flavorName');
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
