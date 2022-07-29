import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { ShoeType } from './shoe-type';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  
  private baseApiUrl = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  listWomensShoesTypes(): Observable<ShoeType[]>{
      return this.http.get<ShoeType[]>(this.baseApiUrl + '/listWomensShoeTypes')
  }

  getShoesWithCriteria(criteria: string[]){
    return this.http.post<Product[]>(this.baseApiUrl + '/getProductByCriteria', criteria)
  }

  getProductById(id: number) {
    const queryParams = new HttpParams().append("id",id)
    return this.http.get<Product>(this.baseApiUrl + '/getProductById', {params: queryParams})
  }

  addProductToBasket(item :{product: any, size: string}) {
    // const body = JSON.stringify(item)
    // console.log(body);
    return this.http.post<any>(this.baseApiUrl + '/addProductToBasket', item)
  }

  async getBasket(){
    return await lastValueFrom(this.http.get<{product: Product, selectedSize: string, quantity: number,quantityOfSameSizeAvailable?: number}[]>(this.baseApiUrl + '/getBasket'))
  }

  checkoutBasket(voucherCode: string){
    return this.http.get<any>(this.baseApiUrl + '/checkoutBasket', {params: new HttpParams().append("voucherCode", voucherCode)})
  }

  async checkVoucher(voucherCode: string) {
    return await lastValueFrom(this.http.get<any>(this.baseApiUrl + '/checkVoucher', {params: new HttpParams().append("voucherCode", voucherCode)}))
  }

  async updateBasketQuantity(item: { product: Product; selectedSize: string; quantity: number; quantityOfSameSizeAvailable?: number | undefined; }) {
    return await lastValueFrom(this.http.post<any>(this.baseApiUrl + '/updateProductInBasket', item))
  }
}
