import { Injectable } from '@angular/core';
import { Bigbasket,GooglePay,Grofers } from 'src/app/service/brandoffer.service.data';
import { Brand } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class BrandofferService {
  brandsAvailable:Brand[] = [];
  constructor() { 
    this.brandsAvailable.push(Bigbasket);
    this.brandsAvailable.push(Grofers);
    this.brandsAvailable.push(GooglePay);
  }

}
