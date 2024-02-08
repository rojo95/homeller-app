import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor() { }

  public priceFormat(price: number) {
    return price.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
