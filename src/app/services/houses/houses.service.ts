import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface Houses {
  title: string;
  owner: string;
  mainImage: string;
  images: string[];
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  constructor(private http: HttpClient) {}

  public async getHouses(params?: any) {
    let { limits = 10, page = 1 } = params;
    return this.http.get('assets/files/houses.json').pipe(
      map((res: any) => {
        let startIndex = (page - 1) * limits;
        let endIndex = startIndex + limits;
        return res.data.slice(startIndex, endIndex);
      })
    );
  }

  public async getHouse(id?: any) {
    return this.http.get('assets/files/houses.json').pipe(
      map((res: any) => {
        return res.data.find((v: any) => v.id.toString() === id.toString());
      })
    );
  }
}
