import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Paises } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private url = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getData(): Observable<Paises[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((response: any[]) => {
        const list: Paises[] = [];
        response.forEach((result: any) => {
          const data: Paises = {
            name: result.name.common,
            flag: result.flags.png,
          };
          list.push(data);
        });
        return list;
      })
    );
  }
}
