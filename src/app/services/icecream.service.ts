import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IceCream, IceCreamType } from '../interfaces/icecream.interface';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  collectionName: string = 'icecream';
  constructor(private firestore: Firestore) {}

  getData(): Observable<IceCream[]> {
    const icecreamRef: CollectionReference = collection(
      this.firestore,
      this.collectionName
    );
    const icecreamQuery = query(icecreamRef);
    return collectionData(icecreamQuery, { idField: 'id' }) as Observable<
      IceCream[]
    >;
  }

  createData(newData: IceCream) {
    const icecreamRef = collection(this.firestore, this.collectionName);
    addDoc(icecreamRef, newData);
  }

  updateData(id: string, type: IceCreamType, price: number, weight: number) {
    let pizzaRef = doc(this.firestore, this.collectionName, id);
    updateDoc(pizzaRef, {
      type: type,
      price: price,
      weight: weight,
    });
  }

  deleteData(id: string) {
    const dataRef = doc(this.firestore, 'pizzas', id);
    deleteDoc(dataRef);
  }
}
