import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = [];
  constructor(private http: HttpClient) { }

  async getProducts() {
    if (!this.products.length) {
      return this.http.get('https://api.bigcartel.com/builttospill/products.json').pipe(
        map((response: any) => this.products = response)
      ).toPromise();
    } else {
      return this.products;
    }
  }

  async getRandomProduct() {
    const products = await this.getProducts();
    return products[Math.floor(Math.random() * products.length)]
  }
}
