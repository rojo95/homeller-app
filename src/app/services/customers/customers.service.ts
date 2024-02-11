import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Customer {
  name: string;
  lastName: string;
  identification?: string;
  photo?: string;
  birthDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  public async getCustomers(params: any) {
    const { baseUrl, character } = environment;
    return this.http.get(baseUrl + character, { params });
  }

  public async getCustomer(id: number) {
    const { baseUrl, character } = environment;
    return this.http.get(baseUrl + character + id);
  }
}
