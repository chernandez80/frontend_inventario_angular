import { inject, Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/categoria-interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl =  environment.url_production;

  //private apiUrl =  "https://ventaslaravue.blumbit.net/back/public/api";

  http = inject(HttpClient);

  index(): Observable<ICategoria[]>{
    return this.http.get<ICategoria[]>(`${this.apiUrl}/categoria`);
  }

  store(datos: ICategoria): Observable<ICategoria>{
    return this.http.post<ICategoria>(`${this.apiUrl}/categoria`,datos);
  }

  show(id:number):Observable<ICategoria>{
    return this.http.get<ICategoria>(`${this.apiUrl}/categoria/${id}`);
  }

  update(id: number, datos: ICategoria):Observable<ICategoria>{
    return this.http.put<ICategoria>(`${this.apiUrl}/categoria/${id}`,datos);
  }

  destroy(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/categoria/${id}`);
  }
  
}
