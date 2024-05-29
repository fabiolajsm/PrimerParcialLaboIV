import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IceCream } from '../../../interfaces/icecream.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form!: FormGroup;
  @Output() newItem = new EventEmitter<any>();
  errorMessage: string | undefined;
  successMessage: string | undefined;

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

  createNewItem(): void {
    if (this.form.valid) {
      const newData: IceCream = {
        flavorName: this.form.value.flavorName,
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

  showSuccessMessage(): void {
    this.successMessage = 'The pizza was created successfully.';
    setTimeout(() => {
      this.successMessage = undefined;
    }, 2500);
  }

  showErrorMessage(): void {
    this.errorMessage = 'Some fields are invalid. Please check and try again.';
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
