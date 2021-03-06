import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllRecordDetails, Brand } from 'src/app/model/transaction';
import { BrandofferService } from 'src/app/service/brandoffer.service';
import { Bigbasket,GooglePay,Grofers } from 'src/app/service/brandoffer.service.data';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  data!:AllRecordDetails
  imgPie!:any;
  imgBar!:any;
  topTxnList!:any;
  offerList:Brand[] = [];
  BASE_URL = "https://spend.herokuapp.com";
  

  constructor(
    private dataSharingService: DataSharingService,
    private brandofferService: BrandofferService,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.data = this.dataSharingService.txnRecords;
    this.getTopTransactions();
  }

  getTopTransactions(): void {
    let url = this.BASE_URL + `/gettoptxnsv1`;
    let response = this.http.post(url, this.data, { responseType: 'json' });
    response.subscribe((res)=>{
      this.topTxnList = res;
      console.log(this.topTxnList);
      console.log(this.brandofferService.brandsAvailable);
      this.topTxnList.forEach((merchant: string) => {
        this.brandofferService.brandsAvailable.forEach(brand =>{
          console.log(merchant);
          console.log(brand.competitors);
          if(brand.competitors.includes(merchant)){
            this.offerList.push(brand);
            console.log("found " + brand.brandname);
          }
        })
        
      });
    })
  }

}
