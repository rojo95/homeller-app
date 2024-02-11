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

  public async getHouses(params?: any): Promise<any> {
    let { limits = 10, page = 1, text = '' } = params;
    return this.http.get('assets/files/houses.json').pipe(
      map((res: any) => {
        let startIndex = (page - 1) * limits;
        let endIndex = startIndex + limits;
        let info = res.data.filter((item: any) => {
          let values = Object.values(item);

          let isMatch = values.some((value) => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(text.toLowerCase());
            }
            return false;
          });

          return isMatch;
        });
        return info.slice(startIndex, endIndex);
      })
    );
  }

  public async getHouse(id: number): Promise<any> {
    return this.http.get('assets/files/houses.json').pipe(
      map((res: any) => {
        return res.data.find((v: any) => v.id.toString() === id.toString());
      })
    );
  }

  public async delete(id: number): Promise<boolean> {
    return true;
  }

  public async update(props: { id: number; params: any }): Promise<any> {
    const { id, params } = props;
  }
}
