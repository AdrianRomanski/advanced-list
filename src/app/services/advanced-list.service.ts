import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address, BrandFilter} from "../model/list.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdvancedListService {
  BASE_URL = 'https://636ce2d8ab4814f2b2712854.mockapi.io/'
  ADDRESSES_URL =  this.BASE_URL + 'advanced-list-store-addresses'
  BRANDS_URL =  this.BASE_URL + 'advanced-list-store-brands'

  constructor(private http: HttpClient) { }

  brandFilters(): Observable<BrandFilter[]> {
    return this.http.get<BrandFilter[]>(`${this.BRANDS_URL}`)
  }

  addresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.ADDRESSES_URL}`)
  }

  deleteAddress(id: string): Observable<Object> {
    return this.http.delete(`${this.ADDRESSES_URL}/${id}`);
  }
}
