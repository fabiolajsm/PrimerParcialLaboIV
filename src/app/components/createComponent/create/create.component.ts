import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateService } from '../../../services/create.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  form!: FormGroup;
  loading = true;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  country: string | undefined = undefined;
  ownUnit: string | undefined;

  constructor(private deliveryPersons: CreateService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.required,
      ]),
      dni: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.required,
      ]),
      age: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.min(18),
        Validators.max(99),
        Validators.required,
      ]),
      transportCapacity: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ]),
      ownUnit: new FormControl('', [Validators.required]),
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  get name() {
    return this.form.get('name');
  }
  get dni() {
    return this.form.get('dni');
  }
  get age() {
    return this.form.get('age');
  }
  get transportCapacity() {
    return this.form.get('transportCapacity');
  }
  getOptionSelected(option: string) {
    this.country = option;
    
  }

  createDeliveryPerson() {
    if (this.validateInputs()) {
      this.deliveryPersons.updateDeliveryPersons(
        this.name?.value,
        this.dni?.value,
        this.age?.value,
        this.transportCapacity?.value,
        this.ownUnit === 'true',
        this.country!
      );
      this.showSuccessMessage();
    }
  }

  checkUnit(event: any) {
    this.ownUnit =
      event.target.value !== 'invalid' ? event.target.value : undefined;
  }

  validateInputs(): boolean {
    if (!this.name?.valid) {
      this.errorMessage = "El campo 'Nombre' es inválido.";
      this.showMessage(this.errorMessage);
      return false;
    }
    if (!this.dni?.valid) {
      this.errorMessage = "El campo 'DNI' es inválido.";
      this.showMessage(this.errorMessage);
      return false;
    }
    if (!this.age?.valid) {
      this.errorMessage = "El campo 'Edad' es inválido.";
      this.showMessage(this.errorMessage);
      return false;
    }
    if (!this.transportCapacity?.valid) {
      this.errorMessage = "El campo 'Capacidad de Transporte' es inválido.";
      this.showMessage(this.errorMessage);
      return false;
    }
    if (this.ownUnit === undefined) {
      this.errorMessage = 'Debe seleccionar si posee unidad propia.';
      this.showMessage(this.errorMessage);
      return false;
    }
    if (this.country === undefined) {
      this.errorMessage = 'Debe seleccionar un pais.';
      this.showMessage(this.errorMessage);
      return false;
    }
    return true;
  }

  showSuccessMessage() {
    this.form.reset();
    this.successMessage = 'Repartidor creado exitosamente.';
    setTimeout(() => {
      this.successMessage = undefined;
    }, 2500);
  }

  showMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = undefined;
    }, 2500);
  }
}
