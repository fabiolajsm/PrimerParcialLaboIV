import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  collectionName: string = 'repartidores';
  constructor(private firestore: Firestore) {}

  getDeliveryPersons(): Observable<[]> {
    const deliveryPersons = collection(this.firestore, this.collectionName);
    return collectionData(deliveryPersons) as Observable<[]>;
  }

  updateDeliveryPersons(
    name: string,
    dni: string,
    age: string,
    transportCapacity: string,
    ownUnit: string,
    country: string
  ) {
    let newDeliveryPerson = {
      name: name,
      dni: dni,
      age: age,
      transportCapacity: transportCapacity,
      ownUnit: ownUnit,
      country: country,
    };
    let deliveryPersonsRef = collection(this.firestore, this.collectionName);
    addDoc(deliveryPersonsRef, newDeliveryPerson);
  }
}
