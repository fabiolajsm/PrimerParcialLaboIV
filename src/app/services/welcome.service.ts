import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Welcome } from '../interfaces/welcome.interface';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  private url = 'https://api.github.com/users/octaviovillegas';

  constructor(private http: HttpClient) {}

  getData(): Observable<Welcome> {
    return this.http.get(this.url).pipe(
      map((response: any) => {
        const data: Welcome = {
          id: response.id,
          name: response.name,
          image: response.avatar_url,
          location: response.location,
        };
        return data;
      })
    );
  }
}
