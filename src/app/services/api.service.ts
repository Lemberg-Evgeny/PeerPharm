import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'assets/angular_Response.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const item = response.results.find((item: any) => item.imdbID === id);
        if (!item) {
          throw new Error(`Item with id ${id} not found`);
        }
        return item;
      }),
      catchError((error) => {
        return throwError(
          () => new Error(error.message || 'Error fetching item data')
        );
      })
    );
  }

  updateItem(updatedItem: any) {
    alert(`Item updated to: ${updatedItem.Title}`)
    return this.http.post('/api/update', updatedItem);
  }
}
