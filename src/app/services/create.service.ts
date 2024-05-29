import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  collectionName: string = 'repartidores';
  constructor(private firestore: Firestore) {}

  getDeliveryPersons(): Observable<Delivery[]> {
    const deliveryRef: CollectionReference = collection(
      this.firestore,
      this.collectionName
    );
    const deliveryQuery = query(deliveryRef);
    return collectionData(deliveryQuery) as Observable<Delivery[]>;
  }

  updateDeliveryPersons(
    name: string,
    dni: string,
    age: string,
    transportCapacity: string,
    ownUnit: boolean,
    country: string
  ) {
    const newDeliveryPerson: Delivery = {
      name: name,
      dni: dni,
      age: Number(age),
      transportCapacity: Number(transportCapacity),
      ownUnit: ownUnit,
      country: country,
    };
    const deliveryPersonsRef = collection(this.firestore, this.collectionName);
    addDoc(deliveryPersonsRef, newDeliveryPerson);
  }
}
